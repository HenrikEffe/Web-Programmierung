// Strikter Modus für komplettes Skript
"use strict";

function getSongs() {
  let lists = document.getElementById("songliste");
  let songs = JSON.parse(localStorage.getItem("Alle Songs"));
  for (let i = 0; i < songs.songs.length; i++) {
    let song = document.createElement("li");
    let input = JSON.parse(songs.songs[i]).src;
    let songname = formatName(JSON.parse(songs.songs[i]));

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
      let source = document.getElementById("standardAudioSrc");
      let audio = document.getElementById("standardAudio");
      localStorage.removeItem("playedsong");
      let obj = {
        type: "playedsong",
        current: JSON.stringify(songs),
        src: songname,
        key: i,
        nameofPlaylist: "Alle Songs",
      };
      localStorage.setItem("playedsong", JSON.stringify(obj));
      document.getElementById("title").innerText = songname;
      source.src = input;
      audio.load();
      audio.play();
    });

    song.appendChild(labelText);
    song.appendChild(ref);
    lists.appendChild(song);
  }

}

function formatName(song) {

  let period = song.src.lastIndexOf(".");
  let slash = song.src.lastIndexOf("/");
  let songname = song.src.substring(slash + 1, period);
  songname = songname.replace(/%20/g, " ");

  return songname;
}

function autoplayddd() {
  let source = document.getElementById("standardAudioSrc");
  let audio = document.getElementById("standardAudio");

  let index = JSON.parse(localStorage.getItem("playedsong"));

  let allsongs = JSON.parse(index.current);
  let i = JSON.parse(index.key);
  if (i == allsongs.songs.length - 1) {
    i = 0;
  } else {
    i = i + 1;
  }

  let songname = formatName(JSON.parse(allsongs.songs[i]));
  document.getElementById("title").innerText = songname;


  localStorage.removeItem("playedsong");
  let obj = {
    type: "playedsong",
    current: index.current,
    src: index.src,
    key: i,
  };
  localStorage.setItem("playedsong", JSON.stringify(obj));


  source.src = JSON.parse(allsongs.songs[i]).src;
  audio.load();
  audio.play();


}

function prevSong() {
  let index = JSON.parse(localStorage.getItem("playedsong"));
  let allsongs = JSON.parse(index.current);
  let indexValue = "";

  if (index.key == 0) {
    indexValue = allsongs.songs.length - 1;
  } else {
    indexValue = index.key - 1;
  }

  let song = JSON.parse(allsongs.songs[indexValue]);
  let songname = formatName(song);

  let source = document.getElementById("standardAudioSrc");
  let audio = document.getElementById("standardAudio");

  let obj = {
    type: "playedsong",
    current: index.current,
    src: songname,
    key: indexValue,
  };
  localStorage.setItem("playedsong", JSON.stringify(obj));
  document.getElementById("title").innerText = songname;
  source.src = song.src;

  audio.load();
  audio.play();
}

function nextSong() {
  let index = JSON.parse(localStorage.getItem("playedsong"));
  let allsongs = JSON.parse(index.current);
  let indexValue = "";

  if (index.key + 1 == allsongs.songs.length) {
    indexValue = 0;
  } else {
    indexValue = index.key + 1;
  }

  let song = JSON.parse(allsongs.songs[indexValue]);


  let songname = formatName(song);

  let source = document.getElementById("standardAudioSrc");
  let audio = document.getElementById("standardAudio");

  let obj = {
    type: "playedsong",
    current: index.current,
    src: songname,
    key: indexValue,
  };
  localStorage.setItem("playedsong", JSON.stringify(obj));
  document.getElementById("title").innerText = songname;
  source.src = song.src;

  audio.load();
  audio.play();
}
