export default class MainMenu {
    /**
     * TODO: Create menu so that the player can select Class, boss etc.
     */
    create() {

        let bg = this.add.image(0, 0, "menu_bg");
        bg.height = window.innerHeight;
        bg.width = window.innerWidth;
        this.add.image(150,50, "game_logo");
        // Some visual effect
        addEmitter();

        // Sound objects
        let sound = {
            optionSelected: this.add.audio("menu_select_sound"),
            enterWorld: this.add.audio("enter_world")
        };

        // Storage for menu selections. Feeding it with default values to start with
        let selections = {
            boss: 'brackenspore',
            class: 'priest',
            difficulty: 'n',
            playerName: 'Player'
        };

        //  #### Create selection menus ####

        createOptionPanel ({
            headerText: "SELECT CLASS",
            position: {
                x: 150,
                y: 250
            },
            buttons: {
                priest: { icon: 'icon_placeholder', value: 'priest' },
                paladin: { icon: 'icon_placeholder', value: 'paladin' },
                shaman: { icon: 'icon_placeholder', value: 'shaman'},
                druid: {icon: 'icon_placeholder' , value: 'druid'}
            },
            onSelectionCallback: function onClassSelected(selectedValue) {
                selections.class = selectedValue;
                this.game.debug.text("#### DEBUG - SELECTED CLASS =  " + selectedValue, 600, 600, '#00FF96');
                // Emitt class selected event subscriped to by the featured frame?
                sound.optionSelected.play();
            },
            callbackContext: this // State should be 'this'
        });
        createOptionPanel ({
            headerText: "SELECT BOSS",
            position: {
                x: 150,
                y: 450
            },
            buttons: {
                brackenspore: { icon: 'icon_placeholder', value: 'brackenspore' },
                testboss: { icon: 'icon_placeholder', value: 'testboss' },
            },

            onSelectionCallback: function onBossSelected(selectedValue) {
                // Update featured-boss frame
                selections.boss = selectedValue;
                game.debug.text("#### SELECTED BOSS ##########  " + selectedValue, 600, 600, '#00FF96');
                sound.optionSelected.play();
            },
            callbackContext: this
        });

        createOptionPanel ({
            headerText: "SELECT DIFFICULY",
            position: {
                x: 150,
                y: 650
            },
            buttons: {
                normal: { icon: 'icon_normal', value: 'normal' },
                heroic: { icon: 'icon_heroic', value: 'heroic' },
                mythic: { icon: 'icon_placeholder', value: 'mythic'}
            },
            onSelectionCallback: function onDifficultySelected(selectedValue) {
                // Update selection data object
                selections.difficulty = selectedValue;
                game.debug.text("#### SELECTED DIFFICULY ##########  " + selectedValue, 600, 600, '#00FF96');
                sound.optionSelected.play();
            },
            callbackContext: this
        });

        // ##################################
        // ####### Name slection ############
        // ##################################

         game.add.text(150,850, "SELECT NAME", {fill: 'lightgray'});

         let nameInputField = game.add.inputField(150, 910, {
            font: '17px Arial',
            fill: '#FFFFFF',
            fontWeight: 'bold',
            width: 250,
            height: 25,
            padding: 10,
            fillAlpha: 0.3,
            borderWidth: 2,
            borderColor: '#90EE90',
            borderRadius: 7,
            placeHolder: 'Player',
            backgroundColor: "#000000",
            type: Fabrique.InputType.text

         });

        //  #################################
        //  ##### Setup featured frames ##### - Updates when a relevant selections have been made (boss or class)
        //  #################################

        // Todo!
        // adding concept as placeholder for now
        game.add.image(game.world.centerX + 150,250, "temp_featured");

        // ##################################
        // ########## Play button ########### - Just doing it in a straightforward way for now.
        // ##################################

        { // Anon namespace

            let playbutton = this.add.sprite(window.innerWidth - 500, window.innerHeight-300, "play_button");
            playbutton.alpha = 0.6;
            playbutton.inputEnabled = true;
            playbutton.events.onInputOver.add(()=>{playbutton.alpha = 1;});
            playbutton.events.onInputOut.add(()=>{playbutton.alpha = 0.6;});
            playbutton.events.onInputDown.add( onPlayButtonPressed, this);

            function onPlayButtonPressed() {
                // Start play state and pass it the menu selection data.
                sound.enterWorld.play();
                selections.playerName = nameInputField.value || selections.playerName;
                this.game.state.start("Play", undefined, undefined, selections);
            }
        }

        // ##################################
        // ##### Helper functions below #####
        // ##################################

        function createFeaturedBox(configObject) {
            // Todo
        }

        function createOptionPanel(configObject) {

            // Check if the config object has at least some of the important stuff in it
            if(!configObject.buttons || !configObject.onSelectionCallback)
              return console.log("Missing required data");

            let buttons = [];
            let activeButton  = null;
            let anchors = {
                headerText : { x: configObject.position.x, y: configObject.position.y },
                buttons : { x: configObject.position.x , y: configObject.position.y }
            };

            let sizes = {
                button: {w: 50, h: 50},
                headerText:  {height: 50}
            };

            if(configObject.headerText) {

                // Todo: Style the header text with fonts & color etc
                let headerText = game.add.text(anchors.headerText.x, anchors.headerText.y, configObject.headerText, {fill: 'lightgray'});

                // When there is a headertext the button anchor are moved below
                anchors.buttons.y += sizes.headerText.height + 10;
            }

            // Create sprites that will act as buttons
            for(let button in configObject.buttons) {
               let currentButton = configObject.buttons[button];
               let displayObject = game.add.sprite(100, anchors.button, currentButton.icon);

               displayObject.height = 50;
               displayObject.width = 50;
                // Add some additonal data to the sprite object ( make sure to not colliide names with anything already exsiting on the sprite object or ebola will happen!)
               displayObject.value = currentButton.value;
               // Remember to set icon to correct class (todo)
               buttons.push(displayObject);
            }

            // Position and set-up buttons
            for(let i = 0; i < buttons.length; i++) {

                let button = buttons[i];
                button.x = anchors.buttons.x + i * 70;
                button.y = anchors.buttons.y;
                button.alpha = 0.7;
                 button.blendMode = Phaser.blendModes.SCREEN;
                // Needed for the sprite to accept input events
                button.inputEnabled = true;
                button.events.onInputOver.add(()=>{button.alpha = 1;});
                button.events.onInputOut.add( () => {
                        // Dont fade the active/selected button on mouse out
                        if(!(button === activeButton)) button.alpha = 0.7;
                });
                button.events.onInputDown.add( () => {
                    // Return of its the same button beeing actived twice because bæsj
                    if(activeButton === button) return;

                    // Fade the previous active button
                    if(activeButton) activeButton.alpha = 0.7;

                    // Set active button to the button just pressed.
                    activeButton = button;

                    // Invoke the onSelectCallback if any. Call it with "this" set to undefined to avoid potential bullshit errors
                    configObject.onSelectionCallback.call(configObject.callbackContext, button.value);
                });
            }
       }

       // ##################################
       // ##### Visual effects #####
       // ##################################

       function addEmitter(){
            var emitter = game.add.emitter(game.world.centerX, 100, 700);

            emitter.width = 300;
            emitter.angle = 30;
            emitter.blendMode = Phaser.blendModes.ADD;
            emitter.makeParticles(["icon_5", "icon_2"]);
            emitter.minParticleAlpha = 0.1;
            emitter.maxParticleAlpha = 0.5;
            emitter.minParticleScale = 0.1;
            emitter.maxParticleScale = 0.6;
            emitter.setYSpeed(3, 5);
            emitter.setXSpeed(-5, 5);
            emitter.minRotation = 0;
            emitter.maxRotation = 0;
            emitter.gravity = 5;
            emitter.start(false, 18600, 900, 0);
       }
    }
}
