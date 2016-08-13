import Frame from "./frame";

/**
 * A status icon is a square box with a clock overlay.
 * Similarly to the statusbar its supposed to represent the duration or change of some value.
 */
export default class StatusIcon extends Frame {

  constructor(parent, spellid,  _events ) {
    super(parent);
    this.spellid = spellid;
    // Value used to draw the clock overlay. Its an object since it needs to be passed as a reference to the main game loop.
    this.cooldownOverlayAngle = {
      value: -90
    };

    // Start and end angles for the clock overlay.
    this.startAngle = -90;
    this.endAngle = 270;

    // Spell icon
    this.icon = null;

    // Alpha mask for cooldown overlay
    let mask = new Phaser.Graphics(game, 0, 0);
    mask.beginFill(0xFFFFFF);
    mask.drawRect(0, 0, 50, 50);
    mask.endFill();

    // Cooldown overlay arc init
    this.cd_overlay = new Phaser.Graphics(game, 0, 0);
    this.cd_overlay.alpha = 0.8;
    this.cd_overlay.blendMode = PIXI.blendModes.MULTIPLY;
    this.cd_overlay.mask = mask;

    // adding displayObjects to the parent container
    this.addChild(mask);
    this.addChild(this.spellIcon);
    this.addChild(this.cd_overlay);



    // listen to cooldown start event

  }

  // Public

  start(duration) {
    _onDurationStart(duration);
  }

  end() {
      _onDurationEnded();
  }

  _onDurationStart(duration) {
    // Prep
    this.cooldownOverlayAngle.value = this.startAngle;
    this.cd_overlay.visible = true;

    // This tween updates the cooldownOverlayAngle variable that the cooldown arc is drawn from.
    this.animationTimer = game.add.tween(this.cooldownOverlayAngle).to({
      value: this.endAngle;
    }, duration, undefined, true);

    // Hook the update cooldown arc to the main loop
    this._events.GAME_LOOP_UPDATE.add(() => this._updateCooldownArc());

  }

  _onDurationEnded() {

    //this.hook.remove();
    // #TODO## Remove hook from game loop
    this.cd_overlay.visible = false;
    this.animationTimer.stop();
    this.cd_overlay.clear();

  }

  _updateCooldownArc() {

    this.cd_overlay.clear();
    this.cd_overlay.beginFill(0x323232);
    this.cd_overlay.arc(25, 25, 50, Phaser.Math.degToRad(270), Phaser.Math.degToRad(
      this.cooldownOverlayAngle.value), true);
    this.cd_overlay.endFill();
    // clear
    // redraw based on new values
  }

}
