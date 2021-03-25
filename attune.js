import got from "got";
import cheerio from "cheerio";

const WARCRAFT_RATINGS_URL = "https://warcraftratings.com/index.php";

const PAGES = {
  guilds: "guilds",
  guild: "guild",
};

const getGuildId = async ({ serverName, faction, guildName }) => {
  const searchResponse = await got.get(WARCRAFT_RATINGS_URL, {
    searchParams: {
      p: "guilds",
      R: serverName,
      F: faction,
      s: guildName,
    },
  });

  const $ = cheerio.load(searchResponse.body);
  const results = $("table tbody tr");
  const firstResult = results.first();
  const firstResultAnchor = firstResult.find("a").first();
  const href = firstResultAnchor.attr("href");
  const matchInfo = href.match(/id=(\d+)/);
  return matchInfo[1];
};

const instances = {
  moltenCore: "moltenCore",
  blackwingLair: "blackwingLair",
  onyxia: "onyxia",
  shatteredHalls: "shatteredHalls",
  shadowLabs: "shadowLabs",
  blackMorass: "blackMorass",
  arcatraz: "arcatraz",
  honorHoldRevered: "honorHoldRevered",
  cenarionExpeditionRevered: "cenarionExpeditionRevered",
  lowerCityRevered: "lowerCityRevered",
  shatarRevered: "shatarRevered",
  keepersOfTimeRevered: "keepersOfTimeRevered",
  karazhan: "karazhan",
  nightbane: "nightbane",
  serpentshrineCavern: "serpentshrineCavern",
  tempestKeep: "tempestKeep",
  hyjal: "hyjal",
  blackTemple: "blackTemple",
};

const createHeuristic = (pattern, instance) => (text) => {
  if (text.match(pattern)) {
    return instance;
  }
};

const attunementHeuristics = [
  createHeuristic(/filter: grayscale\([1-9]/i, null),
  createHeuristic(/filter: opacity(\([0-9]{1,2}%\)|\(0\)|\(0\.[0-9]\))/i, null),
  createHeuristic(/molten/i, instances.moltenCore),
  createHeuristic(/mc/i, instances.moltenCore),
  createHeuristic(/sulfuras/i, instances.moltenCore),
  createHeuristic(/onyxia/i, instances.onyxia),
  createHeuristic(/blackwing/i, instances.blackwingLair),
  createHeuristic(/bwl/i, instances.blackwingLair),
  createHeuristic(/shadow/i, instances.shadowLabs),
  createHeuristic(/labyrinth/i, instances.shadowLabs),
  createHeuristic(/slabs/i, instances.shadowLabs),
  createHeuristic(/morass/i, instances.blackMorass),
  createHeuristic(/honor hold/i, instances.honorHoldRevered),
  createHeuristic(/hold/i, instances.honorHoldRevered),
  createHeuristic(/cenarion/i, instances.cenarionExpeditionRevered),
  createHeuristic(/expedition/i, instances.cenarionExpeditionRevered),
  createHeuristic(/lower city/i, instances.lowerCityRevered),
  createHeuristic(/lower/i, instances.lowerCityRevered),
  createHeuristic(/shatar/i, instances.shatarRevered),
  createHeuristic(/Sha%27tar/i, instances.shatarRevered),
  createHeuristic(/Sha'tar/i, instances.shatarRevered),
  createHeuristic(/keepers/i, instances.keepersOfTimeRevered),
  createHeuristic(/nightbane/i, instances.nightbane),
  createHeuristic(/ssc/i, instances.serpentshrineCavern),
  createHeuristic(/serpentshrine/i, instances.serpentshrineCavern),
  createHeuristic(/The%20Eye/i, instances.tempestKeep),
  createHeuristic(/The Eye/i, instances.tempestKeep),
  createHeuristic(/eye/i, instances.tempestKeep),
  createHeuristic(/tempest/i, instances.tempestKeep),
  createHeuristic(/Mount Hyjal/i, instances.hyjal),
  createHeuristic(/hyjal/i, instances.hyjal),
  createHeuristic(/mount/i, instances.hyjal),
  createHeuristic(/Black Temple/i, instances.blackTemple),
  createHeuristic(/Black%20Temple/i, instances.blackTemple),
  createHeuristic(/bt/i, instances.blackTemple),
];

const getRaid = (attributeValues) => {
  const instancesIdentified = attributeValues
    .map((value) => {
      const matchingHeuristic = attunementHeuristics.find(
        (heuristic) => heuristic(value) !== undefined
      );
      if (matchingHeuristic) {
        return matchingHeuristic(value);
      }
    })
    .filter((instance) => instance !== undefined);

  if (instancesIdentified.includes(null)) {
    return undefined;
  }
  return instancesIdentified[0];
};

const extractCharacterName = ({ $, resultRowElement, serverName }) => {
  const resultRow = $(resultRowElement);

  const namePattern = `(\\S+) - ${serverName}`;
  const nameRegex = new RegExp(namePattern, "i");

  const cells = resultRow.find("td");
  const nameCell = cells
    .filter((_cellIndex, cellElement) => {
      const cellText = $(cellElement).text();
      return !!cellText.match(nameRegex);
    })
    .first();

  const nameCellText = nameCell.text();
  const matchInfo = nameCellText.match(nameRegex);
  return matchInfo[1];
};

const collectAttributeValues = ({ $, attunementResultElement }) => {
  const getValues = (el) => Object.values(el.attribs);

  const parentAttributeValues = getValues(attunementResultElement);

  const descendents = $(attunementResultElement).find("*");
  const descendentAttributeValues = descendents.map(
    (_descendentIndex, descendent) => getValues(descendent)
  );

  return [...parentAttributeValues, ...descendentAttributeValues];
};

const defaultAttunementRecord = Object.values(instances).reduce(
  (obj, instance) => ({ ...obj, [instance]: false }),
  {}
);

export const getAttunements = async ({ serverName, faction, guildName }) => {
  const guildId = await getGuildId({ serverName, faction, guildName });

  const guildResponse = await got.get(WARCRAFT_RATINGS_URL, {
    searchParams: {
      p: PAGES.guild,
      id: guildId,
    },
  });

  const $ = cheerio.load(guildResponse.body);

  const attunements = {};

  const markCharacterAttuned = (characterName, instance) => {
    attunements[characterName] = attunements[characterName] || {
      ...defaultAttunementRecord,
    };
    attunements[characterName][instance] = true;
  };

  const resultRows = $("table tbody tr");
  resultRows.each((_resultRowIndex, resultRowElement) => {
    const characterName = extractCharacterName({
      $,
      resultRowElement,
      serverName,
    });

    const attunementResults = $(resultRowElement).find("[expac]");

    attunementResults.each(
      (_attunementResultIndex, attunementResultElement) => {
        const attributeValues = collectAttributeValues({
          $,
          attunementResultElement,
        });
        const raid = getRaid(attributeValues);
        if (raid) {
          markCharacterAttuned(characterName, raid);
        }
      }
    );
  });

  return attunements;
};
