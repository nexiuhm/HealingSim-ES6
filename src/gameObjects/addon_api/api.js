import Frame from "./frame";
import StatusBar from "./status_bar";
import UnitFrame from "./unit_frame";
import StatusIcon from "./status_icon";

let game, player, raid, boss, state;

function setTarget(unit) {
  player.setTarget(unit);
}

function getGroupMembers() {
  return raid.getPlayerList();
}

function localPlayer() {
  return player;
}

function getBoss() {
  return boss;
}

function getSpells() {
  return player.getSpellList();
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
  return new UnitFrame(parent, unit, width, height, state.events);
}

function newStatusBar(parent, width, height) {
  if (parent === "UIParent") {
    parent = state.UIParent ? state.UIParent : state.world;
  }
  return new StatusBar(parent, width, height);
}

function newStatusIcon(parent, spellid) {
  if (parent === "UIParent") {
    parent = state.UIParent ? state.UIParent : state.world;
  }
  return new StatusIcon(parent, spellid, state.events);
}

/**
 * Inits the addon api. Returns an object containing api functions based on which state is provided.
 *
 * ##Fun fact##: This is actually called a "factory" or "compositon" in js programming. When you return a object with functions like here.
 * It's actually favoured over classes by many Javascript developers since it much more flexible, and you can achive true privacy (whatever you dont return is essentialy private)
 * The downside is that classes are faster, especially in the case of google's V8 javascript intreperter.
 *
 * @param  {Phaser.State} The phaser game state
 * @return {Object}	Addon api functions
 */
export function init(_state) {

  game = _state.game;
  player = _state.player;
  raid = _state.raid;
  boss = _state.boss;
  state = _state;

  let api = {
    "getGroupMembers": getGroupMembers,
    "localPlayer": localPlayer,
    "setTarget": setTarget,
    "getBoss": getBoss,
    "newFrame": newFrame,
    "newUnitFrame": newUnitFrame,
    "newStatusIcon": newStatusIcon,
    "newStatusBar": newStatusBar,
    "getSpells": getSpells,
    "events": state.events // TODO: Better way
  };

  //api.freeze; // Might aswell freeze the object cause it should never change.
  return api;
}
