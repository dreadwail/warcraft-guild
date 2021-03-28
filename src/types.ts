export enum Faction {
  Alliance = "Alliance",
  Horde = "Horde",
}

export enum Region {
  US = "US",
  EU = "EU",
  CN = "CN",
  KR = "KR",
}

export type Server = {
  name: string;
  region: Region;
};

type GuildBase = {
  name: string;
  server: Server;
  faction: Faction;
};

type AllianceGuild = GuildBase & {
  faction: Faction.Alliance;
};

type HordeGuild = GuildBase & {
  faction: Faction.Horde;
};

export type Guild = AllianceGuild | HordeGuild;

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

enum AllianceRace {
  DWARF = "DWARF",
  GNOME = "GNOME",
  HUMAN = "HUMAN",
  NIGHT_ELF = "NIGHT_ELF",
}

enum HordeRace {
  ORC = "ORC",
  TAUREN = "TAUREN",
  TROLL = "TROLL",
  UNDEAD = "UNDEAD",
}

export type Race = AllianceRace | HordeRace;

export enum Class {
  DRUID = "DRUID",
  HUNTER = "HUNTER",
  MAGE = "MAGE",
  PALADIN = "PALADIN",
  PRIEST = "PRIEST",
  ROGUE = "ROGUE",
  SHAMAN = "SHAMAN",
  WARLOCK = "WARLOCK",
}

type CharacterBase = {
  name: string;
  level: number;
  server: Server;
  faction: Faction;
  gender: Gender;
  race: Race;
  class: Class;
  guild: Guild;
};

type AllianceCharacter = CharacterBase & {
  faction: Faction.Alliance;
  race: AllianceRace;
  guild: AllianceGuild;
};

type HordeCharacter = CharacterBase & {
  faction: Faction.Horde;
  race: HordeRace;
  guild: HordeGuild;
};

export type Character = AllianceCharacter | HordeCharacter;

export enum Attunement {
  MoltenCore = "MOLTEN_CORE",
  BlackwingLair = "BLACKWING_LAIR",
  Onyxia = "ONYXIA",
  Naxxramas = "NAXXRAMAS",
  ScepterOfTheShiftingSands = "SCEPTER_OF_THE_SHIFTING_SANDS",
  ShatteredHalls = "SHATTERED_HALLS",
  ShadowLabs = "SHADOW_LABS",
  BlackMorass = "BLACK_MORASS",
  Arcatraz = "ARCATRAZ",
  HonorHoldRevered = "HONOR_HOLD_REVERED",
  CenarionExpeditionRevered = "CENARION_EXPEDITION_REVERED",
  LowerCityRevered = "LOWER_CITY_REVERED",
  ShatarRevered = "SHATAR_REVERED",
  KeepersOfTimeRevered = "KEEPERS_OF_TIME_REVERED",
  Karazhan = "KARAZHAN",
  Nightbane = "NIGHTBANE",
  SerpentshrineCavern = "SERPENTSHRINE_CAVERN",
  TempestKeep = "TEMPEST_KEEP",
  MountHyjal = "MOUNT_HYJAL",
  BlackTemple = "BLACK_TEMPLE",
}

export type Attunements = {
  [key in Attunement]: boolean;
};

export type CharacterToAttunements = {
  [key in Character["name"]]: Attunements;
};

export type CharacterToAttendance = {
  [key in Character["name"]]: number;
};

export type GuildRequest = {
  serverRegion: Server["region"];
  serverName: Server["name"];
  faction: Faction;
  guildName: Guild["name"];
};

type GuildResponseBase = {
  guild: Guild;
  characters: Character[];
  attunements: CharacterToAttunements;
  attendance: CharacterToAttendance;
};

type AllianceGuildResponse = GuildResponseBase & {
  guild: AllianceGuild;
  characters: AllianceCharacter[];
};

type HordeGuildResponse = GuildResponseBase & {
  guild: HordeGuild;
  characters: HordeCharacter[];
};

export type GuildResponse = AllianceGuildResponse | HordeGuildResponse;
