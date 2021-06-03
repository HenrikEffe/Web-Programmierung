"use strict";

(function () {
  function init() {
    let router = new Router([
      new Route("start", "start.html"), // true = Startseite
      new Route("song", "songs.html"),
      new Route("playlist", "playlists.html"),
      new Route("impressum", "imprint.html"),
      new Route("oneplaylist", "OnePlaylist.html"),
    ]);
    if (!location.hash) {
      // standard-Seite, wenn kein Hash amgegeben wird
      location.hash = "#start";
    }
  }
  init();
})();
