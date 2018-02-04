(function($) {
    "use strict";

    $('.menu>li').slice(-2).addClass('last-elements');

    // $(window).on('scroll', function() {
    //     var scroll = $(window).scrollTop();
    //     if (scroll < 200) {
    //         $(".header-sticky").removeClass("sticky");
    //     } else {
    //         $(".header-sticky").addClass("sticky");
    //     }
    // });

    $('.grid').imagesLoaded(function() {

        // filter items on button click
        $('.portfolio-menu').on('click', 'button', function() {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({ filter: filterValue });
        });

        // init Isotope
        var $grid = $('.grid').isotope({
            itemSelector: '.grid-item',
            percentPosition: true,
            layoutMode: 'fitRows',
            sortBy: 'original-order'
        });
    });

    $('.portfolio-menu button').on('click', function(event) {
        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
        event.preventDefault();
    });

    /*--
    menu-toggle
    ------------------------*/
    $('.menu-toggle').on('click', function() {
        if ($('.menu-toggle').hasClass('is-active')) {
            if ($(document).width() < 768) {
                $('.overlay').css("width", "0%")
                $('.overlay').css("opacity", 0);
            }
            $('.main-menu nav').removeClass('menu-open');
        } else {
            $('.main-menu nav').addClass('menu-open');
            if ($(document).width() < 768) {
                $('.overlay').css("width", "100%")
                $('.overlay').css("opacity", 1);
            }
        }
    });

    $('.menu-item').on('click', function() {
        if ($('.overlay').css("opacity") == 1 && $(document).width() < 768) {
            $('.overlay').css("opacity", 0);
            $('.overlay').css("width", "0%")
            if ($('.menu-toggle').hasClass('is-active')) {
                $('.menu-toggle').removeClass('is-active');
            }
        }
    });

    /*--
    	Hamburger js
    -----------------------------------*/
    var forEach = function(t, o, r) {
        if ("[object Object]" === Object.prototype.toString.call(t)) {
            for (var c in t) {
                if (Object.prototype.hasOwnProperty.call(t, c)) {
                    o.call(r, t[c], c, t);
                }
            }
        } else {
            for (var e = 0, l = t.length; l > e; e++) {
                o.call(r, t[e], e, t);
            }
        }
    };

    var hamburgers = document.querySelectorAll(".hamburger");
    if (hamburgers.length > 0) {
        forEach(hamburgers, function(hamburger) {
            hamburger.addEventListener("click", function() {
                this.classList.toggle("is-active");
            }, false);
        });
    }


    /*--------------------------
        scrollUp
    ---------------------------- */
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 200) {
            $("#toTop").fadeIn();
        } else {
            $("#toTop").fadeOut();
        }
    });
    $('#toTop').on('click', function() {
        $("html,body").animate({
            scrollTop: 0
        }, 500);
    });

    $('#work-menu').on('click', function() {
        $("html,body").animate({
            scrollTop: $('#portfolio').offset().top - 200
        }, 500);
    });

    $('#services-menu').on('click', function() {
        $("html,body").animate({
            scrollTop: $('#services').offset().top - 200
        }, 1700);
    });

    // Headline animation
    $('.headline-selector').animatedHeadline({
        animationType: 'type'
    });

})(jQuery);