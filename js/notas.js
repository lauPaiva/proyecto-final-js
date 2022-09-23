mostrarNotas();

let usuario = JSON.parse(localStorage.getItem("Datos usuario"));
let {nombre, apellido} = usuario;
let bnvUsuario = document.getElementById("usuario");

bnvUsuario.innerHTML = `
<h3>${nombre} ${apellido}</h3>`

let btnAgregar = document.getElementById("btnAgregar");
btnAgregar.addEventListener("click", function (e){
    let agregarTexto = document.getElementById("agregarTexto");
    let notas = localStorage.getItem("notas");
    if(notas == null) {
        notasObj = [];
    }else {
        notasObj = JSON.parse(notas);
    };
    notasObj.push(agregarTexto.value);
    localStorage.setItem("notas", JSON.stringify(notasObj));
    agregarTexto.value = "";
    mostrarNotas();
});

function mostrarNotas() {
    let notas = localStorage.getItem("notas");
    if(notas == null) {
        notasObj = [];
    }else {
        notasObj = JSON.parse(notas);
    };
    let html = "";
    notasObj.forEach((element, index) => {
        html += `
        <div>
            <div class="notaAgregada">
                <h5>Nota ${index + 1}</h5>
                <p>${element}</p>
                <button class="btnBorrar" id="${index}" onclick="borrarNota(this.id)">Borrar nota</button>
            </div>
        </div>`;
    });

    let notasElm = document.getElementById("notas");

    if (notasObj.length != 0) {

        notasElm.innerHTML = html;

    } else {

        notasElm.innerHTML = "Crea una nota!";
    };
}

function borrarNota(index) {

    let notas = localStorage.getItem("notas");

    if (notas == null) {

        notasObj = [];

    } else {

        notesObj = JSON.parse(notas);

    }

    notasObj.splice(index, 1);

    localStorage.setItem("notas", JSON.stringify(notasObj));

    mostrarNotas();

}