'use strict';

let playlistNumber = 1;


/*Dark-Mode*/
function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}

/*erstellt neue Playlist*/
function createPlaylist() {
    let lists = document.getElementById("bodyLists");
    let playlist = document.createElement("div");
    playlist.classList.add('playlistRow');
    playlist.setAttribute("id", "Playlist" + playlistNumber);
    playlistNumber++;

    let inputText = document.createElement("input");
    inputText.setAttribute("id", "inputText");
    inputText.setAttribute("type", "text");
    inputText.setAttribute("maxlength", "40")
    inputText.setAttribute("value", "Bitte geben Sie den Namen Ihrer Playlist hier ein");

    let inputButton = document.createElement("input");
    inputButton.setAttribute("id", "inputButton");
    inputButton.setAttribute("class", "normalButton")
    inputButton.setAttribute("type", "button");
    inputButton.setAttribute("value", "Namen bestätigen")
    inputButton.setAttribute("onclick", "setPlaylistName(playlistNumber)");

    lists.appendChild(playlist);
    playlist.appendChild(inputText);
    playlist.appendChild(inputButton);



}

/*Setzt den Namen der Playlist*/
function setPlaylistName(number) {

    let playlists = document.getElementsByClassName("playlistRow");
    let playlist = playlists[number - 2];

    let inputText = playlist.getElementsByTagName("input")[0].value;


    let byby = playlist.getElementsByTagName("input")[1];
    byby.remove();

    byby = playlist.getElementsByTagName("input")[0];
    byby.remove();
    let h1 = document.createElement("h1");
    let h2 = document.createElement("h2");
    let h3 = document.createElement("h3");
    h1.innerHTML = inputText;
    h2.innerHTML = "100 Songs";
    h3.innerHTML = "147 Minuten";
    let check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    playlist.appendChild(h1);
    playlist.appendChild(h2);
    playlist.appendChild(h3);
    playlist.appendChild(check);

}

/*loescht ausgewaehlte Playlists*/
function deletePlaylist() {

    let playlist = document.getElementsByClassName("playlistRow");
    let temp = playlist.length;
    let byby;

    while (temp > 0) {

        byby = playlist[temp - 1];
        if (byby.getElementsByTagName("input")[0].checked) {
            byby.remove();
        }
        temp--;
    }
}