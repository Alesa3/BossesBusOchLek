import { numberOfItemInCart } from "./cart";
import fetcher from "./fetcher";
import { iProduct } from "./interfaces";

const main = document.querySelector("main") as HTMLElement;
const productsWrapper = document.createElement("section");
productsWrapper.classList.add("productsWrap");



export default function printCheckout() {
  main.innerHTML = "";
  if (!(localStorage.getItem("cart")!.length > 0)) {
    main.innerText = "Det finns inga produkter i din varukorg";
  }

  const cart = JSON.parse(localStorage.getItem("cart")!);
  console.log(cart);
  // let cost = 0;
  cart.map((id: string) => {
    // [13, 15, 14, 15]
    fetcher(`/wc/v3/products/${id}`).then((product: iProduct) => {
      console.log(cart)
      console.log(product.id)
      console.log(numberOfItemInCart(cart, product.id))
    });
  });
  main.append(productsWrapper);
}

function createProduct(product: iProduct) {
  const productName = (document.createElement("p").innerText = product.name);
  const productPrice = (document.createElement("p").innerText = ` Pris: ${product.price.toString()}`);
  const productQuantity = (document.createElement("p").innerText = ` Antal: ${product.quantity.toString()}`);
  const productImage = document.createElement("img");
  productImage.src = product.images[0].src;

  const sectionProduct = document.createElement("div");

  sectionProduct.append(
    // productImage,
    productName,
    productPrice,
    productQuantity
  );
  productsWrapper.append(sectionProduct);
}
