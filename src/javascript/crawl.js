// Strikter Modus für komplettes Skript
"use strict";

function createIframe() {
  let theme = { type: "darkmode", src: "theme-light" };
  localStorage.setItem("darkmode", JSON.stringify(theme));
  let ifrm = document.createElement("iframe");
  ifrm.setAttribute("id", "musikframe");
  ifrm.setAttribute("src", "http://localhost/Web-Programmierung/musik");
  ifrm.style.display = "none";
  ifrm.style.width = "100%";
  ifrm.style.height = "480px";
  document.body.appendChild(ifrm);

  let iframe = document.getElementById("musikframe");
  iframe.onload = function (event) {
    readSongs(document.getElementById("musikframe"));
  };
  window.addEventListener("load", function () {
    removeIframe();
  });
}

function readFolder(source) {
  let ifrm = document.createElement("iframe");
  ifrm.setAttribute("id", source.textContent);
  ifrm.setAttribute("src", source);
  ifrm.style.display = "none";
  ifrm.style.width = "100%";
  ifrm.style.height = "480px";
  document.body.appendChild(ifrm);
  let iframe = document.getElementById(source.textContent);
  iframe.onload = function (event) {
    readSongs(document.getElementById(source.textContent));
  };
}
function readSongs(iframe) {
  console.log("Hallo");
  let iframebody = iframe.contentWindow.document.querySelector("table").rows;
  let playlistObj = { type: "playlist", songs: [] };
  for (let key = 0; key < iframebody.length; key++) {
    let select = iframebody[key].querySelector("a");
    if (
      select != null &&
      (select.toString().includes(".mp3") || select.toString().includes(".ogg"))
    ) {
      // Musik in Webstorage speichern (ohne Ordner Zuweisung)
      if (typeof Storage !== "undefined") {
        let obj = { type: "song", src: select.toString() };
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
  // Name des Liedes formatieren
  let name = iframe.src;
  let slash = name.lastIndexOf("/", name.lastIndexOf("/") - 1);
  name = name.substring(slash + 1, name.lastIndexOf("/"));
  playlistObj.songs.sort(function (l, u) {
    return l.toLowerCase().localeCompare(u.toLowerCase());
  });
  localStorage.setItem(name, JSON.stringify(playlistObj));
}

// erstellt ein JSON Array für Alle Songs
function allSongs() {

  if (localStorage.getItem("Alle Songs") != undefined) {
    localStorage.removeItem("Alle Songs");
  }
  let playlistObj = { type: "songplaylist", songs: [] };
  for (let i = 0; i < localStorage.length; i++) {
    let storageKey = localStorage.key(i);
    let retrievedObject = JSON.parse(localStorage.getItem(storageKey));
    if (retrievedObject.type == "song") {
      playlistObj["songs"].push(JSON.stringify(retrievedObject));
    }
  }
  playlistObj.songs.sort(function (l, u) {
    return l.toLowerCase().localeCompare(u.toLowerCase());
  });
  localStorage.setItem("Alle Songs", JSON.stringify(playlistObj));

}

function removeIframe() {
  console.log("Remove!");
  let elements = document.getElementsByTagName("iframe");
  while (elements.length) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}
