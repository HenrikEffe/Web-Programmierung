"use strict";

class Router {
  routes = undefined;
  rootElement = undefined; //angesprochenes div aus der html-Seite

  constructor(routes) {
    this.routes = routes;
    this.rootElement = document.getElementById("container"); //Beschreibt den Bereich in den das HTML der Views geladen wird
    this.init();
  }

  init() {
    let route = this.routes;
    (function (scope, route) {
      window.addEventListener("hashchange", function (e) {
        scope.hasChanged(scope, route);
      });
    })(this, route);

    this.hasChanged(this, route);
  }

  hasChanged(scope, r) {
    if (window.location.hash.length > 0) {
      //checkt ob der Name des Hashs mehr als 0 Buchstaben hat (also ob es sich um den ersten Aufruf der Seite)
      for (let i = 0, length = r.length; i < length; i++) {
        //läuft die Routen durch und checkt ob es sich dabei um die aktive Route handelt, wenn ja wird goToRoute aufgerufen um den HTML Inhalt zu laden
        let route = r[i];
        let currentHash = window.location.hash.substr(1);
        if (route.isActiveRoute(currentHash)) {
          scope.goToRoute(route.htmlName);
        }
      }
    } else {
      for (let i = 0, length = r.length; i < length; i++) {
        //Läuft die Routen durch und sucht nach der default Route die beim erstmaligen Aufruf geladen werden soll
        let route = r[i];
        if (route.defaultRoute) {
          scope.goToRoute(route.htmlName);
        }
      }
    }
  }

  goToRoute(htmlName) {
    //Der Funktion wird die Route übergeben von der er Mittels Ajax Request den HTML Inhalt laden und in index.html anzeigen soll.
    (function (scope) {
      let url = "src/html/" + htmlName,
        xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          scope.rootElement.innerHTML = this.responseText;
          let currentHash = window.location.hash;
          if (currentHash == "#start") {
            console.log("Start Seite");
            createIframe();
          } else if (currentHash == "#song") {
            console.log("Song Seite");
            allSongs();
            getSongs();
          } else if (currentHash == "#playlist") {
            console.log("Playlist Seite");
            getPlaylists();
          } else if (currentHash == "#oneplaylist") {
            getSpecificPlaylists();
          }
          window.scrollTo(0, 0);
          console.log(
            'View "' + currentHash.split("?")[0] + '" wurde geladen.'
          );
        }
      };
      xhttp.open("GET", url, true);
      xhttp.send();
    })(this); //übergibt der selbst aufrufenden Funktion diesen Router
  }
}
