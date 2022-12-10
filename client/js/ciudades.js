
let ciudades = [];
let buscar = document.querySelector("#btnBuscar");
let agregar = document.querySelector("#btnAgregar");

buscar.addEventListener("click", mostrarCiudad);
agregar.addEventListener("click", agregarCiudad);


function mostrarCiudades() {
    let html = "";
    let tabla = document.querySelector("#tablaCiudades")
    for (let i = 0; i < ciudades.length; i++) {
        html += `<tr>
        <td><a href="http://localhost:3000/ciudadDetail.html?idCiudad=${ciudades[i].idCiudad}&nombre=${ciudades[i].nombre}">${ciudades[i].idCiudad}</a> </td>
        <td>${ciudades[i].nombre}</td>
        <td><button class= "btnBorrar" pos="${i}">Borrar</button></td>
        </tr>`;
    }
    tabla.innerHTML = html;
    deleteCiudad(".btnBorrar");
    //updateCiudad(".btnActualizar");
}

async function mostrarCiudad() {
    let html = "";
    let tabla = document.querySelector("#tablaCiudades")
    let idBuscado = document.querySelector("#id").value
    let respuesta = await fetch(`/ciudad/${idBuscado}`)
    if (respuesta.ok) {
        let json = await respuesta.json();
        ciudades = json;
        html += `<tr>
        <td>${ciudades.idCiudad}</td>
        <td>${ciudades.nombre}</td>
        <td><button class= "btnBorrar">Borrar</button></td>
        <td><button class= "btnActualizar">Actualizar</button></td>
        </tr>`;
        tabla.innerHTML = html;
    }
}

async function agregarCiudad() {
    let idCiudad = document.querySelector("#id").value;
    let nombre = document.querySelector("#nombre").value;
    let renglon = {
        "idCiudad": Number(idCiudad),
        "nombre": nombre
    }
    console.log(renglon)
    let respuesta = await fetch("/ciudad", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(renglon)
    })
    console.log(respuesta)
    if (respuesta.ok) {
        ciudades.push(renglon);
        console.log(ciudades);
        loadCiudades();
    }
    else {
        console.log("Error");
    }
}

async function deleteCiudad(clase) {
    let btns = document.querySelectorAll(clase);

    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", async () => {
            let renglon = {
                "idCiudad": Number(i + 1)
            }
            let respuesta = await fetch("/ciudad", {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(renglon)
            })
            if (respuesta.ok) {
                loadCiudades();
                console.log("Ciudad borrada");
            }
            else {
                console.log("Error en el borrado");
            }
        })
    }

}

/*
async function updateCiudad() {
    let btns = document.querySelectorAll(clase);
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", async () => {
            let renglon = {
                "idCiudad": Number(i + 1)
            }
            let respuesta = await fetch("/ciudad", {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(renglon)
            })
            if (respuesta.ok) {
                loadCiudades();
                console.log("Ciudad Actualizada");
            }
            else {
                console.log("Error en la Actualizacion");
            }
        })
    }
}
*/

async function loadCiudades() {
    ciudades = [];
    let respuesta = await fetch("/ciudad")
    console.log(respuesta)
    if (respuesta.ok) {
        let json = await respuesta.json();
        ciudades = json;
    }
    mostrarCiudades();
}

loadCiudades();