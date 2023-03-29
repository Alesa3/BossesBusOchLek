const contentArea = document.querySelector("main") as HTMLElement;
import { addToCart } from "./cart";
import iProduct  from "./interfaces";

export default function printselected(selected: Array<iProduct>) {
  contentArea.innerHTML = "";
  const productsWrapper = document.createElement("section");
  productsWrapper.setAttribute("id", "products-wrapper");
  contentArea.append(productsWrapper);

  for (let i = 0; i < selected.length; i++) {
    const productCard = document.createElement("div");
    const addToCartBtn = document.createElement("button");
    addToCartBtn.innerText = "Lägg till i hundkorgen";
    addToCartBtn.id = selected[i].id;
    addToCartBtn.addEventListener("click", addToCart);
    productCard.innerHTML = "";
    productCard.setAttribute("class", "productCard");
    const productTitle = document.createElement("a");
    productTitle.innerText = selected[i].name;
    productTitle.href = selected[i].permalink;
    let productImage = document.createElement("img") as HTMLImageElement;
    productImage.src = selected[i].images[0].src;

    let productPrice = document.createElement("p");

    productPrice.innerText = selected[i].price + "kr";

    productsWrapper.append(productCard);
    productCard.append(productImage);
    productCard.append(productTitle, productPrice, addToCartBtn);
  }
}
