var DateTime = luxon.DateTime;

function cotizarMentorSeleccionado(){
    textArea.value = "";
    nombreMentor = document.getElementById("mentoresListForm").value;

    if(nombreMentor != ""){
        let index = arregloMentores.findIndex(x => x.nombre == nombreMentor);
        let costoFinal = arregloMentores[index].costo;
        costoFinal = costoFinal*1.16;
        costoFinal = Math.round(costoFinal);
        textArea.value = "Usuario: " +sessionStorage.getItem("usuario")+ "\n\nEl costo es $" +costoFinal+ " pesos con IVA. Por 2 horas de Mentoría con " +nombreMentor;    
    }
    else{
        textArea.value= "Seleccione una opción válida."
    }
}

function ordenarNombres(){
    randomBackground();

    arregloMentores.forEach(element => {
        ordenarNombresArr = arregloMentores.sort((a, b) => a.nombre.localeCompare(b.nombre));
    });
    
    let infoDiv = document.getElementsByClassName("infoMentor");
    let i = 0;
    for (const x of ordenarNombresArr) {
        infoDiv[i].innerHTML = '<h3 class="titulosMentores">'+x.nombre+"</h3><ul><li>Industria: "+x.area+"</li><li>Costo: $"+x.costo+"</li></ul>";
        i++;
    }
}

function ordenarCostos(){
    randomBackground();

    arregloMentores.forEach(element => {
        ordenarCostosArr = arregloMentores.sort((a, b) => a.costo - b.costo);
    });

    let infoDiv = document.getElementsByClassName("infoMentor");
    let i = 0;
    for (const x of ordenarCostosArr) {
        infoDiv[i].innerHTML = '<h3 class="titulosMentores">'+x.nombre+"</h3><ul><li>Industria: "+x.area+"</li><li>Costo: $"+x.costo+"</li></ul>";
        i++;
    }
}

function randomBackground(){
    let randomNumber = Math.floor(Math.random()*3+1);

    switch (randomNumber) {
        case 1:
            randomBG.id = "fondoAzul";
            break;
        
        case 2:
            randomBG.id = "fondoVerde";
            break;            

        case 3:
            randomBG.id = "fondoAmarillo";
            break;

        default:
            randomBG.id = "fondoRandom";
            break;
    }
}

function limpiarStorage(){
    sessionStorage.clear();
    location.reload();
}

function limpiarStorageLocal(){
    localStorage.clear();
    sessionStorage.clear();
    location.reload();
}

function mostrarHistorialUsuarios(){
    let stringUsuarios = "";
    textArea2.value = "";

    let timerInterval;
    
    Swal.fire({
        title: 'Se imprimiran los usuarios registrados en el textArea correspondiente',
        html: 'Este mensaje se cerrará en <b></b> milisegundos.',
        timer: 2500,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
                }, 
            100)
        },
        willClose: () => {
        clearInterval(timerInterval)
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
        } 
    });

    for (let index = 0; index < localStorage.length; index++) {
        let infoUsuario = JSON.parse(localStorage.getItem("Usuario"+index));
        infoUsuario = JSON.stringify(infoUsuario);
        stringUsuarios = stringUsuarios + infoUsuario+"\n";
    }
    textArea2.value = "Usuarios registrados: \n"+stringUsuarios;
}

class UsuarioRegistrado{
    constructor(nombre,fecha){
        this.nombre = nombre;
        this.fecha = fecha;
    }
}

let usuario;
let usuarioStorage = sessionStorage.getItem("usuario");
let registroUsuarios;

if(usuarioStorage){
    Swal.fire("Bienvenido a Clase Maestra: " +sessionStorage.getItem("usuario")+ ", el sitio donde puedes aprender de tus mentores favoritos");
}else{  
    do{
        console.log("entra session");
        usuario = prompt("Ingresa tu nombre");
        sessionStorage.setItem("usuario",usuario);
        if(usuario == "" || usuario == null) {
            console.log("error nombre usuario");
            alert("Nombre Usuario no puede estar vacío, intente de nuevo."); 
        }
    }while(usuario == "" || usuario == null)   
    
    Swal.fire("Bienvenido a Clase Maestra: " +sessionStorage.getItem("usuario")+ ", el sitio donde puedes aprender de tus mentores favoritos");
    const luxonDate = DateTime.now();
    let currentDate = luxonDate.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
    const usuarioTemp = new UsuarioRegistrado(usuario,currentDate);
    let contador = localStorage.length;
    localStorage.setItem("Usuario"+contador,JSON.stringify(usuarioTemp));
}

const arregloMentores = [];

//**** Uso de FETCH en el proyecto: *****

fetch("../data/data.JSON")
.then(resp => resp.json())
.then(mentoresFetch => {
    mentoresFetch.forEach(mentorFetch => {
        let nombre = mentorFetch.nombre;
        let area = mentorFetch.area;
        let costo = mentorFetch.costo;
        let objetoTemp = {nombre,area,costo};
        arregloMentores.push(objetoTemp);
    });
}).catch(error => console.log(error));

//**** Termina USO DE FETCH EN PROYECTO Y QUEDA ALMACENADO CONTENIDO EN ARREGLO GLOBAL *****

let nombreMentor = "";

let textArea = document.getElementById("textAreaInfo");

let btn = document.getElementById("cotizarMentor");
btn.addEventListener("click",cotizarMentorSeleccionado);

let ordenarNombresArr = [];
let ordenarCostosArr = [];

let contenidoMentoresInfo = document.getElementsByClassName("listaDeInfoMentores");

let btnOrdNombre = document.getElementById("ordenarNombre");
btnOrdNombre.addEventListener("click",ordenarNombres);

let btnOrdCostos = document.getElementById("ordenarCosto");
btnOrdCostos.addEventListener("click",ordenarCostos);

let btnResetFondo = document.getElementById("limpiarFondo");
btnResetFondo.addEventListener("click",() => randomBG.id = "fondoRandom");

let randomBG = document.getElementById("fondoRandom");

let btnResetUsuario = document.getElementById("limpiarStorage");
btnResetUsuario.addEventListener("click",limpiarStorage);

let btnResetUsuarioLocal = document.getElementById("limpiarStorageLocal");
btnResetUsuarioLocal.addEventListener("click",limpiarStorageLocal);


let textArea2 = document.getElementById("textAreaHistorial");

let btnHistorialUsuarios = document.getElementById("mostrarHistorial");
btnHistorialUsuarios.addEventListener("click",mostrarHistorialUsuarios);