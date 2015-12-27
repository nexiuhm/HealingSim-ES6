// Can't use that yet! spell not ready yet ! 
/*

class UIErrorsFrame extends Frame {

    error_text: any;

    constructor(h, w, x, y, player, UIParent: Phaser.Group) {
        super(h, w, x, y, UIParent);

        this.error_text = new Phaser.BitmapText(game, 1, 1, game.defaultFont, 'hm', 14);

        this.error_text.tint = 0xCC0000;
        this.error_text.height = 14;

        this.add(this.error_text);
       
        // Listen for error event
        game.UI_ERROR_MESSAGE.add((text) => this.CREATE_ERROR_MESSAGE(text));

    }

    CREATE_ERROR_MESSAGE(text) {
        this.error_text.setText(text);
        console.log(this.error_text.width);
        console.log(this.error_text.height);
    }
}
*/