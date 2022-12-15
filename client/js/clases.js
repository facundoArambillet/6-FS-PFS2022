let clases = [];
let buscar = document.querySelector("#btnBuscar");
let agregar = document.querySelector("#btnAgregar");

buscar.addEventListener("click", mostrarClase);
agregar.addEventListener("click", agregarClase);

function mostrarClases() {
    let html = "";
    let tabla = document.querySelector("#tablaClases");
    let input = document.querySelector("#idClases");
    for (let i = 0; i < clases.length; i++) {

        let nombreEstudiantes = cargarEstudiantesUrl(clases[i].estudiantes);
        html += `<tr>
        <td><a href="http://localhost:3000/claseDetail.html?idClase=${clases[i].idClase}&nombre=${clases[i].nombre}&idEscuela=${clases[i].escuelaIdEscuela}&idProfesor=${clases[i].profesorIdProfesor}&Estudiantes=${nombreEstudiantes}">${clases[i].idClase}</a> </td>
        <td>${clases[i].nombre}</td>
        <td>${clases[i].escuela.nombre}</td>
        <td>${clases[i].profesor.apellidoNombres}</td>
        <td><button class= "btnBorrar" value="${clases[i].idClase}">Borrar</button></td>
        </tr>`
        input.value = (clases[i].idClase + 1);
    }

    tabla.innerHTML = html;
    deleteClase(".btnBorrar");
    crearOptionsEscuelas();
    crearOptionsProfesores();

}

function cargarEstudiantesUrl(arr) {
    nombreEstudiantes = '';
    for (let i = 0; i < arr.length; i++) {
        if (i !== arr.length - 1) {
            nombreEstudiantes += arr[i]?.apellidoNombres + ','
        } else {
            nombreEstudiantes += arr[i]?.apellidoNombres;
        }
    }
    return nombreEstudiantes;
}
async function mostrarClase() {
    let html = "";
    let tabla = document.querySelector("#tablaClases");
    let idBuscado = document.querySelector("#id").value;
    let respuesta = await fetch(`/clase/${idBuscado}`);
    if (respuesta.ok) {
        let json = await respuesta.json();
        clases = json;
        html += `<tr>
        <td><a href="http://localhost:3000/claseDetail.html?idClase=${clases[i].idClase}&nombre=${clases[i].nombre}&idEscuela=${clases[i].escuelaIdEscuela}&idProfesor=${clases[i].profesorIdProfesor}&idEstudiantes=${clases[i].estudiantes}">${clases[i].idClase}</a> </td>
        <td>${clases.nombre}</td>
        <td>${clases.escuela.nombre}</td>
        <td>${clases.profesor.nombre}</td>
        <td><button class= "btnBorrar" value="${clases[i].idClase}">Borrar</button></td>
        </tr>`
        input.value = (clases[i].idClase + 1);
        tabla.innerHTML = html;
    }
}

async function crearOptionsEscuelas() {
    let section = document.querySelector("#escuelas");
    section.innerHTML = "";
    let respuesta = await fetch(`/escuela/escuelas/ASC`);
    if (respuesta.ok) {
        let escuelas = await respuesta.json();
        for (let i = 0; i < escuelas.length; i++) {
            let option = document.createElement("option");
            option.innerHTML = escuelas[i].nombre;
            option.value = escuelas[i].idEscuela;
            section.appendChild(option);

        }
    }
}

async function crearOptionsProfesores() {
    let section = document.querySelector("#profesores");
    section.innerHTML = "";
    let respuesta = await fetch(`/profesor/profesores/ASC`);
    if (respuesta.ok) {
        let profesores = await respuesta.json();
        for (let i = 0; i < profesores.length; i++) {
            let option = document.createElement("option");
            option.innerHTML = profesores[i].apellidoNombres;
            option.value = profesores[i].idProfesor;
            section.appendChild(option);
        }
    }
}

async function agregarClase() {
    let idClase = document.querySelector("#idClases").value;
    let nombre = document.querySelector("#nombre").value;
    let idEscuela = document.querySelector("#escuelas").value;
    let idProfesor = document.querySelector("#profesores").value;
    let renglon = {
        "idClase": idClase,
        "nombre": nombre,
        "idEscuela": idEscuela,
        "idProfesor": idProfesor
    }
    console.log(renglon)
    let respuesta = await fetch("/clase", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(renglon)
    })
    console.log(respuesta)
    if (respuesta.ok) {
        clases.push(renglon);
        console.log(escuelas);
        loadClases();
    }
    else {
        console.log("Error");
    }
}

async function deleteClase(clase) {
    let btns = document.querySelectorAll(clase);

    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", async () => {
            let respuesta = await fetch(`/clase/${btns[i].value}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            })
            if (respuesta.ok) {
                loadClases();
                console.log("Clase borrada");
            }
            else {
                console.log("Error en el borrado");
            }
        })
    }

}



async function loadClases() {
    clases = [];
    let respuesta = await fetch("/clase");
    if (respuesta.ok) {
        let json = await respuesta.json();
        clases = json;
        console.log(clases)
    }
    mostrarClases();
}
loadClases();