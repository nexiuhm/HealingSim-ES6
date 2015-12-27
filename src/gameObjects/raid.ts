class Raid {
    players = [];
    events;
    deathCounter: number;
    raidSize: number;

    constructor(eventManager: EventManager) {
        this.events = eventManager;
    }

    setRaidSize(size: raid_size) {
        this.raidSize = size;
    }

    getPlayerList(): any {
        return this.players;
    }

    generateTestPlayers() {
        var numberOfTanks: number;
        var numberOfHealers: number;
        var numberOfDps: number;

        if (this.raidSize == raid_size.GROUP) {
            numberOfTanks = 1;
            numberOfHealers = 0;
            numberOfDps = 3;
        }

        if (this.raidSize == raid_size.TENMAN) {
            numberOfTanks = 2;
            numberOfHealers = 2;
            numberOfDps = 5;
        }

        if (this.raidSize == raid_size.TWENTYFIVEMAN) {
            numberOfTanks = 2;
            numberOfHealers = 5;
            numberOfDps = 17;
        }
       
        var validTankClasses: number[] = [0, 1, 5, 9, 10];
        var validHealerClasses: number[] = [1, 4, 6, 9, 10];
             
        while (numberOfTanks--) {
            var classs = validTankClasses[game.rnd.integerInRange(0, validTankClasses.length - 1)],
                race = game.rnd.integerInRange(player_race.MIN, player_race.MAX),
                level = 100,
                name = data.generatePlayerName();
     
            var unit = this.createUnit(classs, race, level, name);
            this.addPlayer(unit);
        }

        while (numberOfHealers--) {
            var classs = validHealerClasses[game.rnd.integerInRange(0, validHealerClasses.length - 1)],
                race = game.rnd.integerInRange(player_race.MIN, player_race.MAX),
                level = 100,
                name = data.generatePlayerName();
 
            var unit = this.createUnit(classs, race, level, name);
            this.addPlayer(unit);
        }
       
        while (numberOfDps--) {
            var classs = game.rnd.integerInRange(player_class.MIN, player_class.MAX),
                race = game.rnd.integerInRange(player_race.MIN, player_race.MAX),
                level = 100,
                name = data.generatePlayerName();
            
            var unit = this.createUnit(classs, race, level, name);
            this.addPlayer(unit);
        }
    }

    addPlayer(unit: Player) {
        this.players.push(unit);
    }
  
    // When you create a unit you also have to pass them a reference to the event manager, so they know how to communicate events.
    createUnit(classs, race, level, name) { 

        // Check if a valid "level" is chosen;
        if (level < player_level.MIN || level > player_level.MAX)
            level = player_level.DEFAULT;
        else
            level = level;

        switch (classs) {
            case class_e.PRIEST:
                return new Priest.Priest(race, level, name, this.events);
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
            MAINSTATE.player.gain_resource(1600);
        }

        function bossSpike() {
            var massiveBlow = game.rnd.between(330000, 340900);
           
            tank.recive_damage({ amount: massiveBlow });
            offTank.recive_damage({ amount: massiveBlow / 2 });

        }
        function bossSwing() {
            var bossSwing = game.rnd.between(70000, 90900);
            var bossSwingCriticalHit = Math.random();

            // 20% chance to critt. Experimental.
            if (bossSwingCriticalHit < 0.85)
                bossSwing *= 1.5;
            tank.recive_damage({ amount: bossSwing });
            offTank.recive_damage({ amount: bossSwing / 2 });

        }

        function bossAoEDamage() {
            for (var i = 0; i < this.players.length-1; i++) {
                var player = this.players[i]
                player.recive_damage({ amount: 170000 });
            }
        }

        function raidDamage() {
            var i = game.rnd.between(0, this.players.length - 1);
            for (; i < this.players.length; i++) {
                var player = this.players[i];
                player.recive_damage({ amount: game.rnd.between(85555, 168900) })
            }
        }

        function singelTargetDamage() {
            var random = game.rnd.between(2, this.players.length-1);
            this.players[random].recive_damage({ amount: game.rnd.between(100000, 150000) });
        }

        function bossEncounterAdds() {
        }
 
        function raidHealing() {

            for (var i = 0; i < this.players.length; i++) {
                var player = this.players[i];
                var incomingHeal = player.getCurrentHealth() + game.rnd.between(80000, 120000);
                var criticalHeal = Math.random();

                // 20% chance to critt. Experimental.
                if (criticalHeal < 0.8)
                    incomingHeal *= 1.5;
                
                player.setHealth(incomingHeal);
            }
        }

        function applyAbsorb() {
            //this.player.setAbsorb(game.rnd.between(115, 88900));
            tank.setHealth(tank.getCurrentHealth() + game.rnd.between(10000, 38900));
        }

        // Legge inn AI shields på raidmembers.
    }
}