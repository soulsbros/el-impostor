/*
 *  HOW TO ADD A NEW LANGUAGE
 *  Add a key matching the language code (e.g. 'fr') with an array of pairs.
 *  Each pair: { civilian, impostor, category }
 *  Category names should be in the target language.
 */

const WORD_PAIRS = {
  en: [
    // Animals
    { civilian: "Dog", impostor: "Cat", category: "Animals" },
    { civilian: "Lion", impostor: "Tiger", category: "Animals" },
    { civilian: "Dolphin", impostor: "Shark", category: "Animals" },
    { civilian: "Eagle", impostor: "Hawk", category: "Animals" },
    { civilian: "Elephant", impostor: "Rhino", category: "Animals" },
    { civilian: "Crocodile", impostor: "Lizard", category: "Animals" },
    { civilian: "Penguin", impostor: "Puffin", category: "Animals" },
    { civilian: "Wolf", impostor: "Fox", category: "Animals" },

    // Food & Drink
    { civilian: "Pizza", impostor: "Lasagna", category: "Food & Drink" },
    { civilian: "Coffee", impostor: "Tea", category: "Food & Drink" },
    { civilian: "Sushi", impostor: "Sashimi", category: "Food & Drink" },
    { civilian: "Burger", impostor: "Sandwich", category: "Food & Drink" },
    { civilian: "Ice Cream", impostor: "Yoghurt", category: "Food & Drink" },
    { civilian: "Beer", impostor: "Cider", category: "Food & Drink" },
    { civilian: "Croissant", impostor: "Brioche", category: "Food & Drink" },
    { civilian: "Steak", impostor: "Pork Chop", category: "Food & Drink" },

    // Places
    { civilian: "Beach", impostor: "Lake", category: "Places" },
    { civilian: "Museum", impostor: "Gallery", category: "Places" },
    { civilian: "Airport", impostor: "Train Station", category: "Places" },
    { civilian: "Cinema", impostor: "Theatre", category: "Places" },
    { civilian: "Hospital", impostor: "Clinic", category: "Places" },
    { civilian: "Supermarket", impostor: "Market", category: "Places" },
    { civilian: "Castle", impostor: "Palace", category: "Places" },
    { civilian: "Forest", impostor: "Jungle", category: "Places" },

    // Sports
    { civilian: "Football", impostor: "Rugby", category: "Sports" },
    { civilian: "Tennis", impostor: "Badminton", category: "Sports" },
    { civilian: "Swimming", impostor: "Water Polo", category: "Sports" },
    { civilian: "Basketball", impostor: "Handball", category: "Sports" },
    { civilian: "Boxing", impostor: "Wrestling", category: "Sports" },
    { civilian: "Skiing", impostor: "Snowboarding", category: "Sports" },

    // Objects & Tech
    { civilian: "Guitar", impostor: "Ukulele", category: "Objects & Tech" },
    {
      civilian: "Telescope",
      impostor: "Binoculars",
      category: "Objects & Tech",
    },
    {
      civilian: "Submarine",
      impostor: "Speedboat",
      category: "Objects & Tech",
    },
    {
      civilian: "Helicopter",
      impostor: "Airplane",
      category: "Objects & Tech",
    },
    {
      civilian: "Microscope",
      impostor: "Magnifying Glass",
      category: "Objects & Tech",
    },
    { civilian: "Piano", impostor: "Keyboard", category: "Objects & Tech" },

    // Nature
    { civilian: "Sun", impostor: "Moon", category: "Nature" },
    { civilian: "River", impostor: "Stream", category: "Nature" },
    { civilian: "Volcano", impostor: "Mountain", category: "Nature" },
    { civilian: "Diamond", impostor: "Crystal", category: "Nature" },
    { civilian: "Thunder", impostor: "Lightning", category: "Nature" },
    { civilian: "Ocean", impostor: "Sea", category: "Nature" },

    // Misc
    { civilian: "Doctor", impostor: "Nurse", category: "Misc" },
    { civilian: "Crown", impostor: "Tiara", category: "Misc" },
    { civilian: "Candle", impostor: "Torch", category: "Misc" },
    { civilian: "Mirror", impostor: "Window", category: "Misc" },
  ],

  it: [
    // Animali
    { civilian: "Cane", impostor: "Gatto", category: "Animali" },
    { civilian: "Leone", impostor: "Tigre", category: "Animali" },
    { civilian: "Delfino", impostor: "Squalo", category: "Animali" },
    { civilian: "Aquila", impostor: "Falco", category: "Animali" },
    { civilian: "Elefante", impostor: "Rinoceronte", category: "Animali" },
    { civilian: "Coccodrillo", impostor: "Lucertola", category: "Animali" },
    {
      civilian: "Pinguino",
      impostor: "Pulcinella di mare",
      category: "Animali",
    },
    { civilian: "Lupo", impostor: "Volpe", category: "Animali" },

    // Cibo e bevande
    { civilian: "Pizza", impostor: "Lasagna", category: "Cibo e bevande" },
    { civilian: "Caffè", impostor: "Tè", category: "Cibo e bevande" },
    { civilian: "Sushi", impostor: "Sashimi", category: "Cibo e bevande" },
    { civilian: "Hamburger", impostor: "Panino", category: "Cibo e bevande" },
    { civilian: "Gelato", impostor: "Yogurt", category: "Cibo e bevande" },
    { civilian: "Birra", impostor: "Sidro", category: "Cibo e bevande" },
    { civilian: "Cornetto", impostor: "Brioche", category: "Cibo e bevande" },
    { civilian: "Bistecca", impostor: "Braciola", category: "Cibo e bevande" },

    // Luoghi
    { civilian: "Spiaggia", impostor: "Lago", category: "Luoghi" },
    { civilian: "Museo", impostor: "Galleria", category: "Luoghi" },
    { civilian: "Aeroporto", impostor: "Stazione", category: "Luoghi" },
    { civilian: "Cinema", impostor: "Teatro", category: "Luoghi" },
    { civilian: "Ospedale", impostor: "Clinica", category: "Luoghi" },
    { civilian: "Supermercato", impostor: "Mercato", category: "Luoghi" },
    { civilian: "Castello", impostor: "Palazzo", category: "Luoghi" },
    { civilian: "Foresta", impostor: "Giungla", category: "Luoghi" },

    // Sport
    { civilian: "Calcio", impostor: "Rugby", category: "Sport" },
    { civilian: "Tennis", impostor: "Badminton", category: "Sport" },
    { civilian: "Nuoto", impostor: "Pallanuoto", category: "Sport" },
    { civilian: "Basket", impostor: "Pallamano", category: "Sport" },
    { civilian: "Boxe", impostor: "Lotta", category: "Sport" },
    { civilian: "Sci", impostor: "Snowboard", category: "Sport" },

    // Oggetti e tecnologia
    {
      civilian: "Chitarra",
      impostor: "Ukulele",
      category: "Oggetti e tecnologia",
    },
    {
      civilian: "Telescopio",
      impostor: "Binocolo",
      category: "Oggetti e tecnologia",
    },
    {
      civilian: "Sottomarino",
      impostor: "Motoscafo",
      category: "Oggetti e tecnologia",
    },
    {
      civilian: "Elicottero",
      impostor: "Aereo",
      category: "Oggetti e tecnologia",
    },
    {
      civilian: "Microscopio",
      impostor: "Lente d'ingrandimento",
      category: "Oggetti e tecnologia",
    },
    {
      civilian: "Pianoforte",
      impostor: "Tastiera",
      category: "Oggetti e tecnologia",
    },

    // Natura
    { civilian: "Sole", impostor: "Luna", category: "Natura" },
    { civilian: "Fiume", impostor: "Ruscello", category: "Natura" },
    { civilian: "Vulcano", impostor: "Montagna", category: "Natura" },
    { civilian: "Diamante", impostor: "Cristallo", category: "Natura" },
    { civilian: "Tuono", impostor: "Fulmine", category: "Natura" },
    { civilian: "Oceano", impostor: "Mare", category: "Natura" },

    // Varie
    { civilian: "Dottore", impostor: "Infermiere", category: "Varie" },
    { civilian: "Corona", impostor: "Tiara", category: "Varie" },
    { civilian: "Candela", impostor: "Torcia", category: "Varie" },
    { civilian: "Specchio", impostor: "Finestra", category: "Varie" },
  ],
};
