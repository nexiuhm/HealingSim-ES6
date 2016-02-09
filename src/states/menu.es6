export default class MainMenu {
    /**
     * TODO: Create menu so that the player can select Class, boss etc.
     */

    create() {

        var backgroundShader = [

            "precision mediump float;",

            "uniform vec2      resolution;",
            "uniform float     time;",

            "#define PI 20",

            "void main( void ) {",

            "vec2 p = ( gl_FragCoord.xy / resolution.xy ) - 0.5;",

            "float sx = 0.1 * (p.x + 0.8) * sin( 10.0 * p.x - 1. * pow(time, 0.5)*5.);",

            "float dy = 4./ ( 500.0 * abs(p.y - sx));",

            "dy += 1./ (19. * length(p - vec2(p.x, 0.)));",

            "gl_FragColor = vec4( (p.x + 0.5) * dy, 0.3 * dy, dy, 1.1 );",

            "}"
        ];

        this.testFilter = new Phaser.Filter(game, null, backgroundShader);
        this.testFilter.addToWorld(0, 0, window.innerWidth, window.innerHeight);


        this.add.image(0, 100, "MenuScreenText").blendMode = PIXI.blendModes.ADD;
        this.printAddonList();
    }

    printAddonList() {
        let addonList = this.game.addons.getListOfAddons();
        let lineHeight = 15;
        let headerText = this.game.add.bitmapText(0, 0, "myriad", "### REGISTRED ADDONS ###", 14);
        headerText.tint = 0xFF00FF;
        for (let i = 0; i < addonList.length; i++) {
            this.add.bitmapText(0, lineHeight * i + lineHeight, "myriad", "## Addon Name: " + addonList[i][0] + "  ## Enabled : " + addonList[i][1], 14);
        }
    }

    update() {
        this.testFilter.update();
    }

    handleKeyBoardInput(keyCode) {
        // On any input, the game is started
        this.game.state.start("Play");
    }
}
