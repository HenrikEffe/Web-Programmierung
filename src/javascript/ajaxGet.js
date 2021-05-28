// Strikter Modus für komplettes Skript
"use strict";

function ajaxGet(url) {
  const xhr = new XMLHttpRequest();
  const container = document.getElementById("container");

  xhr.onload = function () {
    if (this.status === 200) {
      container.innerHTML = xhr.responseText;
    } else {
      console.warn("Cant receive data");
    }
  };
  xhr.open("get", url);
  xhr.send();
}
