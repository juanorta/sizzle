"use client";

import { useState } from "react";
import type { Recipe } from "@/lib/types";
import { useSizzle } from "@/lib/useSizzle";
import { CartButton } from "./CartButton";
import { CartView } from "./CartView";
import { CookView } from "./CookView";
import { Progress } from "./Progress";
import { RecipeDetail } from "./RecipeDetail";
import { UserMenu } from "./UserMenu";

type Tab = "cook" | "progress";
type View = "tab" | "recipe" | "cart";

type Props = {
  api: ReturnType<typeof useSizzle>;
};

export function MainApp({ api }: Props) {
  const {
    state,
    reset,
    addRecipeToCart,
    removeCartItem,
    setCartQty,
    clearCart,
    recordSentCart,
    markCooked,
  } = api;
  const [tab, setTab] = useState<Tab>("cook");
  const [view, setView] = useState<View>("tab");
  const [openRecipe, setOpenRecipe] = useState<Recipe | null>(null);

  const cartCount = state.cart.reduce((sum, c) => sum + c.cartQty, 0);
  const recipeInCart = (id: number) => state.cart.some((c) => c.fromRecipeId === id);
  const pendingCount = state.cookEntries.filter((e) => e.cookedAt === null).length;

  if (view === "recipe" && openRecipe) {
    return (
      <RecipeDetail
        recipe={openRecipe}
        inCart={recipeInCart(openRecipe.id)}
        cartCount={cartCount}
        onBack={() => {
          setOpenRecipe(null);
          setView("tab");
        }}
        onAddToCart={(r) => addRecipeToCart(r)}
        onOpenCart={() => setView("cart")}
      />
    );
  }

  if (view === "cart") {
    return (
      <CartView
        cart={state.cart}
        onBack={() => setView("tab")}
        onRemove={removeCartItem}
        onSetQty={setCartQty}
        onClear={clearCart}
        onCheckout={recordSentCart}
      />
    );
  }

  return (
    <main className="mx-auto max-w-md px-4 pb-28 pt-6 sm:max-w-xl sm:px-6">
      <header className="mb-6 flex items-center justify-between">
        {state.account ? (
          <UserMenu account={state.account} onSignOut={reset} />
        ) : (
          <span aria-hidden className="h-10 w-10" />
        )}
        <CartButton count={cartCount} onClick={() => setView("cart")} />
      </header>

      {tab === "cook" ? (
        <>
          {pendingCount > 0 && (
            <button
              type="button"
              onClick={() => setTab("progress")}
              className="mb-5 flex w-full items-center justify-between gap-3 rounded-2xl bg-ember/12 px-4 py-3 text-left ring-1 ring-ember/30 transition hover:bg-ember/15 active:scale-[0.99]"
            >
              <span className="flex items-center gap-3">
                <span aria-hidden className="grid h-7 w-7 place-items-center rounded-full bg-ember text-cream">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 3v4M7 9.5v.6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </span>
                <span className="text-[14px] font-medium leading-tight text-ink">
                  {pendingCount === 1
                    ? "1 meal waiting to be confirmed"
                    : `${pendingCount} meals waiting to be confirmed`}
                </span>
              </span>
              <span aria-hidden className="text-ember">→</span>
            </button>
          )}
          <CookView
            chosenRecipeIds={state.chosenRecipeIds}
            cartCount={cartCount}
            inCart={recipeInCart}
            onOpenRecipe={(r) => {
              setOpenRecipe(r);
              setView("recipe");
            }}
          />
        </>
      ) : (
        <Progress cookEntries={state.cookEntries} onMarkCooked={markCooked} />
      )}

      <TabBar tab={tab} setTab={setTab} pendingCount={pendingCount} />
    </main>
  );
}

function TabBar({
  tab,
  setTab,
  pendingCount,
}: {
  tab: Tab;
  setTab: (t: Tab) => void;
  pendingCount: number;
}) {
  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-cream/95 backdrop-blur"
    >
      <ul className="mx-auto flex max-w-md sm:max-w-xl">
        <TabItem active={tab === "cook"} onClick={() => setTab("cook")} label="Cook" icon={CookIcon} />
        <TabItem
          active={tab === "progress"}
          onClick={() => setTab("progress")}
          label="Progress"
          icon={ProgressIcon}
          badged={pendingCount > 0}
        />
      </ul>
    </nav>
  );
}

function TabItem({
  active,
  onClick,
  label,
  icon: Icon,
  badged,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: () => JSX.Element;
  badged?: boolean;
}) {
  return (
    <li className="flex-1">
      <button
        type="button"
        onClick={onClick}
        aria-current={active ? "page" : undefined}
        className={`flex w-full flex-col items-center gap-1 py-3 transition ${
          active ? "text-ink" : "text-ink/40"
        }`}
      >
        <span className="relative">
          <Icon />
          {badged && (
            <span
              aria-hidden
              className="absolute -right-1 -top-0.5 h-2 w-2 rounded-full bg-ember ring-2 ring-cream"
            />
          )}
        </span>
        <span className="text-[11px] font-medium uppercase tracking-[0.18em]">
          {label}
        </span>
      </button>
    </li>
  );
}

function CookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden>
      <path
        d="M4 17h12l4-1.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 17c.4 1.3 2 2.2 5 2.2s4.6-.9 5-2.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 8c-1.6 1.6-2.4 2.9-2.4 4.3 0 1.5 1.1 2.5 2.4 2.5s2.4-1 2.4-2.5c0-1.4-.8-2.7-2.4-4.3z"
        fill="currentColor"
      />
    </svg>
  );
}

function ProgressIcon() {
  // Chart bars rising — pairs with the "Progress" label and the up-and-to-the-right pitch motif.
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden>
      <path d="M4 20h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="5" y="13" width="3.5" height="6" rx="1" fill="currentColor" opacity="0.45" />
      <rect x="10.25" y="9" width="3.5" height="10" rx="1" fill="currentColor" opacity="0.7" />
      <rect x="15.5" y="5" width="3.5" height="14" rx="1" fill="currentColor" />
    </svg>
  );
}
