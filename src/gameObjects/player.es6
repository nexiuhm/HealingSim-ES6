import * as data from "./data";
import * as e from "../enums";


/** 
 *  TODO: This class is really messy atm, need to find better ways.
 */
export default class Player {


    constructor(_class, race, level, name, events, isEnemy) {


        // --- Basic unit data ------------
        this.level = 100;
        this.isEnemy = false;

        // ----Players current target--------------
        this.target = this;
        this.isCasting = false;
        this.alive = true;
        this.instance = null; // reference to the raid group the players are in ?

        // --- Players spells ---------------------
        this.spells = null;
        this.buffs = null;


        this.gear_stats = {
            stamina: 7105,
            haste_rating: 1399
        };

        this.base_stats = {
            strenght: 0,
            agility: 0,
            stamina: 0,
            intellect: 0,
            spirit: 0,
            mastery_rating: 0,
            haste_rating: 0,
            crit_rating: 0,
        };

        this.stats = {
            health: {
                value: 0,
                max_value: 0,
                min_value: 0
            },
            mana: {
                value: 0,
                max_value: 0,
                min_value: 0
            },
            absorb: 0,
            haste: 0,
            crit: 0,
            spellpower: 0,
            attackpower: 0,
            mastery: 0.08, // 8% is base mastery for every class
        };



        this.isEnemy = isEnemy ? true : false;
        this.events = events;
        this.level = level;
        this.race = race;
        this.name = name;
        this.classId = _class;


        this.init_base_stats();
        this.init_stats();


    }

    init_base_stats() {
        /* This is the stats someone would have 0 gear */
        this.base_stats.agility = data.classBaseStats(this.classId, this.level, e.stat_e.AGILITY) + data.raceBaseStats(this.race, e.stat_e.AGILITY); // +gear
        this.base_stats.stamina = data.classBaseStats(this.classId, this.level, e.stat_e.STAMINA) + data.raceBaseStats(this.race, e.stat_e.STAMINA) + this.gear_stats.stamina; // + gear
        this.base_stats.intellect = data.classBaseStats(this.classId, this.level, e.stat_e.INTELLECT) + data.raceBaseStats(this.race, e.stat_e.INTELLECT); // + gear
        this.base_stats.spirit = data.classBaseStats(this.classId, this.level, e.stat_e.SPIRIT) + data.raceBaseStats(this.race, e.stat_e.SPIRIT); // + gear
        this.base_stats.strenght = data.classBaseStats(this.classId, this.level, e.stat_e.STRENGHT) + data.raceBaseStats(this.race, e.stat_e.STRENGHT); // + gear

        this.base_stats.mastery_rating = 0;
        this.base_stats.haste_rating = this.gear_stats.haste_rating;
        this.base_stats.crit_rating = 0;

        // *TODO* add stats from gear in this function or somewhere else?
    }

    init_stats() {

        // ### HEALTH ########  ------------------------------------------------------------------------------------
        this.stats.health.value = this.stats.health.max_value = this.base_stats.stamina * data.getHpPerStamina(this.level);
        // ### HASTE ####  -----------------------------------------------------------------------------------------
        this.stats.haste = this.base_stats.haste_rating * data.getCombatRating(e.combat_rating_e.RATING_MOD_HASTE_SPELL, this.level);
        // ### MANA ##########  ------------------------------------------------------------------------------------
        // Note: When you are specced as restoration, holy etc. you will get a hidden aura that increases your manapool by 400%, this is how healers get more mana.
        this.stats.mana.value = this.stats.mana.max_value = data.getManaByClass(this.classId, this.level);
    }

    avoid() {
        //returns dodge, parry, or miss?. Returns false if nothing was avoided.
    }

    getSpellList() {
        var spellList = [];
        for (var spell in this.spells)
            spellList.push(spell);

        return spellList;

    }

    getMana() {
        return this.stats.mana.value;

    }

    getMaxMana() {
        return this.stats.mana.max_value;
    }

    recive_damage(dmg) {
        if (!this.alive)
            return;
        var avoided_damage = false;


        //--- Avoidance ---------------------------------------
        /*
        if ( dmg.isAvoidable ) {

            if ( this.avoid() ) {
                avoided_damage = true; // Note: Only warriors and paladins have block
            }
        }
        */
        //--- Resistance and absorb ---------------------------

        if (!avoided_damage) {

            //dmg.amount *= this.getResistancePercent('PHYSICAL');

            // Full absorb
            if (this.stats.absorb > dmg.amount) {
                this.setAbsorb(-dmg.amount);
            } else {
                dmg.amount -= this.stats.absorb;
                this.setAbsorb(-this.stats.absorb);
                this.setHealth(this.getCurrentHealth() - dmg.amount);
            }
        }
    }

    cast_spell(spellName) {

        // ## Find spell ####
        if (!this.spells[spellName])
            return;
        var spell = this.spells[spellName];

        // ##################
        if (this.isCasting)
            this.events.UI_ERROR_MESSAGE.dispatch("Can't do that yet");
        else
            spell.use();
    }


    hasAura(aura) {
        return false;
    }

    resistance(dmg) {
        return 0;
    }

    die() {
        this.alive = false;
        //## TODO ## 
        // - Remove all auras that doesnt presist through death.
        // - Other stuff that needs to happen when you die.
    }

    getAbsorb() {
        return this.stats.absorb;
    }

    setHealth(value) {
        if (!this.alive)
            return;
        if (value <= 0) {
            this.stats.health.value = 0;
            this.alive = false;
            this.events.UNIT_DEATH.dispatch(this);
            return;
        }
        if (value >= this.getMaxHealth()) {
            this.stats.health.value = this.getMaxHealth();
        } else {
            this.stats.health.value = value;
        }

        this.events.UNIT_HEALTH_CHANGE.dispatch(this);
        // ## TODO ##
        // - Make sure it doesnt exceed maximum possible health
        // - Handle overhealing here? or somewhere else
    }

    setAbsorb(value) {
        if (!this.alive)
            return;

        this.stats.absorb += value;
        this.events.UNIT_ABSORB.dispatch(this);

        // ## TODO ##
        // - Handle overhealing here? or somewhere else
    }

    getMaxHealth() {
        return this.stats.health.max_value;
    }

    getCurrentHealth() {
        return this.stats.health.value;
    }

    setTarget(unit) {
        // Just dont bother if its the same target
        if (unit == this.target) {
            return;
        }

        // Set target & emitt event 
        this.target = unit;
        this.events.TARGET_CHANGE_EVENT.dispatch();
    }

    consume_resource(amount) {
        this.stats.mana.value -= amount;
        this.events.MANA_CHANGE.dispatch(amount);
    }
    gain_resource(gain) {
        if (gain + this.getMana() >= this.getMaxMana()) {
            this.stats.mana.value = this.getMaxMana();
        } else {
            this.stats.mana.value += gain;
        }
        this.events.MANA_CHANGE.dispatch(gain);
    }

    // ## TODO ## Calculates the total haste amount on the player. Base stats + buffs + auras
    total_haste() {
        // 1.5 = 150% haste and so on
        return this.stats.haste;
    }


    findMostInjuredPlayers(players) {

        var playersInRange = this.instance.getPlayerList();
        var lowestPlayers = playersInRange.sort(
            function sortByDamageTakenAscending(player, otherPlayer) {
                if (player.getHealthPercent() < otherPlayer.getHealthPercent()) {
                    return -1;
                } else if (player.getHealthPercent() > otherPlayer.getHealthPercent()) {
                    return 1;
                } else {
                    return 0;
                }
            }
        );
        return lowestPlayers.slice(0, players);
    }
}
