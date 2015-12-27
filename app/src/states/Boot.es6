/* The Boot state configures the Phaser this.game engine and loads assets */
import mainMenu from "./Menu"
export default class Boot {
	// Load assets
    preload() {
        this.game.load.image("MenuScreenText", "./assets/menu_state_text.png");
        this.game.load.image("MenuScreenBackground", "./assets/textures/bg_texture.png");
        this.game.load.image("castbar_texture", "./assets/textures/BantoBar.png");
        this.game.load.image("castbar_texture2", "./assets/textures/LiteStep.png");
        this.game.load.image("ab_texture", "./assets/textures/action_bar_texture.png");
        this.game.load.image("elite", "./assets/textures/elite_texture.png");
        this.game.load.image("bg", "./assets/play_state_background.png");
        this.game.load.image("icon_5", "./assets/icons/spell_holy_powerwordshield.jpg");
        this.game.load.image("icon_2", "./assets/icons/power_infusion.jpg");
        this.game.load.bitmapFont("myriad", "./assets/fonts/font.png", "./assets/fonts/font.xml");
    }

    onWindowResize(data) {
        this.game.canvas.height = window.innerHeight;
        this.game.canvas.width = window.innerWidth;
    }

    create() {
        console.log(this.game);
        // Set scalemode for the this.game.
        this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        this.game.scale.onSizeChange.add((data) => this.onWindowResize(data));

        // Phaser config
        this.game.time.advancedTiming = true;
        this.game.tweens.frameBased = true;

        // Register games-states
        this.game.state.add("MainMenu", mainMenu);
        //this.game.state.add("Play", States.Play);
        
        // Setup the keyboard for the this.game.
        //this.game.input.keyboard.addCallbacks(this.game, undefined, undefined, this.game.sendKeyBoardInputToCurrentState);
        // Start the post-boot state
        this.game.state.start("MainMenu");
    }

}
