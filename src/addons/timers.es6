/**
 * Addon showing timers for important events. Similar to DBM / BigWigs
 */

export default function BigWigs($) {
    let timerTestData = {
        ability: "Heavy Aoe",
        repeats: true,
        time: 30000
    };

    let _timers = [];
    // Container for timers
    let timerFrame = $.newFrame("UIParent")
        .setPos(game.world.centerX + 250 , game.world.centerY + 100);

    let emphasizedTimerFrame = $.newFrame("UIParent");



    /*    Create test timer, when timers are finished they will either be removed or respawn  */
    { // -- SCOPE / ANONYMOUS NAMESPACE?-- 

        let timer = new $.newStatusBar(timerFrame, 200, 25)
            .setValues(0, 1, 1, true)
            .setValue(0, 30000)
            .setColor(0xFF5E14);

        let ability_name = new Phaser.BitmapText(game, 5, 5, "myriad", timerTestData.ability, 14);
        timer.addChild(ability_name);

        _timers.push(timer);

    } // -- END --
    /* ## Todo ## make this kind of functionalty so addons can hook some script to the game loop.
           
    setScript("OnLoop", function () {          
                
    if (timer.timeLeft < config.emphasizedTime)
                    
             // move bar to BigTimerFrame
        
    }); */

    function addTimer() {
        
    }

    //## Called when a timerbar is removed or added.

    function rearrangeBars() {
        // loop through all "timers" and rearranges them.

    };

}
