//laddar alla produkter

document.addEventListener('DOMContentLoaded', function () {
    fetchAllProducts();
});

function fetchAllProducts() {

    const gridContainer = document.querySelector('.grid-container');
    const url = 'https://fakestoreapi.com/products/';

    fetch(url)
        .then(res => res.json())
        .then(products => {products.forEach(product => {

                const item = {
                    id: product.id, 
                    title: product.title, 
                    price: product.price,
                    description: product.description, 
                    category: product.category, 
                    image: product.image
                };
                
                gridContainer.innerHTML += `<div class="product col-sm-3 pt-20 my-10 h-40vh card p-3">
                                                <img class="img-fluid mx-auto d-block card-img-top" src="${item.image}" style="max-width: 200px; max-height: 250px;">
                                                    <div class="card-body">  
                                                        <h5 class="card-title">${item.title}</h5>
                                                        <p class="card-text">$${item.price}</p>
                                                        <button type="button" id="${item.id}" class="btn btn-outline-dark" onclick="addToCart(${item.id})">Add to cart</button>
                                                    </div>
                                            </div>`   
                                  
            });
        })
        .catch(error => {
            console.error(`Error fetching products: ${error}`);
        });
}

//laddar produkter per kategori

function fetchProducts(category) {
    const gridContainer = document.querySelector('.grid-container');
    const url = `https://fakestoreapi.com/products/category/${category}`;

    gridContainer.innerHTML = '';

    fetch(url)
        .then(res => res.json())
        .then(products => {
            products.forEach(product => {
                const item = {
                    id: product.id, 
                    title: product.title, 
                    price: product.price,
                    description: product.description, 
                    category: product.category, 
                    image: product.image
                };
                
                gridContainer.innerHTML += `<div class="product col-sm-3 pt-20 my-10 h-40vh card p-3">
                                                <img class="img-fluid mx-auto d-block card-img-top" src="${item.image}" style="max-width: 200px; max-height: 250px;">
                                                    <div class="card-body">  
                                                        <h5 class="card-title">${item.title}</h5>
                                                        <p class="card-text">$${item.price}</p>
                                                        <button type="button" id="${item.id}" class="btn btn-outline-dark" onclick="addToCart(${item.id})">Add to cart</button>
                                                    </div>
                                            </div>`
            });
        })
        .catch(error => {
            console.error(`Error fetching products for ${category}: ${error}`);
        });
}

//Vad som händer när man trycker på add to cart-knappen

async function addToCart(id) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    let index = cart.findIndex(product => product.id === id);
    if(index >= 0) {
        cart[index].quantity++;
    } else {
        await fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(product => {
                const item = {
                    id: product.id, 
                    title: product.title, 
                    price: product.price,
                    description: product.description, 
                    category: product.category, 
                    image: product.image,
                    quantity: 1
                };
                console.log(item);
                cart.push(item);
        })
        .catch(error => {
            console.error(`Error fetching products for ${category}: ${error}`);
        });
    }
    //lägger till carten i ls igen
    localStorage.setItem("cart", JSON.stringify(cart));
}

function fetchCartItems() {
    const container = document.getElementById('modal-cart');
    container.innerHTML = '';

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.forEach(product => {
        container.innerHTML += `<div class="d-flex p-3 row">  
                                    <div class="col-3">
                                        <img class="img-fluid mx-auto d-block" src="${product.image}" style="max-width: 100px; max-height: 150px;">
                                    </div>
                                    <div class="col-9">
                                        <h5 class="card-title">${product.title}</h5>
                                        <p class="card-text">$${product.price}</p>
                                    </div>
                                </div>`
    })

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