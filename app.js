let cart = [];
let PrecioTotal = 0;

function AddItem(){
    const ItemName = document.getElementById("item-name").value;
    const ItemPrice =parseFloat (document.getElementById("item-price").value);

    if(ItemName.trim()==="" ||isNaN(ItemPrice)||ItemPrice <= 0){
        alert("por favor ingrese un número válido o precio válido")
        return;
    }

    const existingItem = cart.find(item => item.name === ItemName && item.price === ItemPrice);
    
    if(existingItem){
        existingItem.quantity++;
    } else{
        const newItem = { name: ItemName, price: ItemPrice, quantity: 1};
        cart.push(newItem);
    }

    PrecioTotal += ItemPrice;

    updateItemList();
    updateTotalPrice();

    //clear input
    document.getElementById("item-name").value = '';
    document.getElementById("item-price").value = '';

}

function updateItemList(){
    const ulItemList = document.getElementById("ulItemList");
    ulItemList.innerHTML = ''; 
    cart.forEach((item,index)  =>{
        const liItem = document.createElement("li");
        liItem.innerHTML = `${item.name} Pu  $${item.price.toFixed(2)}*${item.quantity} = $${(item.price*item.quantity).toFixed(2)}
        <button onclick="AddQuantity(${index})">Add Quantity</button>
        <button onclick="DecreaseQuantity(${index})">Decrease Quantity</button>
        <button onclick="RemoveItem(${index})">Remove</button>

        `
        ulItemList.appendChild(liItem);
    })
}

function updateTotalPrice(){
    const totalPriceElement = document.getElementById("totalPrice");
    totalPriceElement.textContent = PrecioTotal.toFixed(2);
}

function AddQuantity(index){
    cart[index].quantity++;
    PrecioTotal += cart[index].price;

    updateItemList();
    updateTotalPrice();

}

function DecreaseQuantity(index){
    if(cart[index].quantity > 1){
        cart[index].quantity--;
        PrecioTotal -= cart[index].price;
    }
    updateItemList();
    updateTotalPrice();
}

function RemoveItem(index){
    const removedItem = cart.splice(index,1)[0];
    PrecioTotal -= removedItem.price*removedItem.quantity;

    updateItemList();
    updateTotalPrice();

}

