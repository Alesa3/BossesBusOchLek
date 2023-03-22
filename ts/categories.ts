import fetcher from "./fetcher";

export default function printCategories() {
    const contentArea = document.querySelector("main") as HTMLElement;
    const productCategoryUrl = "/wc/v3/products/categories/";
    fetcher(productCategoryUrl).then((data) => {
        const categories = data;

        for (let i = 0; i < categories.length; i++) {
            const categoryCard = document.createElement(
                "div"
            ) as HTMLDivElement;
            categoryCard.innerText = categories[i].name;
            if (categories[i].name === "Uncategorized") {
                continue;
            }

            categoryCard.addEventListener("click", () => {
                console.log(categories[i].name);
            });
            contentArea.appendChild(categoryCard);
        }
    });
}
