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
    const dropdown = document.getElementById('company-select'); // Get the dropdown element
    const selectedCompany = dropdown.value; // Get the selected company

    const container = document.getElementById('product-container'); // Ensure there's a container with this ID in the HTML
    container.innerHTML = ''; // Clear any existing content

    const filteredProducts = selectedCompany 
        ? products.filter(product => product.fields.company === selectedCompany) // Filter products by selected company
        : products; // If no company is selected, show all products

    filteredProducts.slice(0, 5).forEach(product => { // Loop through the first 5 filtered products
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

// Add an event listener to the dropdown to update products when the selection changes
document.getElementById('company-select').addEventListener('change', async () => {
    try {
        const response = await fetch('https://www.course-api.com/javascript-store-products');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        displayProducts(products); // Update the displayed products based on the selected company
    } catch (error) {
        handleError(error); // Handle any errors
    }
});

//Task 5
function handleError(error) { // This function handles errors that occur during the fetch or parsing process.
    console.error('An error occurred:', error.message); // Log the error message to the console
}

//Task 6
fetchProductsThen(); // Call the function to fetch products using Promises
fetchProductsAsync(); // Call the function to fetch products using async/await

//Extra
async function fetchCompanyNames() {
    try {
        const response = await fetch('https://www.course-api.com/javascript-store-products');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        const companies = [...new Set(products.map(product => product.fields.company))]; // Extract unique company names
        console.log(companies);

        const dropdown = document.getElementById('company-select'); // Ensure there's a select element with this ID in youbr HTML
        dropdown.innerHTML = ''; // Clear any existing options

        const noneOption = document.createElement('option'); // Create an option for "None"
        noneOption.value = ''; // Set the value of the "None" option
        noneOption.textContent = 'None'; // Set the display text of the "None" option
        dropdown.appendChild(noneOption); // Add the "None" option to the dropdown

        companies.forEach(company => {
            const option = document.createElement('option'); // Create an option element
            option.value = company; // Set the value of the option
            option.textContent = company; // Set the display text of the option
            dropdown.appendChild(option); // Add the option to the dropdown
        });

        return companies; // Return the company names
    } catch (error) {
        handleError(error); // Handle any errors
    }
}
fetchCompanyNames(); // Call the function to fetch and log company names

