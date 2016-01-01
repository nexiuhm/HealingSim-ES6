export default class EventManager { // ### TODO: Give the event system more features. Maybe addons should be able to listen for events form specific players? ### 

    constructor() {
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
    }
}
