import { GraphQLClient } from "graphql-request";
import got from "got";
import { TokenResponse } from "./types";
import { getSdk } from "./generated/graphql";
import { compact, flatMap } from "lodash";
import { CharacterToAttendance, DataSource, GuildRequest } from "../types";
import config from "../config";

const LIMIT = 25;
const TOKEN_URL = "https://classic.warcraftlogs.com/oauth/token";
const GRAPHQL_URL = "https://classic.warcraftlogs.com/api/v2/client";

const createClient = async () => {
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

const getAttendance = async (request: GuildRequest): Promise<CharacterToAttendance> => {
  const { serverName, serverRegion, guildName } = request;
  const serverSlug = serverNameToServerSlug(serverName);

  const client = await createClient();
  const sdk = getSdk(client);

  let numberOfRaids = 0;
  const charactersToAttendanceCount: CharacterToAttendance = {};

  let page = 1;
  let hasMorePages = true;

  do {
    const variables = {
      serverSlug,
      guildName,
      serverRegion,
      page,
      limit: LIMIT,
    };
    console.log("EXECUTE warcraftlogs call:", variables);
    const data = await sdk.getGuildData(variables);

    const guildAttendance = data.guildData?.guild?.attendance;
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

const dataSource: DataSource = {
  name: "warcraftlogs",
  execute: async (request, response) => {
    const attendance = await getAttendance(request);

    return {
      ...response,
      attendance: {
        ...response.attendance,
        ...attendance,
      },
    };
  },
};

export default dataSource;
