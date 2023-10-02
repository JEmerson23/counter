import Counter from "./modules/Counter.js";

const counter = new Counter("current_value_display");

counter.maxValueDisplay = "max_value_display";

counter.maxValue = 10;

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