class Counter {
 constructor(display_id) {
  const counter = this;
  this.$display = document.getElementById(display_id);
  
  this.VALUE = (()=>{
   const SUBSTITUTE_VALUE = 0;
   const displayValue = counter.$display.textContent;
   
   if(!isNaN(displayValue)) {
    return SUBSTITUTE_VALUE;
   }
   
   console.log(`> the display value was invalid, so it was changed to ${SUBSTITUTE_VALUE}.`);
   return 0;
  })();
 }
  
 set value(n) {
  if(isNaN(n)) {
   console.log(`> ${n} is not a number.`);
   return;
  }
  
  this.VALUE = n;
  this._upgradeDisplay();
 }
 
 get value() {
  return this.VALUE;
 }
 
 add(n) {
  if(isNaN(n)){throw new Error(`> ${n} is not a number...`);}
  
  let number = n;
  
  if(number < 0) {
   number = Math.abs(number);
  }
  
  this.value += number;
 }
 
 decrease(n) {
  if(isNaN(n)){throw new Error(`> ${n} is not a number...`);}
  
  let number = n;
  
  if(number < 0) {
   number = Math.abs(number);
  }
  
  this.value -= number;
 }
 
 reset(toValue) {
  if(!toValue) {toValue = 0;}
  
  this.value = toValue;
 }
 
 _upgradeDisplay() {
  this.$display.textContent = this.value;
 }
  
}

const counter = new Counter("counter_display"), 
counterButton = {
 add: document.getElementById("counter_button_add"),
 decrease: document.getElementById("counter_button_decrease"),
 reset: document.getElementById("counter_button_reset")
};

counterButton.add.onclick = () => {
 counter.add(1);
};

counterButton.decrease.onclick = () => {
 counter.decrease(1);
};

counterButton.reset.onclick = () => {
 counter.reset();
};