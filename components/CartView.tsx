"use client";

import { useMemo } from "react";
import type { CartItem } from "@/lib/types";
import { RECIPES } from "@/lib/recipes";
import { buildWalmartCartUrl } from "@/lib/walmart";

type Props = {
  cart: CartItem[];
  onBack: () => void;
  onRemove: (cartKey: string) => void;
  onSetQty: (cartKey: string, qty: number) => void;
  onClear: () => void;
  onCheckout: (recipeIds: number[]) => void;
};

export function CartView({ cart, onBack, onRemove, onSetQty, onClear, onCheckout }: Props) {
  // Group items by source recipe for display.
  const groups = useMemo(() => {
    const byRecipe = new Map<number, CartItem[]>();
    for (const item of cart) {
      const list = byRecipe.get(item.fromRecipeId) ?? [];
      list.push(item);
      byRecipe.set(item.fromRecipeId, list);
    }
    return Array.from(byRecipe.entries()).map(([recipeId, items]) => ({
      recipe: RECIPES.find((r) => r.id === recipeId),
      items,
    }));
  }, [cart]);

  const totalItems = cart.reduce((sum, c) => sum + c.cartQty, 0);
  const walmartUrl = useMemo(() => buildWalmartCartUrl(cart), [cart]);

  function sendToWalmart() {
    if (!walmartUrl) return;
    // Open Walmart in a new tab so the Sizzle app stays alive. The cart is
    // considered "checked out" from our side once handed off — log the
    // recipes for the Progress dashboard, clear it, and route the user back
    // to the recipe grid.
    window.open(walmartUrl, "_blank", "noopener");
    const recipeIds = Array.from(new Set(cart.map((c) => c.fromRecipeId)));
    onCheckout(recipeIds);
    onClear();
    onBack();
  }

  return (
    <main className="mx-auto max-w-md px-4 pb-32 pt-4 sm:max-w-xl sm:px-6">
      <header className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-ink/65 underline-offset-4 hover:underline"
        >
          ← Recipes
        </button>
        {cart.length > 0 && (
          <button
            type="button"
            onClick={() => {
              if (confirm("Clear the whole cart?")) onClear();
            }}
            className="text-xs text-ink/45 underline-offset-4 hover:underline"
          >
            clear cart
          </button>
        )}
      </header>

      <div className="space-y-2">
        <p className="text-[11px] uppercase tracking-[0.3em] text-ink/55">Your cart</p>
        <h2 className="font-display text-4xl font-medium leading-tight tracking-tight">
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </h2>
        <p className="text-sm text-ink/55">
          We'll open Walmart with this cart pre-filled. Sign in there to check out.
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="mt-12 rounded-2xl bg-creamDeep px-6 py-10 text-center">
          <p className="text-ink/65">Your cart is empty.</p>
          <p className="mt-1 text-sm text-ink/45">
            Pick a recipe and tap <span className="font-medium text-ink/70">Add to cart</span>.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-8">
          {groups.map(({ recipe, items }) => (
            <section key={recipe?.id ?? "unknown"} className="space-y-3">
              <header>
                <p className="text-[10px] uppercase tracking-[0.22em] text-ink/45">
                  From recipe
                </p>
                <h3 className="font-display text-xl font-medium tracking-tight">
                  {recipe?.name ?? "Unknown recipe"}
                </h3>
              </header>

              <ul className="space-y-2 rounded-2xl bg-cream ring-1 ring-ink/10">
                {items.map((item) => (
                  <li
                    key={item.cartKey}
                    className="flex items-center gap-3 border-b border-ink/10 px-4 py-3 last:border-b-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[15px] font-medium text-ink">
                        {item.name}
                      </p>
                      <p className="text-xs text-ink/50">{item.quantity}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <QtyButton
                        label="Decrease"
                        onClick={() => onSetQty(item.cartKey, item.cartQty - 1)}
                      >
                        <svg width="12" height="2" viewBox="0 0 12 2">
                          <path d="M1 1h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      </QtyButton>
                      <span className="w-5 text-center font-display text-base font-medium">
                        {item.cartQty}
                      </span>
                      <QtyButton
                        label="Increase"
                        onClick={() => onSetQty(item.cartKey, item.cartQty + 1)}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12">
                          <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      </QtyButton>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemove(item.cartKey)}
                      aria-label={`Remove ${item.name}`}
                      className="rounded-full p-1 text-ink/35 hover:text-ink/70"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M3 3l8 8M11 3l-8 8"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      <div className="fixed inset-x-0 bottom-0 z-20 px-4 pb-4 pt-2 sm:left-1/2 sm:max-w-xl sm:-translate-x-1/2 sm:px-6">
        <div className="mx-auto max-w-md sm:max-w-xl">
          <button
            type="button"
            onClick={sendToWalmart}
            disabled={!walmartUrl}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-ember py-4 text-base font-semibold text-cream shadow-card transition active:scale-[0.98] disabled:opacity-30"
          >
            Send to Walmart
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <p className="mt-2 hidden text-center text-[11px] leading-relaxed text-ink/45 sm:block">
            Opens Walmart with your cart pre-filled. Some items may default to shipping.
            Tap each one at checkout and choose <span className="font-medium text-ink/70">Pickup</span> if you'd rather grab them at the store.
          </p>
        </div>
      </div>
    </main>
  );
}

function QtyButton({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-7 w-7 place-items-center rounded-full bg-ink/5 text-ink transition hover:bg-ink/10"
    >
      {children}
    </button>
  );
}
