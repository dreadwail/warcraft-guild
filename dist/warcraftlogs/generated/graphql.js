"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetGuildData = exports.getSdk = exports.GetGuildDataDocument = exports.ViewType = exports.TableDataType = exports.RoleType = exports.ReportRankingMetricType = exports.RankingTimeframeType = exports.RankingCompareType = exports.KillType = exports.HostilityType = exports.GraphDataType = exports.FightRankingMetricType = exports.EventDataType = exports.CharacterRankingMetricType = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
/** All the possible metrics. */
var CharacterRankingMetricType;
(function (CharacterRankingMetricType) {
    /** Boss damage per second. */
    CharacterRankingMetricType["Bossdps"] = "bossdps";
    /** Boss rDPS is unique to FFXIV and is damage done to the boss adjusted for raid-contributing buffs and debuffs. */
    CharacterRankingMetricType["Bossrdps"] = "bossrdps";
    /** Choose an appropriate default depending on the other selected parameters. */
    CharacterRankingMetricType["Default"] = "default";
    /** Damage per second. */
    CharacterRankingMetricType["Dps"] = "dps";
    /** Healing per second. */
    CharacterRankingMetricType["Hps"] = "hps";
    /** Survivability ranking for tanks. Deprecated. Only supported for some older WoW zones. */
    CharacterRankingMetricType["Krsi"] = "krsi";
    /** Score. Used by WoW Mythic dungeons and by ESO trials. */
    CharacterRankingMetricType["Playerscore"] = "playerscore";
    /** Speed. Not supported by every zone. */
    CharacterRankingMetricType["Playerspeed"] = "playerspeed";
    /** rDPS is unique to FFXIV and is damage done adjusted for raid-contributing buffs and debuffs. */
    CharacterRankingMetricType["Rdps"] = "rdps";
    /** Healing done per second to tanks. */
    CharacterRankingMetricType["Tankhps"] = "tankhps";
    /** Weighted damage per second. Unique to WoW currently. Used to remove pad damage and reward damage done to high priority targets. */
    CharacterRankingMetricType["Wdps"] = "wdps";
    /** Unique to FFXIV. Represents the combined ranking for a pair of healers in 8-man content. */
    CharacterRankingMetricType["Healercombineddps"] = "healercombineddps";
    /** Unique to FFXIV. Represents the combined ranking for a pair of healers in 8-man content. */
    CharacterRankingMetricType["Healercombinedbossdps"] = "healercombinedbossdps";
    /** Unique to FFXIV. Represents the combined ranking for a pair of healers in 8-man content. */
    CharacterRankingMetricType["Healercombinedrdps"] = "healercombinedrdps";
    /** Unique to FFXIV. Represents the combined ranking for a pair of healers in 8-man content. */
    CharacterRankingMetricType["Healercombinedbossrdps"] = "healercombinedbossrdps";
    /** Unique to FFXIV. Represents the combined ranking for a pair of tanks in 8-man content. */
    CharacterRankingMetricType["Tankcombineddps"] = "tankcombineddps";
    /** Unique to FFXIV. Represents the combined ranking for a pair of tanks in 8-man content. */
    CharacterRankingMetricType["Tankcombinedbossdps"] = "tankcombinedbossdps";
    /** Unique to FFXIV. Represents the combined ranking for a pair of tanks in 8-man content. */
    CharacterRankingMetricType["Tankcombinedrdps"] = "tankcombinedrdps";
    /** Unique to FFXIV. Represents the combined ranking for a pair of tanks in 8-man content. */
    CharacterRankingMetricType["Tankcombinedbossrdps"] = "tankcombinedbossrdps";
})(CharacterRankingMetricType = exports.CharacterRankingMetricType || (exports.CharacterRankingMetricType = {}));
/** The type of events or tables to examine. */
var EventDataType;
(function (EventDataType) {
    /** All Events */
    EventDataType["All"] = "All";
    /** Buffs. */
    EventDataType["Buffs"] = "Buffs";
    /** Casts. */
    EventDataType["Casts"] = "Casts";
    /** Combatant info events (includes gear). */
    EventDataType["CombatantInfo"] = "CombatantInfo";
    /** Damage done. */
    EventDataType["DamageDone"] = "DamageDone";
    /** Damage taken. */
    EventDataType["DamageTaken"] = "DamageTaken";
    /** Deaths. */
    EventDataType["Deaths"] = "Deaths";
    /** Debuffs. */
    EventDataType["Debuffs"] = "Debuffs";
    /** Dispels. */
    EventDataType["Dispels"] = "Dispels";
    /** Healing done. */
    EventDataType["Healing"] = "Healing";
    /** Interrupts. */
    EventDataType["Interrupts"] = "Interrupts";
    /** Resources. */
    EventDataType["Resources"] = "Resources";
    /** Summons */
    EventDataType["Summons"] = "Summons";
    /** Threat. */
    EventDataType["Threat"] = "Threat";
})(EventDataType = exports.EventDataType || (exports.EventDataType = {}));
/** All the possible metrics. */
var FightRankingMetricType;
(function (FightRankingMetricType) {
    /** Choose an appropriate default depending on the other selected parameters. */
    FightRankingMetricType["Default"] = "default";
    /** A metric that rewards minimizing deaths and damage taken. */
    FightRankingMetricType["Execution"] = "execution";
    /** Feats of strength in WoW or Challenges in FF. */
    FightRankingMetricType["Feats"] = "feats";
    /** For Mythic+ dungeons in WoW, represents the team's score. Used for ESO trials and dungeons also. */
    FightRankingMetricType["Score"] = "score";
    /** Speed metric, based off the duration of the fight. */
    FightRankingMetricType["Speed"] = "speed";
})(FightRankingMetricType = exports.FightRankingMetricType || (exports.FightRankingMetricType = {}));
/** The type of graph to examine. */
var GraphDataType;
(function (GraphDataType) {
    /** Summary Overview */
    GraphDataType["Summary"] = "Summary";
    /** Buffs. */
    GraphDataType["Buffs"] = "Buffs";
    /** Casts. */
    GraphDataType["Casts"] = "Casts";
    /** Damage done. */
    GraphDataType["DamageDone"] = "DamageDone";
    /** Damage taken. */
    GraphDataType["DamageTaken"] = "DamageTaken";
    /** Deaths. */
    GraphDataType["Deaths"] = "Deaths";
    /** Debuffs. */
    GraphDataType["Debuffs"] = "Debuffs";
    /** Dispels. */
    GraphDataType["Dispels"] = "Dispels";
    /** Healing done. */
    GraphDataType["Healing"] = "Healing";
    /** Interrupts. */
    GraphDataType["Interrupts"] = "Interrupts";
    /** Resources. */
    GraphDataType["Resources"] = "Resources";
    /** Summons */
    GraphDataType["Summons"] = "Summons";
    /** Survivability (death info across multiple pulls). */
    GraphDataType["Survivability"] = "Survivability";
    /** Threat. */
    GraphDataType["Threat"] = "Threat";
})(GraphDataType = exports.GraphDataType || (exports.GraphDataType = {}));
/** Whether or not to fetch information for friendlies or enemies. */
var HostilityType;
(function (HostilityType) {
    /** Fetch information for friendlies. */
    HostilityType["Friendlies"] = "Friendlies";
    /** Fetch information for enemies. */
    HostilityType["Enemies"] = "Enemies";
})(HostilityType = exports.HostilityType || (exports.HostilityType = {}));
/** A filter for kills vs wipes and encounters vs trash. */
var KillType;
(function (KillType) {
    /** Include trash and encounters. */
    KillType["All"] = "All";
    /** Only include encounters (kills and wipes). */
    KillType["Encounters"] = "Encounters";
    /** Only include encounters that end in a kill. */
    KillType["Kills"] = "Kills";
    /** Only include trash. */
    KillType["Trash"] = "Trash";
    /** Only include encounters that end in a wipe. */
    KillType["Wipes"] = "Wipes";
})(KillType = exports.KillType || (exports.KillType = {}));
/** Whether or not rankings are compared against best scores for the entire tier or against all parses in a two week window. */
var RankingCompareType;
(function (RankingCompareType) {
    /** Compare against rankings. */
    RankingCompareType["Rankings"] = "Rankings";
    /** Compare against all parses in a two week window. */
    RankingCompareType["Parses"] = "Parses";
})(RankingCompareType = exports.RankingCompareType || (exports.RankingCompareType = {}));
/** Whether or not rankings are today or historical. */
var RankingTimeframeType;
(function (RankingTimeframeType) {
    /** Compare against today's rankings. */
    RankingTimeframeType["Today"] = "Today";
    /** Compare against historical rankings. */
    RankingTimeframeType["Historical"] = "Historical";
})(RankingTimeframeType = exports.RankingTimeframeType || (exports.RankingTimeframeType = {}));
/** All the possible metrics. */
var ReportRankingMetricType;
(function (ReportRankingMetricType) {
    /** Boss damage per second. */
    ReportRankingMetricType["Bossdps"] = "bossdps";
    /** Boss rDPS is unique to FFXIV and is damage done to the boss adjusted for raid-contributing buffs and debuffs. */
    ReportRankingMetricType["Bossrdps"] = "bossrdps";
    /** Choose an appropriate default depending on the other selected parameters. */
    ReportRankingMetricType["Default"] = "default";
    /** Damage per second. */
    ReportRankingMetricType["Dps"] = "dps";
    /** Healing per second. */
    ReportRankingMetricType["Hps"] = "hps";
    /** Survivability ranking for tanks. Deprecated. Only supported for some older WoW zones. */
    ReportRankingMetricType["Krsi"] = "krsi";
    /** Score. Used by WoW Mythic dungeons and by ESO trials. */
    ReportRankingMetricType["Playerscore"] = "playerscore";
    /** Speed. Not supported by every zone. */
    ReportRankingMetricType["Playerspeed"] = "playerspeed";
    /** rDPS is unique to FFXIV and is damage done adjusted for raid-contributing buffs and debuffs. */
    ReportRankingMetricType["Rdps"] = "rdps";
    /** Healing done per second to tanks. */
    ReportRankingMetricType["Tankhps"] = "tankhps";
    /** Weighted damage per second. Unique to WoW currently. Used to remove pad damage and reward damage done to high priority targets. */
    ReportRankingMetricType["Wdps"] = "wdps";
})(ReportRankingMetricType = exports.ReportRankingMetricType || (exports.ReportRankingMetricType = {}));
/** Used to specify a tank, healer or DPS role. */
var RoleType;
(function (RoleType) {
    /** Fetch any role.. */
    RoleType["Any"] = "Any";
    /** Fetch the DPS role only. */
    RoleType["Dps"] = "DPS";
    /** Fetch the healer role only. */
    RoleType["Healer"] = "Healer";
    /** Fetch the tanking role only. */
    RoleType["Tank"] = "Tank";
})(RoleType = exports.RoleType || (exports.RoleType = {}));
/** The type of table to examine. */
var TableDataType;
(function (TableDataType) {
    /** Summary Overview */
    TableDataType["Summary"] = "Summary";
    /** Buffs. */
    TableDataType["Buffs"] = "Buffs";
    /** Casts. */
    TableDataType["Casts"] = "Casts";
    /** Damage done. */
    TableDataType["DamageDone"] = "DamageDone";
    /** Damage taken. */
    TableDataType["DamageTaken"] = "DamageTaken";
    /** Deaths. */
    TableDataType["Deaths"] = "Deaths";
    /** Debuffs. */
    TableDataType["Debuffs"] = "Debuffs";
    /** Dispels. */
    TableDataType["Dispels"] = "Dispels";
    /** Healing done. */
    TableDataType["Healing"] = "Healing";
    /** Interrupts. */
    TableDataType["Interrupts"] = "Interrupts";
    /** Resources. */
    TableDataType["Resources"] = "Resources";
    /** Summons */
    TableDataType["Summons"] = "Summons";
    /** Survivability (death info across multiple pulls). */
    TableDataType["Survivability"] = "Survivability";
    /** Threat. */
    TableDataType["Threat"] = "Threat";
})(TableDataType = exports.TableDataType || (exports.TableDataType = {}));
/** Whether the view is by source, target, or ability. */
var ViewType;
(function (ViewType) {
    /** Use the same default that the web site picks based off the other selected parameters. */
    ViewType["Default"] = "Default";
    /** View by ability. */
    ViewType["Ability"] = "Ability";
    /** View. by source. */
    ViewType["Source"] = "Source";
    /** View by target. */
    ViewType["Target"] = "Target";
})(ViewType = exports.ViewType || (exports.ViewType = {}));
exports.GetGuildDataDocument = graphql_tag_1.default `
    query getGuildData($guildName: String!, $serverSlug: String!, $serverRegion: String!, $limit: Int!, $page: Int!) {
  guildData {
    guild(name: $guildName, serverSlug: $serverSlug, serverRegion: $serverRegion) {
      attendance(limit: $limit, page: $page) {
        current_page
        data {
          code
          players {
            name
            presence
            type
          }
          startTime
          zone {
            name
          }
        }
        has_more_pages
      }
    }
  }
}
    `;
const defaultWrapper = sdkFunction => sdkFunction();
function getSdk(client, withWrapper = defaultWrapper) {
    return {
        getGuildData(variables, requestHeaders) {
            return withWrapper(() => client.request(exports.GetGuildDataDocument, variables, requestHeaders));
        }
    };
}
exports.getSdk = getSdk;
exports.GetGuildData = graphql_tag_1.default `
    query getGuildData($guildName: String!, $serverSlug: String!, $serverRegion: String!, $limit: Int!, $page: Int!) {
  guildData {
    guild(name: $guildName, serverSlug: $serverSlug, serverRegion: $serverRegion) {
      attendance(limit: $limit, page: $page) {
        current_page
        data {
          code
          players {
            name
            presence
            type
          }
          startTime
          zone {
            name
          }
        }
        has_more_pages
      }
    }
  }
}
    `;
