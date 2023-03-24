import fetcher from "./fetcher";
const main = document.querySelector("main") as HTMLDivElement;

export default function printLandingPage() {
  main.innerHTML = "";
  fetcher("/wp/v2/pages/49").then((data: any) => {
    main.innerHTML = data.content.rendered;
  });
}
