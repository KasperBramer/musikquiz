document.addEventListener("input", gemAlt);
document.addEventListener("change", gemAlt);
window.addEventListener("DOMContentLoaded", hentAlt);

function gemAlt() {
  const inputs = document.querySelectorAll("input, textarea, select");
  const data = {};

  inputs.forEach((input) => {
    if (input.id) {
      data[input.id] = input.type === "checkbox" ? input.checked : input.value;
    }
  });

  localStorage.setItem("formData", JSON.stringify(data));
}

function hentAlt() {
  const gemt = JSON.parse(localStorage.getItem("formData"));
  if (!gemt) return;

  Object.entries(gemt).forEach(([id, værdi]) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.type === "checkbox" ? (el.checked = værdi) : (el.value = værdi);
  });
}

const ability = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

const skillet = {
  acrobatics: { name: "Acrobatics", ability: "DEX" },
  "animal-handling": { name: "Animal Handling", ability: "WIS" },
  arcana: { name: "Arcana", ability: "INT" },
  athletics: { name: "Athletics", ability: "STR" },
  deception: { name: "Deception", ability: "CHA" },
  history: { name: "History", ability: "INT" },
  insight: { name: "Insight", ability: "WIS" },
  intimidation: { name: "Intimidation", ability: "CHA" },
  investigation: { name: "Investigation", ability: "INT" },
  medicine: { name: "Medicine", ability: "WIS" },
  nature: { name: "Nature", ability: "INT" },
  perception: { name: "Perception", ability: "WIS" },
  performance: { name: "Performance", ability: "CHA" },
  persuasion: { name: "Persuasion", ability: "CHA" },
  religion: { name: "Religion", ability: "INT" },
  "sleight-of-hand": { name: "Sleight of Hand", ability: "DEX" },
  stealth: { name: "Stealth", ability: "DEX" },
  survival: { name: "Survival", ability: "WIS" },
};
const monkActionsByLevel = {
  1: [""],

  2: [" 2", " Flurry of Blows", " Patient Defense", " Step of the Wind"],

  3: [" 3", " Monastic Tradition", " Deflect Missiles"],

  4: [""],

  5: [" 5", " Stunning Strike"],

  6: [" 6", " Monastic Tradition Feature"],

  7: [""],

  8: [" Ability Score Improvement"],

  9: [" Unarmored Movement Improvement"],

  10: [" Purity of Body"],

  11: [" Monastic Tradition Feature"],

  12: [" Ability Score Improvement"],

  13: [" Tongue of the Sun and Moon"],

  14: [" Diamond Soul"],

  15: [" Timeless Body"],

  16: [" Ability Score Improvement"],

  17: [" Monastic Tradition Feature"],

  18: [" Empty Body"],

  19: [" Ability Score Improvement"],

  20: [" Perfect Self"],
};
const monkFeaturesByLevel = {
  1: ["1", " Unarmored Defense ", " Martial Arts"],

  2: [" 2", " Ki", " Unarmored Movement"],

  3: [" 3", " Monastic Tradition"],

  4: [" 4", " Ability Score Improvement"],

  5: [" 5", " Extra Attack"],

  6: [" 6", " Ki-Empowered Strikes", " Monastic Tradition Feature"],

  7: [" Evasion", " Stillness of Mind"],

  8: [" Ability Score Improvement"],

  9: [" Unarmored Movement Improvement"],

  10: [" Purity of Body"],

  11: [" Monastic Tradition Feature"],

  12: [" Ability Score Improvement"],

  13: [" Tongue of the Sun and Moon"],

  14: [" Diamond Soul"],

  15: [" Timeless Body"],

  16: [" Ability Score Improvement"],

  17: [" Monastic Tradition Feature"],

  18: [" Empty Body"],

  19: [" Ability Score Improvement"],

  20: [" Perfect Self"],
};
const monkClass = {
  // ===== CORE DATA =====
  core: {
    hitDie: "1d8",
    baseSpeed: 30,
    primaryAbilities: ["DEX", "WIS"],
    savingThrows: ["STR", "DEX"],
    weaponProficiencies: ["Simple Weapons", "Shortswords"],
    multiclassRequirement: {
      DEX: 13,
      WIS: 13,
    },
  },

  // ===== FORMULAS =====
  formulas: {
    armorClass: (dexMod, wisMod) => {
      return 10 + dexMod + wisMod;
    },

    attackBonus: (dexMod, proficiency) => {
      return dexMod + proficiency;
    },

    unarmedDamage: (martialArtsDie, dexMod) => {
      return `${martialArtsDie} + ${dexMod}`;
    },

    kiSaveDC: (proficiency, wisMod) => {
      return 8 + proficiency + wisMod;
    },
  },

  // ===== BASIC KI ABILITIES =====
  kiAbilities: [
    { name: "Flurry of Blows", cost: 1 },
    { name: "Patient Defense", cost: 1 },
    { name: "Step of the Wind", cost: 1 },
    { name: "Stunning Strike", cost: 1 },
  ],
};

