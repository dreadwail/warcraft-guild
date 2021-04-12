import { GraphQLClient } from "graphql-request";
import got from "got";
import { TokenResponse } from "./types";
import {
  GetGuildQueryVariables,
  GetAttendanceQueryVariables,
  Guild as GQLGuild,
  getSdk,
  GuildAttendancePagination,
} from "./generated/graphql";
import { compact, flatMap } from "lodash";
import { CharacterToAttendance, DataSource, Faction, Guild, GuildRequest, Region } from "../types";
import config from "../config";

const NAME = "warcraftlogs";
const LIMIT = 25;
const TOKEN_URL = "https://classic.warcraftlogs.com/oauth/token";
const GRAPHQL_URL = "https://classic.warcraftlogs.com/api/v2/client";

const createClient = async () => {
  console.log(`EXECUTE "${NAME}" token call`);
  const tokenResponse = got.post<TokenResponse>(TOKEN_URL, {
    username: config.warcraftLogs.clientId,
    password: config.warcraftLogs.clientSecret,
    json: {
      grant_type: "client_credentials",
    },
  });
  const tokenResponseJson: TokenResponse = await tokenResponse.json();
  const token = tokenResponseJson.access_token;

  return new GraphQLClient(GRAPHQL_URL, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

const serverNameToServerSlug = (serverName: string): string =>
  serverName
    .toLowerCase()
    .split(/[^a-zA-Z0-9]/)
    .join("-");

const gqlGuildToGuild = (gqlGuild: GQLGuild): Guild => ({
  name: gqlGuild.name,
  server: {
    name: gqlGuild.server.name,
    region: regionNamesToRegion[gqlGuild.server.region.compactName] || Region.US,
  },
  faction: Faction.Alliance,
});

const getGuild = async (client: GraphQLClient, request: GuildRequest): Promise<Guild> => {
  const { serverName, serverRegion, guildName } = request;
  const serverSlug = serverNameToServerSlug(serverName);
  const variables: GetGuildQueryVariables = { serverSlug, guildName, serverRegion };

  console.log(`EXECUTE "${NAME}" getGuild call:`, variables);

  const sdk = getSdk(client);
  const data = await sdk.getGuild(variables);

  if (!data || !data.guildData || !data.guildData.guild) {
    throw new Error(`No guild found matching the specified criteria: ${JSON.stringify(variables)}`);
  }

  return gqlGuildToGuild(data.guildData.guild as GQLGuild);
};

const getAttendancePage = async (
  client: GraphQLClient,
  request: GuildRequest,
  pageNumber: number
): Promise<GuildAttendancePagination> => {
  const { serverName, serverRegion, guildName } = request;
  const serverSlug = serverNameToServerSlug(serverName);
  const variables: GetAttendanceQueryVariables = {
    serverSlug,
    guildName,
    serverRegion,
    page: pageNumber,
    limit: LIMIT,
  };

  console.log(`EXECUTE "${NAME}" getAttendance call:`, variables);

  const sdk = getSdk(client);
  const data = await sdk.getAttendance(variables);

  if (!data || !data.guildData || !data.guildData.guild || !data.guildData.guild.attendance) {
    throw new Error(`No guild attendance found matching the specified criteria: ${JSON.stringify(variables)}`);
  }

  return data.guildData.guild.attendance as GuildAttendancePagination;
};

const getAttendance = async (client: GraphQLClient, request: GuildRequest): Promise<CharacterToAttendance> => {
  let numberOfRaids = 0;
  const charactersToAttendanceCount: CharacterToAttendance = {};

  let page = 1;
  let hasMorePages = true;

  do {
    const guildAttendance = await getAttendancePage(client, request, page);
    const raids = compact(guildAttendance?.data || []);
    const players = flatMap(raids, (raid) => compact(raid.players));

    for (let i = 0; i < players.length; i += 1) {
      const player = players[i];
      if (!player.name) {
        continue;
      }

      charactersToAttendanceCount[player.name] = charactersToAttendanceCount[player.name] || 0;
      charactersToAttendanceCount[player.name] += 1;
    }

    numberOfRaids += raids.length;

    page += 1;
    hasMorePages = !!guildAttendance?.has_more_pages;
  } while (hasMorePages);

  const attendance = Object.keys(charactersToAttendanceCount).reduce<CharacterToAttendance>((percents, character) => {
    const raidsAttended = charactersToAttendanceCount[character];
    const percent = raidsAttended / numberOfRaids;
    return { ...percents, [character]: percent };
  }, {});

  return attendance;
};

const regionNamesToRegion: Record<string, Region> = {
  US: Region.US,
  EU: Region.EU,
  CN: Region.CN,
  KR: Region.KR,
};

const dataSource: DataSource = {
  name: "warcraftlogs",
  execute: async (request, response) => {
    const client = await createClient();
    const guild = await getGuild(client, request);
    const attendance = await getAttendance(client, request);

    return {
      ...response,
      guild: response.guild || guild,
      attendance: {
        ...response.attendance,
        ...attendance,
      },
    };
  },
};

export default dataSource;
