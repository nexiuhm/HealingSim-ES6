/**
 * Addon displaying the players spells & listens for input to execute the spells. (todo)
 */

export default function ActionBar($) {

    let testSpellIcon1 = $.newStatusIcon("UIParent", 2)
        .setPos(game.world.centerX - (50/2) - 300, game.world.centerY - (50/2) + 350);
    let testSpellIcon2 =  $.newStatusIcon("UIParent", 5)
        .setPos(game.world.centerX - (50/2) - 350, game.world.centerY - (50/2) + 350);
    testSpellIcon2.width = 500;

}
