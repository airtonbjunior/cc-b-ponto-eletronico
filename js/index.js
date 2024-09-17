// TO-DO:
// Organizar código-fonte,

const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");

const btnBaterPonto = document.getElementById("btn-bater-ponto");
btnBaterPonto.addEventListener("click", register);

const dialogPonto = document.getElementById("dialog-ponto");

const btnDialogFechar = document.getElementById("btn-dialog-fechar");
btnDialogFechar.addEventListener("click", () => {
    dialogPonto.close();
});


let registerLocalStorage = getRegisterLocalStorage();

const dialogData = document.getElementById("dialog-data");
const dialogHora = document.getElementById("dialog-hora");

const divAlertaRegistroPonto = document.getElementById("alerta-registro-ponto");


diaSemana.textContent = getWeekDay();
diaMesAno.textContent = getCurrentDate();


// TO-DO:
// Por que esta função não retorna a localização?
// [doc]
function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
        return position;
    });
}


const typeRegister = document.getElementById("tipos-ponto");

const btnDialogBaterPonto = document.getElementById("btn-dialog-bater-ponto");
btnDialogBaterPonto.addEventListener("click", () => {

    let lastTypeRegister = localStorage.getItem("lastTypeRegister");

    // TO-DO:
    // Pq o select não está com a option correspondente?
    if(lastTypeRegister == "entrada") {
        console.log("lastTypeRegister é entrada");
        typeRegister.value = "intervalo";
    }
    if(lastTypeRegister == "intervalo") {
        typeRegister.value = "volta-intervalo";
    }
    if(lastTypeRegister == "volta-intervalo") {
        typeRegister.value = "saida";
    }
    if(lastTypeRegister == "saida") {
        typeRegister.value = "entrada"
    }

    let ponto = {
        "data": getCurrentDate(),
        "hora": getCurrentHour(),
        "localizacao": getCurrentPosition(),
        "id": 1,
        "tipo": typeRegister.value
    }

    console.log(ponto);

    saveRegisterLocalStorage(ponto);

    localStorage.setItem("lastTypeRegister", typeRegister.value);
    localStorage.setItem("lastDateRegister", ponto.data);
    localStorage.setItem("lastTimeRegister", ponto.hora);

    dialogPonto.close();

    // TO-DO:
    // CRIAR UM ALERTA NO TOPO DA PÁGINA PRINCIPAL PARA CONFIRMAR O REGISTRO DE PONTO
    // DEVE FICAR ABERTO POR 3 SEGUNDOS E DEVE TER UM EFEITO DE TRANSIÇÃO
    // DEVE PODER SER FECHADO PELO USUÁRIO QUE NÃO QUISER AGUARDAR 3s
    // DEVE MOSTRAR UMA MENSAGEM DE SUCESSO AO REGISTRAR O PONTO
    // CASO OCORRA ALGUM ERRO, MOSTRAR NO ALERTA 
    // AS CORES DEVEM SER DIFERENTES EM CASO DE SUCESSO/ERRO/ALERTA

    divAlertaRegistroPonto.classList.remove("hidden");
    divAlertaRegistroPonto.classList.add("show");
    
    // TO-DO:
    // fazer um efeito de transição para o alerta

    setTimeout(() => {
        divAlertaRegistroPonto.classList.remove("show");
        divAlertaRegistroPonto.classList.add("hidden");
    }, 5000);

});


function saveRegisterLocalStorage(register) {
    registerLocalStorage.push(register); // Array
    localStorage.setItem("register", JSON.stringify(registerLocalStorage));
} 


// Esta função deve retornar sempre um ARRAY, mesmo que seja vazio
function getRegisterLocalStorage() {
    let registers = localStorage.getItem("register");

    if(!registers) {
        return [];
    }

    return JSON.parse(registers); // converte de JSON para Array
}


// TO-DO:
// alterar o nome da função
function register() {
    // TO-DO:
    // Atualizar hora a cada segundo e data 00:00:00
    dialogData.textContent = "Data: " + getCurrentDate();
    dialogHora.textContent = "Hora: " + getCurrentHour();

    let lastRegisterText = "Último registro: " + localStorage.getItem("lastDateRegister") + " - " + localStorage.getItem("lastTimeRegister") + " | " + localStorage.getItem("lastTypeRegister")
    document.getElementById("dialog-last-register").textContent = lastRegisterText;

    dialogPonto.showModal();

    console.log(localStorage.getItem("lastTypeRegister"));
}

function getWeekDay() {
    const date = new Date();
    let days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    return days[date.getDay()];
}

function getCurrentHour() {
    const date = new Date();
    return String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0') + ":" + String(date.getSeconds()).padStart(2, '0');
}


function getCurrentDate() {
    // TO-DO:
    // Alterar a solução para considerar padStart ou slice
    // Considerar formatos diferentes da data, conforme localização
    // do usuário dd/mm/aaaa, mm/dd/aaaa, aaaa/mm/dd, aaaa.mm.dd
    // Verificar se no Date() há algum método que possa auxiliar
    // locale
    const date = new Date();
    let month = date.getMonth();
    let day = date.getDate();
    if (day < 10) {
        day = "0" + day
    }
    if (month < 10) {
        month = "0" + (month + 1)
    }
    return day + "/" + month + "/" + date.getFullYear();
}

function printCurrentHour() {
    horaMinSeg.textContent = getCurrentHour();
}


printCurrentHour();
setInterval(printCurrentHour, 1000);