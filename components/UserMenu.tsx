"use client";

import { useEffect, useRef, useState } from "react";
import type { Account } from "@/lib/types";

type Props = {
  account: Account;
  onSignOut: () => void;
};

export function UserMenu({ account, onSignOut }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const initial = (account.name.trim()[0] ?? "?").toUpperCase();

  function signOut() {
    setOpen(false);
    if (confirm("Sign out? Your cart and streak will be cleared.")) {
      onSignOut();
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Account menu for ${account.name}`}
        className="grid h-10 w-10 place-items-center rounded-full bg-ink text-cream transition active:scale-95"
      >
        <span className="font-display text-base font-medium leading-none">
          {initial}
        </span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 top-12 z-40 w-52 origin-top-left animate-rise overflow-hidden rounded-2xl bg-cream shadow-card ring-1 ring-ink/10"
        >
          <div className="border-b border-ink/10 px-4 py-3">
            <p className="truncate text-sm font-medium text-ink">{account.name}</p>
            <p className="truncate text-xs text-ink/55">{account.email}</p>
          </div>
          <button
            type="button"
            role="menuitem"
            onClick={signOut}
            className="block w-full px-4 py-3 text-left text-sm text-ink transition hover:bg-creamDeep"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
