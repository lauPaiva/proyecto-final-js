//Guardar los datos que hay en el local en "arrayUsuarios", si no hay datos, crear "arrayUsuarios" vacío.
let arrayUsuarios = JSON.parse(localStorage.getItem("arrayUsuarios")) || [];
//Función para guardar datos en el local sin necesidad de llamar "localStorage..." y "JSON..."
const guardarLocalStorage = (clave, valor) => {
    localStorage.setItem(clave, JSON.stringify(valor));
}
//Constructor de mis usuarios
class Usuarios{
    constructor(nombre,apellido,email,nombreUsuario,contraseña, status){
        this.nombre=nombre;
        this.apellido=apellido;
        this.email = email;
        this.nombreUsuario=nombreUsuario;
        this.contraseña=contraseña;
        this.status=status;
    }
}

let arrayNombresUsuarios = [];
const compararNombresUsuarios = () => {
    arrayUsuarios.forEach(element => {
        arrayNombresUsuarios.push(element.nombreUsuario)
    });
}
compararNombresUsuarios();

const toasty = texto => {
    Toastify({
        text: texto,
        duration: 2000,
        position: 'center',
        className: "toastyEstilos",
        style: {
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))",
        },
        }).showToast();
}
let expresionRegular;
let esValido;
const validarEmail = correo => {
    expresionRegular = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    esValido = expresionRegular.test(correo)
}



//Función que toma los datos, los valida y manda a otra pag      
const registro = () => { 
    let nombreIngresado;
    let apellidoIngresado;
    let emailIngresado;
    let usuarioIngresado;
    let contraseñaIngresada;
    
    nombreIngresado = document.getElementById("idNombre").value;
    apellidoIngresado = document.getElementById("idApellido").value;
    emailIngresado = document.getElementById("idEmail").value;
    usuarioIngresado = document.getElementById("idUsuario").value;
    contraseñaIngresada = document.getElementById("idContraseña").value;

    let existenciaDeUsuario;
    arrayNombresUsuarios.forEach(element => {
        if(element == usuarioIngresado){
            existenciaDeUsuario = false;
        }else{
            existenciaDeUsuario = true;
        }
    })
    
    validarEmail(emailIngresado);
    //Validación (asegurarse de que el usuario ingrese todos los datos requeridos), envío hacia pag. de inicio de sesión.
    if(nombreIngresado == '' || nombreIngresado == null){
        toasty('El campo "Nombre" es obligatorio')
    }else if(apellidoIngresado == '' || apellidoIngresado == null){
        toasty('El campo "Apellido" es obligatorio')
    }else if(emailIngresado == '' || emailIngresado == null){
        toasty('El campo "Correo electrónico" es obligatorio')
    }else if(usuarioIngresado == '' || usuarioIngresado == null){
        toasty('El campo "Nombre de usuario" es obligatorio')
    }else if(contraseñaIngresada == '' || contraseñaIngresada == null){
        toasty('El campo "Contraseña" es obligatorio')
    }else if(esValido == false){ 
        toasty('La dirección de email es incorrecta')
        
    }else if(existenciaDeUsuario == true || existenciaDeUsuario == undefined){
        const usuario = new Usuarios(nombreIngresado, apellidoIngresado, emailIngresado, usuarioIngresado, contraseñaIngresada, "cliente");
        arrayUsuarios.push(usuario);

        Swal.fire({
            icon: 'succes',
            title: '¡Felicitaciones! su usuario ha sido creado con éxito',
            showConfirmButton: false,
            backdrop: true,
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))",
            width: "40%",
            padding: "7rem ",
            customClass: {
                title: 'tituloAlertRegistro',
                popup: 'popupAlertRegistro'
            }
        })

        setTimeout(() => {
            location.assign('../pages/inicioSesion.html'); 
            } , 1800);         
        guardarLocalStorage("arrayUsuarios",arrayUsuarios);
    }else{
        toasty('Nombre de usuario existente')
    }
}

//Asociar la función "registro" a un evento (onclick) de un botón "Registrarse"
let botonRegistrarse = document.getElementById("idBtnRegistrarse");
botonRegistrarse.onclick = () => {registro()}
//Asociar la función "registro" a oprimir la tecla "Enter"
const teclaEnter = (evento) => {
    evento.key == "Enter" ? registro() : null;
}
let btnRegistrarse = addEventListener('keypress', teclaEnter);











