// Strikter Modus für komplettes Skript
"use strict";
/*Dark-Mode*/
function darkMode() {
  let retrievedObject = JSON.parse(localStorage.getItem("darkmode"));
  let theme;

  if (retrievedObject.src == "theme-dark") {
    document.documentElement.className = "theme-light";
    theme = { type: "darkmode", src: "theme-light" };
  } else {
    document.documentElement.className = "theme-dark";
    theme = { type: "darkmode", src: "theme-dark" };
  }

  localStorage.setItem("darkmode", JSON.stringify(theme));
}
