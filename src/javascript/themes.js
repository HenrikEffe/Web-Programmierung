/*Dark-Mode*/
function darkMode() {
  var retrievedObject = JSON.parse(localStorage.getItem("darkmode"));

  if (retrievedObject.src == "theme-dark") {
    document.documentElement.className = "theme-light";
    var theme = { type: "darkmode", src: "theme-light" };
  } else {
    document.documentElement.className = "theme-dark";
    var theme = { type: "darkmode", src: "theme-dark" };
  }

  localStorage.setItem("darkmode", JSON.stringify(theme));
}
