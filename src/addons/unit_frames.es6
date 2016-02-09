import Player from "../gameObjects/player";

/**
 * Addon creating the basic unit frames needed.
 */
export default function UnitFrames($) {

    /**
     * Players unit frame
     */
    let playerFrame = $.newUnitFrame("UIParent", $.localPlayer(), 300, 50)
                    .togglePowerBar()
                    .setPos(500, 800);

    playerFrame.inputEnabled = true;
    playerFrame.events.onInputDown.add(() => {
        $.localPlayer().setTarget(playerFrame.unit)
    }); //playerFrame.input.enableDrag();

    /**
     * Target's unit frame
     */
    let targetFrame = $.newUnitFrame("UIParent", $.localPlayer().target, 300, 50)
                    .setPos(1000, 800);

    $.events.TARGET_CHANGE_EVENT.add(() => {
        targetFrame.setUnit($.localPlayer().target)
    });

    /**
     * Boss test frame
     */

    let testBoss = new Player(4, 4, 100, "Ragnaros", $.events, true);
    setInterval(function() {
        testBoss.recive_damage({
            amount: 5250
        })
    }, 1200);

    let bossFrame = $.newUnitFrame("UIParent", testBoss, 300, 50)
                    .setPos(1200, 500);

}
