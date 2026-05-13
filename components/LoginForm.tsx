"use client";

import { useState } from "react";
import { SizzleMark } from "./SizzleMark";

type Props = {
  onLogin: (account: { name: string; email: string }) => void;
  onBack: () => void;
};

export function LoginForm({ onLogin, onBack }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const canSubmit = email.trim() && password.trim();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    onLogin({
      name: email.split("@")[0] || "friend",
      email: email.trim(),
    });
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-6 pb-10 pt-12 sm:max-w-lg">
      <div className="animate-rise space-y-8">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="text-sm text-ink/60 underline-offset-4 hover:underline"
          >
            ← Back
          </button>
          <SizzleMark size={22} />
        </div>

        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.3em] text-ink/55">
            Welcome back
          </p>
          <h2 className="font-display text-4xl font-medium leading-tight tracking-tight">
            Pick up where you
            <br />
            <span className="italic text-ember">left off.</span>
          </h2>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <label className="block space-y-1.5">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink/55">
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="you@kitchen.com"
              className="w-full rounded-2xl border border-ink/15 bg-cream px-5 py-4 text-base text-ink placeholder:text-ink/30 outline-none transition focus:border-ink"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink/55">
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full rounded-2xl border border-ink/15 bg-cream px-5 py-4 text-base text-ink placeholder:text-ink/30 outline-none transition focus:border-ink"
            />
          </label>

          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-4 w-full rounded-full bg-ink py-4 text-base font-medium text-cream transition active:scale-[0.98] disabled:opacity-30"
          >
            Log in
          </button>
        </form>
      </div>
    </main>
  );
}
