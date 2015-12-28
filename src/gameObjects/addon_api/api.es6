import Frame from "./frame";
import StatusBar from "./status_bar";
import UnitFrame from "./unit_frame";
import StatusIcon from "./status_icon";


// Addon API function toolkit ## mainstate isnt supposed to be global etc. This is just temp

function setTarget(unit) {
    _G.MAINSTATE.player.setTarget(unit);
}

function getGroupMembers() {
    return _G.MAINSTATE.raid.getPlayerList();
}

function localPlayer() {
    return _G.MAINSTATE.player;
}


export {Frame,StatusBar,UnitFrame,StatusIcon,setTarget,getGroupMembers,localPlayer};