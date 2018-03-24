$(document).ready(function(){

  //caches a jQuery object containing the header element
    var header = $('.sticky-nav');
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 700) {
          console.log("hitting 700 spot");
            if(header.hasClass('hide-nav')) {
        header.hide();  header.removeClass('hide-nav').addClass('show-nav').fadeIn(2000);
            }
        } else {
            if(header.hasClass('show-nav'))  {
                header.hide();
                header.removeClass('show-nav').addClass('hide-nav').fadeIn(2000);
        }
      }
    });

});
