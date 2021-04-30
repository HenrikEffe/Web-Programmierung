'use strict';

/*erstellt neue Playlist*/
function createPlaylist(){
    let lists = document.getElementById("bodyLists");
    let playlist = document.createElement("div");
    playlist.classList.add('playlistRow');
    let h1 = document.createElement("h1");
    let h2 = document.createElement("h2");
    let h3 = document.createElement("h3");
    h1.innerHTML = "Name";
    h2.innerHTML = "Anzahl Songs: x";
    h3.innerHTML = "Dauer in Minuten: x min";
    lists.appendChild(playlist);
    playlist.appendChild(h1);
    playlist.appendChild(h2);
    playlist.appendChild(h3);
}