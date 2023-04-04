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
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');
                productDiv.classList.add('col-sm-3');
                productDiv.classList.add('pt-10');
                productDiv.classList.add('my-10');
                productDiv.classList.add('h-40vh');
                productDiv.classList.add('border');

                const imageDiv = document.createElement('div');
                const productImage = document.createElement('img');
                productImage.classList.add('img-fluid');
                productImage.classList.add('mx-auto');
                productImage.classList.add('d-block');
                productImage.src = product.image;
                productImage.setAttribute('style', 'max-width: 200px; max-height: 200px;')
                imageDiv.appendChild(productImage);
                productDiv.appendChild(imageDiv);

                const productName = document.createElement('h5');
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
                productButton.textContent = "Add to cart";
                //productButton.classList.add('buy-button');
                productButton.setAttribute('type', 'button');
                productButton.classList.add('btn');
                productButton.classList.add('btn-outline-dark');
               
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

document.addEventListener('DOMContentLoaded', function () {
    const productsButton = document.querySelector('#products-button');
    productsButton.addEventListener('click', fetchAllProducts);
});