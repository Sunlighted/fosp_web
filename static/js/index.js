window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE_1 = "./static/interpolation/stacked";
var INTERP_BASE_2 = "./static/interpolation/stacked1";
var NUM_INTERP_FRAMES = 80;

var interp_images_1 = [];
var interp_images_2 = [];

function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path1 = INTERP_BASE_1 + '/' + String(i).padStart(6, '0') + '.jpg';
    var path2 = INTERP_BASE_2 + '/' + String(i).padStart(6, '0') + '.jpg';

    interp_images_1[i] = new Image();
    interp_images_1[i].src = path1;

    interp_images_2[i] = new Image();
    interp_images_2[i].src = path2;
  }
}

function setInterpolationImage(i, setNumber) {
  var image;
  if (setNumber === 1) {
    image = interp_images_1[i];
    $('#interpolation-image-wrapper-1').empty().append(image);
  } else {
    image = interp_images_2[i];
    $('#interpolation-image-wrapper-2').empty().append(image);
  }
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
}

$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");
    });

    var options = {
      slidesToScroll: 1,
      slidesToShow: 3,
      loop: true,
      infinite: true,
      autoplay: false,
      autoplaySpeed: 3000,
    }

    // Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
      // Add listener to event
      carousels[i].on('before:show', state => {
        console.log(state);
      });
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
      // bulmaCarousel instance is available as element.bulmaCarousel
      element.bulmaCarousel.on('before-show', function(state) {
        console.log(state);
      });
    }

    preloadInterpolationImages();

    // Add event listener for the first set of images
    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value, 1);
    });

    // Add event listener for the second set of images
    $('#interpolation-slider-2').on('input', function(event) {
      setInterpolationImage(this.value, 2);
    });

    setInterpolationImage(0, 1); // Initialize with the first image of the first set
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    setInterpolationImage(0, 2); // Initialize with the first image of the second set
    $('#interpolation-slider-2').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();
});