import Frame from "./frame";
import StatusBar from "./status_bar";
import UnitFrame from "./unit_frame";
import StatusIcon from "./status_icon";


var game = null;
var player = null;
var raid = null;

function setTarget(unit) {
    player.setTarget(unit);
}

function getGroupMembers() {
    return raid.getPlayerList();
}

function localPlayer() {
    return player;
}

/**
 * Inits the api. Returns an object containing api functions based on which state is provided.
 * @param  {Phaser.State}
 * @return {[type]}       [description]
 */
export function init(state) {

	game = state.game;
	player = state.player;
	raid = state.raid;

	let api = {
		"getGroupMembers": getGroupMembers,
		"localPlayer": localPlayer,
		"setTarget": setTarget,
		"Frame": Frame,
		"UnitFrame": UnitFrame,
		"StatusIcon": StatusIcon,
		"StatusBar": StatusBar

	};

	api.freeze; // Might aswell freeze the object cause it should never change

	return api;




}