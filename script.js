let products = {};
let productsSection = document.querySelector("section");

fetch("https://dummyjson.com/products")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    displayData(data);
  });

displayData = (data) => {
  for (let i = 0; i < data.limit; i++) {
    console.log("for ishe dushdu");
    productsSection.innerHTML += `
    <div class="product">
      <img src="${data.products[i].thumbnail}" alt="">
      <span class="productTitle">${data.products[i].title}</span>
      <span>${data.products[i].discountPercentage}% discount!</span>
      <span>Category: ${data.products[i].category}</span>
      <span>Available stock: ${data.products[i].stock} units</span>
    </div>
    `;
  }
};
