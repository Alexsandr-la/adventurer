window.onload = function () {
  (function sliderMain() {
    const slider = Peppermint(document.querySelector('.main-slider'), {
      speed: 1000
    });
    const prev = document.querySelector('.main-slider__prev');
    const next = document.querySelector('.main-slider__next');
    next.addEventListener('click', slider.next, false);
    prev.addEventListener('click', slider.prev, false);
  })();

  (function sliderReviews() {
    const slider = Peppermint(document.querySelector('.reviews-slider'), {
      dots: true,
      speed: 1000
    });
  })();

  const element = ".accordion__title";
  const settings = {
    showAll: true,
    switchOne: 2
  };
  let ac = new Accordion(element, settings);
  ac.toogleOne();
  new Scroll({
    links: document.querySelector('.nav')
  });

  (function menu() {
    const menu = document.querySelector(".header__wrap");
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    const popup = document.querySelector('.header-popup');
    document.body.addEventListener('click', function (event) {
      if (event.target.closest('.header-search__wrap')) {
        if (getComputedStyle(popup).display === 'none') {
          popup.style.display = 'block';
        } else {
          popup.style.display = 'none';
        }
      }

      if (getComputedStyle(popup).display === 'block' && !event.target.closest('.header-search')) {
        popup.style.display = 'none';
      }

      if (!burger.offsetWidth) return;

      if (event.target.classList.contains('burger') || event.target.classList.contains('burger__icon')) {
        toogle();
      }

      if (burger.firstElementChild.classList.contains('burger-click') && event.target.closest('.header-search') || event.target.classList.contains('nav__item')) {
        if (event.target.classList.contains('nav__item')) event.preventDefault();
        toogle();
      }
    });

    let toogle = () => {
      burger.firstElementChild.classList.toggle('burger-click');
      nav.classList.toggle('show');
    };
  })();
};

function Accordion(element, settings) {
  const titles = document.querySelectorAll(element);
  const showAll = settings.showAll;
  const switchOne = settings.switchOne;

  let event = function () {
    for (let title of titles) {
      readSetting(title);
      title.addEventListener('click', function (e) {
        toogle(t(e));
      });
    }
  };

  let readSetting = item => {
    showAll ? toogle(item) : false;
  };

  let t = e => e.target.closest(element);

  let toogle = event => {
    event.classList.toggle('hidden-title');
    event.querySelector('.accordion__icon').classList.toggle('accordion__icon--plus');
    event.querySelector('.accordion__icon').classList.toggle('accordion__icon--minus');
    event.nextElementSibling.classList.toggle('hidden');
  };

  event();

  let toogleOne = () => {
    toogle(titles[switchOne - 1]);
  };

  this.toogleOne = toogleOne;
} //////////////////////////////


function Scroll(option) {
  const elem = option.links;
  let linkTop;

  elem.onclick = event => {
    if (!event.target.hasAttribute('href')) return false;

    if (event.target.getAttribute('href').charAt(0) === '#') {
      event.preventDefault();
      const anchor = event.target.getAttribute('href').slice(1);
      positionY(anchor);
    }

    return false;
  };

  let positionY = anchor => {
    const link = document.getElementById(anchor);

    if (link) {
      linkTop = link.getBoundingClientRect().top;
      scrollThrough(linkTop);
    }

    return false;
  };

  let scrollThrough = linkTop => {
    let heightNav = document.documentElement.clientWidth < 767 ? 60 : 80;
    const startY = pageYOffset;
    const endY = pageYOffset + linkTop - heightNav | 0;
    const duration = 700;
    const start = performance.now();
    if (linkTop === 0) return;
    if (startY < endY) scrollDown(startY, start, duration, endY);
    if (startY > endY) scrollUp(startY, start, duration, endY);
  };

  function scrollUp(startY, start, duration, endY) {
    requestAnimationFrame(function animation(time) {
      let now = time - start;
      let progress = now / duration;
      let result = startY - (startY - endY) * delta(progress) | 0;
      window.scrollTo(0, result);
      if (progress < 1 && result > endY) requestAnimationFrame(animation);else {
        window.scrollTo(0, endY);
      }
    });
  }

  function scrollDown(startY, start, duration, endY) {
    requestAnimationFrame(function animation(time) {
      let now = time - start;
      let progress = now / duration;
      let result = (endY - startY) * delta(progress) + startY | 0;
      window.scrollTo(0, result);
      if (progress < 1 && result < endY) requestAnimationFrame(animation);else {
        window.scrollTo(0, endY);
      }
    });
  }

  let delta = t => 1 - Math.sin((1 - t) * Math.PI / 2);
} /////////////////////////////