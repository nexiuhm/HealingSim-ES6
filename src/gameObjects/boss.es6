import Unit from "./unit";
import SpellBase from "./spell_base";
/*

Base class to create bosses from

*/

export default class Boss extends Unit {
  constructor(_class, race, level, name, events) {
    super(_class, race, level, name, events);
  }

  // Add bossSwing
    // Needs to hit a certain range. Thinking of melee camp.
    // Collect code from raid object and refactor to fit here.

  // Add bossSingelTargetSpell
    // Hits random targets. Have to be decided on range to target to prepare for
    // unique mechanics.
    // Collect code from raid object and refactor to fit here.

  // raidAoeDamage
    // Hits everyone, or a group related to each on range. This needs to be ready
    // for unique spells that needs to hit a group of ppl.
    // Collect code from raid object and refactor to fit here.


  // Add summonAdds
    // Add functionality for boss to summon add. Consider to add this to unit
    // since there are classes who summon things that heal.

    // Add Scripted AI to control the bosses actions.
    bindActionRoutine(callbackFunction) {

      this.actionRoutine = callbackFunction;

    }
    // This function gets called on every game update. And executes the assigned boss AI function above.
    doAction() {
      if(this.actionRoutine) {
        this.actionRoutine.call(this);
      }
      else return;
    }
}

class melee_swing extends SpellBase {
    constructor(spelldata, unit) {
      super(spelldata,unit);
      this.targetMechanism = "highest_threat"

    }



}
