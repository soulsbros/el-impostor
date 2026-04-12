const WORD_PAIRS = [
  // Animals
  { civilian: 'Dog', impostor: 'Cat', category: 'Animals' },
  { civilian: 'Lion', impostor: 'Tiger', category: 'Animals' },
  { civilian: 'Dolphin', impostor: 'Shark', category: 'Animals' },
  { civilian: 'Eagle', impostor: 'Hawk', category: 'Animals' },
  { civilian: 'Elephant', impostor: 'Rhino', category: 'Animals' },
  { civilian: 'Crocodile', impostor: 'Lizard', category: 'Animals' },
  { civilian: 'Penguin', impostor: 'Puffin', category: 'Animals' },
  { civilian: 'Wolf', impostor: 'Fox', category: 'Animals' },

  // Food & Drink
  { civilian: 'Pizza', impostor: 'Lasagna', category: 'Food & Drink' },
  { civilian: 'Coffee', impostor: 'Tea', category: 'Food & Drink' },
  { civilian: 'Sushi', impostor: 'Sashimi', category: 'Food & Drink' },
  { civilian: 'Burger', impostor: 'Sandwich', category: 'Food & Drink' },
  { civilian: 'Ice Cream', impostor: 'Yoghurt', category: 'Food & Drink' },
  { civilian: 'Beer', impostor: 'Cider', category: 'Food & Drink' },
  { civilian: 'Croissant', impostor: 'Brioche', category: 'Food & Drink' },
  { civilian: 'Steak', impostor: 'Pork Chop', category: 'Food & Drink' },

  // Places
  { civilian: 'Beach', impostor: 'Lake', category: 'Places' },
  { civilian: 'Museum', impostor: 'Gallery', category: 'Places' },
  { civilian: 'Airport', impostor: 'Train Station', category: 'Places' },
  { civilian: 'Cinema', impostor: 'Theatre', category: 'Places' },
  { civilian: 'Hospital', impostor: 'Clinic', category: 'Places' },
  { civilian: 'Supermarket', impostor: 'Market', category: 'Places' },
  { civilian: 'Castle', impostor: 'Palace', category: 'Places' },
  { civilian: 'Forest', impostor: 'Jungle', category: 'Places' },

  // Sports
  { civilian: 'Football', impostor: 'Rugby', category: 'Sports' },
  { civilian: 'Tennis', impostor: 'Badminton', category: 'Sports' },
  { civilian: 'Swimming', impostor: 'Water Polo', category: 'Sports' },
  { civilian: 'Basketball', impostor: 'Handball', category: 'Sports' },
  { civilian: 'Boxing', impostor: 'Wrestling', category: 'Sports' },
  { civilian: 'Skiing', impostor: 'Snowboarding', category: 'Sports' },

  // Objects & Tech
  { civilian: 'Guitar', impostor: 'Ukulele', category: 'Objects & Tech' },
  { civilian: 'Telescope', impostor: 'Binoculars', category: 'Objects & Tech' },
  { civilian: 'Submarine', impostor: 'Speedboat', category: 'Objects & Tech' },
  { civilian: 'Helicopter', impostor: 'Airplane', category: 'Objects & Tech' },
  { civilian: 'Microscope', impostor: 'Magnifying Glass', category: 'Objects & Tech' },
  { civilian: 'Piano', impostor: 'Keyboard', category: 'Objects & Tech' },

  // Nature
  { civilian: 'Sun', impostor: 'Moon', category: 'Nature' },
  { civilian: 'River', impostor: 'Stream', category: 'Nature' },
  { civilian: 'Volcano', impostor: 'Mountain', category: 'Nature' },
  { civilian: 'Diamond', impostor: 'Crystal', category: 'Nature' },
  { civilian: 'Thunder', impostor: 'Lightning', category: 'Nature' },
  { civilian: 'Ocean', impostor: 'Sea', category: 'Nature' },

  // Misc
  { civilian: 'Doctor', impostor: 'Nurse', category: 'Misc' },
  { civilian: 'Crown', impostor: 'Tiara', category: 'Misc' },
  { civilian: 'Candle', impostor: 'Torch', category: 'Misc' },
  { civilian: 'Mirror', impostor: 'Window', category: 'Misc' },
];

const CATEGORIES = ['Random', ...new Set(WORD_PAIRS.map(p => p.category))];
