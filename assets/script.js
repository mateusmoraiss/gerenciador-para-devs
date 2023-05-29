const form = document.querySelector("form");
const input = document.querySelector("#input-tarefa");
const listaAFazer = document.querySelector("#a-fazer");
const listaFeitas = document.querySelector("#feitas");
const contador = document.querySelector("#contador");
const botaoTodas = document.querySelector("#botao-todas");
const botaoAFazer = document.querySelector("#botao-a-fazer");
const botaoFeitas = document.querySelector("#botao-feitas");
const botaoLimparFeitas = document.querySelector("#botao-limpar");
const checkboxTodos = document.querySelector("#checkbox-todos");

function atualizarContador() {
    const contagem = listaAFazer.querySelectorAll("li").length;

    if(contagem === 1) {
        contador.innerText = "1 Task";
    } else {
        contador.innerText = `${contagem} Tasks`;
    };
}

function atualizarCheckboxGeral() {
    const contagemAFazer = listaAFazer.querySelectorAll("li").length;
    const contagemFeitas = listaFeitas.querySelectorAll("li").length;

    if(contagemAFazer === 0 && contagemFeitas > 0) {
        checkboxTodos.checked = true;
    } else {
        checkboxTodos.checked = false;
    };

    atualizarContador();
}

function marcarComoFeita(event) {
    const checkbox = event.target;
    const tarefa = checkbox.closest("li");

    if(checkbox.checked) {
        listaFeitas.append(tarefa);
    } else {
        listaAFazer.append(tarefa);
    };

    atualizarContador();
    atualizarCheckboxGeral();
}

function deletarTarefa(event) {
    const deleteButton = event.target;
    const tarefa = deleteButton.closest("li");

    tarefa.remove();

    atualizarContador();
    atualizarCheckboxGeral();
}

form.addEventListener("submit", event => {
    event.preventDefault();

    const tarefa = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.addEventListener("input", marcarComoFeita);

    const span = document.createElement("span");
    span.innerText = input.value;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Deletar";
    deleteButton.addEventListener("click", deletarTarefa);

    tarefa.append(checkbox);
    tarefa.append(span);
    tarefa.append(deleteButton);

    listaAFazer.append(tarefa);

    input.value = "";
    
    atualizarContador();
    atualizarCheckboxGeral();
})

checkboxTodos.addEventListener("click", () => {

    if(checkboxTodos.checked) {
        const aFazer = listaAFazer.querySelectorAll("li");

        for(const tarefa of aFazer) {
            listaFeitas.append(tarefa);

            const checkbox = tarefa.querySelector("input");
            checkbox.checked = true;
        };
    } else {
        const feitas = listaFeitas.querySelectorAll("li");

        for(const tarefa of feitas) {
            listaAFazer.append(tarefa);

            const checkbox = tarefa.querySelector("input");
            checkbox.checked = false;
        };
    };

    atualizarContador();
})

botaoTodas.addEventListener("click", () => {
    listaAFazer.removeAttribute("hidden");
    listaFeitas.removeAttribute("hidden");

    botaoAFazer.classList.remove("ativo");
    botaoFeitas.classList.remove("ativo");
    botaoTodas.classList.add("ativo");
})

botaoAFazer.addEventListener("click", () => {
    listaAFazer.removeAttribute("hidden");
    listaFeitas.setAttribute("hidden", "");

    botaoAFazer.classList.add("ativo");
    botaoFeitas.classList.remove("ativo");
    botaoTodas.classList.remove("ativo");
})

botaoFeitas.addEventListener("click", () => {
    listaAFazer.setAttribute("hidden", "");
    listaFeitas.removeAttribute("hidden");

    botaoAFazer.classList.remove("ativo");
    botaoFeitas.classList.add("ativo");
    botaoTodas.classList.remove("ativo");
})

botaoLimparFeitas.addEventListener("click", () => {
    const completas = listaFeitas.querySelectorAll("li");
    
    for(tarefa of completas) {
        tarefa.remove();
    };

    atualizarCheckboxGeral();
})

// BOTOES DE DOWNLOAD

let tarefasFeitas = [];

function marcarComoFeita(event) {
    const checkbox = event.target;
    const tarefa = checkbox.closest("li");

    if(checkbox.checked) {
        // Adiciona a tarefa ao array de tarefas feitas
        tarefasFeitas.push({
            texto: tarefa.querySelector("span").innerText,
            data: new Date()
        });
        listaFeitas.append(tarefa);
    } else {
        listaAFazer.append(tarefa);
    };

    atualizarContador();
    atualizarCheckboxGeral();
}

document.getElementById("download-json-btn").addEventListener("click", function(){
    var data = JSON.stringify(tarefasFeitas);
    var blob = new Blob([data], {type: 'application/json'});
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'tarefas.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });

  document.getElementById("download-txt-btn").addEventListener("click", function(){
    var data = tarefasFeitas.map(function(tarefa) {
      return tarefa.texto + " - " + tarefa.data.toLocaleDateString() + " " + tarefa.data.toLocaleTimeString();
    }).join("\n");
    var blob = new Blob([data], {type: 'text/plain'});
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'tarefas.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });

//
var typed = new Typed('.element', {
    strings: ['<h1> Fala Dev </h1>',  ' <h1>Nunca deixe para amanhã</h1>', ' <h1>Oque você pode atribuir a um robô.</h1>',
    ' <h1>Hora de codar! =)</h1>'],
    typeSpeed: 70,
    backSpeed: 50,
    loop: false,
    startDelay: 5500, // atraso de 1 segundo (1000 milissegundos)
    showCursor: false
  });
  

  var typed = new Typed('.frase', {
    strings: ['<h1> Fala Dev </h1>',  ' <h1>JEQUITI</h1>',''],
    typeSpeed: 20,
    backSpeed: 10,
    loop: false,
    startDelay: 25000,
    showCursor: false // atraso de 1 segundo (1000 milissegundos)
  });
  
