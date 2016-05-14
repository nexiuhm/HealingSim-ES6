
export default class MainMenu {
    /**
     * TODO: Create menu so that the player can select Class, boss etc.
     */
    


    create() {

        // Add the concept to work from to the screen
        this.add.image(0, 0, "MenuScreenConcept");


        // Soundfx
        let menu_select = this.add.audio("menu_select_sound");

        // Storage for menu selections. Feeding it with default values to start with
        let selections = {
            boss: 'brackenspore',
            class: 'priest',
            difficulty: 'n',
            playerName: 'Player'
        }


   

        //  #### Create selection menus ####

        createOptionPanel  ({
            

            headerText: "SELECT CLASS",

            position: {
                x: 150,
                y: 150
            },

            buttons: {

                priest: { icon: 'id', value: 'priest' },
                paladin: { icon: 'id', value: 'paladin' },
                shaman: { icon: 'id', value: 'shaman'},
                druid: {icon: 'id' , value: 'druid'}
                

            },

            
            onSelectionCallback: onClassSelected,
          

        });


         createOptionPanel ({
            

            headerText: "SELECT BOSS",

            position: {
                x: 150,
                y: 350
            },

            buttons: {

                brackenspore: { icon: 'id', value: 'priest' },
                testboss: { icon: 'id', value: 'paladin' },

            },

            
            onSelectionCallback: onBossSelected,
          

        });


           createOptionPanel ({
            

            headerText: "SELECT DIFFICULY",

            position: {
                x: 150,
                y: 550
            },

            buttons: {

                brackenspore: { icon: 'id', value: 'priest' },
                testboss: { icon: 'id', value: 'paladin' },

            },

            
            onSelectionCallback: onDifficultySelected,
          

        });



    


        // ##################################
        // ####### Name slection ############
        // ##################################

            // - Neeed to create some kind of input field. Phaser doesnt have this built in so it will take some work. Use reg-exp to validate the text input ? Current game font only supports a-Z & 0-9

        //  #################################
        //  ##### Setup featured frames ##### - Updates when a relevant selections have been made (boss or class)
        //  #################################

            // Todo!

        // ##################################
        // ########## Play button ########### - Just doing it in a straightforward way for now.
        // ##################################

        let playbutton = this.add.sprite(500,500, "play_button");
        playbutton.alpha = 0.6;
        playbutton.inputEnabled = true;
        playbutton.events.onInputOver.add(()=>{playbutton.alpha = 1;});
        playbutton.events.onInputOut.add(()=>{playbutton.alpha = 0.6;});
        playbutton.events.onInputDown.add(onPlayButtonPressed,this);

        // ##################################
        // ########### Callbacks ############
        // ##################################

        function onClassSelected (selectedValue) {
            selections.class = selectedValue;
            console.log("-- UPDATED FEAUTRED CLASS FRAME --");
            menu_select.play();

        }

        function onBossSelected() {
            // Update selection data object
            // Update featured-boss frame
            console.log("-- UPDATED FEAUTRED BOSS FRAME --");

        }

        function onDifficultySelected() {
            // Update selection data object
        }

        function onPlayButtonPressed() {

            // Start play state and pass it the menu selection data.
            this.game.state.start("Play", undefined, undefined, selections);
        }




        // ##################################
        // ##### Helper functions below #####
        // ##################################

        function createFeaturedBox(configObject) {

        }

        function createInputField(configObject) {

        }

        function createOptionPanel(configObject) {

            // Check if the config object has at least some of the important stuff in it
            if(!configObject.buttons || !configObject.onSelectionCallback) return console.log("Missing required configuration data");
    


            let buttons = [];
            let activeButton  = null;


            let anchors = {
                headerText : {x: configObject.position.x, y: configObject.position.y},
                buttons : {x: configObject.position.x , y: configObject.position.y}
            }

            let sizes = {
                button: {w: 50, h: 50},
                headerText:  {height: 50}
            }





            if(configObject.headerText) {

                // Todo: Style the header text with fonts & color etc
                let headerText = game.add.text(anchors.headerText.x, anchors.headerText.y, configObject.headerText, {fill: 'lightgray'});
                
                // When there is a headertext the button anchor are moved below
                anchors.buttons.y += sizes.headerText.height + 10;

            }


            // Create sprites that will act as buttons
            for(let button in configObject.buttons) {

               let currentButton = configObject.buttons[button];

               let displayObject = game.add.sprite(100, anchors.button, "icon_5");
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
                button.alpha = 0.5;

                // Needed for the sprite to accept input events
                button.inputEnabled = true;

                button.events.onInputOver.add(()=>{button.alpha = 1;});

                button.events.onInputOut.add( () => {
                    
                        // Dont fade the active/selected button on mouse out
                        if(!(button === activeButton)) button.alpha = 0.6;

                });

                button.events.onInputDown.add( () => {


                        // Return of its the same button beeing actived twice because bæsj
                        if(activeButton === button) return;

                        // Fade the previous active button
                        if(activeButton) activeButton.alpha = 0.6;


                        console.log(configObject.dataWriteTarget);
                        console.log(selections);
                        // Set active button to the button just pressed.
                        activeButton = button;

                        // Invoke the onSelectCallback if any. Call it with "this" set to undefined to avoid potential bullshit errors
                        configObject.onSelectionCallback.call(undefined, button.value);


                });
            }




       }




    }



}
