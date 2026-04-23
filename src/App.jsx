import { useState, useRef, useEffect, useMemo } from "react";

/* ─── CATEGORIES ─── */
const CATEGORIES = [
  { id:"all",      label:"All Items",        icon:"❄"  },
  { id:"shakes",   label:"Milkshakes",       icon:"🥤" },
  { id:"cold",     label:"Cold Drinks",      icon:"🧊" },
  { id:"hot",      label:"Hot Beverages",    icon:"☕" },
  { id:"icecream", label:"Ice Cream",        icon:"🍦" },
  { id:"snacks",   label:"Snacks & Food",    icon:"🍴" },
];

/* ─── SIGNATURE ─── */
const SIGNATURE = {
  id:"sig", name:"Kesar Pista Shake", badge:"Signature of the Day",
  shortDesc:"Premium saffron & pistachio milkshake — rich, royal & refreshing",
  description:"Our crown jewel. Thick, creamy milkshake crafted with real Kesar (saffron) and crushed pistachios blended into chilled full-fat milk. Garnished with saffron strands and crushed pista. A regal indulgence for every visit.",
  price:100, category:"shakes", tag:"PREMIUM",
  ingredients:["Full-Fat Chilled Milk","Real Kesar (Saffron)","Crushed Pistachios","Kesar Ice Cream","Sugar","Cardamom","Dry Rose Petals","Chilled Ice"],
  visual:{ colors:["#78350f","#d97706","#4ade80"], icon:"🌿", glow:"#d97706" },
};

