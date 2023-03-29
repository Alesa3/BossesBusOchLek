import iProduct from "./interfaces";
import printCheckout from "./checkout";
import fetcher from "./fetcher";
const main = document.querySelector("main") as HTMLElement;
const carouselWrapper = document.querySelector(".carousel") as HTMLDivElement;

export function addToCart(event: Event) {
  const btn = event.target as HTMLButtonElement;

  // HÄMTA
  let cart = JSON.parse(localStorage.getItem("cart")!);

  // ÄNDRA
  if (cart.length > 0) {
    let existingProduct = cart.find((c: iProduct) => c.id === btn.id);
    if (existingProduct) {
      existingProduct.quantity++;
      const position = cart.findIndex(
        (c: iProduct) => c.id == existingProduct.id
      );
      cart[position] = existingProduct;
    } else {
      cart.push({
        id: btn.id,
        quantity: 1,
      });
    }
  } else {
    cart.push({
      id: btn.id,
      quantity: 1,
    });
  }

  // SPARA
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function removeFromCart(event: Event) {
  const btn = event.target as HTMLButtonElement;

  // HÄMTA
  let cart = JSON.parse(localStorage.getItem("cart")!);

  // ÄNDRA
  let productToRemove = cart.find((c: iProduct) => c.id === btn.id);
  const indexOfProduct = cart.indexOf(productToRemove);
  cart.splice(indexOfProduct, 1);

  // SPARA
  localStorage.setItem("cart", JSON.stringify(cart));
  printCart();
}

function getProductQuantity(product: any) {
  let cart = JSON.parse(localStorage.getItem("cart")!);
  let numberOfItems = cart.find((c: iProduct) => c.id == product.id);
  return numberOfItems.quantity;
}

export default function printCart() {
  carouselWrapper.classList.add("hidden");
  main.innerHTML = "";
  const hundkorgWrapper = document.createElement("div");
  hundkorgWrapper.setAttribute("class", "hundkorg-wrapper");
  main.append(hundkorgWrapper);
  const cartTitle = document.createElement("h2");
  cartTitle.innerText = "Din hundkorg";
  cartTitle.setAttribute("id", "cart-title");

  const cartUL = document.createElement("ul");
  cartUL.setAttribute("id", "cart-UL");
  hundkorgWrapper.append(cartTitle, cartUL);

  if (localStorage.getItem("cart")) {
    if (JSON.parse(localStorage.getItem("cart")!).length > 0) {
      let cart = JSON.parse(localStorage.getItem("cart")!);
      let totalAmount: number = 0;

      cart.map((product: any) => {
        fetcher("/wc/v3/products/" + product.id).then((product: any) => {
          const productLI = document.createElement("li");
          productLI.setAttribute("class", "cart-LI");

          const productInfo = document.createElement("div");
          productInfo.setAttribute("class", "product-info");

          const productImg = document.createElement("img");

          const upperProductBox = document.createElement("div");
          upperProductBox.setAttribute("class", "upper-product-info");

          const productDetails = document.createElement("div");
          productDetails.setAttribute("class", "product-details");
          const productName = document.createElement("h3");
          const productDescription = document.createElement("p");
          productDetails.append(productName, productDescription);

          const productDeleteDiv = document.createElement("div");
          const productDelete = document.createElement("button");
          productDeleteDiv.append(productDelete);

          upperProductBox.append(productDetails, productDeleteDiv);

          const lowerProductBox = document.createElement("div");
          lowerProductBox.setAttribute("class", "lower-product-info");
          const productPrice = document.createElement("span");
          const productQuantity = document.createElement("span");
          lowerProductBox.append(productPrice, productQuantity);

          productImg.src = product.images[0].src;
          productName.innerText = product.name;
          productDescription.innerHTML = product.description;
          productPrice.innerText = product.price + " kr";
          productPrice.setAttribute("class", "product-price");

          productQuantity.innerText = `ANTAL: ${getProductQuantity(product)}`;
          productDelete.innerText = "Radera";
          productDelete.id = product.id;
          productDelete.addEventListener("click", removeFromCart);

          productInfo.append(upperProductBox, lowerProductBox);
          productLI.append(productImg, productInfo);
          cartUL.append(productLI);

          totalAmount += Number(product.price * getProductQuantity(product));
          cartTotalPrice.innerText = totalAmount.toString() + " kr";
        });
      });
      const checkoutRow = document.createElement("div");
      checkoutRow.setAttribute("id", "checkout-container");
      hundkorgWrapper.append(checkoutRow);

      const priceInfo = document.createElement("div");
      priceInfo.setAttribute("id", "price-info");
      const cartTotalTitle = document.createElement("h3");
      cartTotalTitle.innerText = "Summa";
      const cartTotalPrice = document.createElement("p");
      cartTotalPrice.innerText = totalAmount.toString() + " kr";
      priceInfo.append(cartTotalTitle, cartTotalPrice);

      const checkoutContainer = document.createElement("div");
      checkoutContainer.setAttribute("id", "checkout-button-container");
      const checkoutBtn = document.createElement("button");
      checkoutBtn.innerText = "Gå till kassa";

      checkoutBtn.addEventListener("click", printCheckout);

      checkoutContainer.append(checkoutBtn);

      checkoutRow.append(priceInfo, checkoutContainer);
    } else {
      hundkorgWrapper.innerText = "Din hundvagn är tom!";
    }
  }

  if (JSON.parse(localStorage.getItem("cart")!).length > 0) {
    // hundkorg.innerText =
    JSON.parse(localStorage.getItem("cart")!).length + 1 + " st produkter";

    let emptyCartBtn = document.createElement("button");
    emptyCartBtn.innerText = "Töm kundvagnen";

    emptyCartBtn.addEventListener("click", () => {
      localStorage.setItem("cart", JSON.stringify([]));
      printCart();
    });

    //     let sendOrderBtn = document.createElement("button");
    //     sendOrderBtn.innerText = "Skicka order";

    //     sendOrderBtn.addEventListener("click", postOrder);

    //     cart.append(emptyCartBtn, sendOrderBtn);
    //   } else {
    //     console.log("Tom kundvagn");
    //     cart.innerText = "Inga produkter";
    //   }

    main.append(hundkorgWrapper);
  }
}
