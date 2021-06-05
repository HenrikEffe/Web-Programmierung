'use strict'
let volume = document.getElementById("volume");
let audioElement = document.getElementById("standardAudio");


volume.addEventListener("input", function () {
    audioElement.volume = volume.value / 100;
});



