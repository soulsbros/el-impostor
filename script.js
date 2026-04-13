/*  State  */
const state = {
  totalPlayers: 4,
  numImpostors: 1,
  gameType: "no-word", // 'no-word' | 'related-word' | 'clueless'
  lang: localStorage.getItem("impostor-lang") || "en",
  wordPair: null, // { civilian, impostor }
  players: [], // [{ id, isImpostor, word }]
  playerNames: [],
  currentRevealIndex: 0,
  cardRevealed: false,
  phase: "setup", // 'setup' | 'reveal' | 'game' | 'results'
};

/*  i18n helpers  */
function t(key) {
  return (
    (TRANSLATIONS[state.lang] || TRANSLATIONS.en)[key] ??
    TRANSLATIONS.en[key] ??
    key
  );
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll(".name-input").forEach((el, i) => {
    el.placeholder = `${t("playerLabel")} ${i + 1}`;
  });
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === state.lang);
  });
  document.documentElement.lang = state.lang;
}

function switchLanguage(lang) {
  state.lang = lang;
  localStorage.setItem("impostor-lang", lang);
  applyTranslations();
  renderCategorySelect();
}

/*  localStorage helpers  */
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

/*  Helpers  */
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

/*  Language switcher  */
function initLangSwitcher() {
  const container = document.getElementById("lang-switcher");
  LANGUAGES.forEach((lang) => {
    const btn = document.createElement("button");
    btn.className = "lang-btn";
    btn.dataset.lang = lang.code;
    btn.textContent = lang.label;
    btn.addEventListener("click", () => switchLanguage(lang.code));
    container.appendChild(btn);
  });
}

/*  Setup Screen  */
function initSetup() {
  updateCounterUI("players", state.totalPlayers);
  updateCounterUI("impostors", state.numImpostors);
  setGameType(state.gameType);
  renderCategorySelect();
  renderNameInputs();
}

function renderCategorySelect() {
  const sel = document.getElementById("select-category");
  const prev = sel.value;
  sel.innerHTML = "";

  const pairs = WORD_PAIRS[state.lang] || WORD_PAIRS.en;
  const categories = [...new Set(pairs.map((p) => p.category))];

  // Random option uses a stable sentinel value so filtering logic is language-agnostic
  const randomOpt = document.createElement("option");
  randomOpt.value = "__random__";
  randomOpt.textContent = t("categoryRandom");
  sel.appendChild(randomOpt);

  categories.forEach((cat) => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    sel.appendChild(opt);
  });

  // Restore selection if the same category exists in the new language (best-effort)
  if (prev && [...sel.options].some((o) => o.value === prev)) {
    sel.value = prev;
  }
}

function renderNameInputs() {
  const stored = loadStoredNames();
  const container = document.getElementById("player-names-container");
  container.innerHTML = "";
  for (let i = 0; i < state.totalPlayers; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.className = "name-input";
    input.placeholder = `${t("playerLabel")} ${i + 1}`;
    input.value = stored[i] || "";
    input.maxLength = 20;
    input.addEventListener("input", persistNames);
    container.appendChild(input);
  }
}

function getPlayerName(index) {
  const inputs = document.querySelectorAll(".name-input");
  return inputs[index]?.value.trim() || `${t("playerLabel")} ${index + 1}`;
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
  const category = document.getElementById("select-category").value;
  const pairs = WORD_PAIRS[state.lang] || WORD_PAIRS.en;
  const pool =
    category === "__random__"
      ? pairs
      : pairs.filter((p) => p.category === category);
  state.wordPair = pickRandom(pool);

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

/*  Reveal Screen  */
function renderRevealCard() {
  const total = state.players.length;
  const idx = state.currentRevealIndex;

  const name = state.playerNames[idx];
  document.getElementById("reveal-player-label").textContent =
    `${name} (${idx + 1} ${t("ofLabel")} ${total})`;

  const dotsEl = document.getElementById("progress-dots");
  dotsEl.innerHTML = "";
  for (let i = 0; i < total; i++) {
    const dot = document.createElement("div");
    dot.className =
      "progress-dot" + (i < idx ? " done" : i === idx ? " current" : "");
    dotsEl.appendChild(dot);
  }

  setCardLocked();

  const nextBtn = document.getElementById("btn-next-player");
  nextBtn.textContent =
    idx === total - 1
      ? t("startGame")
      : `${t("passTo")} ${state.playerNames[idx + 1]}`;
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
  if (state.cardRevealed) {
    nextPlayer();
  } else {
    revealCard();
  }
}

function revealCard() {
  state.cardRevealed = true;
  const player = state.players[state.currentRevealIndex];
  const card = document.getElementById("tap-card");

  card.classList.remove("locked");
  card.classList.add("unlocked");
  document.getElementById("card-locked-view").style.display = "none";
  document.getElementById("card-unlocked-view").style.display = "flex";

  const wordEl = document.getElementById("reveal-word");
  if (player.word === "") {
    wordEl.textContent = t("noWord");
    wordEl.className = "reveal-word no-word";
  } else {
    wordEl.textContent = player.word;
    wordEl.className = "reveal-word";
  }

  const roleBadge = document.getElementById("role-badge");
  if (state.gameType === "clueless") {
    roleBadge.style.display = "none";
  } else {
    roleBadge.style.display = "inline-flex";
    roleBadge.textContent = t(
      player.isImpostor ? "roleImpostor" : "roleCivilian",
    );
    roleBadge.className = `role-badge ${player.isImpostor ? "impostor" : "civilian"}`;
  }

  document.getElementById("btn-next-player").style.display = "flex";
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

/*  Game Screen  */
function beginGame() {
  state.phase = "game";
  showScreen("screen-game");
  document.getElementById("stat-players").textContent = state.totalPlayers;
  document.getElementById("stat-impostors").textContent = state.numImpostors;
  document.getElementById("stat-civilians").textContent =
    state.totalPlayers - state.numImpostors;
}

/*  Results Screen  */
function showResults() {
  state.phase = "results";
  showScreen("screen-results");

  document.getElementById("result-civilian-word").textContent =
    state.wordPair.civilian;

  const impWordRow = document.getElementById("result-impostor-row");
  if (state.gameType === "related-word" || state.gameType === "clueless") {
    document.getElementById("result-impostor-word").textContent =
      state.wordPair.impostor;
    impWordRow.style.display = "flex";
  } else {
    impWordRow.style.display = "none";
  }

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

/*  Navigation  */
function playAgain() {
  state.phase = "setup";
  showScreen("screen-setup");
}

function backToSetup() {
  if (!confirm(t("confirmBackToSetup"))) return;
  state.phase = "setup";
  showScreen("screen-setup");
}

/*  Reload guard  */
window.addEventListener("beforeunload", (e) => {
  if (state.phase !== "setup") e.preventDefault();
});

/*  Event Wiring  */
document.addEventListener("DOMContentLoaded", () => {
  initLangSwitcher();
  initSetup();
  applyTranslations();
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
  document.getElementById("tap-card").addEventListener("click", handleCardTap);
  document
    .getElementById("btn-next-player")
    .addEventListener("click", nextPlayer);
  document
    .getElementById("btn-reveal-impostors")
    .addEventListener("click", showResults);
  document
    .getElementById("btn-back-setup")
    .addEventListener("click", backToSetup);
  document
    .getElementById("btn-play-again")
    .addEventListener("click", playAgain);
});
