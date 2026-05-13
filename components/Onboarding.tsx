"use client";

import { useState } from "react";
import { AccountForm } from "./AccountForm";
import { Hero } from "./Hero";
import { LoginForm } from "./LoginForm";
import { PitchCarousel } from "./PitchCarousel";

type Stage = "hero" | "pitch" | "signup" | "login";

type Props = {
  onAccount: (account: { name: string; email: string }) => void;
};

export function Onboarding({ onAccount }: Props) {
  const [stage, setStage] = useState<Stage>("hero");

  if (stage === "hero") {
    return (
      <Hero
        onContinue={() => setStage("pitch")}
        onLogin={() => setStage("login")}
      />
    );
  }

  if (stage === "pitch") {
    return (
      <PitchCarousel
        onSignup={() => setStage("signup")}
        onLogin={() => setStage("login")}
        onBack={() => setStage("hero")}
      />
    );
  }

  if (stage === "signup") {
    return (
      <AccountForm
        onBack={() => setStage("pitch")}
        onCreate={(account) => onAccount(account)}
      />
    );
  }

  // stage === "login"
  return (
    <LoginForm
      onBack={() => setStage("hero")}
      onLogin={(account) => onAccount(account)}
    />
  );
}
