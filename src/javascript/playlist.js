// Strikter Modus für komplettes Skript
"use strict";

function createPlaylist() {
  var lists = document.getElementById("songliste");
  var items = lists.getElementsByTagName("li");
  var playlistName = document.getElementById("playlistName").value;
  if (playlistName == "") {
    alert("Geben Sie zuerst einen Namen ein");
  } else {
    var songs = { type: "playlist", songs: [] };
    for (var i = 0; i < items.length; ++i) {
      console.log(items[i].getElementsByTagName("input")[0].checked);
      if (items[i].getElementsByTagName("input")[0].checked) {
        var obj = {
          type: "song",
          src: items[i].getElementsByTagName("a")[0].innerHTML,
        };
        songs["songs"].push(JSON.stringify(obj));
        // songs = songs + items[i].getElementsByTagName("a")[0].innerHTML + ";";
      }
    }
    // var obj = { type: "playlist", src: songs };
    localStorage.setItem(playlistName, JSON.stringify(songs));
  }
}

function getPlaylists() {
  let lists = document.getElementById("playlists");

  for (let i = 0; i < localStorage.length; i++) {
    let storageKey = localStorage.key(i);
    let song = document.createElement("li");
    var retrievedObject = JSON.parse(localStorage.getItem(storageKey));

    if (retrievedObject.type == "playlist") {
      // song.innerHTML = "<input type=checkbox" + "><a>" + storageKey + "</a>";
      // var test = song.getElementsByTagName("input")[0].checked;

      let inputText = document.createElement("input");
      inputText.setAttribute("type", "checkbox");

      let ref = document.createElement("a");
      var linkText = document.createTextNode(storageKey);
      ref.appendChild(linkText);
      ref.onclick = function () {
        sessionStorage.setItem("playlist", storageKey);
        window.location.href = "#oneplaylist";
      };
      song.appendChild(inputText);
      song.appendChild(ref);
      lists.appendChild(song);
    }
  }
}

function getSpecificPlaylists() {
  let lists = document.getElementById("playlists");
  let header = document.getElementById("header");
  let item = sessionStorage.getItem("playlist");
  header.innerHTML = item;
  for (let i = 0; i < localStorage.length; i++) {
    let storageKey = localStorage.key(i);

    var retrievedObject = JSON.parse(localStorage.getItem(storageKey));

    if (retrievedObject.type == "playlist" && storageKey == item) {
      // var a = retrievedObject.src.split(";");
      var array = retrievedObject.songs;
      for (let b = 0; b < array.length - 1; b++) {
        let song = document.createElement("li");
        var objectSong = JSON.parse(array[b]);
        console.log(objectSong);
        console.log("src: ", objectSong.src);
        if (objectSong.type == "song") {
          console.log("Ich bin drin!");
          var input = objectSong.src;
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
        }
        // song.innerHTML =
        //   "<input type=checkbox" +
        //   "><a href=" +
        //   "index.html" +
        //   ">" +
        //   array[b] +
        //   "</a>";
        // song.appendChild(button);
        lists.appendChild(song);
        console.log(song);
      }
    }
  }
}

function deletePlaylist() {
  var lists = document.getElementById("playlists");
  var items = lists.getElementsByTagName("li");
  let songs = new Array();
  for (var i = 0; i < items.length; ++i) {
    if (items[i].getElementsByTagName("input")[0].checked) {
      songs.push(items[i].getElementsByTagName("a")[0].innerHTML);
    }
  }

  for (let i = 0; i < localStorage.length; i++) {
    let storageKey = localStorage.key(i);
    var retrievedObject = JSON.parse(localStorage.getItem(storageKey));

    if (retrievedObject.type == "playlist") {
      console.log("Playlist gefunden");
      for (let i of songs) {
        if ((i = storageKey)) {
          localStorage.removeItem(storageKey);
        }
      }
    }
  }

  location.reload();
}
