//console.log(JSON.parse(localStorage.getItem("register")));


function renderList() {
    registers = JSON.parse(localStorage.getItem("register"));

    const containerRegisters = document.getElementById("registros-relatorio");


    registers.forEach(register => {
        console.log(register);

        // Padrão de apresentação
        // > 08/10/2024
        // Entrada | 08:00:35 | Obs | Anexo | Editar | Excluir

        // [!]
        // iterar a lista de registros e criar as entradas

        // [?]
        const divRegistro = document.createElement("div");
        
        // [?]
        divRegistro.innerHTML = `<p>${register.data}</p>`;    

        //[?]
        // Último registro está correto? Por que?
        // data x date
        containerRegisters.appendChild(divRegistro);
    });

}

renderList();