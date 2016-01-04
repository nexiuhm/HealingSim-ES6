/**
 * Addon creating and managing the player's castbar.
 */

export default function CastFrame($) {

    let config = {
        castSuccessColor: 0x00FF96,
        castingColor: 0xFF7D0A,
        width: 300,
        height: 30
    };

    let castingUnit = $.localPlayer();

    // Frame
    let castingFrame = new $.newFrame("UIParent")
        .setPos(500 - config.width / 2, 500 - config.height / 2)
        .setAlpha(0);

    // Status bar
    let cast_bar = new $.newStatusBar(castingFrame, config.width, config.height)
        .setValues(0, 1, 0);

    // Status text #todo#
    let spell_name = new Phaser.BitmapText(game, config.width / 2, config.height / 2, "myriad", "", 12);
    spell_name.anchor.set(0.5);
    cast_bar.addChild(spell_name);

    // Listen to player events ## todo ## remove global MAINSTATE
    $.events.UNIT_STARTS_SPELLCAST.add((castTime, spellName) => onUnitStartCast(castTime, spellName));
    $.events.UNIT_FINISH_SPELLCAST.add(() => onUnitFinishCast());


    function onUnitStartCast(castTime, spellName) {

        castingFrame.setAlpha(1);
        spell_name.setText(spellName + ' ' + (castTime / 1000).toFixed(2) + "s");

        cast_bar.setValue(0, 0)
            .setColor(config.castingColor)
            .setValue(1, castTime);

    }


    function onUnitFinishCast() {

        cast_bar.setColor(config.castSuccessColor)
            .setValue(0, 0);

    }

}
