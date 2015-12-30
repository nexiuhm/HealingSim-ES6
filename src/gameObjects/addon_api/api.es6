import Frame from "./frame";
import StatusBar from "./status_bar";
import UnitFrame from "./unit_frame";
import StatusIcon from "./status_icon";


let game, player, raid, state;

function setTarget(unit) {
    player.setTarget(unit);
}

function getGroupMembers() {
    return raid.getPlayerList();
}

function localPlayer() {
    return player;
}

function newFrame(parent) {
    if (parent === "UIParent") {
        parent = state.UIParent ? state.UIParent : state.world;
    }

    return new Frame(parent);
}

function newUnitFrame(parent, unit, width, height) {
	 if (parent === "UIParent") {
        parent = state.UIParent ? state.UIParent : state.world;
    }
    console.log(state.events);
    return new UnitFrame(parent, unit, width, height, state.events)

}

function newStatusBar(parent, width, height) {
	 if (parent === "UIParent") {
        parent = state.UIParent ? state.UIParent : state.world;
    }
    return new StatusBar(parent, width, height)

}

/**
 * Inits the addon api. Returns an object containing api functions based on which state is provided.
 * @param  {Phaser.State}
 * @return {[type]}       [description]
 */
export function init(_state) {

    game = _state.game;
    player = _state.player;
    raid = _state.raid;
    state = _state;

    console.log(state);

    let api = {
        "getGroupMembers": getGroupMembers,
        "localPlayer": localPlayer,
        "setTarget": setTarget,
        "newFrame": newFrame,
        "newUnitFrame": newUnitFrame,
        "StatusIcon": StatusIcon,
        "newStatusBar": newStatusBar,
        "events": state.events // TODO: Better way

    };

    api.freeze; // Might aswell freeze the object cause it should never change.

    return api;




}
