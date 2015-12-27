(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  };

  var _cmp = 'components/';
  var unalias = function(alias, loaderPath) {
    var start = 0;
    if (loaderPath) {
      if (loaderPath.indexOf(_cmp) === 0) {
        start = _cmp.length;
      }
      if (loaderPath.indexOf('/', start) > 0) {
        loaderPath = loaderPath.substring(start, loaderPath.indexOf('/', start));
      }
    }
    var result = aliases[alias + '/index.js'] || aliases[loaderPath + '/deps/' + alias + '/index.js'];
    if (result) {
      return _cmp + result.substring(0, result.length - '.js'.length);
    }
    return alias;
  };

  var _reg = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (_reg.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';
    path = unalias(name, loaderPath);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has.call(cache, dirIndex)) return cache[dirIndex].exports;
    if (has.call(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  require.list = function() {
    var result = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  require.brunch = true;
  require._cache = cache;
  globals.require = require;
})();
require.register("src/enums", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RAIDSIZE_TWENTYFIVEMAN = exports.RAIDSIZE_TENMAN = exports.RAIDSIZE_GROUP = exports.PLAYER_CLASS_MIN = exports.PLAYER_CLASS_MAX = exports.PLAYER_RACE_MIN = exports.PLAYER_RACE_MAX = exports.PLAYER_LEVEL_MIN = exports.PLAYER_LEVEL_MAX = exports.combat_rating_e = exports.race_e = exports.class_e = exports.stat_e = undefined;

var _enum = require("./util/enum");

var _enum2 = _interopRequireDefault(_enum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stat_e = (0, _enum2.default)("STRENGHT", "AGILITY", "STAMINA", "INTELLECT", "SPIRIT");
var class_e = (0, _enum2.default)("WARRIOR", "PALADIN", "HUNTER", "ROGUE", "PRIEST", "DEATHKNIGHT", "SHAMAN", "MAGE", "WARLOCK", "MONK", "DRUID");
var race_e = (0, _enum2.default)("RACE_NONE", "RACE_BEAST", "RACE_DRAGONKIN", "RACE_GIANT", "RACE_HUMANOID", "RACE_DEMON", "RACE_ELEMENTAL", "RACE_NIGHT_ELF", "RACE_HUMAN", "RACE_GNOME", "RACE_DWARF", "RACE_DRAENEI", "RACE_WORGEN", "RACE_ORC", "RACE_TROLL", "RACE_UNDEAD", "RACE_BLOOD_ELF", "RACE_TAUREN", "RACE_GOBLIN", "RACE_PANDAREN", "RACE_PANDAREN_ALLIANCE", "RACE_PANDAREN_HORDE", "RACE_MAX", "RACE_UNKNOWN");

var combat_rating_e = (0, _enum2.default)("RATING_MOD_DODGE", "RATING_MOD_PARRY", "RATING_MOD_HIT_MELEE", "RATING_MOD_HIT_RANGED", "RATING_MOD_HIT_SPELL", "RATING_MOD_CRIT_MELEE", "RATING_MOD_CRIT_RANGED", "RATING_MOD_CRIT_SPELL", "RATING_MOD_MULTISTRIKE", "RATING_MOD_READINESS", "RATING_MOD_SPEED", "RATING_MOD_RESILIENCE", "RATING_MOD_LEECH", "RATING_MOD_HASTE_MELEE", "RATING_MOD_HASTE_RANGED", "RATING_MOD_HASTE_SPELL", "RATING_MOD_EXPERTISE", "RATING_MOD_MASTERY", "RATING_MOD_PVP_POWER", "RATING_MOD_VERS_DAMAGE", "RATING_MOD_VERS_HEAL", "RATING_MOD_VERS_MITIG");

var player_role = (0, _enum2.default)("TANK", "HEALER", "DAMAGE");

var PLAYER_LEVEL_MIN = 1;
var PLAYER_LEVEL_MAX = 100;
var PLAYER_RACE_MIN = 7;
var PLAYER_RACE_MAX = 21;
var PLAYER_CLASS_MIN = 0;
var PLAYER_CLASS_MAX = 10;

var RAIDSIZE_TWENTYFIVEMAN = 25;
var RAIDSIZE_TENMAN = 10;
var RAIDSIZE_GROUP = 5;

exports.stat_e = stat_e;
exports.class_e = class_e;
exports.race_e = race_e;
exports.combat_rating_e = combat_rating_e;
exports.PLAYER_LEVEL_MAX = PLAYER_LEVEL_MAX;
exports.PLAYER_LEVEL_MIN = PLAYER_LEVEL_MIN;
exports.PLAYER_RACE_MAX = PLAYER_RACE_MAX;
exports.PLAYER_RACE_MIN = PLAYER_RACE_MIN;
exports.PLAYER_CLASS_MAX = PLAYER_CLASS_MAX;
exports.PLAYER_CLASS_MIN = PLAYER_CLASS_MIN;
exports.RAIDSIZE_GROUP = RAIDSIZE_GROUP;
exports.RAIDSIZE_TENMAN = RAIDSIZE_TENMAN;
exports.RAIDSIZE_TWENTYFIVEMAN = RAIDSIZE_TWENTYFIVEMAN;
});

require.register("src/gameObjects/addonManager", function(exports, require, module) {
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* Addon manager class - To keep things consistant it works a lot like how Phaser deals with states.
* An addon is basicly a subroutine that displays graphical information to the screen and modifies -
* this information as a reaction to events the game creates
*/

var AddonManager = (function () {
    function AddonManager() {
        _classCallCheck(this, AddonManager);

        this._addons = {};
    }

    _createClass(AddonManager, [{
        key: "add",
        value: function add(addonKey, addonCode) {
            this._addons[addonKey] = { name: addonKey, enabled: true, code: addonCode };
        }
    }, {
        key: "disableAddon",
        value: function disableAddon(addonKey) {
            if (!this._addons[addonKey]) return;else this._addons[addonKey].enabled = false;
        }
    }, {
        key: "enableAddon",
        value: function enableAddon(addonKey) {
            if (!this._addons[addonKey]) return;else this._addons[addonKey].enabled = true;
        }
    }, {
        key: "getListOfAddons",
        value: function getListOfAddons() {
            var addonList = [];
            for (var addon in this._addons) {
                var currentAddon = this._addons[addon];
                addonList.push([currentAddon.name, currentAddon.enabled]);
            }
            return addonList;
        }

        /* Loads addons to the current context/state*/

    }, {
        key: "loadEnabledAddons",
        value: function loadEnabledAddons() {
            for (var addon in this._addons) {
                var currentAddon = this._addons[addon];
                if (currentAddon.enabled) currentAddon.code();
            }
        }
    }]);

    return AddonManager;
})();

exports.default = AddonManager;
});

;require.register("src/gameObjects/addon_api", function(exports, require, module) {
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* Adding some extra functionality to the Phaser.Group  */
/* Todo: add interaction functionality to the frame */

var Frame = (function (_Phaser$Graphics) {
    _inherits(Frame, _Phaser$Graphics);

    function Frame(parent) {
        _classCallCheck(this, Frame);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Frame).call(this, game));

        if (parent === 'UIParent') MAINSTATE.UIParent.addChild(_this);else parent.addChild(_this);

        _this._width = 200;
        _this._height = 100;

        return _this;
    }

    _createClass(Frame, [{
        key: "setSize",
        value: function setSize(width, height) {
            this._width = width;
            this._height = height;
        }
    }, {
        key: "setPos",
        value: function setPos(x, y) {
            this.x = x;
            this.y = y;
        }
    }]);

    return Frame;
})(Phaser.Graphics);

var StatusBar = (function (_Frame) {
    _inherits(StatusBar, _Frame);

    function StatusBar(parent, width, height) {
        _classCallCheck(this, StatusBar);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(StatusBar).call(this, parent));

        _this2.setPos(0, 0);
        _this2.setSize(width, height);

        // defaults. How fast the bar should react to change in values.
        _this2._animationStyle = "Linear";
        _this2._animationDuration = 200;

        // The values for the bar. Default is full bar.
        _this2._minValue = 0;
        _this2._maxValue = 1;
        _this2._currentValue = 1;

        // Init bar
        _this2._bar = new Phaser.Graphics(game, 0, 0);
        _this2._bar.beginFill(0xFFFFFF);
        _this2._bar.drawRect(0, 0, _this2._width, _this2._height);
        _this2._bar.endFill();

        // Works as both a texture and a background
        _this2._texture = new Phaser.Sprite(game, 0, 0, "castbar_texture");
        _this2._texture.width = _this2._width;
        _this2._texture.height = _this2._height;
        _this2._texture.blendMode = PIXI.blendModes.MULTIPLY;

        // Add children to parent frame
        _this2.addChild(_this2._bar);
        _this2.addChild(_this2._texture);

        _this2._updateBarWidth();

        return _this2;
    }

    _createClass(StatusBar, [{
        key: "_updateBarWidth",

        /**
         * [_updateBarWidth description]
         * @return {[type]} [description]
         * @private
         */
        value: function _updateBarWidth() {
            var barWidthInPixels = Math.round(this._currentValue / this._maxValue * this._width);
            if (barWidthInPixels <= 0) // something bad happens if it goes to 0
                barWidthInPixels = 1;

            if (!this._animationDuration) this._bar.width = barWidthInPixels;else game.add.tween(this._bar).to({
                width: barWidthInPixels
            }, this._animationDuration, this._animationStyle, true);
        }

        /* Public interface below */

    }, {
        key: "setColor",
        value: function setColor(color) {
            this._bar.tint = color;
        }
    }, {
        key: "setValues",
        value: function setValues(min, max, current) {
            this._maxValue = max;
            this._minValue = min;
            this._currentValue = current;
            this._updateBarWidth();
        }
    }, {
        key: "setTexture",
        value: function setTexture() {
            //
        }
    }, {
        key: "setMaxValue",
        value: function setMaxValue(newMaxValue) {
            this._maxValue = newMaxValue;
            this._updateBarWidth();
        }
    }, {
        key: "setValue",
        value: function setValue(newValue, duration) {
            if (newValue <= this._minValue) this._currentValue = this._minValue;else if (newValue > this._maxValue) this._currentValue = this._maxValue;else this._currentValue = newValue;
            if (duration) this._animationDuration = duration;else if (duration === 0) this._animationDuration = duration;

            this._updateBarWidth();
        }
    }]);

    return StatusBar;
})(Frame);

