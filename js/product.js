// Producto
class Producto {
    constructor(id, img, nombre, precio) {
        this.id = id;
        this.img = img;
        this.nombre = nombre;
        this.precio = precio;
    }
}

const listaDeProductosDisponibles = [
    new Producto(100, "assets/coca.png", "Coca Cola", 1000),
    new Producto(101, "assets/coca-zero.png", "Coca Coca Zero", 1000),
    new Producto(102, "assets/pochoclo.png", "Pochoclos", 2000),
    new Producto(103, "assets/nachos.png", "Nachos", 2000),
    new Producto(104, "assets/sugus.png", "Sugus", 500),
    new Producto(105, "assets/rocklets.png", "Rocklets", 500)
];

