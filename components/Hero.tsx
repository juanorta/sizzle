"use client";

import { SizzleMark } from "./SizzleMark";

type Props = {
  onContinue: () => void;
  onLogin: () => void;
};

export function Hero({ onContinue, onLogin }: Props) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-between px-6 pb-10 pt-16 sm:max-w-lg">
      <div className="animate-rise space-y-6">
        <div className="flex items-center gap-2 text-ink/60">
          <p className="text-xs uppercase tracking-[0.3em]">Sizzle</p>
          <SizzleMark size={20} className="scale-x-[-1]" />
        </div>
        <h1 className="font-display text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl">
          Cook the meals
          <br />
          you've been
          <br />
          <span className="italic text-ember">ordering.</span>
        </h1>
        <p className="text-lg leading-snug text-ink/75">
          You can cook this. We pick the recipes and build the shopping list. Groceries one tap away.
        </p>
      </div>

      <div className="space-y-3 pt-10">
        <button
          type="button"
          onClick={onContinue}
          className="w-full rounded-full bg-ink py-4 text-base font-medium text-cream transition active:scale-[0.98]"
        >
          Show me how it works
        </button>
        <button
          type="button"
          onClick={onLogin}
          className="w-full rounded-full border border-ink/15 bg-cream py-4 text-base font-medium text-ink transition hover:border-ink/40 active:scale-[0.98]"
        >
          I already have an account
        </button>
      </div>
    </main>
  );
}