var UnitFrame = (function (_Frame2) {
    _inherits(UnitFrame, _Frame2);

    function UnitFrame(parent, unit, width, height) {
        _classCallCheck(this, UnitFrame);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(UnitFrame).call(this, parent));

        if (width) _this3._width = width;
        if (height) _this3._height = height;

        _this3.unit = unit;
        _this3.config = {
            powerBarEnabled: false,
            playerNameEnabled: true,
            enemyColor: 0xFA1A16,
            powerBarColor: 0x00D1FF
        };

        _this3._init();
        return _this3;
    }

    _createClass(UnitFrame, [{
        key: "_init",
        value: function _init() {
            var _this4 = this;

            // Clear all displayObjects from the Frame
            this.removeChildren();
            this.events.destroy();

            this._initHealthBar();

            if (this.config.powerBarEnabled) {
                this._initPowerBar();
            }

            if (this.unit.isEnemy) {
                this.dragonTexture = new Phaser.Sprite(game, this._width - 55, -10, "elite");
                this.addChild(this.dragonTexture);
            }

            this.inputEnabled = true;
            this.events.onInputDown.add(function () {
                setTarget(_this4.unit);
            });

            this._initEventListeners();
        }
    }, {
        key: "_initEventListeners",
        value: function _initEventListeners() {
            var _this5 = this;

            //onEvent("UNIT_HEALTH_CHANGE", (e) => this._onUnitHealthChanged(e));
            MAINSTATE.events.UNIT_HEALTH_CHANGE.add(function (unit) {
                return _this5._onUnitHealthChanged(unit);
            });
            MAINSTATE.events.UNIT_DEATH.add(function (unit) {
                return _this5._onUnitDeath(unit);
            });
            if (this.config.powerBarEnabled) MAINSTATE.events.MANA_CHANGE.add(function (unit) {
                return _this5._onUnitManaChanged(unit);
            });
        }
    }, {
        key: "_initPowerBar",
        value: function _initPowerBar() {
            this.powerBar = new StatusBar(this, this._width, this._height / 4);
            this.powerBar.setValues(0, this.unit.getMana(), this.unit.getMaxMana());
            this.powerBar.setPos(0, this.healthBar._height);
            this.powerBar.setColor(this.config.powerBarColor);

            this.manaPercentText = new Phaser.BitmapText(game, this.powerBar._width / 2, this.powerBar._height / 2, "myriad", null, 11);
            this.manaPercentText.tint = this.config.powerBarColor;
            this.manaPercentText.anchor.set(0.5);
            this.powerBar.addChild(this.manaPercentText);
        }
    }, {
        key: "_initHealthBar",
        value: function _initHealthBar() {
            this.healthBar = new StatusBar(this, this._width, this._height / 4 * (this.config.powerBarEnabled ? 3 : 4));
            this.healthBar.setColor(this.unit.isEnemy ? this.config.enemyColor : data.getClassColor(this.unit.classId));
            this.healthBar.setValues(0, this.unit.getMaxHealth(), this.unit.getCurrentHealth());

            if (this.config.playerNameEnabled) {
                this.playerName = new Phaser.BitmapText(game, this.healthBar._width / 2, this.healthBar._height / 2, "myriad", null, 12);
                this.playerName.setText(this.unit.name);
                this.playerName.anchor.set(0.5);
                this.playerName.tint = this.unit.isEnemy ? this.config.enemyColor : data.getClassColor(this.unit.classId);
                this.healthBar.addChild(this.playerName);
            }
        }
    }, {
        key: "_onUnitHealthChanged",
        value: function _onUnitHealthChanged(unit) {
            if (unit != this.unit) return;
            this.healthBar.setValue(this.unit.getCurrentHealth());
            /*
            if (this.unit.healthPercent > 20) { 
                this.healthBar.setColor(red)
            } */
        }
    }, {
        key: "_onUnitMaxHealthChanged",
        value: function _onUnitMaxHealthChanged(unit) {
            this.healthBar.setMaxValue(this.unit.getMaxHealth());
        }
    }, {
        key: "_onUnitManaChanged",
        value: function _onUnitManaChanged(unit) {

            this.powerBar.setValue(this.unit.getMana());

            var mana_pct = this.unit.getMana() / this.unit.getMaxMana() * 100;
            this.manaPercentText.setText(mana_pct.toFixed(1) + "%");
        }
    }, {
        key: "_onUnitRoleChanged",
        value: function _onUnitRoleChanged() {
            // set role icon
        }
    }, {
        key: "_onUnitDeath",
        value: function _onUnitDeath(unit) {
            if (unit != this.unit) return;
            this.healthBar.setValue(0);
        }

        /* Public interface below */

    }, {
        key: "togglePowerBar",
        value: function togglePowerBar() {
            this.config.powerBarEnabled = this.config.powerBarEnabled ? false : true;
            this._init();
        }
    }, {
        key: "setUnit",
        value: function setUnit(unit) {
            this.unit = unit;
            this._init();
        }
    }]);

    return UnitFrame;
})(Frame);

