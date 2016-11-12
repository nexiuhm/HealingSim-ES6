/**
 * Addon displaying the players spells & listens for input to execute the spells. (todo)
 */

export default function ActionBar($) {

    let config = {
        actionButtonSize: 50,
        actionBarPosition: 50
    }



    // Get a list of all spells avaiable to the player class
    let playerSpells = $.getSpells();
    console.table(playerSpells);
    // Create a new action button for every spell in the array
    for ( let i = 0 ; i < playerSpells.length; i++ ) {
          $.newStatusIcon("UIParent", playerSpells[i])
          .setPos(game.world.centerX - (config.actionButtonSize/2) - (300 + (i * (config.actionButtonSize + 1))), game.world.centerY - (50/2) + 350);

    }

    // Todo - make it clearer, its looks very unreadable atm


}
