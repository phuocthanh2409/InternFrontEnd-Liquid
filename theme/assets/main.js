Object.assign(HTMLElement.prototype, {
  addClass: function (className) {
    this.classList.add(className);
  },
  removeClass: function (className) {
    this.classList.remove(className);
  },
});

//Slide
document.addEventListener("DOMContentLoaded", function (event) {
  let item = document.getElementsByClassName("item");
  let length = item.length;

  for (let i = 0; i < length; i++) {
    item[i].addEventListener("click", function () {
      let setClasses = !this.classList.contains("active");
      setClass(item, "active", "remove");
      setClasses && this.classList.toggle("active");
    });
  }

  function setClass(els, className, fnName) {
    for (let i = 0; i < els.length; i++) {
      els[i].classList[fnName](className);
    }
  }

  let slideshow = document.querySelectorAll('[data-section-type="slideshow"]');
  slideshow.forEach((section) => {
    let configList = section.querySelectorAll("[data-tns-config]");
    configList.forEach((config) => {
      tns(JSON.parse(config.innerHTML));
    });
  });
});

//Form Product Home
async function myForm(id) {
  this.classList.add("pending");
  const item = await addItem(id, 1);
  const cart = await getCart();
  this.classList.remove("pending");
  Shopify.item_count = cart.item_count;
  showItemCart();
  showModal(item, cart);
}

async function addItem(variantId, quantity) {
  return await fetch("/cart/add.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      id: variantId,
      quantity: quantity,
    }),
  }).then((data) => data.json());
}

async function getCart() {
  const result = await fetch("/cart.js");
  if (result.status === 200) {
    return result.json();
  }
  throw new Error(
    `Failed to get request, Shopify returned ${result.status} ${result.statusText}`
  );
}

//Item Cart Header
function showItemCart() {
  document.getElementById("cart_item_count").innerHTML = Shopify.item_count;
}
showItemCart();

//Modal
let modalElement = document.getElementById("myModal");
let titleElement = modalElement.querySelector(".js-title");
let priceElement = modalElement.querySelector(".js-price");
let quantityElement = modalElement.querySelector(".js-quantity");
let closeButtons = modalElement.querySelectorAll(".close");
let priceTotalElement = modalElement.querySelector(".js-price-total");
let quantityCartElement = modalElement.querySelector(".js-quantity-cart");
let imageElement = modalElement.querySelector(".js-image");

closeButtons.forEach((button) =>
  button.addEventListener("click", () => {
    modalElement.removeClass("is-open");
    document.body.removeClass("overflow-hidden");
  })
);
window.onclick = function (event) {
  if (event.target == modalElement) {
    modalElement.removeClass("is-open");
    document.body.removeClass("overflow-hidden");
  }
};
function showModal(dataItem, dataCart) {
  modalElement.addClass("is-open");
  titleElement.innerHTML = dataItem.product_title;
  priceElement.innerHTML = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(dataItem.final_line_price / 100);
  quantityElement.innerHTML = dataItem.quantity;
  priceTotalElement.innerHTML = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(dataCart.total_price / 100);
  if (quantityCartElement > 1) {
    quantityCartElement.innerHTML = dataCart.item_count + " items ";
  } else {
    quantityCartElement.innerHTML = dataCart.item_count + " item ";
  }
  imageElement.innerHTML = "<img src=" + dataItem.image + ">";
  document.body.addClass("overflow-hidden");
}
