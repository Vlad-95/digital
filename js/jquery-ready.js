$(document).ready(function () {
  //===========Мобильное меню
  let body = $('body');
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
    console.log(1);
  }

  burger.click(showMenu);

  //============Мобильное меню (КОНЕЦ)

  //=====Якорные ссылки====

  function anchorLinks() {
    let currentLink = $(this).attr('href');
    let currentDiv = $(currentLink);

    if (currentDiv.length != 0) {
      //скролл до элемента
      $('html, body').animate({ scrollTop: currentDiv.offset().top }, 500);

      if (windowWidth <= 992) {
        let mobileMenu = $('.mobile-menu');

        burger.removeClass('active');
        body.removeClass('no-scroll');
        mobileMenu.removeClass('active');
      }
    } else {
      localStorage.setItem('anchor', currentLink);
      window.location.href = '/';
    }
  }

  $('a[href^="#"]').click(anchorLinks);

  //Якорные ссылки при переходе с другой страницы
  if (localStorage.getItem('anchor')) {
    let localStorageAnchor = localStorage.getItem('anchor');

    //скролл до элемента
    setTimeout(function () {
      $('html, body').animate(
        { scrollTop: $(localStorageAnchor).offset().top },
        500
      );
    }, 300);

    localStorage.removeItem('anchor');
  }

  //=======Все сайты======
  if ($('.sites').length) {
    $('.sites__toggle').click(function () {
      $(this).toggleClass('active').next().slideToggle();

      if ($(this).parent().parent().hasClass('mobile-menu')) {
      } else {
      }
    });
  }
  //=======Все сайты КОНЕЦ=====

  // Анимация чисел
  if ($('.numbers').length) {
    let animFlag = true;
    function animateNum() {
      const time = 5000;
      const step = 1;
      $('.numbers__item').each(function () {
        let startVal = 0;
        const targetVal = $(this).find('.value').attr('data-value');
        let t = Math.round(time / (targetVal / step));

        let interval = setInterval(() => {
          startVal = startVal + step;
          if (startVal == targetVal) {
            clearInterval(interval);
          }

          $(this).find('.value span').text(startVal);
        }, t);
      });
    }

    $(window)
      .scroll(function () {
        let blockOffset = $('.numbers').offset().top - $(window).scrollTop();
        const windowHeight = $(window).height();

        if (blockOffset < windowHeight && animFlag) {
          animateNum();
          animFlag = false;
        }
      })
      .scroll();
  }

  //политика в попапе
  $('.js-privacy').click(function () {
    $('body').addClass('no-scroll');
    $('.popup#privacy').fadeIn();
  });

  $('.popup').on('click', '.close', function () {
    $(this).closest('.popup').fadeOut();
    $('body').removeClass('no-scroll');
  });

  //=====текст отзыва=======
  if ($('.reviews').length) {
    function truncate(str, maxlength) {
      return str.length > maxlength ? str.slice(0, maxlength - 1) + '…' : str;
    }

    $('.reviews .slider').slick({
      slidesToShow: 1,
      dots: true,
      arrows: false,
    });

    $('.reviews .slider__item').each(function () {
      let title = $(this).find('.title').text();
      let descr = $(this).find('.wysiwyg.descr').html();
      let full = $(this).find('.wysiwyg.full').html();
      let truncateText = truncate(descr, 256);
      console.log(full);

      //подменяем текст
      $(this).find('.wysiwyg.descr').html(truncateText);

      //клик по кнопке Читать дальше
      $(this)
        .find('.js-review-toggle')
        .click(function () {
          const reviewPopup = $('.popup#review');
          const reviewPopupTitle = reviewPopup.find('.title');
          const reviewPopupText = reviewPopup.find('.wysiwyg');

          reviewPopupTitle.text(title);
          reviewPopupText.html(full);

          $('body').addClass('no-scroll');
          $('.popup#review').fadeIn();
        });
    });

    if ($(window).width() <= 768) {
      $('.reviews .slider__item .content .wysiwyg').matchHeight();
    }
  }
  //======текст отзыва КОНЕЦ

  //=======всплывашка городов в блок Свяжитесь с нами======
  if ($('.city').length) {
    $('.city').on('click', '.city__toggle', function () {
      $(this).toggleClass('active').parent().next().slideToggle();
    });

    $('.city__item').click(function () {
      let targetCity = $(this);
      let targetCityAddress = targetCity.attr('data-address');
      let targetCityPhone = targetCity.attr('data-phone');
      let targetCityTime = targetCity.attr('data-time');

      let currentCity = $('.city__current');
      let currentCityAddress = $('.sidebar .content .address');
      let currentCityPhone = $('.sidebar .content .phone');
      let currentCityTime = $('.sidebar .content .time');

      $(this)
        .addClass('current')
        .siblings()
        .removeClass('current')
        .parent()
        .slideUp();

      currentCity.html(targetCity.text() + '<div class="city__toggle"></div>');
      currentCityAddress.text(targetCityAddress);
      currentCityPhone.text(targetCityPhone);
      currentCityPhone.attr('href', 'tel:' + targetCityPhone + '');
      currentCityTime.text(targetCityTime);
    });
  }
  //=======всплывашка городов в блок Свяжитесь с нами КОНЕЦ======

  // ========Слайдер фоток на главной
  if ($('.photos').length) {
    $('.photos .slider').slick({
      slidesToShow: 5,
      autoplay: true,
      autoplaySpeed: 5000,
      arrows: false,
      dots: false,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 2,
          },
        },
      ],
    });
  }
  // ========Слайдер фоток на главной КОНЕЦ

  // слайдре на странице продукта
  if ($('.product').length) {
    $('.product .slider').slick({
      dots: false,
      prevArrow:
        '<button class="slick-arrow prev"><img src="/img/icons/arrow-big.png"/></button>',
      nextArrow:
        '<button class="slick-arrow next"><img src="/img/icons/arrow-big.png"/></button>',
    });
  }

  // разделение имени и фамилии
  if ($('.js-fullname').length) {
    $('.js-fullname').each(function () {
      let name = $(this).text().trim().split(' ');

      $(this).html(`${name[0]}<br>${name[1]} ${name[2]}`);
    });
  }
});
