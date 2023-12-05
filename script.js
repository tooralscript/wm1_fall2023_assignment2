let products = [];
let filteredProducts = [];
let productsDescription = [];
let productsSection = document.querySelector(".section1");
let individualProductSection = document.querySelector(".section2");
let dataLoading = document.querySelector(".circles");
let searchBar = document.querySelector(".inputSearch");
let searchText;
let currentProduct = document.querySelector(".product");
let inputSelect = document.querySelector("#selectFilter");
let selectRes;

//filtering the data based on select option
inputSelect.addEventListener("change", (e) => {
  filteredProducts = [];
  selectRes = e.target.value;

  for (let i = 0; i < products.length; i++) {
    if (products[i].category == selectRes) {
      filteredProducts.push(products[i]);
    } else {
      continue;
    }
  }

  displayData(filteredProducts);
});

//opening an individual product page, when clicked on it
individualProductSection.addEventListener("click", (e) => {
  const button = e.target.closest(".bckMain");
  if (button) {
    individualProductSection.innerHTML = "";
    productsSection.style.display = "flex";
    individualProductSection.style.display = "none";
  }
});

// adding on click event to each product is possible this way, because they are not rendered yet when the DOM is loaded
productsSection.addEventListener("click", (e) => {
  const target = e.target.closest(".product");
  if (target) {
    console.log(target.id);
    productsSection.style.display = "none";
    individualProductSection.style.display = "flex";
    individualProductSection.innerHTML += `
    <div class="productIndividual" >
      <div>
      <img src="${products[target.id].images[0]}" alt="HappyFace">
      <img src="${products[target.id].images[1]}" alt="HappyFace" >
      <img src="${products[target.id].images[2]}" alt="HappyFace" >
      <img src="${products[target.id].images[3]}" alt="HappyFace" >
      </div>
      <div>
      <span class="productTitle">Title - ${products[target.id].title}</span>
      <span>Price - ${products[target.id].price}$</span>
      <span>Discount rate - ${products[target.id].discountPercentage}%!</span>
      <span>Category: ${products[target.id].category}</span>
      <span>Available stock: ${products[target.id].stock} units</span>
      <span>Description: ${products[target.id].description}</span>
      <button class="bckMain">Back to main page</button>
      </div>
      
      
    </div>
    `;
  } else {
    console.log("not product");
  }
});

//Loading screen
setTimeout(() => {
  dataLoading.style.display = "none";
}, 3000);

// Fetching the data from API
fetch("https://dummyjson.com/products?limit=100")
  .then((response) => response.json())
  .then((data) => {
    products = data.products;
    console.log("All the products - ", products);
    prepareDescriptions();
    setTimeout(() => {
      displayData(products);
    }, 3000);
  })
  .catch((err) => displayError());

// Displaying the data on the page
displayData = (products) => {
  productsSection.innerHTML = "";
  for (let i = 0; i < products.length; i++) {
    productsSection.innerHTML += `
    <div id="${i}" class="product" >
      <img src="${products[i].thumbnail}" alt="did not load from api">
      <span class="productTitle">${products[i].title} - ${products[i].price}$</span>
      <span>${products[i].discountPercentage}% discount!</span>
      <span>Category: ${products[i].category}</span>
      <span>Available stock: ${products[i].stock} units</span>
    </div>
    `;
  }
};

// Displaying error page in case something went wrong
displayError = () => {
  setTimeout(() => {
    dataLoading.style.display = "none";
    productsSection.innerHTML += `<span class="errorMessage">Sorry, something went wrong...</span>`;
  }, 3000);
};

// Taking all the information of each individual product, and building one long string, which will be needed for search operation
prepareDescriptions = () => {
  for (let i = 0; i < products.length; i++) {
    productsDescription[i] = products[i].title.concat(
      products[i].description,
      products[i].price,
      products[i].discountPercentage,
      products[i].stock,
      products[i].brand,
      products[i].category
    );
  }
};

// Checking for the needed input within the product descriptions, when user enters anything in the search field
searchBar.addEventListener("keyup", (e) => {
  filteredProducts = [];
  searchText = e.target.value;

  for (let i = 0; i < productsDescription.length; i++) {
    if (
      productsDescription[i].toLowerCase().includes(searchText.toLowerCase())
    ) {
      filteredProducts.push(products[i]);
    }
  }
  displayData(filteredProducts);
});
