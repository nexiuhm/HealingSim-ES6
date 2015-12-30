export default function RaidFrame($) {

    var unitFrames = [];
    var config = {
        spacing: 2,
        unitFrameWidth: 90,
        unitFrameHeight: 40
    };

    var raidFrame = $.newFrame("UIParent");
    raidFrame.setPos(800,400);
    //this.raidFrame.inputEnabled = true;
    //this.raidFrame.input.enableDrag();

    { // Anonymous namespace, since we dont want to pollute this function scope
        let MAX_GROUPS = 5;
        let MAX_PLAYERS_PER_GROUP = 5;
        let playersInRaid = $.getGroupMembers();

        for (let g = 0; g < MAX_GROUPS; g++) {
            for (let p = 0; p < MAX_PLAYERS_PER_GROUP; p++) {
                let unit = playersInRaid[(g * 5) + p];
                if (!unit) break;

                let unitFrame = $.newUnitFrame(raidFrame, unit, config.unitFrameWidth, config.unitFrameHeight);
                if (unit === $.localPlayer())
                    unitFrame.togglePowerBar();

                unitFrame.setPos(config.unitFrameWidth * g, p * (config.unitFrameHeight + config.spacing));

                unitFrames.push(unitFrame);
            }
        }
    } // -- END --

    /* Position parent frame base on how big the raid got */

    /* Spawn effect */
    for (var player = 0; player < unitFrames.length; player++) {
        var unitFrame = unitFrames[player];
        game.add.tween(unitFrame).to({
            y: -800
        }, 1550 + (player * 10), Phaser.Easing.Elastic.Out, true, undefined, undefined, true);
    }
}
