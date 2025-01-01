//Buscador de productos
const formBuscador = document.getElementById("formBuscador");
formBuscador.addEventListener("submit", async (event) => {
    event.preventDefault();
    const inputBuscador = document.getElementById("inputBuscador");
    const textoBuscado = inputBuscador.value.trim().toLowerCase();
    const productosDisponibles = await obtenerProductosDesdeJSON();
    const productosFiltrados = productosDisponibles.filter(producto => producto.nombre.toLowerCase().includes(textoBuscado));

    dibujarTarjetasProductos(productosFiltrados);
});





