import Counter from "./modules/Counter.js";

const counter = new Counter("current_value_display");

const $addMaxValueButton = document.getElementById("add_max_value_button");

counter.maxValueDisplay = "max_value_display";

counter.buttons = {
 add: {
  id: "counter_button_add",
  onclick: function(counter){counter.add(1)}
 },
 decrease: {
  id: "counter_button_decrease",
  onclick: function(counter){counter.decrease(1)}
 },
 reset: {
  id: "counter_button_reset",
  onclick: function(counter){counter.reset()}
 }
};

$addMaxValueButton.onclick = () => {
 const maxValueAdditionPromptMessage = "\n\tadicione uma meta:",
 confirmationMessageForChangingTheMaxValue = "\n\ta meta atual é de %s, quer substituir?";
 
 setTimeout(() => {
  if(counter.maxValue == null) {
   setMaxValue();
  } else {
   if(window.confirm(
    confirmationMessageForChangingTheMaxValue.replace(
     /\%s/,
     counter.maxValue
    ))) {
    setMaxValue();
   }
 }},222)
 
 function setMaxValue() {
  let value = window.prompt(maxValueAdditionPromptMessage);
  
  value = Number(value);
  
  if(value <= 10e6) {
   counter.maxValue = value;
  }
 }
};