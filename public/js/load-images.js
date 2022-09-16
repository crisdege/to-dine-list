var urls = ["american_1.jpg", "american_2.jpg", "american_3.jpg"];

var images = new Array();

function preload(url) {
  var image = new Image();
  image.src = url;
  image.push(image);
}

function preloader() {
  for (var i = 0; i < urls.length; i++) {
    preload("./public/images/") + urls[i];
  }
}

preloader();
