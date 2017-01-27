"use strict";

//
// Content slider
//
(function ($) {
    $('section').each(function() {
        if($(this).data('feature') === 'tms-slider') {

            var section       = $(this);
            var sectionHeight = $(this).outerHeight();

            var firstSlide = $(section).find('[data-slider-item]').first();
            var lastSlide  = $(section).find('[data-slider-item]').last();
            var numSlides  = $(section).find('[data-slider-item]').length;

            $(section).css('overflow', 'hidden');
            $(section).css('height', sectionHeight);
            $(section).find("[data-slider-item]:not(:first)").css('left', '100%');
            $(section).find("[data-slider-item]").css('position', 'absolute');

            $(section).find('.tms-slider-control').after('<div class="tms-slider-nav"></div>');

            var circles = $('<span></span>');

            $(section).find('.tms-slider-nav').append(circles.multiply(numSlides));
            $(section).find('.tms-slider-nav span:first').addClass('active');

            $(section).find('.tms-slider-nav span').each(function(i) {
                $(this).attr('data-slider-nav', ++i);
            });

            $(section).find('.tms-slider-next').on("click", function() {

                $(this).css({ "pointer-events":"none"});

                var activeSlide      = $(section).find('[data-slider-item]:visible');
                var nextSlide        = $(activeSlide).next('[data-slider-item]');
                var activeCircle     = $(section).find('.tms-slider-nav span.active');

                if ( $(lastSlide).is(':visible') ) {

                    $(activeCircle).removeClass('active');

                    $(firstSlide).show().animate({left: '0%'}, default_transition);
                    $(firstSlide).nextAll('[data-slider-item]').show().animate({left: '100%'}, default_transition);
                    $(section).find('[data-slider-nav]:first').addClass('active');

                    setTimeout(function() {
                        $(firstSlide).nextAll('[data-slider-item]').hide();
                    }, default_transition);

                } else {

                    $(activeSlide).animate({left: '-100%'}, default_transition);
                    $(nextSlide).show().animate({left: '0%'}, default_transition);
                    $(activeCircle).removeClass('active');
                    $(activeCircle).next('span').addClass('active');

                    setTimeout(function() {
                        $(activeSlide).hide();
                    }, default_transition);

                }

                $(nextSlide).promise().done(function() {
                    $('.tms-slider-next').css({ "pointer-events":"auto"});
                });

            });

            $(section).find('.tms-slider-prev').on("click", function() {

                $(this).css({ "pointer-events":"none"});

                var activeSlide = $(section).find('[data-slider-item]:visible');
                var prevSlide   = $(activeSlide).prev('[data-slider-item]');
                var activeCircle  = $(section).find('.tms-slider-nav span.active');

                if ($(firstSlide).is(':visible') ) {

                    $(activeCircle).removeClass('active');

                    $(lastSlide).show().animate({left: '0%'}, default_transition);
                    $(lastSlide).prevAll('[data-slider-item]').show().animate({left: '-100%'}, default_transition);
                    $(section).find('[data-slider-nav]:last').addClass('active');

                    setTimeout(function() {
                        $(lastSlide).prevAll('[data-slider-item]').hide();
                    }, default_transition);

                } else {

                    $(activeSlide).animate({left: '100%'}, default_transition);
                    $(prevSlide).show().animate({left: '0%'}, default_transition);
                    $(activeCircle).removeClass('active');
                    $(activeCircle).prev('span').addClass('active');

                    setTimeout(function() {
                        $(activeSlide).hide();
                    }, default_transition);

                }

                $(prevSlide).promise().done(function() {
                    $('.tms-slider-prev').css({ "pointer-events":"auto"});
                });

            });

            $(section).find('.tms-slider-nav span').on("click", function() {

                $('.tms-slider-nav').css({ "pointer-events":"none"});

                var initPosition = $(section).find('[data-slider-item]:visible').css('left');
                var activeNum = $(this).siblings('.active').data('slider-nav');
                var targetNum = $(this).data('slider-nav');
                var targetSlide = $('[data-slider-item='+targetNum+']');
                var prevAllSlides = $(targetSlide).prevAll('[data-slider-item]');
                var nextAllSlides = $(targetSlide).nextAll('[data-slider-item]');

                if(activeNum < targetNum) {
                    $(prevAllSlides).show().animate({left: '-100%'}, default_transition);
                    $(targetSlide).show().animate({left: '0%'}, default_transition);
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');

                    setTimeout(function() {
                        $(prevAllSlides).hide();
                    }, default_transition);

                } else if(activeNum > targetNum) {
                    $(nextAllSlides).show().animate({left: '100%'}, default_transition);
                    $(targetSlide).show().animate({left: '0%'}, default_transition);
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');

                    setTimeout(function() {
                        $(nextAllSlides).hide();
                    }, default_transition);

                } else {
                    // do nothing
                }

                $(targetSlide).promise().done(function() {
                    $('.tms-slider-nav').css({ "pointer-events":"auto"});
                });

            });
        }
    });

//
// Advanced show-hide function and generated sidebar
//
    $('section').each(function() {
        if($(this).data('feature') === 'tms-showhide-toggle') {

            function showhide() {
                var showhideActive = $('.tms-showhide-nav').find('a.active').attr('href').slice(1);
                $('[data-showhide-item]').hide();
                $('[data-showhide-item='+showhideActive+']').show();
            }

            if($(window).width() >= breakLarge) {
                // set grid and separator
                $('.tms-showhide-nav').show().css('float', 'left').css('width','25%');
                $('.tms-showhide-items').css('float', 'left').css('width','75%').css('border-left-width', '0.25rem');
            }
            if($(window).width() < breakLarge) {
                // set grid and separator
                $('.tms-showhide-nav').show();
                $('.tms-showhide-items').css('border-top-width', '0.25rem');
            }
            // hide all items excapt one whose related anchor has class 'active'
            showhide();

            $('.tms-showhide-nav a').on("click", function(event) {
                event.preventDefault();

                $('.tms-showhide-nav a').removeClass('active');
                $(this).addClass('active');
                // run showhide function again
                showhide();
            });
        }
    });

//
// Counting feature for selected elements when they will hit viewport
//
    $(window).on("load scroll", function(e) {
        $('[data-effect=tms-count]').each(function() {

            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();

            if( bottom_of_window > bottom_of_object ){
                $(this).removeAttr('data-effect'); // remove due no-repeating
                var duration = $(this).data('duration'); // individual duration set for each element

                $(this).prop('Counter',0).animate({
                    Counter: $(this).text()
                }, {
                    duration: duration,
                    easing: 'swing',
                    step: function(now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            }
        });
    });

//
// Counting effect for numeric elements which starts when they will hit viewport
//
    $(window).on("load scroll", function(e) {
        $('[data-effect=tms-counter]').each( function(){

            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();

            if( bottom_of_window > bottom_of_object ){
                $(this).animate({
                    'opacity':'1',
                    'bottom':'0'
                }, default_transition);
            }
        });
    });

//
// Fade-in effect for selected items when they will hit viewport
//
    $('[data-effect=tms-fadein]').css({
        'opacity': '0',
        'position': 'relative',
        'bottom': '-50px'
    });

    $(window).on("load scroll", function(e) {
        $('[data-effect=tms-fadein]').each( function(){

            var bottom_of_object = $(this).offset().top + ($(this).outerHeight() / 2);
            var bottom_of_window = $(window).scrollTop() + $(window).height();

            if( bottom_of_window > bottom_of_object ){
                $(this).animate({
                    'opacity':'1',
                    'bottom':'0'
                }, default_transition);
            }
        });
    });

//
// Animated fontawesome fa-stack icons
//
    $('[data-effect=tms-inverse]').on("mouseenter mouseleave", function() {
        $(this).children().toggleClass('fa-inverse', default_transition_reduc);
    });

//
// Animated circle progress bars
//
    $(window).scroll(function() {
        $('[data-effect=tms-circle]').each(function() {
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();

            if( bottom_of_window > bottom_of_object ){
                $(this).circleGraphic();
                $(this).removeAttr('data-effect');
            }
        });
    });

    (function($){
        $.fn.circleGraphic=function(options){
            $.fn.circleGraphic.defaults={
                color: $(this).css('color'),
                startAngle: 0,
                //endAngle:50
            };

            var opts = $.extend({},$.fn.circleGraphic.defaults,options);

            var percentage=this.data('value');
            var ID="c"+percentage+Math.random();
            //alert(ID);

            this.append("<canvas id='"+ID+"'></canvas>");

            var canvas=document.getElementById(ID),
                context=canvas.getContext('2d');

            var Width = this.width();
            this.height(Width);
            var Height = this.height();

            canvas.width = Width;
            canvas.height = Height;

            var startAngle = opts.startAngle,
                endAngle = percentage/100,
                angle = startAngle,
                radius = Width*0.4;

            function drawTrackArc(){
                context.beginPath();
                context.strokeStyle = '#ECECEC';
                context.lineWidth = 5;
                context.arc(Width/2,Height/2,radius,(Math.PI/180)*(startAngle*360-90),(Math.PI/180)*(endAngle*360+270),false);
                context.stroke();
                context.closePath();
            }

            function drawOuterArc(_angle,_color){
                var angle = _angle;
                var color = _color;
                context.beginPath();
                context.strokeStyle = color;
                context.lineWidth = 10;
                context.arc(Width/2,Height/2,radius,(Math.PI / 180) * (startAngle * 360 - 90), (Math.PI / 180) * (angle * 360 - 90), false);
                context.stroke();
                context.closePath();
            }

            function numOfPercentage(_angle,_color){
                var angle = Math.floor(_angle*100)+1;
                var color=_color;
                context.fillStyle = color;
                var metrics = context.measureText(angle);
                var textWidth = metrics.width;
                var xPos = Width/2-textWidth/2,
                    yPos = Height/2+textWidth/2;
            }

            function draw(){
                var loop = setInterval(function(){
                    context.clearRect(0,0,Width,Height);
                    drawTrackArc();
                    drawOuterArc(angle,opts.color);
                    numOfPercentage(angle,opts.color);
                    angle+=0.01;
                    if(angle>endAngle){
                        clearInterval(loop);
                    }

                },1000/60);
            }
            draw();
            return this;
        };
    })(jQuery);

}(jQuery));
