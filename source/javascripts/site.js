window.onload = function(){
  var img    = document.getElementById('palmtree'),
      canvas = document.getElementById('canvas'),
      ctx    = canvas.getContext('2d');

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);

  var imageData = ctx.getImageData(0, 0, img.width, img.height);
  console.log(imageData)

  var data = imageData.data;

  convertImageToGrayscale(data);

  // Color as array for rgb values
  // TODO: generate this array from an rgba color
  // to allow more flexibility on input here
  var green = [80, 254, 16];
  var red = [254, 16, 16];

  // Create a gradient from which to pick colors from the duotone
  // based on pixel luminence.
  var gradientArray = createGradient(green, red);

  console.log(gradientArray)

  ctx.putImageData(imageData, 0, 0);
};

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
