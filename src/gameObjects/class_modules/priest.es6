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
            power_word_shield: new power_word_shield(this),
            flash_of_light: new flash_of_light(this),
            clarity_of_will: new clarity_of_will(this),
            power_infusion: new power_infusion(this)
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
        if (this.target.hasAura("tidal_waves")) {
            ct *= 2;
        }
        return ct;
    }

    onExecute() {
        //this.target.consumeAura("tidal_waves", 1); 
        let crit = game.rnd.between(1, 2);
        this.target.setHealth(this.target.getHealth() + 130000 * crit);
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
    }

    onExecute() {
        this.target.setAbsorb(190000);
    }
}


class power_infusion extends SpellBase {
    constructor(player) {
        super(data.getSpellData('power_infusion'), player);
    }

    onExecute() {
        this.player.stats.haste += 15;
    }
}

class clarity_of_will extends SpellBase {
    constructor(player) {
        super(data.getSpellData('clarity_of_will'), player);
    }

    onExecute() {
        let crit = game.rnd.between(1, 2);
        this.target.setAbsorb(120000 * crit);
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
