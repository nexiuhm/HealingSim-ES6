namespace Addons {
    export function UnitFrames(){

        // Local player
        var playerFrame = new UnitFrame("UIParent", localPlayer(), 300, 50);
        playerFrame.togglePowerBar();
        playerFrame.setPos(500, 800);
        playerFrame.input.enableDrag();

        // Target
        var targetFrame = new UnitFrame("UIParent", localPlayer().target, 300, 50);
        targetFrame.setPos(1000, 800);
        MAINSTATE.events.TARGET_CHANGE_EVENT.add(() => targetFrame.setUnit(localPlayer().target));

        // Boss
        var testBoss = new Player(class_e.WARRIOR, race_e.RACE_HUMAN, 100, "Ragnaros", MAINSTATE.events, true);
        setInterval(function () { testBoss.recive_damage({ amount: 5250 }) }, 1200);
        var bossFrame = new UnitFrame("UIParent", testBoss, 300, 50);
        bossFrame.setPos(1200, 500);

    }
}