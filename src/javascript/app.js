"use strict";

(function () {
  function init() {
    var router = new Router([
      new Route("start", "start.html"), // true = Startseite
      new Route("song", "songs.html"),
      new Route("playlist", "playlists.html"),
    ]);
    if (!location.hash) {
      // standard-Seite, wenn kein Hash amgegeben wird
      location.hash = "#start";
    }
  }
  init();
})();
