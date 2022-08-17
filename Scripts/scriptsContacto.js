function notificacionBoton(e){
    console.log("entra");
    e.preventDefault();
    Swal.fire('Este botón aún no tiene funcionalidad, pero aquí tienes una alerta bonita :D');
}

let btnContacto = document.getElementById("btnContacto");
btnContacto.addEventListener("click",notificacionBoton);