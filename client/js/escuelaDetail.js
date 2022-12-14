let params = [];
let escuela = [];
let btnGuardar = document.querySelector("#btnGuardar");
btnGuardar.addEventListener("click",guardar);

function processParams() {
    let paramstr = window.location.search.substr(1);
    let paramarr = paramstr.split("&");
    for (let i = 0; i < paramarr.length; i++) {
        let tmparr = paramarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    crearOptionsCiudades();
    
}

async function crearOptionsCiudades() {
    let section = document.querySelector("#ciudades");
    section.innerHTML = "";
    let respuesta = await fetch(`/ciudad/ciudades/ASC`);
    if (respuesta.ok) {
        let ciudades = await respuesta.json();
        for (let i = 0; i < ciudades.length; i++) {
            let option = document.createElement("option");
            option.innerHTML = ciudades[i].nombre;
            option.value = ciudades[i].idCiudad;
            if(option.value == params.idCiudad) {
                option.setAttribute("selected" , true)
            }
            section.appendChild(option);

        }
    }
}

processParams();

document.querySelector("#idEscuela").value = params["idEscuela"];
params["nombre"]= params.nombre.replaceAll("%20"," ");
document.querySelector("#nombre").value = params["nombre"];
params["domicilio"]= params.domicilio.replaceAll("%20"," ");
document.querySelector("#domicilio").value = params["domicilio"];
document.querySelector("#ciudades").value = params["idCiudad"];

console.log(params)

async function guardar() {
    let valorIdEscuela = document.querySelector("#idEscuela").value;
    let valorNombre = document.querySelector("#nombre").value;
    let valorDomicilio = document.querySelector("#domicilio").value;
    let valorIdCiudad = document.querySelector("#ciudades").value;
    let renglon = {
        "idEscuela": Number(valorIdEscuela),
        "nombre": valorNombre,
        "domicilio" : valorDomicilio,
        "idCiudad": valorIdCiudad
    }
    console.log(renglon)
    let respuesta = await fetch(`/escuela/${params["idEscuela"]}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(renglon)

        
    });
    if(respuesta.ok){
        escuela.push(renglon);
        loadEscuelas();
        console.log("Ciudad Actualizada")
    }
    else {
        console.log("Error en la Actualizacion")
    }

    async function loadEscuelas() {
        escuela = [];
        let respuesta = await fetch("/escuela")
        console.log(respuesta)
        if (respuesta.ok) {
            let json = await respuesta.json();
            escuela = json;
        }
        
    }

    loadEscuelas();
}