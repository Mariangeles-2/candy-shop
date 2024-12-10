/* SUMA Y RESTA DE PRODUCTOS
<div class="input-group align-items-center">
    <button class="m-2 btn-minus"><i class="fa-solid fa-minus"></i></button>
    <input type="number" class="form-control text-center"></input>
    <button class="m-2 btn-plus"><i class="fa-solid fa-plus"></i></button>
    <button class="btn m-2"><i class="fa-solid fa-trash"></i></button>
</div> 
*/

/* LISTA DE MI CARRITO        
<div class="row m-1">
    <img src="assets/coca-zero.png" class="img-cart col-4" alt="Coca Cola Zero">
    <div class="col-8">
        <h3>Coca Cola Zero</h3>
        <p>$ 1000</p>
        <div class="input-group align-items-center">
            <button class="m-2 btn-minus"><i class="fa-solid fa-minus"></i></button>
            <input type="number" class="form-control text-center"></input>
            <button class="m-2 btn-plus"><i class="fa-solid fa-plus"></i></button>
            <button class="btn m-2"><i class="fa-solid fa-trash"></i></button>
        </div>
    </div>
</div> 
*/

function agregarProducto(producto) {

    const containerOfItems = document.getElementById("containerOfItems");

    const item = new Item(
        producto.id,
        producto.img,
        producto.nombre,
        1,
        producto.precio,
        producto.precio,
    );

    carrito.items.push(item);

    carrito.total += item.subtotal;

    const itemRow = document.createElement('div');
    itemRow.className = "row m-1";

    const imgCard = document.createElement('img');
    imgCard.className = "img-cart col-4";
    imgCard.setAttribute("alt", item.nombre);
    imgCard.setAttribute("src", item.img);

    const colContainer = document.createElement('div');
    colContainer.className = "col-8";

    const itemTitle = document.createElement('h3');
    itemTitle.innerText = item.nombre;

    const itemPrice = document.createElement('p');
    itemPrice.innerText = `$${item.subtotal}`;

    const inputGroup = document.createElement('div');
    inputGroup.className = "input-group align-items-center";

    const minusItemBtn = document.createElement('button');
    minusItemBtn.className = "m-2 btn-minus";
    //boton de restar

    const iconoItemMinus = document.createElement('i');
    iconoItemMinus.className = "fa-solid fa-minus";

    const inputCantItem = document.createElement('input');
    inputCantItem.className = "form-control text-center";
    inputCantItem.setAttribute("type", "number");
    inputCantItem.value = 1

    const plusItemBtn = document.createElement('button');
    plusItemBtn.className = "m-2 btn-plus";
    //boton de sumar

    const iconoItemPlus = document.createElement('i');
    iconoItemPlus.className = "fa-solid fa-plus";

    const trashItemBtn = document.createElement('button');
    trashItemBtn.className = "btn m-2";
    //boton de basura

    const iconoItemTrash = document.createElement('i');
    iconoItemTrash.className = "fa-solid fa-trash";

    minusItemBtn.appendChild(iconoItemMinus);
    plusItemBtn.appendChild(iconoItemPlus);
    trashItemBtn.appendChild(iconoItemTrash);
    inputGroup.append(minusItemBtn, inputCantItem, plusItemBtn, trashItemBtn);
    colContainer.append(itemTitle, itemPrice, inputGroup);
    itemRow.append(imgCard, colContainer);

    containerOfItems.appendChild(itemRow);
}

function createCards() {
    const containerOfProductos = document.getElementById("containerOfProductos");

    listaDeProductosDisponibles.forEach(producto => {
        const cardCol = document.createElement('div');
        cardCol.className = "col";

        const cardContainer = document.createElement('div');
        cardContainer.className = "card card-container";

        const imgCard = document.createElement('img');
        imgCard.className = "img-shop card-img-top";
        imgCard.setAttribute("alt", producto.nombre);
        imgCard.setAttribute("src", producto.img);

        const cardBody = document.createElement('div');
        cardBody.className = "card-body";

        const cardTitle = document.createElement('h3');
        cardTitle.className = "card-title";
        cardTitle.innerText = producto.nombre;

        const cardPrice = document.createElement('p');
        cardPrice.className = "card-text";
        cardPrice.innerText = `$${producto.precio}`;

        const cardBtn = document.createElement('button');
        cardBtn.className = "d-block btn btn-warning";
        cardBtn.innerText = "Agregar al carrito";
        cardBtn.addEventListener("click", () => agregarProducto(producto));

        cardBody.append(cardTitle, cardPrice, cardBtn);
        cardContainer.append(imgCard, cardBody);
        cardCol.appendChild(cardContainer);

        containerOfProductos.appendChild(cardCol);
    })
}

createCards();