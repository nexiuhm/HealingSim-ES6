
import * as e from "../enums";
import Player from "./player";
import Priest from "./units/priest";
import * as data from "./data";
import {
  rng
}
from "../util";

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

    if (this._raidSize == e.raid_size.GROUP) {
      numberOfTanks = 1;
      numberOfHealers = 0;
      numberOfDps = 3;
    }

    if (this._raidSize == e.raid_size.TENMAN) {
      numberOfTanks = 2;
      numberOfHealers = 2;
      numberOfDps = 5;
    }

    if (this._raidSize == e.raid_size.TWENTYFIVEMAN) {
      numberOfTanks = 2;
      numberOfHealers = 5;
      numberOfDps = 17;
    }

    while (numberOfTanks--) {
      let classs = validTankClasses[rng.integerInRange(0, validTankClasses.length -
          1)],
        race = rng.integerInRange(e.player_race.MIN, e.player_race.MAX),
        level = 100,
        name = data.generatePlayerName();

      let unit = this.createUnit(classs, race, level, name);
      this.addPlayer(unit);
    }

    while (numberOfHealers--) {
      let classs = validHealerClasses[rng.integerInRange(0,
          validHealerClasses.length - 1)],
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

  /**
   * Temporary for testing. Boss damage should be done in a better and more manageable way instead.
   */

  bossSpike() {
    let tank = this.players[0];
    let offTank = this.players[1];
    let massiveBlow = rng.between(350000, 380900);

    tank.applyDamage(massiveBlow, "physical" );
    offTank.applyDamage(massiveBlow/2, "physical" );
  }

  bossSwing() {
    let tank = this.players[0];
    let offTank = this.players[1];

    let bossSwing = rng.between(110000, 195900);
    let bossSwingCriticalHit = Math.random();

    // 20% chance to critt. Experimental.
    if (bossSwingCriticalHit < 0.85)
      bossSwing *= 1.5;

    tank.applyDamage(bossSwing, "physical" );
    offTank.applyDamage(bossSwing/2, "physical" );
  }

  bossAoEDamage() {
    for (let i = 0; i < this.players.length - 1; i++) {
      let unit = this.players[i];
      unit.applyDamage(770000, "fire");
    }
  }

  raidDamage() {
    let i = rng.between(0, this.players.length - 1);
    let damageAmount = rng.between(100000, 150000);
    for (; i < this.players.length; i++) {
      let unit = this.players[i];
      unit.applyDamage(damageAmount,"fire");
    }
  }

  singleTargetDamage() {
    let randomPlayer = rng.between(2, this.players.length - 1);
    let damageAmount = rng.between(100000, 150000);
    this.players[randomPlayer].applyDamage(damageAmount, "fire");
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

      player.applyHealing(incomingHeal);
    }
  }

  gainMana() {
    let player = this.players[this.players.length - 1];
      player.setMana(player.getMana() + 1600);
  }

  startTestDamage() {

    // --- Create some random damage for testing purposes ----
    let bossSwingInterval = setInterval(this.bossSwing.bind(this), 1600);
    let bossSingelTargetSpell = setInterval(this.singleTargetDamage.bind(this), 60000);
    let bossTimedDamage = setInterval(this.bossAoEDamage.bind(this), 30000); // Big aoe after 3 minutes, 180000
    let raidAoeDamage = setInterval(this.raidDamage.bind(this), 3000);
    let raidAIHealing = setInterval(this.raidHealing.bind(this), 4000);
    let manaRegenYolo = setInterval(this.gainMana.bind(this), 1200);
    let spike = setInterval(this.bossSpike.bind(this), 8000);
  }
}
