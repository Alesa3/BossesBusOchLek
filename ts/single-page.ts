import news from "./news";
const wrapper = document.querySelector("main") as HTMLElement;

export default function singlePage(data: any) {
  console.log(data);
  wrapper.innerHTML = "";
  const singlePageWrapper = document.createElement("section");
  singlePageWrapper.setAttribute("id", "single-page-wrapper");

  const singlePageContent = document.createElement("div");
  singlePageContent.id = "single-page-content";

  const titleSinglePage = document.createElement("h2");
  titleSinglePage.textContent = data.title.rendered;
  singlePageContent.append(titleSinglePage);

  const contentEl = document.createElement("p");
  contentEl.innerHTML = data.content.rendered;
  singlePageContent.append(contentEl);

  singlePageWrapper.append(singlePageContent);
  wrapper.append(singlePageWrapper);

  // Gör en if-sats och printa bara detta om man är på en nyhet
  const tillbakaButton = document.createElement("a");
  tillbakaButton.innerText = "Tillbaka";
  tillbakaButton.setAttribute("id", "tillbaka-btn");
  singlePageContent.append(tillbakaButton);
  tillbakaButton.addEventListener("click", news);
}
