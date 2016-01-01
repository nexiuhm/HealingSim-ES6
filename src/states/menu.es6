export default class MainMenu {
    /**
     * TODO: Create menu so that the player can select Class, boss etc.
     */

    create() {
        this.add.image(0, 0, "MenuScreenBackground");
        this.add.image(0, 0, "MenuScreenText").blendMode = PIXI.blendModes.ADD;
        this.printAddonList();
    }

    printAddonList() {
        var addonList = this.game.addons.getListOfAddons();
        var lineHeight = 15;
        var headerText = this.game.add.bitmapText(0, 0, "myriad", "### REGISTRED ADDONS ###", 14);
        headerText.tint = 0xFF00FF;
        for (var i = 0; i < addonList.length; i++) {
            this.add.bitmapText(0, lineHeight * i + lineHeight, "myriad", "## Addon Name: " + addonList[i][0] + "  ## Enabled : " + addonList[i][1], 14);
        }
    }

    handleKeyBoardInput(keyCode) {
        // On any input, the game is started
        this.game.state.start("Play");
    }
}
