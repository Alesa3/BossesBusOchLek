import fetcher from "./fetcher";
const contentArea = document.querySelector("main") as HTMLElement;
const productUrl = "/wc/v3/products/";

export default function printProductPage(url: string) {
    fetcher(url).then((productPage) => {
        const productDetailsCard = document.createElement("article");
        const relatedProductsCard = document.createElement("article");
        relatedProductsCard.setAttribute("class", "relatedProductsCard");

        const productImage = document.createElement("img");
        productImage.src = productPage.images[0].src;
        const productTitle = document.createElement("h2");
        productTitle.innerText = productPage.name;
        const productPrice = document.createElement("p");
        productPrice.innerText = productPage.price + "kr";
        const productDescription = document.createElement("p");
        productDescription.innerHTML = productPage.description;

        const purchaseBtn = document.createElement("input");
        const relatedProductsTitle = document.createElement("h2");
        relatedProductsTitle.innerText = "Relaterade Produkter";
        relatedProductsCard.appendChild(relatedProductsTitle);
        productPage.related_ids.forEach((relatedId: any) => {
            fetcher(productUrl + relatedId).then((relatedProduct) => {
                const relatedProductImage = document.createElement("img");
                relatedProductImage.src = relatedProduct.images[0].src;
                const relatedProductTitle = document.createElement("h2");
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
        purchaseBtn.setAttribute("type", "button");
        purchaseBtn.setAttribute("value", "Lägg i hundkorg");

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
