export default class MainMenu {

    create() {
        // Background
        let bg = this.add.image(0, 0, "menu_bg");
        bg.height = window.innerHeight;
        bg.width = window.innerWidth;
        this.add.image(150,50, "game_logo");

        // Some visual effect
        addEmitter();

        // Sound objects
        let soundEnabled = false;
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

        // ################################################
        // ####### EPlayer class selection panel #########
        // ################################################

        createOptionPanel ({
            headerText: "SELECT CLASS",
            position: {
                x: 150,
                y: 250
            },
            options: {
                priest: { icon: 'icon_placeholder', value: 'priest' },
                paladin: { icon: 'icon_placeholder', value: 'paladin' },
                shaman: { icon: 'icon_placeholder', value: 'shaman'},
                druid: {icon: 'icon_placeholder' , value: 'druid'}
            },
            onSelectionCallback: function onClassSelected(selectedValue) {
                selections.class = selectedValue;
                this.game.debug.text("#### DEBUG - SELECTED CLASS =  " + selectedValue, 600, 600, '#00FF96');
                // Emitt class selected event subscriped to by the featured frame?
                if(soundEnabled) {
                  sound.optionSelected.play();
                }
            },
            callbackContext: this // State should be 'this'
        });

        // ################################################
        // ####### Enemy selection panel ##################
        // ################################################

        createOptionPanel ({
            headerText: "SELECT BOSS",
            position: {
                x: 150,
                y: 450
            },
            options: {
                brackenspore: { icon: 'icon_placeholder', value: 'brackenspore' },
                testboss: { icon: 'icon_placeholder', value: 'testboss' },
            },

            onSelectionCallback: function onBossSelected(selectedValue) {
                // Update featured-boss frame
                selections.boss = selectedValue;
                game.debug.text("#### SELECTED BOSS ##########  " + selectedValue, 600, 600, '#00FF96');
                if(soundEnabled) {
                  sound.optionSelected.play();
                }
            },
            callbackContext: this
        });

        // ################################################
        // ####### Difficuilty selection panel ############
        // ################################################

        createOptionPanel ({
            headerText: "SELECT DIFFICULY",
            position: {
                x: 150,
                y: 650
            },
            options: {
                normal: { icon: 'icon_normal', value: 'normal' },
                heroic: { icon: 'icon_heroic', value: 'heroic' },
                mythic: { icon: 'icon_placeholder', value: 'mythic'}
            },
            onSelectionCallback: function onDifficultySelected(selectedValue) {
                // Update selection data object
                selections.difficulty = selectedValue;
                game.debug.text("#### SELECTED DIFFICULY ##########  " + selectedValue, 600, 600, '#00FF96');
                if(soundEnabled) {
                  sound.optionSelected.play();
                }
            },

            callbackContext: this
        });

        // ##################################
        // ####### Name slection ############
        // ##################################

         game.add.bitmapText(150,850, "myriad", "SELECT NAME", 15);


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

        // Todo! -- adding concept as placeholder for now
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
                if(soundEnabled) {
                  sound.enterWorld.play();
                }
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
            if(!configObject || !configObject.options || !configObject.onSelectionCallback)
              return console.log("Missing required data to create option panel");

            // Storage for buttons sprites
            let buttons = new Array();
            // The current active button/option ( sprite )
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
                let headerText = game.add.bitmapText(anchors.headerText.x, anchors.headerText.y, "myriad", configObject.headerText, 15);

                // When there is a headertext the button anchor are moved below
                anchors.buttons.y += sizes.headerText.height + 10;
            }

            // Create sprites for each menu option given in the config object.

            for(let option in configObject.options) {
               let option = configObject.options[option];
               let sprite = game.add.sprite(0, anchors.button, option.icon);

               sprite.height = sizes.button.h;
               sprite.width = sizes.button.w
                // Add some additonal data to the sprite object ( make sure to not colliide names with anything already exsiting on the sprite object or ebola will happen!)
               sprite.value = option.value;
               // Needed for the sprite to accept input events
               sprite.inputEnabled = true;
               // Remember to set icon to correct class (todo)
               buttons.push(sprite);
            }

            // Position and set-up button behaviour
            buttons.forEach((button,index)=> {
                // Positioning
                button.x = anchors.buttons.x + index * (sizes.button.w + 10); // <- spacing
                button.y = anchors.buttons.y;
                button.alpha = 0.7;
                button.blendMode = Phaser.blendModes.SCREEN;
                // Behaviour
                button.events.onInputOver.add(_btnOnMouseOver);
                button.events.onInputOut.add(_btnOnMouseOut);
                button.events.onInputDown.add(_btnOnClick);

            });

            // #### Button behaviour callbacks ###

            function _btnOnMouseOut(button) {
              // Dont fade the active/selected button on mouse out
              if(!(button === activeButton)) {
                button.alpha = 0.7;
              }
            }

            function _btnOnMouseOver(button) {
                button.alpha = 1;
            }

            function _btnOnClick(button) {
              // Return of its the same button beeing actived twice because bæsj
              if(activeButton === button) return;

              // Fade the previous active button
              if(activeButton) activeButton.alpha = 0.7;

              // Set active button to the button just pressed.
              activeButton = button;

              // Invoke the onSelectCallback if any. Call it with "this" set to undefined to avoid potential bullshit errors
              configObject.onSelectionCallback.call(configObject.callbackContext, button.value);
            }
       }

       // ##################################
       // ##### Visual effects #####
       // ##################################

       function addEmitter(){
            var emitter = game.add.emitter(300,500,0);

            emitter.width = 300;
            emitter.height = 400;
            emitter.angle = 30;
            emitter.blendMode = Phaser.blendModes.SCREEN;
            emitter.makeParticles("heal_particle");
            emitter.minParticleAlpha = 0.5;
            emitter.maxParticleAlpha = 1;
            emitter.minParticleScale = 0.01;
            emitter.maxParticleScale = 0.1;
            emitter.setYSpeed(7, 5);
            emitter.setXSpeed(-5, 22);
            emitter.minRotation = 0;
            emitter.maxRotation = 1;
            emitter.gravity = -1;
            emitter.start(true, 58600, 10, 500);
       }
    }
}
