let params = [];
let clase = [];
let btnGuardar = document.querySelector("#btnGuardar");
btnGuardar.addEventListener("click",guardar);

function processParams() {
    let paramstr = window.location.search.substr(1);
    let paramarr = paramstr.split("&");
    for (let i = 0; i < paramarr.length; i++) {
        let tmparr = paramarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    crearOptionsEscuelas();
    crearOptionsProfesores();
    crearlistaEstudiantes();
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
            if(option.value == params.idEscuela) {
                option.setAttribute("selected" , true)
            }
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
            if(option.value == params.idProfesor) {
                option.setAttribute("selected" , true)
            }
            section.appendChild(option);
        }
    }
}

function crearlistaEstudiantes() {
    let divEstudiantes = document.querySelector("#estudiantes");
    if(params.Estudiantes) {
        let ulEstudiantes = document.createElement("ul");
        ulEstudiantes.id = "ulEstudiantes";
        ulEstudiantes.innerHTML = "";
        let estudiantes = params["Estudiantes"] = params.Estudiantes.replaceAll("%20"," ").split(",");
        console.log(estudiantes)
        for(let i = 0; i < estudiantes.length; i++) {
            let liEstudiantes = document.createElement("li");
            liEstudiantes.innerHTML = estudiantes[i];
            ulEstudiantes.appendChild(liEstudiantes);
            divEstudiantes.appendChild(ulEstudiantes);
        }
    }
    else {
        let parrafo = document.createElement("p");
        parrafo.innerText = "Esta clase no posee estudiantes";
        divEstudiantes.appendChild(parrafo);
    }


}

processParams();

document.querySelector("#idClase").value = params["idClase"];
params["nombre"]= params.nombre.replaceAll("%20"," ");
document.querySelector("#nombre").value = params["nombre"];
document.querySelector("#escuelas").value = params["idEscuela"];
document.querySelector("#profesores").value = params["idProfesores"];


async function guardar() {
    let valorIdClase = document.querySelector("#idClase").value;
    let valorNombre = document.querySelector("#nombre").value;
    let valorEscuelas = document.querySelector("#escuelas").value;
    let valorProfesores = document.querySelector("#profesores").value;
    let renglon = {
        "idEscuela": Number(valorIdClase),
        "nombre": valorNombre,
        "idEscuela" : Number(valorEscuelas),
        "idProfesor": Number(valorProfesores)
    }
    console.log(renglon)
    let respuesta = await fetch(`/clase/${params["idClase"]}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(renglon)

        
    });
    if(respuesta.ok){
        clase.push(renglon);
        loadClases();
        console.log("Clase Actualizada")
    }
    else {
        console.log("Error en la Actualizacion")
    }
}
    async function loadClases() {
        clase = [];
        let respuesta = await fetch("/clase");
        if (respuesta.ok) {
            let json = await respuesta.json();
            clase = json;
        }
        
    }

    loadClases();
