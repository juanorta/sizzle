"use client";

import { useEffect, useRef, useState } from "react";
import {
  CartIcon,
  ChartIcon,
  LearnIcon,
  MoneyIcon,
  PickIcon,
} from "./PitchIcons";

type Slide = {
  tab: string;
  Icon: () => JSX.Element;
  eyebrow: string;
  title: React.ReactNode;
  body: string;
};

const SLIDES: Slide[] = [
  {
    tab: "Save",
    Icon: MoneyIcon,
    eyebrow: "$400 a month",
    title: <>Stop paying for meal delivery.</>,
    body: "Delivered meals cost ~$13 a plate. The same dinner cooked at home is ~$4, and you can cook it. We'll show you how.",
  },
  {
    tab: "Confidence",
    Icon: LearnIcon,
    eyebrow: "From following to cooking",
    title: <>You'll learn how to cook.</>,
    body: "Each recipe teaches one technique: sear, sauté, roast, baste. By recipe five you're not following instructions, you're cooking.",
  },
  {
    tab: "Invest",
    Icon: ChartIcon,
    eyebrow: "Cooking compounds",
    title: (
      <>
        Reheating fills you up. Cooking <span className="italic text-ember">pays you back.</span>
      </>
    ),
    body: "Reheating feeds you for one meal. Cooking adds to a skill you'll use the next 60 years. Convenience ends with the tray; the skill keeps paying.",
  },
  {
    tab: "Pick",
    Icon: PickIcon,
    eyebrow: "On your terms",
    title: <>Pick what you actually want to eat.</>,
    body: "Browse beautiful recipes with nutrition up front. Add as many as you want this week. Three meals, seven, whatever.",
  },
  {
    tab: "One tap",
    Icon: CartIcon,
    eyebrow: "We do the shopping list",
    title: (
      <>
        One tap and your groceries are <span className="italic text-ember">in your Walmart cart.</span>
      </>
    ),
    body: "Pick the recipes. We build the cart. Tap once to send it to Walmart, sign in, and check out. Done.",
  },
];

type Props = {
  onSignup: () => void;
  onLogin: () => void;
  onBack: () => void;
};

export function PitchCarousel({ onSignup, onLogin, onBack }: Props) {
  const scroller = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const isLast = active === SLIDES.length - 1;

  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio > 0.6) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        }
      },
      { root, threshold: [0.6, 0.8, 1] },
    );
    slideRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  function jumpTo(i: number) {
    const el = slideRefs.current[i];
    if (el) el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-0 pb-8 pt-4 sm:max-w-lg">
      <div className="px-6 pb-2">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-ink/60 underline-offset-4 hover:underline"
        >
          ← Back
        </button>
      </div>
      <div
        ref={scroller}
        className="snap-mandatory snap-x overflow-x-auto scroll-smooth"
        style={{ scrollbarWidth: "none" }}
        aria-label="Sizzle pitch"
      >
        <style jsx>{`
          div::-webkit-scrollbar { display: none; }
        `}</style>
        <ul className="flex">
          {SLIDES.map((slide, i) => (
            <li
              key={slide.tab}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              data-idx={i}
              className="w-full shrink-0 snap-center px-6"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${SLIDES.length}: ${slide.tab}`}
            >
              <div className="flex min-h-[58dvh] flex-col items-center justify-center space-y-7 text-center">
                <slide.Icon />
                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-ink/55">
                    {slide.eyebrow}
                  </p>
                  <h2 className="font-display text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl">
                    {slide.title}
                  </h2>
                  <p className="px-2 text-[15px] leading-relaxed text-ink/70">
                    {slide.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <nav aria-label="Pitch sections" className="mt-6 px-6">
        <ul className="flex items-center justify-between gap-1">
          {SLIDES.map((slide, i) => {
            const isActive = i === active;
            return (
              <li key={slide.tab} className="flex-1">
                <button
                  type="button"
                  onClick={() => jumpTo(i)}
                  aria-current={isActive ? "true" : undefined}
                  className={`group flex w-full flex-col items-center gap-1.5 py-1`}
                >
                  <span
                    className={`text-[10px] font-medium uppercase tracking-[0.18em] transition ${
                      isActive ? "text-ink" : "text-ink/40"
                    }`}
                  >
                    {slide.tab}
                  </span>
                  <span
                    className={`h-[2px] w-full rounded-full transition ${
                      isActive ? "bg-ink" : "bg-ink/15"
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="space-y-3 px-6 pt-6">
        <button
          type="button"
          onClick={onSignup}
          className="w-full rounded-full bg-ink py-4 text-base font-medium text-cream transition active:scale-[0.98]"
        >
          {isLast ? "Start your first week" : "Sign up"}
        </button>
        <button
          type="button"
          onClick={onLogin}
          className="w-full rounded-full border border-ink/15 bg-cream py-4 text-base font-medium text-ink transition hover:border-ink/40 active:scale-[0.98]"
        >
          Log in
        </button>
      </div>
    </main>
  );
}
