

import EventManager from "../gameObjects/eventManager";
import Raid from "../gameObjects/raid";
import * as e from "../enums";
import * as data from "../gameObjects/data";
export default class Play {


    create() {
        window.MAINSTATE = this;
        _G.MAINSTATE = this; // ## Temporary: making this state accesible globally ##
        console.log(e.stat_e.AGILITY);
        // Start the world fade-in effect
        this.world.alpha = 0;
        this.add.tween(this.world).to({alpha: 1}, 4000, Phaser.Easing.Cubic.InOut, true);
       
        // Add a background
        this.game.add.image(this.game.stage.x, this.game.stage.y, "bg");

        // Add Ui parent container, all addon displayObject hooks to this.
        this.UIParent = this.add.group(this.world);

        this.events = new EventManager(); 
        this.raid = new Raid(this.events); 

        // Set raid size
        this.raid.setRaidSize(e.raid_size.TWENTYFIVEMAN);

        // Init player. ## TODO ##: Use data from selection screen. See Phaser documentation for sending args between states?
        this.player = this.raid.createUnit(e.class_e.PRIEST, e.race_e.RACE_BLOOD_ELF, 100, "Player");
        this.raid.generateTestPlayers();
        this.raid.addPlayer(this.player);

        // Load enabled addons
        this.game.addons.loadEnabledAddons(this);

        // Start the boss/healing simulator
        this.raid.startTestDamage();

        // Testing cooldown frames
        //var test = new StatusIcon(this, 5, 500, 500);
        //var test2 = new StatusIcon(this, 2, 555, 500);
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

