let profesores = [];
let buscar = document.querySelector("#btnBuscar");
let agregar = document.querySelector("#btnAgregar");

buscar.addEventListener("click", mostrarProfesor);
agregar.addEventListener("click", agregarProfesor);


function mostrarProfesores() {
    let html = "";
    let tabla = document.querySelector("#tablaProfesores");
    let input = document.querySelector("#idProfesor");
    for (let i = 0; i < profesores.length; i++) {
        html += `<tr>
        <td><a href="http://localhost:3000/profesorDetail.html?idProfesor=${profesores[i].idProfesor}&apellidoNombres=${profesores[i].apellidoNombres}">${profesores[i].idProfesor}</a> </td>
        <td>${profesores[i].apellidoNombres}</td>
        <td><button class= "btnBorrar" value="${profesores[i].idProfesor}">Borrar</button></td>
        </tr>`
        input.value = (profesores[i].idProfesor +1);
    }
    tabla.innerHTML = html;
    deleteProfesor(".btnBorrar");
}

async function mostrarProfesor() {
    let html = "";
    let tabla = document.querySelector("#tablaProfesores")
    let idBuscado = document.querySelector("#id").value
    let respuesta = await fetch(`/profesor/${idBuscado}`)
    if(respuesta.ok) {
        let json = await respuesta.json();
        profesores = json;
        html += `<tr>
        <td><a href="http://localhost:3000/profesorDetail.html?idProfesor=${profesores[i].idProfesor}&apellidoNombres=${profesores[i].apellidoNombres}">${profesores[i].idProfesor}</a> </td>
        <td>${profesores.apellidoNombres}</td>
        <td><button class= "btnBorrar" value="${profesores[i].idProfesor}">Borrar</button></td>
        </tr>`
        tabla.innerHTML = html;
    }
}

async function agregarProfesor() {
    let idProfesor = document.querySelector("#idProfesor").value;
    let nombre = document.querySelector("#nombre").value;
    let renglon = {
        "idProfesor": idProfesor,
        "apellidoNombres": nombre
    }
    let respuesta = await fetch("/profesor", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(renglon)
    })
    if (respuesta.ok) {
        profesores.push(renglon);
        console.log(profesores);
        loadProfesores();
    }
    else {
        console.log("Error");
    }
}

async function deleteProfesor(clase) {
    let btns = document.querySelectorAll(clase);

    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", async () => {
            let respuesta = await fetch(`/profesor/${btns[i].value}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            })
            if (respuesta.ok) {
                loadProfesores();
                console.log("Profesor borrado");
            }
            else {
                console.log("Error en el borrado");
            }
        })
    }

}

async function loadProfesores() {
    profesores = [];
    let respuesta = await fetch("/profesor")

    if (respuesta.ok) {
        let json = await respuesta.json();
        profesores = json;
    }
    console.log(profesores);
    mostrarProfesores();
}

loadProfesores();