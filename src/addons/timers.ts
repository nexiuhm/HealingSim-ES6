namespace Addons {
    export function BigWigs() {

        var timers: Array<StatusBar> = [],
            timerTestData = { ability: "Heavy Aoe", repeats: true, time: 30000 };
        
        // Container for timers
        var timerFrame = new Frame("UIParent");
        timerFrame.setPos(1200, 900);


        /*    Create test timer, when timers are finished they will either be removed or respawn  */          
        (() => { // -- Anonymous namespace -- 

            var timer = new StatusBar(timerFrame, 200, 25);
            timer.setValues(0, 1, 0);
            timer.setValue(0, 30000);
            timer.setColor(0xFF5E14);

            var ability_name = new Phaser.BitmapText(game, 5, 5, "myriad", timerTestData.ability, 14);
            timer.addChild(ability_name);

            timers.push(timer);

        })(); // -- END --
             
        /* ## Todo ## make this kind of functionalty so addons can hook some script to the game loop.
               
        timer.setScript("OnLoop", function () {          
                    
        if (bar.timeLeft < config.emphasizedTime)
                        
                 // move bar to BigTimerFrame
            
        }); */
            
               //## Called when a timerbar is removed or added.
        
        function rearrangeBars() {
                  // loop through all "timers" and rearrange to anchor.

        };

    }

}

