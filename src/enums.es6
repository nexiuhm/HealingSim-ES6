import {freezeObject} from "./util";


const stat_e = freezeObject({
    "STRENGHT": 0,
    "AGILITY": 1,
    "STAMINA": 2,
    "INTELLECT": 3,
    "SPIRIT": 4
});
const class_e = freezeObject({
    "WARRIOR": 0,
    "PALADIN": 1,
    "HUNTER": 2,
    "ROGUE": 3,
    "PRIEST": 4,
    "DEATHKNIGHT": 5,
    "SHAMAN": 6,
    "MAGE": 7,
    "WARLOCK": 8,
    "MONK": 9,
    "DRUID": 10
});
const race_e = freezeObject({
    "RACE_NONE": 0,
    "RACE_BEAST": 1,
    "RACE_DRAGONKIN": 2,
    "RACE_GIANT": 3,
    "RACE_HUMANOID": 4,
    "RACE_DEMON": 5,
    "RACE_ELEMENTAL": 6,
    "RACE_NIGHT_ELF": 7,
    "RACE_HUMAN": 8,
    "RACE_GNOME": 9,
    "RACE_DWARF": 10,
    "RACE_DRAENEI": 11,
    "RACE_WORGEN": 12,
    "RACE_ORC": 13,
    "RACE_TROLL": 14,
    "RACE_UNDEAD": 15,
    "RACE_BLOOD_ELF": 16,
    "RACE_TAUREN": 17,
    "RACE_GOBLIN": 18,
    "RACE_PANDAREN": 19,
    "RACE_PANDAREN_ALLIANCE": 20,
    "RACE_PANDAREN_HORDE": 21,
    "RACE_MAX": 22,
    "RACE_UNKNOWN": 23
});

const combat_rating_e = freezeObject({
    "RATING_MOD_DODGE": 0,
    "RATING_MOD_PARRY": 1,
    "RATING_MOD_HIT_MELEE": 2,
    "RATING_MOD_HIT_RANGED": 3,
    "RATING_MOD_HIT_SPELL": 4,
    "RATING_MOD_CRIT_MELEE": 5,
    "RATING_MOD_CRIT_RANGED": 6,
    "RATING_MOD_CRIT_SPELL": 7,
    "RATING_MOD_MULTISTRIKE": 8,
    "RATING_MOD_READINESS": 9,
    "RATING_MOD_SPEED": 10,
    "RATING_MOD_RESILIENCE": 11,
    "RATING_MOD_LEECH": 12,
    "RATING_MOD_HASTE_MELEE": 13,
    "RATING_MOD_HASTE_RANGED": 14,
    "RATING_MOD_HASTE_SPELL": 15,
    "RATING_MOD_EXPERTISE": 16,
    "RATING_MOD_MASTERY": 17,
    "RATING_MOD_PVP_POWER": 18,
    "RATING_MOD_VERS_DAMAGE": 19,
    "RATING_MOD_VERS_HEAL": 20,
    "RATING_MOD_VERS_MITIG": 21
});

//const player_role = Enum("TANK", "HEALER", "DAMAGE");



const player_class = freezeObject({
    "MIN": 0,
    "MAX": 10
});
const player_level = freezeObject({
    "MIN": 1,
    "MAX": 100
});
const player_race = freezeObject({
    "MIN": 7,
    "MAX": 21
});

const raid_size = freezeObject({
    "TENMAN": 10,
    "GROUP": 5,
    "TWENTYFIVEMAN": 25
});

export {
    stat_e, class_e, race_e, combat_rating_e, player_class, player_level, player_race, raid_size
};
