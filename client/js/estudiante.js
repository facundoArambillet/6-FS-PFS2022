let estudiantes = [];
let buscar = document.querySelector("#btnBuscar");
let agregar = document.querySelector("#btnAgregar");

buscar.addEventListener("click", mostrarEstudiante);
agregar.addEventListener("click", agregarEstudiante);

function mostrarEstudiantes() {
    let html = "";
    let tabla = document.querySelector("#tablaEstudiantes")
    for (let i = 0; i < estudiantes.length; i++) {
        html += `<tr>
        <td><a href="http://localhost:3000/estudianteDetail.html?idEstudiante=${estudiantes[i].idEstudiante}&apellidoNombres=${estudiantes[i].apellidoNombres}&fechaNacimiento=${estudiantes[i].fechaNacimiento}">${estudiantes[i].idEstudiante}</a> </td>
        <td>${estudiantes[i].apellidoNombres}</td>
        <td>${estudiantes[i].fechaNacimiento}</td>
        <td><button class= "btnBorrar">Borrar</button></td>
        </tr>`
    }
    tabla.innerHTML = html;
    deleteEstudiante(".btnBorrar")
}

async function mostrarEstudiante() {
    let html = "";
    let tabla = document.querySelector("#tablaEstudiantes")
    let idBuscado = document.querySelector("#id").value
    let respuesta = await fetch(`/estudiante/${idBuscado}`)
    if(respuesta.ok) {
        let json = await respuesta.json();
        estudiantes = json;
        html += `<tr>
        <td><a href="http://localhost:3000/estudianteDetail.html?idEstudiante=${estudiantes[i].idEstudiante}&apellidoNombres=${estudiantes[i].apellidoNombres}&fechaNacimiento=${estudiantes[i].fechaNacimiento}">${estudiantes[i].idEstudiante}</a> </td>
        <td>${estudiantes.apellidoNombres}</td>
        <td>${estudiantes.fechaNacimiento}</td>
        <td><button class= "btnBorrar">Borrar</button></td>
        </tr>`
        tabla.innerHTML = html;
    }
}

async function agregarEstudiante() {
    let idEstudiante = document.querySelector("#idEstudiante").value;
    let nombre = document.querySelector("#nombre").value;
    let fechaNacimiento = document.querySelector("#fechaNacimiento").value;
    let renglon = {
        "idEstudiante": Number(idEstudiante),
        "apellidoNombres": nombre,
        "fechaNacimiento": fechaNacimiento
    }
    let respuesta = await fetch("/estudiante", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(renglon)
    })
    if (respuesta.ok) {
        estudiantes.push(renglon);
        console.log(estudiantes);
        loadEstudiante();
    }
    else {
        console.log("Error");
    }
}

async function deleteEstudiante(clase) {
    let btns = document.querySelectorAll(clase);

    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", async () => {
            let renglon = {
                "idEstudiante": Number(i + 1)
            }
            let respuesta = await fetch("/estudiante", {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(renglon)
            })
            if (respuesta.ok) {
                loadEstudiante();
                console.log("Estudiante borrada");
            }
            else {
                console.log("Error en el borrado");
            }
        })
    }

}


async function loadEstudiante() {
    estudiantes = [];
    let respuesta = await fetch("/estudiante")

    if (respuesta.ok) {
        let json = await respuesta.json();
        estudiantes = json;
    }
    console.log(estudiantes);
    mostrarEstudiantes();
}

loadEstudiante();