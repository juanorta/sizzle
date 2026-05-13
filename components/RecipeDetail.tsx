"use client";

import type { Recipe } from "@/lib/types";
import { CartButton } from "./CartButton";
import { RecipeBody } from "./RecipeBody";

type Props = {
  recipe: Recipe;
  inCart: boolean;
  cartCount: number;
  onBack: () => void;
  onAddToCart: (recipe: Recipe) => void;
  onOpenCart: () => void;
};

export function RecipeDetail({
  recipe,
  inCart,
  cartCount,
  onBack,
  onAddToCart,
  onOpenCart,
}: Props) {
  const cartableCount = recipe.ingredients.filter((i) => i.walmartUpc).length;

  return (
    <main className="mx-auto max-w-md px-4 pb-32 pt-4 sm:max-w-xl sm:px-6">
      <header className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-ink/65 underline-offset-4 hover:underline"
        >
          ← Anything else?
        </button>
        <CartButton count={cartCount} onClick={onOpenCart} />
      </header>

      <RecipeBody recipe={recipe} />

      <div className="fixed inset-x-0 bottom-0 z-20 px-4 pb-4 pt-2 sm:left-1/2 sm:max-w-xl sm:-translate-x-1/2 sm:px-6">
        <div className="mx-auto max-w-md sm:max-w-xl">
          <button
            type="button"
            onClick={() => onAddToCart(recipe)}
            disabled={inCart}
            className={`flex w-full items-center justify-center gap-2 rounded-full py-4 text-base font-medium shadow-card transition active:scale-[0.98] disabled:active:scale-100 ${
              inCart
                ? "bg-cream text-ink ring-1 ring-ink/15"
                : "bg-ink text-cream"
            }`}
          >
            {inCart ? (
              <>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M3 8.5L6.5 12L13 4.5"
                    stroke="#C2410C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                In cart
              </>
            ) : (
              `Add ${cartableCount} ${cartableCount === 1 ? "ingredient" : "ingredients"} to cart`
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
