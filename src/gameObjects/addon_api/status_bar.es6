import Frame from "./frame";

export default class StatusBar extends Frame {



    constructor(parent, width, height) {

        super(parent);
        this.setPos(0, 0);
        this.setSize(width, height);

        // defaults. How fast the bar should react to change in values.
        this._animationStyle = "Linear";
        this._animationDuration = 200;

        // The values for the bar. Default is full bar.
        this._minValue = 0;
        this._maxValue = 1;
        this._currentValue = 1;

        // Init bar
        this._bar = new Phaser.Graphics(game, 0, 0);
        this._bar.beginFill(0xFFFFFF);
        this._bar.drawRect(0, 0, this._width, this._height);
        this._bar.endFill();

        // Works as both a texture and a background
        this._texture = new Phaser.Sprite(game, 0, 0, "castbar_texture");
        this._texture.width = this._width;
        this._texture.height = this._height;
        this._texture.blendMode = PIXI.blendModes.MULTIPLY;

        // Add children to parent frame
        this.addChild(this._bar);
        this.addChild(this._texture);

        this._updateBarWidth();

    };

    /**
     * [_updateBarWidth description]
     * @return {[type]} [description]
     * @private
     */
    _updateBarWidth() {
        var barWidthInPixels = Math.round((this._currentValue / this._maxValue) * this._width);
        if (barWidthInPixels <= 0) // something bad happens if it goes to 0
            barWidthInPixels = 1;

        if (!this._animationDuration)
            this._bar.width = barWidthInPixels;
        else
            game.add.tween(this._bar).to({
                width: barWidthInPixels
            }, this._animationDuration, this._animationStyle, true);
    }

    /* Public interface below */

    setColor(color) {
        this._bar.tint = color;

    }

    setValues(min, max, current) {
        this._maxValue = max;
        this._minValue = min;
        this._currentValue = current;
        this._updateBarWidth();
    }

    setTexture() {
        // 
    }

    setMaxValue(newMaxValue) {
        this._maxValue = newMaxValue;
        this._updateBarWidth();
    }

    setValue(newValue, duration) {
        if (newValue <= this._minValue)
            this._currentValue = this._minValue;
        else if (newValue > this._maxValue)
            this._currentValue = this._maxValue;
        else
            this._currentValue = newValue;
        if (duration)
            this._animationDuration = duration;
        else if (duration === 0)
            this._animationDuration = duration;

        this._updateBarWidth();

    }
}