// Strikter Modus für komplettes Skript
"use strict";

function createPlaylist() {
  let lists = document.getElementById("songliste");
  let items = lists.getElementsByTagName("li");
  let playlistName = document.getElementById("playlistName").value;
  if (playlistName == "") {
    alert("Geben Sie zuerst einen Namen ein");
  } else {
    let songs = { type: "playlist", songs: [] };
    for (let i = 0; i < items.length; ++i) {
      if (items[i].getElementsByTagName("input")[0].checked) {
        let obj = {
          type: "song",
          src: items[i].getElementsByTagName("a")[0].title,
        };
        songs["songs"].push(JSON.stringify(obj));
      }
    }
    localStorage.setItem(playlistName, JSON.stringify(songs));
  }
  window.location.href = '#playlist';

}

function getPlaylists() {
  let lists = document.getElementById("playlists");
  for (let i = 0; i < localStorage.length; i++) {
    let storageKey = localStorage.key(i);
    let song = document.createElement("li");
    let retrievedObject = JSON.parse(localStorage.getItem(storageKey));

    if (retrievedObject.type == "playlist") {
      let labelText = document.createElement("label");
      let inputText = document.createElement("input");
      let spanText = document.createElement("span");
      labelText.setAttribute("class", "checkerSong");
      inputText.setAttribute("type", "checkbox");
      spanText.setAttribute("class", "checkmark");
      labelText.appendChild(inputText);
      labelText.appendChild(spanText);

      let ref = document.createElement("a");
      let linkText = document.createTextNode(storageKey);
      ref.appendChild(linkText);
      ref.onclick = function () {
        sessionStorage.setItem("playlist", storageKey);
        window.location.href = "#oneplaylist";
      };
      song.appendChild(labelText);
      song.appendChild(ref);
      lists.appendChild(song);
    }
  }
}

function getSpecificPlaylists() {
  let source = document.getElementById("standardAudioSrc");
  let audio = document.getElementById("standardAudio");
  let lists = document.getElementById("playlists");
  let header = document.getElementById("header");
  let item = sessionStorage.getItem("playlist");
  header.innerHTML = item;

  let retrievedObject = JSON.parse(localStorage.getItem(item));

  console.log(retrievedObject);
  let array = retrievedObject.songs;
  let objectSong = "";
  let input = "";
  for (let b = 0; b < array.length; b++) {
    let song = document.createElement("li");
    objectSong = JSON.parse(array[b]);
    if (objectSong.type == "song") {
      input = objectSong.src;
      let period = input.lastIndexOf(".");
      let slash = input.lastIndexOf("/");
      let songname = input.substring(slash + 1, period);
      songname = songname.replace(/%20/g, " ");

      let labelText = document.createElement("label");
      let inputText = document.createElement("input");
      let spanText = document.createElement("span");
      labelText.setAttribute("class", "checkerSong");
      inputText.setAttribute("type", "checkbox");
      spanText.setAttribute("class", "checkmark");
      labelText.appendChild(inputText);
      labelText.appendChild(spanText);

      let ref = document.createElement("a");
      ref.setAttribute("title", input);

      let linkText = document.createTextNode(songname);
      ref.appendChild(linkText);

      ref.addEventListener("click", function playSong() {

        console.log(retrievedObject, "Retrieved Object");

        var obj = {
          type: "playedsong",
          current: JSON.stringify(retrievedObject),
          src: songname,
          key: b,
        };
        localStorage.removeItem("playedsong");
        localStorage.setItem("playedsong", JSON.stringify(obj));
        document.getElementById("title").innerText = songname;
        source.src = ref.title;

        audio.load();
        audio.play();
      });





      song.appendChild(labelText);
      song.appendChild(ref);
      lists.appendChild(song);
    }
  }

}

function deletePlaylist() {
  let lists = document.getElementById("playlists");
  let items = lists.getElementsByTagName("li");
  let songs = new Array();
  for (let i = 0; i < items.length; ++i) {
    if (items[i].getElementsByTagName("input")[0].checked) {
      console.log(items[i] + items[i].getElementsByTagName("a")[0].innerHTML);
      songs.push(items[i].getElementsByTagName("a")[0].innerHTML);
    }
  }

  for (let i = 0; i < localStorage.length; i++) {
    let storageKey = localStorage.key(i);
    let retrievedObject = JSON.parse(localStorage.getItem(storageKey));

    if (retrievedObject.type == "playlist" && songs.includes(storageKey)) {
      localStorage.removeItem(storageKey);
    }
  }

  location.reload();
}

