const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const slides = Array.from(document.querySelectorAll('.slide'));
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentSlide = 0;
let slideTimer;

function showSlide(index) {
  if (!slides.length) return;
  slides[currentSlide].classList.remove('active');
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
}

function startSlider() {
  if (slides.length <= 1) return;
  slideTimer = window.setInterval(() => showSlide(currentSlide + 1), 6200);
}

function restartSlider() {
  window.clearInterval(slideTimer);
  startSlider();
}

if (prevButton) {
  prevButton.addEventListener('click', () => {
    showSlide(currentSlide - 1);
    restartSlider();
  });
}

if (nextButton) {
  nextButton.addEventListener('click', () => {
    showSlide(currentSlide + 1);
    restartSlider();
  });
}

startSlider();