/* ## TODO ## fix fix */

var StatusIcon = (function () {
    function StatusIcon(state, spellid, x, y) {
        var _this6 = this;

        _classCallCheck(this, StatusIcon);

        this.playState = state;
        this.spellid = spellid;

        this.container = this.playState.add.group();
        this.container.x = x;
        this.container.y = y;
        this.w = 50;
        this.h = 50;

        this.angle = {
            current: 0
        };

        // Spell icon
        var spellIcon = this.playState.add.image(0, 0, "icon_" + spellid);
        spellIcon.width = this.w;
        spellIcon.height = this.h;

        // Alpha mask for cooldown overlay
        var mask = this.playState.add.graphics(this.container.x, this.container.y);
        mask.beginFill(0xFFFFFF);
        mask.drawRect(0, 0, this.w, this.h);

        // Cooldown overlay arc init
        this.cd_overlay = this.playState.add.graphics(0, 0);
        this.cd_overlay.alpha = 0.8;
        this.cd_overlay.mask = mask;
        this.cd_overlay.blendMode = PIXI.blendModes.MULTIPLY;

        // adding displayObjects to the parent container
        this.container.add(spellIcon);
        this.container.add(this.cd_overlay);

        // listen to cooldown start event
        this.playState.events.ON_COOLDOWN_START.add(function (e) {
            return _this6._onCooldownStart(e);
        });
        this.playState.events.ON_COOLDOWN_ENDED.add(function (e) {
            return _this6._onCooldownEnded(e);
        });
    }

    _createClass(StatusIcon, [{
        key: "_onCooldownStart",
        value: function _onCooldownStart(event) {
            var _this7 = this;

            // The event is fired every time a spell cooldown starts, so we need to check if its the correct spell.
            if (event.spellid != this.spellid) return;
            // Create a timer that updates a variable locally.
            this.cd_overlay.alpha = 0.8;
            this.animTween = game.add.tween(this.angle).to({
                current: 270
            }, event.cooldownLenght, undefined, true);
            // Hook the update cooldown arc to the main loop
            this.playState.events.GAME_LOOP_UPDATE.add(function () {
                return _this7._updateCooldownArc();
            });
        }
    }, {
        key: "_onCooldownEnded",
        value: function _onCooldownEnded(event) {
            if (event.spellid != this.spellid) return;
            //this.hook.remove();
            // #TODO## Remove hook from game loop
            this.cd_overlay.alpha = 0;
            this.animTween.stop();
            this.angle.current = 0;
            this.cd_overlay.clear();
        }
    }, {
        key: "_updateCooldownArc",
        value: function _updateCooldownArc() {

            this.cd_overlay.clear();
            this.cd_overlay.beginFill(0x323232);
            this.cd_overlay.arc(25, 25, 50, Phaser.Math.degToRad(270), Phaser.Math.degToRad(this.angle.current), true);
            this.cd_overlay.endFill();
            // clear
            // redraw based on new values
        }
    }]);

    return StatusIcon;
})();

