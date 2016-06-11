import * as e from "../enums";
import Player from "./player";
import Priest from "./class_modules/priest";
import * as data from "./data";
import {rng} from "../util";

/**
 * Class that manages the group and player creation.
 */

export default class Raid {

  constructor(state) {
    this.events = state.events;
    this.players = [];
    this._raidSize = null;
  }

  setRaidSize(size) {
    this._raidSize = size;
  }

  getRaidSize() {
    return this._raidSize;
  }

  getPlayerList() {
    return this.players;
  }

    generateTestPlayers() {
        let numberOfTanks, numberOfHealers, numberOfDps;
        let validTankClasses = [0, 1, 5, 9, 10];
        let validHealerClasses = [1, 4, 6, 9, 10];

        if (this.raidSize == e.raid_size.GROUP) {
            numberOfTanks = 1;
            numberOfHealers = 0;
            numberOfDps = 3;
        }

        if (this.raidSize == e.raid_size.TENMAN) {
            numberOfTanks = 2;
            numberOfHealers = 2;
            numberOfDps = 5;
        }

        if (this.raidSize == e.raid_size.TWENTYFIVEMAN) {
            numberOfTanks = 2;
            numberOfHealers = 5;
            numberOfDps = 17;
        }


        while (numberOfTanks--) {
            let classs = validTankClasses[rng.integerInRange(0, validTankClasses.length - 1)],
                race = rng.integerInRange(e.player_race.MIN, e.player_race.MAX),
                level = 100,
                name = data.generatePlayerName();

            let unit = this.createUnit(classs, race, level, name);
            this.addPlayer(unit);
        }

        while (numberOfHealers--) {
            let classs = validHealerClasses[rng.integerInRange(0, validHealerClasses.length - 1)],
                race = rng.integerInRange(e.player_race.MIN, e.player_race.MAX),
                level = 100,
                name = data.generatePlayerName();

            let unit = this.createUnit(classs, race, level, name);
            this.addPlayer(unit);
        }

        while (numberOfDps--) {
            let classs = rng.integerInRange(e.player_class.MIN, e.player_class.MAX),
                race = rng.integerInRange(e.player_race.MIN, e.player_race.MAX),
                level = 100,
                name = data.generatePlayerName();

            let unit = this.createUnit(classs, race, level, name);
            this.addPlayer(unit);
        }
    }


  /**
   * Add a player to the raidgroup
   * @param {Object(Player)} unit
   */

  addPlayer(unit) {
    this.players.push(unit);
  }

    /**
     * Add a player to the raidgroup
     * @param {Object(Player)} unit
     */

    // When you create a unit you also have to pass them a reference to the event manager, so they know how to communicate events.
    createUnit(classs, race, level, name) {


        // Check if a valid "level" is chosen;
        if (level < e.PLAYER_LEVEL_MIN || level > e.PLAYER_LEVEL_MAX)
            level = e.PLAYER_LEVEL_MAX;
        else
            level = level;

        switch (classs) {
            case e.class_e.PRIEST:
                return new Priest(race, level, name, this.events);

            default:
                return new Player(classs, race, level, name, this.events);
        }
    }

  bossSpike() {
    let tank = this.players[0];
    let offTank = this.players[1];
    let massiveBlow = rng.between(330000, 340900);

    tank.apply("APPLY_DIRECT_DAMAGE", { amount: massiveBlow, type: "physical" });
    offTank.apply("APPLY_DIRECT_DAMAGE", { amount: massiveBlow/ 2, type: "physical" });
  }

  bossSwing() {
    let tank = this.players[0];
    let offTank = this.players[1];

    let bossSwing = rng.between(90000, 115900);
    let bossSwingCriticalHit = Math.random();

    // 20% chance to critt. Experimental.
    if (bossSwingCriticalHit < 0.85)
      bossSwing *= 1.5;

    tank.apply("APPLY_DIRECT_DAMAGE", { amount: bossSwing, type: "physical" });
    offTank.apply("APPLY_DIRECT_DAMAGE", { amount: bossSwing/ 2, type: "physical" });
  }

  bossAoEDamage() {
    for (let i = 0; i < this.players.length - 1; i++) {
      let unit = this.players[i];
      unit.apply("APPLY_DIRECT_DAMAGE", { amount: 170000, type: "fire" });
    }
  }

  raidDamage() {
    let i = rng.between(0, this.players.length - 1);
    for (; i < this.players.length; i++) {
      let unit = this.players[i];
      unit.apply("APPLY_DIRECT_DAMAGE", { amount: rng.between(85555, 168900), type: "fire" });
    }
  }

  singleTargetDamage() {
    let random = rng.between(2, this.players.length - 1);
    this.players[random].apply("APPLY_DIRECT_DAMAGE", { amount: rng.between(100000, 150000), type: "fire" });
  }

