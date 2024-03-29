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
                                                        <p class="card-text">$${item.price.toFixed(2)}</p>
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
                                                        <p class="card-text">$${item.price.toFixed(2)}</p>
                                                        <button type="button" id="${item.id}" class="btn btn-outline-dark" onclick="addToCart(${item.id})">Add to cart</button>
                                                    </div>
                                            </div>`
            });
        })
        .catch(error => {
            console.error(`Error fetching products for ${category}: ${error}`);
        });
}

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
                cart.push(item);
        })
        .catch(error => {
            console.error(`Error fetching products for ${category}: ${error}`);
        });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}

function fetchCartItems() {
    const container = document.getElementById('modal-cart');
    container.innerHTML = '';

    let cart = JSON.parse(localStorage.getItem("cart"));

    if (cart.length === 0) {
        const container = document.getElementById('modal-cart');
        container.innerHTML = '<p>Your shopping cart is empty!</p>';
        document.getElementById('total-amount').textContent = '';
    }

    cart.forEach(product => {
        container.innerHTML += `<div class="d-flex p-3 row">  
                                    <div class="col-3">
                                        <img class="img-fluid mx-auto d-block" src="${product.image}" style="max-width: 100px; max-height: 150px;">
                                    </div>
                                    <div class="col-6">
                                        <h5>${product.title}</h5>
                                        <p>$${product.price.toFixed(2)}</p>
                                    </div>
                                    <div class="col-1"></div>
                                    <div class="col-2">
                                        <form>
                                            <div class="input-group">
                                                <button class="btn btn-outline-secondary" type="button" onclick="changeProductAmount(-1, ${product.id})">-</button>
                                                <input type="text" class="form-control" placeholder="${product.quantity}" aria-label="quantity" aria-describedby="basic-addon1" id="quantity-input-${product.id} readonly">
                                                <button class="btn btn-outline-secondary" type="button" onclick="changeProductAmount(1, ${product.id})">+</button>
                                            </div>
                                            <p>Total: $${(product.price * product.quantity).toFixed(2)}</p>
                                            <button class="btn btn-danger mt-2 btn-sm" type="button" onclick="removeProduct(${product.id})">Remove</button>
                                        </form>
                                    </div>
                                </div>`;

    })

    //uppdatera totalen för cart
    const totalAmountP = document.getElementById('total-amount');
    let totalAmount = 0;
    cart.forEach(product => { totalAmount += (product.price * product.quantity) });
    totalAmountP.textContent = `Total amount: $${totalAmount.toFixed(2)}`;
}

function changeProductAmount(amount, id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let index = cart.findIndex(product => product.id === id);
    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    fetchCartItems();
}

function removeProduct(id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let index = cart.findIndex(product => product.id === id);
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));

    fetchCartItems();
}

function removeCart() {
    localStorage.removeItem("cart");
    const container = document.getElementById('modal-cart');
    container.innerHTML = '<p>Your shopping cart is empty!</p>';
    document.getElementById('total-amount').textContent = 'Total amount: $0.00';
}

