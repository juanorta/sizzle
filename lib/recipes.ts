import type { Recipe } from "./types";

// Walmart Item IDs — the numeric ID from product URLs (walmart.com/ip/<slug>/<ID>).
// User-tested empirically: green_beans, garlic, olive_oil, butter consistently
// land in the cart via the `items=` deep link. Used as the preferred resolver
// for those products; UPCs are the fallback for the rest.
export const WALMART_ITEM_IDS: Record<string, string | undefined> = {
  green_beans: "14053328",   // user-confirmed
  garlic: "55014398",        // user-confirmed
  olive_oil: "10315102",     // user-confirmed
  butter: "10315054",        // user-confirmed
  // Items with no national UPC — fall back to Item IDs.
  steak: "883549613",        // 44 Farms USDA Choice Family Frozen Steak Cuts (ship-eligible)
  lemon: "44391659",         // Fresh Lemons, 2 lb Bag
  sweet_potato: "132720824", // Sweet Potatoes Whole Fresh, 3 lb Bag
};

// UPCs (Universal Product Codes) — 12-digit numeric strings. Sent via the
// `upcs=` parameter. Used when no item ID is known (the larger set).
// `undefined` values are silently skipped at cart-build time.
export const WALMART_UPCS: Record<string, string | undefined> = {
  // staples
  green_beans: "681131328869",   // Marketside Fresh Green Beans, 12 oz
  garlic: "070969003367",        // Spice World Fresh Garlic, 3 bulbs
  olive_oil: "078742427782",     // Great Value 100% Extra Virgin Olive Oil, 17 fl oz
  butter: "078742374277",        // Great Value Sweet Cream Unsalted Butter, 16 oz
  rice: "078742352053",          // Great Value Long Grain Enriched Rice, 2 lb
  // proteins (frozen for shipping/catalog availability)
  chicken_breast: "078742373942", // Great Value frozen boneless skinless breast fillets, 3 lb
  chicken_thighs: "023700472595", // Tyson frozen boneless skinless thighs, 2.5 lb
  salmon: "194346053452",         // Great Value frozen skinless Atlantic salmon portions, 2 lb
  shrimp: "078742001357",         // Great Value frozen peeled & deveined jumbo raw shrimp, 16 oz
  steak: undefined,               // NOT_FOUND — fresh steak uses random-weight UPCs (not national)
  // produce
  lemon: undefined,               // NOT_FOUND — fresh lemon bags have variable-supplier UPCs
  sweet_potato: undefined,        // NOT_FOUND — fresh produce bags have generic/variable UPCs
  asparagus: "605388186591",      // Great Value Asparagus Spears, 8 oz (frozen)
  baby_potatoes: "826088581107",  // Tasteful Selections Honey Gold 2-Bite, 24 oz
  // shelf-stable herbs / spices
  thyme: "052100004266",          // McCormick Thyme Leaves, 0.37 oz
  parsley: "052100003824",        // McCormick Parsley Flakes, 0.87 oz
  smoked_paprika: "078742369365", // Great Value Smoked Paprika, 2 oz
  // pantry staples
  salt: "024600010030",           // Morton Iodized Salt, 26 oz round can
  black_pepper: "052100052311",   // McCormick Pure Ground Black Pepper, 3 oz
  garlic_powder: "052100006260",  // McCormick Garlic Powder, 3.12 oz
};