const monkData = {
  1: {
    proficiency: 2,
    martialArts: "1d4",
    kiPoints: 0,
    unarmoredMovement: 0,
    features: ["Unarmored Defense", "Martial Arts"],
  },
  2: {
    proficiency: 2,
    martialArts: "1d4",
    kiPoints: 2,
    unarmoredMovement: 10,
    features: ["Ki", "Unarmored Movement"],
  },
  3: {
    proficiency: 2,
    martialArts: "1d4",
    kiPoints: 3,
    unarmoredMovement: 10,
    features: ["Monastic Tradition", "Deflect Missiles"],
  },
  4: {
    proficiency: 2,
    martialArts: "1d4",
    kiPoints: 4,
    unarmoredMovement: 10,
    features: ["Ability Score Improvement", "Slow Fall"],
  },
  5: {
    proficiency: 3,
    martialArts: "1d6",
    kiPoints: 5,
    unarmoredMovement: 10,
    features: ["Extra Attack", "Stunning Strike"],
  },
  6: {
    proficiency: 3,
    martialArts: "1d6",
    kiPoints: 6,
    unarmoredMovement: 15,
    features: ["Ki-Empowered Strikes", "Monastic Tradition Feature"],
  },
  7: {
    proficiency: 3,
    martialArts: "1d6",
    kiPoints: 7,
    unarmoredMovement: 15,
    features: ["Evasion", "Stillness of Mind"],
  },
  8: {
    proficiency: 3,
    martialArts: "1d6",
    kiPoints: 8,
    unarmoredMovement: 15,
    features: ["Ability Score Improvement"],
  },
  9: {
    proficiency: 4,
    martialArts: "1d6",
    kiPoints: 9,
    unarmoredMovement: 15,
    features: ["Unarmored Movement Improvement"],
  },
  10: {
    proficiency: 4,
    martialArts: "1d6",
    kiPoints: 10,
    unarmoredMovement: 20,
    features: ["Purity of Body"],
  },
  11: {
    proficiency: 4,
    martialArts: "1d8",
    kiPoints: 11,
    unarmoredMovement: 20,
    features: ["Monastic Tradition Feature"],
  },
  12: {
    proficiency: 4,
    martialArts: "1d8",
    kiPoints: 12,
    unarmoredMovement: 20,
    features: ["Ability Score Improvement"],
  },
  13: {
    proficiency: 5,
    martialArts: "1d8",
    kiPoints: 13,
    unarmoredMovement: 20,
    features: ["Tongue of the Sun and Moon"],
  },
  14: {
    proficiency: 5,
    martialArts: "1d8",
    kiPoints: 14,
    unarmoredMovement: 25,
    features: ["Diamond Soul"],
  },
  15: {
    proficiency: 5,
    martialArts: "1d8",
    kiPoints: 15,
    unarmoredMovement: 25,
    features: ["Timeless Body"],
  },
  16: {
    proficiency: 5,
    martialArts: "1d8",
    kiPoints: 16,
    unarmoredMovement: 25,
    features: ["Ability Score Improvement"],
  },
  17: {
    proficiency: 6,
    martialArts: "1d10",
    kiPoints: 17,
    unarmoredMovement: 25,
    features: ["Monastic Tradition Feature"],
  },
  18: {
    proficiency: 6,
    martialArts: "1d10",
    kiPoints: 18,
    unarmoredMovement: 30,
    features: ["Empty Body"],
  },
  19: {
    proficiency: 6,
    martialArts: "1d10",
    kiPoints: 19,
    unarmoredMovement: 30,
    features: ["Ability Score Improvement"],
  },
  20: {
    proficiency: 6,
    martialArts: "1d10",
    kiPoints: 20,
    unarmoredMovement: 30,
    features: ["Perfect Self"],
  },
};

let level = document.getElementById("level").value;