// Addon API function toolkit ## mainstate isnt supposed to be global etc. This is just temp

function setTarget(unit) {
    MAINSTATE.player.setTarget(unit);
}

function getGroupMembers() {
    return MAINSTATE.raid.getPlayerList();
}

function localPlayer() {
    return MAINSTATE.player;
}
});

;require.register("src/gameObjects/eventManager", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventManager =

// ### TODO ###
function EventManager() {
    _classCallCheck(this, EventManager);

    this.GAME_LOOP_UPDATE = new Phaser.Signal();
    this.TARGET_CHANGE_EVENT = new Phaser.Signal();
    this.UNIT_HEALTH_CHANGE = new Phaser.Signal();
    this.UNIT_ABSORB = new Phaser.Signal();
    this.UNIT_STARTS_SPELLCAST = new Phaser.Signal();
    this.UNIT_FINISH_SPELLCAST = new Phaser.Signal();
    this.UNIT_CANCEL_SPELLCAST = new Phaser.Signal();
    this.UI_ERROR_MESSAGE = new Phaser.Signal();
    this.UNIT_DEATH = new Phaser.Signal();
    this.GAME_LOOP_RENDER = new Phaser.Signal();
    this.ON_COOLDOWN_START = new Phaser.Signal();
    this.ON_COOLDOWN_ENDED = new Phaser.Signal();
    this.MANA_CHANGE = new Phaser.Signal();
};

exports.default = EventManager;
});

