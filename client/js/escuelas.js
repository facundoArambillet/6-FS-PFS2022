let escuelas = [];

function mostrarEscuelas() {
    let html = "";
    let tabla = document.querySelector("#tablaEscuelas")
    for (let i = 0; i < escuelas.length; i++) {
        html += `<tr>
        <td>${escuelas[i].idEscuela}</td>
        <td>${escuelas[i].nombre}</td>
        <td>${escuelas[i].domicilio}</td>
        <td>${escuelas[i].idCiudad}</td>
        </tr>`
    }
    tabla.innerHTML = html;

}

async function loadEscuelas() {
    escuelas = [];
    let respuesta = await fetch("/escuela")

    if (respuesta.ok) {
        let json = await respuesta.json();
        escuelas = json;
    }
    console.log(escuelas)
    mostrarEscuelas()
}

loadEscuelas();