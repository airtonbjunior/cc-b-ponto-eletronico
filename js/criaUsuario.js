const btnCriaUsuario = document.getElementById("btn-criar-usuario");

btnCriaUsuario.addEventListener("click", async () => {

    const response = await fetch('http://localhost:3000/usuarios');

    console.log(response);

})