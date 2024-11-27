//Plataforma de compra de candy-shop
//Menu
//1 - Mi carrito
//2 - Agregar producto (listado de productos)
//3 - Eliminar producto (listado del carrito)
//4 - Modificar producto (cantidad)
//5 - Vaciar carrito
//6 - Salir

// Local Storage
let nombreDelCliente = localStorage.getItem("usuario");

if (nombreDelCliente == null) {

    nombreDelCliente = prompt("Bienvenido al Candy Shop de Cine Oeste\n\n Coloca tu nombre:");

    localStorage.setItem("usuario", nombreDelCliente);

}

let opcion;

function mostrarMenuYDevolverOpcion() {
    return parseInt(prompt(nombreDelCliente + "!\nSeleccioná la operación que desea realizar:\n\n1 - Mi carrito\n2 - Agregar producto\n3 - Eliminar producto\n4 - Modificar producto\n5 - Vaciar carrito\n6 - Salir"));
}

class Carrito {

    constructor(items = [], total = 0) {
        this.items = items;
        this.total = total;
    }
}

//Local storage

let carrito = JSON.parse(localStorage.getItem("miCarrito"));

if (carrito == null) {

    carrito = new Carrito();
}

class Item {

    constructor(id, cantidad, nombre, precio, subtotal) {
        this.id = id;
        this.cantidad = cantidad;
        this.nombre = nombre;
        this.precio = precio;
        this.subtotal = subtotal;
    }
}


function obtenerItemsMiCarrito() {
    // 1) Cod 101 - 10 un - Coca Cola - $1.000 - $10.000
    let itemsTotalCarrito = "";

    for (let i = 0; i < carrito.items.length; i++) {

        const item = carrito.items[i];

        const itemCarrito = i + 1 + ") Cod. " + item.id + " - " + item.cantidad + "un. - " + item.nombre + " - Precio Un.: $" + item.precio + " - Subtotal: $" + item.subtotal + "\n";
        itemsTotalCarrito += itemCarrito;
    }
    return itemsTotalCarrito;
}

