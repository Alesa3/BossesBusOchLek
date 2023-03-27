import fetcher from "./fetcher";
const main = document.querySelector("main") as HTMLElement;
const carouselWrapper = document.querySelector(".carousel") as HTMLDivElement;

function filterProducts(ID: string) {
  fetcher("/wc/v3/products").then((products: any) => {
    console.log(products);
    const result = products.find((product: any) => product.id == ID);
    return result;
  });
}

export function addToCart(event: Event) {
  const btn = event.target as HTMLButtonElement;
  console.log("Button", btn);
  console.log(btn.id);

  const product = filterProducts(btn.id);

  // HÄMTA
  let cart = JSON.parse(localStorage.getItem("cart")!);
  console.log("cart från LS", cart);

  // ÄNDRA
  cart.push(btn.id);

  // SPARA
  localStorage.setItem("cart", JSON.stringify(cart));
}

export default function printCart() {
  carouselWrapper.classList.add("hidden");
  main.innerHTML = "";
  console.log("hej printcart");
  const hundkorgWrapper = document.createElement("div");

  // products.then((products: any) => {
  //   const productsInCategory: any = products.filter((product: any) => {
  //       return product.categories.find((category: any) => {
  //         return target.id == category.name;
  //       });
  //     });
  // })

  if (localStorage.getItem("cart")) {
    console.log("Kundvagn finns");
    if (JSON.parse(localStorage.getItem("cart")!).length > 0) {
      console.log(JSON.parse(localStorage.getItem("cart")!));
    } else {
      console.log("Tom hundvagn");
    }
  } else {
    console.log("Kundvagn finns inte");
    localStorage.setItem("cart", JSON.stringify([]));
  }

  if (JSON.parse(localStorage.getItem("cart")!).length > 0) {
    console.log("Finns produkter");

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
