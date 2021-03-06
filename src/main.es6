﻿import Boot from './states/boot';
import AddonManager from './gameObjects/addonManager';
// Phaser is imported globally in the html file

window.onload = () => {

    /**
	 * Force WEBGL since Canvas doesnt support textures / blendmodes which we use heavily.
	 * Automatically starts the boot state aka. application entry point
	 * Note: Maybe there is no need to have game global since all the states have access to it anyway?
	 */
    window.game = new PhaserCustomGame('100%', '100%', Phaser.WEBGL, undefined, Boot);


};

/**
 * Adding some extra functionality to the Phaser game engine
 * Adds the ability to load "addons", and a different way to handle keyboard input
 */

class PhaserCustomGame extends Phaser.Game {
 
  
    constructor(width, height, renderer, parent, state, transparent, antialias, physicsConfig) {
        super(width,height,renderer,parent,state,transparent,antialias,physicsConfig);
        this.addons = new AddonManager();
        this.version = 0.1;
    }

    /**
     * Keyboard input dispatcher. Sends input to the current state instead of having the redudancy of up a keyboard for each state.
     * @param  {[type]} keyPressData [description]
     * @return {[type]}              [description]
     */
    sendKeyBoardInputToCurrentState(keyPressData) {
        
        let currentState = this.state.getCurrentState();
        if (!currentState.handleKeyBoardInput)
            return;
        else
           currentState.handleKeyBoardInput(keyPressData);
    };
}