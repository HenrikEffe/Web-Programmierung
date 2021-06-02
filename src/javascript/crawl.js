// Strikter Modus für komplettes Skript
"use strict";

function createIframe() {
  var theme = { type: "darkmode", src: "theme-light" };
  localStorage.setItem("darkmode", JSON.stringify(theme));
  // localStorage.clear();
  var ifrm = document.createElement("iframe");
  ifrm.setAttribute("id", "musikframe");
  ifrm.setAttribute("src", "http://localhost/Web-Programmierung/musik");
  ifrm.style.display = "none";
  ifrm.style.width = "100%";
  ifrm.style.height = "480px";
  document.body.appendChild(ifrm);

  var iframe = document.getElementById("musikframe");
  iframe.onload = function (event) {
    readSongs(document.getElementById("musikframe"));
  };
}
// ausgabe des Local Storages
// window.addEventListener("load", function () {
// myFunction();

for (let i = 0; i < localStorage.length; i++) {
  let storageKey = localStorage.key(i);
  var retrievedObject = JSON.parse(localStorage.getItem(storageKey));
  console.log(storageKey + " : " + retrievedObject.type);
}
// });

async function readFolder(source) {
  var ifrm = document.createElement("iframe");
  ifrm.setAttribute("id", source.textContent);
  ifrm.setAttribute("src", source);
  ifrm.style.display = "none";
  ifrm.style.width = "100%";
  ifrm.style.height = "480px";
  document.body.appendChild(ifrm);
  var iframe = document.getElementById(source.textContent);
  iframe.onload = function (event) {
    readSongs(document.getElementById(source.textContent));
  };
}
async function readSongs(iframe) {
  var iframebody = iframe.contentWindow.document.querySelector("table").rows;
  console.log(iframebody.length);
  var playlistObj = { type: "playlist", songs: [] };
  for (var key = 0; key < iframebody.length; key++) {
    var select = iframebody[key].querySelector("a");
    if (
      select != null &&
      (select.toString().includes(".mp3") || select.toString().includes(".ogg"))
    ) {
      // Musik in Webstorage speichern (ohne Ordner Zuweisung)
      if (typeof Storage !== "undefined") {
        var obj = { type: "song", src: select.toString() };
        playlistObj["songs"].push(JSON.stringify(obj));
        localStorage.setItem(select.textContent, JSON.stringify(obj));
      } else {
        allert("Sorry! No Web Storage support...");
      }
    } else if (
      select != null &&
      select.toString().slice(-1) == "/" &&
      select.toString().includes("musik") &&
      key != 2
    ) {
      // Unterordner aufrufen und Musik mit Ordner speichern
      readFolder(select);
    }
  }
  var name = iframe.src;
  var slash = name.lastIndexOf("/", name.lastIndexOf("/") - 1);
  name = name.substring(slash + 1, name.lastIndexOf("/"));
  localStorage.setItem(name, JSON.stringify(playlistObj));
}

function allSongs() {
  var playlistObj = { type: "playlist", songs: [] };
  for (let i = 0; i < localStorage.length; i++) {
    let storageKey = localStorage.key(i);
    var retrievedObject = JSON.parse(localStorage.getItem(storageKey));
    if (retrievedObject.type == "playlist") {
      var array = retrievedObject.songs;
      for (let y = 0; y < array.length; y++) {
        var objectSong = JSON.parse(array[y]);
        playlistObj["songs"].push(JSON.stringify(objectSong));
      }
    }
  }
  localStorage.setItem("Alle Songs", JSON.stringify(playlistObj));
}

function myFunction() {
  var elements = document.getElementsByTagName("iframe");
  while (elements.length) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}
