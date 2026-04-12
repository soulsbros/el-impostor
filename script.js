/* -- State -- */
const state = {
  totalPlayers: 4,
  numImpostors: 1,
  gameType: "no-word", // 'no-word' | 'related-word' | 'clueless'
  wordPair: null, // { civilian, impostor }
  players: [], // [{ id, isImpostor, word }]
  playerNames: [], // display names, indexed by player order (0-based)
  currentRevealIndex: 0,
  cardRevealed: false,
  phase: "setup", // 'setup' | 'reveal' | 'game' | 'results'
};

/* -- localStorage helpers -- */
const LS_KEY = "impostor-player-names";

function loadStoredNames() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || [];
  } catch {
    return [];
  }
}

function persistNames() {
  const values = Array.from(document.querySelectorAll(".name-input")).map(
    (el) => el.value.trim(),
  );
  localStorage.setItem(LS_KEY, JSON.stringify(values));
}

/* -- Helpers -- */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function showScreen(id) {
  document
    .querySelectorAll(".screen")
    .forEach((s) => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* -- Setup Screen -- */
function initSetup() {
  updateCounterUI("players", state.totalPlayers);
  updateCounterUI("impostors", state.numImpostors);
  setGameType(state.gameType);

  const sel = document.getElementById("select-category");
  sel.innerHTML = "";
  CATEGORIES.forEach((cat) => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    sel.appendChild(opt);
  });

  renderNameInputs();
}

function renderNameInputs() {
  const stored = loadStoredNames();
  const container = document.getElementById("player-names-container");
  container.innerHTML = "";
  for (let i = 0; i < state.totalPlayers; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.className = "name-input";
    input.placeholder = `Player ${i + 1}`;
    input.value = stored[i] || "";
    input.maxLength = 20;
    input.addEventListener("input", persistNames);
    container.appendChild(input);
  }
}

function getPlayerName(index) {
  const inputs = document.querySelectorAll(".name-input");
  return inputs[index]?.value.trim() || `Player ${index + 1}`;
}

function updateCounterUI(type, value) {
  document.getElementById(`${type}-value`).textContent = value;
  const minMap = { players: 3, impostors: 1 };
  const maxMap = {
    players: 20,
    get impostors() {
      return state.totalPlayers - 2;
    },
  };
  document.getElementById(`btn-${type}-minus`).disabled = value <= minMap[type];
  document.getElementById(`btn-${type}-plus`).disabled = value >= maxMap[type];
}

function changeCounter(type, delta) {
  if (type === "players") {
    state.totalPlayers = Math.min(20, Math.max(3, state.totalPlayers + delta));
    // Clamp impostors
    const maxImpostors = state.totalPlayers - 2;
    if (state.numImpostors > maxImpostors) {
      state.numImpostors = maxImpostors;
      updateCounterUI("impostors", state.numImpostors);
    }
    updateCounterUI("players", state.totalPlayers);
    updateCounterUI("impostors", state.numImpostors);
    renderNameInputs();
  } else {
    const max = state.totalPlayers - 2;
    state.numImpostors = Math.min(max, Math.max(1, state.numImpostors + delta));
    updateCounterUI("impostors", state.numImpostors);
  }
}

function setGameType(type) {
  state.gameType = type;
  document.querySelectorAll(".type-option").forEach((el) => {
    el.classList.toggle("selected", el.dataset.type === type);
  });
}

function startGame() {
  // Pick a random word pair from selected category
  const category = document.getElementById("select-category").value;
  const pool =
    category === "Random"
      ? WORD_PAIRS
      : WORD_PAIRS.filter((p) => p.category === category);
  state.wordPair = pickRandom(pool);

  // Assign roles
  const indices = Array.from({ length: state.totalPlayers }, (_, i) => i);
  const impostorIndices = new Set(
    shuffle(indices).slice(0, state.numImpostors),
  );

  state.players = indices.map((i) => {
    const isImpostor = impostorIndices.has(i);
    let word;
    if (!isImpostor) {
      word = state.wordPair.civilian;
    } else if (state.gameType === "no-word") {
      word = "";
    } else {
      // 'related-word' and 'clueless' both use the impostor word
      word = state.wordPair.impostor;
    }
    return { id: i + 1, isImpostor, word };
  });

  state.playerNames = indices.map((i) => getPlayerName(i));
  state.currentRevealIndex = 0;
  state.cardRevealed = false;
  state.phase = "reveal";

  showScreen("screen-reveal");
  renderRevealCard();
}

/* -- Reveal Screen -- */
function renderRevealCard() {
  const player = state.players[state.currentRevealIndex];
  const total = state.players.length;
  const idx = state.currentRevealIndex;

  // Header
  const name = state.playerNames[idx];
  document.getElementById("reveal-player-label").textContent =
    `${name} (${idx + 1} of ${total})`;

  // Progress dots
  const dotsEl = document.getElementById("progress-dots");
  dotsEl.innerHTML = "";
  for (let i = 0; i < total; i++) {
    const dot = document.createElement("div");
    dot.className =
      "progress-dot" + (i < idx ? " done" : i === idx ? " current" : "");
    dotsEl.appendChild(dot);
  }

  // Card state
  setCardLocked();

  // Next button label
  const nextBtn = document.getElementById("btn-next-player");
  if (idx === total - 1) {
    nextBtn.textContent = "Start Game";
  } else {
    nextBtn.textContent = `Pass to ${state.playerNames[idx + 1]}`;
  }
  nextBtn.style.display = "none";
}

function setCardLocked() {
  state.cardRevealed = false;
  const card = document.getElementById("tap-card");
  card.classList.remove("unlocked");
  card.classList.add("locked");
  document.getElementById("card-locked-view").style.display = "flex";
  document.getElementById("card-unlocked-view").style.display = "none";
  document.getElementById("btn-next-player").style.display = "none";
}

function handleCardTap() {
  if (!state.cardRevealed) {
    revealCard();
  } else {
    hideCard();
  }
}

function revealCard() {
  state.cardRevealed = true;
  const player = state.players[state.currentRevealIndex];
  const card = document.getElementById("tap-card");

  card.classList.remove("locked");
  card.classList.add("unlocked");
  document.getElementById("card-locked-view").style.display = "none";

  const view = document.getElementById("card-unlocked-view");
  view.style.display = "flex";

  // Word display
  const wordEl = document.getElementById("reveal-word");
  if (player.word === "") {
    wordEl.textContent = "No word";
    wordEl.className = "reveal-word no-word";
  } else {
    wordEl.textContent = player.word;
    wordEl.className = "reveal-word";
  }

  // Role badge — hidden for everyone in clueless mode
  const roleBadge = document.getElementById("role-badge");
  const showRole = state.gameType !== "clueless";

  if (showRole) {
    roleBadge.style.display = "inline-flex";
    if (player.isImpostor) {
      roleBadge.textContent = "🕵️ You are an Impostor";
      roleBadge.className = "role-badge impostor";
    } else {
      roleBadge.textContent = "👤 You are a Civilian";
      roleBadge.className = "role-badge civilian";
    }
  } else {
    roleBadge.style.display = "none";
  }

  document.getElementById("btn-next-player").style.display = "flex";
}

function hideCard() {
  setCardLocked();
}

function nextPlayer() {
  state.currentRevealIndex++;
  if (state.currentRevealIndex >= state.players.length) {
    beginGame();
  } else {
    state.cardRevealed = false;
    renderRevealCard();
  }
}

/* -- Game Screen -- */
function beginGame() {
  state.phase = "game";
  showScreen("screen-game");

  document.getElementById("stat-players").textContent = state.totalPlayers;
  document.getElementById("stat-impostors").textContent = state.numImpostors;
  document.getElementById("stat-civilians").textContent =
    state.totalPlayers - state.numImpostors;
}

/* -- Results Screen -- */
function showResults() {
  state.phase = "results";
  showScreen("screen-results");

  // Word reveal
  const civWordEl = document.getElementById("result-civilian-word");
  const impWordEl = document.getElementById("result-impostor-word");
  const impWordRow = document.getElementById("result-impostor-row");

  civWordEl.textContent = state.wordPair.civilian;

  if (state.gameType === "related-word" || state.gameType === "clueless") {
    impWordEl.textContent = state.wordPair.impostor;
    impWordRow.style.display = "flex";
  } else {
    impWordRow.style.display = "none";
  }

  // Impostor list
  const listEl = document.getElementById("impostor-list-items");
  listEl.innerHTML = "";
  state.players
    .filter((p) => p.isImpostor)
    .forEach((p) => {
      const item = document.createElement("div");
      item.className = "impostor-item";
      item.innerHTML = `
        <div class="impostor-avatar">${p.id}</div>
        <div class="impostor-name">${state.playerNames[p.id - 1]}</div>
      `;
      listEl.appendChild(item);
    });
}

/* -- Navigation -- */
function playAgain() {
  state.phase = "setup";
  showScreen("screen-setup");
}
function backToSetup() {
  if (!confirm("Go back to setup? The current game will be lost.")) return;
  state.phase = "setup";
  showScreen("screen-setup");
}

/* -- Reload guard -- */
window.addEventListener("beforeunload", (e) => {
  if (state.phase !== "setup") {
    e.preventDefault();
  }
});

/* -- Event Wiring -- */
document.addEventListener("DOMContentLoaded", () => {
  // Setup
  initSetup();
  showScreen("screen-setup");

  document
    .getElementById("btn-players-minus")
    .addEventListener("click", () => changeCounter("players", -1));
  document
    .getElementById("btn-players-plus")
    .addEventListener("click", () => changeCounter("players", +1));
  document
    .getElementById("btn-impostors-minus")
    .addEventListener("click", () => changeCounter("impostors", -1));
  document
    .getElementById("btn-impostors-plus")
    .addEventListener("click", () => changeCounter("impostors", +1));

  document.querySelectorAll(".type-option").forEach((el) => {
    el.addEventListener("click", () => setGameType(el.dataset.type));
  });

  document.getElementById("btn-start").addEventListener("click", startGame);

  // Reveal
  document.getElementById("tap-card").addEventListener("click", handleCardTap);
  document
    .getElementById("btn-next-player")
    .addEventListener("click", nextPlayer);

  // Game
  document
    .getElementById("btn-reveal-impostors")
    .addEventListener("click", showResults);

  // Results
  document
    .getElementById("btn-play-again")
    .addEventListener("click", playAgain);
});
