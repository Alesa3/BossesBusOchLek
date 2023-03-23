import fetcher from "./fetcher";
import singlePage from "./single-page";
const wrapper = document.querySelector("main") as HTMLElement;

export default function news() {
  const renderData = async () => {
    const data = await fetcher("/wp/v2/posts");
    wrapper.innerHTML = "";
    const newsWrapper = document.createElement("section");
    newsWrapper.id = "news-section";

    for (const post of data) {
      const postEl = document.createElement("div");
      postEl.setAttribute("class", "news-article");
      postEl.classList.add("post");

      const titleEl = document.createElement("h2");
      titleEl.textContent = post.title.rendered;
      postEl.append(titleEl);

      const postTimestamp = document.createElement("p");
      postTimestamp.textContent = "Upplagd " + post.date_gmt;
      postTimestamp.setAttribute("class", "post-timestamp");
      postEl.append(postTimestamp);

      const contentEl = document.createElement("p");
      contentEl.innerHTML = post.excerpt.rendered;
      postEl.append(contentEl);

      const readMoreLink = document.createElement("a");
      readMoreLink.innerText = "Läs mer";
      readMoreLink.setAttribute("id", post.id);
      postEl.append(readMoreLink);
      readMoreLink.addEventListener("click", singleNewsFetch);

      newsWrapper.append(postEl);
    }
    wrapper.append(newsWrapper);
  };
  renderData();
}

function singleNewsFetch(event: Event) {
  const link = event.target as HTMLLinkElement;
  fetcher("/wp/v2/posts/" + link.id).then((data) => {
    console.log(data);
  });
}
