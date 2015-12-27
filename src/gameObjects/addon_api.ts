
/* Adding some extra functionality to the Phaser.Group  */
/* Todo: add interaction functionality to the frame */

class Frame extends Phaser.Graphics  {
    _width = 200;
    _height = 100;
    
    constructor(parent){   
        super(game);
        if (parent === 'UIParent')
            MAINSTATE.UIParent.addChild(this);
        else
            parent.addChild(this);


    }

    setSize(width, height) {
        this._width = width;
        this._height = height;


    };
    setPos(x:number, y:number) {
        this.x = x;
        this.y = y;
    };

}


class StatusBar extends Frame  {
    // defaults
    private _animationStyle = "Linear";
    private _animationDuration = 200;

    
    // displayObjects
    private _bar: PIXI.Graphics;
    private _texture: Phaser.Sprite;
    //
    private _minValue = 0;
    private _maxValue = 1;
    private _currentValue = 1;
     
    constructor(parent, width,height) {
       
        super(parent);
        
        this.setPos(0, 0);
        this.setSize(width, height);
        
        // The moving bar
        this._bar = new Phaser.Graphics(game,0,0);
        this._bar.beginFill(0xFFFFFF);
        this._bar.drawRect(0, 0, this._width, this._height);
        this._bar.endFill();
        
        // Works as both a texture and a background
        this._texture = new Phaser.Sprite(game, 0, 0, "castbar_texture");
        this._texture.width = this._width;
        this._texture.height = this._height;
        this._texture.blendMode = PIXI.blendModes.MULTIPLY;

        this.addChild(this._bar);
        this.addChild(this._texture);

        this._updateBarWidth();

    };

    private _updateBarWidth() {
        var barWidthInPixels = Math.round((this._currentValue / this._maxValue) * this._width);
        if (barWidthInPixels <= 0) // something bad happens if it goes to 0
            barWidthInPixels = 1;

        if (!this._animationDuration)
            this._bar.width = barWidthInPixels;
        else 
            game.add.tween(this._bar).to({ width: barWidthInPixels }, this._animationDuration, this._animationStyle, true);
    }

    /* Public interface below */

    setColor(color) {
        this._bar.tint = color;

    }

    setValues(min, max, current){
        this._maxValue = max;
        this._minValue = min;
        this._currentValue = current;
        this._updateBarWidth();
    }

    setTexture() {
        // 
    }

    setMaxValue(newMaxValue: number) {
        this._maxValue = newMaxValue;
        this._updateBarWidth();
    }

    setValue(newValue:number, duration?) {
        if (newValue <= this._minValue)
            this._currentValue = this._minValue;
        else if (newValue > this._maxValue)
            this._currentValue = this._maxValue;
        else
            this._currentValue = newValue;
        if (duration)
            this._animationDuration = duration;
        else if (duration === 0)
            this._animationDuration = duration;
       
        this._updateBarWidth();
       
    }
}

class UnitFrame extends Frame {
  
    unit: Player;
    config = {
        powerBarEnabled: false,
        playerNameEnabled: true,
        enemyColor: 0xFA1A16,
        powerBarColor: 0x00D1FF,
    };
    // DisplayObjects
    healthBar: StatusBar;
    absorbBar: StatusBar; // ## TODO ##
    powerBar: StatusBar;
    playerName: Phaser.BitmapText;
    manaPercentText: Phaser.BitmapText;
    dragonTexture: Phaser.Sprite;

    constructor(parent, unit: Player, width?, height?) {
        super(parent);

        this.unit = unit;
        if (width)  this._width = width;
        if (height) this._height = height;

        this._init();
    }
    
    private _init() {
        // Clear all displayObjects from the Frame
        this.removeChildren();
        this.events.destroy();

        this._initHealthBar();

        if (this.config.powerBarEnabled) {
            this._initPowerBar();
        }

        if (this.unit.isEnemy) {
            this.dragonTexture = new Phaser.Sprite(game, this._width-55, -10, "elite");
            this.addChild(this.dragonTexture);
        }

        this.inputEnabled = true;
        this.events.onInputDown.add(() => { setTarget(this.unit) });

        this._initEventListeners();
    }

    private _initEventListeners() {
        //onEvent("UNIT_HEALTH_CHANGE", (e) => this._onUnitHealthChanged(e));
        MAINSTATE.events.UNIT_HEALTH_CHANGE.add((unit) => this._onUnitHealthChanged(unit));
        MAINSTATE.events.UNIT_DEATH.add((unit) => this._onUnitDeath(unit));
        if(this.config.powerBarEnabled)
            MAINSTATE.events.MANA_CHANGE.add((unit) => this._onUnitManaChanged(unit));

    }

