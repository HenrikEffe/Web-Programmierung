"use strict";

class Route {
  name = undefined;
  htmlName = undefined;
  defaultRoute = undefined;

  constructor(name, htmlName, defaultRoute = false) {
    this.name = name;
    this.htmlName = htmlName;
    this.defaultRoute = defaultRoute;
  }

  //checkt ob diese Route die aktive ist, welche im Browser angezeigt wird
  isActiveRoute(hashedPath) {
    return hashedPath.replace("#", "") === this.name;
  }
}
