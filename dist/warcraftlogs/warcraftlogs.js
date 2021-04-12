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
const graphql_request_1 = require("graphql-request");
const got_1 = __importDefault(require("got"));
const graphql_1 = require("./generated/graphql");
const lodash_1 = require("lodash");
const types_1 = require("../types");
const config_1 = __importDefault(require("../config"));
const NAME = "warcraftlogs";
const LIMIT = 25;
const TOKEN_URL = "https://classic.warcraftlogs.com/oauth/token";
const GRAPHQL_URL = "https://classic.warcraftlogs.com/api/v2/client";
const createClient = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`EXECUTE "${NAME}" token call`);
    const tokenResponse = got_1.default.post(TOKEN_URL, {
        username: config_1.default.warcraftLogs.clientId,
        password: config_1.default.warcraftLogs.clientSecret,
        json: {
            grant_type: "client_credentials",
        },
    });
    const tokenResponseJson = yield tokenResponse.json();
    const token = tokenResponseJson.access_token;
    return new graphql_request_1.GraphQLClient(GRAPHQL_URL, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
});
const serverNameToServerSlug = (serverName) => serverName
    .toLowerCase()
    .split(/[^a-zA-Z0-9]/)
    .join("-");
const gqlGuildToGuild = (gqlGuild) => ({
    name: gqlGuild.name,
    server: {
        name: gqlGuild.server.name,
        region: regionNamesToRegion[gqlGuild.server.region.compactName] || types_1.Region.US,
    },
    faction: types_1.Faction.Alliance,
});
const getGuild = (client, request) => __awaiter(void 0, void 0, void 0, function* () {
    const { serverName, serverRegion, guildName } = request;
    const serverSlug = serverNameToServerSlug(serverName);
    const variables = { serverSlug, guildName, serverRegion };
    console.log(`EXECUTE "${NAME}" getGuild call:`, variables);
    const sdk = graphql_1.getSdk(client);
    const data = yield sdk.getGuild(variables);
    if (!data || !data.guildData || !data.guildData.guild) {
        throw new Error(`No guild found matching the specified criteria: ${JSON.stringify(variables)}`);
    }
    return gqlGuildToGuild(data.guildData.guild);
});
const getAttendancePage = (client, request, pageNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const { serverName, serverRegion, guildName } = request;
    const serverSlug = serverNameToServerSlug(serverName);
    const variables = {
        serverSlug,
        guildName,
        serverRegion,
        page: pageNumber,
        limit: LIMIT,
    };
    console.log(`EXECUTE "${NAME}" getAttendance call:`, variables);
    const sdk = graphql_1.getSdk(client);
    const data = yield sdk.getAttendance(variables);
    if (!data || !data.guildData || !data.guildData.guild || !data.guildData.guild.attendance) {
        throw new Error(`No guild attendance found matching the specified criteria: ${JSON.stringify(variables)}`);
    }
    return data.guildData.guild.attendance;
});
const getAttendance = (client, request) => __awaiter(void 0, void 0, void 0, function* () {
    let numberOfRaids = 0;
    const charactersToAttendanceCount = {};
    let page = 1;
    let hasMorePages = true;
    do {
        const guildAttendance = yield getAttendancePage(client, request, page);
        const raids = lodash_1.compact((guildAttendance === null || guildAttendance === void 0 ? void 0 : guildAttendance.data) || []);
        const players = lodash_1.flatMap(raids, (raid) => lodash_1.compact(raid.players));
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
        hasMorePages = !!(guildAttendance === null || guildAttendance === void 0 ? void 0 : guildAttendance.has_more_pages);
    } while (hasMorePages);
    const attendance = Object.keys(charactersToAttendanceCount).reduce((percents, character) => {
        const raidsAttended = charactersToAttendanceCount[character];
        const percent = raidsAttended / numberOfRaids;
        return Object.assign(Object.assign({}, percents), { [character]: percent });
    }, {});
    return attendance;
});
const regionNamesToRegion = {
    US: types_1.Region.US,
    EU: types_1.Region.EU,
    CN: types_1.Region.CN,
    KR: types_1.Region.KR,
};
const dataSource = {
    name: "warcraftlogs",
    execute: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        const client = yield createClient();
        const guild = yield getGuild(client, request);
        const attendance = yield getAttendance(client, request);
        return Object.assign(Object.assign({}, response), { guild: response.guild || guild, attendance: Object.assign(Object.assign({}, response.attendance), attendance) });
    }),
};
exports.default = dataSource;
