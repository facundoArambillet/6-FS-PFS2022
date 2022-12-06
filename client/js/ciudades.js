let ciudades = [];

function mostrarCiudades() {
    let html = "";
    let tabla = document.querySelector("#tablaCiudades")
    for (let i = 0; i < ciudades.length; i++) {
        html += `<tr>
        <td>${ciudades[i].idCiudad}</td>
        <td>${ciudades[i].nombre}</td>
        </tr>`
    }
    tabla.innerHTML = html;

}

async function loadCiudades() {
    ciudades = [];
    let respuesta = await fetch("/ciudad")

    if (respuesta.ok) {
        let json = await respuesta.json();
        ciudades = json;
    }
    console.log(ciudades)
    mostrarCiudades()
}

loadCiudades();