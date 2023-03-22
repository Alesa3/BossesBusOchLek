"use strict";
import { fetcher } from "./fetcher";
import news from "./news";
import printCategories from "./categories";

document.addEventListener("DOMContentLoaded", () => news());
const baseUrl = "http://46.101.130.27/wp-json/";
printCategories();
