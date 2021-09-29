export let featuredProducts = [];

//Create an array of featured products
export function getFeaturedProducts(products) {
  products.filter((products) => {
    if (products.featured === true) {
      featuredProducts.push(products);
    }
  });
}

//Create and display a list of featured items
export function displayFeaturedProducts(featuredProductToDisplay) {
  let listContainer = document.querySelector("#home-featured-list");
  listContainer.innerHTML = "";

  featuredProductToDisplay.forEach(function (featuredProduct) {
    listContainer.innerHTML += `<div class="col-lg-3 col-md-6 col-sm-8 col-xs-12">
                                  <div class="card product mb-3 mt-2">
                                    <a href="details.html?id=${featuredProduct.id}"><img src="${featuredProduct.images.url}" class="card-img-top" alt="product image of ${featuredProduct.name}" /></a>
                                      <div class="card-body">
                                        <span>$ ${featuredProduct.price}</span>
                                        <a href="details.html?id=${featuredProduct.id}" aria-label="click to view product"><h5 class="card-title text-dark">${featuredProduct.name}</h5></a>
                                    </div>
                                </div>
                              </div>`;
  });
}
