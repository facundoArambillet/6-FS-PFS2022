let escuelas = [];
let buscar = document.querySelector("#btnBuscar");
let agregar = document.querySelector("#btnAgregar");

buscar.addEventListener("click", mostrarEscuela);
agregar.addEventListener("click", agregarEscuela);

function mostrarEscuelas() {
    let html = "";
    let tabla = document.querySelector("#tablaEscuelas")
    for (let i = 0; i < escuelas.length; i++) {
        html += `<tr>
        <td><a href="http://localhost:3000/escuelaDetail.html?idEscuela=${escuelas[i].idEscuela}&nombre=${escuelas[i].nombre}&domicilio=${escuelas[i].domicilio}&idCiudad=${escuelas[i].idCiudad}">${escuelas[i].idEscuela}</a> </td>
        <td>${escuelas[i].nombre}</td>
        <td>${escuelas[i].domicilio}</td>
        <td>${escuelas[i].idCiudad}</td>
        <td><button class= "btnBorrar">Borrar</button></td>
        </tr>`
    }
    tabla.innerHTML = html;
    deleteEscuela(".btnBorrar");
}

async function mostrarEscuela() {
    let html = "";
    let tabla = document.querySelector("#tablaEscuelas")
    let idBuscado = document.querySelector("#id").value
    let respuesta = await fetch(`/escuela/${idBuscado}`)
    if (respuesta.ok) {
        let json = await respuesta.json();
        escuelas = json;
        html += `<tr>
        <td><a href="http://localhost:3000/escuelaDetail.html?idEscuela=${escuelas[i].idEscuela}&nombre=${escuelas[i].nombre}&domicilio=${escuelas[i].domicilio}&idCiudad=${escuelas[i].idCiudad}">${escuelas[i].idEscuela}</a> </td>
        <td>${escuelas.nombre}</td>
        <td>${escuelas.domicilio}</td>
        <td>${escuelas.idCiudad}</td>
        <td><button class= "btnBorrar">Borrar</button></td>
        </tr>`
        tabla.innerHTML = html;
    }
}

async function agregarEscuela() {
    let idEscuela = document.querySelector("#idEscuela").value;
    let nombre = document.querySelector("#nombre").value;
    let domicilio = document.querySelector("#domicilio").value;
    let idCiudad = document.querySelector("#idCiudad").value;
    let renglon = {
        "idEscuela": Number(idEscuela),
        "nombre": nombre,
        "domicilio": domicilio,
        "idCiudad": Number(idCiudad)
    }
    console.log(renglon)
    let respuesta = await fetch("/escuela", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(renglon)
    })
    console.log(respuesta)
    if (respuesta.ok) {
        escuelas.push(renglon);
        console.log(escuelas);
        loadEscuelas();
    }
    else {
        console.log("Error");
    }
}

async function deleteEscuela(clase) {
    let btns = document.querySelectorAll(clase);

    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", async () => {
            let renglon = {
                "idEscuela": Number(i + 1)
            }
            let respuesta = await fetch("/escuela", {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(renglon)
            })
            if (respuesta.ok) {
                loadEscuelas();
                console.log("Escuela borrada");
            }
            else {
                console.log("Error en el borrado");
            }
        })
    }

}



async function loadEscuelas() {
    escuelas = [];
    let respuesta = await fetch("/escuela")

    if (respuesta.ok) {
        let json = await respuesta.json();
        escuelas = json;
    }
    console.log(escuelas);
    mostrarEscuelas();
}

loadEscuelas();