// Strikter Modus für komplettes Skript
"use strict";

document.querySelector(".hamburger-menu").addEventListener("click", () => {
  document.querySelector(".container").classList.toggle("change");
});

document.querySelector(".menu").addEventListener("click", () => {
  document.querySelector(".container").classList.toggle("change");
});
