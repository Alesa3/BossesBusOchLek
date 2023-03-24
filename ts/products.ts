const contentArea = document.querySelector("main") as HTMLElement;

interface product {
    name: string;
    permalink: string;
    images: Array<{ src: string }>;
    price: number;
}

export default function printselected(selected: Array<product>) {
    contentArea.innerHTML = "";
    for (let i = 0; i < selected.length; i++) {
        const productCard = document.createElement("div");
        const addToCart = document.createElement("button");
        addToCart.innerText = "Lägg till i hundkorgen"
        productCard.innerHTML = "";
        productCard.setAttribute("class", "productCard");
        const productTitle = document.createElement("a");
        productTitle.innerText = selected[i].name;
        //lägg till event listener för print single prod i productTitle
        const productImage = document.createElement("img");
        productImage.src = selected[i].images[0].src;

        const productPrice = document.createElement("p");
        
        productPrice.innerText = selected[i].price + "kr";

        productCard.addEventListener("click", () => {
            console.log(selected[i].name);
        });
        
        contentArea.append(productCard);
        productCard.append(productImage);
        productCard.append(productTitle, productPrice, addToCart);
    }
}
