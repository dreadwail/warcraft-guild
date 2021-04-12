import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
};

/** A bracket description for a given raid zone. Brackets have a minimum value, maximum value, and a bucket that can be used to establish all of the possible brackets. The type field indicates what the brackets represent, e.g., item levels or game patches, etc. */
export type Bracket = {
  __typename?: 'Bracket';
  /** An integer representing the minimum value used by bracket number 1, etc. */
  min: Scalars['Float'];
  /** An integer representing the value used by bracket N when there are a total of N brackets, etc. */
  max: Scalars['Float'];
  /** A float representing the value to increment when moving from bracket 1 to bracket N, etc. */
  bucket: Scalars['Float'];
  /** The localized name of the bracket type. */
  type: Scalars['String'];
};

/** A player character. Characters can earn individual rankings and appear in reports. */
export type Character = {
  __typename?: 'Character';
  /** The canonical ID of the character. If a character renames or transfers, then the canonical id can be used to identify the most recent version of the character. */
  canonicalID: Scalars['Int'];
  /** The class id of the character. */
  classID: Scalars['Int'];
  /** Encounter rankings information for a character, filterable to specific zones, bosses, metrics, etc. This data is not considered frozen, and it can change without notice. Use at your own risk. */
  encounterRankings?: Maybe<Scalars['JSON']>;
  /** Cached game data such as gear for the character. This data was fetched from the appropriate source (Blizzard APIs for WoW, XIVAPI for FF). This call will only return a cached copy of the data if it exists already. It will not go out to Blizzard or XIVAPI to fetch a new copy. */
  gameData?: Maybe<Scalars['JSON']>;
  /** The guild rank of the character in their primary guild. This is not the user rank on the site, but the rank according to the game data, e.g., a Warcraft guild rank or an FFXIV Free Company rank. */
  guildRank: Scalars['Int'];
  /** All guilds that the character belongs to. */
  guilds?: Maybe<Array<Maybe<Guild>>>;
  /** Whether or not the character has all its rankings hidden. */
  hidden: Scalars['Boolean'];
  /** The ID of the character. */
  id: Scalars['Int'];
  /** The level of the character. */
  level: Scalars['Int'];
  /** The name of the character. */
  name: Scalars['String'];
  /** Recent reports for the character. */
  recentReports?: Maybe<ReportPagination>;
  /** The server that the character belongs to. */
  server: Server;
  /** Rankings information for a character, filterable to specific zones, bosses, metrics, etc. This data is not considered frozen, and it can change without notice. Use at your own risk. */
  zoneRankings?: Maybe<Scalars['JSON']>;
};


/** A player character. Characters can earn individual rankings and appear in reports. */
export type CharacterEncounterRankingsArgs = {
  byBracket?: Maybe<Scalars['Boolean']>;
  compare?: Maybe<RankingCompareType>;
  difficulty?: Maybe<Scalars['Int']>;
  encounterID?: Maybe<Scalars['Int']>;
  includeCombatantInfo?: Maybe<Scalars['Boolean']>;
  includePrivateLogs?: Maybe<Scalars['Boolean']>;
  metric?: Maybe<CharacterRankingMetricType>;
  partition?: Maybe<Scalars['Int']>;
  role?: Maybe<RoleType>;
  size?: Maybe<Scalars['Int']>;
  specName?: Maybe<Scalars['String']>;
  timeframe?: Maybe<RankingTimeframeType>;
};


/** A player character. Characters can earn individual rankings and appear in reports. */
export type CharacterGameDataArgs = {
  specID?: Maybe<Scalars['Int']>;
};


/** A player character. Characters can earn individual rankings and appear in reports. */
export type CharacterRecentReportsArgs = {
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


/** A player character. Characters can earn individual rankings and appear in reports. */
export type CharacterZoneRankingsArgs = {
  byBracket?: Maybe<Scalars['Boolean']>;
  compare?: Maybe<RankingCompareType>;
  difficulty?: Maybe<Scalars['Int']>;
  includePrivateLogs?: Maybe<Scalars['Boolean']>;
  metric?: Maybe<CharacterRankingMetricType>;
  partition?: Maybe<Scalars['Int']>;
  role?: Maybe<RoleType>;
  size?: Maybe<Scalars['Int']>;
  specName?: Maybe<Scalars['String']>;
  timeframe?: Maybe<RankingTimeframeType>;
  zoneID?: Maybe<Scalars['Int']>;
};

/** The CharacterData object enables the retrieval of single characters or filtered collections of characters. */
export type CharacterData = {
  __typename?: 'CharacterData';
  /** Obtain a specific character either by id or by name/server_slug/server_region. */
  character?: Maybe<Character>;
  /** A collection of characters for a specific guild. */
  characters?: Maybe<CharacterPagination>;
};


/** The CharacterData object enables the retrieval of single characters or filtered collections of characters. */
export type CharacterDataCharacterArgs = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  serverSlug?: Maybe<Scalars['String']>;
  serverRegion?: Maybe<Scalars['String']>;
};


/** The CharacterData object enables the retrieval of single characters or filtered collections of characters. */
export type CharacterDataCharactersArgs = {
  guildID?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};

export type CharacterPagination = {
  __typename?: 'CharacterPagination';
  /** List of items on the current page */
  data?: Maybe<Array<Maybe<Character>>>;
  /** Number of total items selected by the query */
  total: Scalars['Int'];
  /** Number of items returned per page */
  per_page: Scalars['Int'];
  /** Current page of the cursor */
  current_page: Scalars['Int'];
  /** Number of the first item returned */
  from?: Maybe<Scalars['Int']>;
  /** Number of the last item returned */
  to?: Maybe<Scalars['Int']>;
  /** The last page (number of pages) */
  last_page: Scalars['Int'];
  /** Determines if cursor has more pages after the current page */
  has_more_pages: Scalars['Boolean'];
};

/** All the possible metrics. */
export enum CharacterRankingMetricType {
  /** Boss damage per second. */
  Bossdps = 'bossdps',
  /** Boss rDPS is unique to FFXIV and is damage done to the boss adjusted for raid-contributing buffs and debuffs. */
  Bossrdps = 'bossrdps',
  /** Choose an appropriate default depending on the other selected parameters. */
  Default = 'default',
  /** Damage per second. */
  Dps = 'dps',
  /** Healing per second. */
  Hps = 'hps',
  /** Survivability ranking for tanks. Deprecated. Only supported for some older WoW zones. */
  Krsi = 'krsi',
  /** Score. Used by WoW Mythic dungeons and by ESO trials. */
  Playerscore = 'playerscore',
  /** Speed. Not supported by every zone. */
  Playerspeed = 'playerspeed',
  /** rDPS is unique to FFXIV and is damage done adjusted for raid-contributing buffs and debuffs. */
  Rdps = 'rdps',
  /** Healing done per second to tanks. */
  Tankhps = 'tankhps',
  /** Weighted damage per second. Unique to WoW currently. Used to remove pad damage and reward damage done to high priority targets. */
  Wdps = 'wdps',
  /** Unique to FFXIV. Represents the combined ranking for a pair of healers in 8-man content. */
  Healercombineddps = 'healercombineddps',
  /** Unique to FFXIV. Represents the combined ranking for a pair of healers in 8-man content. */
  Healercombinedbossdps = 'healercombinedbossdps',
  /** Unique to FFXIV. Represents the combined ranking for a pair of healers in 8-man content. */
  Healercombinedrdps = 'healercombinedrdps',
  /** Unique to FFXIV. Represents the combined ranking for a pair of healers in 8-man content. */
  Healercombinedbossrdps = 'healercombinedbossrdps',
  /** Unique to FFXIV. Represents the combined ranking for a pair of tanks in 8-man content. */
  Tankcombineddps = 'tankcombineddps',
  /** Unique to FFXIV. Represents the combined ranking for a pair of tanks in 8-man content. */
  Tankcombinedbossdps = 'tankcombinedbossdps',
  /** Unique to FFXIV. Represents the combined ranking for a pair of tanks in 8-man content. */
  Tankcombinedrdps = 'tankcombinedrdps',
  /** Unique to FFXIV. Represents the combined ranking for a pair of tanks in 8-man content. */
  Tankcombinedbossrdps = 'tankcombinedbossrdps'
}

