// js/project-estimator.js

export function initEstimatorWizard() {
  const generateBtn = document.querySelector('.est-btn-generate');
  const resultPanel = document.getElementById('est-result-panel');
  
  if(generateBtn && resultPanel) {
    generateBtn.addEventListener('click', () => {
      generateBtn.innerHTML = "CALCULATING...";
      setTimeout(() => {
        resultPanel.style.display = 'block';
        resultPanel.innerHTML = `
          <h3 class="font-heading text-title color-chrome">Estimated Cost: <span class="color-blue font-display">£4.2M – £5.8M</span></h3>
          <p class="font-mono text-small color-amber mt-2">BCIS 2024 Confidence Interval: Medium</p>
          <ul class="font-mono text-small color-muted mt-4 gap-2 flex-col flex">
            <li>> London regional multiplier applied (1.35x)</li>
            <li>> BREEAM Excellent allowance (+7%)</li>
            <li>> Programme: 18 months estimated</li>
          </ul>
        `;
        generateBtn.innerHTML = "Generate Estimate with FORGE AI";
      }, 1500);
    });
  }
}
