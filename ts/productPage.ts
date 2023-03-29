import { addToCart } from "./cart";
import fetcher from "./fetcher";
const contentArea = document.querySelector("main") as HTMLElement;
const productUrl = "/wc/v3/products/";

export default function printProductPage(url: string) {
    contentArea.innerHTML = "";
    fetcher(url).then((productPage) => {
        const productDetailsCard = document.createElement("article");
        productDetailsCard.setAttribute("class", "productDetails");
        const relatedProductsCard = document.createElement("article");
        relatedProductsCard.setAttribute("class", "relatedProductsCard");

        const productImage = document.createElement("img");
        productImage.setAttribute("class", "productImage");
        productImage.src = productPage.images[0].src;
        const productTitle = document.createElement("h2");
        productTitle.innerText = productPage.name;
        const productPrice = document.createElement("p");
        productPrice.innerText = productPage.price + "kr";
        const productDescription = document.createElement("p");
        productDescription.innerHTML = productPage.description;

        const purchaseBtn = document.createElement("button");
        const relatedProductsTitle = document.createElement("h2");
        relatedProductsTitle.innerText = "Relaterade Produkter";

        relatedProductsCard.appendChild(relatedProductsTitle);
        productPage.related_ids.forEach((relatedId: any) => {
            fetcher(productUrl + relatedId).then((relatedProduct) => {
                const relatedProductImage = document.createElement("img");
                relatedProductImage.setAttribute("class", "productImage");
                relatedProductImage.src = relatedProduct.images[0].src;
                const relatedProductTitle = document.createElement("h2");
                relatedProductTitle.setAttribute(
                    "class",
                    "relatedProductsTitle"
                );
                relatedProductTitle.innerText = relatedProduct.name;

                relatedProductTitle.addEventListener("click", () => {
                    printProductPage(productUrl + relatedId);
                });
                relatedProductsCard.append(
                    relatedProductImage,
                    relatedProductTitle
                );
            });
        });

        contentArea.innerHTML = "";
        purchaseBtn.innerText ="Lägg till i hundkorg";
        purchaseBtn.id = productPage.id;
        purchaseBtn.addEventListener("click", addToCart)
        contentArea.append(productImage, productDetailsCard);
        productDetailsCard.append(
            productTitle,
            productPrice,
            productDescription,
            purchaseBtn
        );
        contentArea.appendChild(relatedProductsCard);
    });
}