/** A single difficulty for a given raid zone. Difficulties have an integer value representing the actual difficulty, a localized name that describes the difficulty level, and a list of valid sizes for the difficulty level. */
export type Difficulty = {
  __typename?: 'Difficulty';
  /** An integer representing a specific difficulty level within a zone. For example, in World of Warcraft, this could be Mythic. In FF, it could be Savage, etc. */
  id: Scalars['Int'];
  /** The localized name for the difficulty level. */
  name: Scalars['String'];
  /** A list of supported sizes for the difficulty level. An empty result means that the difficulty level has a flexible raid size. */
  sizes?: Maybe<Array<Maybe<Scalars['Int']>>>;
};

/** A single encounter for the game. */
export type Encounter = {
  __typename?: 'Encounter';
  /** The ID of the encounter. */
  id: Scalars['Int'];
  /** The localized name of the encounter. */
  name: Scalars['String'];
  /** Player rankings information for a zone. This data is not considered frozen, and it can change without notice. Use at your own risk. */
  characterRankings?: Maybe<Scalars['JSON']>;
  /** Fight rankings information for a zone. This data is not considered frozen, and it can change without notice. Use at your own risk. */
  fightRankings?: Maybe<Scalars['JSON']>;
  /** The zone that this encounter is found in. */
  zone: Zone;
  /** The Blizzard journal ID, used as the identifier in the encounter journal and various Blizzard APIs like progression. */
  journalID: Scalars['Int'];
};


/** A single encounter for the game. */
export type EncounterCharacterRankingsArgs = {
  bracket?: Maybe<Scalars['Int']>;
  className?: Maybe<Scalars['String']>;
  difficulty?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
  includeCombatantInfo?: Maybe<Scalars['Boolean']>;
  metric?: Maybe<CharacterRankingMetricType>;
  page?: Maybe<Scalars['Int']>;
  partition?: Maybe<Scalars['Int']>;
  serverRegion?: Maybe<Scalars['String']>;
  serverSlug?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Int']>;
  specName?: Maybe<Scalars['String']>;
};


/** A single encounter for the game. */
export type EncounterFightRankingsArgs = {
  bracket?: Maybe<Scalars['Int']>;
  difficulty?: Maybe<Scalars['Int']>;
  filter?: Maybe<Scalars['String']>;
  metric?: Maybe<FightRankingMetricType>;
  page?: Maybe<Scalars['Int']>;
  partition?: Maybe<Scalars['Int']>;
  serverRegion?: Maybe<Scalars['String']>;
  serverSlug?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Int']>;
};

/** The type of events or tables to examine. */
export enum EventDataType {
  /** All Events */
  All = 'All',
  /** Buffs. */
  Buffs = 'Buffs',
  /** Casts. */
  Casts = 'Casts',
  /** Combatant info events (includes gear). */
  CombatantInfo = 'CombatantInfo',
  /** Damage done. */
  DamageDone = 'DamageDone',
  /** Damage taken. */
  DamageTaken = 'DamageTaken',
  /** Deaths. */
  Deaths = 'Deaths',
  /** Debuffs. */
  Debuffs = 'Debuffs',
  /** Dispels. */
  Dispels = 'Dispels',
  /** Healing done. */
  Healing = 'Healing',
  /** Interrupts. */
  Interrupts = 'Interrupts',
  /** Resources. */
  Resources = 'Resources',
  /** Summons */
  Summons = 'Summons',
  /** Threat. */
  Threat = 'Threat'
}

/** A single expansion for the game. */
export type Expansion = {
  __typename?: 'Expansion';
  /** The ID of the expansion. */
  id: Scalars['Int'];
  /** The localized name of the expansion. */
  name: Scalars['String'];
  /** The zones (e.g., raids and dungeons) supported for this expansion. */
  zones?: Maybe<Array<Maybe<Zone>>>;
};

/** All the possible metrics. */
export enum FightRankingMetricType {
  /** Choose an appropriate default depending on the other selected parameters. */
  Default = 'default',
  /** A metric that rewards minimizing deaths and damage taken. */
  Execution = 'execution',
  /** Feats of strength in WoW or Challenges in FF. */
  Feats = 'feats',
  /** For Mythic+ dungeons in WoW, represents the team's score. Used for ESO trials and dungeons also. */
  Score = 'score',
  /** Speed metric, based off the duration of the fight. */
  Speed = 'speed'
}

/** A single ability for the game. */
export type GameAbility = {
  __typename?: 'GameAbility';
  /** The ID of the ability. */
  id: Scalars['Int'];
  /** A description for the ability if it is available. */
  description?: Maybe<Scalars['String']>;
  /** The icon for the ability. */
  icon?: Maybe<Scalars['String']>;
  /** The localized name of the ability. Will be null if no localization information exists for the ability. */
  name?: Maybe<Scalars['String']>;
};

export type GameAbilityPagination = {
  __typename?: 'GameAbilityPagination';
  /** List of items on the current page */
  data?: Maybe<Array<Maybe<GameAbility>>>;
  /** Number of total items selected by the query */
  total: Scalars['Int'];
  /** Number of items returned per page */
  per_page: Scalars['Int'];
  /** Current page of the cursor */
  current_page: Scalars['Int'];
  /** Number of the first item returned */
  from?: Maybe<Scalars['Int']>;
  /** Number of the last item returned */
  to?: Maybe<Scalars['Int']>;
  /** The last page (number of pages) */
  last_page: Scalars['Int'];
  /** Determines if cursor has more pages after the current page */
  has_more_pages: Scalars['Boolean'];
};

/** A single achievement for the game. */
export type GameAchievement = {
  __typename?: 'GameAchievement';
  /** The ID of the achievement. */
  id: Scalars['Int'];
  /** The icon for the achievement. */
  icon?: Maybe<Scalars['String']>;
  /** The localized name of the achievement. Will be null if no localization information exists for the achievement. */
  name?: Maybe<Scalars['String']>;
};

export type GameAchievementPagination = {
  __typename?: 'GameAchievementPagination';
  /** List of items on the current page */
  data?: Maybe<Array<Maybe<GameAchievement>>>;
  /** Number of total items selected by the query */
  total: Scalars['Int'];
  /** Number of items returned per page */
  per_page: Scalars['Int'];
  /** Current page of the cursor */
  current_page: Scalars['Int'];
  /** Number of the first item returned */
  from?: Maybe<Scalars['Int']>;
  /** Number of the last item returned */
  to?: Maybe<Scalars['Int']>;
  /** The last page (number of pages) */
  last_page: Scalars['Int'];
  /** Determines if cursor has more pages after the current page */
  has_more_pages: Scalars['Boolean'];
};

/** A single affix for Mythic Keystone dungeons. */
export type GameAffix = {
  __typename?: 'GameAffix';
  /** The ID of the affix. */
  id: Scalars['Int'];
  /** The icon for the affix. */
  icon?: Maybe<Scalars['String']>;
  /** The localized name of the affix. Will be null if no localization information exists for the affix. */
  name?: Maybe<Scalars['String']>;
};

/** A single player class for the game. */
export type GameClass = {
  __typename?: 'GameClass';
  /** An integer used to identify the class. */
  id: Scalars['Int'];
  /** The localized name of the class. */
  name: Scalars['String'];
  /** A slug used to identify the class. */
  slug: Scalars['String'];
  /** The specs supported by the class. */
  specs?: Maybe<Array<Maybe<Spec>>>;
};

