// Inicialización y estructura del carrito
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

// Manipulación del carrito
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

function eliminarCarrito() {
    const confirmacionDeEliminacion = confirm("Deseas vaciar el carrito?");

    if (confirmacionDeEliminacion) {

        const contenedorDeItems = document.getElementById("contenedorDeItems");

        carrito.items = [];
        carrito.total = 0;
        contenedorDeItems.innerHTML = "";

        eliminarPrecioTotalCarrito();
        crearMensajeCarritoVacio();
        borrarBotonVaciarMiCarrito();

        localStorage.removeItem("miCarrito");

        alert("El carrito se vació!");
    }
}

// Almacenamiento
function guardarCarritoEnLocalStorage() {
    localStorage.setItem("miCarrito", JSON.stringify(carrito));
}

// Visualización
function dibujarItemEnMiCarrito(item) {
    const contenedorDeItems = document.getElementById("contenedorDeItems");

    const itemFila = crearFilaItem(item);
    const imgTarjeta = crearImgItem(item);
    const colContenedor = crearColumnaItem();
    const itemTitulo = crearTituloItem(item);
    const itemPrecio = crearPrecioItem(item);
    const inputGrupo = contenedorDeBtn();
    const menosItemBtn = crearBtnMenosItem(item);
    const iconoItemMenos = crearIconoMenosItem();
    const inputCantItem = crearInputCantItem(item);
    const masItemBtn = crearBtnMasItem(item);
    const iconoItemMas = crearIconoMasItem();
    const basuraItemBtn = crearBtnBasuraItem(item);
    const iconoItemTrash = crearIconoBasuraItem();

    menosItemBtn.appendChild(iconoItemMenos);
    masItemBtn.appendChild(iconoItemMas);
    basuraItemBtn.appendChild(iconoItemTrash);
    inputGrupo.append(menosItemBtn, inputCantItem, masItemBtn, basuraItemBtn);
    colContenedor.append(itemTitulo, itemPrecio, inputGrupo);
    itemFila.append(imgTarjeta, colContenedor);
    contenedorDeItems.appendChild(itemFila);
}

function crearFilaItem(item) {
    const itemFila = document.createElement('div');
    itemFila.className = "row m-1";
    itemFila.id = `item${item.id}`;
    return itemFila;
}

function crearImgItem(item) {
    const imgCard = document.createElement('img');
    imgCard.className = "img-cart col-4";
    imgCard.setAttribute("alt", item.nombre);
    imgCard.setAttribute("src", item.img);
    return imgCard;
}

function crearColumnaItem() {
    const colContenedor = document.createElement('div');
    colContenedor.className = "col-8";
    return colContenedor;
}

function crearTituloItem(item) {
    const itemTitle = document.createElement('h3');
    itemTitle.innerText = item.nombre;
    return itemTitle;
}

function crearPrecioItem(item) {
    const itemPrice = document.createElement('p');
    itemPrice.innerText = `$${item.subtotal}`;
    return itemPrice;
}

function contenedorDeBtn() {
    const inputGrupo = document.createElement('div');
    inputGrupo.className = "input-group align-items-center";
    return inputGrupo;
}

function crearBtnMenosItem(item) {
    const menosItemBtn = document.createElement('button');
    menosItemBtn.className = "m-2 btn-minus";
    menosItemBtn.addEventListener("click", () => restarItem(item));
    return menosItemBtn;
}

function restarItem(item) {
    if (item.cantidad > 1) {
        item.cantidad--;
        item.subtotal -= item.precio;
        carrito.total -= item.precio;

        guardarCarritoEnLocalStorage();

        redibujarItems();

        dibujarPrecioTotalCarrito();
    } else {
        eliminarItem(item);
    }
}

function eliminarItem(item) {
    const confirmacionDeEliminacion = confirm("Deseas eliminar este producto?");

    if (confirmacionDeEliminacion) {

        const itemIndice = carrito.items.findIndex(itemCarrito => itemCarrito.id === item.id);

        carrito.total -= item.subtotal;
        carrito.items.splice(itemIndice, 1);

        guardarCarritoEnLocalStorage();

        redibujarItems();

        dibujarPrecioTotalCarrito();

        if (carrito.items.length === 0) {
            crearMensajeCarritoVacio();
            borrarBotonVaciarMiCarrito();
            borrarPrecioTotalCarrito();
        }
    }
}

function redibujarItems() {
    const contenedorDeItems = document.getElementById("contenedorDeItems");
    contenedorDeItems.innerHTML = "";
    carrito.items.forEach(carritoItem => {
        dibujarItemEnMiCarrito(carritoItem);
    });
}

function borrarPrecioTotalCarrito() {
    const contenedorPrecioTotalCarrito = document.getElementById("contenedorPrecioTotalCarrito");
    contenedorPrecioTotalCarrito.innerHTML = "";
}

function crearIconoMenosItem() {
    const iconoItemMenos = document.createElement('i');
    iconoItemMenos.className = "fa-solid fa-minus";
    return iconoItemMenos;
}

function crearInputCantItem(item) {
    const inputCantItem = document.createElement('input');
    inputCantItem.className = "form-control text-center";
    inputCantItem.setAttribute("type", "number");
    inputCantItem.value = item.cantidad;

    inputCantItem.addEventListener("change", (event) => {
        modificarCantidadItem(event, item);
    });

    return inputCantItem;
}

function modificarCantidadItem(event, item) {
    const nuevaCantidad = parseInt(event.target.value);

    if (nuevaCantidad > 0) {
        const diferencia = nuevaCantidad - item.cantidad;
        item.cantidad = nuevaCantidad;
        item.subtotal = item.cantidad * item.precio;
        carrito.total += diferencia * item.precio;

        guardarCarritoEnLocalStorage();

        redibujarItems();

        dibujarPrecioTotalCarrito();
    } else {
        event.target.value = item.cantidad;
    }
}

function crearBtnMasItem(item) {
    const masItemBtn = document.createElement('button');
    masItemBtn.className = "m-2 btn-plus";
    masItemBtn.addEventListener("click", () => sumarItem(item));
    return masItemBtn;
}

function sumarItem(item) {
    item.cantidad++;
    item.subtotal += item.precio;
    carrito.total += item.precio;

    guardarCarritoEnLocalStorage();

    redibujarItems();

    dibujarPrecioTotalCarrito();
}

function crearIconoMasItem() {
    const iconoItemMas = document.createElement('i');
    iconoItemMas.className = "fa-solid fa-plus";
    return iconoItemMas;
}

function crearBtnBasuraItem(item) {
    const trashItemBtn = document.createElement('button');
    trashItemBtn.className = "btn m-2";
    trashItemBtn.addEventListener("click", () => eliminarItem(item));
    return trashItemBtn;
}

function crearIconoBasuraItem() {
    const iconoItemTrash = document.createElement('i');
    iconoItemTrash.className = "fa-solid fa-trash";
    return iconoItemTrash;
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

// Inicialización de la tienda
async function crearTarjetasProductos() {
    const contenedorDeProductos = document.getElementById("contenedorDeProductos");

    const listaDeProductosDisponibles = await obtenerProductosDesdeJSON();

    listaDeProductosDisponibles.forEach(producto => {
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
dibujarEstructuraMiCarrito();
crearTarjetasProductos();

