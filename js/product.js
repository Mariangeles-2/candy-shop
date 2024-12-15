// Producto
class Producto {
    constructor(id, img, nombre, precio) {
        this.id = id;
        this.img = img;
        this.nombre = nombre;
        this.precio = precio;
    }
}

// Función para cargar productos
async function obtenerProductosDesdeJSON() {
    try {
        const respuestaFetch = await fetch('../json/productos.json');
        const listaProductosFormatoJSON = await respuestaFetch.json();
        const listaDeProductosDisponibles = listaProductosFormatoJSON.map(
            productoFormatoJSON => new Producto(
                productoFormatoJSON.id,
                productoFormatoJSON.img,
                productoFormatoJSON.nombre,
                productoFormatoJSON.precio
            )
        );

        return listaDeProductosDisponibles;

    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

