
export default class MainMenu {
    /**
     * TODO: Create menu so that the player can select Class, boss etc.
     */
    


    create() {

        // Add the concept to work from to the screen
        this.add.image(0, 0, "MenuScreenConcept");
        this.printAddonList();

        // Storage for menu selections
        this.selections = {
            boss: 0,
            class: 0,
            difficulty: 0
        }

        // Setup play button - just doing it in a straightforward way for now.
        let playbutton = this.add.sprite(500,500, "play_button");
        playbutton.alpha = 0.6;
        playbutton.inputEnabled = true;
        playbutton.events.onInputOver.add(()=>{playbutton.alpha = 1;});
        playbutton.events.onInputOut.add(()=>{playbutton.alpha = 0.6;});
        playbutton.events.onInputDown.add(this.startGame,this);

        // Setup selection buttons
        // - Buttons have values associated with them, F.ex a boss id. 1,2,3 etc..
        // - Onclick handlers changes the selections object data.
        // - 3 states - focus/mouseover - activated 
        // - Only 1 activated button possible per button group.
        
        // Setup featured frames
        // - Updates when a relevant selections have been made (boss or class)
        

        
    }

   

     startGame(keyCode) {

        // Validate selections?
        // Start game state passing the selected data
        this.game.state.start("Play");
    }
        



     printAddonList() {
        let addonList = this.game.addons.getListOfAddons();
        let lineHeight = 15;
        let headerText = this.game.add.bitmapText(0, 0, "myriad", "### REGISTRED ADDONS ###", 14).tint = 0xFF00FF;
        for (let i = 0; i < addonList.length; i++) {
            this.add.bitmapText(0, lineHeight * i + lineHeight, "myriad", "## Addon Name: " + addonList[i][0] + "  ## Enabled : " + addonList[i][1], 14);
        }
    }

   



}
