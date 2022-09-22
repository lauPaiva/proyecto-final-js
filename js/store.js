
let carritoDeCompras = []

const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

const selecTalles = document.getElementById('selecTalles')
const buscador = document.getElementById('search')



//Filtro
selecTalles.addEventListener('change',()=>{
    if(selecTalles.value == 'all'){
        mostrarProductos(stockProductos)
    }else{
        mostrarProductos(stockProductos.filter(item=> item.talle == selecTalles.value))
    }
})

//Buscador
buscador.addEventListener('input',()=>{
    mostrarProductos(stockProductos.filter(item=> item.nombre.toLowerCase().includes(buscador.value.toLowerCase())))
})


mostrarProductos(stockProductos)


function mostrarProductos(array){ 
    contenedorProductos.innerHTML=''
    array.forEach(item =>{

    let div = document.createElement('div')

    div.className = 'producto'

    div.innerHTML= `<div class="card">
                        <div class="card-image">
                        <img src="${item.img}" />
                        <span class="cardTitulo">${item.nombre}</span>
                        <a
                            id="botonAgregar${item.id}"
                            ><i class="material-icons">add_shopping_cart</i></a
                        >
                        </div>
                        <div class="cardContenido">
                        <p>${item.desc}</p>
                        <p>Talle: ${item.talle}</p>
                        <p>$${item.precio}</p>
                        </div>
                </div>`
    contenedorProductos.appendChild(div)

    let btnAgregar = document.getElementById(`botonAgregar${item.id}`)
    btnAgregar.addEventListener('click',()=>{
        agregarAlCarrito(item.id);
    })
    })
}

function agregarAlCarrito(id) {
    let existe = carritoDeCompras.find(produc => produc.id == id)
    if(existe){
        existe.cantidad = existe.cantidad + 1
        document.getElementById(`cant${existe.id}`).innerHTML = `<p id="cant${existe.id}">cantidad:${existe.cantidad}</p>`
        actualizarCarrito()
    }else{
        let productoAgregar = stockProductos.find(item=> item.id == id)
        productoAgregar.cantidad = 1
        carritoDeCompras.push(productoAgregar);
        mostrarCarrito(productoAgregar)
        actualizarCarrito()
    }
    
}

function mostrarCarrito(productoAgregar) {

    let div = document.createElement('div')
    div.setAttribute('class', 'productoEnCarrito')
    div.innerHTML += `<p>${productoAgregar.nombre}</p>
                    <p>Precio: $${productoAgregar.precio}</p>
                    <p id="cant${productoAgregar.id}">cantidad:${productoAgregar.cantidad}</p>
                    <button class="boton-eliminar" id="${productoAgregar.id}">
                    <i class="fas fa-trash-alt"></i>
                    </button>`
    contenedorCarrito.appendChild(div)

    eliminar()
}

function eliminar() {
    let btnEliminar = document.getElementsByClassName('boton-eliminar')
    for (const btn of btnEliminar) {
        btn.addEventListener('click',(e)=>{
            btn.parentElement.remove();
            carritoDeCompras = carritoDeCompras.filter(item => item.id != e.target.parentElement.id)
            actualizarCarrito()
        })
    }
}


function  actualizarCarrito (){
    contadorCarrito.innerText= carritoDeCompras.reduce((acc,el)=> acc + el.cantidad, 0)            
    precioTotal.innerText = carritoDeCompras.reduce((acc,el)=> acc + (el.precio * el.cantidad), 0)
}                                                             