  bossEncounterAdds() {

  }

  raidHealing() {

    for (let i = 0; i < this.players.length; i++) {
      let player = this.players[i];
      let incomingHeal = player.getHealth() + rng.between(80000, 120000);
      let criticalHeal = Math.random();

      // 20% chance to critt. Experimental.
      if (criticalHeal < 0.8)
        incomingHeal *= 1.5;
    /**
     * Temporary for testing. Boss damage should be done in a better and more manageable way instead.
     */
   }
 }

    startTestDamage() {
        let tank = this.players[0];
        let offTank = this.players[1];

        // --- Create some random damage for testing purposes ----
        let bossSwingInterval = setInterval(bossSwing.bind(this), 1600);
        //let bossSingelTargetSpell = setInterval(singelTargetDamage.bind(this), 60000);
        let tankSelfHealOrAbsorb = setInterval(applyAbsorb.bind(this), 5000);
        let bossTimedDamage = setInterval(bossAoEDamage.bind(this), 30000); // Big aoe after 3 minutes, 180000
        let raidAoeDamage = setInterval(raidDamage.bind(this), 3000);
        let raidAIHealing = setInterval(raidHealing.bind(this), 4000);
        let manaRegenYolo = setInterval(gain_mana.bind(this), 1200);
        let spike = setInterval(bossSpike.bind(this), 8000);

        function gain_mana() {
            let player = this.players[this.players.length - 1];
            player.gain_resource(1600);
        }

        function bossSpike() {
            let massiveBlow = rng.between(330000, 340900);

            tank.recive_damage({
                amount: massiveBlow
            });
            offTank.recive_damage({
                amount: massiveBlow / 2
            });

        }

        function bossSwing() {
            let bossSwing = rng.between(70000, 90900);
            let bossSwingCriticalHit = Math.random();

            // 20% chance to critt. Experimental.
            if (bossSwingCriticalHit < 0.85)
                bossSwing *= 1.5;
            tank.recive_damage({
                amount: bossSwing
            });
            offTank.recive_damage({
                amount: bossSwing / 2
            });

        }

        function bossAoEDamage() {
            for (let i = 0; i < this.players.length - 1; i++) {
                let player = this.players[i]
                player.recive_damage({
                    amount: 170000
                });
            }
        }

        function raidDamage() {
            let i = rng.between(0, this.players.length - 1);
            for (; i < this.players.length; i++) {
                let player = this.players[i];
                player.recive_damage({
                    amount: rng.between(85555, 168900)
                });
              }
        }


        function singelTargetDamage() {
            let random = rng.between(2, this.players.length - 1);
            this.players[random].recive_damage({
                amount: rng.between(100000, 150000)
            });
        }

        function bossEncounterAdds() {}

        function raidHealing() {

            for (let i = 0; i < this.players.length; i++) {
                let player = this.players[i];
                let incomingHeal = player.getCurrentHealth() + rng.between(80000, 120000);
                let criticalHeal = Math.random();

                // 20% chance to critt. Experimental.
                if (criticalHeal < 0.8)
                    incomingHeal *= 1.5;

                player.setHealth(incomingHeal);
            }
        }

        function applyAbsorb() {
            //this.player.setAbsorb(game.rnd.between(115, 88900));
            tank.setHealth(tank.getCurrentHealth() + rng.between(10000, 38900));
        }

        // Legge inn AI shields på raidmembers.
    }
  }
}

  applyAbsorb() {
    let tank = this.players[0];
    let offTank = this.players[1];
    //this.player.setAbsorb(game.rnd.between(115, 88900));
    tank.setHealth(tank.getHealth() + rng.between(10000, 38900));

    // Legge inn AI shields på raidmembers.
  }
  }

  gainMana() {
    let player = this.players[this.players.length - 1];
      player.setMana(1600);
  }

  startTestDamage() {

    // --- Create some random damage for testing purposes ----
    let bossSwingInterval = setInterval(this.bossSwing.bind(this), 1600);
    let bossSingelTargetSpell = setInterval(this.singleTargetDamage.bind(this), 60000);
    let tankSelfHealOrAbsorb = setInterval(this.applyAbsorb.bind(this), 5000);
    let bossTimedDamage = setInterval(this.bossAoEDamage.bind(this), 30000); // Big aoe after 3 minutes, 180000
    let raidAoeDamage = setInterval(this.raidDamage.bind(this), 3000);
    let raidAIHealing = setInterval(this.raidHealing.bind(this), 4000);
    let manaRegenYolo = setInterval(this.gainMana.bind(this), 1200);
    let spike = setInterval(this.bossSpike.bind(this), 8000);
  }
}
