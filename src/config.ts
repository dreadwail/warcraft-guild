const DEFAULT_PORT = 5000;

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : DEFAULT_PORT;
const WARCRAFT_LOGS_CLIENT_ID = process.env.WARCRAFT_LOGS_CLIENT_ID;
const WARCRAFT_LOGS_CLIENT_SECRET = process.env.WARCRAFT_LOGS_CLIENT_SECRET;

if (!WARCRAFT_LOGS_CLIENT_ID || !WARCRAFT_LOGS_CLIENT_SECRET) {
  console.log("WARCRAFT_LOGS_CLIENT_ID and/or WARCRAFT_LOGS_CLIENT_SECRET missing.");
  process.exit(1);
}

type Config = {
  port: number;
  warcraftLogs: {
    clientId: string;
    clientSecret: string;
  };
};

const config: Config = {
  port: PORT,
  warcraftLogs: {
    clientId: WARCRAFT_LOGS_CLIENT_ID,
    clientSecret: WARCRAFT_LOGS_CLIENT_SECRET,
  },
};

export default config;
