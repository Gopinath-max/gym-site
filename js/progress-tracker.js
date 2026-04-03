// js/progress-tracker.js

export function initCounters() {
  const counters = document.querySelectorAll('.stat-counter');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target'));
        const format = el.getAttribute('data-format') || '';
        
        let start = null;
        const duration = 2000;
        
        const step = (timestamp) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          // Ease out cubic
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          
          let current = easeProgress * target;
          
          // Formatting
          if (format.includes('%')) {
            el.innerText = Math.floor(current) + '%';
          } else if (format.includes('+')) {
            el.innerText = Math.floor(current).toLocaleString() + '+';
          } else {
            el.innerText = Math.floor(current).toLocaleString();
          }
          
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(c => observer.observe(c));
}

export function initHeatMap() {
  const map = document.getElementById('workout-heatmap');
  if (!map) return;
  
  // 56 cells (8 x 7)
  for (let i = 0; i < 56; i++) {
    const cell = document.createElement('div');
    cell.className = 'heat-cell';
    // Weighted random intensity, more 0s
    let intensity = 0;
    const r = Math.random();
    if(r > 0.6) intensity = 1;
    if(r > 0.75) intensity = 2;
    if(r > 0.85) intensity = 3;
    if(r > 0.95) intensity = 4;
    
    cell.setAttribute('data-intensity', intensity);
    cell.style.animation = `heat-cell-pop 0.4s ease forwards ${i * 10}ms`;
    map.appendChild(cell);
  }
}