/* ─── FULL MENU ─── */
const MENU = [
  // MILKSHAKES
  { id:"sh1",  name:"Vanilla Shake",          category:"shakes",   price:60,  tag:"CLASSIC",
    shortDesc:"Smooth, creamy classic vanilla milkshake",
    description:"A timeless classic — thick vanilla milkshake blended with premium vanilla ice cream and chilled milk. Smooth, sweet and perfect every time.",
    ingredients:["Vanilla Ice Cream","Chilled Milk","Sugar","Vanilla Essence","Whipped Cream"],
    visual:{ colors:["#78350f","#fef3c7","#fde68a"], icon:"🍦", glow:"#fbbf24" } },
  { id:"sh2",  name:"Pineapple Shake",         category:"shakes",   price:60,
    shortDesc:"Tropical pineapple blended into a thick milkshake",
    description:"Fresh pineapple chunks blended into a sweet and tangy milkshake with a hint of cream. Tropical, refreshing and the perfect summer treat.",
    ingredients:["Fresh Pineapple","Chilled Milk","Sugar","Vanilla Ice Cream","Pineapple Essence"],
    visual:{ colors:["#365314","#4d7c0f","#d9f99d"], icon:"🍍", glow:"#84cc16" } },
  { id:"sh3",  name:"Strawberry Shake",        category:"shakes",   price:60,
    shortDesc:"Fresh strawberry blended into thick creamy milkshake",
    description:"Vibrant and fruity — fresh strawberry pulp blended with strawberry ice cream and full-fat chilled milk. Served cold with a strawberry on the rim.",
    ingredients:["Fresh Strawberry Pulp","Strawberry Ice Cream","Chilled Milk","Sugar","Whipped Cream"],
    visual:{ colors:["#7f1d1d","#f43f5e","#fda4af"], icon:"🍓", glow:"#f43f5e" } },
  { id:"sh4",  name:"Butterscotch Shake",      category:"shakes",   price:70,
    shortDesc:"Rich butterscotch drizzle milkshake with crunchy bits",
    description:"Indulgent butterscotch milkshake loaded with butterscotch ice cream, a generous drizzle of golden butterscotch sauce and crunchy caramel bits.",
    ingredients:["Butterscotch Ice Cream","Chilled Milk","Butterscotch Sauce","Caramel Bits","Whipped Cream"],
    visual:{ colors:["#78350f","#b45309","#fbbf24"], icon:"🍯", glow:"#f59e0b" } },
  { id:"sh5",  name:"Chocolate Shake",         category:"shakes",   price:70,
    shortDesc:"Deep dark chocolate milkshake — chocoholic's dream",
    description:"Intense chocolate milkshake made with rich cocoa, chocolate ice cream and chilled milk. Topped with chocolate syrup drizzle.",
    ingredients:["Chocolate Ice Cream","Cocoa Powder","Chilled Milk","Chocolate Syrup","Whipped Cream"],
    visual:{ colors:["#1c0a00","#78350f","#92400e"], icon:"🍫", glow:"#92400e" } },
  { id:"sh6",  name:"Black Currant Shake",     category:"shakes",   price:70,
    shortDesc:"Bold black currant milkshake — tangy meets sweet",
    description:"Black currant ice cream blended with chilled milk. Deep purple hue with a perfect balance of tangy and sweet.",
    ingredients:["Black Currant Ice Cream","Chilled Milk","Black Currant Syrup","Sugar","Whipped Cream"],
    visual:{ colors:["#3b0764","#6d28d9","#a78bfa"], icon:"🫐", glow:"#7c3aed" } },
  { id:"sh7",  name:"Nutella Shake",           category:"shakes",   price:90,  tag:"POPULAR",
    shortDesc:"Creamy Nutella hazelnut shake — irresistibly rich",
    description:"Real Nutella blended into chilled milk with a scoop of chocolate ice cream. Thick, hazelnutty and absolutely irresistible.",
    ingredients:["Nutella","Chilled Milk","Chocolate Ice Cream","Hazelnut Syrup","Whipped Cream","Cocoa Dusting"],
    visual:{ colors:["#1c0a00","#92400e","#b45309"], icon:"🍫", glow:"#b45309" } },
  { id:"sh8",  name:"Oreo Shake",              category:"shakes",   price:90,
    shortDesc:"Crushed Oreo cookies blended into creamy milkshake",
    description:"Crushed Oreo cookies blended with vanilla ice cream and chilled milk. Topped with whipped cream and Oreo crumble.",
    ingredients:["Oreo Cookies","Vanilla Ice Cream","Chilled Milk","Sugar","Whipped Cream","Oreo Crumble"],
    visual:{ colors:["#1e1b4b","#312e81","#6366f1"], icon:"🍪", glow:"#6366f1" } },
  { id:"sh9",  name:"Mango Shake",             category:"shakes",   price:70,  tag:"SEASONAL",
    shortDesc:"Thick Alphonso mango milkshake — sweet & tropical",
    description:"Made with ripe Alphonso mango pulp blended with mango ice cream and creamy chilled milk.",
    ingredients:["Alphonso Mango Pulp","Mango Ice Cream","Chilled Milk","Sugar","Cardamom"],
    visual:{ colors:["#78350f","#d97706","#fcd34d"], icon:"🥭", glow:"#f59e0b" } },
  { id:"sh10", name:"Badam Shake",             category:"shakes",   price:100, tag:"PREMIUM",
    shortDesc:"Thick almond milkshake with soaked almonds & cardamom",
    description:"Premium Badam shake made with overnight-soaked almonds, blended with chilled milk, saffron and cardamom.",
    ingredients:["Soaked Almonds (Badam)","Chilled Milk","Saffron","Cardamom","Sugar","Kesar Ice Cream"],
    visual:{ colors:["#78350f","#d97706","#fef3c7"], icon:"🌰", glow:"#d97706" } },
  { id:"sh11", name:"Kaaju Kishmish Shake",    category:"shakes",   price:100, tag:"PREMIUM",
    shortDesc:"Cashew & raisin milkshake — rich & subtly sweet",
    description:"A premium milkshake blended with soaked cashews and raisins in chilled milk with a hint of rose water.",
    ingredients:["Cashews (Kaju)","Raisins (Kishmish)","Chilled Milk","Rose Water","Sugar","Vanilla Ice Cream"],
    visual:{ colors:["#78350f","#92400e","#fde68a"], icon:"🥜", glow:"#f59e0b" } },
  { id:"sh12", name:"Banana Shake",            category:"shakes",   price:50,
    shortDesc:"Classic banana milkshake — thick & naturally sweet",
    description:"Ripe bananas blended with chilled milk and a scoop of vanilla ice cream. Naturally sweet, thick and creamy.",
    ingredients:["Ripe Bananas","Chilled Milk","Vanilla Ice Cream","Sugar","Honey"],
    visual:{ colors:["#713f12","#ca8a04","#fef08a"], icon:"🍌", glow:"#eab308" } },
  { id:"sh13", name:"Papaya Fruit Shake",      category:"shakes",   price:70,
    shortDesc:"Fresh ripe papaya blended into smooth milkshake",
    description:"Sweet ripe papaya blended with chilled milk and a scoop of vanilla ice cream. A tropical, gut-friendly treat.",
    ingredients:["Ripe Papaya","Chilled Milk","Vanilla Ice Cream","Sugar","Lemon Drops"],
    visual:{ colors:["#7c2d12","#ea580c","#fed7aa"], icon:"🍈", glow:"#f97316" } },
  { id:"sh14", name:"Mango Fruit Shake",       category:"shakes",   price:60,
    shortDesc:"Pure mango fruit shake — thick, fresh & fruity",
    description:"Pure fresh mango pulp blended into a thick shake. Less milk, more mango — for those who love the real fruit taste.",
    ingredients:["Fresh Mango Pulp","Chilled Milk","Sugar","Ice","Cardamom"],
    visual:{ colors:["#78350f","#b45309","#fde68a"], icon:"🥭", glow:"#f59e0b" } },

  // COLD DRINKS — CHILLED COFFEES
  { id:"cc1",  name:"Classic Cold Coffee",             category:"cold", price:60,
    shortDesc:"Classic chilled coffee — smooth & bold, no ice cream",
    description:"Rich brewed coffee blended with chilled milk, ice and a touch of sugar. Clean, smooth and refreshing.",
    ingredients:["Brewed Espresso","Chilled Milk","Sugar","Ice Cubes"],
    visual:{ colors:["#1c0a00","#3b1f0a","#78350f"], icon:"☕", glow:"#78350f" } },
  { id:"cc2",  name:"Cold Coffee with Ice Cream",      category:"cold", price:80,  tag:"POPULAR",
    shortDesc:"Chilled coffee blended with a scoop of vanilla ice cream",
    description:"Our bestselling cold coffee — brewed espresso blended with chilled milk and a generous scoop of creamy vanilla ice cream.",
    ingredients:["Brewed Espresso","Chilled Milk","Vanilla Ice Cream","Sugar","Ice Cubes","Whipped Cream"],
    visual:{ colors:["#1c0a00","#78350f","#d97706"], icon:"☕", glow:"#b45309" } },
  { id:"cc3",  name:"Hazelnut Cold Coffee",            category:"cold", price:90,
    shortDesc:"Cold coffee with rich hazelnut syrup — a café classic",
    description:"Premium cold coffee elevated with rich hazelnut syrup, blended with espresso and chilled milk.",
    ingredients:["Brewed Espresso","Chilled Milk","Hazelnut Syrup","Ice Cubes","Whipped Cream","Hazelnut Drizzle"],
    visual:{ colors:["#1c0a00","#451a03","#92400e"], icon:"☕", glow:"#92400e" } },
  { id:"cc4",  name:"Oreo Cold Coffee",                category:"cold", price:100,
    shortDesc:"Cold coffee loaded with crushed Oreos — bold & crunchy",
    description:"Espresso cold coffee blended with crushed Oreo cookies, chilled milk and vanilla ice cream.",
    ingredients:["Brewed Espresso","Chilled Milk","Oreo Cookies","Vanilla Ice Cream","Whipped Cream","Chocolate Syrup"],
    visual:{ colors:["#0f172a","#1e293b","#475569"], icon:"🍪", glow:"#475569" } },
  { id:"cc5",  name:"Tiramisu Cold Coffee",            category:"cold", price:110, tag:"PREMIUM",
    shortDesc:"Italian tiramisu-inspired cold coffee — rich & elegant",
    description:"Inspired by the Italian classic. Espresso, mascarpone cream, cocoa dusting and a hint of coffee liqueur flavour.",
    ingredients:["Espresso","Mascarpone Cream","Cocoa Powder","Chilled Milk","Ladyfinger Crumble","Vanilla Extract"],
    visual:{ colors:["#1c0a00","#292524","#57534e"], icon:"☕", glow:"#78350f" } },

  // COLD DRINKS — MOJITOS
  { id:"mo1",  name:"Blue Lagoon Mojito",   category:"cold", price:70,
    shortDesc:"Electric blue refreshing mojito with citrus & mint",
    description:"A visually stunning electric-blue mojito with lime, blue curacao flavour, mint leaves and soda. Cool, citrusy and impossibly refreshing.",
    ingredients:["Blue Curacao Syrup","Lime Juice","Fresh Mint","Soda Water","Sugar","Ice Cubes"],
    visual:{ colors:["#0c4a6e","#0284c7","#38bdf8"], icon:"🌊", glow:"#0ea5e9" } },
  { id:"mo2",  name:"Virgin Mojito",        category:"cold", price:70,  tag:"VEGAN",
    shortDesc:"Classic virgin mojito — lime, mint & sparkling soda",
    description:"Fresh lime, crushed mint, a touch of sugar and sparkling soda water over ice. Timeless and perfect.",
    ingredients:["Fresh Lime","Crushed Mint Leaves","Soda Water","Sugar","Rock Salt","Ice Cubes"],
    visual:{ colors:["#14532d","#15803d","#4ade80"], icon:"🌿", glow:"#22c55e" } },
  { id:"mo3",  name:"Strawberry Mojito",    category:"cold", price:70,
    shortDesc:"Fresh strawberry mojito with mint & tangy lime",
    description:"Sweet fresh strawberries muddled with mint and lime, topped with sparkling soda.",
    ingredients:["Fresh Strawberries","Lime Juice","Mint Leaves","Soda Water","Sugar Syrup","Ice Cubes"],
    visual:{ colors:["#7f1d1d","#b91c1c","#f87171"], icon:"🍓", glow:"#ef4444" } },
  { id:"mo4",  name:"Green Apple Mojito",   category:"cold", price:80,
    shortDesc:"Tangy green apple mojito — crisp, cool & zingy",
    description:"A tangy and crisp green apple mojito with apple syrup, fresh lime, mint and soda.",
    ingredients:["Green Apple Syrup","Lime Juice","Mint Leaves","Soda Water","Sugar","Green Apple Slices","Ice"],
    visual:{ colors:["#14532d","#166534","#86efac"], icon:"🍏", glow:"#4ade80" } },
  { id:"mo5",  name:"Watermelon Mojito",    category:"cold", price:80,  tag:"SEASONAL",
    shortDesc:"Fresh watermelon mojito — hydrating & summery",
    description:"Fresh watermelon blended and strained, mixed with lime, mint and soda. The most hydrating drink on our menu.",
    ingredients:["Fresh Watermelon Juice","Lime Juice","Mint Leaves","Soda Water","Sugar","Salt","Ice"],
    visual:{ colors:["#7f1d1d","#dc2626","#fca5a5"], icon:"🍉", glow:"#f87171" } },
  { id:"mo6",  name:"Black Currant Mojito", category:"cold", price:90,
    shortDesc:"Bold black currant mojito — dark, tangy & refreshing",
    description:"Black currant syrup with lime, mint and sparkling soda — a deep purple, tangy mojito.",
    ingredients:["Black Currant Syrup","Lime Juice","Mint Leaves","Soda Water","Sugar","Ice Cubes"],
    visual:{ colors:["#3b0764","#5b21b6","#a78bfa"], icon:"🫐", glow:"#7c3aed" } },

  // COLD DRINKS — ICED TEAS & JUICES
  { id:"it1",  name:"Lemon Iced Tea",       category:"cold", price:80,
    shortDesc:"Classic lemon iced tea — chilled, zesty & refreshing",
    description:"Freshly brewed black tea chilled with lemon juice, sugar and ice.",
    ingredients:["Brewed Black Tea","Fresh Lemon Juice","Sugar Syrup","Ice Cubes","Lemon Slices","Mint"],
    visual:{ colors:["#713f12","#ca8a04","#fef08a"], icon:"🍋", glow:"#eab308" } },
  { id:"it2",  name:"Peach Iced Tea",       category:"cold", price:80,
    shortDesc:"Sweet & floral peach iced tea",
    description:"Brewed black tea infused with sweet peach syrup and chilled. Light, floral and perfectly sweet.",
    ingredients:["Brewed Black Tea","Peach Syrup","Sugar","Ice Cubes","Peach Slices"],
    visual:{ colors:["#78350f","#c2410c","#fdba74"], icon:"🍑", glow:"#f97316" } },
  { id:"it3",  name:"Strawberry Iced Tea",  category:"cold", price:100,
    shortDesc:"Fruity strawberry iced tea — pink, sweet & chilled",
    description:"Black tea steeped and chilled with real strawberry syrup. Served over ice with fresh strawberry garnish.",
    ingredients:["Brewed Black Tea","Strawberry Syrup","Fresh Lemon","Sugar","Ice","Strawberry Slices"],
    visual:{ colors:["#7f1d1d","#be123c","#fda4af"], icon:"🍓", glow:"#f43f5e" } },
  { id:"it4",  name:"Watermelon Iced Tea",  category:"cold", price:100, tag:"POPULAR",
    shortDesc:"Refreshing watermelon iced tea — summer in a glass",
    description:"Brewed tea blended with fresh watermelon juice and served over ice.",
    ingredients:["Brewed Black Tea","Fresh Watermelon Juice","Sugar","Lime","Ice","Mint Leaves"],
    visual:{ colors:["#7f1d1d","#e11d48","#fecdd3"], icon:"🍉", glow:"#f43f5e" } },
  { id:"jq1",  name:"Pineapple Juice",      category:"cold", price:50,
    shortDesc:"Fresh cold-pressed pineapple juice",
    description:"100% fresh pineapple juice, cold-pressed and served chilled. Naturally sweet and packed with Vitamin C.",
    ingredients:["Fresh Pineapple","Sugar (optional)","Ice","Chaat Masala (optional)"],
    visual:{ colors:["#365314","#4d7c0f","#d9f99d"], icon:"🍍", glow:"#84cc16" } },
  { id:"jq2",  name:"Papaya Juice",         category:"cold", price:50,
    shortDesc:"Fresh ripe papaya juice — light & tropical",
    description:"Fresh ripe papaya blended and strained, served chilled. Naturally sweet and great for digestion.",
    ingredients:["Fresh Ripe Papaya","Water","Sugar","Ice","Lemon Drops"],
    visual:{ colors:["#7c2d12","#ea580c","#fed7aa"], icon:"🍈", glow:"#f97316" } },
  { id:"jq3",  name:"Mango Juice",          category:"cold", price:50,  tag:"SEASONAL",
    shortDesc:"Chilled fresh mango juice — thick, sweet & fruity",
    description:"Pure Alphonso mango pulp diluted to the perfect consistency and served chilled.",
    ingredients:["Alphonso Mango Pulp","Water","Sugar","Ice","Cardamom"],
    visual:{ colors:["#78350f","#b45309","#fde68a"], icon:"🥭", glow:"#f59e0b" } },
  { id:"jq4",  name:"Mosami Juice",         category:"cold", price:60,
    shortDesc:"Sweet mosambi (sweet lime) juice — light & citrusy",
    description:"Freshly squeezed sweet lime (mosambi) juice. A popular everyday refresher full of natural goodness.",
    ingredients:["Fresh Mosambi (Sweet Lime)","Black Salt","Sugar","Ice","Chaat Masala"],
    visual:{ colors:["#365314","#3f6212","#bef264"], icon:"🍊", glow:"#84cc16" } },
  { id:"jq5",  name:"Lemon Water",          category:"cold", price:30,
    shortDesc:"Simple refreshing lemon water with black salt",
    description:"Fresh lemon squeezed into chilled water with black salt and a pinch of sugar. Simple, hydrating and perfect.",
    ingredients:["Fresh Lemon","Chilled Water","Black Salt","Sugar","Ice"],
    visual:{ colors:["#713f12","#ca8a04","#fef9c3"], icon:"🍋", glow:"#facc15" } },
  { id:"jq6",  name:"Fresh Lime Soda",      category:"cold", price:50,
    shortDesc:"Fizzy fresh lime soda — sweet, salty or both!",
    description:"Freshly squeezed lime juice topped with sparkling soda water. Choose sweet, salty or mixed.",
    ingredients:["Fresh Lime Juice","Soda Water","Sugar/Salt (choice)","Black Salt","Ice","Mint"],
    visual:{ colors:["#14532d","#166534","#86efac"], icon:"🍋", glow:"#22c55e" } },
  { id:"jq7",  name:"Mint Lime",            category:"cold", price:50,
    shortDesc:"Cool mint & lime cooler — refreshingly simple",
    description:"Fresh lime and muddled mint leaves with a pinch of rock salt and sugar. Simple, cooling and refreshing.",
    ingredients:["Fresh Lime","Fresh Mint Leaves","Rock Salt","Sugar","Chilled Water","Ice"],
    visual:{ colors:["#14532d","#15803d","#4ade80"], icon:"🌿", glow:"#22c55e" } },
  { id:"jq8",  name:"Ginger Lime",          category:"cold", price:50,
    shortDesc:"Zingy ginger & lime cooler with soda",
    description:"Fresh ginger juice combined with lime and soda water. Spicy, tangy and incredibly refreshing.",
    ingredients:["Fresh Ginger Juice","Lime Juice","Soda Water","Sugar","Black Salt","Ice"],
    visual:{ colors:["#78350f","#ca8a04","#fef9c3"], icon:"🫚", glow:"#eab308" } },

  // HOT BEVERAGES
  { id:"hb1",  name:"Kulhad Tea",           category:"hot", price:20,
    shortDesc:"Authentic chai served in a traditional clay kulhad",
    description:"Classic Indian chai brewed with CTC tea, milk, ginger and cardamom — served hot in a traditional earthen clay kulhad.",
    ingredients:["CTC Tea","Full-Fat Milk","Fresh Ginger","Cardamom","Sugar","Water"],
    visual:{ colors:["#78350f","#92400e","#b45309"], icon:"🫖", glow:"#b45309" } },
  { id:"hb2",  name:"Masala Tea",           category:"hot", price:25,  tag:"POPULAR",
    shortDesc:"Spiced masala chai with ginger, cardamom & spices",
    description:"Our signature masala chai with a blend of fresh ginger, cardamom, cinnamon and black pepper. Strong, aromatic and perfectly spiced.",
    ingredients:["CTC Tea","Milk","Fresh Ginger","Cardamom","Cinnamon","Black Pepper","Cloves","Sugar"],
    visual:{ colors:["#78350f","#b45309","#d97706"], icon:"🌿", glow:"#d97706" } },
  { id:"hb3",  name:"Black Tea",            category:"hot", price:20,
    shortDesc:"Pure brewed black tea — light & refreshing",
    description:"Simple, pure brewed black tea served hot. Clean and refreshing with a subtle astringency.",
    ingredients:["Darjeeling Black Tea","Water","Sugar (optional)"],
    visual:{ colors:["#1c0a00","#3b1f0a","#78350f"], icon:"🍵", glow:"#78350f" } },
  { id:"hb4",  name:"Lemon Tea",            category:"hot", price:30,
    shortDesc:"Hot black tea with fresh lemon — light & cleansing",
    description:"Hot brewed black tea with a generous squeeze of fresh lemon and honey. Light, cleansing and the perfect digestive.",
    ingredients:["Darjeeling Black Tea","Fresh Lemon Juice","Honey","Water","Sugar"],
    visual:{ colors:["#713f12","#ca8a04","#fef08a"], icon:"🍋", glow:"#eab308" } },
  { id:"hb5",  name:"Hot Coffee",           category:"hot", price:30,
    shortDesc:"Classic hot brewed coffee with steamed milk",
    description:"A simple, satisfying hot coffee — brewed espresso with steamed full-fat milk. Comforting and warming.",
    ingredients:["Espresso","Steamed Full-Fat Milk","Sugar","Water"],
    visual:{ colors:["#1c0a00","#3b1f0a","#78350f"], icon:"☕", glow:"#78350f" } },
  { id:"hb6",  name:"Black Coffee",         category:"hot", price:35,
    shortDesc:"Strong pure black coffee — no milk, bold flavour",
    description:"Pure, unadulterated black coffee. Strong espresso with hot water. For the coffee purist.",
    ingredients:["Double Espresso","Hot Water","Sugar (optional)"],
    visual:{ colors:["#0c0a09","#1c0a00","#292524"], icon:"☕", glow:"#57534e" } },
  { id:"hb7",  name:"Hot Milk",             category:"hot", price:40,
    shortDesc:"Fresh hot steamed full-fat milk — pure & nourishing",
    description:"Full-fat milk heated to the perfect temperature. Pure, nourishing and comforting for all ages.",
    ingredients:["Full-Fat Fresh Milk","Sugar (optional)","Cardamom (optional)"],
    visual:{ colors:["#f0fdf4","#d1fae5","#a7f3d0"], icon:"🥛", glow:"#4ade80" } },
  { id:"hb8",  name:"Plain Milk",           category:"hot", price:30,
    shortDesc:"Cold fresh full-fat milk — pure & simple",
    description:"Chilled fresh full-fat milk, plain and pure. The simplest, most nourishing item on our menu.",
    ingredients:["Fresh Full-Fat Milk"],
    visual:{ colors:["#f0fdf4","#d1fae5","#a7f3d0"], icon:"🥛", glow:"#4ade80" } },
  { id:"hb9",  name:"Rose Milk",            category:"hot", price:40,
    shortDesc:"Chilled sweet rose milk — floral, pink & creamy",
    description:"Full-fat milk sweetened with fragrant rose syrup and served chilled. Beautifully pink, floral and nostalgic.",
    ingredients:["Full-Fat Milk","Rose Syrup","Sugar","Chilled Ice","Rose Water","Basil Seeds"],
    visual:{ colors:["#9d174d","#be185d","#f9a8d4"], icon:"🌹", glow:"#ec4899" } },
  { id:"hb10", name:"Chaas",                category:"hot", price:20,
    shortDesc:"Thin salted buttermilk with cumin & coriander",
    description:"Traditional thin buttermilk (chaas) seasoned with roasted cumin, rock salt and fresh coriander.",
    ingredients:["Thin Buttermilk","Roasted Cumin","Rock Salt","Green Chilli","Fresh Coriander","Ginger"],
    visual:{ colors:["#f0fdf4","#dcfce7","#bbf7d0"], icon:"🥛", glow:"#4ade80" } },
  { id:"hb11", name:"Sweet Lassi",          category:"hot", price:40,
    shortDesc:"Thick chilled yoghurt lassi — sweet & creamy",
    description:"Thick, hand-churned dahi blended with sugar, a pinch of cardamom and rose water. Chilled and creamy.",
    ingredients:["Full-Fat Dahi (Yoghurt)","Sugar","Cardamom","Rose Water","Chilled Milk","Ice"],
    visual:{ colors:["#7c2d12","#f97316","#fed7aa"], icon:"🪔", glow:"#f97316" } },

  // ICE CREAM
  { id:"ic1",  name:"Vanilla Scoop",        category:"icecream", price:30,  tag:"CLASSIC",
    shortDesc:"Smooth & creamy classic vanilla ice cream scoop",
    description:"Our house vanilla ice cream made with real vanilla beans. Served in a bowl or upgrade to a waffle cone for just ₹10 extra!",
    ingredients:["Cream","Full-Fat Milk","Vanilla Beans","Sugar","Stabilizers"],
    visual:{ colors:["#78350f","#fef3c7","#fde68a"], icon:"🍦", glow:"#fbbf24" } },
  { id:"ic2",  name:"Strawberry Scoop",     category:"icecream", price:30,
    shortDesc:"Fresh strawberry ice cream — fruity & vibrant",
    description:"Bright, fruity strawberry ice cream made with real strawberry pulp.",
    ingredients:["Cream","Full-Fat Milk","Strawberry Pulp","Sugar","Natural Pink Color"],
    visual:{ colors:["#7f1d1d","#e11d48","#fda4af"], icon:"🍓", glow:"#f43f5e" } },
  { id:"ic3",  name:"Butterscotch Scoop",   category:"icecream", price:30,
    shortDesc:"Golden butterscotch ice cream with caramel crunch",
    description:"Creamy butterscotch ice cream with golden caramel crunch bits throughout.",
    ingredients:["Cream","Full-Fat Milk","Butterscotch Flavour","Caramel Bits","Sugar"],
    visual:{ colors:["#78350f","#b45309","#fbbf24"], icon:"🍯", glow:"#f59e0b" } },
  { id:"ic4",  name:"Chocolate Scoop",      category:"icecream", price:40,
    shortDesc:"Rich dark chocolate ice cream — deep & indulgent",
    description:"Deep, rich chocolate ice cream made with premium cocoa. Dense, creamy and intensely chocolatey.",
    ingredients:["Cream","Full-Fat Milk","Premium Cocoa","Chocolate","Sugar"],
    visual:{ colors:["#1c0a00","#78350f","#92400e"], icon:"🍫", glow:"#92400e" } },
  { id:"ic5",  name:"Mango Scoop",          category:"icecream", price:30,  tag:"SEASONAL",
    shortDesc:"Tropical Alphonso mango ice cream scoop",
    description:"Real Alphonso mango pulp churned into creamy ice cream. Intensely fruity and tropical.",
    ingredients:["Cream","Full-Fat Milk","Alphonso Mango Pulp","Sugar","Cardamom"],
    visual:{ colors:["#78350f","#d97706","#fcd34d"], icon:"🥭", glow:"#f59e0b" } },
  { id:"ic6",  name:"Coffee Scoop",         category:"icecream", price:30,
    shortDesc:"Rich espresso coffee ice cream — bold & smooth",
    description:"Espresso-infused creamy ice cream with a bold coffee flavour profile.",
    ingredients:["Cream","Full-Fat Milk","Espresso Extract","Sugar","Vanilla"],
    visual:{ colors:["#1c0a00","#3b1f0a","#78350f"], icon:"☕", glow:"#78350f" } },
  { id:"ic7",  name:"Kesar Pista Scoop",    category:"icecream", price:40,  tag:"PREMIUM",
    shortDesc:"Royal saffron pistachio ice cream — rich & aromatic",
    description:"Saffron-infused ice cream loaded with crushed pistachios. Aromatic, rich and unmistakably royal.",
    ingredients:["Cream","Full-Fat Milk","Kesar (Saffron)","Crushed Pistachios","Sugar","Cardamom","Rose Water"],
    visual:{ colors:["#78350f","#d97706","#4ade80"], icon:"🌿", glow:"#d97706" } },
  { id:"ic8",  name:"Tutti Frutti Scoop",   category:"icecream", price:40,
    shortDesc:"Colourful tutti frutti ice cream — fun & fruity",
    description:"Vanilla base ice cream packed with colourful tutti frutti candy pieces.",
    ingredients:["Cream","Full-Fat Milk","Tutti Frutti Candy","Vanilla","Sugar","Natural Colors"],
    visual:{ colors:["#312e81","#7c3aed","#c084fc"], icon:"🌈", glow:"#a78bfa" } },
  { id:"ic9",  name:"American Nuts Scoop",  category:"icecream", price:40,
    shortDesc:"Mixed nuts ice cream — crunchy & indulgent",
    description:"Creamy ice cream studded with a mix of roasted American nuts — almonds, cashews and walnuts.",
    ingredients:["Cream","Full-Fat Milk","Almonds","Cashews","Walnuts","Sugar","Vanilla"],
    visual:{ colors:["#78350f","#92400e","#d97706"], icon:"🥜", glow:"#d97706" } },
  { id:"ic10", name:"Double Choco Chip Scoop", category:"icecream", price:40,
    shortDesc:"Double chocolate chip ice cream — extra indulgent",
    description:"Rich chocolate ice cream loaded with two types of chocolate chips. A chocoholic's dream scoop.",
    ingredients:["Cream","Full-Fat Milk","Chocolate","Dark Choco Chips","Milk Choco Chips","Sugar","Cocoa"],
    visual:{ colors:["#1c0a00","#450a0a","#991b1b"], icon:"🍫", glow:"#b91c1c" } },
  { id:"ic11", name:"Kaaju Kishmish Scoop", category:"icecream", price:40,
    shortDesc:"Cashew raisin ice cream — rich & gently sweet",
    description:"Creamy ice cream filled with crunchy cashews and plump raisins. A classic Indian flavour.",
    ingredients:["Cream","Full-Fat Milk","Cashews","Raisins","Sugar","Cardamom","Rose Water"],
    visual:{ colors:["#78350f","#92400e","#fde68a"], icon:"🥜", glow:"#f59e0b" } },

  // SNACKS & FOOD
  { id:"sn1",  name:"Masala Sandwich",      category:"snacks", price:70,  tag:"POPULAR",
    shortDesc:"Toasted sandwich loaded with spiced veggie filling",
    description:"Toasted bread filled with spiced potatoes, onions, capsicum, tomatoes and our secret masala. Served with green chutney and ketchup.",
    ingredients:["Bread","Potato","Onion","Capsicum","Tomato","Green Chutney","Masala","Cheese (optional)","Butter"],
    visual:{ colors:["#78350f","#b45309","#fbbf24"], icon:"🥪", glow:"#f59e0b" } },
  { id:"sn2",  name:"Veg Sandwich",         category:"snacks", price:50,
    shortDesc:"Simple fresh veg sandwich — light & wholesome",
    description:"Soft bread with fresh cucumber, tomato, onion, lettuce and a spread of butter and green chutney.",
    ingredients:["Bread","Cucumber","Tomato","Onion","Lettuce","Butter","Green Chutney","Salt"],
    visual:{ colors:["#14532d","#166534","#4ade80"], icon:"🥪", glow:"#22c55e" } },
  { id:"sn3",  name:"Grilled Sandwich",     category:"snacks", price:70,
    shortDesc:"Grilled veggie sandwich — crispy, golden & melty",
    description:"Grilled to golden perfection — loaded with fresh veggies and cheese, pressed until crispy outside and melted inside.",
    ingredients:["Bread","Mixed Veggies","Processed Cheese","Butter","Green Chutney","Mayonnaise"],
    visual:{ colors:["#78350f","#92400e","#d97706"], icon:"🥪", glow:"#d97706" } },
  { id:"sn4",  name:"Bread Butter",         category:"snacks", price:40,
    shortDesc:"Simple buttered bread — classic & comforting",
    description:"Fresh bread slices generously slathered with butter. Simple, warm and classic. Perfect with chai.",
    ingredients:["Fresh Bread Slices","Butter","Salt (optional)"],
    visual:{ colors:["#78350f","#d97706","#fef3c7"], icon:"🍞", glow:"#d97706" } },
  { id:"sn5",  name:"Veg Maggi",            category:"snacks", price:50,
    shortDesc:"Classic Maggi noodles with veggies — comfort in a bowl",
    description:"The beloved Maggi cooked with fresh vegetables and our special masala. Perfectly seasoned and served piping hot.",
    ingredients:["Maggi Noodles","Mixed Vegetables","Maggi Masala","Butter","Onion","Tomato","Coriander"],
    visual:{ colors:["#78350f","#c2410c","#fbbf24"], icon:"🍜", glow:"#f59e0b" } },
  { id:"sn6",  name:"Plain Maggi",          category:"snacks", price:40,
    shortDesc:"Classic plain Maggi noodles — simple comfort food",
    description:"Simple Maggi noodles cooked perfectly with just the classic masala and butter.",
    ingredients:["Maggi Noodles","Maggi Masala","Butter","Water"],
    visual:{ colors:["#78350f","#b45309","#fef08a"], icon:"🍜", glow:"#eab308" } },
  { id:"sn7",  name:"Onion Maggi",          category:"snacks", price:50,
    shortDesc:"Maggi with crispy sautéed onions — extra flavourful",
    description:"Classic Maggi elevated with golden sautéed onions cooked in butter. Simple upgrade, big difference.",
    ingredients:["Maggi Noodles","Onion","Maggi Masala","Butter","Green Chilli","Coriander"],
    visual:{ colors:["#78350f","#c2410c","#f97316"], icon:"🍜", glow:"#f97316" } },
  { id:"sn8",  name:"Masala Maggi",         category:"snacks", price:60,  tag:"SPICY",
    shortDesc:"Extra spicy masala Maggi — fiery street-style",
    description:"Maggi noodles cooked with extra spices, green chillies, garlic and our special street-style masala.",
    ingredients:["Maggi Noodles","Green Chilli","Garlic","Onion","Tomato","Special Masala","Butter","Coriander"],
    visual:{ colors:["#7f1d1d","#b91c1c","#f97316"], icon:"🌶️", glow:"#ef4444" } },
  { id:"sn9",  name:"Poha",                 category:"snacks", price:50,
    shortDesc:"Light flattened rice with turmeric, peanuts & lemon",
    description:"Fluffy flattened rice tempered with mustard seeds, curry leaves, turmeric, peanuts and fresh lemon.",
    ingredients:["Flattened Rice (Poha)","Mustard Seeds","Curry Leaves","Turmeric","Peanuts","Onion","Green Chilli","Lemon","Coriander"],
    visual:{ colors:["#713f12","#d97706","#fef08a"], icon:"🍚", glow:"#d97706" } },
  { id:"sn10", name:"Veg Noodles",          category:"snacks", price:70,
    shortDesc:"Stir-fried veg noodles — saucy & Indo-Chinese style",
    description:"Stir-fried noodles tossed with fresh vegetables, soy sauce and our special Indo-Chinese sauce blend.",
    ingredients:["Noodles","Cabbage","Capsicum","Carrot","Spring Onion","Soy Sauce","Vinegar","Ginger-Garlic"],
    visual:{ colors:["#78350f","#b45309","#fcd34d"], icon:"🍜", glow:"#f59e0b" } },
  { id:"sn11", name:"Veg Hakka Noodles",    category:"snacks", price:80,  tag:"POPULAR",
    shortDesc:"Restaurant-style Hakka noodles — bold Indo-Chinese",
    description:"Classic restaurant-style Hakka noodles with julienned veggies, bold sauce blend and a smoky wok finish.",
    ingredients:["Hakka Noodles","Mixed Vegetables","Schezwan Sauce","Soy Sauce","Sesame Oil","Ginger-Garlic","Spring Onion"],
    visual:{ colors:["#7c2d12","#c2410c","#f97316"], icon:"🍜", glow:"#ea580c" } },
  { id:"sn12", name:"Veg Roll",             category:"snacks", price:60,
    shortDesc:"Soft roti wrapped with spiced veggie filling",
    description:"A soft roti wrapped with a spiced vegetable filling, onions and mint chutney.",
    ingredients:["Roti","Mixed Vegetables","Onion","Green Chutney","Masala","Lemon"],
    visual:{ colors:["#14532d","#166534","#4ade80"], icon:"🌯", glow:"#22c55e" } },
  { id:"sn13", name:"Paneer Roll",          category:"snacks", price:80,
    shortDesc:"Soft roti wrapped with spiced paneer tikka filling",
    description:"A soft roti wrapped around juicy paneer tikka pieces, onions, capsicum and mint chutney.",
    ingredients:["Roti","Paneer (Cottage Cheese)","Onion","Capsicum","Green Chutney","Masala","Lemon","Coriander"],
    visual:{ colors:["#f0fdf4","#14532d","#4ade80"], icon:"🌯", glow:"#22c55e" } },
  { id:"sn14", name:"Paneer Kathi Roll",    category:"snacks", price:90,
    shortDesc:"Crispy paneer kathi roll — street-style favourite",
    description:"Flaky paratha rolled with spiced crispy paneer, onions and tangy chutneys. A street-food legend.",
    ingredients:["Paratha","Crispy Paneer","Onion","Capsicum","Kathi Masala","Green Chutney","Tamarind Sauce"],
    visual:{ colors:["#78350f","#b45309","#fde68a"], icon:"🌯", glow:"#f59e0b" } },
  { id:"sn15", name:"Chowmein Roll",        category:"snacks", price:80,
    shortDesc:"Roti stuffed with spicy Hakka noodles — fusion delight",
    description:"A crispy roti filled with spicy Hakka noodles, cabbage and Indo-Chinese sauce. A desi street-style fusion.",
    ingredients:["Roti","Hakka Noodles","Cabbage","Capsicum","Schezwan Sauce","Spring Onion"],
    visual:{ colors:["#7c2d12","#c2410c","#f97316"], icon:"🌯", glow:"#ea580c" } },
  { id:"sn16", name:"Chilly Paneer Roll",   category:"snacks", price:100, tag:"SPICY",
    shortDesc:"Spicy chilly paneer wrapped in a hot roti — fiery!",
    description:"Indo-Chinese chilly paneer — crispy paneer tossed in a spicy sauce — wrapped in a hot fresh roti.",
    ingredients:["Roti","Paneer","Capsicum","Onion","Green Chilli","Schezwan Sauce","Soy Sauce","Ginger-Garlic","Coriander"],
    visual:{ colors:["#7f1d1d","#dc2626","#f97316"], icon:"🌶️", glow:"#ef4444" } },
  { id:"sn17", name:"Aloo Chatpata Roll",   category:"snacks", price:60,
    shortDesc:"Tangy chatpata aloo roll — spiced & street-style",
    description:"Spicy chatpata potato filling wrapped in a soft roti with green chutney and tamarind sauce.",
    ingredients:["Roti","Spiced Potato","Green Chutney","Tamarind Sauce","Onion","Coriander","Chaat Masala"],
    visual:{ colors:["#78350f","#ca8a04","#fef08a"], icon:"🌯", glow:"#eab308" } },
  { id:"sn18", name:"Honey Chilli Potato",  category:"snacks", price:100, tag:"BESTSELLER",
    shortDesc:"Crispy potato in sweet & spicy honey chilli sauce",
    description:"Crispy fried potato tossed in our irresistible honey chilli sauce with garlic, spring onion and sesame seeds.",
    ingredients:["Potato","Corn Flour","Honey","Red Chilli","Garlic","Spring Onion","Sesame Seeds","Soy Sauce","Vinegar"],
    visual:{ colors:["#78350f","#b45309","#f59e0b"], icon:"🥔", glow:"#f59e0b" } },
  { id:"sn19", name:"Chilli Potato",        category:"snacks", price:80,  tag:"SPICY",
    shortDesc:"Crispy fried potato in tangy chilli sauce",
    description:"Crispy batter-fried potato fingers tossed in a tangy, spicy chilli sauce with garlic and spring onion.",
    ingredients:["Potato","Corn Flour","Red Chilli Sauce","Garlic","Spring Onion","Capsicum","Soy Sauce","Vinegar"],
    visual:{ colors:["#7f1d1d","#c2410c","#f97316"], icon:"🥔", glow:"#ea580c" } },
  { id:"sn20", name:"French Fry",           category:"snacks", price:60,
    shortDesc:"Crispy golden French fries — the universal snack",
    description:"Golden, crispy French fries seasoned with our special masala and served with ketchup and mayo.",
    ingredients:["Potato","Refined Oil","Salt","Masala Seasoning","Ketchup","Mayonnaise"],
    visual:{ colors:["#78350f","#ca8a04","#fef08a"], icon:"🍟", glow:"#eab308" } },
  { id:"sn21", name:"Cucumber Salad",       category:"snacks", price:40,
    shortDesc:"Fresh cucumber salad with lemon & chaat masala",
    description:"Crisp cucumber slices dressed with lemon juice, chaat masala and fresh coriander. Light, healthy and refreshing.",
    ingredients:["Cucumber","Lemon Juice","Chaat Masala","Salt","Fresh Coriander","Green Chilli"],
    visual:{ colors:["#14532d","#15803d","#86efac"], icon:"🥒", glow:"#22c55e" } },
  { id:"sn22", name:"Green Salad",          category:"snacks", price:50,
    shortDesc:"Fresh mixed green salad — light & healthy",
    description:"A crisp mix of lettuce, cucumber, tomato, onion and capsicum dressed with lemon and seasoning.",
    ingredients:["Lettuce","Cucumber","Tomato","Onion","Capsicum","Lemon Juice","Olive Oil","Salt","Pepper"],
    visual:{ colors:["#14532d","#166534","#4ade80"], icon:"🥗", glow:"#22c55e" } },
  { id:"sn23", name:"Patties",              category:"snacks", price:30,
    shortDesc:"Classic crispy fried potato patties — simple & tasty",
    description:"Crispy fried spiced potato patties. A simple, satisfying snack at an unbeatable price.",
    ingredients:["Potato","Breadcrumbs","Spices","Oil","Coriander","Green Chilli"],
    visual:{ colors:["#78350f","#ca8a04","#fef08a"], icon:"🥐", glow:"#eab308" } },
  { id:"sn24", name:"Masala Patties",       category:"snacks", price:40,
    shortDesc:"Spiced masala patties — extra flavourful",
    description:"Potato patties loaded with our special masala mix, onions and coriander. Bold flavour, crispy texture.",
    ingredients:["Potato","Onion","Masala","Breadcrumbs","Oil","Coriander","Green Chilli"],
    visual:{ colors:["#78350f","#b45309","#fbbf24"], icon:"🥐", glow:"#f59e0b" } },
  { id:"sn25", name:"Cheese Patties",       category:"snacks", price:60,  tag:"POPULAR",
    shortDesc:"Crispy pastry stuffed with spiced cheese filling",
    description:"Flaky, golden pastry filled with a rich spiced cheese and vegetable stuffing. Crispy outside, melty inside.",
    ingredients:["Pastry Sheet","Processed Cheese","Mixed Vegetables","Spices","Butter","Cornflour Slurry"],
    visual:{ colors:["#78350f","#b45309","#fbbf24"], icon:"🥐", glow:"#f59e0b" } },
  { id:"sn26", name:"Cheese Burger",        category:"snacks", price:40,
    shortDesc:"Classic veg burger with melted cheese & veggie patty",
    description:"A soft bun loaded with a crispy veggie patty, melted processed cheese, fresh lettuce, tomato and our special burger sauce.",
    ingredients:["Burger Bun","Veggie Patty","Processed Cheese","Lettuce","Tomato","Onion","Burger Sauce","Mayonnaise"],
    visual:{ colors:["#78350f","#b45309","#fde68a"], icon:"🍔", glow:"#f59e0b" } },
  { id:"sn27", name:"Paneer Burger",        category:"snacks", price:50,  tag:"POPULAR",
    shortDesc:"Juicy paneer tikka burger with mint mayo",
    description:"A specially spiced paneer tikka patty in a soft burger bun with mint mayonnaise, fresh veggies and tangy sauce.",
    ingredients:["Burger Bun","Paneer Tikka Patty","Mint Mayonnaise","Lettuce","Tomato","Onion","Special Sauce"],
    visual:{ colors:["#f0fdf4","#15803d","#4ade80"], icon:"🍔", glow:"#22c55e" } },
  { id:"sn28", name:"Aloo Jeera",           category:"snacks", price:60,
    shortDesc:"Classic dry jeera aloo — tempered with cumin & spices",
    description:"Perfectly cooked cubed potatoes tempered with cumin seeds, dry spices and fresh coriander.",
    ingredients:["Boiled Potato","Cumin Seeds","Turmeric","Coriander Powder","Green Chilli","Ginger","Fresh Coriander","Ghee"],
    visual:{ colors:["#78350f","#ca8a04","#fef08a"], icon:"🥔", glow:"#eab308" } },
  { id:"sn29", name:"Momo",                 category:"snacks", price:40,  tag:"NEW",
    shortDesc:"Steamed veg momos — soft, juicy & with spicy chutney",
    description:"Soft steamed momos stuffed with a spiced vegetable filling, served with fiery red chutney.",
    ingredients:["Maida (All-Purpose Flour)","Cabbage","Carrot","Onion","Ginger","Garlic","Soy Sauce","Coriander","Spices"],
    visual:{ colors:["#f0fdf4","#0c4a6e","#38bdf8"], icon:"🥟", glow:"#0ea5e9" } },
];

