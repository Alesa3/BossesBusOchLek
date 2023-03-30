import { addToCart } from "./cart";
import fetcher from "./fetcher";
const contentArea = document.querySelector("main") as HTMLElement;
const productUrl = "/wc/v3/products/";

export default function printProductPage(url: string) {
    contentArea.innerHTML = "";
    fetcher(url).then((productPage) => {
        const productPageWrapper = document.createElement("div");
        productPageWrapper.className = "productPageWrapper";
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
        purchaseBtn.addEventListener("click", addToCart);
        const relatedProductsTitle = document.createElement("h2");
        relatedProductsTitle.innerText = "Relaterade Produkter";
        const relatedProductProductsWrapper = document.createElement("div");
        relatedProductProductsWrapper.className = "relatedProductsWrapper";
        relatedProductsCard.appendChild(relatedProductsTitle);
        productPage.related_ids.forEach((relatedId: any) => {
            fetcher(productUrl + relatedId).then((relatedProduct) => {
                const relatedProductImage = document.createElement("img");
                relatedProductImage.setAttribute(
                    "class",
                    "relatedProductImage"
                );
                relatedProductImage.src = relatedProduct.images[0].src;
                const relatedProductTitle = document.createElement("h2");
                const relatedProductPurchaseBtn =
                    document.createElement("button");
                relatedProductPurchaseBtn.addEventListener("click", addToCart);
                relatedProductPurchaseBtn.innerText = "Lägg till i hundkorg";
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
                    relatedProductTitle,
                    relatedProductPurchaseBtn
                );
                relatedProductProductsWrapper.append(relatedProductsCard);
            });
        });

        contentArea.innerHTML = "";
        purchaseBtn.innerText = "Lägg till i hundkorg";
        purchaseBtn.id = productPage.id;
        purchaseBtn.addEventListener("click", addToCart);
        productDetailsCard.append(
            productTitle,
            productPrice,
            productDescription,
            purchaseBtn
        );
        productPageWrapper.append(productImage, productDetailsCard);

        contentArea.append(productPageWrapper);
        contentArea.appendChild(relatedProductProductsWrapper);
    });
}
