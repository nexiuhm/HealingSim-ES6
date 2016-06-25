import * as data from "./data";
import * as e from "../enums";
import Stat from "./stat";
import Aura from "./aura";
// Todo, import events istead of passing it as a parameter to the constructor.

export default class Unit {

    constructor(_class, race, level, name, _events) {

        // Basic unit data
        this.level = level ? level : 100;
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
        this._auras = new Array();

         /**
         * _auras Spell storage for the unit
         * @private
         * @protected
         */
        this._spells = null;


        // Install unit
        this.init_stats();

    }


    init_stats() {

        /**
         * Will make a stat-manager or something like that eventually, feels redundant to always have to specify min_vale etc.
         */

        /* Health                    Min value -- Max value */
        this._stats.health = new Stat(   0,        600000);
        // Stat will use this callback when it has reached its minimum value
        this._stats.health.onMinValue = () => { this.die() };

        /* Mana */
        this._stats.mana = new Stat(0,200000);

        /* Haste */
        this._stats.haste = new Stat(0, 1);
        this._stats.haste.setValue(0);



    }

    /**
     * Apply's an action to the unit.
     */

    apply(actionType, actionData) {
        if(!this.alive) return;

        switch (actionType) {

            case "APPLY_DIRECT_DAMAGE":
                this.setHealth(this._stats.health.getValue() - this.assessDamageTaken(actionData));
                break;
            case "APPLY_DIRECT_HEAL":
                // calculateHealingTaken(data)
                // modify health accordigly
            case "APPLY_AURA_PERIODIC_DAMAGE":
                // Create a aura object based on data from spell. ( spell id, aura type, duration, tick() callback )

            case "APPLY_AURA_PERODIC_HEAL":
                // add aura to player ( exact way of doing that not decided yet )
                // aura will apply DIRECT HEALING for every tick.
                // aura will be removed on expiration

            case "APPLY_AURA_BLANK":
                this._auras.push(new Aura(actionData.duration, undefined , undefined, actionData.name));
                break;
            case "APPLY_AURA_ABSORB":

               let aura = new Aura(actionData.duration, actionData.type, actionData.value, actionData.name);
               this._auras.push(aura);


               this.events.AURA_APPLIED.dispatch(this);
               this.events.UNIT_ABSORB.dispatch(this);
               console.table(this._auras);
        }
    }

    applyModifier(target, value ){
         // if target modifiy exists on target continue

         // if value is
    }

    getSpellList() {
        let spellList = [];

        for (let spell in this._spells)
            spellList.push(spell);

        return spellList;
    }

    getMana() {
        return this._stats.mana.getValue();
    }

    setMana(value) {
        this._stats.mana.setValue(value);
        this.events.MANA_CHANGE.dispatch();
    }

    getMaxMana() {
        return this._stats.mana.maxValue();
    }



    assessDamageTaken(damage) {

        let avoided_damage = false;
        let dmg = damage.amount;

        //--- Avoidance ---------------------------------------
            // TODO - Take avoidance into account.
            // This is only the case if the damage source is melee
        //--- Resistance and absorb ---------------------------

        if (!avoided_damage) {

            dmg *= 0.6;

            // Consume all avaible absorb
            dmg = this._consumeAbsorb(dmg);

            return dmg;
        }
    }

    _consumeAbsorb(dmg) {
       // ----- WIP ----------

       // Sort auras by remaining time.
       //let absorbAurasByTimeRemaining = this._auras.sort((a,b)=> { if(a.duration < b.duration) return -1;}
       for(let aura of this._auras) {
         if(aura.type === "absorb") {

           // If the damage is completely mitigated by the absorb buff.

            if((aura.value - dmg) > 0) {
              aura.value = aura.value - dmg;
              dmg = 0;
              break;
            }

          // If damage is damage exceeds the absorb buff. Kill the aura and continue to next one
            else  {
              dmg -= aura.value;
              aura.value = 0;
              this._auras.splice(aura, 1);
            }

         }

       }


       this.events.UNIT_ABSORB.dispatch(this);

       return dmg;

    }

    cast(spellName) {

        if (!this.hasSpell(spellName)) {
          console.log("Trying to cast a spell but can't find it on the unit");
        }
        else {
          let spellToBeCasted = this._spells[spellName];

          if (this.isCasting)
              this.events.UI_ERROR_MESSAGE.dispatch("Can't do that yet");
          else
              spellToBeCasted.use();
        }
    }


    hasAura(auraName) {
            for(let aura of this._auras) {

              if(aura.name === auraName && (aura._remaining > 0)) {
                 return true;
              }

            }
            return false;
    }

    getAura(auraName) {
      for(let aura of this._auras) {

        if(aura.name === auraName) {
           return aura;
        }

      }
      
    }


    hasSpell(spell) {
      if(this._spells.hasOwnProperty(spell)) return true;
      else return false;
    }


    die() {

        if(this.hasAura("guardian_spirit")) {
          // this.stats.health = this.getAura(guardian_spirit).value();
          // return;
        }
        this.alive = false;
        this.events.UNIT_DEATH.dispatch(this);
    }

    getCurrentAbsorb() {
      let totalAbsorb = 0;


      for(let aura in this._auras) {
        aura = this._auras[aura];
        if(aura.type === "absorb") {
           totalAbsorb += aura.value;

        }

      }

      return totalAbsorb;
    }

    setHealth(value) {
        this._stats.health.setValue(value);
        this.events.UNIT_HEALTH_CHANGE.dispatch(this);
        // ## TODO ##
        // - Make sure it doesnt exceed maximum possible health
        // - Handle overhealing here? or somewhere else
    }



    getAbsorb() {
        let totalAbsorb = 0;


        for(let aura in this._auras) {
          aura = this._auras[aura];
          if(aura.type === "absorb") {
             totalAbsorb += aura.value;

          }

        }

        return totalAbsorb;
    }

    getMaxHealth() {
        return this._stats.health.maxValue();
    }

    getHealth() {
        return this._stats.health.getValue();
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
        this._stats.mana.setValue(this.getMana() - amount);
        this.events.MANA_CHANGE.dispatch(amount);
    }
}