;require.register("src/gameObjects/raid", function(exports, require, module) {
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _enums = require("../enums");

var e = _interopRequireWildcard(_enums);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Raid = (function () {
    function Raid(eventManager) {
        _classCallCheck(this, Raid);

        this.events = eventManager;
        this.players = [];
        this.raidSize = null;
    }

    _createClass(Raid, [{
        key: "setRaidSize",
        value: function setRaidSize(size) {
            this.raidSize = size;
        }
    }, {
        key: "getPlayerList",
        value: function getPlayerList() {
            return this.players;
        }
    }, {
        key: "generateTestPlayers",
        value: function generateTestPlayers() {
            var numberOfTanks = undefined,
                numberOfHealers = undefined,
                numberOfDps = undefined;
            var validTankClasses = [0, 1, 5, 9, 10];
            var validHealerClasses = [1, 4, 6, 9, 10];

            if (this.raidSize == e.raid_size.GROUP) {
                numberOfTanks = 1;
                numberOfHealers = 0;
                numberOfDps = 3;
            }

            if (this.raidSize == e.raid_size.TENMAN) {
                numberOfTanks = 2;
                numberOfHealers = 2;
                numberOfDps = 5;
            }

            if (this.raidSize == e.raid_size.TWENTYFIVEMAN) {
                numberOfTanks = 2;
                numberOfHealers = 5;
                numberOfDps = 17;
            }

            while (numberOfTanks--) {
                var classs = validTankClasses[game.rnd.integerInRange(0, validTankClasses.length - 1)],
                    race = game.rnd.integerInRange(player_race.MIN, player_race.MAX),
                    level = 100,
                    name = data.generatePlayerName();

                var unit = this.createUnit(classs, race, level, name);
                this.addPlayer(unit);
            }

            while (numberOfHealers--) {
                var classs = validHealerClasses[game.rnd.integerInRange(0, validHealerClasses.length - 1)],
                    race = game.rnd.integerInRange(e.player_race.MIN, e.player_race.MAX),
                    level = 100,
                    name = data.generatePlayerName();

                var unit = this.createUnit(classs, race, level, name);
                this.addPlayer(unit);
            }

            while (numberOfDps--) {
                var classs = game.rnd.integerInRange(player_class.MIN, player_class.MAX),
                    race = game.rnd.integerInRange(player_race.MIN, player_race.MAX),
                    level = 100,
                    name = data.generatePlayerName();

                var unit = this.createUnit(classs, race, level, name);
                this.addPlayer(unit);
            }
        }

        /**
         * Add a player to the raidgroup
         * @param {Object(Player)} unit
         */

    }, {
        key: "addPlayer",
        value: function addPlayer(unit) {
            this.players.push(unit);
        }

        // When you create a unit you also have to pass them a reference to the event manager, so they know how to communicate events.

    }, {
        key: "createUnit",
        value: function createUnit(classs, race, level, name) {

            // Check if a valid "level" is chosen;
            if (level < e.PLAYER_LEVEL_MIN || level > e.PLAYER_LEVEL_MAX) level = e.PLAYER_LEVEL_MAX;else level = level;

            switch (classs) {
                case e.class_e.PRIEST:
                    return new Priest.Priest(race, level, name, this.events);
                    break;

                default:
                    return new Player(classs, race, level, name, this.events);
                    break;
            }
        }
    }, {
        key: "startTestDamage",
        value: function startTestDamage() {
            var tank = this.players[0];
            var offTank = this.players[1];

            // --- Create some random damage for testing purposes ----
            var bossSwingInterval = setInterval(bossSwing.bind(this), 1600);
            //var bossSingelTargetSpell = setInterval(singelTargetDamage.bind(this), 60000);
            var tankSelfHealOrAbsorb = setInterval(applyAbsorb.bind(this), 5000);
            var bossTimedDamage = setInterval(bossAoEDamage.bind(this), 30000); // Big aoe after 3 minutes, 180000
            var raidAoeDamage = setInterval(raidDamage.bind(this), 3000);
            var raidAIHealing = setInterval(raidHealing.bind(this), 4000);
            var manaRegenYolo = setInterval(gain_mana.bind(this), 1200);
            var spike = setInterval(bossSpike.bind(this), 8000);

            function gain_mana() {
                MAINSTATE.player.gain_resource(1600);
            }

            function bossSpike() {
                var massiveBlow = game.rnd.between(330000, 340900);

                tank.recive_damage({
                    amount: massiveBlow
                });
                offTank.recive_damage({
                    amount: massiveBlow / 2
                });
            }

            function bossSwing() {
                var bossSwing = game.rnd.between(70000, 90900);
                var bossSwingCriticalHit = Math.random();

                // 20% chance to critt. Experimental.
                if (bossSwingCriticalHit < 0.85) bossSwing *= 1.5;
                tank.recive_damage({
                    amount: bossSwing
                });
                offTank.recive_damage({
                    amount: bossSwing / 2
                });
            }

            function bossAoEDamage() {
                for (var i = 0; i < this.players.length - 1; i++) {
                    var player = this.players[i];
                    player.recive_damage({
                        amount: 170000
                    });
                }
            }

            function raidDamage() {
                var i = game.rnd.between(0, this.players.length - 1);
                for (; i < this.players.length; i++) {
                    var player = this.players[i];
                    player.recive_damage({
                        amount: game.rnd.between(85555, 168900)
                    });
                }
            }

            function singelTargetDamage() {
                var random = game.rnd.between(2, this.players.length - 1);
                this.players[random].recive_damage({
                    amount: game.rnd.between(100000, 150000)
                });
            }

            function bossEncounterAdds() {}

            function raidHealing() {

                for (var i = 0; i < this.players.length; i++) {
                    var player = this.players[i];
                    var incomingHeal = player.getCurrentHealth() + game.rnd.between(80000, 120000);
                    var criticalHeal = Math.random();

                    // 20% chance to critt. Experimental.
                    if (criticalHeal < 0.8) incomingHeal *= 1.5;

                    player.setHealth(incomingHeal);
                }
            }

            function applyAbsorb() {
                //this.player.setAbsorb(game.rnd.between(115, 88900));
                tank.setHealth(tank.getCurrentHealth() + game.rnd.between(10000, 38900));
            }

            // Legge inn AI shields på raidmembers.
        }
    }]);

    return Raid;
})();

exports.default = Raid;
});

