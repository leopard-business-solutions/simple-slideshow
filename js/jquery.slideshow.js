// Simple slideshow plugin - Leopard Business Solutions
// Daniel Upton [daniel@ileopard.co]
(function($){
  $.fn.extend({
    slideshow: function(options) {
      var defaults = {
        time: 3000
      };

      var options  = $.extend(defaults, options);

      return this.each(function() {
        var obj = $(this);

        // Get the first image and add mark it as current
        var firstImage = $(obj).children('.images').children(':first-child').addClass('current');
        var firstImageUrl = removeSpaces(firstImage.attr('src'));

        // Add the first slide and set the first image as the slide's background
        $(obj).append($('<div class="slide currentSlide">').css('background-image', 'url(' + firstImageUrl + ')'));

        // Swap the slides (pretty self explanitory i know)
        function switchSlides(){
            var currentImage = $(obj).children('.images').children('img.current');

            // If the next child exists use it, else get the first child again
            var nextImage = currentImage.next().length ? currentImage.next() : firstImage;
            var nextImageUrl = removeSpaces(nextImage.attr('src'));

            // Get the current slide
            var currentSlide = $(obj).children('.currentSlide');

            // Add the next slide
            nextSlide = $('<div class="slide nextSlide">').css('background-image', 'url(' + nextImageUrl + ')');
            $(obj).append(nextSlide);

            // Fade next image in and when its done can the old one
            nextSlide.fadeIn(function(){

              // Remove the old slide
              currentSlide.remove();

              // Mark the new slide as current
              nextSlide.removeClass('nextSlide');
              nextSlide.addClass('currentSlide');

          });

          // Swap who's the current image
          nextImage.addClass('current');
          currentImage.removeClass('current');
        }

        function removeSpaces(str)
        {
          return str.replace(/ /, '%20');
        }

        // Call swap slides every x seconds
        setInterval( function() { switchSlides(); }, options.time );
    })}
  });
})(jQuery);
