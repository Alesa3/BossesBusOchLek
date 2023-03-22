"use strict";
import news from "./news";
import printCategories from "./categories";
import printHeader from "./header";

printHeader();
document.addEventListener("DOMContentLoaded", () => news());
printCategories();
