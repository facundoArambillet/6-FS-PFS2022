let params = [];
let profesor = [];
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


document.querySelector("#idProfesor").value = params["idProfesor"];
params["apellidoNombres"]= params.apellidoNombres.replaceAll("%20"," ");
document.querySelector("#nombre").value = params["apellidoNombres"];


async function guardar() {
    let valorId = document.querySelector("#idProfesor").value;
    let valorNombre = document.querySelector("#nombre").value;

    let renglon = {
        "idProfesor": Number(valorId),
        "apellidoNombres": valorNombre
    }

    let respuesta = await fetch("/profesor", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(renglon)

        
    });
    if(respuesta.ok){
        profesor.push(renglon);
        loadProfesores();
        console.log("Profesor actualizado")
    }
    else {
        console.log("Error en la Actualizacion")
    }

    async function loadProfesores() {
        profesor = [];
        let respuesta = await fetch("/profesor")
        if (respuesta.ok) {
            let json = await respuesta.json();
            profesor = json;
        }
    }

    loadProfesores();
}