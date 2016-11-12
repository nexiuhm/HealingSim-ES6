


export default class Stat {
  constructor(minValue, maxValue) {
    this._minValue = minValue;
    this._maxValue = maxValue;
    this._value = maxValue;
    this.onMinValue = null;
  }

  getValue() {
     return this._value;
  }

  setValue(newValue) {
     if(newValue >= this._maxValue) {
       this._value = this._maxValue;
     }

     else if(newValue <= this._minValue) {
       this._value = this._minValue;
       if(this.onMinValue) this.onMinValue();
     }

     else {
       this._value = newValue;
     }
  }

  maxValue() {
    return this._maxValue;
  }

  percent() {
    return this._currentValue / this._maxValue;
  }


}
