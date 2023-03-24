import fetcher from "./fetcher";
const footerMenu = document.querySelector("#footerMenu") as HTMLElement;

export default function printFooterMenu() {
  const footerUrl = "/wp/v2/menu-items/20";
  fetcher(footerUrl).then((data) => {
    const footer = data;

    for (let i = 0; i < data.length; i++) {
      const footerCard = document.createElement("p") as HTMLDivElement;
      footerCard.innerHTML = footer[i].title;
      footerCard.addEventListener("click", () => {
        console.log(footer[i].title);
      });
      footerMenu.append(footerCard);
    }
  });
}
