let menu = document.getElementById("menu");
let cart = document.getElementById("cart");

// KOLLA OM DET FINNS EN KUNDVAGN
if (localStorage.getItem("cart")) {
  console.log("Finns en kundvagn");
  printCart();
} else {
  console.log("Skapar tom kundvagn");
  let cart: any[] = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  printCart();
}

fetch("http://localhost:8888/rest/wp-json/wc/store/products")
  .then((res) => res.json())
  .then((data) => {
    console.log("produkter", data);
    printProductList(data);
  });

function addToCart(event: Event) {
  const btn = event.target as HTMLButtonElement;

  btn.addEventListener("click", () => {
    console.log("Click på produkt", btn.id);

    // HÄMTA
    let cart = JSON.parse(localStorage.getItem("cart")!);
    console.log("cart från LS", cart);

    // ÄNDRA
    cart.push(btn.id);

    // SPARA
    localStorage.setItem("cart", JSON.stringify(cart));
    printCart();
  });
}

function printCart() {
  if (JSON.parse(localStorage.getItem("cart")!).length > 0) {
    console.log("Finns produkter");
    cart.innerText =
      JSON.parse(localStorage.getItem("cart")!).length + 1 + " st produkter";

    let emptyCartBtn = document.createElement("button");
    emptyCartBtn.innerText = "Töm kundvagnen";

    emptyCartBtn.addEventListener("click", () => {
      localStorage.setItem("cart", JSON.stringify([]));
      printCart();
    });

    let sendOrderBtn = document.createElement("button");
    sendOrderBtn.innerText = "Skicka order";

    sendOrderBtn.addEventListener("click", postOrder);

    cart.append(emptyCartBtn, sendOrderBtn);
  } else {
    console.log("Tom kundvagn");
    cart.innerText = "Inga produkter";
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

fetch("http://localhost:8888/rest/wp-json/menus/v1/menus/testmeny")
  .then((res) => res.json())
  .then((data) => console.log("menus", data));
