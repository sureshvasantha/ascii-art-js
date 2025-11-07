/// <reference types='p5' />

let video;
let asciiDiv;

function setup() {
  video = createCapture(VIDEO);
  video.size(100, 100);

  asciiDiv = createDiv();
  asciiDiv.id('asciiDiv');
  asciiDiv.size(900, 900);
  noCanvas();
}

function draw() {
  video.loadPixels();

  // Using string concatenation for HTML creation
  let htmlString = '';


  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];

      // Nothing CMF phone style: pure white, grey, or black pixels
      const luminance = r * 0.3 + g * 0.59 + b * 0.11;
      let avg;
      if (luminance > 180) {
        avg = 255; // white
      } else if (luminance > 80) {
        avg = 120; // grey
      } else {
        avg = 0; // black
      }

      // 1. Good Grey
      // const avg = Math.max(r, g, b);

      // 2. Luminance - 2nd equal to nothing cmf
      // const avg = r * 0.3 + g * 0.59 + b * 0.11;

      // 3. Grayscale
      // const avg = (r + g + b) / 3;

      // 4. Darker grey
      // const avg = Math.min(r, g, b);

      // 5. Desaturation - more darker grey
      // const avg = (Math.max(r, g, b), Math.min(r, g, b)) / 2;
      htmlString += `<span class="pixel" style="background-color: rgb(${avg}, ${avg}, ${avg});"></span>`;
    }
    // Add line break after each row
    htmlString += '<br>';
  }

  // Update the DOM once per frame
  asciiDiv.html(htmlString);
}