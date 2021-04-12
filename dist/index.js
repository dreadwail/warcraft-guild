"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lodash_1 = require("lodash");
const config_1 = __importDefault(require("./config"));
const papaparse_1 = __importDefault(require("papaparse"));
const warcraftlogs_1 = __importDefault(require("./warcraftlogs"));
const attune_1 = __importDefault(require("./attune"));
const app = express_1.default();
app.get("/guild/:serverRegion(US|EU|CN|KR)/:serverName/:faction(alliance|horde)/:guildName", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { serverRegion: serverRegionRaw, serverName, faction: factionRaw, guildName } = req.params;
    const serverRegion = lodash_1.toUpper(serverRegionRaw);
    const faction = lodash_1.capitalize(factionRaw);
    const request = {
        serverRegion,
        serverName,
        faction,
        guildName,
    };
    const dataSources = [warcraftlogs_1.default, attune_1.default];
    const initialResponse = {
        request,
        guild: undefined,
        characters: [],
        attunements: {},
        attendance: {},
    };
    const guildResponse = yield dataSources.reduce((previousPromise, dataSource) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield previousPromise;
        try {
            console.log(`BEGIN collection from data source "${dataSource.name}"`);
            const newResponse = yield dataSource.execute(request, response);
            console.log(`END collection from data source "${dataSource.name}"`);
            return newResponse;
        }
        catch (err) {
            console.error(`FAILED collection from data source "${dataSource.name}":`, err);
            return response;
        }
    }), Promise.resolve(initialResponse));
    res.format({
        json: () => res.status(200).json(guildResponse),
        csv: () => {
            const csv = papaparse_1.default.unparse([]);
            res.status(200).send(csv);
        },
    });
}));
app.use((err, _req, res, _next) => {
    console.error(err);
    res.sendStatus(500);
});
app.use((_req, res, _next) => {
    res.sendStatus(404);
});
const server = app.listen(config_1.default.port, () => console.log(`Listening on ${config_1.default.port}`));
process.on("SIGTERM", () => {
    console.log("SIGTERM signal received: closing HTTP server");
    server.close(() => {
        console.log("HTTP server closed");
    });
});
