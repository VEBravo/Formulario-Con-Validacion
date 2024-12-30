let validacionCorrecta = true;

const indiceCampo = {
    "errorNombre": 0,
    "errorApellido": 1,
    "errorDocumento": 2,
    "errorEmail": 3,
    "errorEdad": 4,
    "errorActividad": 5,
    "errorNivelEstudio": 6,
    "errorAceptoTerminos": 7
};

const submitFunction = (event) => {
    if(!validarFormulario()){
        event.preventDefault(); // Siempre que se haga submit se previene la actualización de la página
    }else{
        event.preventDefault();
        actualizarBarraProgreso();
        setTimeout(() => {
            alert(
            "Los datos enviados fueron: \n" + 
            "Nombre: " + document.getElementById("nombre").value + "\n" +
            "Apellido: " + document.getElementById("apellido").value + "\n" +
            "Documento: " + document.getElementById("documento").value + "\n" +
            "Email: " + document.getElementById("email").value + "\n" +
            "Edad: " + document.getElementById("edad").value + "\n" +
            "Actividad: " + document.getElementById("actividad").value + "\n" +
            "Nivel de Estudio: " + document.getElementById("nivelEstudio").value + "\n"
            );
        }, 500);
    }

}
document.getElementById("formulario").addEventListener("submit", submitFunction); // Escucha el envío del form

function validarFormulario(){
    validacionCorrecta = true;
    // Validar los textos
    let camposTexto = document.querySelectorAll('input[type="text"]');
    
    // Validamos campos de texto
    camposTexto.forEach(campo => { // Ya que nombramos los errores como errorApellido, errorEmail, errorEdad
        let errorCampo = document.getElementById("error" + campo.id.charAt(0).toUpperCase() + campo.id.slice(1)); //error + Id
        // console.log("error" + campo.id.charAt(0).toUpperCase() + campo.id.slice(1));
        if(campo.value.length == ""){
            invalidoVerificacion(errorCampo, "¡Este campo es requerido!")
        }else if(campo.value.length > 0 && campo.value.length < 3){
            invalidoVerificacion(errorCampo, "¡Este campo debe tener al menos 3 caracteres!")
        }else{
            validoVerificacion(errorCampo);
        }
    })
    
    // Validar email
    const email = document.getElementById("email");
    let errorEmail = document.getElementById("errorEmail");
    
    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)){ // Validar el formato del mail con una ER (regex)
        validoVerificacion(errorEmail);
    }else{
        invalidoVerificacion(errorEmail, "¡Ingrese un correo electrónico válido!");
    }
    
    //Validar edad
    const edad = document.getElementById("edad");
    let errorEdad = document.getElementById("errorEdad");
    
    if(edad.value < 18){
        invalidoVerificacion(errorEdad, "¡Debes ser mayor de 18 años para registrarte!");
    }
    else{validoVerificacion(errorEdad);};
    
    // Validar actividad
    const actividad = document.getElementById("actividad");
    let errorActividad = document.getElementById("errorActividad");
    
    if(actividad.value == ""){
        invalidoVerificacion(errorActividad, "¡Debes seleccioanr una actividad!");
    }
    else{validoVerificacion(errorActividad);};
    
    // Validar nivel de estudio
    const nivelEstudio = document.getElementById("nivelEstudio");
    let errorNivelEstudio = document.getElementById("errorNivelEstudio");
    
    if(nivelEstudio.value == ""){
        invalidoVerificacion(errorNivelEstudio, "¡Debes seleccioanr un nivel de estudio!");
    }
    else{validoVerificacion(errorNivelEstudio);};
    
    // Validar terminos y condiciones
    const terminosCondiciones = document.getElementById("aceptoTerminos");
    let errorTerminosCondiciones = document.getElementById("errorAceptoTerminos");
    
    if(!terminosCondiciones.checked){
        invalidoVerificacion(errorTerminosCondiciones, "¡Debes aceptar los terminos y condiciones!");
    }
    else{validoVerificacion(errorTerminosCondiciones);};

    return validacionCorrecta; // Esto dice si el formulario es válido o no
}

const invalidoVerificacion = (elemento,mensaje) => {
    validacionCorrecta = false;
    elemento.textContent = mensaje; //Se asigna el mensaje al elemento
    elemento.style.display = "block"; //Mostrar el elemento
    disminuirProgreso(elemento);
}

const validoVerificacion = (elemento) => {
    elemento.textContent = "";
    elemento.style.display = "none";
    aumentarProgreso(elemento);
}


// Barra de progreso
let progresoActual = [false,false,false,false,false,false,false,false];
const progresoMaximo = progresoActual.length;

const barraProgreso = document.getElementById('barra-progreso');

function actualizarBarraProgreso() {
    const porcentajeProgreso = (progresoActual.filter(elemento => elemento).length / progresoMaximo) * 100;
    barraProgreso.style.width = `${porcentajeProgreso}%`;
}

function aumentarProgreso(elemento){
    progresoActual[indiceCampo[elemento.id]] = true;
    actualizarBarraProgreso();
}

function disminuirProgreso(elemento){
    progresoActual[indiceCampo[elemento.id]] = false;
    actualizarBarraProgreso();
}