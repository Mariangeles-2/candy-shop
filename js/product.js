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

// Función para agregar productos al carrito
function agregarProducto(producto) {
    let itemCarrito;

    if (carrito.items.some(itemCarrito => compararIdProductoConIdItem(producto, itemCarrito))) {
        const itemFila = document.getElementById(`item${producto.id}`);
        itemFila.remove();

        itemCarrito = carrito.items.find(itemCarrito => compararIdProductoConIdItem(producto, itemCarrito));

        itemCarrito.cantidad++;
        itemCarrito.subtotal += itemCarrito.precio;
        carrito.total += itemCarrito.precio;


    } else {
        itemCarrito = transformarProdEnItem(producto);

        carrito.items.push(itemCarrito);
        carrito.total += itemCarrito.subtotal;
    }

    guardarCarritoEnLocalStorage();
    borrarMensajeMiCarritoVacio();
    dibujarItemEnMiCarrito(itemCarrito);
    dibujarPrecioTotalCarrito();
    dibujarBotonVaciarMiCarrito();
}

function compararIdProductoConIdItem(producto, item) {
    return producto.id === item.id;
}

function transformarProdEnItem(producto) {
    return new Item(
        producto.id,
        producto.img,
        producto.nombre,
        1,
        producto.precio,
        producto.precio
    );
}

// Inicialización de la tienda
async function crearTarjetasDeTodosLosProductos() {
    const listaDeProductosDisponibles = await obtenerProductosDesdeJSON();

    dibujarTarjetasProductos(listaDeProductosDisponibles);
}

function dibujarTarjetasProductos(productos) {
    const contenedorDeProductos = document.getElementById("contenedorDeProductos");
    contenedorDeProductos.innerHTML = "";

    productos.forEach(producto => {
        const tarjetaProductoColumna = crearColumnaElemento();
        const tarjetaProductoContenedora = crearTarjetaProductoContenedora();
        const imgTarjetaProducto = crearImgTarjetaProducto(producto);
        const tarjetaProductoCuerpo = crearTarjetaProdutoCuerpo();
        const tituloTarjetaProducto = crearTituloTarjetaProducto(producto);
        const precioTarjetaProducto = crearPrecioTarjetaProducto(producto);
        const botonTarjetaProducto = crearBtnTarjetaProducto(producto);

        tarjetaProductoCuerpo.append(tituloTarjetaProducto, precioTarjetaProducto, botonTarjetaProducto);
        tarjetaProductoContenedora.append(imgTarjetaProducto, tarjetaProductoCuerpo);
        tarjetaProductoColumna.appendChild(tarjetaProductoContenedora);
        contenedorDeProductos.appendChild(tarjetaProductoColumna);
    });
}

function crearColumnaElemento() {
    const cardCol = document.createElement('div');
    cardCol.className = "col";
    return cardCol;
}

function crearTarjetaProductoContenedora() {
    const tarjetaContenedora = document.createElement('div');
    tarjetaContenedora.className = "card card-container";
    return tarjetaContenedora;
}

function crearImgTarjetaProducto(producto) {
    const imgTarjeta = document.createElement('img');
    imgTarjeta.className = "img-shop card-img-top";
    imgTarjeta.setAttribute("alt", producto.nombre);
    imgTarjeta.setAttribute("src", producto.img);
    return imgTarjeta;
}

function crearTarjetaProdutoCuerpo() {
    const tarjetaProductoCuerpo = document.createElement('div');
    tarjetaProductoCuerpo.className = "card-body";
    return tarjetaProductoCuerpo;
}

function crearTituloTarjetaProducto(producto) {
    const tituloTarjetaProducto = document.createElement('h3');
    tituloTarjetaProducto.className = "card-title";
    tituloTarjetaProducto.innerText = producto.nombre;
    return tituloTarjetaProducto;
}

function crearPrecioTarjetaProducto(producto) {
    const precioTarjetaProducto = document.createElement('p');
    precioTarjetaProducto.className = "card-text";
    precioTarjetaProducto.innerText = `$${producto.precio}`;
    return precioTarjetaProducto;
}

function crearBtnTarjetaProducto(producto) {
    const botonTarjetaProducto = document.createElement('button');
    botonTarjetaProducto.className = "d-block btn btn-warning";
    botonTarjetaProducto.innerText = "Agregar al carrito";
    botonTarjetaProducto.addEventListener("click", () => agregarProducto(producto));
    return botonTarjetaProducto;
}

// Inicialización de la aplicación
crearTarjetasDeTodosLosProductos();

