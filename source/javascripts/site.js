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

  ctx.putImageData(imageData, 0, 0);
};
