# ANTIGRAVITY — AI-Powered Gym Website

## 🏋️ Overview
AntiGravity is a premium, industrial-futuristic gym website scaffolding featuring a fully integrated AI personal trainer agent named APEX. It includes interactive workout generators, nutrition planners, progress trackers, and a member dashboard.

## 📁 Project Structure
```text
antigravity-gym/
├── index.html            - Main landing page with 15 detailed sections
├── dashboard.html        - Logged-in member dashboard grid layout
├── css/
│   ├── variables.css     - Color system, fluid typography scales, transitions
│   ├── reset.css         - Baseline element normalization
│   ├── typography.css    - Text styling classes matching design specs
│   ├── layout.css        - Container and grid column utilities
│   ├── components.css    - BEM styling for all UI components (Nav, Hero, APEX Chat, etc.)
│   ├── animations.css    - Keyframe definitions and scroll classes
│   ├── dashboard.css     - Specific CSS for the internal members area
│   └── responsive.css    - Media queries adjusting grid layouts for varied screens
├── js/
│   ├── main.js           - Core site initializer, Intersection Observers, custom cursor
│   ├── ai-agent.js       - APEX AI simulation logic and chat widget controller
│   ├── workout-planner.js- Workout generation wizard logic
│   ├── nutrition.js      - Macronutrient and TDEE calculation logic
│   ├── progress-tracker.js- Complex stat counter and SVG drawing animations
│   ├── membership.js     - Annual pricing toggle and FAQ interaction
│   └── animations.js     - Scroll tracking binding functions
├── data/
│   ├── workouts.json     - Pre-configured 12-week workout JSON schemas
│   ├── trainers.json     - Elite coaching roster
│   ├── pricing.json      - Membership tiers and feature lists
│   └── exercises.json    - Extensive exercise database with biomechanics details
└── README.md             - This documentation
```

## 🤖 APEX AI Agent Features
- **Workout Plan Generator:** Analyzes 5 distinct parameters to generate an interactive daily protocol.
- **Nutrition Calculator & Meal Planner:** Leverages the Mifflin-St Jeor formula and provides simulated AI macro suggestions.
- **Trainer Recommendation Engine:** Matches user intensity settings with local trainers.
- **Conversational Training Coach:** Features a floating chat widget where APEX streams motivational, formatted text.

## 🎨 Design System
- Void Black (`#080808`), Electric Red (`#FF2D2D`), Surface Gray (`#111111`), Neon Green (`#00FF88`).
- Uses Fluid Typography via CSS `clamp()` dynamically resizing huge `Bebas Neue` display headers down to mobile screens.

## ⚡ Getting Started
1. Clone / download project into a working directory.
2. Open in VS Code.
3. Install the Live Server extension.
4. Right-click `index.html` → "Open with Live Server".

## 🔑 API Configuration
Currently, `js/ai-agent.js` simulates the API response using standard JS `setTimeout` functions returning complex strings. 
To convert this to a live Anthropic integration:
1. Replace `apexChat()` logic to fire a `POST` request to your backend.
2. Ensure you handle Server Sent Events (SSE) if you keep the rapid typewriter streaming functionality.
3. Store your Anthropic keys cleanly disguised on your server environment variables (never push them to Github).

## 📱 Browser Support
| Chrome | Firefox | Safari | Edge | iOS | Android |
| --- | --- | --- | --- | --- | --- |
| 90+ | 88+ | 15+ | 90+ | 15+ | 10+ |

## 🚀 Deployment
Since this is a fully static architecture:
1. Initialize a Git repo.
2. Push to GitHub.
3. Import directly into Vercel or Netlify for instant deployment edges.

## 📈 Performance Targets
Built with native JS components minimizing reliance on massive frameworks, enabling near instant TTI (Time to Interactive). Observe standard LCP optimization by compressing future images used within the `assets/` folder.
