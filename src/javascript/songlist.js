// Strikter Modus für komplettes Skript
"use strict";

function createPlaylist() {
  let lists = document.getElementById("songlist");

  for (let i = 0; i < localStorage.length; i++) {
    let storageKey = localStorage.key(i);
    console.log(storageKey + " : " + localStorage.getItem(storageKey));

    let song = document.createElement("li");
    let button = document.createElement("button");

    song.innerHTML = "<button>Play</button>" + localStorage.getItem(storageKey);

    // song.appendChild(button);
    lists.appendChild(song);
  }
}
