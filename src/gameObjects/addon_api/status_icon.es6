/* ## TODO ## fix fix */
export default class StatusIcon {



    constructor(state, spellid, x, y) {

        this.playState = state;
        this.spellid = spellid;

        this.container = this.playState.add.group();
        this.container.x = x;
        this.container.y = y;
        this.w = 50;
        this.h = 50;

        this.angle = {
            current: 0
        };

        // Spell icon
        var spellIcon = this.playState.add.image(0, 0, "icon_" + spellid);
        spellIcon.width = this.w;
        spellIcon.height = this.h;

        // Alpha mask for cooldown overlay
        var mask = this.playState.add.graphics(this.container.x, this.container.y);
        mask.beginFill(0xFFFFFF);
        mask.drawRect(0, 0, this.w, this.h);

        // Cooldown overlay arc init
        this.cd_overlay = this.playState.add.graphics(0, 0);
        this.cd_overlay.alpha = 0.8;
        this.cd_overlay.mask = mask;
        this.cd_overlay.blendMode = PIXI.blendModes.MULTIPLY;

        // adding displayObjects to the parent container
        this.container.add(spellIcon);
        this.container.add(this.cd_overlay);

        // listen to cooldown start event
        this.playState.events.ON_COOLDOWN_START.add((e) => this._onCooldownStart(e));
        this.playState.events.ON_COOLDOWN_ENDED.add((e) => this._onCooldownEnded(e));
    }

    _onCooldownStart(event) {

        // The event is fired every time a spell cooldown starts, so we need to check if its the correct spell.
        if (event.spellid != this.spellid)
            return;
        // Create a timer that updates a variable locally.
        this.cd_overlay.alpha = 0.8;
        this.animTween = game.add.tween(this.angle).to({
            current: 270
        }, event.cooldownLenght, undefined, true);
        // Hook the update cooldown arc to the main loop
        this.playState.events.GAME_LOOP_UPDATE.add(() => this._updateCooldownArc());

    }

    _onCooldownEnded(event) {
        if (event.spellid != this.spellid)
            return;
        //this.hook.remove();
        // #TODO## Remove hook from game loop
        this.cd_overlay.alpha = 0;
        this.animTween.stop();
        this.angle.current = 0;
        this.cd_overlay.clear();

    }

    _updateCooldownArc() {

        this.cd_overlay.clear();
        this.cd_overlay.beginFill(0x323232);
        this.cd_overlay.arc(25, 25, 50, Phaser.Math.degToRad(270), Phaser.Math.degToRad(this.angle.current), true);
        this.cd_overlay.endFill();
        // clear
        // redraw based on new values
    }

}
