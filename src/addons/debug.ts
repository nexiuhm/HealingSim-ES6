namespace Addons {
    export function Debug() {
        var player:Player = localPlayer();
        MAINSTATE.events.GAME_LOOP_RENDER.add(() => onRenderGame());
        
        function onRenderGame() {
            game.debug.text(game.time.fps + " FPS", 20, 20, '#00FF96');
            game.debug.text("v. " + game.gameVersion, 20, 40, '#00FF96');
            if (player.target) {
                game.debug.text("#### UNIT TARGET INFO ########## ", 20, 60, '#00FF96');
                game.debug.text("#### Name: " + player.target.name, 20, 80, '#00FF96');
                game.debug.text("#### Health: " + player.target.getCurrentHealth(), 20, 100, '#00FF96');
                game.debug.text("#### Class: " + player.target.classId, 20, 120, '#00FF96');
                game.debug.text("#### Mana: " + player.getMana(), 20, 140, '#00FF96');
                game.debug.text("#### Haste_percent: " + player.target.total_haste() + ' %', 20, 160, '#00FF96');
                game.debug.text("#### Absorb: " + player.stats.absorb, 20, 180, '#00FF96');
            }

            game.debug.text("window.innerWidth: " + window.innerWidth, 20, 200, '#00FF96');
            game.debug.text("window.innerHeight: " + window.innerHeight, 20, 220, '#00FF96');
            //game.debug.text("World CenterX: " + game.world.centerX, 20, 360, '#00FF96');
            //game.debug.text("World CenterY: " + game.world.centerY, 20, 380, '#00FF96');
            //game.debug.text("Stage X: " + game.stage.x, 20, 240, '#00FF96');
            //game.debug.text("Stage Y: " + game.stage.y, 20, 260, '#00FF96');
            //game.debug.text("World Width: " + game.world.width, 20, 280, '#00FF96');
            //game.debug.text("World Height: " + game.world.height, 20, 300, '#00FF96');
            //game.debug.text("Game canvas Width: " + game.canvas.width, 20, 320, '#00FF96');
            //game.debug.text("Game canvas Height: " + game.canvas.height, 20, 340, '#00FF96');
            //game.debug.text("World CenterX: " + game.world.centerX, 20, 360, '#00FF96');
            //game.debug.text("World CenterY: " + game.world.centerY, 20, 380, '#00FF96');
            game.debug.text("Mouse X: " + game.input.x, 20, 400, '#00FF96');
            game.debug.text("Mouse Y: " + game.input.y, 20, 420, '#00FF96');
        }
    }
}