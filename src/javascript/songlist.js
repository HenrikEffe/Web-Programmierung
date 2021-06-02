// Strikter Modus für komplettes Skript
"use strict";

function getSongs() {
  console.log("ich bin da");
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
        song.addEventListener("click", function playSong(){
          console.log(storageKey, "akdjfghakljsfhdalsdfjhakljdf", input);

          var source = document.getElementById('standardAudioSrc');
          var audio = document.getElementById('standardAudio');
          
          var obj = { type: "playedsong", src: retrievedObject.src };
          localStorage.setItem("playedsong", JSON.stringify(obj));

          source.src = input;

            audio.load();
            audio.play();
        });
      lists.appendChild(song);
    }
  }
}
function prevSong(){

}
function nextSong(){
  
}
