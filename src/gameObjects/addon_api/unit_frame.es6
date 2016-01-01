import Frame from "./frame";
import StatusBar from "./status_bar";
import * as data from "../data";
export default class UnitFrame extends Frame {

    constructor(parent, unit, width, height, _events) {
        super(parent);
        if (width) this._width = width;
        if (height) this._height = height;

        this.gameEvents = _events;
        this.unit = unit;
        this.config = {
            powerBarEnabled: false,
            playerNameEnabled: true,
            enemyColor: 0xFA1A16,
            powerBarColor: 0x00D1FF
        };

        this._init();

    }

    _init() {
        // Clear all displayObjects from the Frame
        this.removeChildren();

        this._initHealthBar();

        if (this.config.powerBarEnabled) {
            this._initPowerBar();
        }

        if (this.unit.isEnemy) {
            this.dragonTexture = new Phaser.Sprite(game, this._width - 55, -10, "elite");
            this.addChild(this.dragonTexture);
        }

        //this.inputEnabled = true;
        this._initEventListeners();
    }

    _initEventListeners() {
        //onEvent("UNIT_HEALTH_CHANGE", (e) => this._onUnitHealthChanged(e));
        this.gameEvents.UNIT_HEALTH_CHANGE.add((unit) => this._onUnitHealthChanged(unit));
        this.gameEvents.UNIT_DEATH.add((unit) => this._onUnitDeath(unit));
        if (this.config.powerBarEnabled)
            this.gameEvents.MANA_CHANGE.add((unit) => this._onUnitManaChanged(unit));

    }

    _initPowerBar() {
        this.powerBar = new StatusBar(this, this._width, this._height / 4);
        this.powerBar.setValues(0, this.unit.getMana(), this.unit.getMaxMana());
        this.powerBar.setPos(0, this.healthBar._height);
        this.powerBar.setColor(this.config.powerBarColor);

        this.manaPercentText = new Phaser.BitmapText(game, this.powerBar._width / 2, this.powerBar._height / 2, "myriad", null, 11);
        this.manaPercentText.tint = this.config.powerBarColor;
        this.manaPercentText.anchor.set(0.5);
        this.powerBar.addChild(this.manaPercentText);

    }

    _initHealthBar() {
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

    _onUnitHealthChanged(unit) {
        if (unit != this.unit)
            return;
        this.healthBar.setValue(this.unit.getCurrentHealth());
        /*
        if (this.unit.healthPercent > 20) { 
            this.healthBar.setColor(red)
        } */
    }
    _onUnitMaxHealthChanged(unit) {
        this.healthBar.setMaxValue(this.unit.getMaxHealth());
    }
    _onUnitManaChanged(unit) {

        this.powerBar.setValue(this.unit.getMana());

        var mana_pct = (this.unit.getMana() / this.unit.getMaxMana()) * 100;
        this.manaPercentText.setText(mana_pct.toFixed(1) + "%");
    }

    _onUnitRoleChanged() {
        // set role icon
    }

    _onUnitDeath(unit) {
        if (unit != this.unit)
            return;
        this.healthBar.setValue(0);
    }

    /* Public interface below */

    togglePowerBar() {
        this.config.powerBarEnabled = this.config.powerBarEnabled ? false : true;
        this._init();
    }

    setUnit(unit) {
        this.unit = unit;
        this._init();
    }

}
