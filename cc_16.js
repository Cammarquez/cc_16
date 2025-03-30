//Initial Commit

//Task 2
function fetchProductsThen() { //This function fetches product data using the Fetch API and handles the response with Promises.
    fetch('https://www.course-api.com/javascript-store-products')
        .then(response => { //Check if the response is ok
            if (!response.ok) {// If the response is not ok, throw an error
                throw new Error(`HTTP error! status: ${response.status}`);// Create a new error with the status code
            }
            return response.json(); // Parse the response as JSON
        })
        .then(data => { // Log the product names to the console
            data.forEach(product => { // Iterate over each product in the data
                console.log(product.fields.name); // Log the product name to the console
            });
        })
        .catch(error => {   // Handle any errors that occur during the fetch or parsing
            console.error('Error fetching products:', error); // Log the error to the console
        });
}

//Task 3
async function fetchProductsAsync() { //This function fetches product data using the Fetch API and handles the response with async/await.
    try {
        const response = await fetch('https://www.course-api.com/javascript-store-products'); // Fetch the product data
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); // Check if the response is ok
        }
        const products = await response.json(); // Parse the response as JSON
        displayProducts(products); // Call the function to display products
    } catch (error) { // Handle any errors that occur during the fetch or parsing
        handleError(error); // Log the error to the console
    }
}

//Task 4
function displayProducts(products) {
    const container = document.getElementById('product-container'); // Ensure there's a container with this ID in your HTML
    container.innerHTML = ''; // Clear any existing content

    products.slice(0, 5).forEach(product => { // Loop through the first 5 products
        const productDiv = document.createElement('div'); // Create a div for each product
        productDiv.classList.add('product'); // Add a class for styling

        const img = document.createElement('img'); // Create an img element
        img.src = product.fields.image[0].url; // Set the image source
        img.alt = product.fields.name; // Set the alt text

        const name = document.createElement('p'); // Create a paragraph for the product name
        name.textContent = product.fields.name; // Set the product name

        const price = document.createElement('p'); // Create a paragraph for the product price
        price.textContent = `$${product.fields.price / 100}`; // Set the product price (assuming price is in cents)

        productDiv.appendChild(img); // Add the image to the product div
        productDiv.appendChild(name); // Add the name to the product div
        productDiv.appendChild(price); // Add the price to the product div
        container.appendChild(productDiv); // Add the product div to the container
    });
}


