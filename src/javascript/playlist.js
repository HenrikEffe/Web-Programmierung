// Strikter Modus für komplettes Skript
"use strict";

function createPlaylist() {
    var lists = document.getElementById("songliste");
    var items = lists.getElementsByTagName("li");
    var playlistName = document.getElementById("playlistName").value;
    if (playlistName == "") {
        alert("Geben Sie zuerst einen Namen ein");
    } else {
        let songs = '';
        for (var i = 0; i < items.length; ++i) {
            console.log(items[i].getElementsByTagName("input")[0].checked);
            if (items[i].getElementsByTagName("input")[0].checked) {
                songs = songs + items[i].getElementsByTagName("a")[0].innerHTML + ";";
            }
        }
        var obj = { type: "playlist", src: songs };
        localStorage.setItem(playlistName, JSON.stringify(obj));

    }
}

function getPlaylists() {
    let lists = document.getElementById("playlists");
    for (let i = 0; i < localStorage.length; i++) {
        let storageKey = localStorage.key(i);
        let song = document.createElement("li");
        var retrievedObject = JSON.parse(localStorage.getItem(storageKey));


        if (retrievedObject.type == "playlist") {
            song.innerHTML = "<input type=checkbox" + "><a href=" + "index.html" + ">" + storageKey + "</a>";
            // song.appendChild(button);
            lists.appendChild(song);
        }
    }
}

function getSpecificPlaylists(playlist) {
    let lists = document.getElementById("playlists");
    for (let i = 0; i < localStorage.length; i++) {
        let storageKey = localStorage.key(i);

        var retrievedObject = JSON.parse(localStorage.getItem(storageKey));

        if (retrievedObject.type == "playlist" && storageKey == playlist) {
            var a = retrievedObject.src.split(";");

            for (let b = 0; b < a.length - 1; b++) {
                let song = document.createElement("li");
                song.innerHTML = "<input type=checkbox" + "><a href=" + "index.html" + ">" + a[b] + "</a>";
                // song.appendChild(button);
                lists.appendChild(song); console.log(song);

            }


        }
    }
}








