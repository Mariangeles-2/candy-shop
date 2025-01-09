//Estructura de los items
class Item {

    constructor(id, img, nombre, cantidad, precio, subtotal) {
        this.id = id;
        this.img = img
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
        this.subtotal = subtotal;
    }
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

    const swalWithBootstrapButtons = configurarSweetAlert();

    swalWithBootstrapButtons.fire({
        title: "Desear eliminar este producto?",
        icon: "question",
        showDenyButton: true,
        confirmButtonText: "Si eliminar",
        denyButtonText: `No! me arrepentí`,
    }).then((result) => {
        if (result.isConfirmed) {
            const itemIndice = carrito.items.findIndex(itemCarrito => itemCarrito.id === item.id);

            carrito.total -= item.subtotal;
            carrito.items.splice(itemIndice, 1);

            guardarCarritoEnLocalStorage();

            redibujarItems();

            dibujarPrecioTotalCarrito();

            if (carrito.items.length === 0) {
                crearMensajeCarritoVacio();
                borrarBotonComprarYVaciarMiCarrito();
                borrarPrecioTotalCarrito();
            }
        }
    });
}

function redibujarItems() {
    const contenedorDeItems = document.getElementById("contenedorDeItems");
    contenedorDeItems.innerHTML = "";
    carrito.items.forEach(carritoItem => {
        dibujarItemEnMiCarrito(carritoItem);
    });
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
