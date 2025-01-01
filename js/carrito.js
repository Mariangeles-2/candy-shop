// Estructura e inicialización del carrito
class Carrito {

    constructor(items = [], total = 0) {
        this.items = items;
        this.total = total;
    }
}

let carrito = JSON.parse(localStorage.getItem("miCarrito"));

if (carrito == null) {

    carrito = new Carrito();
}

// Almacenamiento del carrito en el LocalStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem("miCarrito", JSON.stringify(carrito));
}

function dibujarEstructuraMiCarrito() {
    if (carrito.items.length > 0) {
        carrito.items.forEach(item => dibujarItemEnMiCarrito(item));

        dibujarPrecioTotalCarrito();
        dibujarBotonVaciarMiCarrito();

    } else {
        crearMensajeCarritoVacio();
    }
}

function crearMensajeCarritoVacio() {
    const mensajeCarritoVacio = document.getElementById("mensajeCarritoVacio");

    const carritoVacio = document.createElement('p');
    carritoVacio.className = "text-center m-3";
    carritoVacio.innerText = "Tu carrito está vacío!";

    mensajeCarritoVacio.appendChild(carritoVacio);
}

function borrarPrecioTotalCarrito() {
    const contenedorPrecioTotalCarrito = document.getElementById("contenedorPrecioTotalCarrito");
    contenedorPrecioTotalCarrito.innerHTML = "";
}

function dibujarPrecioTotalCarrito() {
    const contenedorPrecioTotalCarrito = document.getElementById("contenedorPrecioTotalCarrito");

    eliminarPrecioTotalCarrito();

    const textoTotalCarrito = crearTextoTotalCarrito();
    const precioTotalCarrito = crearDivPrecioTotalCarrito();

    contenedorPrecioTotalCarrito.append(textoTotalCarrito, precioTotalCarrito);

    precioTotalCarrito.innerText = `$ ${carrito.total}`;
}

function crearTextoTotalCarrito() {
    const textoTotalCarrito = document.createElement("h4");
    textoTotalCarrito.innerText = "Tu total es: ";
    return textoTotalCarrito;
}

function crearDivPrecioTotalCarrito() {
    const precioTotalCarrito = document.createElement("div");
    precioTotalCarrito.id = "precioTotalCarrito";
    precioTotalCarrito.className = "text-end me-5 fw-bolder fs-5";
    return precioTotalCarrito;
}

function dibujarBotonVaciarMiCarrito() {
    const contenedorBtnEliminarCarrito = document.getElementById("contenedorBtnEliminarCarrito");

    borrarBotonVaciarMiCarrito();

    const btnEliminarCarrito = crearBtnEliminarCarrito();

    contenedorBtnEliminarCarrito.appendChild(btnEliminarCarrito);
}

function crearBtnEliminarCarrito() {
    const btnEliminarCarrito = document.createElement("button");
    btnEliminarCarrito.className = "w-100 btn btn-danger mb-3";
    btnEliminarCarrito.innerText = "Vaciar Carrito";
    btnEliminarCarrito.addEventListener("click", () => eliminarCarrito());
    return btnEliminarCarrito;
}

function eliminarPrecioTotalCarrito() {
    const contenedorPrecioTotalCarrito = document.getElementById("contenedorPrecioTotalCarrito");
    contenedorPrecioTotalCarrito.innerHTML = "";
}

function borrarBotonVaciarMiCarrito() {
    const contenedorBtnEliminarCarrito = document.getElementById("contenedorBtnEliminarCarrito");
    contenedorBtnEliminarCarrito.innerHTML = "";
}

function borrarMensajeMiCarritoVacio() {
    const mensajeCarritoVacio = document.getElementById("mensajeCarritoVacio");
    mensajeCarritoVacio.innerHTML = "";
}

//Función para eliminar porductos del carrito
function eliminarCarrito() {
    const swalWithBootstrapButtons = configurarSweetAlert();

    swalWithBootstrapButtons.fire({
        title: "Deseas vaciar el carrito?",
        icon: "question",
        showDenyButton: true,
        confirmButtonText: "Si vaciar",
        denyButtonText: `No! me arrepentí`,
    }).then((result) => {
        if (result.isConfirmed) {
            const contenedorDeItems = document.getElementById("contenedorDeItems");

            carrito.items = [];
            carrito.total = 0;
            contenedorDeItems.innerHTML = "";

            eliminarPrecioTotalCarrito();
            crearMensajeCarritoVacio();
            borrarBotonVaciarMiCarrito();

            localStorage.removeItem("miCarrito");

            swalWithBootstrapButtons.fire({
                title: "El carrito se vació!",
                icon: "success",
                confirmButtonText: 'OK',
            });

        }
    });
}

// Inicialización de la aplicación
dibujarEstructuraMiCarrito();





