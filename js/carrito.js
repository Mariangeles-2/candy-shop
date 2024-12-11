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