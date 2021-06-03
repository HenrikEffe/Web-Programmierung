"use strict";
function getNavbar() {
  if (
    document.getElementsByClassName("wrapper-sidebar")[0].style.display ==
    "none"
  ) {
    document.getElementsByClassName("wrapper")[0].style.gridTemplateAreas =
      '"header header header header header header header header header" "sidebar sidebar main main main main main main main" "sidebar sidebar main main main main main main main" "sidebar sidebar main main main main main main main" "sidebar sidebar main main main main main main main" "sidebar sidebar main main main main main main main" "sidebar sidebar main main main main main main main" "sidebar sidebar main main main main main main main" "sidebar sidebar main main main main main main main" "sidebar sidebar main main main main main main main" "sidebar sidebar main main main main main main main" "sidebar sidebar main main main main main main main" "sidebar sidebar main main main main main main main" "sidebar sidebar main main main main main main main" "sidebar  sidebar  ft  ft   ft   ft   ft   ft   ft"';
    document.getElementsByClassName("wrapper-sidebar")[0].style.display =
      "block";
  } else {
    document.getElementsByClassName("wrapper")[0].style.gridTemplateAreas =
      '"header header header header header header header header header" "main main main main main main main main main" "main main main main main main main main main" "main main main main main main main main main" "main main main main main main main main main" "main main main main main main main main main" "main main main main main main main main main" "main main main main main main main main main" "main main main main main main main main main" "main main main main main main main main main" "main main main main main main main main main" "main main main main main main main main main" "main main main main main main main main main" "main main main main main main main main main" "ft ft ft  ft   ft   ft   ft   ft   ft"';
    document.getElementsByClassName("wrapper-sidebar")[0].style.display =
      "none";
  }
}
