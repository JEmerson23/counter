export default class Counter {
  constructor(display_id) {
    const counter = this;
    this.$display = document.getElementById(display_id);
    
    if(!this.$display) {
     throw new Error(`> element of id ${display_id} was not found...`);
    }
    
    this.VALUE = (() => {
      const SUBSTITUTE_VALUE = 0;
      const displayValue = counter.$display.textContent;

      if (!isNaN(displayValue)) {
        return Number(displayValue);
      }

      console.log(
        `> the display value was invalid, so it was changed to ${SUBSTITUTE_VALUE}.`
      );
      return 0;
    })();

    this._onupgrade = function($display,counter){
     $display.textContent = counter.value;
    };
    
    this._$button = {
      add: null,
      decrease: null,
      reset: null
    };
  }

  set value(n) {
    if (isNaN(n)) {
      console.log(`> ${n} is not a number.`);
      return;
    }

    this.VALUE = n;

    this._upgradeDisplay();
  }

  get value() {
    return this.VALUE;
  }

  set onupgrade(callback) {
    this._onupgrade = callback;
  }

  get onupgrade() {
    const counter = this;
    if(counter._onupgrade) {
     return function () {
      counter._onupgrade(counter.$display, counter);
     };
    }
    
    return function() {};
  }

  set buttons(obj) {
    /*
    {
     add: {
      id: "",
      onclick: ""
     }
    }
   */
  const counter = this;
   
   for (let [key, value] of Object.entries(obj)) {
      if (this._$button.hasOwnProperty(key)) {
        this._$button[key] = document.getElementById(value.id);
        
        if (!this._$button[key]) {
          throw new Error(`> element with id ${value.id} was not found...`);
        }
       
        this._$button[key].addEventListener('click',(function(counter,value){
         return function(event) {
          const callback = value.onclick;
          
          callback(counter,event);
         };
        })(this,value));
        
      }
    }
  }

  get buttons() {
    return this._$button;
  }

  add(n) {
    if (isNaN(n)) {
      throw new Error(`> ${n} is not a number...`);
    }

    let number = n;

    if (number < 0) {
      number = Math.abs(number);
    }

    this.value += number;
  }

  decrease(n) {
    if (isNaN(n)) {
      throw new Error(`> ${n} is not a number...`);
    }

    let number = n;
    
    if(this.value <= 0) {return;}
    
    if (number < 0) {
      number = Math.abs(number);
    }

    this.value -= number;
  }

  reset(toValue) {
    if (!toValue) {
      toValue = 0;
    }

    this.value = toValue;
  }

  _upgradeDisplay() {
    if (typeof this.onupgrade == "function") {
      const callback = this.onupgrade;

      callback(this.$display, this);
    }
  }
}
