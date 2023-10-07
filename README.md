# Counter

## Criando um contador

 Instancie a classe ```Counter``` para criar um novo objeto contador.
 
 ```
  import Counter from "./Counter.js";
 
  const counter = new Counter("id_do_elemento_HTML");
 ```  
 
 Configure os botões de interação.
 
 ```
  counter.buttons = {
   add: { //botão para incrementa o valor
    id: "id_do_elemento_HTML_button",
    onclick: function(counter,event) {
     //adiciona um número
     counter.add(1);
    }
   },
   decrease: { //botão para decrementar o valor
    id: "id_do_elemento_HTML_button",
    onclick: (counter,event) => {
     counter.decrease(1);
    }
   },
   reset: {
    id: "id_do_elemento_HTML_button",
    //redefini o valor para 0 ou algum valor que seja passado
    onclick: counter => counter.reset()
   }
  };
 ```
 
 Para adiciona um valor máximo/meta
 
 ```
  //adicione o display
  counter.maxValueDisplay = "id_do_elemento_HTML";
  
  //defina um valor de meta
  counter.maxValue = 100;
  
 ```