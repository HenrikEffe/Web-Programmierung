// Strikter Modus für komplettes Skript
"use strict";

function getSongs() {
  for (let i = 0; i < localStorage.length; i++) {
    let storageKey = localStorage.key(i);
    var retrievedObject = JSON.parse(localStorage.getItem(storageKey));
    console.log(storageKey + " : " + retrievedObject.type);
  }

  let lists = document.getElementById("songliste");
  console.log(lists);
  for (let i = 0; i < localStorage.length; i++) {
    let storageKey = localStorage.key(i);
    let song = document.createElement("li");
    var retrievedObject = JSON.parse(localStorage.getItem(storageKey));

    if (retrievedObject.type == "song") {
      var input = retrievedObject.src;
      var period = input.lastIndexOf(".");
      var slash = input.lastIndexOf("/");
      var songname = input.substring(slash + 1, period);
      var songname = songname.replace(/%20/g, " ");
      song.innerHTML =
        "<input type=checkbox" +
        "><a href=" +
        "index.html" +
        ">" +
        songname +
        "</a>";
      // song.appendChild(button);
      lists.appendChild(song);
    }
  }
}
