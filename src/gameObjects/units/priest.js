import Player from "../player";
import SpellBase from "../spell_base";
import * as data from "../data";

export default class Priest extends Player {
    constructor(race, level, name, eventManager) {
        super(4, race, level, name, eventManager);
        this.init_spells();
    }

    init_spells() {
        this._spells = {
            guardian_spirit: new guardian_spirit(this),
            power_infusion: new power_infusion(this),
            clarity_of_will: new clarity_of_will(this),
            power_word_shield: new power_word_shield(this),
            flash_of_light: new flash_of_light(this)
        };
    }
}

// ### SPELLS #########################

class flash_of_light extends SpellBase {

    constructor(player) {
        super(data.getSpellData('flash_of_light'), player);
    }

    getCastTime() {
        let ct = super.getCastTime();
        //#### Cast time incresed by 200% if Shaman has Tidal Waves buff #### //
        if (this.player.hasAura("borrowed_time")) {
            ct *= 0.8;
        }
        return ct;
    }

    onExecute() {
        let crit = game.rnd.between(1, 2);
        this.target.applyHealing(this.target.getHealth() + 130000 * crit);
        if(this.player.hasAura("borrowed_time")) {
          this.player.getAura("borrowed_time").expire();
        }

    }
}

class power_word_shield extends SpellBase {
    constructor(player) {
        super(data.getSpellData('power_word_shield'), player);
    }

    isUsable() {
        // Can't use shield if target has 'Weakened Soul' debuff
        if (this.target.hasAura("weakened_soul"))
            return false;
        else
            return true;

    }

    onExecute() {



        // Apply borrowed time ( incresed cast speed on next healing spell ) to casting player.
        this.player.applyAura("borrowed_time", undefined, 6000, undefined, this.player, {unique: true});

        // Apply absorb and weakened soul debuff to target
        this.target.applyAura("Power word: Shield", "absorb", 15000, 280000, this.player, {unique: true});
        this.target.applyAura("weakened_soul", undefined, 15000, undefined, this.player, {unique: true});


    }
}


class power_infusion extends SpellBase {
    constructor(player) {
        super(data.getSpellData('power_infusion'), player);
    }

    onExecute() {
        // Temporary until auras work
        this.player._stats.haste.setValue(0.2);
    }
}

class clarity_of_will extends SpellBase {
    constructor(player) {
        super(data.getSpellData('clarity_of_will'), player);
    }

    onExecute() {
      this.target.applyAura("clarity_of_will", "absorb", 15000, 200000, this.player);

    }

}


class guardian_spirit extends SpellBase {
    constructor(player) {
        super(data.getSpellData('guardian_spirit'), player);
    }

    onExecute() {
      this.target.applyAura("guardian_spirit", undefined, 15000, undefined, this.player);

    }

}
/*


              .,-:;//;:=,
          . :H@@@MM@M#H/.,+%;,
       ,/X+ +M@@M@MM%=,-%HMMM@X/,
     -+@MM; $M@@MH+-,;XMMMM@MMMM@+-
    ;@M@@M- XM@X;. -+XXXXXHHH@M@M#@/.
  ,%MM@@MH ,@%=             .---=-=:=,.
  =@#@@@MX.,                -%HX$$%%%:;
 =-./@M@M$                   .;@MMMM@MM:
 X@/ -$MM/                    . +MM@@@M$
,@M@H: :@:                    . =X#@@@@-
,@@@MMX, .                    /H- ;@M@M=
.H@@@@M@+,                    %MM+..%#$.
 /MMMM@MMH/.                  XM@MH; =;
  /%+%$XHH@$=              , .H@@@@MX,
   .=--------.           -%H.,@@@@@MX,
   .%MM@@@HHHXX$$$%+- .:$MMX =M@@MM%.
     =XMMM@MM@MM#H;,-+HMM@M+ /MMMX=
       =%@M@M#@$-.=$@MM@@@M; %M%=
         ,:+$+-,/H#MMMMMMM@= =,
               =++%%%%+/:-.


*/
