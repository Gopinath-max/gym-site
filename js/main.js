// js/main.js
import { initApexWidget } from './ai-agent.js';
import { initWorkoutPlanner } from './workout-planner.js';
import { initNutritionCalculator } from './nutrition.js';
import { initCounters, initHeatMap } from './progress-tracker.js';
import { initBillingToggle, initFAQ } from './membership.js';
import { initScrollAnimations } from './animations.js';

function init() {
  // 1. PAGE LOADER
  const loader = document.querySelector('.page-intro');
  if (loader) {
    setTimeout(() => {
      document.body.classList.add('content-ready');
      setTimeout(() => loader.remove(), 500);
    }, 1200);
  } else {
    document.body.classList.add('content-ready');
  }

  // 2. NAVIGATION & SCROLL PROGRESS
  const nav = document.querySelector('.nav');
  const scrollProgress = document.querySelector('.scroll-progress');
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.nav__links-mobile');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  function handleScroll() {
    // Nav bg
    if (window.scrollY > 80) {
      if(nav) nav.classList.add('nav--scrolled');
    } else {
      if(nav) nav.classList.remove('nav--scrolled');
    }
    
    // Scroll progress
    if (scrollProgress) {
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = window.scrollY / height;
      scrollProgress.style.transform = `scaleX(${scrolled})`;
    }
  }
  
  window.addEventListener('scroll', handleScroll, { passive: true });

  // 12. CUSTOM CURSOR
  if (window.matchMedia('(pointer: fine)').matches) {
    const cursor = document.createElement('div');
    cursor.style.position = 'fixed';
    cursor.style.top = '0'; cursor.style.left = '0';
    cursor.style.width = '8px'; cursor.style.height = '8px';
    cursor.style.background = 'var(--color-red)';
    cursor.style.borderRadius = '50%';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '99999';
    cursor.style.mixBlendMode = 'difference';
    cursor.style.transition = 'transform 0.1s ease-out';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
      cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    });
  }

  // INIT MODULES
  initScrollAnimations();
  initCounters();
  initHeatMap();
  initWorkoutPlanner();
  initNutritionCalculator();
  initBillingToggle();
  initFAQ();
  initApexWidget();

  // TIME-BASED HOURS
  const hoursEls = document.querySelectorAll('.contact__hours-table tr');
  if (hoursEls.length > 0) {
    const day = new Date().getDay(); // 0 is Sunday
    // Very simple mock mapping assuming row 1 is Mon, 2 is Tue etc...
    let mappedDay = day === 0 ? 6 : day - 1; 
    if (hoursEls[mappedDay]) {
      hoursEls[mappedDay].style.color = 'var(--color-green)';
      hoursEls[mappedDay].style.fontWeight = 'bold';
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
