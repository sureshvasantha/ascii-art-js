/// <reference types="p5" />

// const density = "Ñ@#W$9876543210?!abc;:+=-,._ ";
// const density = "Ñ@#W$9876543210?!abc;:+=-,._          ";

// original
// const density = "Ñ@#W$9876543210?!abc;:+=-,._          "
//   .split("")
//   .reverse()
//   .join("");
// const density = "Ñ@#W$9876543210?!abc;:+=-,._  ".split("").reverse().join("");
// const density = "       .:-i|=+%O#@";
// const density = " .:-i|=+%O#@";
// const density = "       .:░▒▓█";
// const density = ".:░▒▓█".split("").reverse().join("");
const density = "  .:░▒▓█";

// let gloria;
let video;
let asciiDiv;

// function preload() {
//   gloria = loadImage("dog.jpg");
// }

function setup() {
  asciiDiv = createDiv();
  noCanvas();
  video = createCapture(VIDEO);
  // video.size(64, 48);
  video.size(100, 80);
}
function draw() {
  video.loadPixels();
  let asciiImage = "";
  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, 0, len));
      const c = density.charAt(charIndex);
      if (c == " ") asciiImage += "&nbsp";
      else asciiImage += c;
    }
    asciiImage += "<br/>";
    // createDiv(row);
  }
  asciiDiv.html(asciiImage);
}
