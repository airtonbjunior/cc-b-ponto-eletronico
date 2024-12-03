//console.log(JSON.parse(localStorage.getItem("register")));



function getPontos() {

    const containerRegisters = document.getElementById("registros-relatorio");

    fetch('http://localhost:3000/pontos/usuario/1')
    .then((metadata) => {
        console.log("Sucesso!");
        //console.log(metadata);
        return metadata.json();
    })
    .then((data) => {
        //console.log(data);
        data.forEach(ponto => {
            console.log(ponto);
            const divPonto = document.createElement("div");
            divPonto.innerHTML = `<p>Data/Hora: ${ponto.dataHora} | Tipo: ${ponto.tipo}</p><button id=btn_exclui_${ponto.id_ponto}>X</button>`;
            containerRegisters.appendChild(divPonto);
        })
    })
    .catch(error => {
        console.log(error)
    });

}



function renderList() {
    registers = JSON.parse(localStorage.getItem("register"));

    const containerRegisters = document.getElementById("registros-relatorio");


    registers.forEach(register => {
        console.log(register);
        const divRegistro = document.createElement("div");
        
        // [?]
        divRegistro.innerHTML = `<p>${register.data}</p>`;    

        //[?]
        // Último registro está correto? Por que?
        // data x date
        containerRegisters.appendChild(divRegistro);
    });

}

//renderList();

getPontos();