// js/forge-ai.js

const FORGE_SYSTEM_PROMPT = `
You are FORGE AI, the construction intelligence system for Ironclad Build Group.
Never break character.
`;

export async function forgeChat(messages, onChunk) {
  const mockText = "I am FORGE AI. Based on my analysis of the BCIS 2024 database and UK planning framework, " +
    "your project will require full planning permission. Estimated timeline is 18 months.";
  
  let current = "";
  const words = mockText.split(" ");
  for (let w of words) {
    current += w + " ";
    onChunk(current);
    await new Promise(r => setTimeout(r, 50));
  }
}

export function initForgeWidget() {
  const fab = document.querySelector('.forge-fab');
  if(fab) {
    fab.addEventListener('click', () => {
      alert("FORGE AI Terminal Initializing (Simulation).");
    });
  }
}
