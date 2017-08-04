//= require _imageMasks

window.onload = function(){
  var img    = document.getElementById('palmtree'),
      canvas = document.getElementById('canvas'),
      ctx    = canvas.getContext('2d')
      slider = document.getElementById('brightness-adjustment'),

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);

  var imageData = ctx.getImageData(0, 0, img.width, img.height);
  var pixelCount = canvas.width * canvas.height;
  var duoToneData = ImageMasks.convertToDuoTone(imageData.data, pixelCount);
  var imageData = new ImageData(new Uint8ClampedArray(duoToneData), canvas.width, canvas.height);

  ctx.putImageData(imageData, 0, 0);

  slider.onchange = function() {
    brightness = slider.value;
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var imageData = ctx.getImageData(0, 0, img.width, img.height);

    var adjustedImage = ImageMasks.adjustBrightness(imageData.data, brightness);
    var duoToneData = ImageMasks.convertToDuoTone(adjustedImage, pixelCount);
    var imageData = new ImageData(new Uint8ClampedArray(duoToneData), canvas.width, canvas.height);

    ctx.putImageData(imageData, 0, 0);
  };
};
