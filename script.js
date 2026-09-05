const images = [
    "https://images.unsplash.com/photo-1500534623283-312aade485b7",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    "https://images.unsplash.com/photo-1546182990-dffeafbe841d",
    "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e"
];

let currentImage = 0;

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");


// Open Lightbox
function openLightbox(index) {

    currentImage = index;

    lightboxImage.src = images[currentImage];

    lightbox.style.display = "flex";
}


// Close Lightbox
function closeLightbox() {

    lightbox.style.display = "none";
}


// Next Image
function nextImage() {

    currentImage++;

    if (currentImage >= images.length) {
        currentImage = 0;
    }

    lightboxImage.src = images[currentImage];
}


// Previous Image
function previousImage() {

    currentImage--;

    if (currentImage < 0) {
        currentImage = images.length - 1;
    }

    lightboxImage.src = images[currentImage];
}


// Category Filter
function filterImages(category) {

    const items = document.querySelectorAll(".gallery-item");

    items.forEach(item => {

        if (category === "all") {

            item.style.display = "block";

        } else if (item.classList.contains(category)) {

            item.style.display = "block";

        } else {

            item.style.display = "none";
        }

    });
}


// Close lightbox when clicking outside image
lightbox.addEventListener("click", function(event) {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


// Keyboard navigation
document.addEventListener("keydown", function(event) {

    if (lightbox.style.display === "flex") {

        if (event.key === "ArrowRight") {
            nextImage();
        }

        if (event.key === "ArrowLeft") {
            previousImage();
        }

        if (event.key === "Escape") {
            closeLightbox();
        }
    }

});