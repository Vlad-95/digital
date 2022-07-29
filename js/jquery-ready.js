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
    }

    //======Главный слайдер КОНЕЦ

    //политика в попапе
    $('.js-privacy').click(function() {
        $('body').addClass('no-scroll')
        $('.popup#privacy').fadeIn();
    })

    $('.popup').on('click', '.close', function() {
        $(this).closest('.popup').fadeOut();
        $('body').removeClass('no-scroll');
    })

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

        $('.reviews .slider__item').each(function() {
            let title = $(this).find('.title').text();
            let descr = $(this).find('.wysiwyg.descr').html(); 
            let full = $(this).find('.wysiwyg.full').html();
            let truncateText = truncate(descr, 256);
            console.log(full)

            //подменяем текст
            $(this).find('.wysiwyg.descr').html(truncateText)
            

            //клик по кнопке Читать дальше
            $(this).find('.js-review-toggle').click(function() {
                const reviewPopup = $('.popup#review');
                const reviewPopupTitle = reviewPopup.find('.title');
                const reviewPopupText = reviewPopup.find('.wysiwyg');

                reviewPopupTitle.text(title);
                reviewPopupText.html(full);

                $('body').addClass('no-scroll')
                $('.popup#review').fadeIn();
            })
        })        

        if ($(window).width() <= 768) {
            $('.reviews .slider__item .content .wysiwyg').matchHeight();
        }
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
});
