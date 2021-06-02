// Strikter Modus für komplettes Skript
"use strict";

function getSongs() {
  let lists = document.getElementById("songliste");
  var songs = JSON.parse(localStorage.getItem("Alle Songs"));
  for (let i = 0; i < songs.songs.length; i++) {
    let song = document.createElement("li");
    let input = JSON.parse(songs.songs[i]).src;
    var period = input.lastIndexOf(".");
    var slash = input.lastIndexOf("/");
    var songname = input.substring(slash + 1, period);
    var songname = songname.replace(/%20/g, " ");

    let labelText = document.createElement("label");
    let inputText = document.createElement("input");
    let spanText = document.createElement("span");
    labelText.setAttribute("class", "checkerSong")
    inputText.setAttribute("type", "checkbox");
    spanText.setAttribute("class", "checkmark")
    labelText.appendChild(inputText);
    labelText.appendChild(spanText);

    let ref = document.createElement("a");
    ref.setAttribute("title", input);

    var linkText = document.createTextNode(songname);
    ref.appendChild(linkText);

    ref.addEventListener("click", function playSong() {
      var source = document.getElementById("standardAudioSrc");
      var audio = document.getElementById("standardAudio");

      var obj = { type: "playedsong", current: songs, src: songname, key: i };
      localStorage.setItem("playedsong", JSON.stringify(obj));

      source.src = input;

      audio.load();
      audio.play();
    });

    song.appendChild(labelText);
    song.appendChild(ref);
    lists.appendChild(song);
  }
}

function prevSong() {
  let index = JSON.parse(localStorage.getItem("playedsong"));
  console.log(index, "PrevSong");
  let allsongs = JSON.parse(index.current);
  console.log(allsongs);
  let indexValue = "";

  if (index.key == 0) {
    indexValue = allsongs.songs.length - 1;
  } else {
    indexValue = index.key - 1;
  }

  var song = JSON.parse(allsongs.songs[indexValue]);

  var period = song.src.lastIndexOf(".");
  var slash = song.src.lastIndexOf("/");
  var songname = song.src.substring(slash + 1, period);
  var songname = songname.replace(/%20/g, " ");

  let source = document.getElementById("standardAudioSrc");
  let audio = document.getElementById("standardAudio");

  var obj = { type: "playedsong", current: "allsongs", src: songname, key: indexValue };
  localStorage.setItem("playedsong", JSON.stringify(obj));

  source.src = song.src;

  audio.load();
  audio.play();
}



function nextSong() {
  let allsongs = JSON.parse(localStorage.getItem("Alle Songs"));
  let index = JSON.parse(localStorage.getItem("playedsong"));
  let indexValue = "";

  if (index.key + 1 == allsongs.songs.length) {
    indexValue = 0;
  } else {
    indexValue = index.key + 1;
  }

  var song = JSON.parse(allsongs.songs[indexValue]);

  var period = song.src.lastIndexOf(".");
  var slash = song.src.lastIndexOf("/");
  var songname = song.src.substring(slash + 1, period);
  var songname = songname.replace(/%20/g, " ");

  let source = document.getElementById("standardAudioSrc");
  let audio = document.getElementById("standardAudio");

  var obj = { type: "playedsong", current: "allsongs", src: songname, key: indexValue };
  localStorage.setItem("playedsong", JSON.stringify(obj));

  source.src = song.src;

  audio.load();
  audio.play();
}
