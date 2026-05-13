export type Equipment =
  | "stove"
  | "oven"
  | "air_fryer"
  | "microwave"
  | "slow_cooker";

export const EQUIPMENT_OPTIONS: { id: Equipment; label: string; icon: string }[] = [
  { id: "stove", label: "Stove", icon: "🔥" },
  { id: "oven", label: "Oven", icon: "🔆" },
  { id: "air_fryer", label: "Air fryer", icon: "🌀" },
  { id: "microwave", label: "Microwave", icon: "📡" },
  { id: "slow_cooker", label: "Slow cooker", icon: "🥘" },
];

export type Ingredient = {
  name: string;          // "Chicken breasts"
  quantity: string;      // human-readable: "2 breasts" / "1 lb"
  // Walmart cart resolver — supply either or both. Item IDs (numeric ID
  // from product URLs) and UPCs each resolve differently in Walmart's
  // affiliate cart parser; some items only land via one or the other.
  // When both are present, the Item ID takes precedence.
  walmartItemId?: string;
  walmartUpc?: string;
  pantry?: boolean;       // unused in v1 — reserved for a future "I have this" toggle
};

export type NutritionFacts = {
  calories: number;
  protein: number; // grams
  carbs: number;   // grams
  fat: number;     // grams
  sodium?: number; // mg (optional)
};

export type Recipe = {
  id: number;
  name: string;
  blurb: string;
  equipment: Equipment[];
  ingredients: Ingredient[];
  instructions: string[];
  cookTime: number;
  servings: number;
  image: string;
  tips: string;
  nutrition: NutritionFacts;
  techniques: string[]; // short canonical names: sear, sauté, roast, baste, air-fry, sheet-pan, boil, cast-iron
};

// One per recipe per Walmart send. Starts pending; the user confirms cook
// later via the Progress dashboard. Drives the Progress dashboard's metrics.
export type CookEntry = {
  id: string;              // `${recipeId}-${orderedAt}` — stable React key
  recipeId: number;
  orderedAt: string;       // ISO timestamp at Send-to-Walmart click
  cookedAt: string | null; // ISO when user confirmed, else null while pending
};

export type CartItem = {
  cartKey: string;       // walmartItemId or walmartUpc — whichever exists, used for dedupe / React keys
  walmartItemId?: string;
  walmartUpc?: string;
  name: string;
  quantity: string;     // display only
  cartQty: number;      // numeric multiplier sent to Walmart
  fromRecipeId: number; // which recipe added this
};

export type WeekRecord = {
  isoWeek: string; // YYYY-Www, e.g. "2026-W19"
  cookedAt: string; // ISO timestamp
  recipeId: number;
};

export type Account = {
  name: string;
  email: string;
  createdAt: string;
};

export type SizzleState = {
  account: Account | null;
  chosenRecipeIds: number[] | null;
  cart: CartItem[];
  cookEntries: CookEntry[];
  user: {
    equipment: Equipment[];
    createdAt: string;
  } | null;
  weeks: WeekRecord[]; // legacy, unused — kept to avoid touching unrelated files
};

export const STORAGE_KEY = "sizzle:v1";
