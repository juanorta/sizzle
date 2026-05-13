"use client";

import { MainApp } from "./MainApp";
import { Onboarding } from "./Onboarding";
import { useSizzle } from "@/lib/useSizzle";

export function HomeApp() {
  const api = useSizzle();
  const { state, hydrated, setAccount } = api;

  if (!hydrated) {
    return <div className="min-h-dvh bg-cream" aria-hidden />;
  }

  if (!state.account) {
    return <Onboarding onAccount={setAccount} />;
  }

  return <MainApp api={api} />;
}
