let params = [];
let estudiante = [];
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

document.querySelector("#idEstudiante").value = params["idEstudiante"];
params["apellidoNombres"]= params.apellidoNombres.replaceAll("%20"," ");
document.querySelector("#nombre").value = params["apellidoNombres"];
document.querySelector("#fecha").value = params["fechaNacimiento"];


async function guardar() {
    let valorId = document.querySelector("#idEstudiante").value;
    let valorNombre = document.querySelector("#nombre").value;
    let valorFecha = document.querySelector("#fecha").value;
    let renglon = {
        "idEstudiante": Number(valorId),
        "apellidoNombres": valorNombre,
        "fechaNacimiento": valorFecha
    }

    let respuesta = await fetch("/estudiante", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(renglon)

        
    });
    if(respuesta.ok){
        estudiante.push(renglon);
        loadEstudiante();
        console.log("Estudiante actualizado")
    }
    else {
        console.log("Error en la Actualizacion")
    }

    async function loadEstudiante() {
        estudiante = [];
        let respuesta = await fetch("/estudiante")
        if (respuesta.ok) {
            let json = await respuesta.json();
            estudiante = json;
        }
    }

    loadEstudiante();
}