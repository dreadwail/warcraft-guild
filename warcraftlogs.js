import { GraphQLClient, gql } from "graphql-request";
import got from "got";

const LIMIT = 25;
const TOKEN_URL = "https://classic.warcraftlogs.com/oauth/token";
const GRAPHQL_URL = "https://classic.warcraftlogs.com/api/v2/client";

const createClient = async ({ clientId, clientSecret }) => {
  const tokenResponse = got.post(TOKEN_URL, {
    username: clientId,
    password: clientSecret,
    json: {
      grant_type: "client_credentials",
    },
  });
  const tokenResponseJson = await tokenResponse.json();
  const token = tokenResponseJson.access_token;

  return new GraphQLClient(GRAPHQL_URL, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

const createAttendanceQuery = ({
  serverSlug,
  guildName,
  serverRegion,
  page,
  limit,
}) => gql`
{
  guildData {
    guild(name: "${guildName}", serverSlug: "${serverSlug}", serverRegion: "${serverRegion}") {
      attendance(limit: ${limit}, page: ${page}) {
        current_page,
        data {
          code,
          players {
            name,
            presence,
            type
          },
          startTime,
          zone {
            name
          }
        },
        has_more_pages
      }
    }
  }
}
`;

export const getAttendance = async ({
  clientId,
  clientSecret,
  serverRegion,
  serverSlug,
  guildName,
}) => {
  const client = await createClient({ clientId, clientSecret });

  let numberOfRaids = 0;
  const charactersToAttendanceCount = {};

  let page = 1;
  let hasMorePages = true;

  do {
    console.log(`Fetching page:`, {
      serverRegion,
      serverSlug,
      guildName,
      page,
      limit: LIMIT,
    });

    const query = createAttendanceQuery({
      serverSlug,
      guildName,
      serverRegion,
      page,
      limit: LIMIT,
    });

    const data = await client.request(query);

    const guildAttendance = data.guildData.guild.attendance;
    const raids = guildAttendance.data;
    raids.forEach((raid) => {
      raid.players.forEach((player) => {
        charactersToAttendanceCount[player.name] =
          charactersToAttendanceCount[player.name] || 0;
        charactersToAttendanceCount[player.name] += 1;
      });
    });

    numberOfRaids += raids.length;

    page += 1;
    hasMorePages = !!guildAttendance.has_more_pages;
  } while (hasMorePages);

  const attendance = Object.keys(charactersToAttendanceCount).reduce(
    (percents, character) => {
      const raidsAttended = charactersToAttendanceCount[character];
      const percent = raidsAttended / numberOfRaids;
      return { ...percents, [character]: percent };
    },
    {}
  );

  return attendance;
};
