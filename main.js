// js/main.js

import { initForgeWidget } from './forge-ai.js';
import { initEstimatorWizard } from './project-estimator.js';

document.addEventListener('DOMContentLoaded', () => {
  initSiteIntro();
  initNavigation();
  initScrollAnimations();
  initForgeWidget();
  initEstimatorWizard();
});

function initSiteIntro() {
  const intro = document.querySelector('.site-intro');
  if(intro) {
    setTimeout(() => {
      intro.style.clipPath = 'inset(0 0 100% 0)';
      setTimeout(() => intro.remove(), 1000);
    }, 1500);
  }
}

function initNavigation() {
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 80) nav.classList.add('nav--scrolled');
    else nav.classList.remove('nav--scrolled');
  });
}

function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}