/* ─── CSS ─── */
const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
:root{
  --bg:#050a14;--surface:#0d1626;--surface2:#111d33;
  --glass:rgba(255,255,255,0.04);--glass2:rgba(255,255,255,0.07);
  --bd:rgba(255,255,255,0.07);--bdi:rgba(34,211,238,0.2);
  --im:#22d3ee;--ib:#06b6d4;--id:#0891b2;
  --gold:#fbbf24;--t1:#ecfeff;--t2:#94a3b8;--t3:#475569;
  --fd:'Fraunces',Georgia,serif;
  --fu:'Outfit',sans-serif;
  --fm:'JetBrains Mono',monospace;
}
body{font-family:var(--fu);background:var(--bg);color:var(--t1);-webkit-font-smoothing:antialiased;overflow-x:hidden}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:var(--surface2);border-radius:9px}

.nav{position:sticky;top:0;z-index:90;display:flex;align-items:center;justify-content:space-between;padding:0 clamp(16px,4vw,40px);height:64px;background:rgba(5,10,20,0.85);backdrop-filter:blur(24px);border-bottom:1px solid var(--bd)}
.logo{font-family:var(--fd);font-weight:700;font-size:20px;letter-spacing:-0.02em}
.logo em{font-style:italic;color:var(--im)}
.nav-r{display:flex;align-items:center;gap:14px}
.cart-btn{display:flex;align-items:center;gap:8px;padding:8px 18px;border-radius:999px;border:1px solid var(--bdi);background:rgba(34,211,238,0.07);color:var(--im);font-family:var(--fu);font-size:13px;font-weight:600;cursor:pointer;transition:all 0.2s}
.cart-btn:hover{background:rgba(34,211,238,0.14);transform:translateY(-1px)}
.cart-btn.pop{animation:cpop 0.4s ease-out}
@keyframes cpop{0%,100%{transform:scale(1)}50%{transform:scale(1.07);background:rgba(34,211,238,0.2)}}
.cbadge{min-width:20px;height:20px;border-radius:999px;background:var(--im);color:var(--bg);font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center}
.cbadge.zero{background:var(--surface2)}

