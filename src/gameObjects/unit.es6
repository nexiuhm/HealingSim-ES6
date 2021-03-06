import * as data from "./data";
import * as e from "../enums";


class Unit {

    constructor(_class, race, level, name, events, isEnemy) {

        // Basic unit data
        this.level = 100;
        this.isEnemy = false;

        // Unit current target
        this.target = this;
        this.isCasting = false;
        this.alive = true;
        this.group = null; // reference to the raid group the players are in ?

        // Unit spells
        this.spells = null;
        this.buffs = null;

        this.events = _events;

        // Retrieve from Armory, JSON, get from gear.
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

        /**
         * _base_stats  Base stat storage for the unit
         * @private
         * @protected
         */
        this._base_stats = {};
         /**
         * _stats   Stat storage for the unit
         * @private
         * @protected
         */
        this._stats = {};
         /**
         * _auras Aura storage for the unit
         * @private
         * @protected
         */
        this._auras = [];

         /**
         * _auras Spell storage for the unit
         * @private
         * @protected
         */
        this._spells = null;

        // Install unit
        this.init_base_stats();
        this.init_stats();



        /* Health */
        this._stats.health = {
            min_value: 0,
            max_value:  this._base_stats.stamina * data.getHpPerStamina(this.level),
            value: this._base_stats.stamina * data.getHpPerStamina(this.level)
        };

        /* Haste */
        this._stats.haste = this._base_stats.haste_rating * data.getCombatRating(e.combat_rating_e.RATING_MOD_HASTE_SPELL, this.level);

        /* Mana */
        this._stats.mana = {
            min_value: 0,
            max_value:  data.getManaByClass(this.classId, this.level),
            value: data.getManaByClass(this.classId, this.level)
        };

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
    }

    init_stats() {

        // HEALTH
        this.stats.health.value = this.stats.health.max_value = this.base_stats.stamina * data.getHpPerStamina(this.level);
        // HASTE
        this.stats.haste = this.base_stats.haste_rating * data.getCombatRating(e.combat_rating_e.RATING_MOD_HASTE_SPELL, this.level);
        // MANA
        // Note: When you are specced as restoration, holy etc. you will get a hidden aura that increases your manapool by 400%, this is how healers get more mana.
        this.stats.mana.value = this.stats.mana.max_value = data.getManaByClass(this.classId, this.level);
    }

    avoid() {
        //returns dodge, parry, or miss?. Returns false if nothing was avoided.
    }

    get SpellList() {}

    /**
     * Apply's an action to the unit.
     */

    apply(actionType, actionData) {

        switch (actionType) {

            case "APPLY_DIRECT_DAMAGE":
                this.setHealth( this.getHealth() - this.assessDamageTaken(actionData) );
                break;
            case "APPLY_DIRECT_HEAL":
                // calculateHealingTaken(data)
                // modify health accordigly
            case "APPLY_AURA_PERIODIC_DAMAGE":
                // add aura to player ( exact way of doing that not decided yet )
                // aura will apply DIRECT DAMAGE for every tick.
                // aura will be removed on expiration
            case "APPLY_AURA_PERODIC_HEAL":
                // add aura to player ( exact way of doing that not decided yet )
                // aura will apply DIRECT HEALING for every tick.
                // aura will be removed on expiration
            case "APPLY_AURA_ABSORB":

                // Add aura to array
                let auraid = this._auras.push(actionData);

                // Schedule removal of aura if it should expire at some point.
                if(actionData.duration > 0) {
                  game.time.events.add(actionData.duration,() => { this._auras[auraid] = undefined; console.log("aura done"); } );
                }
                break;
        }
    }

    getSpellList() {
        let spellList = [];
        for (let spell in this.spells)
            spellList.push(spell);

        return spellList;
    }

    getMana() {
        return this._stats.mana.value;
    }

    setMana(value) {
        if(this.getMana() + value > this.getMaxMana() )
            this._stats.mana.value = this.getMaxMana();
        else if (value < 0)
            this._stats.mana.value = 0;
        else
            this._stats.mana.value += value;

    }


    recieve_damage(dmg) {
        if (!this.alive)
            return;
        let avoided_damage = false;


        //--- Avoidance ---------------------------------------
        /*
        if ( dmg.isAvoidable ) {

            if ( this.avoid() ) {
                avoided_damage = true; // Note: Only warriors and paladins have block
            }
        }
        */
            // TODO - Take avoidance into account.
            // This is only the case if the damage source is melee
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
            // Consume all avaible absorb
            dmg = this._consumeAbsorb(dmg);

            return dmg;
        }
    }

    _consumeAbsorb(dmg) {
        if (this._stats.absorb > dmg) {
                this.setAbsorb(-dmg);
                return 0;
        } else {
            this.setAbsorb(-this._stats.absorb);
            return dmg-this._stats.absorb;
        }
    }

    cast_spell(spellName) {

        // ## Find spell ####
        if (!this.spells[spellName])
            return;
        let spell = this.spells[spellName];

        if (this.isCasting)
            this.events.UI_ERROR_MESSAGE.dispatch("Can't do that yet");
        else
            spell.use();
    }

    /* Todo: currently returns test values */
    getResistanceMultiplier(resistanceType) {

        switch(resistanceType) {
            case "physical":
                return 0.85;
            case "fire":
                return 0.95;
            default: return 1;
        }
    }

    getTotalHaste() {
        return this._stats.haste;
    }

    hasAura(aura) {
        return false;
    }

    resistance(dmg) {
        return 0;
    }

    die() {
        this.alive = false;
    }

    get CurrentAbsorb() {
        return this.stats.absorb;
    }

    set Health(value) {
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

    set Absorb(value) {
        if (!this.alive)
            return;
        this.stats.absorb += value;
        this.events.UNIT_ABSORB.dispatch(this);
    }

    get Absorb() {
      return this.stats.absorb;
    }

    get MaHealth() {
        return this.stats.health.max_value;
    }

    get Health() {
        return this.stats.health.value;
    }

    set Target(unit) {
        // Just dont bother if its the same target
        if (unit == this.target) {
            return;
        }

        // Set target & emitt event
        this.target = unit;
        this.events.TARGET_CHANGE_EVENT.dispatch();
    }

    get Target() {
      return this.target;
    }

    consume_resource(amount) {
        this.stats.mana.value -= amount;
        this.events.MANA_CHANGE.dispatch(amount);
    }
}