    private _initPowerBar() {
        this.powerBar = new StatusBar(this, this._width, this._height / 4);
        this.powerBar.setValues(0, this.unit.getMana(), this.unit.getMaxMana());
        this.powerBar.setPos(0, this.healthBar._height);
        this.powerBar.setColor(this.config.powerBarColor);

        this.manaPercentText = new Phaser.BitmapText(game, this.powerBar._width / 2, this.powerBar._height / 2, "myriad", null, 11);
        this.manaPercentText.tint = this.config.powerBarColor;
        this.manaPercentText.anchor.set(0.5);
        this.powerBar.addChild(this.manaPercentText);

    }
    
    private _initHealthBar() {
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

    private _onUnitHealthChanged(unit) {
        if (unit != this.unit)
            return;
        this.healthBar.setValue(this.unit.getCurrentHealth());
        /*
        if (this.unit.healthPercent > 20) { 
            this.healthBar.setColor(red)
        } */
    }
    private _onUnitMaxHealthChanged(unit) {
        this.healthBar.setMaxValue(this.unit.getMaxHealth());
    }
    private _onUnitManaChanged(unit) {
  
        this.powerBar.setValue(this.unit.getMana());

        var mana_pct = ( this.unit.getMana() / this.unit.getMaxMana() ) * 100;
        this.manaPercentText.setText(mana_pct.toFixed(1) + "%");
    }

    private _onUnitRoleChanged() {
        // set role icon
    }

    private _onUnitDeath(unit) {
        if (unit != this.unit)
            return;
        this.healthBar.setValue(0);        
    }

    /* Public interface below */

    togglePowerBar() {
        this.config.powerBarEnabled = this.config.powerBarEnabled ? false : true;
        this._init();
    }

    setUnit(unit: Player) {
        this.unit = unit;
        this._init();
    }

}

/* ## TODO ## fix fix */
class StatusIcon {
    x = 500;
    y = 500;
    w = 50;
    h = 50;
    spellid;
    playState: States.Play;

    // Display objects
    container: Phaser.Group;
    spellIcon: Phaser.Image;
    texture;
    cd_overlay: Phaser.Graphics;

    // Angle needs to be an object so we can pass it as a reference to the onGameUpdate callback
    angle = {current: 0}; 
    animTween: Phaser.Tween;

    constructor(state: States.Play, spellid, x, y ) {

        this.playState = state;
        this.spellid = spellid; 

        this.container = this.playState.add.group();
        this.container.x = x;
        this.container.y = y;


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
        this.playState.events.ON_COOLDOWN_START.add((e) => this._onCooldownStart(e));
        this.playState.events.ON_COOLDOWN_ENDED.add((e) => this._onCooldownEnded(e));
    }

    private _onCooldownStart(event) {
       
        // The event is fired every time a spell cooldown starts, so we need to check if its the correct spell.
        if (event.spellid != this.spellid)
           return;
        // Create a timer that updates a variable locally.
        this.cd_overlay.alpha = 0.8;
        this.animTween = game.add.tween(this.angle).to({ current: 270 }, event.cooldownLenght,undefined, true);
        // Hook the update cooldown arc to the main loop
        this.playState.events.GAME_LOOP_UPDATE.add(() => this._updateCooldownArc());

    }

    private _onCooldownEnded(event) {
        if (event.spellid != this.spellid)
            return;
        //this.hook.remove();
        // #TODO## Remove hook from game loop
        this.cd_overlay.alpha = 0;
        this.animTween.stop();
        this.angle.current = 0;
        this.cd_overlay.clear();
    
    }

    private _updateCooldownArc() {

        this.cd_overlay.clear();
        this.cd_overlay.beginFill(0x323232);
        this.cd_overlay.arc(25, 25, 50, Phaser.Math.degToRad(270), Phaser.Math.degToRad(this.angle.current), true);
        this.cd_overlay.endFill();
        // clear
        // redraw based on new values
    }

}



// Addon API function toolkit ## mainstate isnt supposed to be global etc. This is just temp

function setTarget(unit){
    MAINSTATE.player.setTarget(unit);
}

function getGroupMembers() {
    return MAINSTATE.raid.getPlayerList();
}

function localPlayer() {
    return MAINSTATE.player;
}