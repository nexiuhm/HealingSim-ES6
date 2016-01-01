export default class Frame extends Phaser.Graphics {

    constructor(parent) {
        super(game);
        parent.addChild(this);
        this._width = 200;
        this._height = 100;
    }

    setSize(width, height) {
        this._width = width;
        this._height = height;
    };

    setPos(x, y) {
        this.x = x;
        this.y = y;
    };

}
