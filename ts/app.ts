import fetcher from "./fetcher";

const menu = document.querySelector("menu") as HTMLMenuElement;
const storeName = document.querySelector("h1.storeName") as HTMLHeadingElement;
let dataName = "";
async function init() {
  const storeData = await fetcher("");
  dataName = storeData.name;
  storeName.innerHTML = dataName;
}

init();