function updateLevelStats() {
  level = document.getElementById("level").value;
  let proficiencyBounus;
  let martialArts;
  let kiPoints;
  let unarmoredMovement;
  let hitDie = "1d8";
  let maxHitPoints;
  if (level === Object.keys(monkData)[level - 1]) {
    proficiencyBounus = monkData[level].proficiency;
    martialArts = monkData[level].martialArts;
    kiPoints = monkData[level].kiPoints;
    unarmoredMovement = monkData[level].unarmoredMovement;
    maxHitPoints = 9 + (level - 1) * 6;
  }
  document.getElementById("proficiency-bonusid").innerText = proficiencyBounus;
  document.getElementById("attack-bonus").innerText =
    `Attack Bonus: ${proficiencyBounus + parseInt(document.getElementById("ability-mod-DEX").innerText)} Attack ${martialArts} + ${document.getElementById("ability-mod-DEX").innerText}`;
  document.getElementById("ki-points").innerText = `Max Ki-points: ${kiPoints}`;
  document.getElementById("movment").innerText = unarmoredMovement + 30;
  document.getElementById("max-hit-points").innerText = maxHitPoints;
  document.getElementById("Current-hit-points").value = maxHitPoints;
  updateData();
}

updateLevelStats();

function updateData() {
  let proficiency = parseInt(
    document.getElementById("proficiency-bonusid").innerText,
  );
  let dexMod = parseInt(document.getElementById("ability-mod-DEX").innerText);
  let wisMod = parseInt(document.getElementById("ability-mod-WIS").innerText);
  document.getElementById("armor-class").innerText =
    `Armor Class: ${monkClass.formulas.armorClass(dexMod, wisMod)}`;

  document.getElementById("ki-dc-save").innerText =
    `Ki Save DC: ${monkClass.formulas.kiSaveDC(wisMod, proficiency)}`;
}
// Her er en test med at få ac fra inventory
document.getElementById("a-c-test").value =
  document.getElementById("armor-class").innerText;

let action = [];
let features = [];

document.getElementById("level").addEventListener("input", (e) => {
  let level = parseInt(e.target.value);

  let nyTest = Object.values(monkActionsByLevel);
  let nyFeatures = Object.values(monkFeaturesByLevel);

  // Genopbyg arrays baseret på nuværende level
  action = nyTest.slice(0, level);
  features = nyFeatures.slice(0, level);

  document.getElementById("action-items").innerText = action;
  document.getElementById("features-items").innerText = features;
});

function updateAbilityScores() {
  ability.forEach((e) => {
    document.getElementById(`${e}`).innerHTML = e;
    const score = parseInt(
      document.getElementById(`ability-mod-${e}-input`).value,
    );
    const modifier = Math.floor((score - 10) / 2);
    document.getElementById(`ability-mod-${e}`).innerText = modifier;
    updateSkillModifiers();
    document.getElementById("ininitiativ").innerText =
      document.getElementById("ability-mod-DEX").innerText;
    document.getElementById(`addpro-${e}`).innerText = document.getElementById(
      `ability-mod-${e}`,
    ).innerText;
    if (document.getElementById(`${e}-pro`).checked) {
      document.getElementById(`addpro-${e}`).innerText =
        parseInt(document.getElementById("proficiency-bonusid").innerText) +
        parseInt(document.getElementById(`ability-mod-${e}`).innerText);
    } else {
      document.getElementById(`addpro-${e}`).innerText =
        document.getElementById(`ability-mod-${e}`).innerText;
    }
    document.getElementById(`${e}-pro`).addEventListener("input", (c) => {});
    document
      .getElementById(`ability-mod-${e}-input`)
      .addEventListener("input", (a) => {});
  });
}
updateAbilityScores();

let skillMod;
function updateSkillModifiers() {
  let henterSkills = Object.values(skillet);

  henterSkills.forEach((e) => {
    document.getElementById(`skill-${Object.values(e)[0]}`).innerText =
      ` ${Object.values(e)[0]}`;
    document.getElementById(`skill-ability-${Object.values(e)[0]}`).innerText =
      ` ${Object.values(e)[1]}`;
    if (
      document.getElementById(`skill-ability-${Object.values(e)[0]}`)
        .innerText === Object.values(e)[1]
    ) {
      document.getElementById(Object.values(e)[0]).innerText =
        document.getElementById(`ability-mod-${e.ability}`).innerText;
    }
    if (document.getElementById(`skill-${e.name}-pro`).checked) {
      document.getElementById(Object.values(e)[0]).innerText =
        parseInt(document.getElementById("proficiency-bonusid").innerText) +
        parseInt(document.getElementById(`ability-mod-${e.ability}`).innerText);
    }
  });
}
updateSkillModifiers();

document.addEventListener("input", () => {
  updateAbilityScores();
  updateData();
  updateLevelStats();
});
