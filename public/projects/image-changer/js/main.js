// Image changer
var myImage = document.querySelector('img');
myImage.onclick = function() {
    var mySrc = myImage.getAttribute('src');
    if(mySrc === '/projects/image-changer/images/nodejs.jpg') {
      myImage.setAttribute ('src','/projects/image-changer/images/mean.jpg');
    } else {
      myImage.setAttribute ('src','/projects/image-changer/images/nodejs.jpg');
    }
}
