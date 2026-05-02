const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

const faviconPath = '/assets/img/logo/FNAH_favicon_logo_simplificado_512.png';

function upsertHeadLink(selector, attributes) {
  let link = document.head.querySelector(selector);
  if (!link) {
    link = document.createElement('link');
    document.head.appendChild(link);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    link.setAttribute(key, value);
  });
}

function applyFavicons() {
  upsertHeadLink('link[rel="icon"]', {
    rel: 'icon',
    type: 'image/png',
    sizes: '512x512',
    href: faviconPath
  });

  upsertHeadLink('link[rel="apple-touch-icon"]', {
    rel: 'apple-touch-icon',
    href: faviconPath
  });

  upsertHeadLink('link[rel="manifest"]', {
    rel: 'manifest',
    href: '/site.webmanifest'
  });
}

applyFavicons();

const languageRoutes = {
  '/': { es: '/', en: '/en/' },
  '/index.html': { es: '/', en: '/en/' },
  '/socios.html': { es: '/socios.html', en: '/en/supporters.html' },
  '/proyectos.html': { es: '/proyectos.html', en: '/en/projects.html' },
  '/transparencia.html': { es: '/transparencia.html', en: '/en/transparency.html' },
  '/contacto.html': { es: '/contacto.html', en: '/en/contact.html' },
  '/memoria.html': { es: '/memoria.html', en: '/en/memory.html' },
  '/registros/reg-2026-001-restauracion-mural-val.html': {
    es: '/registros/reg-2026-001-restauracion-mural-val.html',
    en: '/en/records/reg-2026-001-mural-restoration-val.html'
  },
  '/en/': { es: '/', en: '/en/' },
  '/en/index.html': { es: '/', en: '/en/' },
  '/en/supporters.html': { es: '/socios.html', en: '/en/supporters.html' },
  '/en/projects.html': { es: '/proyectos.html', en: '/en/projects.html' },
  '/en/transparency.html': { es: '/transparencia.html', en: '/en/transparency.html' },
  '/en/contact.html': { es: '/contacto.html', en: '/en/contact.html' },
  '/en/memory.html': { es: '/memoria.html', en: '/en/memory.html' },
  '/en/records/reg-2026-001-mural-restoration-val.html': {
    es: '/registros/reg-2026-001-restauracion-mural-val.html',
    en: '/en/records/reg-2026-001-mural-restoration-val.html'
  }
};

function normalizePath(pathname) {
  if (!pathname || pathname === '/index.html') return '/';
  if (pathname === '/en/index.html') return '/en/';
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname;
  return pathname;
}

function addLanguageSwitch() {
  if (!mainNav) return;

  const currentPath = normalizePath(window.location.pathname);
  const routes = languageRoutes[currentPath] || { es: '/', en: '/en/' };
  const isEnglish = currentPath === '/en/' || currentPath.startsWith('/en/');

  mainNav.querySelectorAll('a').forEach((link) => {
    const label = link.textContent.trim().toUpperCase();
    if (label === 'ES' || label === 'EN') link.remove();
  });

  const switcher = document.createElement('span');
  switcher.className = 'lang-switch';
  switcher.setAttribute('aria-label', 'Selector de idioma / Language selector');

  const esLink = document.createElement('a');
  esLink.href = routes.es;
  esLink.textContent = 'ES';
  esLink.lang = 'es-CL';
  if (!isEnglish) esLink.setAttribute('aria-current', 'page');

  const separator = document.createElement('span');
  separator.textContent = '/';
  separator.setAttribute('aria-hidden', 'true');

  const enLink = document.createElement('a');
  enLink.href = routes.en;
  enLink.textContent = 'EN';
  enLink.lang = 'en';
  if (isEnglish) enLink.setAttribute('aria-current', 'page');

  switcher.append(esLink, separator, enLink);
  mainNav.appendChild(switcher);
}

addLanguageSwitch();

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
