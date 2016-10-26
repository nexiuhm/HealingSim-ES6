import Unit from "./unit";
import SpellBase from "./spell_base";
/*

Base class to create bosses from

*/

export default class Boss extends Unit {
  constructor(_class, race, level, name, events) {
    super(_class, race, level, name, events);

    this.isEnemy = true;
    this.phase = null;
    this.isEngaged = false;
     // Creates a Phaser.Timer http://phaser.io/docs/2.6.2/Phaser.Timer.html
    this._timers = game.time.create(false);


  }

  engage() {
    if(!this.isEngaged) {
      this._timers.start();
      this.isEngaged = true;
    }
  }
  // Clear all pending actions, usually needed if there is a phase change.
  clearActions () {
     this._timers.removeAll();
  }

  debug_timeSinceEngage() {
     return (this._timers.ms + " ms / " + this._timers.ms * 0.001 + " sec")
  }


  scheduleAction(spellId, milliseconds) {
    // Add a new looping event to the timer container object.
    this._timers.loop( milliseconds, () => { console.log("Dbg - Boss castng spell: " + spellId + "  . \n Time since engage  " + this.debug_timeSinceEngage() ); } );

  }
}

/*
class melee_swing extends SpellBase {
    constructor(spelldata, unit) {
      super(spelldata,unit);
      this.targetMechanism = "highest_threat";
      this.requiresPhase = 2;
    }
}*/
