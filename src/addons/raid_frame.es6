
/**
 * Raid frame addon
 * Creates unit-frames based on how many players are in the raid/group.
 */

export default function RaidFrame($) {

  let unitFrames = [];
  let config = {
    spacing: 2,
    unitFrameWidth: 90,
    unitFrameHeight: 40
  };

  let raidFrame = $.newFrame("UIParent")
    .setPos(800, 400);

  { // Anonymous namespace, since we dont want to pollute this function scope
    let MAX_GROUPS = 5;
    let MAX_PLAYERS_PER_GROUP = 5;
    let playersInRaid = $.getGroupMembers();

    for (let g = 0; g < MAX_GROUPS; g++) {
      for (let p = 0; p < MAX_PLAYERS_PER_GROUP; p++) {
        let unit = playersInRaid[(g * 5) + p];
        if (!unit) break;

        /**
         * Create and configure the unit frame
         */

        let unitFrame = $.newUnitFrame(raidFrame, unit, config.unitFrameWidth,
            config.unitFrameHeight)
          .setPos(config.unitFrameWidth * g, p * (config.unitFrameHeight +
            config.spacing));

        unitFrame.inputEnabled = true;

        if (unit === $.localPlayer()) {
          unitFrame.togglePowerBar();
        }
        unitFrame.events.onInputDown.add(() => {
          $.localPlayer().setTarget(unitFrame.unit);
        });

        // add to the array
        unitFrames.push(unitFrame);
      }
    }
  } // -- END --

  /* TODO: Position parent frame base on how big the raid got */

  /**
   * The animation that is fired when the raid has been created
   */

  for (let player = 0; player < unitFrames.length; player++) {
    let unitFrame = unitFrames[player];
    game.add.tween(unitFrame).to({
        y: -800
      }, 1550 + (player * 10), Phaser.Easing.Elastic.Out, true, undefined,
      undefined, true);
  }
}