;require.register("src/main", function(exports, require, module) {
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _boot = require('./states/boot');

var _boot2 = _interopRequireDefault(_boot);

var _addonManager = require('./gameObjects/addonManager');

var _addonManager2 = _interopRequireDefault(_addonManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Phaser is imported globally in the html file

window.onload = function () {

    /**
    * Force WEBGL since Canvas doesnt support textures / blendmodes which we use heavily.
    * Automatically starts the boot state aka. application entry point
    * Note: No need to save this var since all the states have access to it anyway
    */

    new PhaserCustomGame('100%', '100%', Phaser.WEBGL, undefined, _boot2.default);
};

/**
 * Adding some extra functionality to the Phaser game engine
 * Adds the ability to load "addons", and a different way to handle keyboard input
 */

var PhaserCustomGame = (function (_Phaser$Game) {
    _inherits(PhaserCustomGame, _Phaser$Game);

    function PhaserCustomGame(width, height, renderer, parent, state, transparent, antialias, physicsConfig) {
        _classCallCheck(this, PhaserCustomGame);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PhaserCustomGame).call(this, width, height, renderer, parent, state, transparent, antialias, physicsConfig));

        _this.addons = new _addonManager2.default();
        return _this;
    }

    /**
     * Keyboard input dispatcher. Sends input to the current state instead of having the redudancy of up a keyboard for each state.
     * @param  {[type]} keyPressData [description]
     * @return {[type]}              [description]
     */

    _createClass(PhaserCustomGame, [{
        key: 'sendKeyBoardInputToCurrentState',
        value: function sendKeyBoardInputToCurrentState(keyPressData) {

            var currentState = this.state.getCurrentState();
            if (!currentState.handleKeyBoardInput) return;else currentState.handleKeyBoardInput(keyPressData);
        }
    }]);

    return PhaserCustomGame;
})(Phaser.Game);
});

