import express from "express";
import { getAttendance } from "./warcraftlogs.js";

const PORT = process.env.PORT || 5000;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.log("CLIENT_ID and/or CLIENT_SECRET missing.");
  process.exit(1);
}

const app = express();

app.get("/guild/:serverRegion/:serverSlug/:guildName", async (req, res) => {
  const { serverRegion, serverSlug, guildName } = req.params;

  const attendance = await getAttendance({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    serverRegion,
    serverSlug,
    guildName,
  });

  res.status(200).json({
    serverRegion,
    serverSlug,
    guildName,
    attendance,
  });
});

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