.hero{position:relative;z-index:1;padding:80px clamp(16px,5vw,60px) 60px;text-align:center}
.hero-tag{display:inline-flex;align-items:center;gap:8px;font-family:var(--fm);font-size:11px;color:var(--im);letter-spacing:0.15em;text-transform:uppercase;padding:5px 14px;border:1px solid var(--bdi);border-radius:999px;background:rgba(34,211,238,0.06);margin-bottom:20px}
.hero-tag::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--im);animation:blink 2s infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0.2}}
.hero h1{font-family:var(--fd);font-weight:900;font-size:clamp(40px,7vw,88px);line-height:1;letter-spacing:-0.03em;margin-bottom:16px}
.hero h1 em{font-style:italic;color:var(--im)}
.hero-sub{font-size:clamp(14px,2vw,17px);color:var(--t2);font-weight:300;max-width:520px;margin:0 auto 32px;line-height:1.65}
.pills{display:flex;justify-content:center;flex-wrap:wrap;gap:10px}
.pill{padding:7px 16px;border-radius:999px;background:var(--glass);border:1px solid var(--bd);font-size:12px;font-weight:500;color:var(--t2)}
.xbtn{margin-top:28px;padding:13px 32px;border-radius:999px;border:1px solid var(--bdi);background:rgba(34,211,238,0.1);color:var(--im);font-family:var(--fu);font-size:14px;font-weight:600;cursor:pointer;transition:all 0.25s}
.xbtn:hover{background:var(--im);color:var(--bg);box-shadow:0 8px 28px rgba(34,211,238,0.35)}

