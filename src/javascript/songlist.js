// Strikter Modus für komplettes Skript
"use strict";

function getSongs() {
  let lists = document.getElementById("songliste");
  var songs = JSON.parse(localStorage.getItem("Alle Songs"));
  for (let i = 0; i < songs.songs.length; i++) {
    let song = document.createElement("li");
    var retrievedObject = JSON.parse(songs.songs[i]);
    let input = retrievedObject.src;
    var period = input.lastIndexOf(".");
    var slash = input.lastIndexOf("/");
    var songname = input.substring(slash + 1, period);
    var songname = songname.replace(/%20/g, " ");
    song.innerHTML =
      "<input type=checkbox" + "><a title=" + input + ">" + songname + "</a>";
    song.addEventListener("click", function playSong() {
      var source = document.getElementById("standardAudioSrc");
      var audio = document.getElementById("standardAudio");

      var obj = { type: "playedsong", current: "allsongs", src: songname, key: i };
      localStorage.setItem("playedsong", JSON.stringify(obj));

      source.src = input;

      audio.load();
      audio.play();
    });
    lists.appendChild(song);
  }
}

function prevSong() {
  let allsongs = JSON.parse(localStorage.getItem("Alle Songs"));
  let index = JSON.parse(localStorage.getItem("playedsong"));
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
