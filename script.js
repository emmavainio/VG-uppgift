//laddar alla produkter

document.addEventListener('DOMContentLoaded', function () {
    fetchAllProducts();
});

function fetchAllProducts() {
    console.log("inside function");
    const gridContainer = document.querySelector('.grid-container');
    const url = 'https://fakestoreapi.com/products/';

    fetch(url)
        .then(res => res.json())
        .then(products => {
            console.log(products); 
            products.forEach(product => {

                const item = {
                    id: product.id, 
                    title: product.title, 
                    price: product.price,
                    description: product.description, 
                    category: product.category, 
                    image: product.image
                };

                const productDiv = document.createElement('div');
                const cardBodyDiv = document.createElement('div');
                gridContainer.appendChild(productDiv);

                productDiv.classList.add('product', 'col-sm-3', 'pt-20', 'my-10', 'h-40vh', 'card');
                //cardBodyDiv.classList.add('position-absolute', 'bottom-10px', 'left-50%');
                //lägg till , 'border'

                const productImage = document.createElement('img');
                productImage.classList.add('img-fluid', 'mx-auto', 'd-block', 'card-img-top');
                productImage.src = product.image;
                productImage.setAttribute('style', 'max-width: 200px; max-height: 250px;')
                productDiv.appendChild(productImage);
                productDiv.appendChild(cardBodyDiv);

                const productName = document.createElement('h5');
                productName.textContent = product.title;
                cardBodyDiv.appendChild(productName);

                const productPrice = document.createElement('p');
                productPrice.textContent = `$${product.price}`;
                cardBodyDiv.appendChild(productPrice);
                
                const productA = document.createElement('a');
                productA.setAttribute('href', 'index.html'); //ändra denna till något rimligt
                cardBodyDiv.appendChild(productA);

                const productButton = document.createElement('button')
                productButton.textContent = "Add to cart";
                //productButton.classList.add('buy-button');
                productButton.setAttribute('type', 'button');
                productButton.classList.add('btn', 'btn-outline-dark');
               
                productButton.onclick = function () {
                    order(item)
                }  
                productA.appendChild(productButton)
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
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');

                const productImage = document.createElement('img');
                productImage.src = product.image;
                productDiv.appendChild(productImage);

                const productName = document.createElement('h2');
                productName.textContent = product.title;
                productDiv.appendChild(productName);

                const productPrice = document.createElement('p');
                productPrice.textContent = `$${product.price}`;
                productDiv.appendChild(productPrice);
                gridContainer.appendChild(productDiv);

                const item = {
                    id: product.id, 
                    title: product.title, 
                    price: product.price,
                    description: product.description, 
                    category: product.category, 
                    image: product.image
                };

                const productA = document.createElement('a');
                productA.setAttribute('href', 'order.html');
                productDiv.appendChild(productA);

                const productButton = document.createElement('button')
                productButton.textContent = "Köp";
                productButton.classList.add('buy-button');
                productButton.onclick = function () {
                    order(item)
                }  
                productA.appendChild(productButton)
            });
        })
        .catch(error => {
            console.error(`Error fetching products for ${category}: ${error}`);
        });
}

//Vad som händer när man trycker på add to cart-knappen

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


//kopia av bookmaker

document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
    
    let siteName = document.getElementById('siteName').value;
    let siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName, siteUrl)){
        return false;
      }

    let bookmark = {
        name: siteName,
        url: siteUrl
    }

    if(localStorage.getItem('bookmarks') === null) {
        //init array
        let bookmarks = [];
        //add to array
        bookmarks.push(bookmark);
        //set to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        //get bookmarks from localstorage
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //add bookmark to arr 
        bookmarks.push(bookmark);
        //reset back to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    fetchBookmarks();
    e.preventDefault();
}

//

function deleteItem(url) {
    //get bookmarks
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //loop through bookmarks
    for(let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            bookmarks.splice(i, 1);

        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //refetch bookmarks
    fetchBookmarks();
}


//fetch bookmarks
function fetchCartItems() {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //get output id

    let bookmarkResults = document.getElementById('bookmarkResults');

    bookmarkResults.innerHTML = '';

    for(let i = 0; i < bookmarks.length; i++) {
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;

        bookmarkResults.innerHTML += '<div class="well">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-default" target="_blank" href="'+addhttp(url)+'">Visit</a> ' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                  '</h3>'+
                                  '</div>';
    }
}