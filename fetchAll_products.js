//Ladda alla produkter

document.addEventListener('DOMContentLoaded', function () {
    fetchAllProducts();
});

function fetchAllProducts() {
    console.log("inside function");
    const gridContainer = document.querySelector('.grid-container');
    const url = 'https://fakestoreapi.com/products/';

    //gridContainer.innerHTML = '';

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


// Ladda prod per kategori