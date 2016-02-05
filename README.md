[![Stories in Ready](https://badge.waffle.io/nexiuhm/HealingSim-ES6.png?label=ready&title=Ready)](https://waffle.io/nexiuhm/HealingSim-ES6)

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


##### First release goals for now:

- A demo boss,
- Auras working, and can be picked up by the UI to display correct icons. ( if someone has Power Word: shield on them, it should show )
- Priest (discipline) working ok,
- Menu screen ( even if most of the options are unavaible )
- Game over screen
