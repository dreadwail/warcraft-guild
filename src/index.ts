import express from "express";
import { getAttendance } from "./warcraftlogs.js";
import { getAttunements } from "./attune.js";
import papaparse from "papaparse";

const PORT = process.env.PORT || 5000;
const WARCRAFT_LOGS_CLIENT_ID = process.env.WARCRAFT_LOGS_CLIENT_ID;
const WARCRAFT_LOGS_CLIENT_SECRET = process.env.WARCRAFT_LOGS_CLIENT_SECRET;

if (!WARCRAFT_LOGS_CLIENT_ID || !WARCRAFT_LOGS_CLIENT_SECRET) {
  console.log(
    "WARCRAFT_LOGS_CLIENT_ID and/or WARCRAFT_LOGS_CLIENT_SECRET missing."
  );
  process.exit(1);
}

const app = express();

app.get(
  "/attendance/:serverRegion/:serverName/:faction/:guildName",
  async (req, res) => {
    const { serverRegion, serverName, faction, guildName } = req.params;

    const attendance = await getAttendance({
      clientId: WARCRAFT_LOGS_CLIENT_ID,
      clientSecret: WARCRAFT_LOGS_CLIENT_SECRET,
      serverRegion,
      serverName,
      faction,
      guildName,
    });

    const characters = Object.keys(attendance);
    const charactersSorted = characters.sort();
    const toCSV = charactersSorted.map((char) => [char, attendance[char]]);

    const csv = papaparse.unparse(toCSV);

    res.status(200).send(csv);
  }
);

app.get(
  "/attunements/:serverRegion/:serverName/:faction/:guildName",
  async (req, res) => {
    const { serverRegion, serverName, faction, guildName } = req.params;

    const attunements = await getAttunements({
      serverRegion,
      serverName,
      faction,
      guildName,
    });

    const characters = Object.keys(attunements);
    const charactersSorted = characters.sort();

    const toCSV = characters.map((character) => ({
      character,
      ...attunements[character],
    }));

    const csv = papaparse.unparse(toCSV);

    res.status(200).send(csv);
  }
);

app.use(function (err, _req, res, _next) {
  console.error(err);
  res.sendStatus(500);
});

app.use((_req, res, _next) => {
  res.sendStatus(404);
});

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
  });
});
