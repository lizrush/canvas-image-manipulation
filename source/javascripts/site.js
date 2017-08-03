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

  // Convert the image to grayscale
  var r,g,b,avg;
  for(var p = 0, len = data.length; p < len; p+=4) {
      r = data[p]
      g = data[p+1];
      b = data[p+2];

      avg = Math.floor((r+g+b)/3);

      data[p] = data[p+1] = data[p+2] = avg;
  }

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

function createGradient(color1, color2) {
  var gradient = [];

  for (i = 0; i < 255; i += 1) {
    var ratio = i / 255;
    var l = ratio;
    var r = Math.floor(color1[0] * l + color2[0] * (1 - l));
    var g = Math.floor(color1[1] * l + color2[1] * (1 - l));
    var b = Math.floor(color1[2] * l + color2[2] * (1 - l));
    gradient.push([r, g, b]);
  }

  return gradient;
}
