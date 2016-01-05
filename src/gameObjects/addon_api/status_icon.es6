import Frame from "./frame";

/**
 * A status icon is a square box with a clock overlay.
 * Similarly to the statusbar its supposed to represent the duration or change of some value.
 */
export default class StatusIcon extends Frame {



    constructor(parent, spellid, events) {
        super(parent);
        this.spellid = spellid;
        this.events = events;

        // Value used to draw the clock overlay. Its an object since it needs to be passed as a reference.
        this.cooldownOverlayAngle = {
            current: -90
        };

        // Spell icon
        this.spellIcon = new Phaser.Image(game, 0, 0, "icon_" + spellid);
        this.spellIcon.width = 50;
        this.spellIcon.height = 50;

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
        this.events.ON_COOLDOWN_START.add((e) => this._onCooldownStart(e));
        this.events.ON_COOLDOWN_ENDED.add((e) => this._onCooldownEnded(e));
    }

    _onCooldownStart(event) {

        // The event is fired every time a spell cooldown starts, so we need to check if its the correct spell.
        if (event.spellid != this.spellid)
            return;
        // Create a timer that updates a letiable locally.
        this.cd_overlay.alpha = 0.8;
        this.animTween = game.add.tween(this.cooldownOverlayAngle).to({
            current: 270
        }, event.cooldownLenght, undefined, true);
        // Hook the update cooldown arc to the main loop
        this.events.GAME_LOOP_UPDATE.add(() => this._updateCooldownArc());

    }

    _onCooldownEnded(event) {

        if (event.spellid != this.spellid)
            return;
        //this.hook.remove();
        // #TODO## Remove hook from game loop
        this.cd_overlay.alpha = 0;
        this.animTween.stop();
        this.cooldownOverlayAngle.current = -90;
        this.cd_overlay.clear();

    }

    _updateCooldownArc() {

        this.cd_overlay.clear();
        this.cd_overlay.beginFill(0x323232);
        this.cd_overlay.arc(25, 25, 50, Phaser.Math.degToRad(270), Phaser.Math.degToRad(this.cooldownOverlayAngle.current), true);
        this.cd_overlay.endFill();
        // clear
        // redraw based on new values
    }

}
