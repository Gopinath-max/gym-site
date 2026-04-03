// js/membership.js

export function initBillingToggle() {
  const toggle = document.querySelector('.pricing__toggle');
  if (!toggle) return;
  
  const prices = document.querySelectorAll('.pricing-card__price .val');
  let isAnnual = false;
  
  toggle.addEventListener('click', () => {
    isAnnual = !isAnnual;
    if (isAnnual) {
      toggle.classList.add('annual');
    } else {
      toggle.classList.remove('annual');
    }
    
    // Update prices
    prices.forEach(el => {
      const base = parseInt(el.getAttribute('data-monthly'));
      if (isAnnual) {
        // 20% discount annual equivalent monthly
        const annualMonthly = Math.floor(base * 0.8);
        animatePrice(el, base, annualMonthly);
      } else {
        const current = parseInt(el.innerText);
        animatePrice(el, current, base);
      }
    });
  });
}

function animatePrice(el, start, end) {
  let curr = start;
  const inc = end > start ? 1 : -1;
  const timer = setInterval(() => {
    curr += inc;
    el.innerText = curr;
    if (curr === end) clearInterval(timer);
  }, 20);
}

export function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      
      // Close all
      items.forEach(i => i.classList.remove('open'));
      
      // Open clicked if wasn't open
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}
