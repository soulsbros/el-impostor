/*
 *  HOW TO ADD A NEW LANGUAGE
 *  1. Add an entry to LANGUAGES: { code: 'fr', label: 'FR' }
 *  2. Copy the 'en' block inside TRANSLATIONS and translate every value
 *  3. Add a matching key in WORD_PAIRS (words.js) with translated pairs
 */

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "it", label: "IT" },
];

const TRANSLATIONS = {
  en: {
    // App header
    appTitle: "el-Impostor game",
    appSubtitle: "amogus but offline",

    // Setup — players card
    sectionPlayers: "Players",
    totalPlayers: "Total Players",
    totalPlayersRange: "3 – 20 players",
    impostorsLabel: "Impostors",
    impostorsMin: "At least 2 civilians",

    // Setup — names card
    sectionNames: "Player Names",
    namesOptional: "(optional)",
    playerLabel: "Player", // placeholder: "Player 1"

    // Setup — category card
    sectionCategory: "Word Category",
    categoryRandom: "Random",

    // Setup — game mode card
    sectionMode: "Game Mode",
    modeNoWordTitle: "No Word",
    modeNoWordDesc: "Impostors receive no word and know they're the impostor",
    modeRelatedTitle: "Related Word",
    modeRelatedDesc:
      "Impostors see a related word and know they're the impostor",
    modeCluelessTitle: "Clueless",
    modeCluelessDesc:
      "Impostors see a related word but don't know they're the impostor",

    // Setup — button
    startGame: "Start Game",

    // Reveal screen
    tapToSee: "Tap to see your word",
    tapHint: "Make sure nobody else can see the screen",
    roleCivilian: "👤 You are a Civilian",
    roleImpostor: "🕵️ You are an Impostor",
    tapToHide: "Tap card to hide",
    passTo: "Pass to", // "Pass to Alice"
    ofLabel: "of", // "1 of 6"
    noWord: "No word",

    // Game screen
    gameTitle: "Game On!",
    gameSubtitle:
      "Everyone has their word. Discuss, debate, and find the impostor!",
    statPlayers: "Players",
    statCivilians: "Civilians",
    statImpostors: "Impostors",
    revealImpostors: "Reveal Impostors",
    backToSetup: "Back to Setup",

    // Results screen
    resultTitle: "Impostors Revealed",
    civiliansWord: "Civilians' Word",
    impostorsWord: "Impostors' Word",
    theImpostorsWere: "The Impostors were",
    playAgain: "Play Again",

    // Confirm dialog
    confirmBackToSetup: "Go back to setup? The current game will be lost.",
  },

  it: {
    // App header
    appTitle: "el-impostor ",
    appSubtitle: "amogus ma offline",

    // Setup — players card
    sectionPlayers: "Giocatori",
    totalPlayers: "Giocatori totali",
    totalPlayersRange: "3 – 20 giocatori",
    impostorsLabel: "Impostori",
    impostorsMin: "Almeno 2 civili",

    // Setup — names card
    sectionNames: "Nomi dei giocatori",
    namesOptional: "(opzionale)",
    playerLabel: "Giocatore",

    // Setup — category card
    sectionCategory: "Categoria parole",
    categoryRandom: "Casuale",

    // Setup — game mode card
    sectionMode: "Modalità di gioco",
    modeNoWordTitle: "Senza parola",
    modeNoWordDesc:
      "Gli impostori non ricevono alcuna parola e sanno di essere impostori",
    modeRelatedTitle: "Parola correlata",
    modeRelatedDesc:
      "Gli impostori vedono una parola correlata e sanno di essere impostori",
    modeCluelessTitle: "All'oscuro",
    modeCluelessDesc:
      "Gli impostori vedono una parola correlata ma non sanno di essere impostori",

    // Setup — button
    startGame: "Inizia partita",

    // Reveal screen
    tapToSee: "Tocca per vedere la tua parola",
    tapHint: "Assicurati che nessun altro veda lo schermo",
    roleCivilian: "👤 Sei un civile",
    roleImpostor: "🕵️ Sei un impostore",
    tapToHide: "Tocca per nascondere",
    passTo: "Passa a",
    ofLabel: "di",
    noWord: "Nessuna parola",

    // Game screen
    gameTitle: "Che la partita abbia inizio!",
    gameSubtitle:
      "Tutti hanno la loro parola. Discuti, dibatti e trova l'impostore!",
    statPlayers: "Giocatori",
    statCivilians: "Civili",
    statImpostors: "Impostori",
    revealImpostors: "Rivela gli impostori",
    backToSetup: "Torna alle impostazioni",

    // Results screen
    resultTitle: "Impostori rivelati",
    civiliansWord: "Parola dei civili",
    impostorsWord: "Parola degli impostori",
    theImpostorsWere: "Gli impostori erano",
    playAgain: "Gioca ancora",

    // Confirm dialog
    confirmBackToSetup:
      "Tornare alle impostazioni? La partita in corso andrà persa.",
  },
};
