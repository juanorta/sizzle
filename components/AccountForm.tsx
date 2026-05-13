"use client";

import { useState } from "react";
import { SizzleMark } from "./SizzleMark";

type Props = {
  onCreate: (account: { name: string; email: string }) => void;
  onBack: () => void;
};

export function AccountForm({ onCreate, onBack }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const canSubmit = name.trim() && email.trim() && password.trim();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    onCreate({ name: name.trim(), email: email.trim() });
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
            Create your account
          </p>
          <h2 className="font-display text-4xl font-medium leading-tight tracking-tight">
            Let's get
            <br />
            <span className="italic text-ember">cooking.</span>
          </h2>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <Field
            label="Name"
            value={name}
            onChange={setName}
            autoComplete="name"
            placeholder="Juan"
          />
          <Field
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            autoComplete="email"
            placeholder="you@kitchen.com"
          />
          <Field
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            autoComplete="new-password"
            placeholder="••••••••"
          />

          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-4 w-full rounded-full bg-ink py-4 text-base font-medium text-cream transition active:scale-[0.98] disabled:opacity-30"
          >
            Create account
          </button>
          <p className="text-center text-xs text-ink/50">
            No emails. No spam. We don't even check this.
          </p>
        </form>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink/55">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-ink/15 bg-cream px-5 py-4 text-base text-ink placeholder:text-ink/30 outline-none transition focus:border-ink"
      />
    </label>
  );
}
