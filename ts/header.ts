import fetcher from "./fetcher";

const menu = document.querySelector("menu") as HTMLMenuElement;
const storeName = document.querySelector("h1.storeName") as HTMLHeadingElement;
export default async function printHeader() {
  const storeInfo = await fetcher("");
  const menuItems = await fetcher("/wp/v2/menu-items/19");
  const ul = document.createElement("ul");
  menuItems.map((item: { title: string }) => {
    console.log(item);
    const li = document.createElement("li");
    li.innerText = item.title;
    ul.appendChild(li);
  });
  menu.appendChild(ul);
  storeName.innerHTML = storeInfo.name;
}