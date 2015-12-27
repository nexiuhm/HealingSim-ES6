namespace Addons {

    export function CastFrame() {

        var config = {
            castSuccessColor: 0x00FF96,
            castingColor: 0xFF7D0A,
            width: 300,
            height: 30
        };

        var castingUnit = localPlayer();

      
        // Frame
        var castingFrame = new Frame("UIParent");
        castingFrame.setPos(widthFactor * 50 - config.width / 2, heightFactor * 75 - config.height / 2);
        castingFrame.alpha = 0;

         // Status bar
        var cast_bar = new StatusBar(castingFrame, config.width, config.height)
        cast_bar.setValues(0, 1, 0);

         // Status text #todo#
        var spell_name = new Phaser.BitmapText(game, config.width / 2, config.height / 2, "myriad", "", 12);
        spell_name.anchor.set(0.5);
        cast_bar.addChild(spell_name);

        // Listen to player events ## todo ## remove global MAINSTATE
        MAINSTATE.events.UNIT_STARTS_SPELLCAST.add((s, t) => onUnitStartCast(s, t));
        MAINSTATE.events.UNIT_FINISH_SPELLCAST.add(() => onUnitFinishCast());


        function onUnitStartCast(castTime, spellName) {

            castingFrame.alpha = 1;
            cast_bar.setValue(0, 0);
            cast_bar.setColor(config.castingColor);
            spell_name.text = spellName + ' ' + (castTime / 1000).toFixed(2) + "s";
            cast_bar.setValue(1, castTime);

        }


        function onUnitFinishCast() {

            cast_bar.setColor(config.castSuccessColor);
            cast_bar.setValue(0, 0);

        }

    }

}

