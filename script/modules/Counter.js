export default class Counter {
  constructor(currentValueDisplay_id) {
    foundElementById(currentValueDisplay_id, true);

    const counter = this;

    this.$currentValueDisplay = document.getElementById(currentValueDisplay_id);

    this.$maxValueDisplay = null;

    this._maxValeuDisplayConfig = {
      className: "c_display__max_value",
      styleStatus: ["-off", "-on"],
      _state: false,
      set state(value) {
        this._state = value;

        counter.$maxValueDisplay.setAttribute(
          "class",
          this.className + this.styleStatus[this._state ? 1 : 0]
        );
      },
      get state() {
        return this._state;
      },
    };

    this.VALUE = (() => {
      const SUBSTITUTE_VALUE = 0;
      const displayValue = counter.$currentValueDisplay.textContent;

      if (!isNaN(displayValue)) {
        return Number(displayValue);
      }

      console.log(
        `> the display value was invalid, so it was changed to ${SUBSTITUTE_VALUE}.`
      );
      return 0;
    })();

    this.MAX_VALUE = (() => {
     if (counter.$maxValueDisplay) {
      const getValue_re = /^\/(\d+)/;

      if (getValue_re.test(
       counter.$maxValueDisplay.textContent)) {
        return Number(
         getValue_re.exec(counter.$maxValueDisplay.textContent)[1]
        );
       }
      }
    })();

    this._onupgrade = function (displays, counter) {
      const [$currentValueDisplay, $maxValueDisplay] = displays;

      $currentValueDisplay.textContent = counter.value;

      if ($maxValueDisplay) {
        $maxValueDisplay.textContent = `/${counter.maxValue}`;
      }
    };

    this._$button = {
      add: null,
      decrease: null,
      reset: null,
    };
  }

  set value(n) {
    isNumber(n, true);
    
    let number = n;

    this.VALUE = number;

    this._upgradeDisplay();
  }

  get value() {
    return this.VALUE;
  }

  set maxValue(n) {
    isNumber(n, true);

    if (this.$maxValueDisplay) {
      if (!this._maxValeuDisplayConfig.state) {
        this._maxValeuDisplayConfig.state = true;
      }
    } else {
      throw new Error(
        `> define the element that will be used to display the maximum value...`
      );
    }

    this.MAX_VALUE = n;

    this._upgradeDisplay();
  }

  get maxValue() {
    return this.MAX_VALUE;
  }

  set onupgrade(callback) {
    this._onupgrade = callback;
  }

  get onupgrade() {
    const counter = this;

    if (typeof this._onupgrade == "function") {
      return function () {
        counter._onupgrade(...arguments);
      };
    }

    return () => {};
  }

  set buttons(obj) {
    const counter = this;

    for (let [key, value] of Object.entries(obj)) {
      if (this._$button.hasOwnProperty(key)) {
       foundElementById(value.id);
        
       this._$button[key] = document.getElementById(value.id);

       this._$button[key].addEventListener(
        "click",
        (function (counter, value) {
         return function (event) {
           const callback = value.onclick;

           callback(counter, event);
         };
        })(this, value)
       );
      }
    }
  }

  get buttons() {
    return this._$button;
  }

  set maxValueDisplay(id) {
    foundElementById(id, true);

    const $display = document.getElementById(id);

    this.$maxValueDisplay = $display;

    this._maxValeuDisplayConfig.state = false;
  }

  add(n) {
   isNumber(n, true);
    
   if(this.value < this.maxValue) {
    let number = n;
    
    if (number < 0) {
     number = Math.abs(number);
    }

    this.value += number;
   }
  }

  decrease(n) {
    isNumber(n, true);

    if (this.value > 0) {
     let number = n;
     
     if (number < 0) {
      number = Math.abs(number);
     }

     this.value -= number;
    }
  }

  reset(toValue) {
   if (!toValue) {
    toValue = 0;
   }
   
   isNumber(toValue, true);
   
   if(this.value != toValue) {
    this.value = toValue;
   }
  }

  _upgradeDisplay() {
    if (typeof this._onupgrade == "function") {
      const callback = this.onupgrade;

      callback([this.$currentValueDisplay, this.$maxValueDisplay], this);
    }
  }
}

function isNumber(n, stop) {
  if (isNaN(n) && typeof n != "number") {
    if (stop) {
      throw new Error(`> "${n}" is not a number.`);
    }

    return false;
  }

  return true;
}

function foundElementById(id, stop) {
  if (!document.getElementById(id)) {
    if (stop) {
      throw new Error(`> element with id ${id} was not found..`);
    }

    return false;
  }

  return true;
}
