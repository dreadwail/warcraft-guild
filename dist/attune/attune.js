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
exports.getAttunements = void 0;
const got_1 = __importDefault(require("got"));
const types_1 = require("../types");
const types_2 = require("./types");
const ATTUNEMENTS_URL = "https://warcraftratings.com/json_attuneRosterByGuild.php";
const GUILDS_URL = "https://warcraftratings.com/json_attuneGuilds.php";
const getGuildId = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield got_1.default
        .get(GUILDS_URL, {
        searchParams: {
            realm: request.serverName,
            faction: request.faction,
            guildName: request.guildName,
        },
    })
        .json();
    const firstResponse = response[0];
    return firstResponse.guildId;
});
const getGuildAttunements = (guildId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield got_1.default
        .get(ATTUNEMENTS_URL, {
        searchParams: {
            guildId,
        },
    })
        .json();
    return response;
});
const defaultAttunements = {
    [types_1.Attunement.MoltenCore]: false,
    [types_1.Attunement.BlackwingLair]: false,
    [types_1.Attunement.Onyxia]: false,
    [types_1.Attunement.Naxxramas]: false,
    [types_1.Attunement.ScepterOfTheShiftingSands]: false,
    [types_1.Attunement.ShatteredHalls]: false,
    [types_1.Attunement.ShadowLabs]: false,
    [types_1.Attunement.BlackMorass]: false,
    [types_1.Attunement.Arcatraz]: false,
    [types_1.Attunement.HonorHoldRevered]: false,
    [types_1.Attunement.CenarionExpeditionRevered]: false,
    [types_1.Attunement.LowerCityRevered]: false,
    [types_1.Attunement.ShatarRevered]: false,
    [types_1.Attunement.KeepersOfTimeRevered]: false,
    [types_1.Attunement.Karazhan]: false,
    [types_1.Attunement.Nightbane]: false,
    [types_1.Attunement.SerpentshrineCavern]: false,
    [types_1.Attunement.TempestKeep]: false,
    [types_1.Attunement.MountHyjal]: false,
    [types_1.Attunement.BlackTemple]: false,
};
const attunementMapping = {
    [types_2.AttunementType.MoltenCore]: types_1.Attunement.MoltenCore,
    [types_2.AttunementType.Onyxia]: types_1.Attunement.Onyxia,
    [types_2.AttunementType.BlackwingLair]: types_1.Attunement.BlackwingLair,
    [types_2.AttunementType.Naxxramas]: types_1.Attunement.Naxxramas,
    [types_2.AttunementType.ScepterOfTheShiftingSands]: types_1.Attunement.ScepterOfTheShiftingSands,
    [types_2.AttunementType.ShatteredHalls]: types_1.Attunement.ShatteredHalls,
    [types_2.AttunementType.ShadowLabyrinth]: types_1.Attunement.ShadowLabs,
    [types_2.AttunementType.BlackMorass]: types_1.Attunement.BlackMorass,
    [types_2.AttunementType.Arcatraz]: types_1.Attunement.Arcatraz,
    [types_2.AttunementType.HonorHoldRevered]: types_1.Attunement.HonorHoldRevered,
    [types_2.AttunementType.CenarionExpeditionRevered]: types_1.Attunement.CenarionExpeditionRevered,
    [types_2.AttunementType.LowerCityRevered]: types_1.Attunement.LowerCityRevered,
    [types_2.AttunementType.ShatarRevered]: types_1.Attunement.ShatarRevered,
    [types_2.AttunementType.KeepersOfTimeRevered]: types_1.Attunement.KeepersOfTimeRevered,
    [types_2.AttunementType.Karazhan]: types_1.Attunement.Karazhan,
    [types_2.AttunementType.Nightbane]: types_1.Attunement.Nightbane,
    [types_2.AttunementType.SerpentshrineCavern]: types_1.Attunement.SerpentshrineCavern,
    [types_2.AttunementType.TheEye]: types_1.Attunement.TempestKeep,
    [types_2.AttunementType.MountHyjal]: types_1.Attunement.MountHyjal,
    [types_2.AttunementType.BlackTemple]: types_1.Attunement.BlackTemple,
};
const toonToAttunements = (toon) => {
    return toon.attunes.reduce((attunements, attune) => {
        const isAttuned = attune.attuneStepsDone === attune.attuneStepsTotal;
        return Object.assign(Object.assign({}, attunements), { [attunementMapping[attune.attune]]: isAttuned });
    }, Object.assign({}, defaultAttunements));
};
const getAttunements = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const guildId = yield getGuildId(request);
    const attunementsResponse = yield getGuildAttunements(guildId);
    return attunementsResponse.toons.reduce((characterToAttunements, toon) => (Object.assign(Object.assign({}, characterToAttunements), { [toon.toon]: toonToAttunements(toon) })), {});
});
exports.getAttunements = getAttunements;
