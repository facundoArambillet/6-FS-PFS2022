let params = [];
let ciudad = [];
let btnGuardar = document.querySelector("#btnGuardar");
btnGuardar.addEventListener("click",guardar);

function processParams() {
    let paramstr = window.location.search.substr(1);
    let paramarr = paramstr.split("&");
    for (let i = 0; i < paramarr.length; i++) {
        let tmparr = paramarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    
}
processParams();



document.querySelector("#idCiudad").value = params["idCiudad"];
params["nombre"]= params.nombre.replaceAll("%20"," ");
document.querySelector("#nombre").value = params["nombre"];

console.log(params)

async function guardar() {
    let valorId = document.querySelector("#idCiudad").value;
    let valorNombre = document.querySelector("#nombre").value;

    let renglon = {
        "idCiudad": Number(valorId),
        "nombre": valorNombre
    }

    let respuesta = await fetch("/ciudad", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(renglon)

        
    });
    if(respuesta.ok){
        ciudad.push(renglon);
        loadCiudades();
        console.log("Ciudad Actualizada")
    }
    else {
        console.log("Error en la Actualizacion")
    }

    async function loadCiudades() {
        ciudad = [];
        let respuesta = await fetch("/ciudad")
        console.log(respuesta)
        if (respuesta.ok) {
            let json = await respuesta.json();
            ciudad = json;
        }
    }

    loadCiudades();
}