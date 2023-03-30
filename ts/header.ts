import printCart from "./cart";
import printCategories from "./categories";
import fetcher from "./fetcher";
import printLandingPage from "./landing-page";
import news from "./news";
const carouselWrapper = document.querySelector(".carousel") as HTMLDivElement;
const menu = document.querySelector("menu") as HTMLMenuElement;
const storeName = document.querySelector("h1.storeName") as HTMLHeadingElement;
export default async function printHeader() {
  const storeInfo = await fetcher("");
  const menuItems = await fetcher("/wp/v2/menu-items/19");
  const ul = document.createElement("ul");
  menuItems.map((item: { title: string }) => {
    const li = document.createElement("li");
    li.innerText = item.title;
    li.addEventListener("click", printPages);
    ul.appendChild(li);
  });
  const hundkorg = document.createElement("li");
  hundkorg.innerText = "Hundkorg";
  hundkorg.classList.add("cart");
  hundkorg.addEventListener("click", printPages);
  ul.append(hundkorg);

  menu.appendChild(ul);
  storeName.innerHTML = storeInfo.name;
}

function printPages(event: Event) {
  carouselWrapper.classList.remove("hidden");
  const targetElement = event.target as HTMLLIElement;
  switch (targetElement.innerText) {
    case "Nyheter": {
      news();
      break;
    }
    case "Shop": {
      //printa shop
      break;
    }
    case "Start": {
      printLandingPage();
      break;
    }
    case "Butik": {
      //printa kategorier
      printCategories();
      break;
    }
    case "Hundkorg": {
      printCart();
      break;
    }
  }
}
