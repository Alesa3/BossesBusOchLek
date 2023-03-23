"use strict";
import news from "./news";
import printCategories from "./categories";
import printHeader from "./header";
import printFooterMenu from "./footer";

printHeader();
document.addEventListener("DOMContentLoaded", () => news());
printCategories();
printFooterMenu();
