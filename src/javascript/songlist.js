// Strikter Modus für komplettes Skript
"use strict";

function getSongs() {
  let lists = document.getElementById("songliste");
  console.log(lists);
  for (let i = 0; i < localStorage.length; i++) {
    let storageKey = localStorage.key(i);
    let song = document.createElement("li");
    var retrievedObject = JSON.parse(localStorage.getItem(storageKey));
    let input = retrievedObject.src;

    if (retrievedObject.type == "song") {
      var period = input.lastIndexOf(".");
      var slash = input.lastIndexOf("/");
      var songname = input.substring(slash + 1, period);
      var songname = songname.replace(/%20/g, " ");
      song.innerHTML =
        "<input type=checkbox" +
        "><a>" +
        songname +
        "</a>";
      song.addEventListener("click", function playSong() {
        console.log(storageKey, "akdjfghakljsfhdalsdfjhakljdf", input);

        var source = document.getElementById('standardAudioSrc');
        var audio = document.getElementById('standardAudio');

        var obj = { type: "playedsong", current: "allsongs", src: storageKey };
        localStorage.setItem("playedsong", JSON.stringify(obj));

        source.src = input;

        audio.load();
        audio.play();
      });
      lists.appendChild(song);
    }
  }
}
function prevSong() {




}
function nextSong() {
  let retrievedObject = JSON.parse(localStorage.getItem("playedsong"));



  if (retrievedObject.current == "allsongs") {
    for (let i = 0; i < localStorage.length; i++) {
      let storageKey = localStorage.key(i);
      //let loopObject = JSON.parse(localStorage.getItem(storageKey));

      if (retrievedObject.src == storageKey) {
        let loopObject = "";
        do {
          i = i + 1;
          storageKey = localStorage.key(i);
          loopObject = JSON.parse(localStorage.getItem(storageKey));
          console.log(storageKey + "adasdad");
        } while (loopObject.type != "song")
        storageKey = localStorage.key(i);
        let source = document.getElementById('standardAudioSrc');
        let audio = document.getElementById('standardAudio');

        var obj = { type: "playedsong", current: "allsongs", src: storageKey };
        localStorage.setItem("playedsong", JSON.stringify(obj));

        source.src = loopObject.src;

        audio.load();
        audio.play();



      }


    }


  }



}
