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
    var jqxhr = $.ajax( "https://www.instagram.com/TOTIMEA/?__a=1" ).done(function() {
    }).fail(function() {
        //alert( "error" );
    }).always(function(data) {
        var items = data.graphql.user.edge_owner_to_timeline_media.edges;
        var i = 0;
        $.each(items, function(n, item) {
            if( i <= 5 ){
                if (item.node.is_video) {
                    return true;
                }
                var postLink = "<a target='_blank' href='https://www.instagram.com/p/"+item.node.shortcode+"'><div class='col-md-4 col-sm-4 col-xs-4 item'><img class='img-responsive center-block' src='" + item.node.thumbnail_src + "'/></div></a>";
                $("#instagram-grid").append(postLink);
            }
            i++;
        });
    });

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
            }
        }
    });

    $('.menu-item').on('click', function() {
        if ($('.overlay').css("opacity") == 1 && $(document).width() <= 768) {
            $('.overlay').css("opacity", 0);
            $('.overlay').css("width", "0%");
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