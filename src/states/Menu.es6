export default class MainMenu  {
    // Show HTML form on screen. 
    // - Options to select player, difficulty,--
    // Validate/Process form input

    create() {
        this.add.image(0, 0, "MenuScreenBackground");
        this.add.image(0, 0, "MenuScreenText").blendMode = PIXI.blendModes.ADD;
        //this.printAddonList();
    }

    printAddonList() {
        var addonList = game.addons.getListOfAddons();
        var lineHeight = 15;
        var headerText = this.add.bitmapText(0, 0, game.defaultFont, "### REGISTRED ADDONS ###", 14);
        headerText.tint = 0xFF00FF;
        for (var i = 0; i < addonList.length; i++) {
            this.add.bitmapText(0, lineHeight * i + lineHeight, game.defaultFont, "## Addon Name: " + addonList[i][0] + "  ## Enabled : " + addonList[i][1], 14);
        }
    }
    
    handleKeyBoardInput(keyCode) {
        console.log("starting main");
    // On any input, the game is started
    game.state.start("Play");
}
}