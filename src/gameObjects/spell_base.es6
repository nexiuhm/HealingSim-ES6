//* Base spell class that all spells extends upon //

export default class SpellBase {
    //### Spell data ###


    constructor(spelldata, player) {
        // The player that owns the spell
        this.player = player;

        //### Spell data ###
        this.powerCost = spelldata.resource_cost;
        this.powerType = spelldata.resourceType;
        this.school = spelldata.school;
        this.name = spelldata.name;
        this.spellid = spelldata.id;
        this.base_casttime = spelldata.casttime;
        this.base_cooldown = spelldata.cooldown;

        //### Bools ###
        this.hasCooldown = this.base_cooldown ? true : false;
        this.hasPowerCost = this.powerCost ? true : false;
        this.isInstant = this.base_casttime ? false : true;
        this.onCooldown = false;

        //Storage for timers ( Phaser.Timer )
        let current_cast, current_cooldown;
    }

    /**
     * _execute  - Executes the spell, applies effects to target(s), consumes resources etc.
     * @private
     * @protected
     */
    _execute() {
        this._consumeResource();

        // If the spell added a execute method, run that now
        if (this.onExecute) {
            this.onExecute();
        }

        if (this.hasCooldown)
            this.start_cooldown();

    }

    _startCasting() {
        this.player.isCasting = true;
        // ### TODO: Need to be able to handle channeled spells ###
        let ct = this.getCastTime();
        this.current_cast = game.time.events.add(ct, () => this._onCastFinished());

        // Send a signal/event that a spell is starting its cast.
        this.player.events.UNIT_STARTS_SPELLCAST.dispatch(ct, this.name);
    }

    _startCooldown() {
        this.onCooldown = true;
        // Get the cooldown
        let cd = this.cooldown();
        // Start the timer with callback
        this.current_cooldown = game.time.events.add(cd, () => this._onCooldownReady());
        this.player.events.ON_COOLDOWN_START.dispatch({
            cooldownLenght: cd,
            spellid: this.spellid
        });
    }

    /**
     * [_isReady description]
     * @return {Boolean} If spell is ok to use.
     * @private
     * @protected
     */
    _isReady() {
        if (this.onCooldown) {
            return false;
        }

        // Check for special rules added by the spell
        if (this.isUsable && this.isUsable() === false) {
            return false;
        }

        return true;
    }

    _onCastFinished() {
        this.player.isCasting = false;
        this.player.events.UNIT_FINISH_SPELLCAST.dispatch();
        this._execute();
    }


    _consumeResource() {
        if (!this.hasPowerCost)
            return;
        this.player.consume_resource(this.powerCost);
    }

    _onCooldownReady() {
        this.onCooldown = false;
        this.player.events.ON_COOLDOWN_ENDED.dispatch({
            spellid: this.spellid
        });
    }

    /** Public interface below */

    use() {

        // Save the target beeing casted on
        this.target = this.player.target;

        // Check if there are any rules that makes the spell unable to be used.
        if (!this._isReady()) {
            return;
        }

        // If no cast time, execute spell right away
        if (this.isInstant)
            this._execute();
        else
            this._startCasting();

    }

    cooldown() {
        return this.base_cooldown;
    }

    cost() {
        return this.powerCost;
    }

    getCastTime() {
        return this.base_casttime * (1 - (this.player.getTotalHaste() / 100));

    }

    // todo: why is this here, its not used?
    cancel_cast() {
        game.time.events.remove(this.current_cast);
    }


}
