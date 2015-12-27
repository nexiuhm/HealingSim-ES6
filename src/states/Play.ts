
var MAINSTATE; // ## Temporary ##
namespace States {
    export class Play extends Phaser.State {

        player: Player;
        events = new EventManager(); //### TODO ###
        raid = new Raid(this.events); // ### TODO ###
        UIParent ;

        create() {
            MAINSTATE = this; // ## Temporary ##
            // Start the world fade-in effect
            this.world.alpha = 0;
            this.add.tween(this.world).to({ alpha: 1 }, 4000, Phaser.Easing.Cubic.InOut, true);
            // Add a background to the screen
            game.add.image(game.stage.x, game.stage.y, "bg");

            // Add Ui parent container
            this.UIParent = this.add.group(this.world);
            
            // Set raid size
            this.raid.setRaidSize(raid_size.TWENTYFIVEMAN);
            
            // Init player. ## TODO ##: Use data from selection screen. See Phaser documentation for sending args between states?
            this.player = this.raid.createUnit(class_e.PRIEST, race_e.RACE_BLOOD_ELF, 100, "Player");
            this.raid.generateTestPlayers();
            this.raid.addPlayer(this.player);

            // Load enabled addons
            game.addons.loadEnabledAddons();

            // Start the boss/healing simulator
            this.raid.startTestDamage();

            // TEST 
            var test =  new StatusIcon(this, 5, 500, 500);
            var test2 = new StatusIcon(this, 2, 555, 500);
        }

        update() {
            this.events.GAME_LOOP_UPDATE.dispatch();
        };

        handleKeyBoardInput(key) {
            // ## TODO ## : Find a better way to deal with this, maybe just send the input to the addons, and let the addons/ui decide what to do with it.

            var keybindings = data.getKeyBindings();
            for (var binding in keybindings) {
                var keybinding = keybindings[binding];
                if (keybinding.key == key) {
                    if (keybinding.spell)
                        this.player.cast_spell(keybinding.spell);
                    break;
                }
            }
        }


        render() {
            this.events.GAME_LOOP_RENDER.dispatch();
        }
    }
}