window.onload = function(){
  var img    = document.getElementById('palmtree'),
      canvas = document.getElementById('canvas'),
      ctx    = canvas.getContext('2d');

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);

  var imageData = ctx.getImageData(0, 0, img.width, img.height);
  var data = imageData.data;
  var pixelCount = canvas.width * canvas.height;

  // Color as array for rgb values
  // TODO: generate this array from an rgba color
  // to allow more flexibility on input here
  var green = [80, 254, 16];
  var red = [254, 16, 16];

  // Create a gradient from which to pick colors from the duotone
  // based on pixel luminence.
  var gradientArray = createGradient(green, red);

// add arbitrary amount to image for birghtness
  var brightness = adjustBrightness(data, 150);

  var duoToneData =  convertToDuoTone(data, pixelCount, gradientArray);


  var imageData = new ImageData(new Uint8ClampedArray(duoToneData), canvas.width, canvas.height);

  ctx.putImageData(imageData, 0, 0);
};

function convertToDuoTone(imageData, pixelCount, gradientArray) {
  var pixels = imageData;
  var pixelArray = [];

  convertImageToGrayscale(pixels);

  for (var i = 0; i < pixelCount; i++) {
    var offset, r, g, b, a;

    offset = i * 4;
    r = pixels[offset + 0];
    g = pixels[offset + 1];
    b = pixels[offset + 2];
    a = pixels[offset + 3];

    // Average the rgba for HSL conversion
    // Pixel brightness math from w3 suggested formula:
    // https://www.w3.org/TR/AERT#color-contrast
    var average = Math.floor(((299 * r) + (587 * g) + (114 * b)) / 1000);
    var hsl = rgbToHsl(average, average, average);
    var luminosity = Math.max(0, Math.min(254, Math.floor((hsl[2] * 254))));

    // Replace values with new values from gradient array
    r = gradientArray[luminosity][0];
    g = gradientArray[luminosity][1];
    b = gradientArray[luminosity][2];

    pixelArray.push(r);
    pixelArray.push(g);
    pixelArray.push(b);
    pixelArray.push(a);
  }

  return pixelArray;
};

function adjustBrightness(imageData, brightness) {
  // NOTE: 'brightness' is a bit of misnomer here in that
  // the slider amount (1 - 255) doesn't represent the amount
  // by which to brighten, but rather to darken such that
  // a pixel of 20% brightness corresponds to a mix of 20% green / 80% red
  for (var i = 0; i < imageData.length; i += 4) {
      imageData[i] -= brightness; // r
      imageData[i + 1] -= brightness; // g
      imageData[i + 2] -= brightness; // b
  }

  return imageData;
}


function convertImageToGrayscale(imageData) {
  var r, g, b, avg;

  for(var pixel = 0, len = imageData.length; pixel < len; pixel += 4) {
    r = imageData[pixel]
    g = imageData[pixel + 1];
    b = imageData[pixel + 2];

    avg = Math.floor((r + g + b) / 3);

    imageData[pixel] = imageData[pixel + 1] = imageData[pixel + 2] = avg;
  }
};

function createGradient(color1, color2) {
  var gradient = [];

  for (i = 0; i < 255; i += 1) {
    var ratio = i / 255;
    var l = ratio;
    var r = Math.floor(color1[0] * l + color2[0] * (1 - l));
    var g = Math.floor(color1[1] * l + color2[1] * (1 - l));
    var b = Math.floor(color1[2] * l + color2[2] * (1 - l));
    gradient.push([r, g, b]);
  };

  return gradient;
};

// From https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;

  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return [ h, s, l ];
}