;require.register("src/states/boot", function(exports, require, module) {
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); /* The Boot state configures the Phaser this.game engine and loads assets */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _menu = require("./menu");

var _menu2 = _interopRequireDefault(_menu);

var _play = require("./play");

var _play2 = _interopRequireDefault(_play);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Boot = (function () {
    function Boot() {
        _classCallCheck(this, Boot);
    }

    _createClass(Boot, [{
        key: "preload",

        // Load assets
        value: function preload() {
            this.game.load.image("MenuScreenText", "./assets/menu_state_text.png");
            this.game.load.image("MenuScreenBackground", "./assets/textures/bg_texture.png");
            this.game.load.image("castbar_texture", "./assets/textures/BantoBar.png");
            this.game.load.image("castbar_texture2", "./assets/textures/LiteStep.png");
            this.game.load.image("ab_texture", "./assets/textures/action_bar_texture.png");
            this.game.load.image("elite", "./assets/textures/elite_texture.png");
            this.game.load.image("bg", "./assets/play_state_background.png");
            this.game.load.image("icon_5", "./assets/icons/spell_holy_powerwordshield.jpg");
            this.game.load.image("icon_2", "./assets/icons/power_infusion.jpg");
            this.game.load.bitmapFont("myriad", "./assets/fonts/font.png", "./assets/fonts/font.xml");
        }
    }, {
        key: "onWindowResize",
        value: function onWindowResize(data) {
            this.game.canvas.height = window.innerHeight;
            this.game.canvas.width = window.innerWidth;
        }
    }, {
        key: "create",
        value: function create() {
            var _this = this;

            console.log(this.game);
            // Set scalemode for the this.game.
            this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
            this.game.scale.onSizeChange.add(function (data) {
                return _this.onWindowResize(data);
            });

            // Phaser config
            this.game.time.advancedTiming = true;
            this.game.tweens.frameBased = true;

            // Register games-states
            this.game.state.add("MainMenu", _menu2.default);
            this.game.state.add("Play", _play2.default);

            // Setup the keyboard for the this.game.
            this.game.input.keyboard.addCallbacks(this.game, undefined, undefined, this.game.sendKeyBoardInputToCurrentState);
            // Start the post-boot state
            this.game.state.start("MainMenu");
        }
    }]);

    return Boot;
})();

exports.default = Boot;
});

;require.register("src/states/menu", function(exports, require, module) {
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MainMenu = (function () {
    function MainMenu() {
        _classCallCheck(this, MainMenu);
    }

    _createClass(MainMenu, [{
        key: "create",

        // Show HTML form on screen.
        // - Options to select player, difficulty,--
        // Validate/Process form input

        value: function create() {
            this.add.image(0, 0, "MenuScreenBackground");
            this.add.image(0, 0, "MenuScreenText").blendMode = PIXI.blendModes.ADD;
            //this.printAddonList();
        }
    }, {
        key: "printAddonList",
        value: function printAddonList() {
            var addonList = game.addons.getListOfAddons();
            var lineHeight = 15;
            var headerText = this.add.bitmapText(0, 0, game.defaultFont, "### REGISTRED ADDONS ###", 14);
            headerText.tint = 0xFF00FF;
            for (var i = 0; i < addonList.length; i++) {
                this.add.bitmapText(0, lineHeight * i + lineHeight, game.defaultFont, "## Addon Name: " + addonList[i][0] + "  ## Enabled : " + addonList[i][1], 14);
            }
        }
    }, {
        key: "handleKeyBoardInput",
        value: function handleKeyBoardInput(keyCode) {
            console.log("startingds main");

            // On any input, the game is started
            this.game.state.start("Play");
        }
    }]);

    return MainMenu;
})();

exports.default = MainMenu;
});

