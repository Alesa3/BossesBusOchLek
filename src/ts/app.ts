"use strict";
import printFooterMenu from "./footer";
import printHeader from "./header";
import printLandingPage from "./landing-page";

if (!localStorage.getItem("cart")) {
  localStorage.setItem("cart", JSON.stringify([]));
}

printHeader();
printLandingPage();
printFooterMenu();
