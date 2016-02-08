import * as data from "./data";
import * as e from "../enums";

// Todo, import events istead of passing it as a parameter to the constructor.

export default class Unit {

    constructor(_class, race, level, name, _events, isEnemy) {

        // Basic unit data
        this.level = level ? level : 100;
        this.isEnemy = isEnemy ? true : false; // remove this later
        this.race = race;
        this.name = name;
        this.classId = _class;
        // Unit current target
        this.target = this;
        // Unit state
        this.alive = true;
        this.isCasting = false;

        this.events = _events;
        this.group = null; // reference to the raid group the player is in ?

        

        // Retrieve from Armory, JSON, get from gear.
        this.gear_stats = {
            stamina: 7105,
            haste_rating: 1399
        };

        /**
         * _base_stats  Base stat storage for the unit
         * @priavte
         * @protected
         */
        this._base_stats = {};
         /**
         * _stats   Stat storage for the unit
         * @priavte
         * @protected
         */
        this._stats = {};
         /**
         * _auras Aura storage for the unit
         * @priavte
         * @protected
         */
        this._auras = [];

         /**
         * _auras Spell storage for the unit
         * @priavte
         * @protected
         */
        this._spells = null;


        // Install unit
        this.init_base_stats();
        this.init_stats();


    }

    init_base_stats() {
        /* This is the stats someone would have with 0 gear */
        this._base_stats.agility = data.classBaseStats(this.classId, this.level, e.stat_e.AGILITY) + data.raceBaseStats(this.race, e.stat_e.AGILITY); // +gear
        this._base_stats.stamina = data.classBaseStats(this.classId, this.level, e.stat_e.STAMINA) + data.raceBaseStats(this.race, e.stat_e.STAMINA) + this.gear_stats.stamina; // + gear
        this._base_stats.intellect = data.classBaseStats(this.classId, this.level, e.stat_e.INTELLECT) + data.raceBaseStats(this.race, e.stat_e.INTELLECT); // + gear
        this._base_stats.spirit = data.classBaseStats(this.classId, this.level, e.stat_e.SPIRIT) + data.raceBaseStats(this.race, e.stat_e.SPIRIT); // + gear
        this._base_stats.strenght = data.classBaseStats(this.classId, this.level, e.stat_e.STRENGHT) + data.raceBaseStats(this.race, e.stat_e.STRENGHT); // + gear

        this._base_stats.mastery_rating = 0;
        this._base_stats.haste_rating = this.gear_stats.haste_rating;
        this._base_stats.crit_rating = 0;
    }

    init_stats() {

        /**
         * Will make a stat-manager or something like that eventually, feels redundant to always have to specify min_vale etc.
         */

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

        /* Absorb */
        this._stats.absorb = 0;
    }



    /**
     * Apply's an action to the unit.
     */

    apply(actionType, actionData) {

        switch (actionType) {

            case APPLY_DIRECT_DAMAGE:
                // calculateDamageTaken(data)
                // modify health accordincly
            case APPLY_DIRECT_HEAL:
                // calculateHealingTaken(data)
                // modify health accordigly
            case APPLY_AURA_PERIODIC_DAMAGE:
                // add aura to player ( exact way of doing that not decided yet )
                // aura will apply DIRECT DAMAGE for every tick.
                // aura will be removed on expiration
            case APPLY_AURA_PERODIC_HEAL:
                // add aura to player ( exact way of doing that not decided yet )
                // aura will apply DIRECT HEALING for every tick.
                // aura will be removed on expiration
            case APPLY_AURA_ABSORB:
                // TODO: Implement this first. Make power word shield show in UI aswell
                break;
        }

    }


    getSpellList() {
        let spellList = [];
        for (let spell in this._spells)
            spellList.push(spell);

        return spellList;
    }

    getMana() {
        return this._stats.mana.value;

    }

    getMaxMana() {
        return this._stats.mana.max_value;
    }

    recieve_damage(dmg) {

        let avoided_damage = false;


        //--- Avoidance ---------------------------------------
        
            // TODO - Take avoidance into account. 
            // This is only the case if the damage source is melee 
            
        //--- Resistance and absorb ---------------------------

        if (!avoided_damage) {

            //dmg.amount *= this.getResistancePercent('PHYSICAL');

            // Full absorb
            if (this._stats.absorb > dmg.amount) {
                this.setAbsorb(-dmg.amount);
            } else {
                dmg.amount -= this._stats.absorb;
                this.setAbsorb(-this._stats.absorb);
                this.setHealth(this.getHealth() - dmg.amount);
            }
        }
    }

    cast_spell(spellName) {

        // ## Find spell ####
        if (!this._spells[spellName])
            return;
        let spell = this._spells[spellName];

        if (this.isCasting)
            this.events.UI_ERROR_MESSAGE.dispatch("Can't do that yet");
        else
            spell.use();
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

    getCurrentAbsorb() {
        return this._stats.absorb;
    }

    setHealth(value) {
        if (!this.alive)
            return;
        if (value <= 0) {
            this._stats.health.value = 0;
            this.alive = false;
            this.events.UNIT_DEATH.dispatch(this);
            return;
        }
        if (value >= this.getMaxHealth()) {
            this._stats.health.value = this.getMaxHealth();
        } else {
            this._stats.health.value = value;
        }

        this.events.UNIT_HEALTH_CHANGE.dispatch(this);
        // ## TODO ##
        // - Make sure it doesnt exceed maximum possible health
        // - Handle overhealing here? or somewhere else
    }

    setAbsorb(value) {
        if (!this.alive)
            return;
        this._stats.absorb += value;
        this.events.UNIT_ABSORB.dispatch(this);
    }

    getAbsorb() {
        return this._stats.absorb;
    }

    getMaxHealth() {
        return this._stats.health.max_value;
    }

    getHealth() {
        return this._stats.health.value;
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

    getTarget() {
        return this.target;
    }

    consume_resource(amount) {
        this._stats.mana.value -= amount;
        this.events.MANA_CHANGE.dispatch(amount);
    }
}