.filters{position:sticky;top:64px;z-index:80;display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:14px clamp(16px,4vw,40px);background:rgba(5,10,20,0.88);backdrop-filter:blur(20px);border-bottom:1px solid var(--bd)}
.fbtn{display:flex;align-items:center;gap:7px;padding:8px 16px;border-radius:999px;border:1px solid var(--bd);background:var(--glass);color:var(--t2);font-family:var(--fu);font-size:12px;font-weight:500;cursor:pointer;transition:all 0.2s;white-space:nowrap}
.fbtn:hover{border-color:var(--bdi);color:var(--t1);background:var(--glass2)}
.fbtn.on{border-color:var(--im);color:var(--im);background:rgba(34,211,238,0.1);box-shadow:0 0 16px rgba(34,211,238,0.15)}
.fsep{width:1px;height:24px;background:var(--bd);margin:0 4px;flex-shrink:0}
.fsel{margin-left:auto;padding:8px 30px 8px 14px;border-radius:999px;border:1px solid var(--bd);background:var(--glass);color:var(--t2);font-family:var(--fu);font-size:12px;cursor:pointer;appearance:none;min-width:160px;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' fill='%2394a3b8' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center}
.fsel:focus{outline:none;border-color:var(--bdi)}
.fsel option{background:#111}

.showcase{position:relative;z-index:1;display:grid;grid-template-columns:1fr 2px 1fr;max-width:1280px;margin:0 auto;padding:32px clamp(16px,4vw,40px);align-items:start}
.divider{background:linear-gradient(to bottom,transparent,var(--im) 30%,var(--ib) 50%,var(--im) 70%,transparent);box-shadow:0 0 24px rgba(34,211,238,0.35);align-self:stretch;margin:20px 0}

.sig-win{padding:0 clamp(12px,2vw,32px) 0 0;display:flex;flex-direction:column;gap:20px}
.sig-hdr{display:flex;align-items:center;justify-content:space-between}
.sig-badge{display:inline-flex;align-items:center;gap:6px;font-family:var(--fm);font-size:10px;color:var(--gold);letter-spacing:0.15em;text-transform:uppercase;padding:5px 12px;border:1px solid rgba(251,191,36,0.3);border-radius:999px;background:rgba(251,191,36,0.08)}
.sig-badge::before{content:'★'}
.sig-card{border-radius:24px;border:1px solid rgba(251,191,36,0.2);background:var(--surface);overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.6),0 0 60px rgba(251,191,36,0.06);cursor:pointer;transition:transform 0.3s,box-shadow 0.3s}
.sig-card:hover{transform:translateY(-4px);box-shadow:0 28px 80px rgba(0,0,0,0.7),0 0 80px rgba(251,191,36,0.1)}

.vis{position:relative;overflow:hidden}
.vis-bg{width:100%;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
.vd{position:absolute;border-radius:50%;opacity:0.15}
.vemoji{position:relative;z-index:2;filter:drop-shadow(0 8px 24px rgba(0,0,0,0.5));user-select:none;pointer-events:none;animation:fl 4s ease-in-out infinite}
@keyframes fl{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
.vtag{position:absolute;top:14px;left:14px;z-index:3;font-family:var(--fm);font-size:9px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;padding:4px 10px;border-radius:999px;background:rgba(0,0,0,0.5);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.15)}
.vvid{position:absolute;bottom:12px;right:12px;z-index:3;display:flex;align-items:center;gap:5px;padding:5px 11px;border-radius:999px;background:rgba(0,0,0,0.6);backdrop-filter:blur(10px);font-size:11px;color:rgba(255,255,255,0.7)}

.cb{padding:20px 22px 22px}
.cm{display:flex;align-items:center;gap:8px;margin-bottom:10px}
.cp{font-family:var(--fm);font-size:9px;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;padding:3px 9px;border-radius:999px;border:1px solid var(--bdi);color:var(--im);background:rgba(34,211,238,0.06)}
.cn{font-family:var(--fd);font-weight:700;font-size:22px;letter-spacing:-0.02em;line-height:1.1;margin-bottom:7px}
.cd{font-size:13px;color:var(--t2);line-height:1.55;margin-bottom:16px}
.cf{display:flex;align-items:center;justify-content:space-between}
.pr{font-family:var(--fd);font-weight:700;font-size:26px;color:var(--im);letter-spacing:-0.03em}
.pr sup{font-size:15px;vertical-align:super;font-weight:600;color:var(--ib);margin-right:1px}
.vbtn{padding:9px 22px;border-radius:999px;border:1px solid var(--bdi);background:rgba(34,211,238,0.08);color:var(--im);font-family:var(--fu);font-size:12px;font-weight:600;cursor:pointer;transition:all 0.2s}
.vbtn:hover{background:var(--im);color:var(--bg);transform:translateY(-1px);box-shadow:0 6px 20px rgba(34,211,238,0.3)}

.sw-win{padding:0 0 0 clamp(12px,2vw,32px);display:flex;flex-direction:column;gap:20px}
.sw-hdr{display:flex;align-items:center;justify-content:space-between}
.sw-title{font-family:var(--fm);font-size:10px;color:var(--t3);letter-spacing:0.15em;text-transform:uppercase}
.sw-cnt{font-family:var(--fm);font-size:12px;color:var(--t2)}
.sw-cnt span{color:var(--im)}

.stack{position:relative;height:480px;user-select:none}
.scard{position:absolute;width:100%;border-radius:24px;overflow:hidden;background:var(--surface);border:1px solid var(--bd);box-shadow:0 20px 60px rgba(0,0,0,0.6);transform-origin:bottom center;will-change:transform;touch-action:none}
.scard.top{cursor:grab}
.scard.top:active{cursor:grabbing}
.hint{position:absolute;z-index:10;top:14px;display:flex;align-items:center;gap:5px;padding:6px 14px;border-radius:999px;font-family:var(--fm);font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;pointer-events:none;opacity:0;transition:opacity 0.15s}
.hl{left:14px;background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);color:#f87171}
.hr{right:14px;background:rgba(34,211,238,0.15);border:1px solid rgba(34,211,238,0.35);color:var(--im)}
.hs{opacity:1}

.sc-ctrl{display:flex;align-items:center;justify-content:center;gap:16px;padding-top:4px}
.cbtn{width:48px;height:48px;border-radius:50%;border:1px solid var(--bd);background:var(--glass);color:var(--t2);font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s}
.cbtn:hover{border-color:var(--bdi);color:var(--im);background:rgba(34,211,238,0.08);transform:scale(1.08)}
.cbtn:disabled{opacity:0.3;cursor:not-allowed;transform:none !important}
.cbtn.pri{width:56px;height:56px;border-color:var(--bdi);background:rgba(34,211,238,0.1);color:var(--im)}
.cbtn.pri:hover{background:var(--im);color:var(--bg);box-shadow:0 6px 24px rgba(34,211,238,0.3)}
.cbtn.add-c{border-color:var(--bdi);background:rgba(34,211,238,0.08);color:var(--im)}
.cbtn.add-c:hover{background:var(--im);color:var(--bg)}

.empty-s{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:14px;text-align:center}
.empty-icon{font-size:48px;opacity:0.4}
.empty-txt{font-size:14px;color:var(--t3)}
.rbtn{margin-top:8px;padding:9px 22px;border-radius:999px;border:1px solid var(--bdi);background:rgba(34,211,238,0.08);color:var(--im);font-family:var(--fu);font-size:12px;font-weight:600;cursor:pointer;transition:all 0.2s}
.rbtn:hover{background:var(--im);color:var(--bg)}

.moverlay{position:fixed;inset:0;z-index:200;background:rgba(5,10,20,0.85);backdrop-filter:blur(16px);display:flex;align-items:center;justify-content:center;padding:20px;animation:fadein 0.25s ease-out}
@keyframes fadein{from{opacity:0}to{opacity:1}}
.modal{width:100%;max-width:780px;max-height:90vh;background:var(--surface);border-radius:24px;border:1px solid rgba(255,255,255,0.1);overflow-y:auto;box-shadow:0 40px 120px rgba(0,0,0,0.8);animation:slideup 0.3s cubic-bezier(0.34,1.2,0.64,1);position:relative}
@keyframes slideup{from{opacity:0;transform:translateY(30px) scale(0.98)}to{opacity:1;transform:translateY(0) scale(1)}}
.mclose{position:absolute;top:16px;right:16px;z-index:10;width:38px;height:38px;border-radius:50%;border:1px solid rgba(255,255,255,0.12);background:rgba(0,0,0,0.4);backdrop-filter:blur(10px);color:var(--t2);font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s}
.mclose:hover{background:rgba(255,255,255,0.1);color:var(--t1)}
.mbody{padding:28px 30px 32px}
.mname{font-family:var(--fd);font-weight:800;font-size:34px;letter-spacing:-0.03em;line-height:1;margin-bottom:10px}
.mtagline{font-size:15px;color:var(--t2);line-height:1.6;margin-bottom:24px}
.mpr-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:12px}
.mpr{font-family:var(--fd);font-weight:700;font-size:42px;color:var(--im);letter-spacing:-0.04em}
.mpr sup{font-size:22px;vertical-align:super;font-weight:600;color:var(--ib);margin-right:1px}
.abtn{padding:13px 32px;border-radius:999px;border:none;background:linear-gradient(135deg,var(--ib),var(--id));color:#fff;font-family:var(--fu);font-size:14px;font-weight:700;cursor:pointer;transition:all 0.25s;letter-spacing:0.04em;box-shadow:0 4px 20px rgba(34,211,238,0.3)}
.abtn:hover{transform:translateY(-2px);box-shadow:0 10px 32px rgba(34,211,238,0.4)}
.abtn:active{transform:scale(0.98)}
.stitle{font-family:var(--fm);font-size:10px;color:var(--t3);letter-spacing:0.18em;text-transform:uppercase;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid var(--bd)}
.ings{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:28px}
.ing{padding:6px 14px;border-radius:999px;background:var(--glass);border:1px solid var(--bd);font-size:12px;font-weight:500;color:var(--t2);transition:all 0.2s;cursor:default}
.ing:hover{border-color:var(--bdi);color:var(--im);background:rgba(34,211,238,0.06)}
.mstats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:28px}
.stc{padding:14px;border-radius:16px;background:var(--glass);border:1px solid var(--bd);text-align:center}
.stv{font-family:var(--fm);font-size:18px;font-weight:600;margin-bottom:4px}
.stl{font-size:10px;color:var(--t3);text-transform:uppercase;letter-spacing:0.1em}

.smart{padding:20px 22px;border-radius:16px;border:1px solid rgba(34,211,238,0.2);background:linear-gradient(135deg,rgba(34,211,238,0.04),rgba(94,234,212,0.03));position:relative;overflow:hidden}
.smart::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--im),transparent)}
.sm-hdr{display:flex;align-items:center;gap:8px;margin-bottom:12px}
.sm-ico{width:28px;height:28px;border-radius:50%;background:rgba(34,211,238,0.12);border:1px solid var(--bdi);display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0}
.sm-lbl{font-family:var(--fm);font-size:10px;color:var(--im);letter-spacing:0.15em;text-transform:uppercase}
.sm-body{font-size:14px;color:var(--t2);line-height:1.6}
.sm-pair{display:flex;align-items:center;gap:10px;margin-top:12px;padding:10px 14px;border-radius:10px;background:rgba(34,211,238,0.06);border:1px solid rgba(34,211,238,0.12);cursor:pointer;transition:all 0.2s}
.sm-pair:hover{background:rgba(34,211,238,0.1);border-color:var(--bdi)}
.sm-pname{font-weight:600;font-size:13px;color:#a5f3fc}
.sm-pprice{font-family:var(--fm);font-size:12px;color:var(--im);margin-left:auto}
.sk{background:linear-gradient(90deg,var(--surface2) 25%,var(--surface) 50%,var(--surface2) 75%);background-size:200% 100%;animation:shimmer 1.4s infinite;border-radius:10px;height:14px;margin-bottom:8px}
@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}

