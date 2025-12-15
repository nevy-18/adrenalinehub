export const Product = [
  // =========================================
  // --- STRENGTH (Ids 1-25) ---
  // =========================================
  { 
    id: 1, 
    name: "Olympic Barbell", 
    category: "Strength", 
    price: "$299", 
    rating: 4.9, 
    image: "images/Olympic_Barbell.jpg",
    variants: [
      { name: "Hard Chrome", price: 299, image: "images/Olympic_Barbell.jpg" },
      { name: "Black Zinc", price: 319, image: "images/Olympic_Barbell.jpg" },
      { name: "Cerakote Red", price: 349, image: "images/Olympic_Barbell.jpg" }
    ]
  },
  { 
    id: 2, 
    name: "Power Rack", 
    category: "Strength", 
    price: "$699", 
    rating: 4.8, 
    image: "images/Power_Rack.jpg",
    variants: [
      { name: "Standard (Red/Black)", price: 699, image: "images/Power_Rack.jpg" },
      { name: "All Black Stealth", price: 749, image: "images/Power_Rack.jpg" }
    ]
  },
  { 
    id: 3, 
    name: "Kettlebell Set", 
    category: "Strength", 
    price: "$150", 
    rating: 4.8, 
    image: "images/Kettlebell Set.jpg",
    variants: [
      { name: "Starter Set (10-25lb)", price: 150, image: "images/Kettlebell Set.jpg" },
      { name: "Pro Set (35-50lb)", price: 250, image: "images/Kettlebell Set.jpg" }
    ]
  },
  { 
    id: 4, 
    name: "Adjustable Bench", 
    category: "Strength", 
    price: "$250", 
    rating: 4.7, 
    image: "images/Adjustable Bench.jpg",
    variants: [
      { name: "Matte Black", price: 250, image: "images/Adjustable Bench.jpg" },
      { name: "Gloss Red", price: 250, image: "images/Adjustable Bench.jpg" }
    ]
  },
  { 
    id: 5, 
    name: "Dumbbell Set (5-50lbs)", 
    category: "Strength", 
    price: "$599", 
    rating: 4.9, 
    image: "images/Dumbell Set.jpg",
    variants: [
      { name: "Rubber Hex", price: 599, image: "images/Dumbell Set.jpg" },
      { name: "Urethane Pro", price: 799, image: "images/Dumbell Set.jpg" }
    ]
  },
  { id: 6, name: "Squat Stand", category: "Strength", price: "$350", rating: 4.6, image: "images/Squat Stand.jpg", variants: [] },
  { id: 7, name: "Hex Trap Bar", category: "Strength", price: "$180", rating: 4.7, image: "images/Hex Trap Bar.jpg", variants: [] },
  { id: 8, name: "Bumper Plates Set", category: "Strength", price: "$400", rating: 4.8, image: "images/Bumper Plates Set.jpg", variants: [{name: "Black Rubber", price: 400}, {name: "Color Competition", price: 550}] },
  { id: 9, name: "Dip Station", category: "Strength", price: "$120", rating: 4.5, image: "images/Dip Station.jpg", variants: [] },
  { id: 10, name: "Pull-Up Bar", category: "Strength", price: "$45", rating: 4.4, image: "images/Pull-Up Bar.jpg", variants: [] },
  { id: 11, name: "Smith Machine", category: "Strength", price: "$1200", rating: 4.6, image: "images/Smith Machine.jpg", variants: [] },
  { id: 12, name: "Leg Press Machine", category: "Strength", price: "$1500", rating: 4.9, image: "images/Leg Press Machine.jpg", variants: [] },
  { id: 13, name: "Cable Crossover", category: "Strength", price: "$1800", rating: 4.8, image: "images/Cable Crossover.jpg", variants: [] },
  { id: 14, name: "Preacher Curl Bench", category: "Strength", price: "$220", rating: 4.5, image: "images/Preacher Curl Bench.jpg", variants: [] },
  { id: 15, name: "Medicine Ball Set", category: "Strength", price: "$90", rating: 4.6, image: "images/Medicine Ball Set.jpg", variants: [{name: "10lb & 14lb", price: 90}, {name: "20lb & 30lb", price: 140}] },
  { id: 16, name: "Battle Ropes", category: "Strength", price: "$80", rating: 4.7, image: "images/Battle Ropes.jpg", variants: [{name: "30ft Length", price: 80}, {name: "50ft Length", price: 110}] },
  { id: 17, name: "Weight Vest 20lb", category: "Strength", price: "$65", rating: 4.5, image: "images/Weight_Vest_20lb.jpg", variants: [{name: "Camo", price: 65}, {name: "Black", price: 65}] },
  { id: 18, name: "Landmine Attachment", category: "Strength", price: "$35", rating: 4.4, image: "images/Landmine Attachment.jpg", variants: [] },
  { id: 19, name: "EZ Curl Bar", category: "Strength", price: "$75", rating: 4.6, image: "images/EZ Curl Bar.jpg", variants: [{name: "Chrome", price: 75}, {name: "Black Oxide", price: 85}] },
  { id: 20, name: "Plate Tree", category: "Strength", price: "$85", rating: 4.3, image: "images/Plate Tree.jpg", variants: [] },
  { id: 21, name: "Calf Raise Block", category: "Strength", price: "$40", rating: 4.2, image: "images/Calf Raise Block.jpg", variants: [] },
  { id: 22, name: "Power Tower", category: "Strength", price: "$180", rating: 4.5, image: "images/Power Tower.jpg", variants: [] },
  { id: 23, name: "Sled Push", category: "Strength", price: "$250", rating: 4.7, image: "images/Sled Push.jpg", variants: [] },
  { id: 24, name: "Sandbag Trainer", category: "Strength", price: "$55", rating: 4.4, image: "images/Sandbag_Trainer.jpg", variants: [{name: "Small (up to 50lbs)", price: 55}, {name: "Large (up to 100lbs)", price: 75}] },
  { id: 25, name: "Grip Strengthener", category: "Strength", price: "$15", rating: 4.1, image: "images/Grip Strengthener.jpg", variants: [{name: "100lbs", price: 15}, {name: "150lbs", price: 15}, {name: "200lbs", price: 15}] },

  // =========================================
  // --- CARDIO (Ids 26-50) ---
  // =========================================
  { 
    id: 26, 
    name: "Elite Treadmill", 
    category: "Cardio", 
    price: "$1,499", 
    rating: 4.7, 
    image: "images/Elite Treadmill.jpg",
    variants: [
      { name: "Standard", price: 1499, image: "images/Elite Treadmill.jpg" },
      { name: "Pro Bundle (+Mat & Lube)", price: 1550, image: "images/Elite Treadmill.jpg" }
    ]
  },
  { 
    id: 27, 
    name: "Rowing Machine", 
    category: "Cardio", 
    price: "$899", 
    rating: 4.9, 
    image: "images/Rowing Machine.jpg",
    variants: [
        { name: "Black Edition", price: 899, image: "images/Rowing Machine.jpg" },
        { name: "Silver Edition", price: 899, image: "images/Rowing Machine.jpg" }
    ]
  },
  { id: 28, name: "Air Bike", category: "Cardio", price: "$799", rating: 4.8, image: "images/Air Bike.jpg", variants: [] },
  { id: 29, name: "Spin Bike Pro", category: "Cardio", price: "$650", rating: 4.6, image: "images/Spin Bike Pro.jpg", variants: [{name: "Red Accent", price: 650}, {name: "Yellow Accent", price: 650}] },
  { id: 30, name: "Elliptical Trainer", category: "Cardio", price: "$950", rating: 4.5, image: "images/Elliptical Trainer.jpg", variants: [] },
  { id: 31, name: "Stair Climber", category: "Cardio", price: "$2200", rating: 4.8, image: "images/Stair Climber.jpg", variants: [] },
  { id: 32, name: "Curved Treadmill", category: "Cardio", price: "$3000", rating: 4.9, image: "images/Curved Treadmill.jpg", variants: [] },
  { id: 33, name: "Ski Ergometer", category: "Cardio", price: "$850", rating: 4.7, image: "images/Ski Ergometer.jpg", variants: [{name: "Wall Mounted", price: 850}, {name: "With Stand", price: 999}] },
  { id: 34, name: "Recumbent Bike", category: "Cardio", price: "$550", rating: 4.4, image: "images/Recumbent Bike.jpg", variants: [] },
  { id: 35, name: "Vertical Climber", category: "Cardio", price: "$350", rating: 4.5, image: "images/Vertical Climber.jpg", variants: [] },
  { id: 36, name: "Jump Rope Speed", category: "Cardio", price: "$15", rating: 4.8, image: "images/Jump Rope Speed.jpg", variants: [{name: "Black", price: 15}, {name: "Red", price: 15}, {name: "Blue", price: 15}] },
  { id: 37, name: "Weighted Jump Rope", category: "Cardio", price: "$25", rating: 4.6, image: "images/Weighted Jump Rope.jpg", variants: [{name: "1 LB", price: 25}, {name: "2 LB", price: 35}] },
  { id: 38, name: "Agility Ladder", category: "Cardio", price: "$20", rating: 4.5, image: "images/Agility Ladder.jpg", variants: [] },
  { id: 39, name: "Plyo Box Set", category: "Cardio", price: "$180", rating: 4.7, image: "images/Plyo Box Set.jpg", variants: [{name: "Wood", price: 180}, {name: "Soft Foam", price: 220}] },
  { id: 40, name: "Slide Board", category: "Cardio", price: "$60", rating: 4.3, image: "images/Slide_Board.jpg", variants: [] },
  { id: 41, name: "Mini Stepper", category: "Cardio", price: "$55", rating: 4.2, image: "images/Mini Stepper.jpg", variants: [] },
  { id: 42, name: "Under Desk Elliptical", category: "Cardio", price: "$120", rating: 4.4, image: "images/Under Desk Elliptical.jpg", variants: [] },
  { id: 43, name: "Folding Treadmill", category: "Cardio", price: "$450", rating: 4.3, image: "images/Folding Treadmill.jpg", variants: [] },
  { id: 44, name: "Water Rower", category: "Cardio", price: "$1100", rating: 4.8, image: "images/Water Rower.jpg", variants: [{name: "Oak Wood", price: 1100}, {name: "Ash Wood", price: 1150}] },
  { id: 45, name: "Assault Bike", category: "Cardio", price: "$850", rating: 4.7, image: "images/Assault Bike.jpg", variants: [] },
  { id: 46, name: "Cardio Trampoline", category: "Cardio", price: "$80", rating: 4.5, image: "images/Cardio Trampoline.jpg", variants: [] },
  { id: 47, name: "Running Parachute", category: "Cardio", price: "$20", rating: 4.1, image: "images/Running Parachute.jpg", variants: [] },
  { id: 48, name: "Heart Rate Monitor", category: "Cardio", price: "$50", rating: 4.6, image: "images/Heart Rate Monitor.jpg", variants: [] },
  { id: 49, name: "Stopwatch Pro", category: "Cardio", price: "$15", rating: 4.4, image: "images/Stopwatch Pro.jpg", variants: [] },
  { id: 50, name: "Step Platform", category: "Cardio", price: "$45", rating: 4.5, image: "images/Step Platform.jpg", variants: [{name: "Black/Grey", price: 45}, {name: "Teal/White", price: 45}] },

  // =========================================
  // --- ACCESSORIES (Ids 51-75) ---
  // =========================================
  { 
    id: 51, 
    name: "Yoga Mat Pro", 
    category: "Accessories", 
    price: "$35 - $55", 
    rating: 4.6, 
    image: "images/Yoga Mat Pro.jpg",
    variants: [
      { name: "Standard 6mm", price: 35, image: "images/Yoga Mat Pro.jpg" },
      { name: "Extra Thick 10mm", price: 45, image: "images/Yoga Mat Pro.jpg" },
      { name: "Premium Cork", price: 55, image: "images/Yoga Mat Pro.jpg" }
    ]
  },
  { 
    id: 52, 
    name: "Resistance Bands", 
    category: "Accessories", 
    price: "$15 - $45", 
    rating: 4.4, 
    image: "images/Resistance Bands.jpg",
    variants: [
      { name: "Light (Red)", price: 15, image: "images/Resistance Bands.jpg" },
      { name: "Medium (Purple)", price: 25, image: "images/Resistance Bands.jpg" },
      { name: "Heavy (Green)", price: 35, image: "images/Resistance Bands.jpg" },
      { name: "Set of 3", price: 45, image: "images/Resistance Bands.jpg" }
    ]
  },
  { 
    id: 53, 
    name: "Lifting Belt", 
    category: "Accessories", 
    price: "$50 - $56", 
    rating: 4.7, 
    image: "images/Lifting Belt.jpg",
    variants: [
      { name: "Small (24-30\")", price: 50, image: "images/Lifting Belt.jpg" },
      { name: "Medium (30-36\")", price: 50, image: "images/Lifting Belt.jpg" },
      { name: "Large (36-42\")", price: 50, image: "images/Lifting Belt.jpg" },
      { name: "Leather Pro", price: 56, image: "images/Lifting Belt.jpg" }
    ]
  },
  { id: 54, name: "Wrist Wraps", category: "Accessories", price: "$15", rating: 4.5, image: "images/Wrist Wraps.jpg", variants: [{name: "Red Line", price: 15}, {name: "Blue Line", price: 15}] },
  { 
    id: 55, 
    name: "Knee Sleeves", 
    category: "Accessories", 
    price: "$40 - $46", 
    rating: 4.8, 
    image: "images/Knee Sleeves.jpg",
    variants: [
        { name: "Small", price: 40, image: "images/Knee Sleeves.jpg" },
        { name: "Medium", price: 40, image: "images/Knee Sleeves.jpg" },
        { name: "Large", price: 40, image: "images/Knee Sleeves.jpg" },
        { name: "Extra Thick (7mm)", price: 46, image: "images/Knee Sleeves.jpg" }
    ]
  },
  { id: 56, name: "Lifting Straps", category: "Accessories", price: "$12", rating: 4.6, image: "images/Lifting Straps.jpg", variants: [{name: "Cotton", price: 12}, {name: "Nylon", price: 15}] },
  { id: 57, name: "Chalk Block", category: "Accessories", price: "$8 - $48", rating: 4.9, image: "images/Chalk Block.jpg", variants: [{name: "Single Block", price: 8}, {name: "Box of 8", price: 48}] },
  { id: 58, name: "Gym Bag Duffle", category: "Accessories", price: "$45 - $65", rating: 4.5, image: "images/Gym Bag Duffle.jpg", variants: [{name: "Standard 40L", price: 45}, {name: "Large 60L", price: 65}] },
  { id: 59, name: "Shaker Bottle", category: "Accessories", price: "$10", rating: 4.4, image: "images/Shaker Bottle.jpg", variants: [{name: "Black", price: 10}, {name: "Clear", price: 10}, {name: "Neon Blue", price: 10}] },
  { id: 60, name: "Towel Set", category: "Accessories", price: "$20", rating: 4.3, image: "images/Towel Set.jpg", variants: [] },
  { id: 61, name: "Headband 3-Pack", category: "Accessories", price: "$15", rating: 4.2, image: "images/Headband 3-Pack.jpg", variants: [] },
  { id: 62, name: "Phone Armband", category: "Accessories", price: "$18", rating: 4.1, image: "images/Phone Armband.jpg", variants: [] },
  { id: 63, name: "Weightlifting Shoes", category: "Accessories", price: "$120 - $130", rating: 4.7, image: "images/Weightlifting Shoes.jpg", variants: [{name: "Size 8", price: 120}, {name: "Size 9", price: 120}, {name: "Size 10", price: 120}, {name: "Pro Edition", price: 130}] },
  { id: 64, name: "Cross-Training Gloves", category: "Accessories", price: "$25 - $31", rating: 4.4, image: "images/Cross-Training Gloves.jpg", variants: [{name: "Small", price: 25}, {name: "Medium", price: 25}, {name: "Large", price: 25}] },
  { id: 65, name: "Ankle Straps", category: "Accessories", price: "$15", rating: 4.5, image: "images/Ankle Straps.jpg", variants: [] },
  { id: 66, name: "Ab Roller", category: "Accessories", price: "$20", rating: 4.6, image: "images/Ab Roller.jpg", variants: [{name: "Standard", price: 20}, {name: "Wide Wheel", price: 28}] },
  { id: 67, name: "Push-Up Handles", category: "Accessories", price: "$25", rating: 4.4, image: "images/Push-Up Handles.jpg", variants: [] },
  { id: 68, name: "Balance Ball", category: "Accessories", price: "$25 - $35", rating: 4.5, image: "images/Balance Ball.jpg", variants: [{name: "55cm", price: 25}, {name: "65cm", price: 30}, {name: "75cm", price: 35}] },
  { id: 69, name: "Bosu Ball", category: "Accessories", price: "$110", rating: 4.6, image: "images/Bosu Ball.jpg", variants: [] },
  { id: 70, name: "Yoga Block", category: "Accessories", price: "$12", rating: 4.3, image: "images/Yoga Block.jpg", variants: [{name: "Purple", price: 12}, {name: "Blue", price: 12}] },
  { id: 71, name: "Pilates Ring", category: "Accessories", price: "$22", rating: 4.4, image: "images/Pilates Ring.jpg", variants: [] },
  { id: 72, name: "Glute Bands", category: "Accessories", price: "$15 - $25", rating: 4.7, image: "images/Glute Bands.jpg", variants: [{name: "Light/Medium", price: 15}, {name: "Heavy/X-Heavy", price: 15}, {name: "Set of 3", price: 25}] },
  { id: 73, name: "Suspension Trainer", category: "Accessories", price: "$130", rating: 4.8, image: "images/Suspension Trainer.jpg", variants: [] },
  { id: 74, name: "Liquid Chalk", category: "Accessories", price: "$12 - $22", rating: 4.6, image: "images/Liquid Chalk.jpg", variants: [{name: "50ml", price: 12}, {name: "250ml", price: 22}] },
  { id: 75, name: "Neck Harness", category: "Accessories", price: "$30", rating: 4.2, image: "images/Neck Harness.jpg", variants: [] },

  // =========================================
  // --- RECOVERY (Ids 76-100) ---
  // =========================================
  { 
    id: 76, 
    name: "Massage Gun", 
    category: "Recovery", 
    price: "$129", 
    rating: 4.5, 
    image: "images/Massage Gun.jpg",
    variants: [
        { name: "Matte Black", price: 129, image: "images/Massage Gun.jpg" },
        { name: "Carbon Fiber", price: 149, image: "images/Massage Gun.jpg" }
    ]
  },
  { id: 77, name: "Foam Roller", category: "Recovery", price: "$18 - $32", rating: 4.3, image: "images/Foam Roller.jpg", variants: [{name: "Smooth 18\"", price: 18}, {name: "Rumbled 18\"", price: 24}, {name: "Smooth 36\"", price: 32}] },
  { id: 78, name: "Lacrosse Ball", category: "Recovery", price: "$5", rating: 4.6, image: "images/Lacrosse Ball.jpg", variants: [] },
  { id: 79, name: "Muscle Scraper", category: "Recovery", price: "$35", rating: 4.4, image: "images/Muscle Scraper.jpg", variants: [] },
  { id: 80, name: "Compression Boots", category: "Recovery", price: "$600 - $650", rating: 4.9, image: "images/Compression Boots.jpg", variants: [{name: "Standard", price: 600}, {name: "Pro (Battery Powered)", price: 650}] },
  { id: 81, name: "Ice Bath Tub", category: "Recovery", price: "$150", rating: 4.7, image: "images/Ice Bath Tub.jpg", variants: [] },
  { id: 82, name: "Heating Pad", category: "Recovery", price: "$40", rating: 4.5, image: "images/Heating Pad.jpg", variants: [] },
  { id: 83, name: "Cryo Sphere", category: "Recovery", price: "$30", rating: 4.6, image: "images/Cryo Sphere.jpg", variants: [] },
  { id: 84, name: "TENS Unit", category: "Recovery", price: "$55", rating: 4.5, image: "images/TENS Unit.jpg", variants: [] },
  { id: 85, name: "Stretching Strap", category: "Recovery", price: "$15", rating: 4.4, image: "images/Stretching Strap.jpg", variants: [] },
  { id: 86, name: "Massage Stick", category: "Recovery", price: "$20", rating: 4.3, image: "images/Massage_Stick.jpg", variants: [] },
  { id: 87, name: "Percussion Mini", category: "Recovery", price: "$80", rating: 4.5, image: "images/Percussion Mini.jpg", variants: [{name: "Red", price: 80}, {name: "Black", price: 80}] },
  { id: 88, name: "Epsom Salts", category: "Recovery", price: "$10 - $25", rating: 4.8, image: "images/Epsom Salts.jpg", variants: [{name: "2lb Bag", price: 10}, {name: "8lb Bag", price: 25}] },
  { 
    id: 89, 
    name: "Whey Protein", 
    category: "Recovery", 
    price: "$60 - $130", 
    rating: 4.7, 
    image: "images/Whey Protein.jpg",
    variants: [
        { name: "Double Rich Chocolate (2lb)", price: 60, image: "images/Whey Protein.jpg" },
        { name: "Vanilla Ice Cream (2lb)", price: 60, image: "images/Whey Protein.jpg" },
        { name: "Strawberry (2lb)", price: 60, image: "images/Whey Protein.jpg" },
        { name: "Chocolate (5lb)", price: 130, image: "images/Whey Protein.jpg" }
    ]
  },
  { 
    id: 90, 
    name: "Creatine Mono", 
    category: "Recovery", 
    price: "$35 - $38", 
    rating: 4.9, 
    image: "images/Creatine Mono.jpg",
    variants: [
        { name: "Unflavored", price: 35, image: "images/Creatine Mono.jpg" },
        { name: "Fruit Punch", price: 38, image: "images/Creatine Mono.jpg" }
    ]
  },
  { 
    id: 91, 
    name: "BCAA Powder", 
    category: "Recovery", 
    price: "$30 - $32", 
    rating: 4.4, 
    image: "images/BCAA Powder.jpg",
    variants: [
        { name: "Watermelon", price: 30, image: "images/BCAA Powder.jpg" },
        { name: "Blue Raspberry", price: 30, image: "images/BCAA Powder.jpg" },
        { name: "Lemon Lime", price: 30, image: "images/BCAA Powder.jpg" }
    ]
  },
  { 
    id: 92, 
    name: "Pre-Workout", 
    category: "Recovery", 
    price: "$45 - $48", 
    rating: 4.6, 
    image: "images/Pre-Workout.jpg",
    variants: [
        { name: "Green Apple", price: 45, image: "images/Pre-Workout.jpg" },
        { name: "Blue Razz", price: 45, image: "images/Pre-Workout.jpg" },
        { name: "High Stim Edition", price: 48, image: "images/Pre-Workout.jpg" }
    ]
  },
  { 
    id: 93, 
    name: "Multivitamin", 
    category: "Recovery", 
    price: "$25 - $45", 
    rating: 4.5, 
    image: "images/Multivitamin.jpg",
    variants: [
        { name: "60 Capsules", price: 25, image: "images/Multivitamin.jpg" },
        { name: "120 Capsules", price: 45, image: "images/Multivitamin.jpg" }
    ]
  },
  { id: 94, name: "Sleep Aid", category: "Recovery", price: "$20", rating: 4.3, image: "images/Sleep Aid.jpg", variants: [] },
  { id: 95, name: "Fish Oil", category: "Recovery", price: "$18 - $30", rating: 4.5, image: "images/Fish Oil.jpg", variants: [{name: "Standard", price: 18}, {name: "High EPA/DHA", price: 30}] },
  { id: 96, name: "Peanut Ball", category: "Recovery", price: "$12", rating: 4.4, image: "images/Peanut Ball.jpg", variants: [] },
  { id: 97, name: "Vibrating Roller", category: "Recovery", price: "$90", rating: 4.6, image: "images/Vibrating Roller.jpg", variants: [] },
  { id: 98, name: "Acupressure Mat", category: "Recovery", price: "$35", rating: 4.2, image: "images/Acupressure Mat.jpg", variants: [{name: "Black", price: 35}, {name: "Green", price: 35}] },
  { id: 99, name: "Kinesiology Tape", category: "Recovery", price: "$15", rating: 4.5, image: "images/Kinesiology Tape.jpg", variants: [{name: "Black", price: 15}, {name: "Beige", price: 15}, {name: "Blue", price: 15}] },
  { id: 100, name: "Foam Yoga Roller", category: "Recovery", price: "$22", rating: 4.4, image: "images/Foam Yoga Roller.jpg", variants: [] },
];