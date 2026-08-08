const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

const cartBtn = document.getElementById("cartBtn");
const cartPanel = document.getElementById("cartPanel");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

let cart = [];


/* Display Products */
function displayProducts(list) {

    productContainer.innerHTML = "";

    if (list.length === 0) {

        productContainer.innerHTML =
            "<p class='no-products'>No products found.</p>";

        return;
    }

    list.forEach(function(product) {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <img
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
            >

            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="category">
                    ${product.category}
                </p>

                <p class="price">
                    ₹${product.price}
                </p>

                <button
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>

            </div>
        `;

        productContainer.appendChild(card);
    });
}


/* Search and Filter */
function filterProducts() {

    const searchText =
        searchInput.value.toLowerCase().trim();

    const category =
        categoryFilter.value;

    const filteredProducts =
        products.filter(function(product) {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchText);

            const matchesCategory =
                category === "all" ||
                product.category === category;

            return matchesSearch && matchesCategory;
        });

    displayProducts(filteredProducts);
}


/* Add Product to Cart */
function addToCart(productId) {

    const product =
        products.find(function(item) {
            return item.id === productId;
        });

    if (!product) {
        return;
    }

    cart.push(product);

    updateCart();

    alert(product.name + " added to cart!");
}


/* Update Cart */
function updateCart() {

    cartCount.textContent = cart.length;

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

        cartTotal.textContent = "0";

        return;
    }


    let total = 0;

    cart.forEach(function(product, index) {

        total += product.price;

        const item = document.createElement("div");

        item.className = "cart-item";

        item.innerHTML = `
            <div>
                <strong>${product.name}</strong>
                <p>₹${product.price}</p>
            </div>

            <button
                onclick="removeFromCart(${index})"
            >
                Remove
            </button>
        `;

        cartItems.appendChild(item);
    });

    cartTotal.textContent = total;
}


/* Remove Product */
function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


/* Open Cart */
cartBtn.addEventListener("click", function() {

    cartPanel.classList.add("show");

});


/* Close Cart */
closeCart.addEventListener("click", function() {

    cartPanel.classList.remove("show");

});


/* Search */
searchInput.addEventListener(
    "input",
    filterProducts
);


/* Category Filter */
categoryFilter.addEventListener(
    "change",
    filterProducts
);


/* Checkout */
checkoutBtn.addEventListener("click", function() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }

    alert(
        "Thank you for shopping with ShopEase!"
    );

    cart = [];

    updateCart();

    cartPanel.classList.remove("show");
});


/* Shop Now Button */
function showProducts() {

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* Initial Display */
displayProducts(products);