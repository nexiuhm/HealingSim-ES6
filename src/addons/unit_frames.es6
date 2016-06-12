
import Player from "../gameObjects/player";
import Boss from "../gameObjects/boss";

/**
 * Addon creating the basic unit frames needed.
 */
export default function UnitFrames($) {

  /**
   * Players unit frame
   */
  let playerFrame = $.newUnitFrame("UIParent", $.localPlayer(), 300, 50)
    .togglePowerBar()
    .setPos(game.world.centerX - (300/2) - 300, game.world.centerY - (50/2) + 250);

  playerFrame.inputEnabled = true;
  playerFrame.events.onInputDown.add(() => {
    $.localPlayer().setTarget(playerFrame.unit);
  }); //playerFrame.input.enableDrag();

  /**
   * Target's unit frame
   */
  let targetFrame = $.newUnitFrame("UIParent", $.localPlayer().target, 300, 50)
    .setPos(game.world.centerX - (300/2) + 300, game.world.centerY - (50/2) + 250);

  $.events.TARGET_CHANGE_EVENT.add(() => {
    targetFrame.setUnit($.localPlayer().target);
  });

  /**
   * Boss test frame
   */

  let testBoss = new Boss(4, 4, 100, "Ragnaros", $.events, true);
  setInterval(function() {
    testBoss.apply("APPLY_DIRECT_DAMAGE",{
      amount: 18250,
      type: "physical"
    }); if(testBoss.getHealth() <= 0) game.state.start("Success");
  }, 1200);

  let bossFrame = $.newUnitFrame("UIParent", testBoss, 300, 50)
    .setPos(game.world.centerX + 250 , game.world.centerY + 10);

}
