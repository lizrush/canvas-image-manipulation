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

  // Create a gradient from which to pick colors from the duotone
  // based on pixel luminence.
  var gradientArray = [];
  // Color as array for rgb values
  var green = [80, 254, 16];
  var red = [254, 16, 16];

  // arbitrarily choosing a gradient of 255 values for each
  for (var d = 0; d < 255; d += 1) {
    var ratio = d / 255;
    var l = ratio;
    var rA = Math.floor(green[0] * l + green[0] * (1 - l));
    var gA = Math.floor(green[1] * l + green[1] * (1 - l));
    var bA = Math.floor(green[2] * l + green[2] * (1 - l));
    gradientArray.push([rA, gA, bA]);
  }

  console.log(gradientArray)

  ctx.putImageData(imageData, 0, 0);
};
