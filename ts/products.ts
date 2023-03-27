import fetcher from "./fetcher";
import printProductPage from "./productPage";
const contentArea = document.querySelector("main") as HTMLElement;
const productPageUrl = "/wc/v3/products/";

interface product {
    id: number;
    name: string;
    permalink: string;
    images: Array<{ src: string }>;
    price: number;
}

export default function printselected(selected: Array<product>) {
    contentArea.innerHTML = "";
    for (let i = 0; i < selected.length; i++) {
        const productCard = document.createElement("div");
        const productId = selected[i].id;
        productCard.innerHTML = "";
        productCard.setAttribute("class", "productCard");
        const productTitle = document.createElement("p");
        productTitle.innerText = selected[i].name;

        let productImage = document.createElement("img") as HTMLImageElement;
        productImage.src = selected[i].images[0].src;

        let productPrice = document.createElement("p");

        productPrice.innerText = selected[i].price + "kr";

        productTitle.addEventListener("click", () => {
            printProductPage(productPageUrl + productId);
        });
        contentArea.append(productCard);
        productCard.append(productImage);
        productCard.append(productTitle, productPrice);
    }
}
