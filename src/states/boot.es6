import menuState from "./menu";
import playState from "./play";
import successState from "./success";
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

    // Todo, better loading. Maybe a JSON file that gets read instead of typing it all out here.
    this.game.load.video('win', './assets/win.mp4');
    this.game.load.image("MenuScreenText", "./assets/menu_state_text.png");
    this.game.load.image("MenuScreenConcept", "./assets/concept_for_menu_state.png");
    this.game.load.image("MenuScreenBackground", "./assets/textures/bg_texture.png");
    this.game.load.image("castbar_texture", "./assets/textures/BantoBar.png");
    this.game.load.image("castbar_texture2", "./assets/textures/LiteStep.png");
    this.game.load.image("ab_texture", "./assets/textures/action_bar_texture.png");
    this.game.load.image("elite", "./assets/textures/elite_texture.png");
    this.game.load.image("bg", "./assets/play_state_background.png");
    this.game.load.image("power_word_shield", "./assets/icons/spell_holy_powerwordshield.jpg");

    // Spell icons //////////////////
    this.game.load.image("power_infusion", "./assets/icons/power_infusion.jpg");
    this.game.load.image("power_word_shield","./assets/icons/spell_holy_powerwordshield.jpg");
    this.game.load.image("clarity_of_will", "./assets/icons/ability_priest_clarityofwill.jpg");
    this.game.load.image("flash_of_light", "./assets/icons/spell_holy_flashheal.jpg");
    this.game.load.image("guardian_spirit", "./assets/icons/spell_holy_guardianspirit.jpg");

    // Menu assets ///////////////////////
    this.game.load.image("icon_normal","./assets/icons/icon_normal.png");
    this.game.load.image("icon_heroic","./assets/icons/icon_heroic.png");
    this.game.load.image("icon_priest","./assets/icons/icon_priest.png");
    this.game.load.image("icon_placeholder","./assets/icons/icon_placeholder.png");
    this.game.load.image("play_button", "./assets/play_button.png");
    this.game.load.image("menu_bg","./assets/textures/menu_bg.png");
    this.game.load.audio("menu_select_sound", "./assets/sounds/menu_selection_sound.mp3");
    this.game.load.audio("enter_world", "./assets/sounds/enter_world.mp3");
    this.game.load.image("game_logo", "./assets/icons/temp_gamelogo.png");
    this.game.load.image("temp_featured", "./assets/icons/temp_featured.png");
    this.game.load.image("heal_particle", "./assets/textures/heal_particle.png");

    // Fonts ///////////////////////////
    this.game.load.bitmapFont("myriad", "./assets/fonts/font.png", "./assets/fonts/font.xml");
  }

  onWindowResize(data) {
    this.game.canvas.height = window.innerHeight;
    this.game.canvas.width = window.innerWidth;
  }

  create() {

    game.add.plugin(Fabrique.Plugins.InputField);

    // Set scalemode for the this.game.
    this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    this.game.scale.onSizeChange.add((data) => this.onWindowResize(data));

    // Phaser config
    //this.game.time.advancedTiming = true; // REMOVE WHEN DONE - takes some cpu
    this.game.tweens.frameBased = false;
    // Register games-states
    this.game.state.add("MainMenu", menuState);
    this.game.state.add("Play", playState);
    this.game.state.add("Success", successState);

    // Register addons to the game // TODO: Read a json file in the addon directory which describes the addons instead of adding them manually.
    game.addons.add("Cast Bar 0.1", castFrame);
    game.addons.add("Raid Frames 0.1", raidFrames);
    game.addons.add("Unit Frames 0.1", unitFrames);
    //game.addons.add("Debug", debugAddon);
    game.addons.add("BossTimers", bossTimers);
    game.addons.add("Action Bar", actionBar);

    // Setup the keyboard for the this.game.
    this.game.input.keyboard.addCallbacks(this.game, undefined, undefined,
      this.game.sendKeyBoardInputToCurrentState);

    // Start the post-boot state
    this.game.state.start("MainMenu"); // Go directly to playstate when developing
  }
}
