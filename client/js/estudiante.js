let estudiantes = [];

function mostrarEstudiantes() {
    let html = "";
    let tabla = document.querySelector("#tablaEstudiantes")
    for (let i = 0; i < estudiantes.length; i++) {
        html += `<tr>
        <td>${estudiantes[i].idEstudiante}</td>
        <td>${estudiantes[i].apellidoNombres}</td>
        <td>${estudiantes[i].fechaNacimiento}</td>
        </tr>`
    }
    tabla.innerHTML = html;

}

async function loadEstudiante() {
    estudiantes = [];
    let respuesta = await fetch("/estudiante")

    if (respuesta.ok) {
        let json = await respuesta.json();
        estudiantes = json;
    }
    console.log(estudiantes)
    mostrarEstudiantes()
}

loadEstudiante();