export type ID = number | string;

enum Faction {
  Alliance = "Alliance",
  Horde = "Horde",
}

type AttuneGuild = {
  guildId: ID;
  guildName: string;
  realm: string;
  faction: Faction;
};

export type AttuneError = {
  errorId: number | string;
  message: string;
};

export type AttuneGuildsResponse = AttuneGuild[];

enum Gender {
  Male = "Male",
  Female = "Female",
}

enum Race {
  Dwarf = "Dwarf",
  Gnome = "Gnome",
  Human = "Human",
  Nightelf = "Nightelf",
  Orc = "Orc",
  Tauren = "Tauren",
  Troll = "Troll",
  Undead = "Undead",
}

enum Class {
  Druid = "Druid",
  Hunter = "Hunter",
  Mage = "Mage",
  Paladin = "Paladin",
  Priest = "Priest",
  Rogue = "Rogue",
  Shaman = "Shaman",
  Warlock = "Warlock",
}

export enum AttunementType {
  MoltenCore = "Molten Core",
  Onyxia = "Onyxia's Lair",
  BlackwingLair = "Blackwing Lair",
  Naxxramas = "Naxxramas",
  ScepterOfTheShiftingSands = "Scepter of the Shifting Sands",
  ShatteredHalls = "The Shattered Halls",
  ShadowLabyrinth = "Shadow Labyrinth",
  BlackMorass = "The Black Morass",
  Arcatraz = "The Arcatraz",
  HonorHoldRevered = "Honor Hold Revered",
  CenarionExpeditionRevered = "Cenarion Expedition Revered",
  LowerCityRevered = "Lower City Revered",
  ShatarRevered = "Sha tar Revered",
  KeepersOfTimeRevered = "Keepers of Time Revered",
  Karazhan = "Karazhan",
  Nightbane = "Nightbane",
  SerpentshrineCavern = "Serpentshrine Cavern",
  TheEye = "The Eye",
  MountHyjal = "Mount Hyjal",
  BlackTemple = "Black Temple",
}

type Attunement = {
  attuneId: ID;
  attune: AttunementType;
  expansion: string;
  icon: string;
  attuneStepsDone: number;
  attuneStepsTotal: number;
};

export type Toon = {
  toonId: ID;
  toon: string;
  gender: Gender;
  race: Race;
  class: Class;
  attunes: Attunement[];
};

export type AttuneAttunementsResponse = AttuneGuild & {
  toons: Toon[];
};
