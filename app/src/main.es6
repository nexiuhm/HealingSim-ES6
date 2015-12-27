import Boot from 'src/states/Boot';
// Phaser is imported globally in the html file

window.onload = () => {

    // Create an instance of the Phaser game engine. 
    // Force WEBGL since Canvas doesnt support textures / blendmodes which we use heavily.
    // Automatically starts the boot state aka. application entry point

    console.log("Test");
   	// Note: No need to save this var since all the states have access to it anyway
    new Phaser.Game('100%', '100%', Phaser.WEBGL, undefined, Boot);


};

