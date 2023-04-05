function order(item){
    localStorage.removeItem('item');
    localStorage.setItem('item', JSON.stringify(item));
}

function getItem(){
    let item = JSON.parse(localStorage.getItem('item'));

    const orderContainer = document.querySelector('.order-container');
    
    let itemTitle = document.createElement('h2');
    itemTitle.textContent = item.title;
    orderContainer.appendChild(itemTitle);

    let itemImage = document.createElement('img');
    itemImage.src = item.image;
    orderContainer.appendChild(itemImage);

    let itemDescription = document.createElement('p');
    itemDescription.textContent = item.description;
    orderContainer.appendChild(itemDescription);

    let itemPrice = document.createElement('p');
    itemPrice.textContent = `$${item.price}`
    orderContainer.appendChild(itemPrice);
}