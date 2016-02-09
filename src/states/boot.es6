import menuState from "./menu";
import playState from "./play";

/**
 * TODO: Import addons dynamically. This can't be done with the import statement since its only used for static analysis. Check out System.Import()
 * Low priority
 */
import castFrame from "../addons/castbar";
import raidFrames from "../addons/raid_frame";
import debugAddon from "../addons/debug";
import bossTimers from "../addons/timers";
import unitFrames from "../addons/unit_frames";
import actionBar from "../addons/action_bar_addon";

/**
 * We use the Boot state to configure Phaser and load assets
 */

export default class Boot {

  preload() {
    this.game.load.video('win', './assets/video/win.mp4');
    this.game.load.image("MenuScreenText", "./assets/menu_state_text.png");
    this.game.load.image("MenuScreenBackground",
      "./assets/textures/bg_texture.png");
    this.game.load.image("castbar_texture", "./assets/textures/BantoBar.png");
    this.game.load.image("castbar_texture2", "./assets/textures/LiteStep.png");
    this.game.load.image("ab_texture",
      "./assets/textures/action_bar_texture.png");
    this.game.load.image("elite", "./assets/textures/elite_texture.png");
    this.game.load.image("bg", "./assets/play_state_background.png");
    this.game.load.image("icon_5",
      "./assets/icons/spell_holy_powerwordshield.jpg");
    this.game.load.image("icon_2", "./assets/icons/power_infusion.jpg");
    this.game.load.bitmapFont("myriad", "./assets/fonts/font.png",
      "./assets/fonts/font.xml");
  }

  onWindowResize(data) {
    this.game.canvas.height = window.innerHeight;
    this.game.canvas.width = window.innerWidth;
  }

  create() {

    let isThisDev = false;

    // Set scalemode for the this.game.
    this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    this.game.scale.onSizeChange.add((data) => this.onWindowResize(data));

    // Phaser config
    this.game.time.advancedTiming = true;
    this.game.tweens.frameBased = true;

    // Register games-states
    this.game.state.add("MainMenu", menuState);
    this.game.state.add("Play", playState);

    // Register addons to the game // TODO: Read a json file in the addon directory which describes the addons instead of adding them manually.
    game.addons.add("Cast Bar 0.1", castFrame);
    game.addons.add("Raid Frames 0.1", raidFrames);
    game.addons.add("Unit Frames 0.1", unitFrames);
    game.addons.add("Debug", debugAddon);
    game.addons.add("BossTimers", bossTimers);
    game.addons.add("Action Bar", actionBar);

    // Setup the keyboard for the this.game.
    this.game.input.keyboard.addCallbacks(this.game, undefined, undefined,
      this.game.sendKeyBoardInputToCurrentState);

    // Start the post-boot state
    this.game.state.start(isThisDev ? "Play" : "MainMenu"); // Go directly to playstate when developing
  }
}
