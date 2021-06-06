// Strikter Modus für komplettes Skript
"use strict";

function setup() {
  let theme = { type: "darkmode", src: "theme-light" };
  localStorage.setItem("darkmode", JSON.stringify(theme));
}
/**
 * Erstellt ein IFrame vom Hauptordner.
 */
function createIframe() {
  let ifrm = document.createElement("iframe");
  ifrm.setAttribute("id", "musikframe");
  ifrm.setAttribute("src", "musik");
  ifrm.style.display = "none";
  document.body.appendChild(ifrm);
  let iframe = document.getElementById("musikframe");
  iframe.onload = function () {
    readSongs(iframe);
  };
  window.addEventListener("load", function () {
    removeIframe();
  });
}
/**
 * Erstellt ein IFrame für einen neu einzulesenen Ordner
 * @param {Pfad vom Ordner} source
 */
function readFolder(source) {
  let ifrm = document.createElement("iframe");
  ifrm.setAttribute("id", source.textContent);
  ifrm.setAttribute("src", source);
  ifrm.style.display = "none";
  document.body.appendChild(ifrm);
  let iframe = document.getElementById(source.textContent);
  iframe.onload = function () {
    readSongs(iframe);
  };
}
/**
 * Funktion zum auslesen eines Ordners. Speichert die Songs als JSON Object im Webstorage.
 * Speichert den Ordner als Playlist mit den Songs im Webstorage
 * @param {IFrame in welches der auszulesene Ordner reingeladen wird} iframe
 */
function readSongs(iframe) {
  let list = iframe.contentWindow.document.getElementsByTagName("ul")[0];
  if (list.getElementsByTagName("li") == null) {
    console.log("Der Musikordner ist leer!");
  } else {
    let items = list.getElementsByTagName("li");

    // JSON Object mit Array zum Speichern der Unterordner als Playlist
    let playlistObj = { type: "playlist", songs: [] };
    for (let key = 0; key < items.length; key++) {
      let select = items[key].querySelector("a");
      console.log(select.toString());
      if (
        select != null &&
        (select.toString().includes(".mp3") ||
          select.toString().includes(".ogg"))
      ) {
        // Musik in Webstorage speichern
        if (typeof Storage !== "undefined") {
          let obj = { type: "song", src: select.toString() };
          playlistObj["songs"].push(JSON.stringify(obj));
          localStorage.setItem(select.textContent, JSON.stringify(obj));
        } else {
          allert("Sorry! No Web Storage support...");
        }
      } else if (
        select != null &&
        !select.toString().slice(-5).includes(".") &&
        select.toString().includes("musik") &&
        key != 0
      ) {
        // Unterordner aufrufen und Musik mit Ordner speichern
        readFolder(select);
      }
    }
    // Name der Playlist formatieren
    let name = iframe.src;
    let slash = name.lastIndexOf("/", name.lastIndexOf("/") - 1);
    name = name.substring(slash + 1, name.lastIndexOf("/"));
    name = name.replace(/%20/g, " ");
    name = name.replace(/%c3%a4/g, "ä");
    name = name.replace(/%c3%b6/g, "ö");
    name = name.replace(/%c3%bc/g, "ü");
    name = name.replace(/%c3%9f/g, "ß");
    // Array nach Namen sortieren
    playlistObj.songs.sort(function (l, u) {
      return l.toLowerCase().localeCompare(u.toLowerCase());
    });
    localStorage.setItem(name, JSON.stringify(playlistObj));
  }
}

/**
 * Erstellt eine Playlist, in welcher alle Songs enthalten sind.
 */
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
  // Array nach Namen sortieren
  playlistObj.songs.sort(function (l, u) {
    l = formatName(JSON.parse(l));
    u = formatName(JSON.parse(u));
    return l.toLowerCase().localeCompare(u.toLowerCase());
  });
  localStorage.setItem("Alle Songs", JSON.stringify(playlistObj));
}
/**
 * Löscht alle IFrame
 */
function removeIframe() {
  let elements = document.getElementsByTagName("iframe");
  while (elements.length) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}
