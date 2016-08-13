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
    // Create a new action button for every spell in the array
    for ( let i = 0 ; i < playerSpells.length; i++ ) {
          let statusIcon = $.newStatusIcon("UIParent", playerSpells[i])
          .setPos(game.world.centerX - (config.actionButtonSize/2) - (300 + (i * (config.actionButtonSize + 1))), game.world.centerY - (50/2) + 350);

          $.events.ON_COOLDOWN_START.add((e) => _onCooldownStart(e));
          $.events.ON_COOLDOWN_ENDED.add((e) => _onCooldownEnded(e));


          _onCooldownStart(e) {
            if(e.spellid != statusIcon.spellid) return;
            statusIcon.start(e.duration);
          }

          _onCooldownEnded(e) {
            if(e.spellid != statusIcon.spellid) return;
            statusIcon.start(e.duration);
          }

    }

    newActionButton(){

    }



    // Todo - make it clearer, its looks very unreadable atm


}
