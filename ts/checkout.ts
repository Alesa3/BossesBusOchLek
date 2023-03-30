import fetcher from "./fetcher";
import iProduct from "./interfaces";

const main = document.querySelector("main") as HTMLElement;
const productsWrapper = document.createElement("section");
productsWrapper.classList.add("productsWrap");

let totalPrice = 0;
const totalPriceEl = document.createElement("p");
totalPriceEl.className = "priceSec";

export default function printCheckout() {
  totalPrice = 0;
  main.innerHTML = "";
  productsWrapper.innerHTML = "";
  const cart = JSON.parse(localStorage.getItem("cart")!);

  cart.map((item: { id: string }) => {
    console.log(item);
    fetcher(`/wc/v3/products/${item.id}`).then((product: iProduct) => {
      createProduct(product);
    });
  });

  const checkoutButton = document.createElement("button");
  checkoutButton.innerText = "Skicka order";
  checkoutButton.addEventListener("click", postOrder);
  printForm();

  main.append(productsWrapper, totalPriceEl, checkoutButton);
}
function printForm() {
  const form = document.createElement("form");
  const firstName = document.createElement("input");
  firstName.className = "firstName";
  const lastName = document.createElement("input");
  lastName.className = "lastName";
  const adress = document.createElement("input");
  adress.className = "adress";
  const city = document.createElement("input");
  city.className = "city";
  const postcode = document.createElement("input");
  postcode.className = "postCode";
  const email = document.createElement("input");
  email.className = "email";
  const phone = document.createElement("input");
  phone.className = "phone";

  form.append(firstName, lastName, adress, city, postcode, email, phone);
  main.append(form);
}

function createProduct(product: iProduct) {
  const cart = JSON.parse(localStorage.getItem("cart")!);
  const cartItem = cart.find((c: any) => c.id == product.id);

  const productName = (document.createElement("p").innerText = product.name);
  const productPrice = (document.createElement(
    "p"
  ).innerText = ` Pris: ${product.price}`);
  const productQuantity = (document.createElement(
    "p"
  ).innerText = ` Antal: ${cartItem.quantity}`);
  const productImage = document.createElement("img");
  productImage.src = product.images[0].src;

  const sectionProduct = document.createElement("div");
  totalPrice += product.price * cartItem.quantity;
  totalPriceEl.innerText = `Totalsumma: ${totalPrice.toString()} SEK`;

  sectionProduct.append(
    productImage,
    productName,
    productPrice,
    productQuantity
  );
  productsWrapper.append(sectionProduct);
}

function postOrder() {
  console.log("Skicka order");

  // SKAPA BODY
  const order = {
    payment_method: "bacs",
    payment_method_title: "Direct Bank Transfer",
    set_paid: true,
    customer_id: 1,
    billing: {
      first_name: document.querySelector("input.name"),
      last_name: document.querySelector("input.lastName"),
      adress_1: document.querySelector("input.adress"),
      city: document.querySelector("input.city"),
      postcode: document.querySelector("input.postCode"),
      country: "SE",
      email: document.querySelector("input.email"),
      phone: document.querySelector("input.phone"),
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
      printCheckout();
    })
    .catch((err) => console.log("err", err));
}
