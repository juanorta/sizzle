"use client";

import Image from "next/image";
import { useMemo } from "react";
import type { Recipe } from "@/lib/types";
import { RECIPES } from "@/lib/recipes";

type Props = {
  chosenRecipeIds: number[] | null;
  cartCount: number;
  inCart: (recipeId: number) => boolean;
  onOpenRecipe: (recipe: Recipe) => void;
};

export function CookView({ chosenRecipeIds, inCart, onOpenRecipe }: Props) {
  const recipes = useMemo(() => {
    if (!chosenRecipeIds || chosenRecipeIds.length === 0) return RECIPES;
    const filtered = RECIPES.filter((r) => chosenRecipeIds.includes(r.id));
    return filtered.length > 0 ? filtered : RECIPES;
  }, [chosenRecipeIds]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-[11px] uppercase tracking-[0.3em] text-ink/55">
          Your meals
        </p>
        <h2 className="font-display text-4xl font-medium leading-tight tracking-tight">
          What are you cooking?
        </h2>
        <p className="text-sm text-ink/55">
          Tap a recipe to see the nutrition and add its ingredients to your Walmart cart.
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-3">
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <button
              type="button"
              onClick={() => onOpenRecipe(recipe)}
              className="group block w-full overflow-hidden rounded-2xl bg-cream text-left ring-1 ring-ink/10 transition hover:ring-ink/30"
            >
              <div className="relative aspect-square w-full bg-creamDeep">
                <Image
                  src={recipe.image}
                  alt={recipe.name}
                  fill
                  sizes="(max-width: 480px) 50vw, 240px"
                  className="object-cover transition group-hover:scale-[1.03]"
                />
                <span className="absolute left-2 top-2 rounded-full bg-cream/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink shadow-sm backdrop-blur">
                  {recipe.cookTime} min
                </span>
                {inCart(recipe.id) && (
                  <span
                    aria-label="In cart"
                    title="In cart"
                    className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-ember text-cream shadow-sm ring-2 ring-cream"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                      <path
                        d="M2.5 7.5L5.5 10.5L11.5 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
              </div>
              <div className="space-y-1.5 px-3 py-3">
                <p className="line-clamp-2 h-[2.75em] text-[13px] font-medium leading-snug text-ink">
                  {recipe.name}
                </p>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-ink/50">
                  <span>{recipe.nutrition.calories} cal</span>
                  <span aria-hidden className="h-0.5 w-0.5 rounded-full bg-ink/30" />
                  <span>{recipe.nutrition.protein}g protein</span>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
