/*Dark-Mode*/
function darkMode() {
    let retrievedObject = JSON.parse(localStorage.getItem("darkmode"));



    if (retrievedObject.src == "theme-dark") {
        document.documentElement.className = "theme-light";
        let theme = { type: "darkmode", src: "theme-light" };
    } else {
        document.documentElement.className = "theme-dark";
        let theme = { type: "darkmode", src: "theme-dark" };
    }

    localStorage.setItem("darkmode", JSON.stringify(theme));
}