export const RECIPES: Recipe[] = [
  {
    id: 1,
    name: "Pan-Seared Chicken with Garlic Green Beans",
    blurb: "Golden-crusted chicken, snappy green beans, one pan.",
    equipment: ["stove"],
    ingredients: [
      { name: "Boneless skinless chicken breasts (frozen)", quantity: "family bag (use 1 lb)", walmartUpc: WALMART_UPCS.chicken_breast },
      { name: "Fresh green beans", quantity: "12 oz, trimmed", walmartUpc: WALMART_UPCS.green_beans, walmartItemId: WALMART_ITEM_IDS.green_beans },
      { name: "Garlic", quantity: "4 cloves, sliced", walmartUpc: WALMART_UPCS.garlic, walmartItemId: WALMART_ITEM_IDS.garlic },
      { name: "Olive oil", quantity: "2 tbsp", walmartUpc: WALMART_UPCS.olive_oil, walmartItemId: WALMART_ITEM_IDS.olive_oil },
      { name: "Salt", quantity: "to taste", walmartUpc: WALMART_UPCS.salt },
      { name: "Black pepper", quantity: "to taste", walmartUpc: WALMART_UPCS.black_pepper },
    ],
    instructions: [
      "Heat olive oil in a large pan over medium-high heat until shimmering.",
      "Pat chicken dry, season both sides with salt and pepper. Sear 6–7 minutes per side until deeply golden and 165°F inside.",
      "Move chicken to a plate. Add green beans and garlic to the same pan.",
      "Cook 5–6 minutes, tossing once, until beans are blistered and garlic is fragrant.",
      "Slice chicken on the bias. Plate over beans.",
    ],
    cookTime: 18,
    servings: 2,
    image:
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1200&q=70",
    tips: "Don't move the chicken around. Let it sear. If it's sticking to the pan, it's not ready to flip yet.",
    nutrition: { calories: 520, protein: 48, carbs: 14, fat: 30, sodium: 540 },
    techniques: ["sear", "sauté"],
  },
  {
    id: 2,
    name: "Sheet-Pan Lemon Salmon & Asparagus",
    blurb: "One pan, 15 minutes, restaurant plate.",
    equipment: ["oven"],
    ingredients: [
      { name: "Atlantic salmon portions (frozen)", quantity: "2 lb bag (use 2 portions)", walmartUpc: WALMART_UPCS.salmon },
      { name: "Asparagus spears (frozen)", quantity: "8 oz bag", walmartUpc: WALMART_UPCS.asparagus },
      { name: "Lemons", quantity: "2 lb bag (use 1)", walmartItemId: WALMART_ITEM_IDS.lemon },
      { name: "Olive oil", quantity: "2 tbsp", walmartUpc: WALMART_UPCS.olive_oil, walmartItemId: WALMART_ITEM_IDS.olive_oil },
      { name: "Salt", quantity: "to taste", walmartUpc: WALMART_UPCS.salt },
      { name: "Black pepper", quantity: "to taste", walmartUpc: WALMART_UPCS.black_pepper },
      { name: "Garlic powder", quantity: "1/2 tsp", walmartUpc: WALMART_UPCS.garlic, walmartItemId: WALMART_ITEM_IDS.garlic_powder },
    ],
    instructions: [
      "Heat oven to 425°F. Line a sheet pan with parchment.",
      "Toss asparagus with 1 tbsp olive oil, salt, and pepper. Spread on the pan.",
      "Pat salmon dry, rub with remaining oil, season with salt, pepper, garlic powder. Nestle on the pan.",
      "Roast 12–14 minutes until salmon flakes and asparagus is tender-crisp.",
      "Finish with lemon juice and a few twists of pepper.",
    ],
    cookTime: 15,
    servings: 2,
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=70",
    tips: "Salmon is done when it flakes easily but the center still looks slightly translucent. It keeps cooking on the plate.",
    nutrition: { calories: 480, protein: 38, carbs: 9, fat: 32, sodium: 410 },
    techniques: ["sheet-pan", "roast"],
  },
  {
    id: 3,
    name: "Air-Fryer Crispy Chicken Thighs & Sweet Potato",
    blurb: "Crackling skin, fluffy fries, zero babysitting.",
    equipment: ["air_fryer"],
    ingredients: [
      { name: "Boneless skinless chicken thighs (frozen)", quantity: "2.5 lb bag (use 4 thighs)", walmartUpc: WALMART_UPCS.chicken_thighs },
      { name: "Sweet potatoes", quantity: "3 lb bag (use 1 large)", walmartItemId: WALMART_ITEM_IDS.sweet_potato },
      { name: "Olive oil", quantity: "1 tbsp", walmartUpc: WALMART_UPCS.olive_oil, walmartItemId: WALMART_ITEM_IDS.olive_oil },
      { name: "Smoked paprika", quantity: "1 tsp", walmartUpc: WALMART_UPCS.smoked_paprika },
      { name: "Garlic powder", quantity: "1 tsp", walmartUpc: WALMART_UPCS.garlic, walmartItemId: WALMART_ITEM_IDS.garlic_powder },
      { name: "Salt", quantity: "to taste", walmartUpc: WALMART_UPCS.salt },
      { name: "Black pepper", quantity: "to taste", walmartUpc: WALMART_UPCS.black_pepper },
    ],
    instructions: [
      "Pat thighs very dry. Rub with paprika, garlic powder, salt, pepper.",
      "Air-fry thighs at 400°F for 20 minutes, skin-side up, until 175°F internal.",
      "Toss sweet potato fries with olive oil, salt, pepper.",
      "Rest the chicken. Air-fry the fries at 400°F for 12 minutes, shaking halfway.",
      "Serve fries alongside the thighs.",
    ],
    cookTime: 20,
    servings: 2,
    image:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1200&q=70",
    tips: "Dry skin = crispy skin. Pat the thighs with paper towels and don't crowd the basket. Give each one room to crisp.",
    nutrition: { calories: 610, protein: 42, carbs: 28, fat: 36, sodium: 620 },
    techniques: ["air-fry"],
  },
  {
    id: 4,
    name: "Garlic Butter Shrimp over Rice",
    blurb: "Buttery shrimp in 8 minutes flat.",
    equipment: ["stove"],
    ingredients: [
      { name: "Large shrimp, peeled and deveined (frozen)", quantity: "1 lb bag", walmartUpc: WALMART_UPCS.shrimp },
      { name: "Unsalted butter", quantity: "3 tbsp", walmartUpc: WALMART_UPCS.butter, walmartItemId: WALMART_ITEM_IDS.butter },
      { name: "Garlic", quantity: "4 cloves, minced", walmartUpc: WALMART_UPCS.garlic, walmartItemId: WALMART_ITEM_IDS.garlic },
      { name: "Lemons", quantity: "2 lb bag (use 1)", walmartItemId: WALMART_ITEM_IDS.lemon },
      { name: "Long-grain white rice", quantity: "2 cups cooked", walmartUpc: WALMART_UPCS.rice },
      { name: "Dried parsley flakes", quantity: "1 tsp", walmartUpc: WALMART_UPCS.parsley },
    ],
    instructions: [
      "Melt butter in a large pan over medium heat. Add garlic, cook 30 seconds until fragrant.",
      "Add shrimp in a single layer. Cook 2 minutes per side until pink and curled.",
      "Squeeze in juice of half the lemon. Toss.",
      "Spoon shrimp and butter over warm rice.",
      "Finish with parsley and a wedge of lemon if you have it.",
    ],
    cookTime: 12,
    servings: 2,
    image:
      "https://images.unsplash.com/photo-1633504581786-316c8002b1b9?auto=format&fit=crop&w=1200&q=70",
    tips: "Shrimp goes from perfect to rubbery fast. Pull them off the heat the moment they curl into a C shape.",
    nutrition: { calories: 560, protein: 36, carbs: 48, fat: 24, sodium: 690 },
    techniques: ["sauté", "boil"],
  },
  {
    id: 5,
    name: "Cast-Iron Steak with Smashed Potatoes",
    blurb: "Steakhouse dinner. Under 25 minutes. At home.",
    equipment: ["stove", "oven"],
    ingredients: [
      { name: "Ribeye steak", quantity: "1 (1 inch thick)", walmartItemId: WALMART_ITEM_IDS.steak },
      { name: "Baby gold potatoes", quantity: "3 lb bag (use 1 lb)", walmartUpc: WALMART_UPCS.baby_potatoes },
      { name: "Unsalted butter", quantity: "2 tbsp", walmartUpc: WALMART_UPCS.butter, walmartItemId: WALMART_ITEM_IDS.butter },
      { name: "Garlic", quantity: "2 cloves, smashed", walmartUpc: WALMART_UPCS.garlic, walmartItemId: WALMART_ITEM_IDS.garlic },
      { name: "Dried thyme", quantity: "1/2 tsp", walmartUpc: WALMART_UPCS.thyme },
      { name: "Salt", quantity: "to taste", walmartUpc: WALMART_UPCS.salt },
      { name: "Black pepper", quantity: "to taste", walmartUpc: WALMART_UPCS.black_pepper },
    ],
    instructions: [
      "Boil potatoes 15 minutes until fork-tender. Drain. Heat oven to 425°F.",
      "Smash potatoes on a sheet pan, drizzle with oil, salt, pepper. Roast 15 minutes until crisp.",
      "Salt steak generously. Heat cast iron until smoking. Sear steak 3 minutes per side.",
      "Add butter, garlic, thyme. Tilt the pan and baste the steak for 60 seconds.",
      "Rest steak 5 minutes. Slice against the grain. Serve with potatoes.",
    ],
    cookTime: 25,
    servings: 2,
    image:
      "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=70",
    tips: "Rest the steak. Cutting it early dumps all the juice on the board instead of leaving it in the meat.",
    nutrition: { calories: 720, protein: 52, carbs: 34, fat: 42, sodium: 580 },
    techniques: ["sear", "baste", "cast-iron", "roast"],
  },
  {
    id: 6,
    name: "Lemon Pepper Chicken & Rice",
    blurb: "Bright, buttery, dinner in 20.",
    equipment: ["stove"],
    ingredients: [
      { name: "Boneless skinless chicken breasts (frozen)", quantity: "8 lb bag (use 1 lb)", walmartUpc: WALMART_UPCS.chicken_breast },
      { name: "Long-grain white rice", quantity: "1 cup, uncooked", walmartUpc: WALMART_UPCS.rice },
      { name: "Lemons", quantity: "2 lb bag (use 1)", walmartItemId: WALMART_ITEM_IDS.lemon },
      { name: "Unsalted butter", quantity: "2 tbsp", walmartUpc: WALMART_UPCS.butter, walmartItemId: WALMART_ITEM_IDS.butter },
      { name: "Garlic", quantity: "3 cloves, minced", walmartUpc: WALMART_UPCS.garlic, walmartItemId: WALMART_ITEM_IDS.garlic },
      { name: "Salt", quantity: "to taste", walmartUpc: WALMART_UPCS.salt },
      { name: "Black pepper", quantity: "lots, be generous", walmartUpc: WALMART_UPCS.black_pepper },
    ],
    instructions: [
      "Rinse rice. Simmer with 2 cups water, lid on, 18 minutes. Don't peek.",
      "Pat chicken dry. Season heavily with salt and black pepper. Really lean into the pepper.",
      "Melt butter in a pan over medium-high heat. Sear chicken 6–7 minutes per side until 165°F inside.",
      "Drop heat, add garlic and a big squeeze of lemon. Spoon the butter over the chicken for 30 seconds.",
      "Slice the chicken on the bias. Serve over rice, drizzle with the pan butter, finish with one more squeeze of lemon.",
    ],
    cookTime: 22,
    servings: 2,
    image:
      "https://images.unsplash.com/photo-1603496987674-79600a000f55?auto=format&fit=crop&w=1200&q=70",
    tips: "Black pepper makes this dish. Don't be shy. You should see it crusted on the chicken, not lightly dusted.",
    nutrition: { calories: 580, protein: 50, carbs: 52, fat: 18, sodium: 510 },
    techniques: ["sear", "boil"],
  },
];

// Deterministic pick — same recipe for the same ISO week.
// Kept for the Streak tab's "this week's pick" hint.
export function recipeForWeek(isoWeek: string, available: Recipe[] = RECIPES): Recipe {
  let hash = 0;
  for (let i = 0; i < isoWeek.length; i++) {
    hash = (hash * 31 + isoWeek.charCodeAt(i)) | 0;
  }
  const idx = Math.abs(hash) % available.length;
  return available[idx];
}
