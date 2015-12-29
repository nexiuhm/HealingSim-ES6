## Healing Simulator
Based on the popular video-game "World Of Warcraft". Written in Javascript/ES6 using the Phaser.js library.


### How to contribute

#####Install Node
https://nodejs.org/en/

#####Install Python (required for some node packages we use)
https://www.python.org/ ( v2.7.10 or higher. v 3.x.x is not supported  )
- Make sure to add python to PATH - this is disabled by default in the installer. (Windows)

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

