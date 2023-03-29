import { iProduct } from "./interfaces";
import printCheckout from "./checkout";
import fetcher from "./fetcher";
const main = document.querySelector("main") as HTMLElement;
const carouselWrapper = document.querySelector(".carousel") as HTMLDivElement;

// async function filterProducts(ID: string): Promise<any> {
//   const result = await fetcher("/wc/v3/products/" + ID);
//   // const result = products.find((product: any) => product.id == ID);
//   console.log(result);
//   return result;
// }

export function addToCart(event: Event) {
  const btn = event.target as HTMLButtonElement;
  console.log(btn.id);
  //[1, 2, 3]

  /*
[
  {
    id: 1
    qty: 1
  },
  {
    id: 12
    qty: 1
  },
  {
    id: 13
    qty: 2
  },
]
*/
  // HÄMTA
  let cart = JSON.parse(localStorage.getItem("cart")!);
  console.log("Cart från localStorage", cart);

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
    console.log("Tom cart, första pushen till cart");
    cart.push({
      id: btn.id,
      quantity: 1,
    });
  }

  // if (cart.length > 0) {
  //   cart.map((c: iProduct) => {
  //     console.log("Början av map, innehåll finns");
  //     if (c.id == btn.id) {
  //       console.log(c);
  //       console.log("Item ID finns i cart");
  //       c.quantity++;
  //       return;
  //     } else {
  //       console.log(c);
  //       console.log("Item ID finns inte i cart");
  //       cart.push({
  //         id: btn.id,
  //         quantity: 1,
  //       });
  //       return;
  //     }
  //   });
  // } else {
  //   console.log("Tom cart, första pushen till cart");
  //   cart.push({
  //     id: btn.id,
  //     quantity: 1,
  //   });
  // }

  // SPARA
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Räkna hur många items finns i cart
export function numberOfItemInCart(cart: string[], id: string) {
  return cart.filter((v) => v == id).length;
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
    console.log("Kundvagn finns");
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

function postOrder() {
  console.log("Skicka order");

  // SKAPA BODY
  let order = {
    payment_method: "bacs",
    payment_method_title: "Direct Bank Transfer",
    set_paid: true,
    customer_id: 1,
    billing: {
      first_name: "Janne",
      last_name: "Kemi",
      adress_1: "Gatan 10",
      city: "Uddebo",
      postcode: "514 92",
      country: "SE",
      email: "janne@hiveandfive.se",
      phone: "070123456",
    },
    shipping: {
      first_name: "Janne",
      last_name: "Kemi",
      adress_1: "Gatan 10",
      city: "Uddebo",
      postcode: "514 92",
      country: "SE",
      email: "janne@hiveandfive.se",
      phone: "070123456",
    },
    line_items: [
      // LOOPA IGENOM KUNDVAGN
      {
        product_id: 13,
        quantity: 1,
      },
      {
        product_id: 11,
        quantity: 2,
      },
    ],
    shipping_lines: [
      {
        method_id: "flat_rate",
        method_title: "Flat rate",
        total: "100",
      },
    ],
  };

  fetch("http://localhost:8888/rest/wp-json/wc/v3/orders", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Order skickad", data);
      localStorage.setItem("cart", JSON.stringify([]));
      printCart();
    })
    .catch((err) => console.log("err", err));
}