/** The game object contains collections of data such as NPCs, classes, abilities, items, maps, etc. Game data only changes when major game patches are released, so you should cache results for as long as possible and only update when new content is released for the game. */
export type GameData = {
  __typename?: 'GameData';
  /** The player and enemy abilities for the game. */
  abilities?: Maybe<GameAbilityPagination>;
  /** Obtain a single ability for the game. */
  ability?: Maybe<GameAbility>;
  /** Obtain a single achievement for the game. */
  achievement?: Maybe<GameAchievement>;
  /** Achievements for the game. */
  achievements?: Maybe<GameAchievementPagination>;
  /** Obtain a single class for the game. */
  class?: Maybe<GameClass>;
  /** Obtain the supported classes for the game. */
  classes?: Maybe<Array<Maybe<GameClass>>>;
  /** Obtain a single enchant for the game. */
  enchant?: Maybe<GameEnchant>;
  /** Enchants for the game. */
  enchants?: Maybe<GameEnchantPagination>;
  /** Obtain all the factions that guilds and players can belong to. */
  factions?: Maybe<Array<Maybe<GameFaction>>>;
  /** Obtain a single map for the game. */
  map?: Maybe<GameMap>;
  /** Maps for the game. */
  maps?: Maybe<GameMapPagination>;
  /** Obtain a single NPC for the game. */
  npc?: Maybe<GameNpc>;
  /** NPCs for the game. */
  npcs?: Maybe<GameNpcPagination>;
  /** Obtain a single zone for the game, not to be confused with the worldData zones for ranking bosses and dungeons. */
  zone?: Maybe<GameZone>;
  /** Zones for the game. */
  zones?: Maybe<GameZonePagination>;
};


