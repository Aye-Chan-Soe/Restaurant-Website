document.addEventListener("DOMContentLoaded", function () {
  const toggleDarkModeBtn = document.getElementById("toggleDarkMode");
  const body = document.body;

  toggleDarkModeBtn.addEventListener("click", function () {
    body.classList.toggle("dark-mode");

    // Toggle between moon and sun icons
    const moonIcon = document.querySelector(".bi-moon-stars-fill");
    const sunIcon = document.querySelector(".bi-sun");
    const cartIcon = document.querySelector(".cart");

    if (body.classList.contains("dark-mode")) {
      // Dark mode is active, show sun icon
      moonIcon.style.display = "none";
      sunIcon.style.display = "inline";
      sunIcon.style.color = "#fff";
      cartIcon.style.color = "#fff";
    } else {
      // Dark mode is not active, show moon icon
      moonIcon.style.display = "inline";
      sunIcon.style.display = "none";
      cartIcon.style.color = "#000";
    }
  });
});

// cart
let listProductHTML = document.querySelector(".listProduct");
let listCartHTML = document.querySelector(".listCart");
let iconCart = document.querySelector(".icon-cart");
let iconCartSpan = document.querySelector(".icon-cart span");
let body = document.querySelector("body");
let closeCart = document.querySelector(".close");
let products = [];
let cart = [];

iconCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});
closeCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

const initApp = () => {
  // get data product
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      addDataToHTML();

      // get data cart from memory
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        addCartToHTML();
      }
    });
};
initApp();

const addDataToHTML = () => {
  // remove datas default from HTML

  // add new datas
  if (products.length > 0) {
    // if has data
    products.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.dataset.id = product.id;
      newProduct.classList.add("item");
      newProduct.innerHTML = `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add To Cart</button>`;
      listProductHTML.appendChild(newProduct);
    });
  }
};
listProductHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains("addCart")) {
    let id_product = positionClick.parentElement.dataset.id;
    addToCart(id_product);
  }
});

//filter
// Function to filter products based on category
function filterProducts(category) {
  const filteredProducts =
    category === "all"
      ? products
      : products.filter((product) => product.category === category);
  listProductHTML.innerHTML = "";
  filteredProducts.forEach((product) => {
    let newProduct = document.createElement("div");
    newProduct.dataset.id = product.id;
    newProduct.classList.add("item");
    newProduct.innerHTML = `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add To Cart</button>`;
    listProductHTML.appendChild(newProduct);
  });
}

// Event listener for filter buttons
document.getElementById("filters").addEventListener("click", (event) => {
  if (event.target.classList.contains("filter-btn")) {
    const category = event.target.getAttribute("data-category");
    filterProducts(category);
  }
});

//add to cart
const addToCart = (product_id) => {
  let positionThisProductInCart = cart.findIndex(
    (value) => value.product_id == product_id
  );
  if (cart.length <= 0) {
    cart = [
      {
        product_id: product_id,
        quantity: 1,
      },
    ];
  } else if (positionThisProductInCart < 0) {
    cart.push({
      product_id: product_id,
      quantity: 1,
    });
  } else {
    cart[positionThisProductInCart].quantity =
      cart[positionThisProductInCart].quantity + 1;
  }
  addCartToHTML();
  addCartToMemory();
};
const addCartToMemory = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
const addCartToHTML = () => {
  listCartHTML.innerHTML = "";
  let totalQuantity = 0;
  if (cart.length > 0) {
    cart.forEach((item) => {
      totalQuantity = totalQuantity + item.quantity;
      let newItem = document.createElement("div");
      newItem.classList.add("item");
      newItem.dataset.id = item.product_id;

      let positionProduct = products.findIndex(
        (value) => value.id == item.product_id
      );
      let info = products[positionProduct];
      listCartHTML.appendChild(newItem);
      newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
    });
  }
  iconCartSpan.innerText = totalQuantity;
};

listCartHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (
    positionClick.classList.contains("minus") ||
    positionClick.classList.contains("plus")
  ) {
    let product_id = positionClick.parentElement.parentElement.dataset.id;
    let type = "minus";
    if (positionClick.classList.contains("plus")) {
      type = "plus";
    }
    changeQuantityCart(product_id, type);
  }
});
const changeQuantityCart = (product_id, type) => {
  let positionItemInCart = cart.findIndex(
    (value) => value.product_id == product_id
  );
  if (positionItemInCart >= 0) {
    let info = cart[positionItemInCart];
    switch (type) {
      case "plus":
        cart[positionItemInCart].quantity =
          cart[positionItemInCart].quantity + 1;
        break;

      default:
        let changeQuantity = cart[positionItemInCart].quantity - 1;
        if (changeQuantity > 0) {
          cart[positionItemInCart].quantity = changeQuantity;
        } else {
          cart.splice(positionItemInCart, 1);
        }
        break;
    }
  }
  addCartToHTML();
  addCartToMemory();
};

//truck
document.querySelectorAll(".truck-button").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    let box = button.querySelector(".box"),
      truck = button.querySelector(".truck");

    if (!button.classList.contains("done")) {
      if (!button.classList.contains("animation")) {
        button.classList.add("animation");

        gsap.to(button, {
          "--box-s": 1,
          "--box-o": 1,
          duration: 0.3,
          delay: 0.5,
        });

        gsap.to(box, {
          x: 0,
          duration: 0.4,
          delay: 0.7,
        });

        gsap.to(button, {
          "--hx": -5,
          "--bx": 50,
          duration: 0.18,
          delay: 0.92,
        });

        gsap.to(box, {
          y: 0,
          duration: 0.1,
          delay: 1.15,
        });

        gsap.set(button, {
          "--truck-y": 0,
          "--truck-y-n": -26,
        });

        gsap.to(button, {
          "--truck-y": 1,
          "--truck-y-n": -25,
          duration: 0.2,
          delay: 1.25,
          onComplete() {
            gsap
              .timeline({
                onComplete() {
                  button.classList.add("done");
                },
              })
              .to(truck, {
                x: 0,
                duration: 0.4,
              })
              .to(truck, {
                x: 40,
                duration: 1,
              })
              .to(truck, {
                x: 20,
                duration: 0.6,
              })
              .to(truck, {
                x: 96,
                duration: 0.4,
              });
            gsap.to(button, {
              "--progress": 1,
              duration: 2.4,
              ease: "power2.in",
            });
          },
        });
      }
    } else {
      button.classList.remove("animation", "done");
      gsap.set(truck, {
        x: 4,
      });
      gsap.set(button, {
        "--progress": 0,
        "--hx": 0,
        "--bx": 0,
        "--box-s": 0.5,
        "--box-o": 0,
        "--truck-y": 0,
        "--truck-y-n": -26,
      });
      gsap.set(box, {
        x: -24,
        y: -6,
      });
    }
  });
});

//pop up
// document
//   .getElementById("popup-button")
//   .addEventListener("click", function (event) {
//     event.preventDefault();
//   });
// let popUp = document.getElementById("popup");

// function openPopUp() {
//   popUp.classList.add("open-popup");
// }
// function closePopUp() {
//   popUp.classList.remove("open-popup");
// }
