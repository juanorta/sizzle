"use client";

import { useCallback, useEffect, useState } from "react";
import {
  STORAGE_KEY,
  type Account,
  type CartItem,
  type CookEntry,
  type Equipment,
  type Recipe,
  type SizzleState,
  type WeekRecord,
} from "./types";
import { isoWeekOf } from "./week";

const INITIAL: SizzleState = {
  account: null,
  chosenRecipeIds: null,
  cart: [],
  cookEntries: [],
  user: null,
  weeks: [],
};

function load(): SizzleState {
  if (typeof window === "undefined") return INITIAL;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL;
    const parsed = JSON.parse(raw) as Partial<SizzleState>;
    const cart = Array.isArray(parsed.cart)
      ? (parsed.cart as CartItem[]).filter(
          (c) => c && (typeof c.cartKey === "string" || typeof c.walmartUpc === "string" || typeof c.walmartItemId === "string"),
        )
      : [];
    // Legacy `cookLog` (Round-6 shape) is incompatible — drop it. Round-7
    // adopts `cookEntries` (per-recipe records with cookedAt).
    const cookEntries = Array.isArray(parsed.cookEntries)
      ? (parsed.cookEntries as CookEntry[]).filter(
          (e) => e && typeof e.id === "string" && typeof e.recipeId === "number",
        )
      : [];
    return {
      account: parsed.account ?? null,
      chosenRecipeIds: Array.isArray(parsed.chosenRecipeIds) ? parsed.chosenRecipeIds : null,
      cart,
      cookEntries,
      user: parsed.user ?? null,
      weeks: Array.isArray(parsed.weeks) ? parsed.weeks : [],
    };
  } catch {
    return INITIAL;
  }
}

function save(state: SizzleState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Quota or private mode — silently skip; the UI still works in-memory.
  }
}

export function useSizzle() {
  const [state, setState] = useState<SizzleState>(INITIAL);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(load());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) save(state);
  }, [state, hydrated]);

  const setAccount = useCallback((account: Omit<Account, "createdAt">) => {
    setState((s) => ({
      ...s,
      account: {
        ...account,
        createdAt: s.account?.createdAt ?? new Date().toISOString(),
      },
      user: s.user ?? {
        equipment: ["stove", "oven", "air_fryer", "microwave", "slow_cooker"],
        createdAt: new Date().toISOString(),
      },
    }));
  }, []);

  const setEquipment = useCallback((equipment: Equipment[]) => {
    setState((s) => ({
      ...s,
      user: {
        equipment,
        createdAt: s.user?.createdAt ?? new Date().toISOString(),
      },
    }));
  }, []);

  const setChosenRecipes = useCallback((ids: number[]) => {
    setState((s) => ({ ...s, chosenRecipeIds: ids }));
  }, []);

  const reset = useCallback(() => setState(INITIAL), []);

  const markCookedThisWeek = useCallback((recipeId: number) => {
    setState((s) => {
      const iso = isoWeekOf(new Date());
      if (s.weeks.some((w) => w.isoWeek === iso)) return s;
      const week: WeekRecord = {
        isoWeek: iso,
        cookedAt: new Date().toISOString(),
        recipeId,
      };
      return { ...s, weeks: [...s.weeks, week] };
    });
  }, []);

  const unmarkThisWeek = useCallback(() => {
    setState((s) => {
      const iso = isoWeekOf(new Date());
      return { ...s, weeks: s.weeks.filter((w) => w.isoWeek !== iso) };
    });
  }, []);

  // --- Cart ---

  const addRecipeToCart = useCallback((recipe: Recipe) => {
    setState((s) => {
      // Idempotent: a fast double-tap (or React strict-mode double-invoke
      // during dev) shouldn't double-add. If this recipe is already in the
      // cart, no-op.
      if (s.cart.some((c) => c.fromRecipeId === recipe.id)) return s;

      const next = [...s.cart];
      for (const ing of recipe.ingredients) {
        const cartKey = ing.walmartItemId ?? ing.walmartUpc;
        if (!cartKey) continue;
        const existing = next.findIndex((c) => c.cartKey === cartKey);
        if (existing >= 0) {
          next[existing] = { ...next[existing], cartQty: next[existing].cartQty + 1 };
        } else {
          next.push({
            cartKey,
            walmartItemId: ing.walmartItemId,
            walmartUpc: ing.walmartUpc,
            name: ing.name,
            quantity: ing.quantity,
            cartQty: 1,
            fromRecipeId: recipe.id,
          });
        }
      }
      return { ...s, cart: next };
    });
  }, []);

  const removeCartItem = useCallback((cartKey: string) => {
    setState((s) => ({
      ...s,
      cart: s.cart.filter((c) => c.cartKey !== cartKey),
    }));
  }, []);

  const setCartQty = useCallback((cartKey: string, qty: number) => {
    setState((s) => {
      if (qty <= 0) {
        return { ...s, cart: s.cart.filter((c) => c.cartKey !== cartKey) };
      }
      return {
        ...s,
        cart: s.cart.map((c) =>
          c.cartKey === cartKey ? { ...c, cartQty: qty } : c,
        ),
      };
    });
  }, []);

  const clearCart = useCallback(() => {
    setState((s) => ({ ...s, cart: [] }));
  }, []);

  // --- Cook entries (Progress tracking) ---

  const recordSentCart = useCallback((recipeIds: number[]) => {
    if (recipeIds.length === 0) return;
    const orderedAt = new Date().toISOString();
    const unique = Array.from(new Set(recipeIds));
    const entries: CookEntry[] = unique.map((recipeId) => ({
      id: `${recipeId}-${orderedAt}`,
      recipeId,
      orderedAt,
      cookedAt: null,
    }));
    setState((s) => ({ ...s, cookEntries: [...s.cookEntries, ...entries] }));
  }, []);

  const markCooked = useCallback((entryId: string) => {
    const cookedAt = new Date().toISOString();
    setState((s) => ({
      ...s,
      cookEntries: s.cookEntries.map((e) =>
        e.id === entryId && e.cookedAt === null ? { ...e, cookedAt } : e,
      ),
    }));
  }, []);

  return {
    state,
    hydrated,
    setAccount,
    setEquipment,
    setChosenRecipes,
    markCookedThisWeek,
    unmarkThisWeek,
    addRecipeToCart,
    removeCartItem,
    setCartQty,
    clearCart,
    recordSentCart,
    markCooked,
    reset,
  };
}