.co{position:fixed;inset:0;z-index:300;background:rgba(5,10,20,0.75);backdrop-filter:blur(8px);animation:fadein 0.2s}
.cd-draw{position:fixed;top:0;right:0;bottom:0;width:min(420px,100vw);background:#080f1c;border-left:1px solid var(--bd);z-index:301;display:flex;flex-direction:column;animation:slideinr 0.3s cubic-bezier(0.34,1.1,0.64,1)}
@keyframes slideinr{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
.cd-hdr{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid var(--bd);flex-shrink:0}
.cd-title{font-family:var(--fd);font-weight:700;font-size:22px;letter-spacing:-0.02em}
.cd-x{width:36px;height:36px;border-radius:50%;border:1px solid var(--bd);background:var(--glass);color:var(--t2);font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s}
.cd-x:hover{color:var(--t1);border-color:rgba(255,255,255,0.2)}
.cd-list{flex:1;overflow-y:auto;padding:16px 24px;display:flex;flex-direction:column;gap:12px}
.ci{display:flex;align-items:center;gap:12px;padding:14px;border-radius:16px;background:var(--glass);border:1px solid var(--bd);transition:border-color 0.2s}
.ci:hover{border-color:rgba(255,255,255,0.12)}
.ci-em{font-size:26px;flex-shrink:0;width:44px;height:44px;display:flex;align-items:center;justify-content:center;border-radius:10px;background:var(--surface2)}
.ci-info{flex:1;min-width:0}
.ci-name{font-weight:600;font-size:14px;margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ci-price{font-family:var(--fm);font-size:12px;color:var(--im)}
.ci-qty{display:flex;align-items:center;gap:8px;flex-shrink:0}
.qbtn{width:28px;height:28px;border-radius:50%;border:1px solid var(--bd);background:var(--glass);color:var(--t2);font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.18s;font-family:monospace;flex-shrink:0}
.qbtn:hover{border-color:var(--im);color:var(--im)}
.qn{font-family:var(--fm);font-size:14px;font-weight:600;min-width:20px;text-align:center}
.qrm{width:26px;height:26px;border-radius:50%;border:none;background:none;color:var(--t3);font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.18s;flex-shrink:0;margin-left:2px}
.qrm:hover{color:#f87171;background:rgba(239,68,68,0.1);border-radius:50%}
.cd-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:12px;opacity:0.5}
.cd-foot{padding:20px 24px;border-top:1px solid var(--bd);flex-shrink:0;background:#080f1c}
.cd-sum{margin-bottom:16px;display:flex;flex-direction:column;gap:8px}
.cd-row{display:flex;justify-content:space-between;font-size:13px;color:var(--t2)}
.cd-row.tot{font-size:17px;font-weight:700;color:var(--t1);padding-top:8px;border-top:1px solid var(--bd);margin-top:4px}
.cd-row.tot span:last-child{color:var(--im);font-family:var(--fm)}
.cobtn{width:100%;padding:15px;border-radius:16px;border:none;background:linear-gradient(135deg,var(--ib),var(--id));color:#fff;font-family:var(--fu);font-size:15px;font-weight:700;cursor:pointer;transition:all 0.25s;letter-spacing:0.04em;box-shadow:0 4px 24px rgba(34,211,238,0.3)}
.cobtn:hover{transform:translateY(-2px);box-shadow:0 10px 36px rgba(34,211,238,0.4)}
.cobtn:active{transform:scale(0.99)}
.cobtn:disabled{opacity:0.4;cursor:not-allowed;transform:none !important;box-shadow:none}

.oconf{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;padding:32px;text-align:center;gap:16px}
.conf-ring{width:80px;height:80px;border-radius:50%;background:rgba(34,211,238,0.12);border:2px solid var(--im);display:flex;align-items:center;justify-content:center;font-size:36px;animation:popin 0.5s cubic-bezier(0.34,1.4,0.64,1)}
@keyframes popin{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}
.conf-title{font-family:var(--fd);font-weight:800;font-size:26px;letter-spacing:-0.02em}
.conf-sub{font-size:14px;color:var(--t2);line-height:1.6;max-width:280px}
.conf-id{font-family:var(--fm);font-size:13px;color:var(--im);padding:8px 16px;border-radius:999px;background:rgba(34,211,238,0.08);border:1px solid var(--bdi)}
.cnbtn{margin-top:8px;padding:11px 28px;border-radius:999px;border:1px solid var(--bdi);background:rgba(34,211,238,0.08);color:var(--im);font-family:var(--fu);font-size:13px;font-weight:600;cursor:pointer;transition:all 0.22s}
.cnbtn:hover{background:var(--im);color:var(--bg)}

.feats{position:relative;z-index:1;max-width:1280px;margin:0 auto;padding:0 clamp(16px,4vw,40px) 60px;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px}
.fc{padding:22px 20px;border-radius:16px;background:var(--glass);border:1px solid var(--bd);display:flex;flex-direction:column;gap:8px;transition:all 0.25s}
.fc:hover{border-color:var(--bdi);background:var(--glass2)}

.footer{position:relative;z-index:1;margin-top:60px;border-top:1px solid var(--bd);padding:48px clamp(16px,4vw,60px) 32px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:40px}
.ft-brand{grid-column:1}
.ft-name{font-family:var(--fd);font-weight:700;font-size:24px;letter-spacing:-0.02em;margin-bottom:8px}
.ft-name em{font-style:italic;color:var(--im)}
.ft-sub{font-size:13px;color:var(--t3);line-height:1.6;max-width:260px}
.ft-col h4{font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--t3);margin-bottom:16px}
.ft-col ul{list-style:none;display:flex;flex-direction:column;gap:10px}
.ft-col li{font-size:13px;color:var(--t2);cursor:pointer;transition:color 0.2s}
.ft-col li:hover{color:var(--im)}
.ft-bot{margin-top:40px;padding-top:20px;border-top:1px solid var(--bd);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;font-family:var(--fm);font-size:11px;color:var(--t3);grid-column:1/-1}
.ft-bot span{color:var(--ib)}
.notice{position:relative;z-index:1;max-width:1280px;margin:0 auto;padding:0 clamp(16px,4vw,40px) 32px}
.notice-box{padding:16px 22px;border-radius:12px;border:1px solid rgba(251,191,36,0.25);background:rgba(251,191,36,0.05);display:flex;align-items:center;gap:12px;font-size:13px;color:var(--t2)}
.notice-box strong{color:var(--gold)}

/* BRANCHES SECTION */
.branches{position:relative;z-index:1;max-width:1280px;margin:0 auto;padding:0 clamp(16px,4vw,40px) 48px}
.branches-title{font-family:var(--fd);font-weight:900;font-size:clamp(22px,3vw,32px);letter-spacing:-0.02em;margin-bottom:6px}
.branches-title em{font-style:italic;color:var(--im)}
.branches-sub{font-size:13px;color:var(--t3);margin-bottom:24px}
.branches-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.branch-card{border-radius:20px;border:1px solid var(--bd);background:var(--surface);overflow:hidden;transition:all 0.3s;position:relative}
.branch-card:hover{border-color:var(--bdi);box-shadow:0 0 32px rgba(34,211,238,0.08);transform:translateY(-2px)}
.branch-card.main{border-color:rgba(251,191,36,0.25);box-shadow:0 0 32px rgba(251,191,36,0.06)}
.branch-card.main:hover{border-color:rgba(251,191,36,0.5)}
.branch-map{width:100%;border:none;display:block}
.branch-body{padding:20px 22px 22px}
.branch-badge{display:inline-flex;align-items:center;gap:6px;font-family:var(--fm);font-size:9px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;padding:4px 10px;border-radius:999px;margin-bottom:12px}
.branch-badge.main-b{background:rgba(251,191,36,0.1);border:1px solid rgba(251,191,36,0.3);color:var(--gold)}
.branch-badge.second-b{background:rgba(34,211,238,0.08);border:1px solid var(--bdi);color:var(--im)}
.branch-name{font-family:var(--fd);font-weight:700;font-size:18px;letter-spacing:-0.02em;margin-bottom:6px}
.branch-addr{font-size:13px;color:var(--t2);line-height:1.6;margin-bottom:14px}
.branch-links{display:flex;gap:10px;flex-wrap:wrap}
.branch-link{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:999px;font-size:12px;font-weight:600;cursor:pointer;text-decoration:none;transition:all 0.2s;border:1px solid var(--bd);background:var(--glass);color:var(--t2)}
.branch-link:hover{border-color:var(--bdi);color:var(--im);background:rgba(34,211,238,0.06)}
.branch-link.call{border-color:rgba(74,222,128,0.3);background:rgba(74,222,128,0.06);color:#4ade80}
.branch-link.call:hover{background:rgba(74,222,128,0.12)}
.branch-divider-label{position:absolute;top:16px;right:16px;font-family:var(--fm);font-size:9px;letter-spacing:0.1em;text-transform:uppercase;padding:3px 9px;border-radius:999px;background:rgba(0,0,0,0.5);backdrop-filter:blur(10px)}

@media(max-width:900px){
  .branches-grid{grid-template-columns:1fr}
  .showcase{grid-template-columns:1fr;gap:32px}
  .divider{display:none}
  .sig-win{padding-right:0}
  .sw-win{padding-left:0}
  .footer{grid-template-columns:1fr 1fr}
  .ft-brand{grid-column:1/-1}
}
@media(max-width:600px){
  .filters{overflow-x:auto;flex-wrap:nowrap;padding:12px 16px}
  .filters::-webkit-scrollbar{display:none}
  .footer{grid-template-columns:1fr}
  .mstats{grid-template-columns:1fr 1fr}
  .mbody{padding:20px}
  .mname{font-size:26px}
  .mpr{font-size:30px}
}
`;

/* ─── PARTICLE CANVAS
   FIX: pts now use actual W/H after resize(), not hardcoded values
─── */
function Particles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let W = 0;
    let H = 0;

    // FIX: resize runs first, then pts are created using real W/H
    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    onResize(); // sets W and H immediately

    const pts = Array.from({ length: 28 }, () => ({
      x:   Math.random() * W,          // FIX: use actual W, not hardcoded 1400
      y:   Math.random() * H,          // FIX: use actual H, not hardcoded 900
      r:   Math.random() * 1.5 + 0.3,
      vx:  (Math.random() - 0.5) * 0.25,
      vy:  -(Math.random() * 0.4 + 0.1),
      a:   Math.random() * 0.4 + 0.1,
      col: Math.random() > 0.5 ? "#22d3ee" : "#5eead4",
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.col + Math.floor(p.a * 255).toString(16).padStart(2, "0");
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10)          { p.y = H + 10; p.x = Math.random() * W; }
        if (p.x < 0 || p.x > W)  p.vx *= -1;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position:"fixed", inset:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:0 }}
    />
  );
}

/* ─── ITEM VISUAL ─── */
function ItemVisual({ item, height, isModal }) {
  const h   = height  || 220;
  const mod = isModal || false;
  const c0  = item.visual.colors[0];
  const c1  = item.visual.colors[1];
  const c2  = item.visual.colors[2] || c1;

  const tagColor = () => {
    switch (item.tag) {
      case "SPICY":      return "#f87171";
      case "HEALTHY":    return "#4ade80";
      case "PREMIUM":    return "#fbbf24";
      case "NEW":        return "#22d3ee";
      case "BESTSELLER": return "#4ade80";
      case "POPULAR":    return "#22d3ee";
      default:           return "#a78bfa";
    }
  };

  return (
    <div className="vis">
      <div
        className="vis-bg"
        style={{ height: h, background: "linear-gradient(135deg," + c0 + " 0%," + c1 + " 60%," + c2 + " 100%)" }}
      >
        <div className="vd" style={{ width:200, height:200, background:c2, top:-60, right:-60 }} />
        <div className="vd" style={{ width:120, height:120, background:c0, bottom:-40, left:-30 }} />
        <div className="vd" style={{ width:60,  height:60,  background:"#fff", top:"40%", left:"15%" }} />
        <span className="vemoji" style={{ fontSize: mod ? 96 : 72 }}>{item.visual.icon}</span>
      </div>
      {item.tag && (
        <span className="vtag" style={{ color: tagColor() }}>{item.tag}</span>
      )}
      {mod && <div className="vvid"><span>▶</span> Video Preview</div>}
    </div>
  );
}

/* ─── SIGNATURE WINDOW
   FIX: chef note now uses proper JSX children instead of raw text + embedded element
─── */
function SigWindow({ onView }) {
  const catLabel = CATEGORIES.find(c => c.id === SIGNATURE.category)?.label || "";
  return (
    <div className="sig-win">
      <div className="sig-hdr">
        <span className="sig-badge">Signature of the Day</span>
        <span style={{ fontFamily:"var(--fm)", fontSize:11, color:"var(--t3)" }}>Refreshed daily</span>
      </div>

      <div className="sig-card" onClick={() => onView(SIGNATURE)}>
        <ItemVisual item={SIGNATURE} height={260} />
        <div className="cb">
          <div className="cm">
            <span className="cp">{catLabel}</span>
            <span style={{ fontFamily:"var(--fm)", fontSize:9, color:"#fbbf24", letterSpacing:"0.1em", textTransform:"uppercase" }}>
              ★ PREMIUM
            </span>
          </div>
          <div className="cn">{SIGNATURE.name}</div>
          <div className="cd">{SIGNATURE.shortDesc}</div>
          <div className="cf">
            <div className="pr"><sup>₹</sup>{SIGNATURE.price}</div>
            <button className="vbtn" onClick={e => { e.stopPropagation(); onView(SIGNATURE); }}>
              Deep Dive →
            </button>
          </div>
        </div>
      </div>

      {/* FIX: chef note — proper JSX with <span> children instead of raw text + <strong> */}
      <div style={{ padding:"14px 18px", borderRadius:"16px", background:"var(--glass)", border:"1px solid var(--bd)", fontSize:12, color:"var(--t2)", lineHeight:1.7 }}>
        <span style={{ fontFamily:"var(--fm)", fontSize:9, color:"var(--t3)", letterSpacing:"0.15em", textTransform:"uppercase", display:"block", marginBottom:6 }}>
          ✦ Chef's Note
        </span>
        <span>
          Our Kesar Pista shake is crafted with real saffron strands soaked overnight and hand-crushed pistachios. Every sip is a royal indulgence.{" "}
        </span>
        <span style={{ color:"var(--gold)", fontWeight:600 }}>
          Upgrade to a Waffle Cone scoop for just ₹10 extra!
        </span>
      </div>
    </div>
  );
}

/* ─── SWIPE CARD
   Uses offsetRef to avoid stale closure in onUp handler
─── */
function SwipeCard({ item, onSwipe, onView, stackIndex }) {
  const isTop      = stackIndex === 0;
  const offsetRef  = useRef({ x:0, y:0, rot:0 });
  const dragActive = useRef(false);
  const startX     = useRef(0);
  const [display,  setDisplay]  = useState({ x:0, y:0, rot:0 });
  const [hintDir,  setHintDir]  = useState(null);
  const [leaving,  setLeaving]  = useState(false);
  const THRESHOLD = 100;

  const applyOffset = (val) => { offsetRef.current = val; setDisplay(val); };

  const onDown = (cx) => {
    if (!isTop || leaving) return;
    dragActive.current = true;
    startX.current = cx;
  };

  const onMove = (cx) => {
    if (!dragActive.current || leaving) return;
    const dx = cx - startX.current;
    applyOffset({ x:dx, y: -Math.abs(dx) * 0.05, rot: dx * 0.07 });
    setHintDir(dx > 24 ? "right" : dx < -24 ? "left" : null);
  };

  const onUp = () => {
    if (!dragActive.current) return;
    dragActive.current = false;
    const dx = offsetRef.current.x; // always fresh, never stale
    if (Math.abs(dx) > THRESHOLD) {
      const dir = dx > 0 ? "right" : "left";
      setLeaving(true);
      applyOffset({ x: dir === "right" ? 900 : -900, y:-120, rot: dir === "right" ? 35 : -35 });
      setTimeout(() => onSwipe(item.id, dir), 380);
    } else {
      applyOffset({ x:0, y:0, rot:0 });
      setHintDir(null);
    }
  };

  if (stackIndex >= 3) return null;

  const catLabel = CATEGORIES.find(c => c.id === item.category)?.label || item.category;

  return (
    <div
      className={"scard" + (isTop ? " top" : "")}
      style={{
        transform: isTop
          ? "translate(" + display.x + "px," + display.y + "px) rotate(" + display.rot + "deg)"
          : "translateY(" + (stackIndex * 14) + "px) scale(" + (1 - stackIndex * 0.04) + ")",
        transition: (isTop && dragActive.current) ? "none" : "transform 0.35s cubic-bezier(0.34,1.1,0.64,1)",
        opacity: 1 - stackIndex * 0.18,
        zIndex:  30 - stackIndex,
        boxShadow: isTop
          ? "0 20px 60px rgba(0,0,0,0.6),0 0 40px " + item.visual.glow + "22"
          : "0 20px 60px rgba(0,0,0,0.6)",
      }}
      onPointerDown={e => { if (isTop) { onDown(e.clientX); e.currentTarget.setPointerCapture(e.pointerId); } }}
      onPointerMove={e => { if (isTop) onMove(e.clientX); }}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      {isTop && (
        <>
          <div className={"hint hl" + (hintDir === "left"  ? " hs" : "")}>← Skip</div>
          <div className={"hint hr" + (hintDir === "right" ? " hs" : "")}>✦ Add</div>
        </>
      )}
      <ItemVisual item={item} height={200} />
      <div className="cb">
        <div className="cm">
          <span className="cp">{catLabel}</span>
        </div>
        <div className="cn" style={{ fontSize:18 }}>{item.name}</div>
        <div className="cd">{item.shortDesc}</div>
        <div className="cf">
          <div className="pr" style={{ fontSize:22 }}><sup>₹</sup>{item.price}</div>
          <button className="vbtn" onClick={e => { e.stopPropagation(); onView(item); }}>Details →</button>
        </div>
      </div>
    </div>
  );
}

/* ─── SWIPE STACK
   FIX: useEffect dep is a stable useMemo string, not an inline-computed value
─── */
function SwipeStack({ items, onView }) {
  // FIX: stable dep — memoised so it doesn't recompute on every render
  const itemKey = useMemo(() => items.map(i => i.id).join(","), [items]);

  const [queue,   setQueue]   = useState(() => items.map(i => i.id));
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setQueue(items.map(i => i.id));
    setHistory([]);
  }, [itemKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const swipe = (id, dir) => {
    setHistory(h => [{ id, dir }, ...h]);
    setQueue(q => q.filter(x => x !== id));
  };

  const undo = () => {
    if (!history.length) return;
    const [last, ...rest] = history;
    setHistory(rest);
    setQueue(q => [last.id, ...q]);
  };

  const skip = () => {
    if (!queue.length) return;
    swipe(queue[0], "left");
  };

  const visible = queue.slice(0, 3).map(id => items.find(i => i.id === id)).filter(Boolean);

  return (
    <div className="sw-win">
      <div className="sw-hdr">
        <span className="sw-title">❄ Swipe to Browse</span>
        <span className="sw-cnt"><span>{queue.length}</span> / {items.length}</span>
      </div>

      <div className="stack">
        {visible.length === 0 ? (
          <div className="empty-s">
            <div className="empty-icon">🧊</div>
            <div className="empty-txt">You have seen all items in this category</div>
            <button className="rbtn" onClick={() => { setQueue(items.map(i => i.id)); setHistory([]); }}>
              ↺ Browse Again
            </button>
          </div>
        ) : (
          [...visible].reverse().map((item, idx) => (
            <SwipeCard
              key={item.id}
              item={item}
              stackIndex={visible.length - 1 - idx}
              onSwipe={swipe}
              onView={onView}
            />
          ))
        )}
      </div>

      <div className="sc-ctrl">
        <button className="cbtn" onClick={undo} disabled={!history.length} title="Undo last swipe">↩</button>
        <button className="cbtn" onClick={skip} title="Skip">✕</button>
        <button className="cbtn pri" onClick={() => visible[0] && onView(visible[0])} title="View details">👁</button>
        <button className="cbtn" onClick={skip} title="Next card">→</button>
        <button className="cbtn add-c" onClick={() => visible[0] && onView(visible[0])} title="Add to order">✦</button>
      </div>

      <p style={{ textAlign:"center", fontFamily:"var(--fm)", fontSize:10, color:"var(--t3)", letterSpacing:"0.08em", marginTop:4 }}>
        ← Drag to skip · ✦ Add to order →
      </p>
    </div>
  );
}

/* ─── AI SMART SUGGESTION
   FIX: catch(err) instead of catch {} for wider transpile compatibility
─── */
function SmartSuggestion({ item, onViewPairing }) {
  const [state, setState] = useState("loading");
  const [data,  setData]  = useState(null);

  useEffect(() => {
    setState("loading");
    setData(null);
    let cancelled = false;

    const others = MENU
      .filter(m => m.id !== item.id)
      .slice(0, 14)
      .map(m => "- " + m.name + " (" + m.category + ") - Rs" + m.price);

    const run = async () => {
      try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1000,
            messages: [{
              role: "user",
              content:
                "You are the AI pairing engine for Ice Cube Junction, a popular Indian cafe.\n\n" +
                "Item viewed: " + item.name + " (" + item.category + ") - " + item.shortDesc + "\n" +
                "Ingredients: " + item.ingredients.join(", ") + "\n\n" +
                "Menu items available:\n" + others.join("\n") + "\n\n" +
                "Pick the SINGLE best pairing. Reply ONLY in valid JSON with no markdown:\n" +
                "{\"pairing\":\"<exact name>\",\"reason\":\"<one compelling sentence>\",\"flavorNote\":\"<4 words max>\",\"pairingPrice\":<number>}"
            }],
          }),
        });
        if (cancelled) return;
        const json = await res.json();
        const txt  = (json.content || []).map(b => b.text || "").join("").replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(txt);
        if (!cancelled) { setData(parsed); setState("done"); }
      } catch (err) {                    // FIX: added err parameter
        if (!cancelled) setState("error");
      }
    };

    run();
    return () => { cancelled = true; };
  }, [item.id]);

  const paired = data
    ? MENU.find(m => m.name === data.pairing) ||
      MENU.find(m => m.name.toLowerCase().startsWith((data.pairing || "").toLowerCase().split(" ")[0]))
    : null;

  return (
    <div className="smart">
      <div className="sm-hdr">
        <div className="sm-ico">✦</div>
        <span className="sm-lbl">AI Smart Pairing</span>
        {state === "loading" && (
          <span style={{ marginLeft:"auto", fontFamily:"var(--fm)", fontSize:10, color:"var(--t3)", animation:"blink 1s infinite" }}>
            thinking…
          </span>
        )}
      </div>

      {state === "loading" && (
        <>
          <div className="sk" style={{ width:"90%" }} />
          <div className="sk" style={{ width:"70%" }} />
          <div className="sk" style={{ width:"50%" }} />
        </>
      )}

      {state === "done" && data && (
        <>
          <p className="sm-body">{data.reason}</p>
          {data.flavorNote && (
            <p style={{ fontFamily:"var(--fm)", fontSize:10, color:"var(--im)", marginTop:6 }}>
              ❄ {data.flavorNote}
            </p>
          )}
          {(paired || data.pairing) && (
            <div className="sm-pair" onClick={() => paired && onViewPairing(paired)}>
              <span style={{ fontSize:22 }}>{paired ? paired.visual.icon : "✦"}</span>
              <div>
                <div className="sm-pname">{data.pairing}</div>
                <div style={{ fontSize:11, color:"var(--t3)", marginTop:2 }}>Tap to view →</div>
              </div>
              <span className="sm-pprice">₹{data.pairingPrice || (paired ? paired.price : 0)}</span>
            </div>
          )}
        </>
      )}

      {state === "error" && (
        <p className="sm-body" style={{ color:"var(--t3)" }}>
          Ask our staff for a personal recommendation!
        </p>
      )}
    </div>
  );
}

/* ─── ITEM MODAL ─── */
function ItemModal({ item, onClose, onViewPairing, onAddToCart }) {
  useEffect(() => {
    const handleKey = e => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const catLabel = CATEGORIES.find(c => c.id === item.category)?.label || item.category;

  const tagColor = (tag) => {
    switch (tag) {
      case "SPICY":      return "#f87171";
      case "PREMIUM":    return "#fbbf24";
      case "NEW":        return "#22d3ee";
      case "BESTSELLER": return "#4ade80";
      case "POPULAR":    return "#22d3ee";
      default:           return "#a78bfa";
    }
  };

  return (
    <div className="moverlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <button className="mclose" onClick={onClose}>✕</button>
        <ItemVisual item={item} height={300} isModal />
        <div className="mbody">
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10, flexWrap:"wrap" }}>
            <span className="cp">{catLabel}</span>
            {item.tag && (
              <span style={{ fontFamily:"var(--fm)", fontSize:9, textTransform:"uppercase", letterSpacing:"0.12em", color: tagColor(item.tag) }}>
                ★ {item.tag}
              </span>
            )}
          </div>
          <div className="mname">{item.name}</div>
          <div className="mtagline">{item.description}</div>
          <div className="mpr-row">
            <div className="mpr"><sup>₹</sup>{item.price}</div>
            <button className="abtn" onClick={() => { onAddToCart(item); onClose(); }}>
              ✦ Add to Order
            </button>
          </div>
          <div className="mstats">
            <div className="stc">
              <div className="stv" style={{ color:"var(--im)" }}>₹{item.price}</div>
              <div className="stl">Price</div>
            </div>
            <div className="stc">
              <div className="stv" style={{ color:"#fbbf24" }}>{item.ingredients.length}</div>
              <div className="stl">Ingredients</div>
            </div>
            <div className="stc">
              <div className="stv" style={{ color:"#4ade80" }}>5 min</div>
              <div className="stl">Ready In</div>
            </div>
          </div>
          <div style={{ marginBottom:28 }}>
            <div className="stitle">Ingredients</div>
            <div className="ings">
              {item.ingredients.map(ing => (
                <span key={ing} className="ing">{ing}</span>
              ))}
            </div>
          </div>
          <div className="stitle" style={{ marginBottom:14 }}>Smart Pairing</div>
          <SmartSuggestion
            item={item}
            onViewPairing={p => { onClose(); setTimeout(() => onViewPairing(p), 80); }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── CART DRAWER (full order process) ─── */
function CartDrawer({ cart, ordered, onClose, onUpdate, onRemove, onPlaceOrder }) {
  const orderIdRef = useRef(Math.floor(Math.random() * 9000 + 1000));

  useEffect(() => {
    const handleKey = e => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const subtotal = cart.reduce((sum, e) => sum + e.item.price * e.qty, 0);

  if (ordered) {
    return (
      <div className="co" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
        <div className="cd-draw">
          <div className="cd-hdr">
            <span className="cd-title">Order Confirmed!</span>
            <button className="cd-x" onClick={onClose}>✕</button>
          </div>
          <div className="oconf">
            <div className="conf-ring">✓</div>
            <div className="conf-title">Order Placed</div>
            <p className="conf-sub">Your items are being prepared. Ready in just 5 minutes!</p>
            <div className="conf-id">Order #{orderIdRef.current}</div>
            <p style={{ fontSize:13, color:"var(--t2)", marginTop:4 }}>
              After 5 minutes — Order will{" "}
              <span style={{ color:"#f87171", fontWeight:700 }}>NOT be cancelled</span> ❄
            </p>
            <button className="cnbtn" onClick={onClose}>Continue Browsing</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="co" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="cd-draw">
        <div className="cd-hdr">
          <span className="cd-title">Your Order</span>
          <button className="cd-x" onClick={onClose}>✕</button>
        </div>

        <div className="cd-list">
          {cart.length === 0 ? (
            <div className="cd-empty">
              <div style={{ fontSize:48 }}>🧊</div>
              <div style={{ fontSize:14, color:"var(--t2)" }}>Your order is empty</div>
              <p style={{ fontSize:12, color:"var(--t3)", marginTop:4 }}>Add items from the menu</p>
            </div>
          ) : (
            cart.map(({ item, qty }) => (
              <div key={item.id} className="ci">
                <div className="ci-em">{item.visual.icon}</div>
                <div className="ci-info">
                  <div className="ci-name">{item.name}</div>
                  <div className="ci-price">₹{item.price * qty}</div>
                </div>
                <div className="ci-qty">
                  <button className="qbtn" onClick={() => onUpdate(item.id, qty - 1)}>−</button>
                  <span className="qn">{qty}</span>
                  <button className="qbtn" onClick={() => onUpdate(item.id, qty + 1)}>+</button>
                </div>
                <button className="qrm" onClick={() => onRemove(item.id)} title="Remove">×</button>
              </div>
            ))
          )}
        </div>

        <div className="cd-foot">
          {cart.length > 0 && (
            <div className="cd-sum">
              <div className="cd-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
              <div className="cd-row tot"><span>Total</span><span>₹{subtotal}</span></div>
            </div>
          )}
          <button
            className="cobtn"
            disabled={cart.length === 0}
            onClick={onPlaceOrder}
          >
            {cart.length === 0 ? "Add Items to Order" : "Place Order · ₹" + subtotal}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN APP
   FIX: font injection moved to useEffect (safe DOM access after mount)
─── */
export default function App() {
  // FIX: font injection inside useEffect — document is guaranteed available after mount
  useEffect(() => {
    if (!document.getElementById("icj-fonts")) {
      const link = document.createElement("link");
      link.id   = "icj-fonts";
      link.rel  = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,700&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const [category, setCategory] = useState("all");
  const [sortBy,   setSortBy]   = useState("default");
  const [viewItem, setViewItem] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [ordered,  setOrdered]  = useState(false);
  const [cartAnim, setCartAnim] = useState(false);
  const [cart, setCart]         = useState([]);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(e => e.item.id === item.id);
      if (existing) return prev.map(e => e.item.id === item.id ? { ...e, qty: e.qty + 1 } : e);
      return [...prev, { item, qty: 1 }];
    });
    setCartAnim(true);
    setTimeout(() => setCartAnim(false), 500);
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) { setCart(p => p.filter(e => e.item.id !== id)); return; }
    setCart(p => p.map(e => e.item.id === id ? { ...e, qty } : e));
  };

  const removeItem = (id) => setCart(p => p.filter(e => e.item.id !== id));

  const placeOrder = () => { setOrdered(true); setCart([]); };

  const closeCart = () => {
    setCartOpen(false);
    if (ordered) setOrdered(false);
  };

  const totalItems = cart.reduce((s, e) => s + e.qty, 0);

  const filteredItems = useMemo(() =>
    MENU
      .filter(m => category === "all" || m.category === category)
      .sort((a, b) => {
        if (sortBy === "price-asc")  return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "name")       return a.name.localeCompare(b.name);
        return 0;
      }),
    [category, sortBy]
  );

  const scrollToMenu = () => {
    const el = document.getElementById("icj-f");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCategory = (catId) => {
    setCategory(catId);
    const el = document.getElementById("icj-f");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ position:"relative", minHeight:"100vh" }}>
      <style>{CSS}</style>
      <Particles />

      {/* NAV */}
      <nav className="nav">
        <div className="logo">Ice <em>Cube</em> Junction</div>
        <div className="nav-r">
          <span style={{ fontFamily:"var(--fm)", fontSize:11, color:"var(--t3)" }}>Open · Ready in 5 min</span>
          <button
            className={"cart-btn" + (cartAnim ? " pop" : "")}
            onClick={() => setCartOpen(true)}
          >
            🛒 Order
            <span className={"cbadge" + (totalItems === 0 ? " zero" : "")}>{totalItems}</span>
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" style={{ position:"relative", zIndex:1 }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 60% at 50% 0%,rgba(34,211,238,0.07) 0%,transparent 70%)", pointerEvents:"none" }} />
        <div className="hero-tag">Open Now · Freshly Made Every Order</div>
        <h1>Where Every Sip<br /><em>Feels Like Winter</em></h1>
        <p className="hero-sub">
          Milkshakes, cold drinks, mocktails, ice creams, hot beverages and freshly made snacks — all under one roof at Ice Cube Junction.
        </p>
        <div className="pills">
          {["Milkshakes from ₹50", "Snacks from ₹20", "Ready in 5 Min", "100% Veg Menu", "Waffle Cone +₹10"].map(p => (
            <span key={p} className="pill">{p}</span>
          ))}
        </div>
        <button className="xbtn" onClick={scrollToMenu}>
          Explore Menu ↓
        </button>
      </section>

      {/* FILTERS */}
      <div className="filters" id="icj-f">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={"fbtn" + (category === cat.id ? " on" : "")}
            onClick={() => setCategory(cat.id)}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
        <div className="fsep" />
        <select className="fsel" value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="default">Sort: Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>

      {/* SHOWCASE */}
      <section className="showcase">
        <SigWindow onView={setViewItem} />
        <div className="divider" />
        <SwipeStack items={filteredItems} onView={setViewItem} />
      </section>

      {/* NOTICE */}
      <div className="notice">
        <div className="notice-box">
          <span style={{ fontSize:20 }}>⏱</span>
          <div>
            Order ready in <strong>5 minutes</strong>! After 5 minutes your order will{" "}
            <strong style={{ color:"#f87171" }}>NOT be cancelled.</strong>
            &nbsp;|&nbsp; ✨ <strong>Upgrade to Waffle Cone</strong> for just{" "}
            <strong>₹10 extra!</strong>
          </div>
        </div>
      </div>

      {/* BRANCHES */}
      <div className="branches" style={{ marginTop:48 }}>
        <div className="branches-title">Our <em>Locations</em></div>
        <p className="branches-sub">Two branches, same royal quality — visit us near you</p>
        <div className="branches-grid">

          {/* BRANCH 1 — MAIN */}
          <div className="branch-card main">
            <span className="branch-divider-label" style={{ color:"var(--gold)" }}>★ Main Branch</span>
            <iframe
              className="branch-map"
              title="Ice Cube Junction Main Branch"
              height="220"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=Ch-125+Delhi+Mumbai+Expy+Pinan+Jodhpura+Rajasthan+301413&output=embed"
            />
            <div className="branch-body">
              <div className="branch-badge main-b">★ Main Branch</div>
              <div className="branch-name">Ice Cube Junction</div>
              <div className="branch-addr">
                Ch-125, Delhi – Mumbai Expy, Pinan,<br />
                Jodhpura, Rajasthan 301413
              </div>
              <div className="branch-links">
                <a className="branch-link call" href="tel:7891520807">📞 7891520807</a>
                <a className="branch-link" href="https://maps.google.com/?q=Ch-125+Delhi+Mumbai+Expy+Pinan+Jodhpura+Rajasthan+301413" target="_blank" rel="noreferrer">🗺 Directions</a>
                <a className="branch-link" href="https://wa.me/917891520807" target="_blank" rel="noreferrer">💬 WhatsApp</a>
              </div>
            </div>
          </div>

          {/* BRANCH 2 — SECOND */}
          <div className="branch-card">
            <span className="branch-divider-label" style={{ color:"var(--im)" }}>❄ Second Branch</span>
            <iframe
              className="branch-map"
              title="Cafe by Ice Cube Junction"
              height="220"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=Mehandipur+Parli+Rajasthan+303509&output=embed"
            />
            <div className="branch-body">
              <div className="branch-badge second-b">❄ Second Branch</div>
              <div className="branch-name">Cafe by Ice Cube Junction</div>
              <div className="branch-addr">
                Mehandipur, Parli,<br />
                Rajasthan 303509
              </div>
              <div className="branch-links">
                <a className="branch-link call" href="tel:7891520807">📞 7891520807</a>
                <a className="branch-link" href="https://maps.google.com/?q=Mehandipur+Parli+Rajasthan+303509" target="_blank" rel="noreferrer">🗺 Directions</a>
                <a className="branch-link" href="https://wa.me/917891520807" target="_blank" rel="noreferrer">💬 WhatsApp</a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* FEATURES */}
      <div className="feats" style={{ marginTop:32 }}>
        {[
          { icon:"🥤", title:"40+ Milkshakes",      desc:"Signature, dry fruit & fresh fruit shakes from ₹50" },
          { icon:"🧊", title:"Cold Drinks",           desc:"Coffees, mojitos, iced teas, juices & thirst quenchers" },
          { icon:"🍦", title:"11 Ice Cream Flavours", desc:"Bowl or waffle cone upgrade — just ₹10 extra!" },
          { icon:"🍴", title:"Fresh Hot Snacks",      desc:"Maggi, noodles, rolls, burgers, momos & more" },
        ].map(f => (
          <div key={f.title} className="fc">
            <span style={{ fontSize:28 }}>{f.icon}</span>
            <div style={{ fontFamily:"var(--fd)", fontWeight:600, fontSize:17, letterSpacing:"-0.02em" }}>{f.title}</div>
            <div style={{ fontSize:13, color:"var(--t2)", lineHeight:1.5 }}>{f.desc}</div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <footer className="footer" style={{ position:"relative", zIndex:1 }}>
        <div className="ft-brand">
          <div className="ft-name">Ice <em>Cube</em> Junction</div>
          <p className="ft-sub">Cold beverages, milkshakes, ice creams and freshly made snacks. Pure vegetarian. Made fresh, served fast.</p>
        </div>
        <div className="ft-col">
          <h4>Menu</h4>
          <ul>
            {CATEGORIES.filter(c => c.id !== "all").map(c => (
              <li key={c.id} onClick={() => scrollToCategory(c.id)}>
                {c.icon} {c.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="ft-col">
          <h4>Main Branch</h4>
          <ul>
            <li>📍 Ch-125, Delhi–Mumbai Expy</li>
            <li style={{ paddingLeft:20, marginTop:-4 }}>Pinan, Jodhpura, RJ 301413</li>
            <li><a href="tel:7891520807" style={{ color:"inherit", textDecoration:"none" }}>📞 7891520807</a></li>
            <li><a href="https://wa.me/917891520807" target="_blank" rel="noreferrer" style={{ color:"inherit", textDecoration:"none" }}>💬 WhatsApp Us</a></li>
            <li>🕙 Open Daily</li>
            <li>🌿 100% Vegetarian</li>
          </ul>
        </div>
        <div className="ft-col">
          <h4>Second Branch</h4>
          <ul>
            <li>📍 Mehandipur, Parli</li>
            <li style={{ paddingLeft:20, marginTop:-4 }}>Rajasthan 303509</li>
            <li><a href="tel:7891520807" style={{ color:"inherit", textDecoration:"none" }}>📞 7891520807</a></li>
            <li>⏱ Ready in 5 Minutes</li>
            <li>✨ Waffle Cone Upgrade ₹10</li>
            <li>💳 All Payments Accepted</li>
          </ul>
        </div>
        <div className="ft-bot">
          <span>© 2025 <span>Ice Cube Junction</span>. All rights reserved. · Jodhpura &amp; Parli, Rajasthan</span>
          <span>AI Pairing by <span>Claude</span> · Digital billing ready</span>
        </div>
      </footer>

      {/* ITEM MODAL */}
      {viewItem && (
        <ItemModal
          item={viewItem}
          onClose={() => setViewItem(null)}
          onViewPairing={setViewItem}
          onAddToCart={item => { addToCart(item); setViewItem(null); }}
        />
      )}

      {/* CART DRAWER */}
      {cartOpen && (
        <CartDrawer
          cart={cart}
          ordered={ordered}
          onClose={closeCart}
          onUpdate={updateQty}
          onRemove={removeItem}
          onPlaceOrder={placeOrder}
        />
      )}
    </div>
  );
}
