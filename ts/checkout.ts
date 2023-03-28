import fetcher from "./fetcher";

const main = document.querySelector("main") as HTMLElement;
const contentWrapper = document.createElement("div");
contentWrapper.classList.add("checkoutWrapp");

interface iProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
  images: [src: string];
}

export default function printCheckout() {
  main.innerHTML = "";
  if (!(localStorage.getItem("cart")!.length > 0)) {
    main.innerText = "Det finns inga produkter i din varukorg";
  }

  const cart = JSON.parse(localStorage.getItem("cart")!);
  let cost = 0;
  cart.map((id: string) => {
    // [13, 15, 14, 15]
    fetcher(`/wc/v3/products/ ${id}`).then((p: iProduct) => {
      const product = checkQuantity(p);
      const hasBeenPrinted: iProduct[] = [];
      cost += product.price;
      if (product.quantity > 1) {
        if (!hasBeenPrinted.find((p: iProduct) => (p.id = product.id))) {
          //print
          //lägg till i has been printed
        }
      } else {
        //printa
      }
    });
  });
}
const previousProducts: iProduct[] = [];

function checkQuantity(prod: iProduct) {
  prod.quantity = 1;
  const found = previousProducts.find(
    (prevProd: iProduct) => prevProd.id === prod.id
  );
  previousProducts.push(prod);

  if (found) {
    found.quantity += 1;
    return found;
  } else return prod;
}
