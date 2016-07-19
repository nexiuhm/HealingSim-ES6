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
        this._auras = [];

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
        this._stats.health.onMinValue = () => { this.die(); };

        /* Mana */
        this._stats.mana = new Stat(0,200000);

        /* Haste */
        this._stats.haste = new Stat(0, 1);
        this._stats.haste.setValue(0);



    }

    /**
     * Apply's an action to the unit.
     */


    applyDamage(amount, type, source) {
      if(!this.alive) return;
      this._stats.health.setValue(this._stats.health.getValue() - this.assessDamageTaken(amount) );
      this.events.UNIT_HEALTH_CHANGE.dispatch(this);

    }


    applyHealing(value) {
      if(!this.alive) return;
      // Check modifiers --- to buff healing recived etc
      this._stats.health.setValue(value);
      this.events.UNIT_HEALTH_CHANGE.dispatch(this);

    }

    applyAura(name, type, duration, value, source, flags) {
        if(!this.alive) return;

        // Check if the aura contains special "flags". F.ex some auras can only exist one instance of. Most hots etc cant be applied twice etc
        if(flags) {

          // If the aura can only exist once per caster.
          if(flags.unique) {

            // Check if there actually exists an identical aura on the player. If it does expire current one
            if(this.getAura(name)) {
              this.removeAura(this.getAura(name));
            }

          }

        }

        let aura = new Aura(duration, type, value, name);

        // Make sure the aura array is cleaned up after an aura expires.
        aura.onExpired( () => { this.removeAura(aura); } );
        // Add aura to aura array.
        this._auras.push(aura);

        // Dispatch events
        if(type === "absorb") {
          this.events.UNIT_ABSORB.dispatch(this);
        }

        this.events.AURA_APPLIED.dispatch(this, name);


    }

    removeAura(aura) {
      // Find & remove aura

      for(let i = 0; i < this._auras.length; i++) {
         if(aura.id === this._auras[i].id) {
           this._auras.splice(i, 1);
           this.events.AURA_REMOVED.dispatch(this, aura.name);

           return;
         }
      }

    }


    getSpellList() {
        let spellList = [];

        for (let spell in this._spells)
            spellList.push(spell.toString());

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



    assessDamageTaken(dmg) {

        let avoided_damage = false;

        //--- Avoidance ---------------------------------------
            // TODO - Take avoidance into account.
            // This is only the case if the damage source is melee
        //--- Resistance and absorb ---------------------------

        if (!avoided_damage) {
            // physical damage is reduce because player has armor
            dmg *= 0.6;

            // Reduce damge based on absorbed amount
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
              this.removeAura(aura);
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

          if (this.isCasting || !this.alive)
              this.events.UI_ERROR_MESSAGE.dispatch("Can't do that");
          else
              spellToBeCasted.use();
        }
    }


    hasAura(auraName) {
            for(let aura of this._auras) {

              if(aura.name === auraName) {
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
          this._stats.health.setValue(400000);
          return;
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
