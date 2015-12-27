namespace Addons {
    export function RaidFrame() {

        var unitFrames:Array<UnitFrame> = [];
        var config = {
            spacing: 2,
            unitFrameWidth: 90,
            unitFrameHeight: 40
        };

        var raidFrame = new Frame("UIParent");
        //this.raidFrame.inputEnabled = true;
            //this.raidFrame.input.enableDrag();

        (() => { // Anonymous namespace, since we dont want to pollute this function scope
            var MAX_GROUPS = 5;
            var MAX_PLAYERS_PER_GROUP = 5;
            var playersInRaid = getGroupMembers();

            for (var g = 0; g < MAX_GROUPS; g++) {
                for (var p = 0; p < MAX_PLAYERS_PER_GROUP; p++) {
                    var unit = playersInRaid[(g * 5) + p]; if (!unit) break;

                    var unitFrame = new UnitFrame(raidFrame, unit, config.unitFrameWidth, config.unitFrameHeight);
                    if (unit === localPlayer())
                        unitFrame.togglePowerBar();

                    unitFrame.setPos(config.unitFrameWidth * g, p * (config.unitFrameHeight + config.spacing));

                    unitFrames.push(unitFrame);
                }
            }
        })(); // -- END --

        /* Position parent frame base on how big the raid got */
        raidFrame.x = widthFactor * 50 - 250;
        raidFrame.y = heightFactor * 50 - 80;

        /* Spawn effect */
        for (var player = 0; player < unitFrames.length; player++) {
             var unitFrame = unitFrames[player];
             game.add.tween(unitFrame).to({y:-800 }, 1550 + (player*10), Phaser.Easing.Elastic.Out, true,undefined,undefined,true);
        }
    }
}
