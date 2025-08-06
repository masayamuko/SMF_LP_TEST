//import
//@codekit-prepend "_modernizr-custom.js";

//iOS hover
document.addEventListener('touchstart', function () {}, true);

/****************

jQuery Document.

****************/
(function ($) {

    const kv = $('#analy-fv');
    const header = $('#analy-header');
    const body = $('body');
    const form01 = $('#analy-cta03_btn01');

    //kvHightSet
    let kvHight = 0;

    function kvHightSet() {
        if (kv.length) {
            kvHight = kv.outerHeight();
        }
    }
    kvHightSet();

    //headerHightSet
    let headerHight = 0;

    function headerHightSet() {
        if (header.length) {
            headerHight = header.outerHeight();
        }
    }
    headerHightSet();

    //scroll
    $.fn.scroll_btn = function () {
        return $(this).on('click', function () {
            let speed = 800,
                href = $(this).attr("href"),
                target = $(href === "#" || href === "" ? 'html' : href),
                position = target.offset().top;

            if (href !== "#" || href !== "") {
                position = target.length ? target.offset().top - headerHight : '';
            }
            $('body,html').animate({
                scrollTop: position
            }, speed, 'swing');
            return false;
        });
    };
    $('.scroll_btn,.scroll_btns a').scroll_btn();

    //scrollstop
    let scrollStopEvent = new $.Event("scrollstop");
    let delay = 400;
    let timer;

    function scrollStopEventTrigger() {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            $(window).trigger(scrollStopEvent)
        }, delay);
    }
    $(window).on("scroll resize", scrollStopEventTrigger);
    body.on("touchmove", scrollStopEventTrigger);

    //scroll
    let body_scroll = 'body_scroll';
    let body_scroll_on = 'body_scroll_on';
    let body_sticky = 'body_sticky';

    $(window).on('scrollstop load', function () {

        if (body.hasClass(body_scroll)) {
            body.removeClass(body_scroll);
        }

        kvHightSet();
        headerHightSet();

        if (window.matchMedia('(min-width: 769px)').matches) {
            body.removeClass(body_overflow);
        } else {
            if (header_nav.length && header_nav.hasClass(show)) {
                body.addClass(body_overflow);
            } else {
                body.removeClass(body_overflow);
            }
        }

    }).on('scroll resize touchmove', function () {

        if ($(window).scrollTop() >= (kvHight + headerHight) * .5) {
            body.addClass(body_sticky);
        } else {
            body.removeClass(body_sticky);
        }

        if (form01.length) {
            let form01Position = $(window).scrollTop() - form01.offset().top + $(window).height();
            let fixed_btn_remove = 'fixed_btn_remove';
            if (form01Position >= 0) {
                body.addClass(fixed_btn_remove);
            } else {
                body.removeClass(fixed_btn_remove);
            }
        }

        body.addClass(body_scroll).addClass(body_scroll_on);

    });

    //readmore
    let readmore = $('.readmore');
    readmore.wrapInner('<div class="readmore_content clamped">').append('<div class="analy-sec03_voice_text_btn readmore_btn ff_maru">もっと見る</div>');
    let readmore_btn = $('.readmore_btn');
    let is_open = 'is_open';

    readmore.each(function () {
        if ($(this).hasClass('readmore_pc_hide')) {
            $(this).find('.readmore_btn').addClass('pc_hide');
        }
    });

    readmore_btn.on('click', function () {
        let readmore_content = $(this).prev('.readmore_content');
        let readmore_content_h = readmore_content.get(0).scrollHeight;

        readmore_content.addClass(is_open).removeClass('clamped').css('max-height', readmore_content_h);

        setTimeout(function () {
            readmore_content.css('max-height', 'none');
        }, 800);

        $(this).addClass(is_open).parent(readmore).addClass(is_open);
    });

    //toggle
    const toggle_btn = $('.toggle_btn');
    const toggle_class = 'toggle_js';
    const toggle_show = 'show';
    toggle_btn.each(function () {
        let toggle_panel = $(this).next('.toggle_panel');
        toggle_panel.hide().addClass(toggle_class);
        $(this).on('click', function () {
            $(this).toggleClass(toggle_show);
            toggle_panel.slideToggle(320).toggleClass(toggle_show);
        });
    }).addClass(toggle_class).append('<span class="toggle_icon">');

    //nav
    const header_nav = $('#analy-header_nav');
    const hamburger = $('#analy-header_hamburger');
    const show = 'show';
    const body_overflow = 'body_overflow';

    if (header.length && hamburger.length && header_nav.length) {
        hamburger.on('click', function () {
            $(this).toggleClass(show).find('span').toggleClass(show);
            header_nav.toggleClass(show);
            if (header_nav.hasClass(show)) {
                body.addClass(body_overflow);
            } else {
                body.removeClass(body_overflow);
            }
        });
        header.find('a').on('click', function () {
            body.removeClass(body_overflow);
            hamburger.removeClass(show).find('span').removeClass(show);
            header_nav.removeClass(show);
        }).scroll_btn();
    }

    //swiper
    const mySwiper1 = new Swiper('.analy-fv_swiper', {
        speed: 10000,
        loop: true,
        slidesPerView: 1.4,
        breakpoints: {
            769: {
                slidesPerView: 5,
            }
        },
        allowTouchMove: false,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
        },
        on: {
            resize: function () {
                mySwiper1.autoplay.start();
            },
            imagesReady: function () {
                this.el.classList.remove('loading');
            }
        }
    });


})(jQuery);
