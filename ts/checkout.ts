import fetcher from "./fetcher";
import iProduct from "./interfaces";

const main = document.querySelector("main") as HTMLElement;
const productsWrapper = document.createElement("section");
productsWrapper.classList.add("productsWrap");

let totalPrice = 0;
const totalPriceEl = document.createElement("p");

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
  printForm();
  checkoutButton.addEventListener("click", postOrder);

  main.append(productsWrapper, totalPriceEl, checkoutButton);
}
function printForm() {
  const form = document.createElement("form");
  const firstNameLabel = document.createElement("label")
  firstNameLabel.innerText = "Namn"
  const firstName = document.createElement("input");
  firstName.className="firstName"
  const lastName = document.createElement("input");
  lastName.className="lastName"
  const lastNameLabel = document.createElement("label");
  lastNameLabel.innerText ="Efternamn"
  const adress = document.createElement("input");
  const adressLabel = document.createElement("label")
  adressLabel.innerText= "Gata"
  adress.className="adress"
  const city = document.createElement("input");
  const cityLabel = document.createElement("label");
  cityLabel.innerText = "Ort"
  city.className="city"
  const postcode = document.createElement("input");
  const postcodeLabel = document.createElement("label");
  postcodeLabel.innerText = "Postnummer"
  postcode.className="postCode"
  const email = document.createElement("input");
  const emailLabel = document.createElement("label");
  emailLabel.innerText = "E-post"
  email.className="email"
  email.setAttribute("type", "email")
  const phone = document.createElement("input");
  const phoneLabel = document.createElement("label");
  phoneLabel.innerText = "Telefon"
  phone.className="phone"
  phone.setAttribute("type", "tel")

  form.append(
    firstNameLabel,
    firstName,
    lastNameLabel,
    lastName,
    adressLabel,
    adress,
    cityLabel,
    city,
    postcodeLabel, 
    postcode,
    emailLabel,
    email,
    phoneLabel,
    phone
  );
  main.append(form)
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
  totalPriceEl.innerText = `Total pris: ${totalPrice.toString()}`;

  sectionProduct.append(
    // productImage,
    productName,
    productPrice,
    productQuantity
  );
  productsWrapper.append(sectionProduct);
}

function postOrder() {
  console.log("Skicka order");
  const cartArr = (JSON.parse(localStorage.getItem("cart")!));

  cartArr.map((item: any) => {
    item.id = Number(item.id)
  })

  const firstName = document.querySelector("input.firstName") as HTMLInputElement
  const lastName = document.querySelector("input.lastName") as HTMLInputElement
  const adress =  document.querySelector("input.adress") as HTMLInputElement
  const city = document.querySelector("input.city") as HTMLInputElement
  const postCode = document.querySelector("input.postCode") as HTMLInputElement
  const email = document.querySelector("input.email") as HTMLInputElement
  const phone = document.querySelector("input.phone") as HTMLInputElement
  // SKAPA BODY
  const order = {
    payment_method: "bacs",
    payment_method_title: "Direct Bank Transfer",
    set_paid: true,
    customer_id: 1,
    billing: {
      first_name: firstName.value,
      last_name: lastName.value,
      adress_1: adress.value,
      city: city.value,
      postcode: postCode.value,
      country: "SE",
      email: email.value,
      phone: phone.value,
    },
    shipping: {
      first_name: firstName.value,
      last_name: lastName.value,
      adress_1: adress.value,
      city: city.value,
      postcode: postCode.value,
      country: "SE",
      email: email.value,
      phone: phone.value,
    },
    line_items: cartArr,
    shipping_lines: [
      {
        method_id: "flat_rate",
        method_title: "Flat rate",
        total: "0"
      }
    ]
  };
  console.log(order)
  fetch("http://46.101.130.27/wp-json/wc/v3/orders", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(order)
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Order skickad", data);
      // localStorage.setItem("cart", JSON.stringify([]));
      printCheckout();
    })
    .catch((err) => console.log("err", err));
}
