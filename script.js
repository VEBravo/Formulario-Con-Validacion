const submitFunction = (event) => {
    if(!validarFormulario()){
        event.preventDefault(); // Siempre que se haga submit se previene la actualización de la página
    }else{
        event.preventDefault();
        alert(
            "Los datos enviados fueron: \n" + 
            "Nombre: " + document.getElementById("nombre").value + "\n" +
            "Apellido: " + document.getElementById("apellido").value + "\n" +
            "Documento: " + document.getElementById("documento").value + "\n" +
            "Email: " + document.getElementById("email").value + "\n" +
            "Edad: " + document.getElementById("edad").value + "\n" +
            "Actividad: " + document.getElementById("actividad").value + "\n" +
            "Nivel de Estudio: " + document.getElementById("nivelEstudio").value + "\n"
        )
    }

}
document.getElementById("formulario").addEventListener("submit", submitFunction); // Escucha el envío del form

function validarFormulario(){
    let validacionCorrecta = true;
    // Validar los textos
    let camposTexto = document.querySelectorAll('input[type="text"]');
    
    // Validamos campos de texto
    camposTexto.forEach(campo => { // Ya que nombramos los errores como errorApellido, errorEmail, errorEdad
        let errorCampo = document.getElementById("error" + campo.id.charAt(0).toUpperCase() + campo.id.slice(1)); //error + Id
        console.log("error" + campo.id.charAt(0).toUpperCase() + campo.id.slice(1));
        if(campo.value.length == ""){
            mostrarError(errorCampo, "¡Este campo es requerido!")
            validacionCorrecta = false;
        }else if(campo.value.length > 0 && campo.value.length < 3){
            mostrarError(errorCampo, "¡Este campo debe tener al menos 3 caracteres!")
            validacionCorrecta = false;
        }else{
            ocultarError(errorCampo);
        }
    })

    // Validar email
    const email = document.getElementById("email");
    let errorEmail = document.getElementById("errorEmail");

    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)){ // Validar el formato del mail con una ER (regex)
        ocultarError(errorEmail);
    }else{
        mostrarError(errorEmail, "¡Ingrese un correo electrónico válido!");
        validacionCorrecta = false;
    }

    //Validar edad
    const edad = document.getElementById("edad");
    let errorEdad = document.getElementById("errorEdad");

    if(edad.value < 18){
        mostrarError(errorEdad, "¡Debes ser mayor de 18 años para registrarte!");
        validacionCorrecta = false;
    }
    else{ocultarError(errorEdad);};
    
    // Validar actividad
    const actividad = document.getElementById("actividad");
    let errorActividad = document.getElementById("errorActividad");
    
    if(actividad.value == ""){
        mostrarError(errorActividad, "¡Debes seleccioanr una actividad!");
        validacionCorrecta = false;
    }
    else{ocultarError(errorActividad);};
    
    // Validar nivel de estudio
    const nivelEstudio = document.getElementById("nivelEstudio");
    let errorNivelEstudio = document.getElementById("errorNivelEstudio");
    
    if(nivelEstudio.value == ""){
        mostrarError(errorNivelEstudio, "¡Debes seleccioanr un nivel de estudio!");
        validacionCorrecta = false;
    }
    else{ocultarError(errorNivelEstudio);};
    
    // Validar terminos y condiciones
    const terminosCondiciones = document.getElementById("aceptoTerminos");
    let errorTerminosCondiciones = document.getElementById("errorAceptoTerminos");
    
    if(!terminosCondiciones.checked){
        mostrarError(errorTerminosCondiciones, "¡Debes aceptar los terminos y condiciones!");
        validacionCorrecta = false;
    }
    else{ocultarError(errorTerminosCondiciones);};

    console.log(validacionCorrecta);
    return validacionCorrecta; // Esto dice si el formulario es válido o no
}

const mostrarError = (elemento,mensaje) => {
    elemento.textContent = mensaje; //Se asigna el mensaje al elemento
    elemento.style.display = "block"; //Mostrar el elemento
}

const ocultarError = (elemento) => {
    elemento.textContent = "";
    elemento.style.display = "none";
}


//6.47