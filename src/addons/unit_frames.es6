import Player from "../gameObjects/player";

export default function UnitFrames($) {

    // Local player
    var playerFrame = $.newUnitFrame("UIParent", $.localPlayer(), 300, 50);
    playerFrame.togglePowerBar();
    playerFrame.setPos(500, 800);
    //playerFrame.input.enableDrag();

    // Target
    var targetFrame = $.newUnitFrame("UIParent", $.localPlayer().target, 300, 50);
    targetFrame.setPos(1000, 800);
    $.events.TARGET_CHANGE_EVENT.add(() => targetFrame.setUnit(localPlayer().target));

    // Boss
    var testBoss = new Player(4, 4, 100, "Ragnaros", $.events, true);
    setInterval(function() {
        testBoss.recive_damage({
            amount: 5250
        })
    }, 1200);
    var bossFrame = $.newUnitFrame("UIParent", testBoss, 300, 50);
    bossFrame.setPos(1200, 500);

}

