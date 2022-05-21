'use strict';

// Cookie

const header = document.querySelector('.header');

const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent =
  'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

header.append(message);

// Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    message.parentElement.removeChild(message);
  });

message.style.backgroundColor = '#37383d';
message.style.width = '100%';
message.style.position = 'fixed';
message.style.bottom = '0';
message.style.zIndex = '100';

console.log(message.style.color);
console.log(message.style.backgroundColor);

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';
console.log(message.style.height);

// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnOpenModal = document.querySelectorAll('.btn--show-modal');
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnOpenModal.length; i++)
  btnOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Smooth Scroll -1
// ---------------------------------------------------
let scrollBtn = document.querySelector('.btn--scroll-to');
let section1 = document.querySelector('#section--1');

scrollBtn.addEventListener('click', function (e) {
  let s1Coords = section1.getBoundingClientRect();
  console.log(s1Coords);
  console.log(e.target.getBoundingClientRect());

  console.log(`Current Scroll (X/Y)`, window.pageXOffset, window.pageYOffset);

  console.log(
    `Height/Width Viewport`,
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // window.scrollTo(s1Coords.left + window.pageXOffset, s1Coords.top + window.pageYOffset)

  // window.scrollTo({
  //   left: s1Coords.left + window.pageXOffset,
  //   top: s1Coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // })

  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

//smooth Scrolling navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth'
//     })
//   });
// });

//For better performance we built Event delegation
//Add event listener to common parent element and determine to what element organized the event
// ---------------------------------------------------
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //Matching Strategy
  if (e.target.classList.contains('nav__link')) {
    let id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

//Tab components
// ---------------------------------------------------

const tabContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab'); //return own
  console.log(clicked);

  //Guard
  if (!clicked) return;

  //Active tabs
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  //Active Content
  tabContent.forEach(t => t.classList.remove('operations__content--active'));
  console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Menu fade Animations
// ---------------------------------------------------

const handleFunction = function (e) {
  //, opacity
  // console.log(this, e.currentTarget);
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const linkSiblings = e.target
      .closest('.nav')
      .querySelectorAll('.nav__link');
    const logo = e.target.closest('nav').querySelector('img');

    linkSiblings.forEach(l => {
      if (l !== link) {
        l.style.opacity = this; //opacity;
      }
    });
    logo.style.opacity = this; //opacity
  }
};
// document.querySelector('.nav').addEventListener('mouseover',function(e){
//   handleFunction(e, 0.5)
// });
// document.querySelector('.nav').addEventListener('mouseout',function(e){
//   handleFunction(e, 1)
// });

document
  .querySelector('.nav')
  .addEventListener('mouseover', handleFunction.bind(0.5));
document
  .querySelector('.nav')
  .addEventListener('mouseout', handleFunction.bind(1));

//Sticky Navigation
// window.addEventListener('scroll', function () {
//   console.log(e);
//   console.log(window.scrollY);
//   if (window.scrollY > 200) {
//     document.querySelector('nav').classList.add('sticky');
//   } else {
//     document.querySelector('nav').classList.remove('sticky');
//   }
// });

//intersection observer API
// ---------------------------------------------------
// const obsCallBack = function (entries, observe) {
// entries.forEach(entry => {
//   console.log(entry);
// })
// };
// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallBack);
// observer.observe(section1);

//Sticky Nav
// ---------------------------------------------------
const nav = document.querySelector('.nav');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//sections reveal on scroll
// ---------------------------------------------------

const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);
  // if(!entry.isIntersecting) return;
  // entry.target.classList.remove('section--hidden')
  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
  } else {
    entry.target.classList.add('section--hidden');
  }
  //if we need animation 1 time
  //observer.unobserve(entry.target)
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//Lazy loading images
// ---------------------------------------------------
const imgTarget = document.querySelectorAll('img[data-src]');
//console.log(imgTarget);
const loadImg = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});
imgTarget.forEach(img => {
  imgObserver.observe(img);
});

//slider
// --------------------- 1st part ------------------------------
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let currentSlide = 0;

const goToSlide = function (value) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - value)}%)`;
    //slide.style.overflow = 'visible'
  });
};

goToSlide(0);

//without function
// slides.forEach((slide, i) => {
//   slide.style.transform = `translateX(${100 * i}%)`;
//   //slide.style.overflow = 'visible'
// });

const nextSlide = function () {
  currentSlide === slides.length - 1 ? (currentSlide = 0) : currentSlide++;
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

const prevSlide = function () {
  currentSlide === 0 ? (currentSlide = slides.length - 1) : currentSlide--;
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

btnRight.addEventListener(
  'click',
  nextSlide //{function ()
  //currentSlide >= slides.length-1 ? (currentSlide = 0) : currentSlide++;
  // slides.forEach((slide, i) => {
  //   slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
  //   //slide.style.overflow = 'visible'
  // });
  //goToSlide(currentSlide);
  //}
);

btnLeft.addEventListener('click', prevSlide);

setInterval(nextSlide, 3000);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  if (e.key === 'ArrowRight') nextSlide();
});

// --------------------- 2nd part pagination ------------------------------

const dotContainer = document.querySelector('.dots');

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide = "${i}"></button>`
    );
  });
};
createDots();

const activateDot = function (slide) {
  document.querySelectorAll('.dots__dot').forEach(dot => {
    dot.classList.remove('dots__dot--active');
  });

  document
    .querySelector(`.dots__dot[data-slide = "${slide}"]`)
    .classList.add('dots__dot--active');
};

activateDot(currentSlide);

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDot(slide);
  }
});
