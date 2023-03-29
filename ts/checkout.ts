import fetcher from "./fetcher";
import iProduct from "./interfaces";

const main = document.querySelector("main") as HTMLElement;
const productsWrapper = document.createElement("section");
productsWrapper.classList.add("productsWrap");
const cart = JSON.parse(localStorage.getItem("cart")!);
let totalPrice = 0;

export default function printCheckout() {
  main.innerHTML = "";
  if (!(localStorage.getItem("cart")!.length > 0)) {
    main.innerText = "Det finns inga produkter i din varukorg";
  }


  cart.map((item: { id: string }) => {
    // [13, 15, 14, 15]
    fetcher(`/wc/v3/products/${item.id}`).then((product: iProduct) => {
      createProduct(product);

    });
    
  });
  main.append(productsWrapper);
}
const totalPriceEl = (document.createElement("p").innerText =
  totalPrice.toString());
console.log(totalPrice)
main.append(totalPriceEl);

function createProduct(product: iProduct) {
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
      phone: "070123456"
    },
    shipping: {
      first_name: "Janne",
      last_name: "Kemi",
      adress_1: "Gatan 10",
      city: "Uddebo",
      postcode: "514 92",
      country: "SE",
      email: "janne@hiveandfive.se",
      phone: "070123456"
    },
    line_items: [
      // LOOPA IGENOM KUNDVAGN
      {
        product_id: 13,
        quantity: 1
      },
      {
        product_id: 11,
        quantity: 2
      }
    ],
    shipping_lines: [
      {
        method_id: "flat_rate",
        method_title: "Flat rate",
        total: "100"
      }
    ]
  };

  fetch("http://localhost:8888/rest/wp-json/wc/v3/orders", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(order)
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Order skickad", data);
      localStorage.setItem("cart", JSON.stringify([]));
      printCheckout();
    })
    .catch((err) => console.log("err", err));
}
