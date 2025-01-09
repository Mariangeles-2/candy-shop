//Buscador de productos
const formBuscador = document.getElementById("formBuscador");
formBuscador.addEventListener("submit", async (event) => {
    event.preventDefault();
    const inputBuscador = document.getElementById("inputBuscador");
    const textoBuscado = inputBuscador.value.trim().toLowerCase();
    const productosDisponibles = await obtenerProductosDesdeJSON();
    const productosFiltrados = productosDisponibles.filter(producto => producto.nombre.toLowerCase().includes(textoBuscado));

    if (productosFiltrados.length === 0) {
        configurarSweetAlert().fire({
            icon: "error",
            title: "Oops...",
            text: "No se encontraron productos con ese nombre!",
        });
    }

    dibujarTarjetasProductos(productosFiltrados);
});





