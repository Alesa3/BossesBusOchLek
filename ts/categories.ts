import fetcher from "./fetcher";
import printProducts from "./products";
const productsUrl = "/wc/v3/products";
const contentArea = document.querySelector("main") as HTMLElement;
const productCategoryUrl = "/wc/v3/products/categories";

export default function printCategories() {
    contentArea.innerHTML = "";
    fetcher(productCategoryUrl).then((data) => {
        const categories = data;

        for (let i = 0; i < categories.length; i++) {
            if (categories[i].name === "Uncategorized") {
                continue;
            }
            const productcategoryCard = document.createElement(
                "div"
            ) as HTMLDivElement;
            productcategoryCard.setAttribute("id", categories[i].name);
            productcategoryCard.setAttribute("class", "categoryCard");
            productcategoryCard.innerText = categories[i].name;

            productcategoryCard.addEventListener("click", (event) => {
                fetcher(productsUrl).then((data) => {
                    const products = data; //typa denna sen
                    const target = event.target as HTMLDivElement;
                    console.log("target", target.id);
                    const productsInCategory: any = products.filter(
                        (product: any) => {
                            return product.categories.find((category: any) => {
                                return target.id == category.name;
                            });
                        }
                    );

                    // console.log("filtrerade prod", productsInCategory);
                    printProducts(productsInCategory);
                });
            });

            contentArea.appendChild(productcategoryCard);
        }
    });
}
