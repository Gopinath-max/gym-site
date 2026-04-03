// js/workout-planner.js
import { generateWorkoutPlan } from './ai-agent.js';

export function initWorkoutPlanner() {
  const wgSteps = document.querySelectorAll('.wg__step-content');
  if (wgSteps.length === 0) return;

  const state = {
    goal: 'Build Muscle',
    level: 'Intermediate',
    equipment: 'Full Gym',
    duration: '60min',
    focus: 'Full Body'
  };

  // Bind clicks
  document.querySelectorAll('.wg__step-content .chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      const group = chip.closest('.chip-group').dataset.group;
      // deselect all in group
      chip.closest('.chip-group').querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      state[group] = chip.dataset.value || chip.textContent;
    });
  });

  const btnGenerate = document.querySelector('.wg__btn-generate');
  if (btnGenerate) {
    btnGenerate.addEventListener('click', async () => {
      // mark all steps complete
      document.querySelectorAll('.wg__step-indicator').forEach(el => el.classList.add('complete'));
      
      const resultPanel = document.getElementById('workout-result');
      resultPanel.classList.add('visible');
      resultPanel.innerHTML = '<div class="skeleton"></div><p style="text-align:center; margin-top:20px; font-family:var(--font-mono); color:var(--color-red);">APEX is compiling parameters...</p>';
      
      // smooth scroll
      resultPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });

      const workout = await generateWorkoutPlan(state);
      renderWorkoutResult(workout, resultPanel);
    });
  }
}

function renderWorkoutResult(workout, container) {
  let html = `
    <h3 class="font-display text-headline color-red">${workout.title}</h3>
    <p class="font-mono text-muted mb-6">${workout.tagline} | Total Time: ${workout.total_time}</p>
    
    <div style="margin-bottom: 24px;">
      <h4 class="font-heading text-title color-chrome">Warmup Sequence</h4>
      <ul style="list-style:disc; margin-left: 20px; color:var(--color-muted);">
        ${workout.warmup.map(w => `<li>${w}</li>`).join('')}
      </ul>
    </div>

    <div class="exercise-table-container">
      <table class="exercise-table">
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Sets</th>
            <th>Reps</th>
            <th>Rest</th>
            <th>Tempo</th>
          </tr>
        </thead>
        <tbody>
          ${workout.main_workout.map(ex => `
            <tr>
              <td><strong>${ex.name}</strong><br><span style="color:var(--color-muted); font-size:10px;">${ex.notes}</span></td>
              <td>${ex.sets}</td>
              <td>${ex.reps}</td>
              <td>${ex.rest}</td>
              <td>${ex.tempo}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    
    <p style="border-left: 2px solid var(--color-red); padding-left: 10px; margin-top: 24px; font-style: italic;">
      ${workout.apex_note}
    </p>

    <div style="display:flex; gap:10px; margin-top:30px;">
      <button class="btn-primary" onclick="alert('Workout Saved')">Save to Dashboard</button>
      <button class="btn-ghost" onclick="window.print()">Print Protocol</button>
    </div>
  `;
  container.innerHTML = html;
}
