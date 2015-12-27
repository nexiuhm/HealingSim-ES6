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
//import Enum from "es6-enum" // Node module

/*

const stat_e = Enum("STRENGHT", "AGILITY", "STAMINA", "INTELLECT", "SPIRIT");
const class_e = Enum("WARRIOR", "PALADIN", "HUNTER", "ROGUE", "PRIEST", "DEATHKNIGHT", "SHAMAN", "MAGE", "WARLOCK", "MONK", "DRUID");
const race_e = Enum("RACE_NONE", "RACE_BEAST", "RACE_DRAGONKIN", "RACE_GIANT", "RACE_HUMANOID", "RACE_DEMON", "RACE_ELEMENTAL", "RACE_NIGHT_ELF", "RACE_HUMAN", "RACE_GNOME", "RACE_DWARF", "RACE_DRAENEI", "RACE_WORGEN", "RACE_ORC", "RACE_TROLL", "RACE_UNDEAD", "RACE_BLOOD_ELF", "RACE_TAUREN", "RACE_GOBLIN", "RACE_PANDAREN", "RACE_PANDAREN_ALLIANCE", "RACE_PANDAREN_HORDE", "RACE_MAX", "RACE_UNKNOWN" );

const combat_rating_e = Enum(
    "RATING_MOD_DODGE",
    "RATING_MOD_PARRY",
    "RATING_MOD_HIT_MELEE",
    "RATING_MOD_HIT_RANGED",
    "RATING_MOD_HIT_SPELL",
    "RATING_MOD_CRIT_MELEE",
    "RATING_MOD_CRIT_RANGED",
    "RATING_MOD_CRIT_SPELL",
    "RATING_MOD_MULTISTRIKE",
    "RATING_MOD_READINESS",
    "RATING_MOD_SPEED",
    "RATING_MOD_RESILIENCE",
    "RATING_MOD_LEECH",
    "RATING_MOD_HASTE_MELEE",
    "RATING_MOD_HASTE_RANGED",
    "RATING_MOD_HASTE_SPELL",
    "RATING_MOD_EXPERTISE",
    "RATING_MOD_MASTERY",
    "RATING_MOD_PVP_POWER",
    "RATING_MOD_VERS_DAMAGE",
    "RATING_MOD_VERS_HEAL",
    "RATING_MOD_VERS_MITIG"
);
*/

/* todo
const player_level = Enum("MIN" = 1, "MAX" = 100, "DEFAULT" = 100 };
const player_race { MIN = 7, MAX = 21 };
const player_class { MIN = 0, MAX = 10 };
const raid_size { GROUP = 5, TENMAN = 10, TWENTYFIVEMAN = 25 };
const player_role { TANK, HEALER, DAMAGE };
*/
"use strict";
});

;require.register("src/gameObjects/addonManager", function(exports, require, module) {
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

;require.register("src/main", function(exports, require, module) {
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _Boot = require('src/states/Boot');

var _Boot2 = _interopRequireDefault(_Boot);

var _addonManager = require('src/gameObjects/addonManager');

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

    new PhaserCustomGame('100%', '100%', Phaser.WEBGL, undefined, _Boot2.default);
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

;require.register("src/states/Boot", function(exports, require, module) {
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); /* The Boot state configures the Phaser this.game engine and loads assets */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Menu = require("./Menu");

var _Menu2 = _interopRequireDefault(_Menu);

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
            this.game.state.add("MainMenu", _Menu2.default);
            //this.game.state.add("Play", States.Play);

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

;require.register("src/states/Menu", function(exports, require, module) {
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
            console.log("starting main");
            // On any input, the game is started
            game.state.start("Play");
        }
    }]);

    return MainMenu;
})();

exports.default = MainMenu;
});

;
//# sourceMappingURL=main.js.map