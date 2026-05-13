import Image from "next/image";
import type { Recipe } from "@/lib/types";
import { NutritionFacts } from "./NutritionFacts";

type Props = {
  recipe: Recipe;
  showInstructions?: boolean;
};

// Shared render for both the full RecipeDetail page and the AddMeals preview sheet.
export function RecipeBody({ recipe, showInstructions = true }: Props) {
  return (
    <div className="space-y-6">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-creamDeep">
        <Image
          src={recipe.image}
          alt={recipe.name}
          fill
          priority={showInstructions}
          sizes="(max-width: 768px) 100vw, 640px"
          className="object-cover"
        />
      </div>

      <header className="space-y-2">
        <p className="text-[11px] uppercase tracking-[0.25em] text-ink/55">
          {recipe.cookTime} min · serves {recipe.servings}
        </p>
        <h2 className="font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
          {recipe.name}
        </h2>
        <p className="text-ink/70">{recipe.blurb}</p>
      </header>

      <NutritionFacts nutrition={recipe.nutrition} servings={recipe.servings} />

      <section className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/55">
          You'll need
        </h3>
        <ul className="space-y-1.5">
          {recipe.ingredients.map((ing) => (
            <li
              key={ing.name}
              className="flex items-baseline justify-between gap-4 text-[15px] leading-snug text-ink/85"
            >
              <span className="flex items-baseline gap-2">
                <span aria-hidden className="h-1 w-1 rounded-full bg-ink/35" />
                <span>{ing.name}</span>
              </span>
              <span className="text-ink/55">{ing.quantity}</span>
            </li>
          ))}
        </ul>
      </section>

      {showInstructions && (
        <section className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/55">
            How to cook it
          </h3>
          <ol className="space-y-4">
            {recipe.instructions.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span
                  aria-hidden
                  className="font-display text-2xl font-medium leading-none text-ember/80"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="pt-0.5 text-[15px] leading-relaxed text-ink/85">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="rounded-2xl bg-creamDeep px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/55">
          One tip
        </p>
        <p className="mt-1 text-[15px] leading-snug text-ink/80">{recipe.tips}</p>
      </section>
    </div>
  );
}
