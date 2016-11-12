import Boss from "../boss";
import SpellBase from "../spell_base";
import * as data from "../data";

export default class Kromog extends Boss {
    constructor(race, level, name, events) {
        super(null, race, level, name, events);

        this.init_spells();
        this.init_actions();
    }

    init_spells() {

    }

    schedule_actions() {
                             // spell id       ms       repeats
      this.scheduleAction("massive_explosion", 20000, true);
      this.scheduleAction("minor_explosion", 38000, true);
      this.scheduleAction("special_melee_ability", 5000, true);
      this.scheduleAction("melee_swing", 1600, true);

    }


}


// TODO before this can be finished: Target mechanicsms needs to be added to the spell class.
// ( find target by role ? (i.e main tank), find random targets etc etc)




// ### BOSS ABILITIES #########################
