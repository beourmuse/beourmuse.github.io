(function($) {
    "use strict";

    $('.menu>li').slice(-2).addClass('last-elements');

    $('.grid').imagesLoaded(function() {

        // filter items on button click
        $('.portfolio-menu').on('click', 'button', function() {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({ filter: filterValue });
        });

        // init Isotope grid for projects
        var $grid = $('.grid').isotope({
            itemSelector: '.grid-item',
            percentPosition: true,
            layoutMode: 'fitRowsCentered',
            sortBy: 'original-order'
        });
    });

    $('.portfolio-menu button').on('click', function(event) {
        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
        event.preventDefault();
    });

    // Populate the HTML for instagram posts
    // if ($('#instagram-grid').length) {
    //     var jqxhr = $.ajax( "https://www.instagram.com/graphql/query/?query_id=17888483320059182&id=1460257412&first=10" ).done(function() {
    //     }).fail(function() {
    //         //alert( "error" );
    //     }).always(function(json) {
    //         var items = json.data.user.edge_owner_to_timeline_media.edges;
    //         var i = 0;
    //         $.each(items, function(n, item) {
    //             if( i <= 5 ){
    //                 if (item.node.is_video) {
    //                     return true;
    //                 }
    //                 var postLink = "<a target='_blank' href='https://www.instagram.com/p/"+item.node.shortcode+"'><div class='col-lg-2 col-md-4 col-sm-4 col-xs-6 item'><img class='img-responsive center-block' src='" + item.node.thumbnail_src + "'/></div></a>";
    //                 $("#instagram-grid").append(postLink);
    //             }
    //             i++;
    //         });
    //     });
    // }

    /*--
    menu-toggle
    ------------------------*/
    $('.menu-toggle').on('click', function() {
        if ($('.menu-toggle').hasClass('is-active')) {
            if ($('.main-menu nav').hasClass('nav-menu-open')) {
                $('.overlay').css("width", "0%");
                $('.overlay').css("opacity", 0);
                $('.overlay').css("z-index", 1);
                $('.main-menu nav').removeClass('nav-menu-open');
                $('.main-menu').removeClass('overlay');
                $("body").css("overflow", "auto");
            }
            $('.main-menu nav').removeClass('menu-open');
        } else {
            $('.main-menu nav').addClass('menu-open');
            if ($(document).width() <= 768) {
                $('.main-menu nav').addClass('nav-menu-open');
                $('.main-menu').addClass('overlay');
                $('.overlay').css("width", "100%");
                $('.overlay').css("opacity", 1);
                $('.overlay').css("z-index", 100);
                $("body").css("overflow", "hidden");
            }
        }
    });

    $('.menu-item').on('click', function() {
        if ($('.overlay').css("opacity") == 1 && $(document).width() <= 768) {
            $('.overlay').css("opacity", 0);
            $('.overlay').css("width", "0%");
            $('.overlay').css("z-index", 1);
            $("body").css("overflow", "auto");
            if ($('.menu-toggle').hasClass('is-active')) {
                $('.menu-toggle').removeClass('is-active');
            }
        }
    });

    // Reset menu on window resize
    var resizeTimer;
    $(window).on('resize', function(e) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            $(".overlay").removeAttr("style");
            $('.menu-toggle').removeClass('is-active');
            $('.main-menu nav').removeClass('nav-menu-open');
            $('.main-menu nav').removeClass('menu-open');
            $('.main-menu').removeClass('overlay');
        }, 250);
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
        $(".scroll-text").fadeOut();
        if ($(window).scrollTop() > 200) {
            if ($(document).width() <= 480) {
                $(".logo").fadeOut();
                $(".logo-line").fadeOut();
            }
            if ($(document).height() >= 1200) {
                $("#toTop").fadeIn();
            }
        } else {
            $(".logo").fadeIn();
            $(".logo-line").fadeIn();
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

})(jQuery);