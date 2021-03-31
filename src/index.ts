import express, { Request, Response, NextFunction } from "express";
import { DataSource, Faction, GuildRequest, GuildResponse, Region } from "./types";
import { capitalize, toUpper } from "lodash";
import config from "./config";
import papaparse from "papaparse";

const app = express();

app.get("/guild/:serverRegion(US|EU|CN|KR)/:serverName/:faction(alliance|horde)/:guildName", async (req, res) => {
  const { serverRegion: serverRegionRaw, serverName, faction: factionRaw, guildName } = req.params;
  const serverRegion = toUpper(serverRegionRaw) as Region;
  const faction = capitalize(factionRaw) as Faction;

  const request: GuildRequest = {
    serverRegion,
    serverName,
    faction,
    guildName,
  };

  const dataSources: DataSource[] = [];

  const initialResponse: GuildResponse = {
    guild: {
      name: guildName,
      server: {
        name: serverName,
        region: serverRegion,
      },
      faction,
    },
    characters: [],
    attunements: {},
    attendance: {},
  };

  const guildResponse = dataSources.reduce<GuildResponse>(
    (response, dataSource) => dataSource(request, response),
    initialResponse
  );

  res.format({
    json: () => res.status(200).json(guildResponse),
    csv: () => {
      const csv = papaparse.unparse([]);
      res.status(200).send(csv);
    },
  });
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.sendStatus(500);
});

app.use((_req: Request, res: Response, _next: NextFunction) => {
  res.sendStatus(404);
});

const server = app.listen(config.port, () => console.log(`Listening on ${config.port}`));

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
  });
});
