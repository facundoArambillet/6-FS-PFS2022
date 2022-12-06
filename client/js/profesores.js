let profesores = [];

function mostrarProfesores() {
    let html = "";
    let tabla = document.querySelector("#tablaProfesores")
    for (let i = 0; i < profesores.length; i++) {
        html += `<tr>
        <td>${profesores[i].idProfesor}</td>
        <td>${profesores[i].apellidoNombres}</td>
        </tr>`
    }
    tabla.innerHTML = html;

}

async function loadProfesores() {
    profesores = [];
    let respuesta = await fetch("/profesor")

    if (respuesta.ok) {
        let json = await respuesta.json();
        profesores = json;
    }
    console.log(profesores)
    mostrarProfesores()
}

loadProfesores();