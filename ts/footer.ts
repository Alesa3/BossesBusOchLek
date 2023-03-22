// import fetcher from "./fetcher";
// const footerMenu = document.querySelector("#footerMenu") as HTMLElement;



// export default function printFooterMenu() {
//     const footerUrl = "/wp/v2/menu-items/20";
//     fetcher(footerUrl).then((data) => {
//         const footer = data;

//         for (let i = 0; i < footer.length; i++) {
//             const footerCard = document.createElement(
//                 "div"
//             ) as HTMLDivElement;
//             footerCard.innerText = footer[i].name;
//             footerCard.addEventListener("click", () => {
//                 console.log(footer[i].name);
//             });
//             footerMenu.appendChild(footerCard);
//         }
//     })
// };
