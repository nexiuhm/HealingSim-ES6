/**
 * Addon showing timers for important events. 
 */

export default function BigWigs($) {
    var timerTestData = {
        ability: "Heavy Aoe",
        repeats: true,
        time: 30000
    };

    var timers =  [];
    // Container for timers
    var timerFrame = new $.newFrame("UIParent");
    timerFrame.setPos(1200, 900);



    /*    Create test timer, when timers are finished they will either be removed or respawn  */
    { // -- SCOPE / ANONYMOUS NAMESPACE?-- 

        let timer = new $.newStatusBar(timerFrame, 200, 25);
        timer.setValues(0, 1, 0);
        timer.setValue(0, 30000);
        timer.setColor(0xFF5E14);

        let ability_name = new Phaser.BitmapText(game, 5, 5, "myriad", timerTestData.ability, 14);
        timer.addChild(ability_name);

        timers.push(timer);

    } // -- END --
    /* ## Todo ## make this kind of functionalty so addons can hook some script to the game loop.
           
    setScript("OnLoop", function () {          
                
    if (timer.timeLeft < config.emphasizedTime)
                    
             // move bar to BigTimerFrame
        
    }); */

    //## Called when a timerbar is removed or added.

    function rearrangeBars() {
        // loop through all "timers" and rearranges them.

    };

}
