[![Stories in Ready](https://badge.waffle.io/nexiuhm/HealingSim-ES6.png?label=ready&title=Ready)](https://waffle.io/nexiuhm/HealingSim-ES6)
[![Build status](https://ci.appveyor.com/api/projects/status/uyfv4o51sumpxl73?svg=true)](https://ci.appveyor.com/project/LuckyDjuk/healingsim-es6)

## Healing Simulator
Based on the popular video-game "World Of Warcraft". Written in Javascript/ES6 using the Phaser.js library.


### How to contribute

#####Install Node
https://nodejs.org/en/

#####Install required programs to run node-gyp
- See their installation guide here: https://www.npmjs.com/package/node-gyp

#####Install dependencies
 - Nagivate to the project folder. And execute the following commands:
```
npm install -g brunch bower
npm install
bower install
```
- All *".es6"* files in *"/src/"* will be compiled to *"/public/js/main.js"*
- All files in *"/static/"* will be copied to *"/public/"* folder

#####Start the watcher & localhost server
```
brunch w --server
```
- Whenever you make changes to the files it will automatically compile and refresh the browser window :)

![js is shiny](http://i.imgur.com/z8N8i12.gif)


### TODO in no particular order
- Finish the menu state with the ability to select boss & class ( unavaible classes greyed out )
- Raid needs to contain actual logical groups ( right now every player is just trown into a single array ), this makes it impossible to target specific groups for damage or healing.
- Split data.ts into multiple files, there are alot of unrelated data there. ( could be slit into spell_data, scale_data etc..)
- End the game when the player either wins or loose ( go to the game over state )
- Refactor or just completely rewrite the player class before we add more features. I'm thinking a base class "Entity" which both Player & Boss can extend.

##### The entity class have these different components
      - Aura/action System
      - Stat component
      - Spell component
      - Action handler component?

##### Spell class needs a target component which can select targets based on a few simple rules.
      - Chain target ( heals first your actual target then it will jump to x targets with low health after that )
      - Smart target ( slelects the most injured player )
      - Group target ( selects all members of your targets group ( including the target ) )
      - Raid target ( selects all raid members )
##### Every spell creates an action/aura object which the reciver can handle. Here are some of the basic action types:
      - APPLY_DIRECT_DAMAGE  ( raw amount, damage school, damage source )
      - APPLY_PERODIC_HEAL   ( tick callback ( if the tick needs to be recalculated every time )
      - APPLY_PERODIC_DAMAGE  
      - APPLY_MOD_STAT ( modifies a stat, usually temporary ) f.ex reduces damage taken by 20%



#### To give some perspective this is how the final ecosystem could work:

- Player pressed '1' ->
- The ActionBar addon subscribes to this key
- Action bar addon wants to cast the spell associated with this key so it calls castSpell(spellid) which is an addon API function .
- Player object recives the call and calls the spell .cast() function.
- SpellBase class is called by the spellobject.
- SpellBase class creates an action/aura object which is sent to the recviving target(s) target.applyAction(actionObj) ?
- Reciveing target handels the action object request which is f.ex to apply an aura.

##### First release goals for now:

- A demo boss,
- Auras working, and can be picked up by the UI to display correct icons. ( if someone has Power Word: shield on them, it should show )
- Priest (discipline) working ok,
- Menu screen ( even if most of the options are unavaible )
- Game over screen
