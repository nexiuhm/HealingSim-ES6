
import {createUniqueID} from "../util";

export default class Aura {
  constructor(duration, type, value, source) {
    this._id = createUniqueID();
    this.source = source;
    this.name = source;
    this._remaining = duration;
    this.duration = duration;
    this.type = type;
    this.value = value;

    this._timer = null;

    if(duration) {
      this._timer = game.time.create(true);
      let timerAccuracy = 100;
      this._timer.loop(timerAccuracy, this._timerTick, this);
      this._timer.start();
    }
  }


  _timerTick() {
    if ((this._remaining - 100) <= 0) {
       this.expire();
    }

    else {
      this._remaining -= 100;
    }
  }

  onExpired(callbackFunction) {
    this._onExpiredCallback = callbackFunction;
  }

  expire() {
    if(this._timer) this._timer.stop();
    this._remaining = 0;
    if(this._onExpiredCallback) {
      this._onExpiredCallback();
    }
  }

  remaining() {
    return this._remaining;
  }
}
