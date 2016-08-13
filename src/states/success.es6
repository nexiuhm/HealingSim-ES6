export default class Success {

    create() {
    	this.game.stage.backgroundColor = "#1c1f1f";
    	let video = game.add.video('win');

      var sprite = video.addToWorld(0,0);
      sprite.height = window.innerHeight;
      sprite.width = window.innerWidth;
      video.play();
    }
}
