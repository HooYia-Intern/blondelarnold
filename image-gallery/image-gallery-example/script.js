var imageThumbs = document.getElementById("image-thumbs");
var currentImage = document.getElementById("current-image");
var prevBtn = document.getElementById("prev-btn");
var nextBtn = document.getElementById("next-btn");

var currentIndex = 0;
var imageCount = 10;

for (var i = 1; i <= imageCount; i++) {
  var thumb = document.createElement("img");
  thumb.src = "images/image" + i + ".jpg";
  thumb.alt = "Image " + i;
  thumb.classList.add("thumb");
  imageThumbs.appendChild(thumb);
  thumb.addEventListener(
    "click",
    function() {
      currentIndex = Array.from(imageThumbs.children).indexOf(this);
      updateCurrentImage();
    }
  );
}

prevBtn.addEventListener("click", function() {
  currentIndex = (currentIndex - 1 + imageCount) % imageCount;
  updateCurrentImage();
});

nextBtn.addEventListener("click", function() {
  currentIndex = (currentIndex + 1) % imageCount;
  updateCurrentImage();
});

function updateCurrentImage() {
  currentImage.src = "images/image" + (currentIndex + 1) + ".jpg";
}

setInterval(function() {
  currentIndex = (currentIndex + 1) % imageCount;
  updateCurrentImage();
}, 5000);