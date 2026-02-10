(async () => {

  const productContainerEl = document.getElementById("productContainer");
  const searchInputEl = document.getElementById("searchInput");

  const url = "https://fakestoreapi.com/products";

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await fetch(url);
      return await res.json();    // ✔ FIXED
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const products = await fetchProducts();  

  // CARD GENERATOR
  const generateProducts = (product) => {
    return `
      <div class="product_card">
        <div class="image_container">
          <img src="${product.image}" alt="" />
        </div>
        <div class="product_content">
          <h2>${product.title}</h2>
          ${product.description.split(" ").slice(0, 20).join(" ")}
          <button>${product.price} $</button>
        </div>
      </div>
    `;
  };

  // RENDER PRODUCTS
  const renderProducts = (products) => {
    productContainerEl.innerHTML = "";
    products.forEach((product) => {
      productContainerEl.innerHTML += generateProducts(product);
    });
  };

  const checkTextConatin = (Text, searchText) => {
    return Text.toString().toLowerCase().includes(searchText);
  };

  const filterHandler = (event) => {
    const searchText = event.target.value.toLowerCase();

    const filteredProducts = products.filter((product) => {
      return (
        checkTextConatin(product.description, searchText) ||
        checkTextConatin(product.title, searchText) ||
        checkTextConatin(product.price, searchText)
      );
    });
    renderProducts(filteredProducts);
  };

  searchInputEl.addEventListener("keyup",filterHandler);

  renderProducts(products); 

})();
