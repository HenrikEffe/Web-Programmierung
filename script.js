'use strict';

let playlistNumber = 1;

/*erstellt neue Playlist*/
function createPlaylist(){
    let lists = document.getElementById("bodyLists");
    let playlist = document.createElement("div");
    playlist.classList.add('playlistRow');
    playlist.setAttribute("id", playlistNumber);
    playlistNumber++;
    let h1 = document.createElement("h1");
    let h2 = document.createElement("h2");
    let h3 = document.createElement("h3");
    h1.innerHTML = "Name";
    h2.innerHTML = "Anzahl Songs: x";
    h3.innerHTML = "Dauer in Minuten: x min";
    let check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    lists.appendChild(playlist);
    playlist.appendChild(h1);
    playlist.appendChild(h2);
    playlist.appendChild(h3);
    playlist.appendChild(check);
}

/*loescht ausgewaehlte Playlists*/
function deletePlaylist(){

    let playlist = document.getElementsByClassName("playlistRow");
    let temp = playlist.length;
    let byby;
    
    while(temp>0){

        byby = playlist[temp-1];
        if (byby.getElementsByTagName("input")[0].checked){
            byby.remove(); 
         } 
         temp--;
    }
}