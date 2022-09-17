let arrayUsuariosCreados = [];
//Traigo los usuarios de mis empleados desde la """base de datos"""
fetch('../../empleados.json')
.then(resultado => resultado.json())
.then(datosEmpleados => datosEmpleados.forEach(element => {
    arrayUsuariosCreados.push(element)
}))
console.log(arrayUsuariosCreados);
//Class para darle a cada usuario traido del local las propiedades de "Usuarios"
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

//Traigo los datos del local
let usuarioDeLocalStorage = JSON.parse(localStorage.getItem("arrayUsuarios"));
//Si hay datos en el local, los paso por el conversor (los convierte en "Usuarios") y los mando a "arrayUsuariosCreados"
const tomarUsuariosLocalStorage = () => {
    if(usuarioDeLocalStorage){
        for(elemento of usuarioDeLocalStorage){
            arrayUsuariosCreados.push(new Usuarios (elemento.nombre, elemento.apellido, elemento.email, elemento.nombreUsuario, elemento.contraseña, elemento.status));
        }
    }else{
        console.log('No hay registros');
    }
}
tomarUsuariosLocalStorage();
//Función que toma los datos los compara, valida y manda a otra pag      (*duda*)
const iniciarSesion = () => {
    let nombreUsuarioIniciado;
    let contraseñaUsuarioIniciado;

    nombreUsuarioIniciado = document.getElementById("idUsuarioIniciarSesion").value;
    contraseñaUsuarioIniciado = document.getElementById("idContraseñaIniciarSesion").value;
    //Busco el objeto que tenga el nombre de usuario igual al ingresado y lo tomo
    let comparacionUsuarios = arrayUsuariosCreados.find((element) => element.nombreUsuario == nombreUsuarioIniciado);
    //Valido los datos
    if(comparacionUsuarios){
        if(comparacionUsuarios.contraseña == contraseñaUsuarioIniciado){
            if(comparacionUsuarios.status == "empleado"){
                localStorage.setItem("Datos usuario", JSON.stringify(comparacionUsuarios));
                location.assign("../pages/paginaEmpleados.html");
            }else{
                localStorage.setItem("Datos usuario", JSON.stringify(comparacionUsuarios));
                location.assign("../pages/inicio.html");
            }
        }else{
            toasty('Contraseña incorrecta')
        }
    }else{
        toasty('Usuario incorrecto')
    }
}
//Asociar la función "iniciarSesion" a un evento (onclick) de un botón "Iniciar sesión"
let botonIniciarSesion = document.getElementById("idBtnIniciarSesion");
botonIniciarSesion.onclick = () => {iniciarSesion()}
//Asociar la función "registro" a oprimir la tecla "Enter"
const teclaEnter = (evento) => {
    evento.key == "Enter" ? iniciarSesion() : null;
}
let btnIniciarSesion = addEventListener('keypress', teclaEnter);


