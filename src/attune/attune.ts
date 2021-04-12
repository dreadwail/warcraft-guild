import got from "got";

import { Attunement, Attunements, CharacterToAttunements, DataSource, GuildRequest } from "../types";
import { AttuneAttunementsResponse, AttuneError, AttuneGuildsResponse, AttunementType, ID, Toon } from "./types";

const ATTUNEMENTS_URL = "https://warcraftratings.com/json_attuneRosterByGuild.php";
const GUILDS_URL = "https://warcraftratings.com/json_attuneGuilds.php";

const isError = (response: AttuneGuildsResponse | AttuneError): response is AttuneError => !!(response as any).errorId;

const getGuildId = async (request: GuildRequest): Promise<ID> => {
  const searchParams = {
    realm: request.serverName,
    faction: request.faction,
    guildName: request.guildName,
  };

  const response: AttuneGuildsResponse = await got
    .get<AttuneGuildsResponse>(GUILDS_URL, { searchParams })
    .json();

  if (isError(response)) {
    throw new Error(JSON.stringify({ searchParams, message: response.message }));
  }

  const firstResponse = response[0];
  return firstResponse.guildId;
};

const getGuildAttunements = async (guildId: ID): Promise<AttuneAttunementsResponse> => {
  const response: AttuneAttunementsResponse = await got
    .get<AttuneAttunementsResponse>(ATTUNEMENTS_URL, {
      searchParams: {
        guildId,
      },
    })
    .json();

  return response;
};

const defaultAttunements: Attunements = {
  [Attunement.MoltenCore]: false,
  [Attunement.BlackwingLair]: false,
  [Attunement.Onyxia]: false,
  [Attunement.Naxxramas]: false,
  [Attunement.ScepterOfTheShiftingSands]: false,
  [Attunement.ShatteredHalls]: false,
  [Attunement.ShadowLabs]: false,
  [Attunement.BlackMorass]: false,
  [Attunement.Arcatraz]: false,
  [Attunement.HonorHoldRevered]: false,
  [Attunement.CenarionExpeditionRevered]: false,
  [Attunement.LowerCityRevered]: false,
  [Attunement.ShatarRevered]: false,
  [Attunement.KeepersOfTimeRevered]: false,
  [Attunement.Karazhan]: false,
  [Attunement.Nightbane]: false,
  [Attunement.SerpentshrineCavern]: false,
  [Attunement.TempestKeep]: false,
  [Attunement.MountHyjal]: false,
  [Attunement.BlackTemple]: false,
};

const attunementMapping: Record<AttunementType, Attunement> = {
  [AttunementType.MoltenCore]: Attunement.MoltenCore,
  [AttunementType.Onyxia]: Attunement.Onyxia,
  [AttunementType.BlackwingLair]: Attunement.BlackwingLair,
  [AttunementType.Naxxramas]: Attunement.Naxxramas,
  [AttunementType.ScepterOfTheShiftingSands]: Attunement.ScepterOfTheShiftingSands,
  [AttunementType.ShatteredHalls]: Attunement.ShatteredHalls,
  [AttunementType.ShadowLabyrinth]: Attunement.ShadowLabs,
  [AttunementType.BlackMorass]: Attunement.BlackMorass,
  [AttunementType.Arcatraz]: Attunement.Arcatraz,
  [AttunementType.HonorHoldRevered]: Attunement.HonorHoldRevered,
  [AttunementType.CenarionExpeditionRevered]: Attunement.CenarionExpeditionRevered,
  [AttunementType.LowerCityRevered]: Attunement.LowerCityRevered,
  [AttunementType.ShatarRevered]: Attunement.ShatarRevered,
  [AttunementType.KeepersOfTimeRevered]: Attunement.KeepersOfTimeRevered,
  [AttunementType.Karazhan]: Attunement.Karazhan,
  [AttunementType.Nightbane]: Attunement.Nightbane,
  [AttunementType.SerpentshrineCavern]: Attunement.SerpentshrineCavern,
  [AttunementType.TheEye]: Attunement.TempestKeep,
  [AttunementType.MountHyjal]: Attunement.MountHyjal,
  [AttunementType.BlackTemple]: Attunement.BlackTemple,
};

const toonToAttunements = (toon: Toon): Attunements => {
  return toon.attunes.reduce<Attunements>(
    (attunements, attune) => {
      const isAttuned = attune.attuneStepsDone === attune.attuneStepsTotal;
      return {
        ...attunements,
        [attunementMapping[attune.attune]]: isAttuned,
      };
    },
    { ...defaultAttunements }
  );
};

const getAttunements = async (request: GuildRequest): Promise<CharacterToAttunements> => {
  console.log("EXECUTE attune getGuildId call");
  const guildId = await getGuildId(request);

  console.log("EXECUTE attune getGuildAttunements call:", { guildId });
  const attunementsResponse = await getGuildAttunements(guildId);

  return attunementsResponse.toons.reduce<CharacterToAttunements>(
    (characterToAttunements, toon) => ({
      ...characterToAttunements,
      [toon.toon]: toonToAttunements(toon),
    }),
    {}
  );
};

const dataSource: DataSource = {
  name: "attune",
  execute: async (request, response) => {
    const attunements = await getAttunements(request);

    return {
      ...response,
      attunements: {
        ...response.attunements,
        ...attunements,
      },
    };
  },
};

export default dataSource;