function autoplay() {
  let source = document.getElementById("standardAudioSrc");
  let audio = document.getElementById("standardAudio");
  let index = JSON.parse(localStorage.getItem("playedsong"));
  let allsongs = JSON.parse(index.current);
  console.log(allsongs);

  // audio.addEventListener('ended', function () {



  //   let link = JSON.parse(array[i + 1]).src;
  //   console.log(JSON.parse(array[i + 1]).src)
  //   period = link.lastIndexOf(".");
  //   slash = link.lastIndexOf("/");
  //   songname = link.substring(slash + 1, period);
  //   songname = songname.replace(/%20/g, " ");


  //   localStorage.removeItem("playedsong");
  //   let obj = {
  //     type: "playedsong",
  //     current: JSON.stringify(retrievedObject),
  //     src: songname,
  //     key: i + 1,
  //     nameofPlaylist: item,
  //   };
  //   localStorage.setItem("playedsong", JSON.stringify(obj));
  //   document.getElementById("title").innerText = songname;
  //   source.src = link;


  //   audio.load();
  //   audio.play();
  // })

}


function removeSong() {
  var lists = document.getElementById("playlists");
  var items = lists.getElementsByTagName("li");

  let item = sessionStorage.getItem("playlist");
  let retrievedObject = JSON.parse(localStorage.getItem(item));
  var array = retrievedObject.songs;

  for (var i = items.length - 1; i >= 0; --i) {
    if (items[i].getElementsByTagName("input")[0].checked) {
      array.splice(i, 1);
    }
  }

  var obj = { type: "playlist", songs: array };
  localStorage.removeItem(item);
  localStorage.setItem(item, JSON.stringify(obj));
  location.reload();
}

function hidepopup() {
  let lists = document.getElementById("plist");
  let items = lists.getElementsByTagName("li");
  let retrievedObject = JSON.parse(localStorage.getItem(sessionStorage.getItem("playlist")));
  let array = retrievedObject.songs;


  for (let i = 0; i < items.length; ++i) {
    if (items[i].getElementsByTagName("input")[0].checked) {
      let obj = {
        type: "song",
        src: items[i].getElementsByTagName("a")[0].title,
      };
      array.push(JSON.stringify(obj));
    }
  }

  let obj = { type: "playlist", songs: array };
  localStorage.setItem(sessionStorage.getItem("playlist"), JSON.stringify(obj));
  var popup = document.getElementById('popup')
  popup.classList.remove('active');
  location.reload();
}

function showpopup() {
  var popup = document.getElementById("popup");
  popup.classList.add("active");
  let lists = document.getElementById("plist");
  while (lists.firstChild) {
    lists.removeChild(lists.firstChild);
  }

  let retrievedObject = JSON.parse(localStorage.getItem("Alle Songs"));
  let array = retrievedObject.songs;
  let objectSong = "";
  let input = "";
  for (let b = 0; b < array.length; b++) {
    let song = document.createElement("li");
    objectSong = JSON.parse(array[b]);
    input = objectSong.src;

    let period = input.lastIndexOf(".");
    let slash = input.lastIndexOf("/");
    let songname = input.substring(slash + 1, period);
    songname = songname.replace(/%20/g, " ");

    let labelText = document.createElement("label");
    let inputText = document.createElement("input");
    let spanText = document.createElement("span");
    labelText.setAttribute("class", "checkerSong");
    inputText.setAttribute("type", "checkbox");
    spanText.setAttribute("class", "checkmark");
    labelText.appendChild(inputText);
    labelText.appendChild(spanText);

    let ref = document.createElement("a");
    ref.setAttribute("title", input);

    let linkText = document.createTextNode(songname);
    ref.appendChild(linkText);

    song.appendChild(labelText);
    song.appendChild(ref);
    lists.appendChild(song);
  }
}