/** The game object contains collections of data such as NPCs, classes, abilities, items, maps, etc. Game data only changes when major game patches are released, so you should cache results for as long as possible and only update when new content is released for the game. */
export type GameDataAbilitiesArgs = {
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


/** The game object contains collections of data such as NPCs, classes, abilities, items, maps, etc. Game data only changes when major game patches are released, so you should cache results for as long as possible and only update when new content is released for the game. */
export type GameDataAbilityArgs = {
  id?: Maybe<Scalars['Int']>;
};


/** The game object contains collections of data such as NPCs, classes, abilities, items, maps, etc. Game data only changes when major game patches are released, so you should cache results for as long as possible and only update when new content is released for the game. */
export type GameDataAchievementArgs = {
  id?: Maybe<Scalars['Int']>;
};


/** The game object contains collections of data such as NPCs, classes, abilities, items, maps, etc. Game data only changes when major game patches are released, so you should cache results for as long as possible and only update when new content is released for the game. */
export type GameDataAchievementsArgs = {
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


/** The game object contains collections of data such as NPCs, classes, abilities, items, maps, etc. Game data only changes when major game patches are released, so you should cache results for as long as possible and only update when new content is released for the game. */
export type GameDataClassArgs = {
  id?: Maybe<Scalars['Int']>;
  faction_id?: Maybe<Scalars['Int']>;
  zone_id?: Maybe<Scalars['Int']>;
};


/** The game object contains collections of data such as NPCs, classes, abilities, items, maps, etc. Game data only changes when major game patches are released, so you should cache results for as long as possible and only update when new content is released for the game. */
export type GameDataClassesArgs = {
  faction_id?: Maybe<Scalars['Int']>;
  zone_id?: Maybe<Scalars['Int']>;
};


/** The game object contains collections of data such as NPCs, classes, abilities, items, maps, etc. Game data only changes when major game patches are released, so you should cache results for as long as possible and only update when new content is released for the game. */
export type GameDataEnchantArgs = {
  id?: Maybe<Scalars['Int']>;
};


/** The game object contains collections of data such as NPCs, classes, abilities, items, maps, etc. Game data only changes when major game patches are released, so you should cache results for as long as possible and only update when new content is released for the game. */
export type GameDataEnchantsArgs = {
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


/** The game object contains collections of data such as NPCs, classes, abilities, items, maps, etc. Game data only changes when major game patches are released, so you should cache results for as long as possible and only update when new content is released for the game. */
export type GameDataMapArgs = {
  id?: Maybe<Scalars['Int']>;
};


/** The game object contains collections of data such as NPCs, classes, abilities, items, maps, etc. Game data only changes when major game patches are released, so you should cache results for as long as possible and only update when new content is released for the game. */
export type GameDataMapsArgs = {
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


/** The game object contains collections of data such as NPCs, classes, abilities, items, maps, etc. Game data only changes when major game patches are released, so you should cache results for as long as possible and only update when new content is released for the game. */
export type GameDataNpcArgs = {
  id?: Maybe<Scalars['Int']>;
};


/** The game object contains collections of data such as NPCs, classes, abilities, items, maps, etc. Game data only changes when major game patches are released, so you should cache results for as long as possible and only update when new content is released for the game. */
export type GameDataNpcsArgs = {
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


/** The game object contains collections of data such as NPCs, classes, abilities, items, maps, etc. Game data only changes when major game patches are released, so you should cache results for as long as possible and only update when new content is released for the game. */
export type GameDataZoneArgs = {
  id?: Maybe<Scalars['Int']>;
};


/** The game object contains collections of data such as NPCs, classes, abilities, items, maps, etc. Game data only changes when major game patches are released, so you should cache results for as long as possible and only update when new content is released for the game. */
export type GameDataZonesArgs = {
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};

/** A single enchant for the game. */
export type GameEnchant = {
  __typename?: 'GameEnchant';
  /** The ID of the enchant. */
  id: Scalars['Int'];
  /** The localized name of the enchant. Will be null if no localization information exists for the enchant. */
  name?: Maybe<Scalars['String']>;
};

export type GameEnchantPagination = {
  __typename?: 'GameEnchantPagination';
  /** List of items on the current page */
  data?: Maybe<Array<Maybe<GameEnchant>>>;
  /** Number of total items selected by the query */
  total: Scalars['Int'];
  /** Number of items returned per page */
  per_page: Scalars['Int'];
  /** Current page of the cursor */
  current_page: Scalars['Int'];
  /** Number of the first item returned */
  from?: Maybe<Scalars['Int']>;
  /** Number of the last item returned */
  to?: Maybe<Scalars['Int']>;
  /** The last page (number of pages) */
  last_page: Scalars['Int'];
  /** Determines if cursor has more pages after the current page */
  has_more_pages: Scalars['Boolean'];
};

/** A faction that a player or guild can belong to. Factions have an integer id used to identify them throughout the API and a localized name describing the faction. */
export type GameFaction = {
  __typename?: 'GameFaction';
  /** An integer representing the faction id. */
  id: Scalars['Int'];
  /** The localized name of the faction. */
  name: Scalars['String'];
};

/** A single item for the game. */
export type GameItem = {
  __typename?: 'GameItem';
  /** The ID of the item. */
  id: Scalars['Int'];
  /** The icon for the item. */
  icon?: Maybe<Scalars['String']>;
  /** The localized name of the item. Will be null if no localization information exists for the item. */
  name?: Maybe<Scalars['String']>;
};

/** A single item set for the game. */
export type GameItemSet = {
  __typename?: 'GameItemSet';
  /** The ID of the item set. */
  id: Scalars['Int'];
  /** The localized name of the item set. Will be null if no localization information exists for the item set. */
  name?: Maybe<Scalars['String']>;
};

/** A single map for the game. */
export type GameMap = {
  __typename?: 'GameMap';
  /** The ID of the mao. */
  id: Scalars['Int'];
  /** The localized name of the map. Will be null if no localization information exists for the map. */
  name?: Maybe<Scalars['String']>;
};

export type GameMapPagination = {
  __typename?: 'GameMapPagination';
  /** List of items on the current page */
  data?: Maybe<Array<Maybe<GameMap>>>;
  /** Number of total items selected by the query */
  total: Scalars['Int'];
  /** Number of items returned per page */
  per_page: Scalars['Int'];
  /** Current page of the cursor */
  current_page: Scalars['Int'];
  /** Number of the first item returned */
  from?: Maybe<Scalars['Int']>;
  /** Number of the last item returned */
  to?: Maybe<Scalars['Int']>;
  /** The last page (number of pages) */
  last_page: Scalars['Int'];
  /** Determines if cursor has more pages after the current page */
  has_more_pages: Scalars['Boolean'];
};

/** A single NPC for the game. */
export type GameNpc = {
  __typename?: 'GameNPC';
  /** The ID of the NPC. */
  id: Scalars['Int'];
  /** The localized name of the NPC. Will be null if no localization information exists for the NPC. */
  name?: Maybe<Scalars['String']>;
};

export type GameNpcPagination = {
  __typename?: 'GameNPCPagination';
  /** List of items on the current page */
  data?: Maybe<Array<Maybe<GameNpc>>>;
  /** Number of total items selected by the query */
  total: Scalars['Int'];
  /** Number of items returned per page */
  per_page: Scalars['Int'];
  /** Current page of the cursor */
  current_page: Scalars['Int'];
  /** Number of the first item returned */
  from?: Maybe<Scalars['Int']>;
  /** Number of the last item returned */
  to?: Maybe<Scalars['Int']>;
  /** The last page (number of pages) */
  last_page: Scalars['Int'];
  /** Determines if cursor has more pages after the current page */
  has_more_pages: Scalars['Boolean'];
};

/** A single zone for the game. */
export type GameZone = {
  __typename?: 'GameZone';
  /** The ID of the zone. */
  id: Scalars['Int'];
  /** The localized name of the zone. Will be null if no localization information exists for the zone. */
  name?: Maybe<Scalars['String']>;
};

export type GameZonePagination = {
  __typename?: 'GameZonePagination';
  /** List of items on the current page */
  data?: Maybe<Array<Maybe<GameZone>>>;
  /** Number of total items selected by the query */
  total: Scalars['Int'];
  /** Number of items returned per page */
  per_page: Scalars['Int'];
  /** Current page of the cursor */
  current_page: Scalars['Int'];
  /** Number of the first item returned */
  from?: Maybe<Scalars['Int']>;
  /** Number of the last item returned */
  to?: Maybe<Scalars['Int']>;
  /** The last page (number of pages) */
  last_page: Scalars['Int'];
  /** Determines if cursor has more pages after the current page */
  has_more_pages: Scalars['Boolean'];
};

/** The type of graph to examine. */
export enum GraphDataType {
  /** Summary Overview */
  Summary = 'Summary',
  /** Buffs. */
  Buffs = 'Buffs',
  /** Casts. */
  Casts = 'Casts',
  /** Damage done. */
  DamageDone = 'DamageDone',
  /** Damage taken. */
  DamageTaken = 'DamageTaken',
  /** Deaths. */
  Deaths = 'Deaths',
  /** Debuffs. */
  Debuffs = 'Debuffs',
  /** Dispels. */
  Dispels = 'Dispels',
  /** Healing done. */
  Healing = 'Healing',
  /** Interrupts. */
  Interrupts = 'Interrupts',
  /** Resources. */
  Resources = 'Resources',
  /** Summons */
  Summons = 'Summons',
  /** Survivability (death info across multiple pulls). */
  Survivability = 'Survivability',
  /** Threat. */
  Threat = 'Threat'
}

/** A single guild. Guilds earn their own rankings and contain characters. They may correspond to a guild in-game or be a custom guild created just to hold reports and rankings. */
export type Guild = {
  __typename?: 'Guild';
  attendance: GuildAttendancePagination;
  /** Whether or not the guild has competition mode enabled. */
  competitionMode: Scalars['Boolean'];
  /** The description for the guild that is displayed with the guild name on the site. */
  description: Scalars['String'];
  /** The faction of the guild. */
  faction: GameFaction;
  /** The ID of the guild. */
  id: Scalars['Int'];
  /** The name of the guild. */
  name: Scalars['String'];
  /** The server that the guild belongs to. */
  server: Server;
  /** Whether or not the guild has stealth mode enabled. */
  stealthMode: Scalars['Boolean'];
  /** The tags used to label reports. In the site UI, these are called raid teams. */
  tags?: Maybe<Array<Maybe<GuildTag>>>;
  /** The member roster for a specific guild. The result of this query is a paginated list of characters. This query only works for games where the guild roster is verifiable, e.g., it does not work for Classic Warcraft. */
  members: CharacterPagination;
};


/** A single guild. Guilds earn their own rankings and contain characters. They may correspond to a guild in-game or be a custom guild created just to hold reports and rankings. */
export type GuildAttendanceArgs = {
  guildTagID?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  zoneID?: Maybe<Scalars['Int']>;
};


/** A single guild. Guilds earn their own rankings and contain characters. They may correspond to a guild in-game or be a custom guild created just to hold reports and rankings. */
export type GuildMembersArgs = {
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};

/** Attendance for a specific report within a guild. */
export type GuildAttendance = {
  __typename?: 'GuildAttendance';
  /** The code of the report for the raid night. */
  code: Scalars['String'];
  /** The players that attended that raid night. */
  players?: Maybe<Array<Maybe<PlayerAttendance>>>;
  /** The start time of the raid night. */
  startTime?: Maybe<Scalars['Float']>;
  /** The principal zone of the raid night. */
  zone?: Maybe<Zone>;
};

export type GuildAttendancePagination = {
  __typename?: 'GuildAttendancePagination';
  /** List of items on the current page */
  data?: Maybe<Array<Maybe<GuildAttendance>>>;
  /** Number of total items selected by the query */
  total: Scalars['Int'];
  /** Number of items returned per page */
  per_page: Scalars['Int'];
  /** Current page of the cursor */
  current_page: Scalars['Int'];
  /** Number of the first item returned */
  from?: Maybe<Scalars['Int']>;
  /** Number of the last item returned */
  to?: Maybe<Scalars['Int']>;
  /** The last page (number of pages) */
  last_page: Scalars['Int'];
  /** Determines if cursor has more pages after the current page */
  has_more_pages: Scalars['Boolean'];
};

/** The GuildData object enables the retrieval of single guilds or filtered collections of guilds. */
export type GuildData = {
  __typename?: 'GuildData';
  /** Obtain a specific guild either by id or by name/serverSlug/serverRegion. */
  guild?: Maybe<Guild>;
  /** The set of all guilds supported by the site. Can be optionally filtered to a specific server id. */
  guilds?: Maybe<GuildPagination>;
};


/** The GuildData object enables the retrieval of single guilds or filtered collections of guilds. */
export type GuildDataGuildArgs = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  serverSlug?: Maybe<Scalars['String']>;
  serverRegion?: Maybe<Scalars['String']>;
};


/** The GuildData object enables the retrieval of single guilds or filtered collections of guilds. */
export type GuildDataGuildsArgs = {
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  serverID?: Maybe<Scalars['Int']>;
  serverSlug?: Maybe<Scalars['String']>;
  serverRegion?: Maybe<Scalars['String']>;
};

export type GuildPagination = {
  __typename?: 'GuildPagination';
  /** List of items on the current page */
  data?: Maybe<Array<Maybe<Guild>>>;
  /** Number of total items selected by the query */
  total: Scalars['Int'];
  /** Number of items returned per page */
  per_page: Scalars['Int'];
  /** Current page of the cursor */
  current_page: Scalars['Int'];
  /** Number of the first item returned */
  from?: Maybe<Scalars['Int']>;
  /** Number of the last item returned */
  to?: Maybe<Scalars['Int']>;
  /** The last page (number of pages) */
  last_page: Scalars['Int'];
  /** Determines if cursor has more pages after the current page */
  has_more_pages: Scalars['Boolean'];
};

/** The tag for a specific guild. Tags can be used to categorize reports within a guild. In the site UI, they are referred to as report tags. */
export type GuildTag = {
  __typename?: 'GuildTag';
  /** The ID of the tag. */
  id: Scalars['Int'];
  /** The guild that the tag belongs to. */
  guild: Guild;
  /** The name of the guild. */
  name: Scalars['String'];
};

/** Whether or not to fetch information for friendlies or enemies. */
export enum HostilityType {
  /** Fetch information for friendlies. */
  Friendlies = 'Friendlies',
  /** Fetch information for enemies. */
  Enemies = 'Enemies'
}


/** A filter for kills vs wipes and encounters vs trash. */
export enum KillType {
  /** Include trash and encounters. */
  All = 'All',
  /** Only include encounters (kills and wipes). */
  Encounters = 'Encounters',
  /** Only include encounters that end in a kill. */
  Kills = 'Kills',
  /** Only include trash. */
  Trash = 'Trash',
  /** Only include encounters that end in a wipe. */
  Wipes = 'Wipes'
}

/** A single partition for a given raid zone. Partitions have an integer value representing the actual partition and a localized name that describes what the partition represents. Partitions contain their own rankings, statistics and all stars. */
export type Partition = {
  __typename?: 'Partition';
  /** An integer representing a specific partition within a zone. */
  id: Scalars['Int'];
  /** The localized name for partition. */
  name: Scalars['String'];
  /** The compact localized name for the partition. Typically an abbreviation to conserve space. */
  compactName: Scalars['String'];
  /** Whether or not the partition is the current default when viewing rankings or statistics for the zone. */
  default: Scalars['Boolean'];
};

/** Attendance for a specific player on a specific raid night. */
export type PlayerAttendance = {
  __typename?: 'PlayerAttendance';
  /** The name of the player. */
  name?: Maybe<Scalars['String']>;
  /** The class of the player. */
  type?: Maybe<Scalars['String']>;
  /** Presence info for the player. A value of 1 means the player was present. A value of 2 indicates present but on the bench. */
  presence?: Maybe<Scalars['Int']>;
};

/** A way to obtain data for the top guilds involved in an ongoing world first or realm first progress race. */
export type ProgressRaceData = {
  __typename?: 'ProgressRaceData';
  /** Progress race information including best percentages, pull counts and streams for top guilds. This API is only active when there is an ongoing race. The format of this JSON may change without notice and is not considered frozen. */
  progressRace?: Maybe<Scalars['JSON']>;
};


/** A way to obtain data for the top guilds involved in an ongoing world first or realm first progress race. */
export type ProgressRaceDataProgressRaceArgs = {
  serverRegion?: Maybe<Scalars['String']>;
  serverSlug?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  /** Obtain the character data object that allows the retrieval of individual characters or filtered collections of characters. */
  characterData?: Maybe<CharacterData>;
  /** Obtain the game data object that holds collections of static data such as abilities, achievements, classes, items, NPCs, etc.. */
  gameData?: Maybe<GameData>;
  /** Obtain the guild data object that allows the retrieval of individual guilds or filtered collections of guilds. */
  guildData?: Maybe<GuildData>;
  /** Obtain information about an ongoing world first or realm first race. Inactive when no race is occurring. This data only updates once every 30 seconds, so you do not need to fetch this information more often than that. */
  progressRaceData?: Maybe<ProgressRaceData>;
  /** Obtain the rate limit data object to see how many points have been spent by this key. */
  rateLimitData?: Maybe<RateLimitData>;
  /** Obtain the report data object that allows the retrieval of individual reports or filtered collections of reports by guild or by user. */
  reportData?: Maybe<ReportData>;
  /** Obtain the world data object that holds collections of data such as all expansions, regions, subregions, servers, dungeon/raid zones, and encounters. */
  worldData?: Maybe<WorldData>;
};

/** Whether or not rankings are compared against best scores for the entire tier or against all parses in a two week window. */
export enum RankingCompareType {
  /** Compare against rankings. */
  Rankings = 'Rankings',
  /** Compare against all parses in a two week window. */
  Parses = 'Parses'
}

/** Whether or not rankings are today or historical. */
export enum RankingTimeframeType {
  /** Compare against today's rankings. */
  Today = 'Today',
  /** Compare against historical rankings. */
  Historical = 'Historical'
}

/** A way to obtain your current rate limit usage. */
export type RateLimitData = {
  __typename?: 'RateLimitData';
  /** The total amount of points this API key can spend per hour. */
  limitPerHour: Scalars['Int'];
  /** The total amount of points spent during this hour. */
  pointsSpentThisHour: Scalars['Float'];
  /** The number of seconds remaining until the points reset. */
  pointsResetIn: Scalars['Int'];
};

/** A single region for the game. */
export type Region = {
  __typename?: 'Region';
  /** The ID of the region. */
  id: Scalars['Int'];
  /** The localized compact name of the region, e.g., US for United States. */
  compactName: Scalars['String'];
  /** The localized name of the region. */
  name: Scalars['String'];
  /** The slug for the region, usable when looking up characters and guilds by server. */
  slug: Scalars['String'];
  /** The subregions found within this region. */
  subregions?: Maybe<Array<Maybe<Subregion>>>;
  /** The servers found within this region. */
  servers?: Maybe<ServerPagination>;
};


/** A single region for the game. */
export type RegionServersArgs = {
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};

/** A single report uploaded by a player to a guild or personal logs. */
export type Report = {
  __typename?: 'Report';
  /** The report code, a unique value used to identify the report. */
  code: Scalars['String'];
  /** The end time of the report. This is a UNIX timestamp representing the timestamp of the last event contained in the report. */
  endTime: Scalars['Float'];
  /** A set of paginated report events, filterable via arguments like type, source, target, ability, etc. This data is not considered frozen, and it can change without notice. Use at your own risk. */
  events?: Maybe<ReportEventPaginator>;
  /** The number of exported segments in the report. This is how many segments have been processed for rankings. */
  exportedSegments: Scalars['Int'];
  /** A set of fights with details about participating players. */
  fights?: Maybe<Array<Maybe<ReportFight>>>;
  /** A graph of information for a report, filterable via arguments like type, source, target, ability, etc. This data is not considered frozen, and it can change without notice. Use at your own risk. */
  graph?: Maybe<Scalars['JSON']>;
  /** The guild that the report belongs to. If this is null, then the report was uploaded to the user's personal logs. */
  guild?: Maybe<Guild>;
  /** The guild tag that the report belongs to. If this is null, then the report was not tagged. */
  guildTag?: Maybe<GuildTag>;
  /** The user that uploaded the report. */
  owner?: Maybe<User>;
  /** Data from the report's master file. This includes version info, all of the players, NPCs and pets that occur in the report, and all the game abilities used in the report. */
  masterData?: Maybe<ReportMasterData>;
  /** A list of all characters that ranked on kills in the report. */
  rankedCharacters?: Maybe<Array<Maybe<Character>>>;
  /** Rankings information for a report, filterable to specific fights, bosses, metrics, etc. This data is not considered frozen, and it can change without notice. Use at your own risk. */
  rankings?: Maybe<Scalars['JSON']>;
  /** The region of the report. */
  region?: Maybe<Region>;
  /** The revision of the report. This number is increased when reports get re-exported. */
  revision: Scalars['Int'];
  /** The number of uploaded segments in the report. */
  segments: Scalars['Int'];
  /** The start time of the report. This is a UNIX timestamp representing the timestamp of the first event contained in the report. */
  startTime: Scalars['Float'];
  /** A table of information for a report, filterable via arguments like type, source, target, ability, etc. This data is not considered frozen, and it can change without notice. Use at your own risk. */
  table?: Maybe<Scalars['JSON']>;
  /** A title for the report. */
  title: Scalars['String'];
  /** The visibility level of the report. The possible values are 'public', 'private', and 'unlisted'. */
  visibility: Scalars['String'];
  /** The principal zone that the report contains fights for. Null if no supported zone exists. */
  zone?: Maybe<Zone>;
};


/** A single report uploaded by a player to a guild or personal logs. */
export type ReportEventsArgs = {
  abilityID?: Maybe<Scalars['Float']>;
  dataType?: Maybe<EventDataType>;
  death?: Maybe<Scalars['Int']>;
  difficulty?: Maybe<Scalars['Int']>;
  encounterID?: Maybe<Scalars['Int']>;
  endTime?: Maybe<Scalars['Float']>;
  fightIDs?: Maybe<Array<Maybe<Scalars['Int']>>>;
  filterExpression?: Maybe<Scalars['String']>;
  hostilityType?: Maybe<HostilityType>;
  includeResources?: Maybe<Scalars['Boolean']>;
  killType?: Maybe<KillType>;
  limit?: Maybe<Scalars['Int']>;
  sourceClass?: Maybe<Scalars['String']>;
  sourceID?: Maybe<Scalars['Int']>;
  sourceInstanceID?: Maybe<Scalars['Int']>;
  startTime?: Maybe<Scalars['Float']>;
  targetClass?: Maybe<Scalars['String']>;
  targetID?: Maybe<Scalars['Int']>;
  targetInstanceID?: Maybe<Scalars['Int']>;
  translate?: Maybe<Scalars['Boolean']>;
  viewOptions?: Maybe<Scalars['Int']>;
  wipeCutoff?: Maybe<Scalars['Int']>;
};


/** A single report uploaded by a player to a guild or personal logs. */
export type ReportFightsArgs = {
  difficulty?: Maybe<Scalars['Int']>;
  encounterID?: Maybe<Scalars['Int']>;
  fightIDs?: Maybe<Array<Maybe<Scalars['Int']>>>;
  killType?: Maybe<KillType>;
  translate?: Maybe<Scalars['Boolean']>;
};


/** A single report uploaded by a player to a guild or personal logs. */
export type ReportGraphArgs = {
  abilityID?: Maybe<Scalars['Float']>;
  dataType?: Maybe<GraphDataType>;
  death?: Maybe<Scalars['Int']>;
  difficulty?: Maybe<Scalars['Int']>;
  encounterID?: Maybe<Scalars['Int']>;
  endTime?: Maybe<Scalars['Float']>;
  fightIDs?: Maybe<Array<Maybe<Scalars['Int']>>>;
  filterExpression?: Maybe<Scalars['String']>;
  hostilityType?: Maybe<HostilityType>;
  killType?: Maybe<KillType>;
  sourceClass?: Maybe<Scalars['String']>;
  sourceID?: Maybe<Scalars['Int']>;
  sourceInstanceID?: Maybe<Scalars['Int']>;
  startTime?: Maybe<Scalars['Float']>;
  targetClass?: Maybe<Scalars['String']>;
  targetID?: Maybe<Scalars['Int']>;
  targetInstanceID?: Maybe<Scalars['Int']>;
  translate?: Maybe<Scalars['Boolean']>;
  viewOptions?: Maybe<Scalars['Int']>;
  viewBy?: Maybe<ViewType>;
  wipeCutoff?: Maybe<Scalars['Int']>;
};


/** A single report uploaded by a player to a guild or personal logs. */
export type ReportMasterDataArgs = {
  translate?: Maybe<Scalars['Boolean']>;
};


/** A single report uploaded by a player to a guild or personal logs. */
export type ReportRankingsArgs = {
  compare?: Maybe<RankingCompareType>;
  difficulty?: Maybe<Scalars['Int']>;
  encounterID?: Maybe<Scalars['Int']>;
  fightIDs?: Maybe<Array<Maybe<Scalars['Int']>>>;
  playerMetric?: Maybe<ReportRankingMetricType>;
  timeframe?: Maybe<RankingTimeframeType>;
};


/** A single report uploaded by a player to a guild or personal logs. */
export type ReportTableArgs = {
  abilityID?: Maybe<Scalars['Float']>;
  dataType?: Maybe<TableDataType>;
  death?: Maybe<Scalars['Int']>;
  difficulty?: Maybe<Scalars['Int']>;
  encounterID?: Maybe<Scalars['Int']>;
  endTime?: Maybe<Scalars['Float']>;
  fightIDs?: Maybe<Array<Maybe<Scalars['Int']>>>;
  filterExpression?: Maybe<Scalars['String']>;
  hostilityType?: Maybe<HostilityType>;
  killType?: Maybe<KillType>;
  sourceClass?: Maybe<Scalars['String']>;
  sourceID?: Maybe<Scalars['Int']>;
  sourceInstanceID?: Maybe<Scalars['Int']>;
  startTime?: Maybe<Scalars['Float']>;
  targetClass?: Maybe<Scalars['String']>;
  targetID?: Maybe<Scalars['Int']>;
  targetInstanceID?: Maybe<Scalars['Int']>;
  translate?: Maybe<Scalars['Boolean']>;
  viewOptions?: Maybe<Scalars['Int']>;
  viewBy?: Maybe<ViewType>;
  wipeCutoff?: Maybe<Scalars['Int']>;
};

/** The ReportAbility represents a single ability that occurs in the report. */
export type ReportAbility = {
  __typename?: 'ReportAbility';
  /** The game ID of the ability. */
  gameID?: Maybe<Scalars['Float']>;
  /** An icon to use for the ability. */
  icon?: Maybe<Scalars['String']>;
  /** The name of the actor. */
  name?: Maybe<Scalars['String']>;
  /** The type of the ability. This represents the type of damage (e.g., the spell school in WoW). */
  type?: Maybe<Scalars['String']>;
};

/** The ReportActor represents a single player, pet or NPC that occurs in the report. */
export type ReportActor = {
  __typename?: 'ReportActor';
  /** The game ID of the actor. */
  gameID?: Maybe<Scalars['Float']>;
  /** An icon to use for the actor. For pets and NPCs, this will be the icon the site chose to represent that actor. */
  icon?: Maybe<Scalars['String']>;
  /** The report ID of the actor. This ID is used in events to identify sources and targets. */
  id?: Maybe<Scalars['Int']>;
  /** The name of the actor. */
  name?: Maybe<Scalars['String']>;
  /** The report ID of the actor's owner if the actor is a pet. */
  petOwner?: Maybe<Scalars['Int']>;
  /** The normalized server name of the actor. */
  server?: Maybe<Scalars['String']>;
  /** The sub-type of the actor, for players it's their class, and for NPCs, they are further subdivided into normal NPCs and bosses. */
  subType?: Maybe<Scalars['String']>;
  /** The type of the actor, i.e., if it is a player, pet or NPC. */
  type?: Maybe<Scalars['String']>;
};

/** The ReportData object enables the retrieval of single reports or filtered collections of reports. */
export type ReportData = {
  __typename?: 'ReportData';
  /** Obtain a specific report by its code. */
  report?: Maybe<Report>;
  /** A set of reports for a specific guild, guild tag, or user. */
  reports?: Maybe<ReportPagination>;
};


/** The ReportData object enables the retrieval of single reports or filtered collections of reports. */
export type ReportDataReportArgs = {
  code?: Maybe<Scalars['String']>;
};


/** The ReportData object enables the retrieval of single reports or filtered collections of reports. */
export type ReportDataReportsArgs = {
  endTime?: Maybe<Scalars['Float']>;
  guildID?: Maybe<Scalars['Int']>;
  guildName?: Maybe<Scalars['String']>;
  guildServerSlug?: Maybe<Scalars['String']>;
  guildServerRegion?: Maybe<Scalars['String']>;
  guildTagID?: Maybe<Scalars['Int']>;
  userID?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  startTime?: Maybe<Scalars['Float']>;
  zoneID?: Maybe<Scalars['Int']>;
};

/** The ReportEventPaginator represents a paginated list of report events. */
export type ReportEventPaginator = {
  __typename?: 'ReportEventPaginator';
  /** The list of events obtained. */
  data?: Maybe<Scalars['JSON']>;
  /** A timestamp to pass in as the start time when fetching the next page of data. */
  nextPageTimestamp?: Maybe<Scalars['Float']>;
};

/** The ReportFight represents a single fight that occurs in the report. */
export type ReportFight = {
  __typename?: 'ReportFight';
  /** The average item level of the players in the fight. */
  averageItemLevel?: Maybe<Scalars['Float']>;
  /** The percentage health of the active boss or bosses at the end of a fight. */
  bossPercentage?: Maybe<Scalars['Float']>;
  /** Whether or not a fight represents an entire raid from start to finish, e.g., in Classic WoW a complete run of Blackwing Lair. */
  completeRaid: Scalars['Boolean'];
  /** The difficulty setting for the raid, dungeon, or arena. Null for trash. */
  difficulty?: Maybe<Scalars['Int']>;
  /** The encounter ID of the fight. If the ID is 0, the fight is considered a trash fight. */
  encounterID: Scalars['Int'];
  /** The end time of the fight. This is a timestamp with millisecond precision that is relative to the start of the report, i.e., the start of the report is considered time 0. */
  endTime: Scalars['Float'];
  /** Information about enemy NPCs involved in the fight. Includes report IDs, instance counts, and instance group counts for each NPC. */
  enemyNPCs?: Maybe<Array<Maybe<ReportFightNpc>>>;
  /** The IDs of all players involved in a fight. These players can be referenced in the master data actors table to get detailed information about each participant. */
  enemyPlayers?: Maybe<Array<Maybe<Scalars['Int']>>>;
  /** The actual completion percentage of the fight. This is the field used to indicate how far into a fight a wipe was, since fights can be complicated and have multiple bosses, no bosses, bosses that heal, etc. */
  fightPercentage?: Maybe<Scalars['Float']>;
  /** Information about friendly NPCs involved in the fight. Includes report IDs, instance counts, and instance group counts for each NPC. */
  friendlyNPCs?: Maybe<Array<Maybe<ReportFightNpc>>>;
  /** The IDs of all players involved in a fight. These players can be referenced in the master data actors table to get detailed information about each participant. */
  friendlyPlayers?: Maybe<Array<Maybe<Scalars['Int']>>>;
  /** The report ID of the fight. This ID can be used to fetch only events, tables or graphs for this fight. */
  id: Scalars['Int'];
  /** The affixes for a Mythic+ dungeon. */
  keystoneAffixes?: Maybe<Array<Maybe<Scalars['Int']>>>;
  /** The bonus field represents Bronze, Silver or Gold in Challenge Modes, or +1-+3 pushing of Mythic+ keys. It has the values 1, 2, and 3. */
  keystoneBonus?: Maybe<Scalars['Int']>;
  /** The keystone level for a Mythic+ dungeon. */
  keystoneLevel?: Maybe<Scalars['Int']>;
  /** The completion time for a Challenge Mode or Mythic+ Dungeon. This is the official time used on Blizzard leaderboards. */
  keystoneTime?: Maybe<Scalars['Int']>;
  /** Whether or not the fight was a boss kill, i.e., successful. If this field is false, it means the fight was an incomplete run, etc.. */
  kill?: Maybe<Scalars['Boolean']>;
  /** The name of the fight. */
  name: Scalars['String'];
  /** The group size for the raid, dungeon, or arena. Null for trash. */
  size?: Maybe<Scalars['Int']>;
  /** The start time of the fight. This is a timestamp with millisecond precision that is relative to the start of the report, i.e., the start of the report is considered time 0. */
  startTime: Scalars['Float'];
};

/** The ReportFightNPC represents participation info within a single fight for an NPC. */
export type ReportFightNpc = {
  __typename?: 'ReportFightNPC';
  /** The report ID of the actor. This ID is used in events to identify sources and targets. */
  id?: Maybe<Scalars['Int']>;
  /** How many instances of the NPC were seen during the fight. */
  instanceCount?: Maybe<Scalars['Int']>;
  /** How many packs of the NPC were seen during the fight. */
  groupCount?: Maybe<Scalars['Int']>;
};

/** The ReporMastertData object contains information about the log version of a report, as well as the actors and abilities used in the report. */
export type ReportMasterData = {
  __typename?: 'ReportMasterData';
  /** The version of the client parser that was used to parse and upload this log file. */
  logVersion: Scalars['Int'];
  /** The version of the game that generated the log file. Used to distinguish Classic and Retail Warcraft primarily. */
  gameVersion?: Maybe<Scalars['Int']>;
  /** The auto-detected locale of the report. This is the source language of the original log file. */
  lang?: Maybe<Scalars['String']>;
  /** A list of every ability that occurs in the report. */
  abilities?: Maybe<Array<Maybe<ReportAbility>>>;
  /** A list of every actor (player, NPC, pet) that occurs in the report. */
  actors?: Maybe<Array<Maybe<ReportActor>>>;
};


/** The ReporMastertData object contains information about the log version of a report, as well as the actors and abilities used in the report. */
export type ReportMasterDataActorsArgs = {
  type?: Maybe<Scalars['String']>;
  subType?: Maybe<Scalars['String']>;
};

export type ReportPagination = {
  __typename?: 'ReportPagination';
  /** List of items on the current page */
  data?: Maybe<Array<Maybe<Report>>>;
  /** Number of total items selected by the query */
  total: Scalars['Int'];
  /** Number of items returned per page */
  per_page: Scalars['Int'];
  /** Current page of the cursor */
  current_page: Scalars['Int'];
  /** Number of the first item returned */
  from?: Maybe<Scalars['Int']>;
  /** Number of the last item returned */
  to?: Maybe<Scalars['Int']>;
  /** The last page (number of pages) */
  last_page: Scalars['Int'];
  /** Determines if cursor has more pages after the current page */
  has_more_pages: Scalars['Boolean'];
};

/** All the possible metrics. */
export enum ReportRankingMetricType {
  /** Boss damage per second. */
  Bossdps = 'bossdps',
  /** Boss rDPS is unique to FFXIV and is damage done to the boss adjusted for raid-contributing buffs and debuffs. */
  Bossrdps = 'bossrdps',
  /** Choose an appropriate default depending on the other selected parameters. */
  Default = 'default',
  /** Damage per second. */
  Dps = 'dps',
  /** Healing per second. */
  Hps = 'hps',
  /** Survivability ranking for tanks. Deprecated. Only supported for some older WoW zones. */
  Krsi = 'krsi',
  /** Score. Used by WoW Mythic dungeons and by ESO trials. */
  Playerscore = 'playerscore',
  /** Speed. Not supported by every zone. */
  Playerspeed = 'playerspeed',
  /** rDPS is unique to FFXIV and is damage done adjusted for raid-contributing buffs and debuffs. */
  Rdps = 'rdps',
  /** Healing done per second to tanks. */
  Tankhps = 'tankhps',
  /** Weighted damage per second. Unique to WoW currently. Used to remove pad damage and reward damage done to high priority targets. */
  Wdps = 'wdps'
}

/** Used to specify a tank, healer or DPS role. */
export enum RoleType {
  /** Fetch any role.. */
  Any = 'Any',
  /** Fetch the DPS role only. */
  Dps = 'DPS',
  /** Fetch the healer role only. */
  Healer = 'Healer',
  /** Fetch the tanking role only. */
  Tank = 'Tank'
}

/** A single server. Servers correspond to actual game servers that characters and guilds reside on. */
export type Server = {
  __typename?: 'Server';
  /** The ID of the server. */
  id: Scalars['Int'];
  /** The name of the server in the locale of the subregion that the server belongs to. */
  name: Scalars['String'];
  /** The normalized name is a transformation of the name, dropping spaces. It is how the server appears in a World of Warcraft log file. */
  normalizedName: Scalars['String'];
  /** The server slug, also a transformation of the name following Blizzard rules. For retail World of Warcraft realms, this slug will be in English. For all other games, the slug is just a transformation of the name field. */
  slug: Scalars['String'];
  /** The region that this server belongs to. */
  region: Region;
  /** The subregion that this server belongs to. */
  subregion: Subregion;
  /** The guilds found on this server (and any servers connected to this one. */
  guilds?: Maybe<GuildPagination>;
};


/** A single server. Servers correspond to actual game servers that characters and guilds reside on. */
export type ServerGuildsArgs = {
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};

export type ServerPagination = {
  __typename?: 'ServerPagination';
  /** List of items on the current page */
  data?: Maybe<Array<Maybe<Server>>>;
  /** Number of total items selected by the query */
  total: Scalars['Int'];
  /** Number of items returned per page */
  per_page: Scalars['Int'];
  /** Current page of the cursor */
  current_page: Scalars['Int'];
  /** Number of the first item returned */
  from?: Maybe<Scalars['Int']>;
  /** Number of the last item returned */
  to?: Maybe<Scalars['Int']>;
  /** The last page (number of pages) */
  last_page: Scalars['Int'];
  /** Determines if cursor has more pages after the current page */
  has_more_pages: Scalars['Boolean'];
};

/** A spec for a given player class. */
export type Spec = {
  __typename?: 'Spec';
  /** An integer used to identify the spec. */
  id: Scalars['Int'];
  /** The player class that the spec belongs to. */
  class: GameClass;
  /** The localized name of the class. */
  name: Scalars['String'];
  /** A slug used to identify the spec. */
  slug: Scalars['String'];
};

/** A single subregion. Subregions are used to divide a region into sub-categories, such as French or German subregions of a Europe region. */
export type Subregion = {
  __typename?: 'Subregion';
  /** The ID of the subregion. */
  id: Scalars['Int'];
  /** The localized name of the subregion. */
  name: Scalars['String'];
  /** The region that this subregion is found in. */
  region: Region;
  /** The servers found within this region. */
  servers?: Maybe<ServerPagination>;
};


/** A single subregion. Subregions are used to divide a region into sub-categories, such as French or German subregions of a Europe region. */
export type SubregionServersArgs = {
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};

/** The type of table to examine. */
export enum TableDataType {
  /** Summary Overview */
  Summary = 'Summary',
  /** Buffs. */
  Buffs = 'Buffs',
  /** Casts. */
  Casts = 'Casts',
  /** Damage done. */
  DamageDone = 'DamageDone',
  /** Damage taken. */
  DamageTaken = 'DamageTaken',
  /** Deaths. */
  Deaths = 'Deaths',
  /** Debuffs. */
  Debuffs = 'Debuffs',
  /** Dispels. */
  Dispels = 'Dispels',
  /** Healing done. */
  Healing = 'Healing',
  /** Interrupts. */
  Interrupts = 'Interrupts',
  /** Resources. */
  Resources = 'Resources',
  /** Summons */
  Summons = 'Summons',
  /** Survivability (death info across multiple pulls). */
  Survivability = 'Survivability',
  /** Threat. */
  Threat = 'Threat'
}

/** A single user of the site. */
export type User = {
  __typename?: 'User';
  /** The ID of the user. */
  id: Scalars['Int'];
  /** The name of the user. */
  name: Scalars['String'];
};

/** Whether the view is by source, target, or ability. */
export enum ViewType {
  /** Use the same default that the web site picks based off the other selected parameters. */
  Default = 'Default',
  /** View by ability. */
  Ability = 'Ability',
  /** View. by source. */
  Source = 'Source',
  /** View by target. */
  Target = 'Target'
}

/** The world data object contains collections of data such as expansions, zones, encounters, regions, subregions, etc. */
export type WorldData = {
  __typename?: 'WorldData';
  /** Obtain a specific encounter by id. */
  encounter?: Maybe<Encounter>;
  /** A single expansion obtained by ID. */
  expansion?: Maybe<Expansion>;
  /** The set of all expansions supported by the site. */
  expansions?: Maybe<Array<Maybe<Expansion>>>;
  /** Obtain a specific region by its ID. */
  region?: Maybe<Region>;
  /** The set of all regions supported by the site. */
  regions?: Maybe<Array<Maybe<Region>>>;
  /** Obtain a specific server either by id or by slug and region. */
  server?: Maybe<Server>;
  /** Obtain a specific subregion by its ID. */
  subregion?: Maybe<Subregion>;
  /** Obtain a specific zone by its ID. */
  zone?: Maybe<Zone>;
  /** Obtain a set of all zones supported by the site. */
  zones?: Maybe<Array<Maybe<Zone>>>;
};


/** The world data object contains collections of data such as expansions, zones, encounters, regions, subregions, etc. */
export type WorldDataEncounterArgs = {
  id?: Maybe<Scalars['Int']>;
};


/** The world data object contains collections of data such as expansions, zones, encounters, regions, subregions, etc. */
export type WorldDataExpansionArgs = {
  id?: Maybe<Scalars['Int']>;
};


/** The world data object contains collections of data such as expansions, zones, encounters, regions, subregions, etc. */
export type WorldDataRegionArgs = {
  id?: Maybe<Scalars['Int']>;
};


/** The world data object contains collections of data such as expansions, zones, encounters, regions, subregions, etc. */
export type WorldDataServerArgs = {
  id?: Maybe<Scalars['Int']>;
  region?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};


/** The world data object contains collections of data such as expansions, zones, encounters, regions, subregions, etc. */
export type WorldDataSubregionArgs = {
  id?: Maybe<Scalars['Int']>;
};


/** The world data object contains collections of data such as expansions, zones, encounters, regions, subregions, etc. */
export type WorldDataZoneArgs = {
  id?: Maybe<Scalars['Int']>;
};


/** The world data object contains collections of data such as expansions, zones, encounters, regions, subregions, etc. */
export type WorldDataZonesArgs = {
  expansion_id?: Maybe<Scalars['Int']>;
};

/** A single zone from an expansion that represents a raid, dungeon, arena, etc. */
export type Zone = {
  __typename?: 'Zone';
  /** The ID of the zone. */
  id: Scalars['Int'];
  /** The bracket information for this zone. */
  brackets: Bracket;
  /** A list of all the difficulties supported for this zone. */
  difficulties?: Maybe<Array<Maybe<Difficulty>>>;
  /** The encounters found within this zone. */
  encounters?: Maybe<Array<Maybe<Encounter>>>;
  /** The expansion that this zone belongs to. */
  expansion: Expansion;
  /** Whether or not the entire zone (including all its partitions) is permanently frozen. When a zone is frozen, data involving that zone will never change and can be cached forever. */
  frozen: Scalars['Boolean'];
  /** The name of the zone. */
  name: Scalars['String'];
  /** A list of all the partitions supported for this zone. */
  partitions?: Maybe<Array<Maybe<Partition>>>;
};

export type GetAttendanceQueryVariables = Exact<{
  guildName: Scalars['String'];
  serverSlug: Scalars['String'];
  serverRegion: Scalars['String'];
  limit: Scalars['Int'];
  page: Scalars['Int'];
}>;


export type GetAttendanceQuery = (
  { __typename?: 'Query' }
  & { guildData?: Maybe<(
    { __typename?: 'GuildData' }
    & { guild?: Maybe<(
      { __typename?: 'Guild' }
      & { attendance: (
        { __typename?: 'GuildAttendancePagination' }
        & Pick<GuildAttendancePagination, 'current_page' | 'has_more_pages'>
        & { data?: Maybe<Array<Maybe<(
          { __typename?: 'GuildAttendance' }
          & Pick<GuildAttendance, 'code' | 'startTime'>
          & { players?: Maybe<Array<Maybe<(
            { __typename?: 'PlayerAttendance' }
            & Pick<PlayerAttendance, 'name' | 'presence' | 'type'>
          )>>>, zone?: Maybe<(
            { __typename?: 'Zone' }
            & Pick<Zone, 'name'>
          )> }
        )>>> }
      ) }
    )> }
  )> }
);

export type GetGuildQueryVariables = Exact<{
  guildName: Scalars['String'];
  serverSlug: Scalars['String'];
  serverRegion: Scalars['String'];
}>;


export type GetGuildQuery = (
  { __typename?: 'Query' }
  & { guildData?: Maybe<(
    { __typename?: 'GuildData' }
    & { guild?: Maybe<(
      { __typename?: 'Guild' }
      & Pick<Guild, 'name'>
      & { faction: (
        { __typename?: 'GameFaction' }
        & Pick<GameFaction, 'name'>
      ), server: (
        { __typename?: 'Server' }
        & Pick<Server, 'name'>
        & { region: (
          { __typename?: 'Region' }
          & Pick<Region, 'compactName'>
        ) }
      ) }
    )> }
  )> }
);


export const GetAttendanceDocument = gql`
    query getAttendance($guildName: String!, $serverSlug: String!, $serverRegion: String!, $limit: Int!, $page: Int!) {
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
export const GetGuildDocument = gql`
    query getGuild($guildName: String!, $serverSlug: String!, $serverRegion: String!) {
  guildData {
    guild(name: $guildName, serverSlug: $serverSlug, serverRegion: $serverRegion) {
      name
      faction {
        name
      }
      server {
        name
        region {
          compactName
        }
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getAttendance(variables: GetAttendanceQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAttendanceQuery> {
      return withWrapper(() => client.request<GetAttendanceQuery>(GetAttendanceDocument, variables, requestHeaders));
    },
    getGuild(variables: GetGuildQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetGuildQuery> {
      return withWrapper(() => client.request<GetGuildQuery>(GetGuildDocument, variables, requestHeaders));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;

export const GetAttendance = gql`
    query getAttendance($guildName: String!, $serverSlug: String!, $serverRegion: String!, $limit: Int!, $page: Int!) {
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
export const GetGuild = gql`
    query getGuild($guildName: String!, $serverSlug: String!, $serverRegion: String!) {
  guildData {
    guild(name: $guildName, serverSlug: $serverSlug, serverRegion: $serverRegion) {
      name
      faction {
        name
      }
      server {
        name
        region {
          compactName
        }
      }
    }
  }
}
    `;