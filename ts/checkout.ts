import fetcher from "./fetcher";

const main = document.querySelector("main") as HTMLElement;
const productsWrapper = document.createElement("section");
productsWrapper.classList.add("productsWrap");

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
  // let cost = 0;
  cart.map((id: string) => {
    // [13, 15, 14, 15]
    fetcher(`/wc/v3/products/ ${id}`).then((p: iProduct) => {
      const product = checkQuantity(p);
      const hasBeenPrinted: iProduct[] = [];
      // cost += product.price;
      if (product.quantity > 1) {
        if (!hasBeenPrinted.find((p: iProduct) => (p.id = product.id))) {
          //print
          createProduct(product);

          //lägg till i has been printed
        }
      } else {
        //printa
        createProduct(product);
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

function createProduct(product: iProduct) {
  const productName = (document.createElement("p").innerText = product.name);
  const productPrice = (document.createElement("p").innerText =
    product.price.toString());
  const productQuantity = (document.createElement("p").innerText =
    product.quantity.toString());
  const productImage = document.createElement("img");
  productImage.setAttribute("src", product.images[0]);

  const sectionProduct = document.createElement("div");

  sectionProduct.append(
    productImage,
    productName,
    productPrice,
    productQuantity
  );
  productsWrapper.append(sectionProduct);
}
