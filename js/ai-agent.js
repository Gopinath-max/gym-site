// js/ai-agent.js

const APEX_SYSTEM_PROMPT = `
You are APEX, the elite AI training intelligence for AntiGravity Gym.
You are direct, motivational, highly technical, and results-obsessed.
You speak like a top-tier personal trainer who also has a PhD in 
exercise science and nutrition. Never be generic — always be specific.
You use data, progressive overload principles, periodization, and 
evidence-based nutrition science.
Keep responses focused and structured. Use markdown-style formatting 
in responses (bold for exercises, bullet points for lists).
Always end workout suggestions with a motivational one-liner.
Current gym context: AntiGravity Gym, industrial-style premium facility,
all equipment available including Olympic platforms, cable machines, 
free weights up to 200kg, cardio equipment, recovery suite.
`;

export async function apexChat(messages, onChunk) {
  // Mock streaming response
  return new Promise((resolve) => {
    let fullResponse = "Analyzing parameters...\n\nYour optimal framework is ready. This structure targets fast-twitch muscle fibers using progressive overload.\n\n- **Barbell Back Squat**: 4 sets of 5 reps\n- **Romanian Deadlift**: 3 sets of 8 reps\n\nExecute with precision. Intensity clears the mind.\n— APEX";
    
    // Check if user is asking for specific things
    const lastMsg = messages[messages.length - 1].content.toLowerCase();
    if (lastMsg.includes("muscle")) {
      fullResponse = "Hypertrophy protocol initiated.\n\nWe build muscle through mechanical tension and metabolic stress. Stick to 8-12 reps, control the eccentric phase, and eat in a surplus.\n\nNow get to work.\n— APEX";
    }

    let i = 0;
    function stream() {
      if (i < fullResponse.length) {
        onChunk(fullResponse.charAt(i));
        i++;
        setTimeout(stream, 20); // 20ms per char
      } else {
        resolve(fullResponse);
      }
    }
    setTimeout(stream, 500); // initial delay
  });
}

export async function generateWorkoutPlan(params) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        title: `${params.goal} Protocol: Module 1`,
        tagline: "Precision engineered for maximum adaptation.",
        warmup: ["Dynamic stretches", "Light rowing 5 mins", "Band pull-aparts"],
        main_workout: [
          { name: "Barbell Back Squat", sets: 4, reps: "5", rest: "180s", tempo: "3-1-1-0", notes: "Explosive concentric." },
          { name: "Overhead Press", sets: 4, reps: "8", rest: "120s", tempo: "2-0-1-0", notes: "Core tight." },
          { name: "Weighted Pull-Ups", sets: 3, reps: "8-10", rest: "120s", tempo: "2-1-1-0", notes: "Full range of motion." }
        ],
        cooldown: ["Foam rolling", "10 min walk"],
        total_time: "45 min",
        difficulty: params.level,
        apex_note: "The iron doesn't care about your excuses. Move the weight. — APEX"
      });
    }, 1500);
  });
}

export async function generateNutritionPlan(params) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        tdee: 2800,
        protein: 180,
        carbs: 300,
        fats: 80,
        calories: 2640,
        meal_plan: [
          { meal: "Pre-Workout Base", time: "08:00", foods: ["Oats", "Whey Protein", "Berries"], macros: "50C / 30P" },
          { meal: "Anabolic Window", time: "12:00", foods: ["Chicken Breast", "Jasmine Rice", "Spinach"], macros: "60C / 40P" },
          { meal: "Recovery Fuel", time: "18:00", foods: ["Salmon", "Sweet Potato", "Avocado"], macros: "40C / 35P / 20F" }
        ]
      });
    }, 1000);
  });
}

export async function getTrainerRecommendation(goals, level, preferences) {
  return "Based on your requested intensity and focus, **Marcus Chen** is your optimal coach. His powerlifting foundation aligns directly with your mechanical goals.";
}

export async function analyzeProgramMatch(answers) {
  return "Data parsed. You belong in **FORGE**. Your requirement for raw power development matches this periodized protocol.";
}

export async function getMotivationalBoost(context) {
  return "Your last log showed a stall in acceleration. That's data, not failure. Adjust the load, find the anger, push through the floor. — APEX";
}

// CHAT WIDGET CONTROLLER
export function initApexWidget() {
  const fab = document.createElement('div');
  fab.className = 'apex-fab';
  fab.innerHTML = '🤖';
  document.body.appendChild(fab);

  const panel = document.createElement('div');
  panel.className = 'apex-panel';
  panel.id = 'apex-chat-widget';
  
  panel.innerHTML = `
    <div class="apex-panel__header">
      <span>APEX AI TRAINER</span>
      <span class="minimize-btn" style="cursor:pointer">_</span>
    </div>
    <div class="chat-messages" id="apex-messages"></div>
    <div class="chat-input-row">
      <input type="text" id="apex-input" placeholder="Query APEX..." />
      <button id="apex-send">➔</button>
    </div>
  `;
  document.body.appendChild(panel);

  const messagesDiv = document.getElementById('apex-messages');
  const input = document.getElementById('apex-input');
  
  fab.addEventListener('click', () => {
    panel.classList.add('open');
    fab.style.display = 'none';
    if(messagesDiv.children.length === 0) {
      renderBubble("System online. I am APEX. State your objective.", "apex", false);
      renderSuggestionChips(["Build a workout", "Nutrition help"]);
    }
  });

  const hidePanel = () => {
    panel.classList.remove('open');
    fab.style.display = 'flex';
  };
  
  panel.querySelector('.minimize-btn').addEventListener('click', hidePanel);
  
  async function sendChatMessage() {
    const text = input.value.trim();
    if(!text) return;
    input.value = '';
    
    // Remove chips if present
    document.querySelectorAll('.suggestion-chips').forEach(e => e.remove());
    
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

  document.getElementById('apex-send').addEventListener('click', sendChatMessage);
  input.addEventListener('keypress', (e) => { if(e.key === 'Enter') sendChatMessage(); });

  function renderBubble(text, role, isStreaming) {
    const b = document.createElement('div');
    b.className = `chat-bubble chat-bubble--${role}`;
    if (isStreaming) b.classList.add('streaming');
    b.innerHTML = text; // Formatting applied during stream or initial for user
    messagesDiv.appendChild(b);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    return b;
  }
  
  function renderSuggestionChips(chips) {
    const cont = document.createElement('div');
    cont.className = 'suggestion-chips';
    cont.style = "display:flex; gap:10px; flex-wrap:wrap; margin-top:10px;";
    chips.forEach(c => {
      const btn = document.createElement('button');
      btn.textContent = c;
      btn.style = "padding:5px 10px; border:1px solid var(--color-chrome); border-radius:20px; font-size:12px; color:var(--color-chrome); cursor:pointer;";
      btn.addEventListener('click', () => {
        input.value = c;
        sendChatMessage();
      });
      cont.appendChild(btn);
    });
    messagesDiv.appendChild(cont);
  }
}
