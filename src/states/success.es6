export default class Success {
    /**
     * TODO: Create menu so that the player can select Class, boss etc.
     */
    create() {
    	this.game.stage.backgroundColor = "#1c1f1f";
    	let video = game.add.video('win');

      var sprite = video.addToWorld(0,0);
      sprite.height = window.innerHeight;
      sprite.width = window.innerWidth;
      video.play();
    }
}
