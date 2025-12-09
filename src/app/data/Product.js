export const Product = [
  // --- STRENGTH (Ids 1-25) ---
  { 
    id: 1, 
    name: "Olympic Barbell", 
    category: "Strength", 
    price: "$280 - $299", 
    rating: 4.9, 
    image: "bg-gradient-to-br from-gray-700 to-gray-900",
    variants: [
      { name: "15kg (Womens)", price: 280 },
      { name: "20kg (Mens)", price: 299 }
    ]
  },
  { id: 2, name: "Power Rack", category: "Strength", price: "$699", rating: 4.8, image: "bg-gradient-to-br from-zinc-700 to-black" }, 
  { 
    id: 3, 
    name: "Pro Kettlebell", 
    category: "Strength", 
    price: "$30 - $110", 
    rating: 4.8, 
    image: "bg-gradient-to-br from-stone-600 to-stone-800",
    variants: [
      { name: "4kg", price: 30 },
      { name: "8kg", price: 45 },
      { name: "12kg", price: 60 },
      { name: "16kg", price: 75 },
      { name: "20kg", price: 90 },
      { name: "24kg", price: 100 },
      { name: "32kg", price: 110 }
    ]
  },
  { id: 4, name: "Adjustable Bench", category: "Strength", price: "$250", rating: 4.7, image: "bg-gradient-to-br from-slate-600 to-slate-800" },
  { 
    id: 5, 
    name: "Dumbbell Pair", 
    category: "Strength", 
    price: "$40 - $180", 
    rating: 4.9, 
    image: "bg-gradient-to-br from-gray-800 to-black",
    variants: [
      { name: "5lb", price: 40 },
      { name: "10lb", price: 60 },
      { name: "15lb", price: 80 },
      { name: "25lb", price: 110 },
      { name: "35lb", price: 140 },
      { name: "50lb", price: 180 }
    ]
  },
  { id: 6, name: "Squat Stand", category: "Strength", price: "$350", rating: 4.6, image: "bg-gradient-to-br from-neutral-700 to-neutral-900" },
  { id: 7, name: "Hex Trap Bar", category: "Strength", price: "$180", rating: 4.7, image: "bg-gradient-to-br from-zinc-600 to-zinc-800" },
  { 
    id: 8, 
    name: "Bumper Plate Pair", 
    category: "Strength", 
    price: "$60 - $220", 
    rating: 4.8, 
    image: "bg-gradient-to-br from-emerald-700 to-emerald-900",
    variants: [
      { name: "5kg", price: 60 },
      { name: "10kg", price: 90 },
      { name: "15kg", price: 130 },
      { name: "20kg", price: 170 },
      { name: "25kg", price: 220 }
    ]
  },
  { id: 9, name: "Dip Station", category: "Strength", price: "$120", rating: 4.5, image: "bg-gradient-to-br from-gray-600 to-gray-800" },
  { id: 10, name: "Pull-Up Bar", category: "Strength", price: "$45", rating: 4.4, image: "bg-gradient-to-br from-slate-700 to-black" },
  { id: 11, name: "Smith Machine", category: "Strength", price: "$1200", rating: 4.6, image: "bg-gradient-to-br from-stone-700 to-stone-900" },
  { id: 12, name: "Leg Press Machine", category: "Strength", price: "$1500", rating: 4.9, image: "bg-gradient-to-br from-red-900 to-black" },
  { id: 13, name: "Cable Crossover", category: "Strength", price: "$1800", rating: 4.8, image: "bg-gradient-to-br from-blue-900 to-black" },
  { id: 14, name: "Preacher Curl Bench", category: "Strength", price: "$220", rating: 4.5, image: "bg-gradient-to-br from-gray-500 to-gray-700" },
  { 
    id: 15, 
    name: "Medicine Ball", 
    category: "Strength", 
    price: "$30 - $90", 
    rating: 4.6, 
    image: "bg-gradient-to-br from-orange-700 to-red-800",
    variants: [
      { name: "3kg", price: 30 },
      { name: "5kg", price: 45 },
      { name: "7kg", price: 60 },
      { name: "9kg", price: 75 },
      { name: "12kg", price: 90 }
    ]
  },
  { 
    id: 16, 
    name: "Battle Ropes", 
    category: "Strength", 
    price: "$80 - $130", 
    rating: 4.7, 
    image: "bg-gradient-to-br from-yellow-800 to-yellow-950", 
    variants: [
      { name: "30ft (1.5\")", price: 80 },
      { name: "40ft (1.5\")", price: 100 },
      { name: "50ft (2.0\")", price: 130 }
    ]
  }, 
  { 
    id: 17, 
    name: "Tactical Weight Vest", 
    category: "Strength", 
    price: "$65 - $105", 
    rating: 4.5, 
    image: "bg-gradient-to-br from-neutral-800 to-black", 
    variants: [
      { name: "10kg Plate", price: 65 },
      { name: "15kg Plate", price: 85 },
      { name: "20kg Plate", price: 105 }
    ]
  }, 
  { id: 18, name: "Landmine Attachment", category: "Strength", price: "$35", rating: 4.4, image: "bg-gradient-to-br from-gray-400 to-gray-600" },
  { id: 19, name: "EZ Curl Bar", category: "Strength", price: "$75", rating: 4.6, image: "bg-gradient-to-br from-zinc-500 to-zinc-700" },
  { id: 20, name: "Plate Tree", category: "Strength", price: "$85", rating: 4.3, image: "bg-gradient-to-br from-slate-500 to-slate-700" },
  { id: 21, name: "Calf Raise Block", category: "Strength", price: "$40", rating: 4.2, image: "bg-gradient-to-br from-stone-500 to-stone-700" },
  { id: 22, name: "Power Tower", category: "Strength", price: "$180", rating: 4.5, image: "bg-gradient-to-br from-gray-700 to-gray-900" },
  { id: 23, name: "Sled Push", category: "Strength", price: "$250", rating: 4.7, image: "bg-gradient-to-br from-red-700 to-red-900" },
  { 
    id: 24, 
    name: "Sandbag Trainer", 
    category: "Strength", 
    price: "$55 - $95", 
    rating: 4.4, 
    image: "bg-gradient-to-br from-yellow-600 to-yellow-800", 
    variants: [
      { name: "10kg", price: 55 },
      { name: "20kg", price: 65 },
      { name: "30kg", price: 75 },
      { name: "40kg", price: 85 },
      { name: "50kg", price: 95 }
    ]
  }, 
  { 
    id: 25, 
    name: "Grip Strengthener", 
    category: "Strength", 
    price: "$15 - $25", 
    rating: 4.1, 
    image: "bg-gradient-to-br from-blue-400 to-blue-600", 
    variants: [
      { name: "100lb", price: 15 },
      { name: "150lb", price: 18 },
      { name: "200lb", price: 20 },
      { name: "250lb", price: 22 },
      { name: "300lb", price: 25 }
    ]
  }, 

  // --- CARDIO (Ids 26-50) ---
  { id: 26, name: "Elite Treadmill", category: "Cardio", price: "$1,499", rating: 4.7, image: "bg-gradient-to-br from-orange-500 to-red-600" },
  { id: 27, name: "Rowing Machine", category: "Cardio", price: "$899", rating: 4.9, image: "bg-gradient-to-br from-blue-600 to-cyan-600" },
  { id: 28, name: "Air Bike", category: "Cardio", price: "$799", rating: 4.8, image: "bg-gradient-to-br from-slate-600 to-black" },
  { id: 29, name: "Spin Bike Pro", category: "Cardio", price: "$650", rating: 4.6, image: "bg-gradient-to-br from-red-500 to-pink-600" },
  { id: 30, name: "Elliptical Trainer", category: "Cardio", price: "$950", rating: 4.5, image: "bg-gradient-to-br from-teal-500 to-teal-700" },
  { id: 31, name: "Stair Climber", category: "Cardio", price: "$2200", rating: 4.8, image: "bg-gradient-to-br from-gray-500 to-gray-800" },
  { id: 32, name: "Curved Treadmill", category: "Cardio", price: "$3000", rating: 4.9, image: "bg-gradient-to-br from-zinc-800 to-black" },
  { id: 33, name: "Ski Ergometer", category: "Cardio", price: "$850", rating: 4.7, image: "bg-gradient-to-br from-cyan-600 to-blue-800" },
  { id: 34, name: "Recumbent Bike", category: "Cardio", price: "$550", rating: 4.4, image: "bg-gradient-to-br from-purple-500 to-purple-700" },
  { id: 35, name: "Vertical Climber", category: "Cardio", price: "$350", rating: 4.5, image: "bg-gradient-to-br from-stone-400 to-stone-600" },
  { id: 36, name: "Jump Rope Speed", category: "Cardio", price: "$15", rating: 4.8, image: "bg-gradient-to-br from-yellow-400 to-orange-500" },
  { 
    id: 37, 
    name: "Weighted Jump Rope", 
    category: "Cardio", 
    price: "$25 - $40", 
    rating: 4.6, 
    image: "bg-gradient-to-br from-red-400 to-red-600", 
    variants: [
      { name: "1/4 lb", price: 25 },
      { name: "1/2 lb", price: 30 },
      { name: "1 lb", price: 35 },
      { name: "2 lb", price: 40 }
    ]
  },
  { id: 38, name: "Agility Ladder", category: "Cardio", price: "$20", rating: 4.5, image: "bg-gradient-to-br from-green-400 to-green-600" },
  { 
    id: 39, 
    name: "Plyo Box Set", 
    category: "Cardio", 
    price: "$50 - $180", 
    rating: 4.7, 
    image: "bg-gradient-to-br from-indigo-500 to-indigo-800",
    variants: [
      { name: "12 Inch", price: 50 },
      { name: "18 Inch", price: 90 },
      { name: "24 Inch", price: 130 },
      { name: "30 Inch", price: 180 }
    ]
  },
  { id: 40, name: "Slide Board", category: "Cardio", price: "$60", rating: 4.3, image: "bg-gradient-to-br from-sky-400 to-sky-600" },
  { id: 41, name: "Mini Stepper", category: "Cardio", price: "$55", rating: 4.2, image: "bg-gradient-to-br from-gray-300 to-gray-500" },
  { id: 42, name: "Under Desk Elliptical", category: "Cardio", price: "$120", rating: 4.4, image: "bg-gradient-to-br from-slate-300 to-slate-500" },
  { id: 43, name: "Folding Treadmill", category: "Cardio", price: "$450", rating: 4.3, image: "bg-gradient-to-br from-zinc-400 to-zinc-600" },
  { id: 44, name: "Water Rower", category: "Cardio", price: "$1100", rating: 4.8, image: "bg-gradient-to-br from-blue-300 to-blue-500" },
  { id: 45, name: "Assault Bike", category: "Cardio", price: "$850", rating: 4.7, image: "bg-gradient-to-br from-neutral-600 to-black" },
  { id: 46, name: "Cardio Trampoline", category: "Cardio", price: "$80", rating: 4.5, image: "bg-gradient-to-br from-pink-400 to-purple-500" },
  { id: 47, name: "Running Parachute", category: "Cardio", price: "$20", rating: 4.1, image: "bg-gradient-to-br from-orange-400 to-orange-600" },
  { id: 48, name: "Heart Rate Monitor", category: "Cardio", price: "$50", rating: 4.6, image: "bg-gradient-to-br from-rose-500 to-rose-700" },
  { id: 49, name: "Stopwatch Pro", category: "Cardio", price: "$15", rating: 4.4, image: "bg-gradient-to-br from-yellow-300 to-yellow-500" },
  { id: 50, name: "Step Platform", category: "Cardio", price: "$45", rating: 4.5, image: "bg-gradient-to-br from-emerald-400 to-emerald-600" },

  // --- ACCESSORIES (Ids 51-75) ---
  { 
    id: 51, 
    name: "Yoga Mat Pro", 
    category: "Accessories", 
    price: "$35 - $55", 
    rating: 4.6, 
    image: "bg-gradient-to-br from-teal-400 to-teal-600", 
    variants: [
      { name: "3mm", price: 35 },
      { name: "5mm", price: 45 },
      { name: "8mm", price: 55 }
    ]
  },
  { 
    id: 52, 
    name: "Resistance Bands", 
    category: "Accessories", 
    price: "$15 - $45", 
    rating: 4.4, 
    image: "bg-gradient-to-br from-yellow-400 to-orange-500", 
    variants: [
      { name: "X-Light (5lb)", price: 15 },
      { name: "Light (15lb)", price: 25 },
      { name: "Medium (30lb)", price: 35 },
      { name: "Heavy (50lb)", price: 45 }
    ]
  }, 
  { 
    id: 53, 
    name: "Lifting Belt", 
    category: "Accessories", 
    price: "$50 - $56", 
    rating: 4.7, 
    image: "bg-gradient-to-br from-amber-700 to-amber-900", 
    variants: [
      { name: "S (24-28\")", price: 50 },
      { name: "M (28-32\")", price: 52 },
      { name: "L (32-36\")", price: 54 },
      { name: "XL (36-40\")", price: 56 }
    ]
  },
  { id: 54, name: "Wrist Wraps", category: "Accessories", price: "$15", rating: 4.5, image: "bg-gradient-to-br from-red-500 to-black" },
  { 
    id: 55, 
    name: "Knee Sleeves", 
    category: "Accessories", 
    price: "$40 - $46", 
    rating: 4.8, 
    image: "bg-gradient-to-br from-blue-500 to-blue-700", 
    variants: [
      { name: "S", price: 40 },
      { name: "M", price: 42 },
      { name: "L", price: 44 },
      { name: "XL", price: 46 }
    ]
  },
  { id: 56, name: "Lifting Straps", category: "Accessories", price: "$12", rating: 4.6, image: "bg-gradient-to-br from-gray-800 to-black" },
  { 
    id: 57, 
    name: "Chalk Block", 
    category: "Accessories", 
    price: "$8 - $48", 
    rating: 4.9, 
    image: "bg-gradient-to-br from-white to-gray-200", 
    variants: [
      { name: "Single Block", price: 8 },
      { name: "8-Pack Box", price: 48 }
    ]
  },
  { 
    id: 58, 
    name: "Gym Bag Duffle", 
    category: "Accessories", 
    price: "$45 - $65", 
    rating: 4.5, 
    image: "bg-gradient-to-br from-indigo-600 to-indigo-900", 
    variants: [
      { name: "30L", price: 45 },
      { name: "45L", price: 55 },
      { name: "60L", price: 65 }
    ]
  }, 
  { id: 59, name: "Shaker Bottle", category: "Accessories", price: "$10", rating: 4.4, image: "bg-gradient-to-br from-cyan-400 to-blue-500" },
  { id: 60, name: "Towel Set", category: "Accessories", price: "$20", rating: 4.3, image: "bg-gradient-to-br from-slate-200 to-slate-400" },
  { id: 61, name: "Headband 3-Pack", category: "Accessories", price: "$15", rating: 4.2, image: "bg-gradient-to-br from-pink-300 to-purple-400" },
  { id: 62, name: "Phone Armband", category: "Accessories", price: "$18", rating: 4.1, image: "bg-gradient-to-br from-green-300 to-green-500" },
  { 
    id: 63, 
    name: "Weightlifting Shoes", 
    category: "Accessories", 
    price: "$120 - $130", 
    rating: 4.7, 
    image: "bg-gradient-to-br from-red-600 to-black", 
    variants: [
      { name: "US 7", price: 120 },
      { name: "US 8", price: 122 },
      { name: "US 9", price: 124 },
      { name: "US 10", price: 126 },
      { name: "US 11", price: 128 },
      { name: "US 12", price: 130 }
    ]
  },
  { 
    id: 64, 
    name: "Cross-Training Gloves", 
    category: "Accessories", 
    price: "$25 - $31", 
    rating: 4.4, 
    image: "bg-gradient-to-br from-gray-600 to-gray-800", 
    variants: [
      { name: "S", price: 25 },
      { name: "M", price: 27 },
      { name: "L", price: 29 },
      { name: "XL", price: 31 }
    ]
  },
  { id: 65, name: "Ankle Straps", category: "Accessories", price: "$15", rating: 4.5, image: "bg-gradient-to-br from-purple-400 to-purple-600" },
  { id: 66, name: "Ab Roller", category: "Accessories", price: "$20", rating: 4.6, image: "bg-gradient-to-br from-lime-400 to-lime-600" },
  { id: 67, name: "Push-Up Handles", category: "Accessories", price: "$25", rating: 4.4, image: "bg-gradient-to-br from-sky-400 to-sky-600" },
  { 
    id: 68, 
    name: "Balance Ball", 
    category: "Accessories", 
    price: "$25 - $35", 
    rating: 4.5, 
    image: "bg-gradient-to-br from-fuchsia-400 to-fuchsia-600", 
    variants: [
      { name: "55cm", price: 25 },
      { name: "65cm", price: 30 },
      { name: "75cm", price: 35 }
    ]
  },
  { id: 69, name: "Bosu Ball", category: "Accessories", price: "$110", rating: 4.6, image: "bg-gradient-to-br from-blue-300 to-blue-500" },
  { id: 70, name: "Yoga Block", category: "Accessories", price: "$12", rating: 4.3, image: "bg-gradient-to-br from-purple-300 to-purple-500" },
  { id: 71, name: "Pilates Ring", category: "Accessories", price: "$22", rating: 4.4, image: "bg-gradient-to-br from-pink-400 to-pink-600" },
  { 
    id: 72, 
    name: "Glute Bands", 
    category: "Accessories", 
    price: "$15 - $25", 
    rating: 4.7, 
    image: "bg-gradient-to-br from-rose-300 to-rose-500", 
    variants: [
      { name: "Light", price: 15 },
      { name: "Medium", price: 20 },
      { name: "Heavy", price: 25 }
    ]
  },
  { id: 73, name: "Suspension Trainer", category: "Accessories", price: "$130", rating: 4.8, image: "bg-gradient-to-br from-yellow-300 to-black" },
  { 
    id: 74, 
    name: "Liquid Chalk", 
    category: "Accessories", 
    price: "$12 - $22", 
    rating: 4.6, 
    image: "bg-gradient-to-br from-gray-100 to-gray-300", 
    variants: [
      { name: "50ml", price: 12 },
      { name: "250ml", price: 22 }
    ]
  },
  { id: 75, name: "Neck Harness", category: "Accessories", price: "$30", rating: 4.2, image: "bg-gradient-to-br from-neutral-600 to-black" },

  // --- RECOVERY (Ids 76-100) ---
  { id: 76, name: "Massage Gun", category: "Recovery", price: "$129", rating: 4.5, image: "bg-gradient-to-br from-indigo-500 to-purple-600" },
  { 
    id: 77, 
    name: "Foam Roller", 
    category: "Recovery", 
    price: "$18 - $32", 
    rating: 4.3, 
    image: "bg-gradient-to-br from-pink-500 to-rose-500", 
    variants: [
      { name: "18 Inch", price: 18 },
      { name: "36 Inch", price: 32 }
    ]
  },
  { id: 78, name: "Lacrosse Ball", category: "Recovery", price: "$5", rating: 4.6, image: "bg-gradient-to-br from-red-500 to-red-700" },
  { id: 79, name: "Muscle Scraper", category: "Recovery", price: "$35", rating: 4.4, image: "bg-gradient-to-br from-zinc-300 to-zinc-500" },
  { 
    id: 80, 
    name: "Compression Boots", 
    category: "Recovery", 
    price: "$600 - $650", 
    rating: 4.9, 
    image: "bg-gradient-to-br from-black to-gray-800", 
    variants: [
      { name: "Standard", price: 600 },
      { name: "Tall", price: 650 }
    ]
  },
  { id: 81, name: "Ice Bath Tub", category: "Recovery", price: "$150", rating: 4.7, image: "bg-gradient-to-br from-cyan-200 to-cyan-500" },
  { id: 82, name: "Heating Pad", category: "Recovery", price: "$40", rating: 4.5, image: "bg-gradient-to-br from-orange-300 to-orange-500" },
  { id: 83, name: "Cryo Sphere", category: "Recovery", price: "$30", rating: 4.6, image: "bg-gradient-to-br from-sky-300 to-sky-500" },
  { id: 84, name: "TENS Unit", category: "Recovery", price: "$55", rating: 4.5, image: "bg-gradient-to-br from-green-200 to-green-400" },
  { id: 85, name: "Stretching Strap", category: "Recovery", price: "$15", rating: 4.4, image: "bg-gradient-to-br from-purple-300 to-purple-500" },
  { id: 86, name: "Massage Stick", category: "Recovery", price: "$20", rating: 4.3, image: "bg-gradient-to-br from-teal-300 to-teal-500" },
  { id: 87, name: "Percussion Mini", category: "Recovery", price: "$80", rating: 4.5, image: "bg-gradient-to-br from-blue-400 to-blue-600" },
  { 
    id: 88, 
    name: "Epsom Salts", 
    category: "Recovery", 
    price: "$10 - $25", 
    rating: 4.8, 
    image: "bg-gradient-to-br from-white to-gray-100", 
    variants: [
      { name: "1kg Bag", price: 10 },
      { name: "3kg Bag", price: 25 }
    ]
  },
  { 
    id: 89, 
    name: "Whey Protein", 
    category: "Recovery", 
    price: "$60 - $130", 
    rating: 4.7, 
    image: "bg-gradient-to-br from-stone-700 to-stone-900", 
    variants: [
      { name: "Chocolate (2kg)", price: 60 },
      { name: "Vanilla (2kg)", price: 60 },
      { name: "Strawberry (2kg)", price: 60 },
      { name: "Chocolate (5kg)", price: 130 }
    ]
  },
  { 
    id: 90, 
    name: "Creatine Mono", 
    category: "Recovery", 
    price: "$35 - $38", 
    rating: 4.9, 
    image: "bg-gradient-to-br from-blue-700 to-blue-900", 
    variants: [
      { name: "Unflavored (500g)", price: 35 },
      { name: "Fruit Punch (500g)", price: 38 }
    ]
  },
  { 
    id: 91, 
    name: "BCAA Powder", 
    category: "Recovery", 
    price: "$30 - $32", 
    rating: 4.4, 
    image: "bg-gradient-to-br from-lime-400 to-lime-600", 
    variants: [
      { name: "Watermelon (30 servings)", price: 30 },
      { name: "Blue Razz (30 servings)", price: 32 }
    ]
  },
  { 
    id: 92, 
    name: "Pre-Workout", 
    category: "Recovery", 
    price: "$45 - $48", 
    rating: 4.6, 
    image: "bg-gradient-to-br from-red-600 to-red-800", 
    variants: [
      { name: "Grape", price: 45 },
      { name: "Fruit Punch", price: 45 },
      { name: "Sour Apple", price: 48 }
    ]
  },
  { 
    id: 93, 
    name: "Multivitamin", 
    category: "Recovery", 
    price: "$25 - $45", 
    rating: 4.5, 
    image: "bg-gradient-to-br from-green-500 to-green-700", 
    variants: [
      { name: "60 Caps", price: 25 },
      { name: "120 Caps", price: 45 }
    ]
  },
  { id: 94, name: "Sleep Aid", category: "Recovery", price: "$20", rating: 4.3, image: "bg-gradient-to-br from-indigo-800 to-purple-900" },
  { 
    id: 95, 
    name: "Fish Oil", 
    category: "Recovery", 
    price: "$18 - $30", 
    rating: 4.5, 
    image: "bg-gradient-to-br from-yellow-300 to-amber-500", 
    variants: [
      { name: "1000mg (100ct)", price: 18 },
      { name: "1000mg (200ct)", price: 30 }
    ]
  },
  { id: 96, name: "Peanut Ball", category: "Recovery", price: "$12", rating: 4.4, image: "bg-gradient-to-br from-red-400 to-red-600" },
  { id: 97, name: "Vibrating Roller", category: "Recovery", price: "$90", rating: 4.6, image: "bg-gradient-to-br from-violet-500 to-violet-700" },
  { id: 98, name: "Acupressure Mat", category: "Recovery", price: "$35", rating: 4.2, image: "bg-gradient-to-br from-emerald-500 to-emerald-700" },
  { 
    id: 99, 
    name: "Kinesiology Tape", 
    category: "Recovery", 
    price: "$15", 
    rating: 4.5, 
    image: "bg-gradient-to-br from-cyan-400 to-blue-500", 
    variants: [
      { name: "Black", price: 15 },
      { name: "Blue", price: 15 },
      { name: "Beige", price: 15 },
      { name: "Pink", price: 15 }
    ]
  },
  { id: 100, name: "Foam Yoga Roller", category: "Recovery", price: "$22", rating: 4.4, image: "bg-gradient-to-br from-fuchsia-300 to-fuchsia-500" },
];