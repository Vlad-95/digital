$(document).ready(function() {
    //===========Мобильное меню
    let body = $('body')
    let windowWidth = window.innerWidth;
    let header = $('.header');
    let headerWrap = $('.header__wrap').first();
    let headerTop = $('.header__top');
    let headerBottom = $('.header__bottom');
    let phone = headerTop.find('.phone');
    let btn = headerTop.find('.btn');
    let sites = headerTop.find('.sites');
    let socials = headerTop.find('.socials');
    let menu = headerBottom.find('.nav');
    let burger = $('.burger');
    let windowHeight = $(window).height();

    if (windowWidth <= 992) {
        //создаем контейнер для менюшки
        let mobileMenu = $(document.createElement('div'));       
        mobileMenu.addClass('mobile-menu');       

        headerWrap.append(mobileMenu);

        //клонируем элементы хедера
        let mobilePhone = phone.clone();
        let mobileBtn = btn.clone();
        let mobileSites = sites.clone();
        let mobileSocials = socials.clone();
        let mobileNav = menu.clone();
        
        mobileMenu.append(mobileNav);
        mobileMenu.append(mobilePhone);
        mobileMenu.append(mobileBtn);
        mobileMenu.append(mobileSites);
        mobileMenu.append(mobileSocials);
    }

    function showMenu() {
        let mobileMenu = $('.mobile-menu');

        burger.toggleClass('active');
        body.toggleClass('no-scroll');
        mobileMenu.toggleClass('active');
        console.log(1)
    }

    burger.click(showMenu);

    //============Мобильное меню (КОНЕЦ)

    //=====Якорные ссылки====

    function anchorLinks () {
        let currentLink = $(this).attr('href');
        let currentDiv = $(currentLink);

        if (currentDiv.length != 0) {
            //скролл до элемента
            $('html, body').animate({scrollTop: currentDiv.offset().top}, 500);

            if (windowWidth <= 992) {
                let mobileMenu = $('.mobile-menu');

                burger.removeClass('active');
                body.removeClass('no-scroll');
                mobileMenu.removeClass('active');
            }
        }
        
    }

    $('a[href^="#"]').click(anchorLinks);

    //=======Все сайты======
    if ($('.sites').length) {
        $('.sites__toggle').click(function() {
            $(this).toggleClass('active').next().slideToggle();

            if ($(this).parent().parent().hasClass('mobile-menu')) {
                
            } else {
                
            }
        })
    }
    //=======Все сайты КОНЕЦ=====

    //======Главный слайдер==========
    if ($('.intro .slider').length) {
        $('.intro .slider').slick({
            arrows: true,
            dots: true,
            responsive: [
                {
                    breakpoint: 769, 
                    settings: {
                        arrows: false
                    }
                }
            ]
        });

        $('.intro .slider .slider__item').each(function() {
            let width = $(this).find('.numb svg .stroked')[0].getBoundingClientRect().width;
            $(this).find('.numb svg').width(width);
            $(this).find('.numb svg').attr('viewBox', `0 0 ${width + 10} 72`);
        })
    }

    //======Главный слайдер КОНЕЦ

    //=======одинаковая высота текстовых блоков========
    if ($('.license').length) {
        $('.license__item .name').matchHeight();
    }

    if ($('.project').length) {
        $('.project__item .name').matchHeight();
    }    
    //=======одинаковая высота текстовых блоков КОНЕЦ========

    //=======попап в проектах=========
    if ($('.project').length) {
        $('.project__item').click(function () {
            let currentProject = $(this);
            let currentProjectColor = $(this).find('.content').css('background-color');
            let currentImgHref = currentProject.find('.image img').attr('src');
            let currentAnotherImgHref = currentProject.attr('data-img');
            console.log(Boolean(currentAnotherImgHref))
            let currentName = currentProject.find('.content .name');
            let currentInfo = currentProject.find('.content .info');
            let currentWysiwyg = currentProject.find('.hidden .wysiwyg');

            let popup = $('.project-popup');
            let popupContent = popup.find('.project-popup__wrap .content');
            popup.find('.image img').attr('src', '');
            popupContent.html('');
            popupContent.css('background-color', currentProjectColor)

            if (Boolean(currentAnotherImgHref) == false) {
                popup.find('.image img').attr('src', currentImgHref);
            } else {
                popup.find('.image img').attr('src', currentAnotherImgHref);
            }
            

            let popupContentName = currentName.clone();
            let popupContentInfo = currentInfo.clone();
            let popupContentWysiwyg = currentWysiwyg.clone();

            popupContent.append(popupContentName);
            popupContent.append(popupContentInfo);
            popupContent.append(popupContentWysiwyg);

            popup.fadeIn();

            $('body').addClass('no-scroll');
        })

        $('.project-popup').on('click', '.close', function() {
            $(this).closest('.project-popup').fadeOut();
            $('body').removeClass('no-scroll');
        })
    }
    //=======попап в проектах КОНЕЦ=========


    //=======попап Консультации=========
    if ($('.consultant').length) {
        $('.consultant .btn').click(function () {
            $('.consultant-popup').fadeIn();

            $('body').addClass('no-scroll');
        })

        $('.consultant-popup').on('click', '.close', function() {
            $(this).closest('.consultant-popup').fadeOut();
            $('body').removeClass('no-scroll');
        })
    }
    //=======попап Консультации КОНЕЦ=========

    //=====текст отзыва=======
    if ($('.reviews').length) {
        function truncate(str, maxlength) {
            return (str.length > maxlength) ? str.slice(0, maxlength - 1) + '…' : str;
        }

        $('.reviews .slider').slick({
            slidesToShow: 1,
            dots: true,
            arrows: false
        })

        $('.reviews .slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
            let text = $(`.slider__item[data-slick-index="${currentSlide}"]`).find('.wysiwyg').html();
            let truncateText = truncate(text, 256);

            //подменяем текст
            if ($(`.slider__item[data-slick-index="${currentSlide}"]`).find('.js-review-toggle').hasClass('open')) {
                $(`.slider__item[data-slick-index="${currentSlide}"]`).find('.js-review-toggle').removeClass('open');

                $(`.slider__item[data-slick-index="${currentSlide}"]`).find('.content .wysiwyg').fadeOut(100);
    
                setTimeout(() => $(`.slider__item[data-slick-index="${currentSlide}"]`).find('.content .wysiwyg').html(truncateText), 100);
                
                $(`.slider__item[data-slick-index="${currentSlide}"]`).find('.content .wysiwyg').fadeIn();
            }            
        });

        $('.reviews .slider__item').each(function() {
            let text = $(this).find('.wysiwyg').html(); 
            let truncateText = truncate(text, 256);

            //подменяем текст
            $(this).find('.wysiwyg').html(truncateText)
            

            //клик по кнопке Читать дальше
            $(this).find('.js-review-toggle').click(function() {
                $(this).toggleClass("open");

                if ($(this).hasClass('open')) {
                    $(this).closest('.content').find('.wysiwyg').fadeOut(100);

                    setTimeout(() => $(this).closest('.content').find('.wysiwyg').html(text), 100);
                    
                    $(this).closest('.content').find('.wysiwyg').fadeIn();

                    //$(this).text('Скрыть')
                } else {
                    $(this).closest('.content').find('.wysiwyg').fadeOut(100);

                    setTimeout(() => $(this).closest('.content').find('.wysiwyg').html(truncateText), 100);
                    
                    $(this).closest('.content').find('.wysiwyg').fadeIn();

                    //$(this).text('Читать дальше')
                }
            })
        })

        
    }
    //======текст отзыва КОНЕЦ

    //=======всплывашка городов в блок Свяжитесь с нами======
    if ($('.city').length) {
        $('.city').on('click', '.city__toggle', function() {
            $(this).toggleClass('active').parent().next().slideToggle();
        });

        $('.city__item').click(function() {
            let targetCity = $(this);
            let targetCityAddress = targetCity.attr('data-address');            
            let targetCityPhone = targetCity.attr('data-phone');
            let targetCityTime = targetCity.attr('data-time');

            let currentCity = $('.city__current');
            let currentCityAddress = $('.sidebar .content .address');
            let currentCityPhone = $('.sidebar .content .phone');
            let currentCityTime = $('.sidebar .content .time');

            $(this).addClass('current').siblings().removeClass('current').parent().slideUp();

            currentCity.html(targetCity.text() + '<div class="city__toggle"></div>');
            currentCityAddress.text(targetCityAddress);
            currentCityPhone.text(targetCityPhone);
            currentCityPhone.attr('href', 'tel:' + targetCityPhone +'')
            currentCityTime.text(targetCityTime);
        })
    }
    //=======всплывашка городов в блок Свяжитесь с нами КОНЕЦ======

    //===========карта=================
    if ($('.map').length) {

        //наведение по элементам списка
        $('.list .list__item').each(function() {
            let currentItem = $(this);

            currentItem.hover(
                function() {
                let dataCity = $(this).attr("data-city");                
                $('.map .image circle[data-city='+ dataCity +']').addClass('hover');
                }, function () {
                    let dataCity = $(this).attr("data-city");
                    $('.map .image circle[data-city='+ dataCity +']').removeClass('hover');
                }
            );
        })

        //наведение по точкам карты
        $('.map .image circle[data-city]').each(function () {
            $(this).hover(
                function() {
                    let dataCity = $(this).attr("data-city");
                    $('.map .image circle[data-city='+ dataCity +']').addClass('hover');
                    $('.map .list .list__item[data-city='+ dataCity +']').addClass('hover');

                }, function() {
                    let dataCity = $(this).attr("data-city");
                    $('.map .image circle[data-city='+ dataCity +']').removeClass('hover');
                    $('.map .list .list__item[data-city='+ dataCity +']').removeClass('hover');
                }
            )
        })
    }
    //===========карта КОНЕЦ============
});
