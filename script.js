let products = {};
let productsSection = document.querySelector("section");
let dataLoading = document.querySelector(".circles");

setTimeout(() => {
  dataLoading.style.display = "none";
}, 4000);

fetch("https://dummyjson.com/products")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    setTimeout(() => {
      displayData(data);
    }, 4000);
  })
  .catch((error) => console.log(error));

displayData = (data) => {
  for (let i = 0; i < data.limit; i++) {
    console.log("for ishe dushdu");
    productsSection.innerHTML += `
    <div class="product" >
      <img src="${data.products[i].thumbnail}" alt="">
      <span class="productTitle">${data.products[i].title}</span>
      <span>${data.products[i].discountPercentage}% discount!</span>
      <span>Category: ${data.products[i].category}</span>
      <span>Available stock: ${data.products[i].stock} units</span>
    </div>
    `;
  }
};

displayError = () => {
  dataLoading.style.display = "none";
  productsSection.innerHTML += `<span class="errorMessage">Sorry, something went wrong...</span>`;
};
