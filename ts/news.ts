import fetcher from "./fetcher";
const wrapper = document.querySelector("main") as HTMLElement;

export default function news() {
  const renderData = async () => {
    const data = await fetcher("/wp/v2/posts");
    wrapper.innerHTML = "";
    const newsContainer = document.createElement("section");
    newsContainer.id = "news-section";

    for (const post of data) {
      const postElement = document.createElement("div");
      postElement.setAttribute("id", "news-article");
      postElement.classList.add("post");

      const titleElement = document.createElement("h2");
      titleElement.textContent = post.title.rendered;
      postElement.appendChild(titleElement);

      const contentElement = document.createElement("div");
      contentElement.innerHTML = post.content.rendered;
      postElement.appendChild(contentElement);

      newsContainer.appendChild(postElement);
    }
    wrapper.appendChild(newsContainer);
  };
  renderData();
}
