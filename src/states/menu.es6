
export default class MainMenu {
    /**
     * TODO: Create menu so that the player can select Class, boss etc.
     */
    


    create() {

        // Add the concept to work from to the screen
        this.add.image(0, 0, "MenuScreenConcept");


        // Storage for menu selections. Feeding it with default values to start with
        this.selections = {
            boss: 'brackenspore',
            class: 'priest',
            difficulty: 'n',
            playerName: 'Player'
        }

   

        //  #### Create selection menus ####

        let bossSelectionOptions = createRadioSelectionGroup ({
            

            buttons: {

                priest: { icon: 'id', value: 'priest' },
                paladin: { icon: 'id', value: 'paladin' , inActive: true },
                shaman: { icon: 'id', value: 'shaman', inActive: true},
                druid: {icon: 'id' , value: 'druid', inActive: true }
                

            },

            
            onSelectionCallback: onClassSelected // 



        });

        let classSelectionOptions = null;


        let difficultySelectionOptions = null;


        // Name slection - Neeed to create some kind of input field. Phaser doesnt have this built in so it will take some work.


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

        function onClassSelected () {

            // Update selection data object
            // Update featured-class frame
        }

        function onBossSelected() {
            // Update selection data object
            // Update featured-boss frame
        }

        function onDifficultySelected() {
            // Update selection data object
        }

        function onPlayButtonPressed() {
            this.game.state.start("Play");
        }




        // ##################################
        // ##### Helper functions below #####
        // ##################################

        function createRadioSelectionGroup(configObject) {
            // dbg
            console.table(configObject);



       }




    }



}
