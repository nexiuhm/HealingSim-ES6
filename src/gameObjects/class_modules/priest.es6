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
            ct *= 0.7;
        }
        return ct;
    }

    onExecute() {
        //this.target.consumeAura("tidal_waves", 1);
        let crit = game.rnd.between(1, 2);
        this.target.setHealth(this.target.getHealth() + 130000 * crit);
        if(this.player.hasAura("borrowed_time")) {
          this.player.getAura("borrowed_time").expire();
        }

        console.table(this.player._auras);
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


        // Note. this is work-in-progress, atm it has no effect.
        this.target.apply("APPLY_AURA_BLANK", {
            name: "weakened_soul",
            duration: 15000 // how long until the aura/buff expires in ms
        });

        this.player.apply("APPLY_AURA_BLANK", {
            name: "borrowed_time",
            duration: 6000 // how long until the aura/buff expires in ms
        });

        this.target.apply("APPLY_AURA_ABSORB", {
            name: "Power word: Shield",
            value: 190000, // if value goes to <0 aura should we removed
            spell: this.spellid, // so that the aura is associated with a spell
            duration: 15000, // how long until the aura/buff expires in ms
            type: "absorb"
        });
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
        let crit = game.rnd.between(1, 2);
        this.target.apply("APPLY_AURA_ABSORB", {
            name: "Clairy Of Will",
            value: 190000, // if value goes to <0 aura should we removed
            spell: this.spellid, // so that the aura is associated with a spell
            duration: 15000, // how long until the aura/buff expires in ms
            type: "absorb"
        });
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
