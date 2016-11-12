import Raid from "../gameObjects/raid";
import * as e from "../enums";
import * as data from "../gameObjects/data";

export default class Play {

  init(config) {
    // Save the options set in the menu.
    this.config = config;

    // Set-up the signals used to trigger changes in the user interface etc.
    this.initSignals();

    // Create game world ( TODO rename )
    this.raid = new Raid(this);

    // Create NPC's for the group
    this.raid.setRaidSize(e.raid_size.TENMAN);
    this.raid.generateTestPlayers();

    // Add the playable unit to the game world
    this.player = this.raid.createUnit(e.class_e.PRIEST, e.race_e.RACE_BLOOD_ELF, 100, this.config.playerName);
    this.raid.addPlayer(this.player);

  }

  create() {
    /*
      1. Sett opp backendverden(rename raid), som håndtere alle objekter i spillet
      2. Gi encounter(boss), raid, player til backendverden
      3. Rendre frontend av backendverden(Legge opp til signalhåndtering)
      4. Trigge enounter for å starte spillet med countdown(dbmpull)
      5. Frontend kjenner kun til events som emitta(Phaser.signal)
      6. Når boss er død, trigger success etter 10 sek og finish sound(UI for at
         du vant før success state)

      SIDE-NOTE: Spells eneste måten å interacte mellom unit objekter
    */
    // Start the world fade-in effect
    this.world.alpha = 0;
    this.add.tween(this.world).to({
      alpha: 1
    }, 4000, Phaser.Easing.Cubic.InOut, true);

    // Add a background
    this.game.add.image(this.game.stage.x, this.game.stage.y, "bg");

    // Add Ui parent container, all addon/modules use this a parent container. TODO Probably not needed ? (world can be the parent)
    this.UIParent = this.add.group(this.world);

    // Load enabled addons. TODO possible rename to modules for clarity ?
    this.game.addons.loadEnabledAddons(this);

    // Start the boss/healing simulator.
    this.raid.startTestDamage();
  }



  initSignals() {
     this.events = {
       GAME_LOOP_UPDATE: new Phaser.Signal(),
       TARGET_CHANGE_EVENT: new Phaser.Signal(),
       UNIT_HEALTH_CHANGE: new Phaser.Signal(),
       UNIT_ABSORB: new Phaser.Signal(),
       UNIT_STARTS_SPELLCAST: new Phaser.Signal(),
       UNIT_FINISH_SPELLCAST: new Phaser.Signal(),
       UNIT_CANCEL_SPELLCAST: new Phaser.Signal(),
       UI_ERROR_MESSAGE: new Phaser.Signal(),
       UNIT_DEATH: new Phaser.Signal(),
       GAME_LOOP_RENDER: new Phaser.Signal(),
       ON_COOLDOWN_START: new Phaser.Signal(),
       ON_COOLDOWN_ENDED: new Phaser.Signal(),
       MANA_CHANGE: new Phaser.Signal(),
       AURA_APPLIED: new Phaser.Signal(),
       AURA_REMOVED:new Phaser.Signal()
     };

     Object.freeze(this.events);
  }

  handleKeyBoardInput(key) {
    // ## TODO ## : Find a better way to deal with this, maybe just send the input to the addons, and let the addons/ui decide what to do with it.

    let keybindings = data.getKeyBindings();
    for (let binding in keybindings) {
      let keybinding = keybindings[binding];
      if (keybinding.key == key) {
        if (keybinding.spell)
          this.player.cast(keybinding.spell);
        break;
      }
    }
  }

  update() {
    this.events.GAME_LOOP_UPDATE.dispatch();
  }

  render() {
    this.events.GAME_LOOP_RENDER.dispatch();
  }
}
