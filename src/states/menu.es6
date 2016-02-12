
export default class MainMenu {
    /**
     * TODO: Create menu so that the player can select Class, boss etc.
     */

    create() {
        this.add.image(0, 0, "MenuScreenConcept");
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

    handleKeyBoardInput(keyCode) {
        // On any input, the game is started
        this.game.state.start("Play");
    }
}
