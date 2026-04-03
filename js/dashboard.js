// js/dashboard.js
import { initHeatMap } from './progress-tracker.js';
import { apexChat } from './ai-agent.js';

document.addEventListener('DOMContentLoaded', () => {
  initHeatMapDash();
  initDashboardTabs();
  initDashboardApex();
});

function initHeatMapDash() {
  const map = document.getElementById('dash-heatmap');
  if(!map) return;
  
  // 56 cells (4 months of data approx, but we do 14 cols x 4 rows? No, we just generate 56 squares)
  for (let i = 0; i < 56; i++) {
    const cell = document.createElement('div');
    cell.className = 'heat-cell';
    let intensity = 0;
    const r = Math.random();
    if(r > 0.5) intensity = 1;
    if(r > 0.70) intensity = 2;
    if(r > 0.85) intensity = 3;
    if(r > 0.95) intensity = 4;
    
    cell.setAttribute('data-intensity', intensity);
    cell.style.animation = `heat-cell-pop 0.4s ease forwards ${Math.random() * 500}ms`;
    map.appendChild(cell);
  }
}

function initDashboardTabs() {
  const links = document.querySelectorAll('.sidebar__link, .sidebar__talk-btn');
  const views = document.querySelectorAll('.dashboard-view');
  const title = document.getElementById('view-title');
  
  const titles = {
    'dashboard': 'Command Center',
    'workouts': 'Active Protocols',
    'nutrition': 'Nutrition Matrix',
    'progress': 'Biomarkers',
    'schedule': 'Schedules',
    'apex': 'APEX Terminal'
  };

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = link.getAttribute('data-tab');
      if(!targetTab) return;

      // Update Links Active states
      document.querySelectorAll('.sidebar__link').forEach(l => l.classList.remove('active'));
      if(link.classList.contains('sidebar__link')) {
        link.classList.add('active');
      }

      // Update View Title
      if(title && titles[targetTab]) {
        title.innerText = titles[targetTab];
      }

      // Hide all views, show target
      views.forEach(v => v.classList.remove('active'));
      
      const targetView = document.getElementById('view-' + targetTab);
      if(targetView) {
        targetView.classList.add('active');
      }
    });
  });
}

function initDashboardApex() {
  const messagesDiv = document.getElementById('dash-apex-messages');
  const input = document.getElementById('dash-apex-input');
  const sendBtn = document.getElementById('dash-apex-send');

  if(!messagesDiv || !input || !sendBtn) return;

  function renderBubble(text, role, isStreaming) {
    const b = document.createElement('div');
    b.className = `chat-bubble chat-bubble--${role}`;
    if (isStreaming) b.classList.add('streaming');
    b.innerHTML = text;
    messagesDiv.appendChild(b);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    return b;
  }

  // Initial greeting
  renderBubble("System handshake confirmed. Identity verified. I am APEX. State your directive.", "apex", false);

  async function sendMessage() {
    const text = input.value.trim();
    if(!text) return;
    input.value = '';
    
    renderBubble(text, "user", false);
    const apexBubble = renderBubble("", "apex", true);
    
    let currentText = "";
    await apexChat([{role: 'user', content: text}], (chunk) => {
      currentText += chunk;
      let html = currentText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      html = html.replace(/\n- /g, '<br>• ');
      html = html.replace(/\n/g, '<br>');
      apexBubble.innerHTML = html;
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });
    
    apexBubble.classList.remove('streaming');
  }

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keypress', (e) => { 
    if(e.key === 'Enter') sendMessage(); 
  });
}