;require.register("src/states/play", function(exports, require, module) {
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _eventManager = require("../gameObjects/eventManager");

var _eventManager2 = _interopRequireDefault(_eventManager);

var _raid = require("../gameObjects/raid");

var _raid2 = _interopRequireDefault(_raid);

var _enums = require("../enums");

var e = _interopRequireWildcard(_enums);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MAINSTATE; // ## Temporary - used for testing ##

var Play = (function () {
    function Play() {
        _classCallCheck(this, Play);
    }

    _createClass(Play, [{
        key: "create",
        value: function create() {
            MAINSTATE = this; // ## Temporary ##

            // Start the world fade-in effect
            this.world.alpha = 0;
            this.add.tween(this.world).to({ alpha: 1 }, 4000, Phaser.Easing.Cubic.InOut, true);

            // Add a background
            this.game.add.image(this.game.stage.x, this.game.stage.y, "bg");

            // Add Ui parent container, all addon displayObject hooks to this.
            this.UIParent = this.add.group(this.world);

            this.events = new _eventManager2.default();
            this.raid = new _raid2.default(this.events);

            // Set raid size
            this.raid.setRaidSize(e.RAID_SIZE_TWENTYFIVEMAN);

            // Init player. ## TODO ##: Use data from selection screen. See Phaser documentation for sending args between states?
            this.player = this.raid.createUnit(e.class_e.PRIEST, e.race_e.RACE_BLOOD_ELF, 100, "Player");
            this.raid.generateTestPlayers();
            this.raid.addPlayer(this.player);

            // Load enabled addons
            this.game.addons.loadEnabledAddons();

            // Start the boss/healing simulator
            this.raid.startTestDamage();

            // Testing cooldown frames
            var test = new StatusIcon(this, 5, 500, 500);
            var test2 = new StatusIcon(this, 2, 555, 500);
        }
    }, {
        key: "update",
        value: function update() {
            this.events.GAME_LOOP_UPDATE.dispatch();
        }
    }, {
        key: "handleKeyBoardInput",
        value: function handleKeyBoardInput(key) {
            // ## TODO ## : Find a better way to deal with this, maybe just send the input to the addons, and let the addons/ui decide what to do with it.

            var keybindings = data.getKeyBindings();
            for (var binding in keybindings) {
                var keybinding = keybindings[binding];
                if (keybinding.key == key) {
                    if (keybinding.spell) this.player.cast_spell(keybinding.spell);
                    break;
                }
            }
        }
    }, {
        key: "render",
        value: function render() {
            this.events.GAME_LOOP_RENDER.dispatch();
        }
    }]);

    return Play;
})();

exports.default = Play;
});

;require.register("src/util/enum", function(exports, require, module) {
'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function Enum() {
  var _this = this;

  if (!(this instanceof Enum)) {
    var _args = [];
    for (var key in arguments) {
      _args.push(arguments[key]);
    }
    return new (Function.prototype.bind.apply(Enum, [null].concat(_toConsumableArray(_args))))();
  }

  var args = this.deepCopy(Array.prototype.slice.call(arguments));
  if (Object.prototype.toString.call(args) === '[object Object]') {
    args = this.valuesInObj(args);
  }

  args.forEach(function (prams) {
    _this[prams] = Symbol(prams);
  });
}

Enum.prototype = {
  constructor: Enum,
  deepCopy: function deepCopy(target) {
    var result = undefined;
    var type = Object.prototype.toString.call(target);
    var getValue = function getValue(value) {
      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
        return undefined.deepCopy(value);
      }
      return value;
    };
    switch (type) {
      case '[object Object]':
        result = {};
        for (var key in target) {
          result[key] = getValue(target[key]);
        }
        break;
      case '[object Array]':
        result = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = target.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2);

            var key = _step$value[0];
            var value = _step$value[1];

            result[key] = getValue(value);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        break;
      default:
        result = null;
    }
    return result;
  },
  /* Untill Node 5.3.0, Object.values still not supported */
  valuesInObj: function valuesInObj(object) {
    var results = [];
    for (var key in object) {
      results.push(object[key]);
    }
    return results;
  }
};

exports.default = Enum;
});

;
//# sourceMappingURL=main.js.map