class Producto {

    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

const listaDeProductosDisponibles = [
    new Producto(100, "Coca Cola", 1000),
    new Producto(101, "Coca Coca Zero", 1000),
    new Producto(102, "Pochoclos", 2000),
    new Producto(103, "Nachos", 2000),
    new Producto(104, "Sugus", 500),
    new Producto(105, "Rocklets", 500)
];

function obtenerListaDeProductoDisponibles() {

    let mensajeProducDisp = "";

    for (let i = 0; i < listaDeProductosDisponibles.length; i++) {

        const productoDisponible = i + 1
            + " ) " + listaDeProductosDisponibles[i].nombre + " - $" + listaDeProductosDisponibles[i].precio + "\n";
        mensajeProducDisp = mensajeProducDisp + productoDisponible;

    }
    return mensajeProducDisp;
}

//Mi carrito
function verMiCarrito() {
    if (carrito.items.length > 0) {

        const mensajeMiCarrito = nombreDelCliente + "!\nTu carrito tiene cargado los siguientes items:\n\n " + obtenerItemsMiCarrito() + "\n\n El total de tu compra es: $" + carrito.total;

        alert(mensajeMiCarrito);
    } else {
        alert("No tenés productos en el carrito!");
    }

}

//Agregar producto
function agregarProducto() {
    let posicionProductoSeleccionado;

    do {
        const mensajeAgregarProducto = nombreDelCliente + "!\nÉsta es nuestra lista de productos, seleccioná la opción que desea agregar: \n\n" + obtenerListaDeProductoDisponibles();

        posicionProductoSeleccionado = parseInt(prompt(mensajeAgregarProducto));

        if (posicionProductoSeleccionado > 0 && posicionProductoSeleccionado <= listaDeProductosDisponibles.length) {

            let cantidadProductoSeleccionado;

            do {
                const mensajeCantidadProducto = "Cuantos desea agregar: ";

                cantidadProductoSeleccionado = parseInt(prompt(mensajeCantidadProducto));

                if (cantidadProductoSeleccionado > 0) {

                    const productoSeleccionado = listaDeProductosDisponibles[posicionProductoSeleccionado - 1];

                    const subtotalProductoSeleccionado = productoSeleccionado.precio * cantidadProductoSeleccionado;

                    carrito.items.push(new Item(productoSeleccionado.id, cantidadProductoSeleccionado, productoSeleccionado.nombre, productoSeleccionado.precio, subtotalProductoSeleccionado));

                    carrito.total += subtotalProductoSeleccionado;

                    localStorage.setItem("miCarrito", JSON.stringify(carrito));

                    alert("Agregaste a tu lista: \n " + cantidadProductoSeleccionado + "un. de " + productoSeleccionado.nombre);
                } else {
                    alert("La cantidad es incorrecta")
                }
            } while (cantidadProductoSeleccionado <= 0);
        } else {
            alert("El producto seleccionado es incorrecto!");
        }
    } while (
        confirm("Deseas agregar otro producto?")
    );
}

//Eliminar producto
function eliminarProduto() {
    if (carrito.items.length > 0) {
        do {
            const mensajeEliminarProducto = nombreDelCliente + "!\nÉsta es la lista de tu carrito \n\n" + obtenerItemsMiCarrito() + "\n\n Escribí el item que deseas elimnar: ";

            const posicionProductoAEliminar = parseInt(prompt(mensajeEliminarProducto));

            if (posicionProductoAEliminar > 0 && posicionProductoAEliminar <= carrito.items.length) {

                const productoAEliminar = carrito.items[posicionProductoAEliminar - 1];

                const nombreProductoAEliminar = productoAEliminar.nombre;

                const confirmacionDeEliminacion = confirm("Él item que va a elimiar es: \n\n" + nombreProductoAEliminar + "\n\n Confirmá la eliminadión.");

                if (confirmacionDeEliminacion) {

                    carrito.total -= productoAEliminar.subtotal;

                    carrito.items.splice(posicionProductoAEliminar - 1, 1);

                    localStorage.setItem("miCarrito", JSON.stringify(carrito));

                    alert("El producto fue eliminado.");

                } else {
                    alert("La operación se ha cancelado.");
                }

            } else {
                alert("El producto seleccionado es incorreto!");
            }
        } while (
            confirm("Deseas eliminar otro producto?")
        );
    } else {
        alert("No tenés productos agregados!");
    }
}

//Modificar producto
function modificarProducto() {
    if (carrito.items.length > 0) {

        const mensajeModificarProducto = nombreDelCliente + "!\nÉsta es la lista de tu carrito \n\n" + obtenerItemsMiCarrito() + "\n\n Escribí el item que deseas modificar: ";

        const posicionProductoAModificar = parseInt(prompt(mensajeModificarProducto));

        if (posicionProductoAModificar > 0 && posicionProductoAModificar <= carrito.items.length) {

            const mensajeCantidadProductoAModificar = "Colocá la cantidad que deseas modificar del producto: ";

            const cantidadProductoAModificar = parseInt(prompt(mensajeCantidadProductoAModificar));

            if (cantidadProductoAModificar > 0) {

                const itemAModificar = carrito.items[posicionProductoAModificar - 1];

                const subtotalOriginal = itemAModificar.subtotal;

                const nombrePorductoAModificar = itemAModificar.nombre;

                itemAModificar.cantidad = cantidadProductoAModificar;

                itemAModificar.subtotal = itemAModificar.cantidad * itemAModificar.precio;

                carrito.items[posicionProductoAModificar - 1] = itemAModificar;

                // 1000 - 1200
                carrito.total += (itemAModificar.subtotal - subtotalOriginal);

                localStorage.setItem("miCarrito", JSON.stringify(carrito));

                alert("La cantidad del producto " + nombrePorductoAModificar + " ahora es de " + itemAModificar.cantidad + "uni.");

            } else {
                alert("El número es incorresto!")
            }
        } else {
            alert("El producto es incorrecto.")
        }
    } else {
        alert("No tenes productos agregados!");
    }
}

//Vaciar carrito
function vaciarCarrito() {
    const confirmacionDeEliminacion = confirm("Deseas vaciar el carrito?");

    if (confirmacionDeEliminacion) {

        carrito.items = [];
        carrito.total = 0;

        localStorage.removeItem("miCarrito");

        alert("El carrito ha sido vaciado!");
    }
}

//Menu
do {
    opcion = mostrarMenuYDevolverOpcion();

    switch (opcion) {
        case 1:
            verMiCarrito();
            break;
        case 2:
            agregarProducto();
            break;
        case 3:
            eliminarProduto();
            break;
        case 4:
            modificarProducto();
            break;
        case 5:
            vaciarCarrito();
            break;
        case 6:
            alert(nombreDelCliente + "!\nGracias por visitarnos, hasta pronto!")
            break;

        default:
            alert("La opción es inválida.")
            break;
    }
} while (opcion !== 6);