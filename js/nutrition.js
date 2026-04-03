// js/nutrition.js
import { generateNutritionPlan } from './ai-agent.js';

export function initNutritionCalculator() {
  const calcBtn = document.getElementById('calc-nutrition-btn');
  if (!calcBtn) return;

  calcBtn.addEventListener('click', async () => {
    // Get form data
    const age = document.getElementById('nut-age').value || 30;
    const weight = document.getElementById('nut-weight').value || 80;
    
    const resultSec = document.getElementById('nutrition-results');
    resultSec.innerHTML = `<div class="skeleton"></div><p style="text-align:center; margin-top:20px; font-family:var(--font-mono); color:var(--color-green);">APEX is calculating metabolic demands...</p>`;
    
    const params = { age, weight, goal: 'Build Muscle', activity: 'Active', dietary: 'Standard' };
    const plan = await generateNutritionPlan(params);
    
    renderNutritionResults(plan, resultSec);
  });
}

function renderNutritionResults(plan, container) {
  let html = `
    <div class="nutrition-result-cards">
      <div class="nutrition-card">
        <div class="result-number cal counter" data-target="${plan.calories}">0</div>
        <div class="font-mono text-muted text-label">Daily Calories</div>
      </div>
      <div class="nutrition-card">
        <div class="result-number macro counter" data-target="${plan.protein}">0</div>
        <div class="font-mono text-muted text-label">Protein (g)</div>
      </div>
      <div class="nutrition-card">
        <div class="result-number macro counter" data-target="${plan.carbs}">0</div>
        <div class="font-mono text-muted text-label">Carbs (g)</div>
      </div>
      <div class="nutrition-card">
        <div class="result-number macro counter" data-target="${plan.fats}">0</div>
        <div class="font-mono text-muted text-label">Fats (g)</div>
      </div>
    </div>
    
    <h4 class="font-heading text-title color-chrome" style="margin-top: 32px; margin-bottom: 16px;">Target Protocol</h4>
    <div style="display:flex; flex-direction:column; gap:16px;">
      ${plan.meal_plan.map(m => `
        <div style="background:var(--color-surface-2); padding:16px; border-radius:var(--radius-base); display:flex; justify-content:space-between; align-items:center;">
          <div>
            <span style="background:var(--color-red); color:#fff; padding:2px 8px; border-radius:4px; font-size:10px; margin-bottom:8px; display:inline-block;">${m.time}</span>
            <div class="font-heading text-subtitle">${m.meal}</div>
            <div class="font-mono text-muted" style="font-size:12px;">${m.foods.join(', ')}</div>
          </div>
          <div class="font-mono color-green" style="font-size:12px; border:1px solid var(--color-green); padding:4px 8px; border-radius:20px;">
            ${m.macros}
          </div>
        </div>
      `).join('')}
    </div>
  `;
  container.innerHTML = html;

  // Trigger counters
  container.querySelectorAll('.counter').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    animateCounter(el, target, 1500);
  });
}

function animateCounter(el, target, duration) {
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    el.innerText = Math.floor(progress * target);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}
