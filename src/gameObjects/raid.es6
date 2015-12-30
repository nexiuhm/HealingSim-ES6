import * as e from "../enums";
import Player from "./player";
import Priest from "./class_modules/priest";
import * as data from "./data";
import {rng} from "../util";

export default class Raid {

    constructor(state) {
        this.events = state.events;
        this.players = [];
        this.raidSize = null;
    }


    setRaidSize(size) {
        this.raidSize = size;
    }

    getPlayerList() {
        return this.players;
    }

    generateTestPlayers() {
        var numberOfTanks, numberOfHealers, numberOfDps;
        var validTankClasses = [0, 1, 5, 9, 10];
        var validHealerClasses = [1, 4, 6, 9, 10];

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
            var classs = validTankClasses[rng.integerInRange(0, validTankClasses.length - 1)],
                race = rng.integerInRange(e.player_race.MIN, e.player_race.MAX),
                level = 100,
                name = data.generatePlayerName();

            var unit = this.createUnit(classs, race, level, name);
            this.addPlayer(unit);
        }

        while (numberOfHealers--) {
            var classs = validHealerClasses[rng.integerInRange(0, validHealerClasses.length - 1)],
                race = rng.integerInRange(e.player_race.MIN, e.player_race.MAX),
                level = 100,
                name = data.generatePlayerName();

            var unit = this.createUnit(classs, race, level, name);
            this.addPlayer(unit);
        }

        while (numberOfDps--) {
            var classs = rng.integerInRange(e.player_class.MIN, e.player_class.MAX),
                race = rng.integerInRange(e.player_race.MIN, e.player_race.MAX),
                level = 100,
                name = data.generatePlayerName();

            var unit = this.createUnit(classs, race, level, name);
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
                break;

            default:
                return new Player(classs, race, level, name, this.events);
                break;
        }

    }

    startTestDamage() {
        var tank = this.players[0];
        var offTank = this.players[1];

        // --- Create some random damage for testing purposes ----
        var bossSwingInterval = setInterval(bossSwing.bind(this), 1600);
        //var bossSingelTargetSpell = setInterval(singelTargetDamage.bind(this), 60000);
        var tankSelfHealOrAbsorb = setInterval(applyAbsorb.bind(this), 5000);
        var bossTimedDamage = setInterval(bossAoEDamage.bind(this), 30000); // Big aoe after 3 minutes, 180000
        var raidAoeDamage = setInterval(raidDamage.bind(this), 3000);
        var raidAIHealing = setInterval(raidHealing.bind(this), 4000);
        var manaRegenYolo = setInterval(gain_mana.bind(this), 1200);
        var spike = setInterval(bossSpike.bind(this), 8000);

        function gain_mana() {
            var player = this.players[this.players.length-1];
            player.gain_resource(1600);
        }

        function bossSpike() {
            var massiveBlow = rng.between(330000, 340900);

            tank.recive_damage({
                amount: massiveBlow
            });
            offTank.recive_damage({
                amount: massiveBlow / 2
            });

        }

        function bossSwing() {
            var bossSwing = rng.between(70000, 90900);
            var bossSwingCriticalHit = Math.random();

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
            for (var i = 0; i < this.players.length - 1; i++) {
                var player = this.players[i]
                player.recive_damage({
                    amount: 170000
                });
            }
        }

        function raidDamage() {
            var i = rng.between(0, this.players.length - 1);
            for (; i < this.players.length; i++) {
                var player = this.players[i];
                player.recive_damage({
                    amount: rng.between(85555, 168900)
                });
            }
        }

        function singelTargetDamage() {
            var random = rng.between(2, this.players.length - 1);
            this.players[random].recive_damage({
                amount: rng.between(100000, 150000)
            });
        }

        function bossEncounterAdds() {}

        function raidHealing() {

            for (var i = 0; i < this.players.length; i++) {
                var player = this.players[i];
                var incomingHeal = player.getCurrentHealth() + rng.between(80000, 120000);
                var criticalHeal = Math.random();

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
