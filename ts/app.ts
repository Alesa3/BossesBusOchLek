"use strict";

import { fetcher } from "./fetcher";
import news from "./news";

document.addEventListener("DOMContentLoaded", () => news());
const baseUrl = "http://46.101.130.27/wp-json/";
