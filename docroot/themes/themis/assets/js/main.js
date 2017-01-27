"use strict";
(function ($) {
//
// Remove scroll indicator after first scroll event
//
    $(window).on("scroll", function(){
        if($(window).scrollTop() > 0){
            $('.tms-intro-scroll').hide();
        } else {
            $('.tms-intro-scroll').show();
        }
    });

//
// Smooth scroll to the next section if user will click on scroll indicator
//
    $(".tms-intro-scroll").on("scroll", function() {

        var windowHeight = window.innerHeight;

        $("html, body").animate({ scrollTop: windowHeight }, 250);
        return false;
    });

//
// Smooth scroll to the top of page
//
    $("a[href='#top']").on("click", function() {
        $("html, body").animate({ scrollTop: 0 }, 250);
        return false;
    });

//
// Back to top show function
//
    $('*[data-show-height]').each(function() {

        var element = $(this);
        var elementData = $(element).data('show-height');

        $(element).hide();

        $(document).on("scroll", function() {
            var documentStart   = $(document).scrollTop();
            if (documentStart > elementData) {
                $(element).show();
            } else {
                $(element).hide();
            }
        });

    });

//
// FAQ toggle function
//
    $('.tms-faq-question').each(function() {
        $('.tms-faq-text').hide();
    });

    $('.tms-faq-head').on("click", function(event){
        event.preventDefault();

        $(this).find('i').toggleClass('fa-angle-down');
        $(this).find('i').toggleClass('fa-angle-up');
        $(this).next('.tms-faq-text').slideToggle(default_transition_reduc);
    });

//
// Common Multiply function
//
    $.fn.multiply = function(numCopies) {
        var newElements = this.clone();
        for(var i = 1; i < numCopies; i++)
        {
            newElements = newElements.add(this.clone());
        }
        return newElements;
    };

//
// Sticky menu and smooth scroll to section according ID
//
    // Sticky menu
    $(window).on("scroll", function(){
        if($('header').data('feature') === 'tms-sticky-header') {

            var headerStart  = $('header').data('header-start');
            var headerScroll = $('header').data('header-scroll');

            if($(window).scrollTop() > 0) {
                // change type of header to tms-header-fixed
                $('header').addClass(headerScroll);
                $('header').removeClass(headerStart);
                // adjust vertical padding if needed
                $('header > div').removeClass('tms-pad-vl');
            }
            else {
                $('header').removeClass(headerScroll);
                $('header').addClass(headerStart);
                // adjust vertical padding according initial header type
                if($('header').data('header-start') === 'tms-header-transparent') {
                    $('header > div').addClass('tms-pad-vl');
                }
            }
        }
    });

    // Smooth scroll
    $('.tms-general-nav a').on("click", function() {
        // class active reset
        $('.tms-general-nav a').removeClass('active');
        // add class active to clicked element
        $(this).addClass('active');

        // smooth scroll to targeted section
        var target = $(this).attr('href');
        var targetPadding = ( $(target).innerHeight() - $(target).height() ) / 2.05;
        var targetElement = $(target).offset().top - targetPadding;

        $('html, body').animate({
                scrollTop: targetElement
            }, 250,
            function () {
                window.location.hash = target;
            });
        return false;
    });

    // Change which menu item is active when user is scrolling on one-scroll page
    $(window).on("scroll", function(){
        if($('nav').data('feature') === 'tms-one-scroll') {
            var scrollPos = $(document).scrollTop();

            $('.tms-general-nav a[href*="#"]').each(function () {
                var currLink = $(this);
                var refElement = $(currLink.attr("href"));
                var refElementPad = ( $(refElement).innerHeight() - $(refElement).height() ) / 2;
                var refElementPos = $(refElement).position().top - refElementPad;

                if (refElementPos <= scrollPos && refElementPos + refElement.height() > scrollPos) {
                    $('.tms-general-nav a').removeClass("active");
                    currLink.addClass("active");
                } else{
                    currLink.removeClass("active");
                }
            });
        }
    });

//
// Show complete menu on mobile or as megamenu / submenu on hover
//

    // Mobile menu
    $('.tms-show-nav').on("click", function(){
        $('.tms-general-nav').slideToggle(default_transition_reduc);
    });

    // Desktop megamenu
    if ( $('.tms-show-nav').is(':visible')  ) {
        $('.tms-general-nav a').on("click", function() {
            $('.tms-general-nav').hide();
        });
    } else {
        // Filter megamenu according hovered item in general menu
        $('*[data-megamenu="tms-megamenu-a"]').on("mouseenter mouseleave", function(){
            var array = $(this).attr('href').split('.');
            var catid = array[0];

            $('.tms-megamenu-nav-cat').hide();
            $('#'+catid).show();

        });
        // Megamenu / Submenu displayed on hover
        $('.tms-general-nav a').on("mouseenter", function() {
            // if megamenu is set
            if($(this).data('megamenu') === 'tms-megamenu-a') {

                var headerHeight = $('header').height() - 3;

                if($('header').hasClass('tms-header-transparent') && $('header').find('.tms-container').hasClass('tms-pad-vl')) {
                    var paddingBottom = ($('header').height() - $('header .tms-container').height()) / 2;
                    var headerHeight  = $('header').height() - paddingBottom - 3;
                }

                $('.tms-megamenu-nav').css('top', headerHeight).slideDown(default_transition_reduc);
            } else {
                $('.tms-megamenu-nav').hide();
            }

            // if megamenu is not set, show standard submenu
            if(!$(this).is('[data-megamenu]') && $(this).parent().children('ul').hasClass('tms-general-submenu')) {

                var submenuHeight = $(this).outerHeight() - 3;

                $(this).parent().children('.tms-general-submenu').css('top', submenuHeight).slideDown(default_transition_reduc)
            } else if($(this).parents().hasClass('tms-general-submenu')) {
                $(this).parents('.tms-general-submenu').show();
            } else {
                $('.tms-general-submenu').hide();
            }
        });
        $('.tms-megamenu-nav, .tms-general-submenu').on("mouseleave", function() {
            $('.tms-megamenu-nav, .tms-general-submenu').hide();
        });
        $(window).on("scroll", function(){
            $('.tms-megamenu-nav, .tms-general-submenu').hide();
        });
    }

//
// Add arrow to element with megamenu or submenu on desktop
//
    $('.tms-general-submenu').each(function() {
        if($(window).width() >= breakNavigation) {
            var parentItem = $(this).parent().children('a');
            $(parentItem).append(' <i class="fa fa-angle-down" aria-hidden="true"></i>');
        }
    });

//
// Animated sliding border-bottom for general navigation items
//
    var initBorder = '<span></span>';

    if($('[data-effect=tms-sliding-menu]').parents('.tms-header-transparent').length) {
        $('[data-effect=tms-sliding-menu] a').each(function() {
            if($(this).hasClass('active')) {
                $(this).append(initBorder);
            }
        });
    }

    function slidingMenu() {
        if($('[data-effect=tms-sliding-menu]').parents('.tms-header-transparent').length) {

            $('.tms-general-nav a.active span').show();

            var origin = $('.tms-general-nav a.active span').parent();
            var menu   = $(".tms-general-nav");
            var target = 0;
            var originOffset = origin.offset().left - menu.offset().left;
            var originWidth = $('.tms-general-nav a.active span').css('width');

            $('.tms-general-nav a.active span').css('left', originOffset);
            $('.tms-general-nav a.active span').css('width', originWidth);
            $('[data-effect=tms-sliding-menu] a').css('position', 'static');
            $('.tms-general-nav-box').css('position', 'relative');


            $('[data-effect=tms-sliding-menu] a').on("mouseover", function() {

                var target = $(this);
                var targetOffset = target.offset().left - menu.offset().left;
                var targetWidth = $(this).css('width');

                $('.tms-general-nav a.active span').stop(true).animate({
                    'left': targetOffset,
                    'width': targetWidth
                }, default_transition_reduc);
            });

            $('[data-effect=tms-sliding-menu]').on("mouseleave", function() {
                $('.tms-general-nav a.active span').animate({
                    'left': originOffset,
                    'width': originWidth
                }, default_transition_reduc);
            });
        } else {
            $('[data-effect=tms-sliding-menu] a').each(function() {
                $(this).find('span').hide();
                $(this).find('span').css('position', 'absolute');
            });
        }
    }
    $(window).on("load", function() {
        if($(window).width() >= breakNavigation && $('.tms-general-nav').data('effect') === 'tms-sliding-menu') {
            var initBorder = $('.tms-general-nav a.active span');
            slidingMenu();
        }
    });

    $(window).on("scroll", function() {
        if($(window).width() >= breakNavigation && $('.tms-general-nav').data('effect') === 'tms-sliding-menu') {
            var initBorder = $('.tms-general-nav a.active span');
            slidingMenu();
        }
    });

//
// Portfolio tag navigation and show detail functions
//
    function resetPortfolio() {
        $('.tms-portfolio-item').each(function() {
            $('.tms-portfolio-nav').css('overflow', '').css('height', '');
            $('.tms-portfolio-item').removeAttr('style');
            $('.tms-detail-info, .tms-detail-close').hide();
            $('.tms-detail-highlights, .tms-detail-description, .tms-detail-illustration').css('opacity', 0);
            $('.tms-hover-text, img').show();
            $('.tms-portfolio-nav a').removeClass('active');
            $('.tms-portfolio-nav a').first().addClass('active');
        });
    }

    $('.tms-detail-info, .tms-detail-close').hide();
    $('.tms-portfolio-detail .tms-detail-highlights, .tms-portfolio-detail .tms-detail-description, .tms-portfolio-detail .tms-detail-illustration').css('opacity', 0);

    // Show area with headline and links on click or hover
    $('.tms-portfolio-item').on("click mouseenter mouseleave", function () {
        $('tms-hover-text').toggle();
    });

    $('.tms-hover-text a').on("mouseenter mouseleave", function() {
        $(this).find('i').each(function() {
            $(this).toggleClass('fa-inverse');
        });
    });

    $('.tms-detail-link').on("click", function(event){
        event.preventDefault();

        var listHeight      = $('.tms-portfolio-list').height();
        var itemUrl         = $(this).attr('href');
        var itemHover       = $(this).parents('.tms-hover-text');
        var itemImage       = $(this).parents('.tms-hover-text').siblings('img');
        var itemParent      = $(this).parents('.tms-portfolio-item');
        var itemSinglings   = $(this).parents('.tms-portfolio-item').siblings();
        var portfolioNav    = $('.tms-portfolio-nav');
        var PortfolioTop    = $('.tms-portfolio').offset().top - 20;

        $("html, body").animate({ scrollTop: PortfolioTop }, 250);

        $(itemHover).hide();
        $(itemImage).hide();
        $(itemParent).hide();
        $(itemSinglings).hide();
        $(portfolioNav).css('overflow','hidden').css('height', '3px');

        $('.tms-detail-info').slideToggle(default_transition_reduc, function(){
            $('.tms-detail-highlights').animate({opacity:1}, default_transition_reduc).load(itemUrl + ' .tms-detail-highlights');
            $('.tms-detail-description').animate({opacity:1}, default_transition_reduc).load(itemUrl + ' .tms-detail-description');
            $('.tms-detail-illustration').animate({opacity:1}, default_transition_reduc).load(itemUrl + ' .tms-detail-illustration');
            $('.tms-detail-close').fadeIn(default_transition_reduc);
        });

        $(function() {
            setTimeout(portfolioGallery, default_transition);
        });

        $(document).ajaxError(function() {
            window.location.href = itemUrl;
        });

    });

    $('.tms-detail-close').on("click", function(){
        resetPortfolio();
    });

    $('section').each(function() {
        if($(this).data('feature') === 'tms-portfolio') {

            $('.tms-portfolio-nav').show();

            var itemWidth  = $('.tms-portfolio-item').first().outerWidth();

            $('.tms-portfolio-item').each(function() {
                $(this).find('img').css("width", itemWidth);
            });

            $('.tms-portfolio-nav a').on("click", function() {
                resetPortfolio();

                $('.tms-portfolio-nav a').removeClass('active');
                $(this).addClass('active');

                var tag = $(this).attr('href').slice(1);

                $('.tms-portfolio-item').each(function() {
                    if($(this).data('portfolio-tags') !== tag && tag !== 'all') {
                        $(this).animate({opacity: 0}, default_transition_reduc);
                        $(this).animate({width: 0}, default_transition);
                    }
                    if(tag === 'all') {
                        if($(this).is(':visible')) {
                            $(this).show();
                        } else {
                            $(this).fadeIn(default_transition_reduc);
                        }
                    }
                });
            });
        }
    });

//
// Portfolio gallery
//
    function portfolioGallery() {
        $('[data-feature=tms-gallery]').each(function() {

            var galleryType        = $(this).data('feature');
            var galleryDuration    = $(this).data('duration');
            var galleryImage       = $(this).find('figure');
            var galleryImageNum    = $(this).find('figure').length;
            var galleryImageFirst  = $(this).find('figure').first();
            var galleryImageHeight = $(galleryImageFirst).height();

            $(this).css({
                'position' : 'relative',
            });

            var circles = $('<span></span>');

            $(this).find('.tms-gallery-nav').append(circles.multiply(galleryImageNum));
            $(this).find('.tms-gallery-nav span:first').addClass('active');
            $(this).find('.tms-gallery-nav span').each(function(i) {
                $(this).attr('data-gallery-nav', ++i);
            });

            $('.tms-gallery-nav span').on("click", function() {

                $(this).siblings().removeClass('active');
                $(this).addClass('active');

                var requestedImage = $(this).data('gallery-nav');

                $('[data-gallery-item]').hide();
                $('[data-gallery-item="'+requestedImage+'"]').fadeIn(default_transition);

            });

        });
    }

    $(window).on("load", function() {
        portfolioGallery();
    });
}(jQuery));
