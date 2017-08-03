window.onload = function(){
  var img    = document.getElementById('palmtree'),
      canvas = document.getElementById('canvas'),
      ctx    = canvas.getContext('2d');

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);
};
