"use client";

import Image from "next/image";
import { memo, useMemo, useState } from "react";
import type { CookEntry } from "@/lib/types";
import { RECIPES } from "@/lib/recipes";
import { addWeeks, startOfIsoWeek } from "@/lib/week";

type Props = {
  cookEntries: CookEntry[];
  onMarkCooked: (entryId: string) => void;
};

const SAVINGS_PER_SERVING_USD = 9; // ~$13 delivery vs. ~$4 home-cooked
const ACTIVITY_WEEKS = 16;
const ACTIVITY_DAYS = 7;

export const Progress = memo(function Progress({ cookEntries, onMarkCooked }: Props) {
  const todayKey = useMemo(() => dateKey(new Date()), []);
  const startOfThisWeek = useMemo(() => startOfIsoWeek(new Date()), []);
  const gridStart = useMemo(
    () => addWeeks(startOfThisWeek, -(ACTIVITY_WEEKS - 1)),
    [startOfThisWeek],
  );

  // Treat each cell's level as a literal meal count (0..4). Summing past +
  // today cells gives a coherent total across the grid, the Saved card, and
  // the Meals cooked card.
  const mockBaseMeals = useMemo(() => {
    let n = 0;
    for (let w = 0; w < ACTIVITY_WEEKS; w++) {
      for (let d = 0; d < ACTIVITY_DAYS; d++) {
        const date = new Date(gridStart);
        date.setDate(date.getDate() + w * 7 + d);
        if (dateKey(date) > todayKey) continue;
        n += mockIntensity(w, d);
      }
    }
    return n;
  }, [gridStart, todayKey]);

  const stats = useMemo(() => {
    let realCooked = 0;
    const pending: CookEntry[] = [];
    for (const entry of cookEntries) {
      if (entry.cookedAt) {
        realCooked++;
      } else {
        pending.push(entry);
      }
    }
    pending.sort((a, b) => b.orderedAt.localeCompare(a.orderedAt));
    const totalMeals = realCooked + mockBaseMeals;
    return {
      cooked: totalMeals,
      savings: totalMeals * SAVINGS_PER_SERVING_USD,
      pending,
    };
  }, [cookEntries, mockBaseMeals]);

  return (
    <div className="space-y-7">
      <div className="space-y-2">
        <p className="text-[11px] uppercase tracking-[0.3em] text-ink/55">
          Your progress
        </p>
        <h2 className="font-display text-4xl font-medium leading-tight tracking-tight">
          What you've actually cooked.
        </h2>
        <p className="text-sm text-ink/55">
          Every meal you confirm earns you a notch, and counts toward what you've saved.
        </p>
      </div>

      {/* Twin hero cards — equal weight, equal size, equal typography */}
      <section className="grid grid-cols-2 gap-3">
        <MetricCard label="Saved" value={`$${stats.savings}`} caption="vs delivery" />
        <MetricCard
          label="Meals cooked"
          value={`${stats.cooked}`}
          caption={stats.cooked === 1 ? "meal" : "meals"}
        />
      </section>

      {/* Pending confirmations */}
      {stats.pending.length > 0 && (
        <section className="space-y-3">
          <header className="flex items-baseline justify-between">
            <h3 className="font-display text-xl font-medium tracking-tight">
              Did you cook it?
            </h3>
            <span className="text-[11px] uppercase tracking-[0.22em] text-ember">
              {stats.pending.length} pending
            </span>
          </header>
          <ul className="space-y-2">
            {stats.pending.map((entry) => (
              <PendingRow key={entry.id} entry={entry} onMark={onMarkCooked} />
            ))}
          </ul>
        </section>
      )}

      <ActivityGrid
        cookEntries={cookEntries}
        gridStart={gridStart}
        todayKey={todayKey}
      />
    </div>
  );
});

function MetricCard({
  label,
  value,
  caption,
}: {
  label: string;
  value: string;
  caption: string;
}) {
  return (
    <div className="flex flex-col justify-between rounded-3xl bg-ink p-5 text-cream shadow-card sm:p-6">
      <p className="text-[10px] uppercase tracking-[0.3em] text-cream/55">{label}</p>
      <p className="mt-4 font-display text-5xl font-medium leading-none tracking-tight text-cream sm:text-6xl">
        {value}
      </p>
      <p className="mt-3 text-[11px] text-cream/55">{caption}</p>
    </div>
  );
}

const CONFETTI_COLORS = ["#C2410C", "#B8862F", "#0A0A0A", "#C2410C", "#B8862F"];

function PendingRow({
  entry,
  onMark,
}: {
  entry: CookEntry;
  onMark: (id: string) => void;
}) {
  const recipe = RECIPES.find((r) => r.id === entry.recipeId);
  const [bursting, setBursting] = useState(false);

  if (!recipe) return null;

  const daysAgo = Math.max(0, Math.floor((Date.now() - new Date(entry.orderedAt).getTime()) / 86_400_000));
  const orderedLabel =
    daysAgo === 0 ? "Ordered today" : daysAgo === 1 ? "Ordered yesterday" : `Ordered ${daysAgo} days ago`;

  function handleCook() {
    if (bursting) return;
    setBursting(true);
    // Let the confetti animation play (~900ms) before unmounting the row.
    setTimeout(() => onMark(entry.id), 850);
  }

  return (
    <li className="flex items-center gap-3 rounded-2xl bg-cream p-2 ring-1 ring-ink/10">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-creamDeep">
        <Image src={recipe.image} alt={recipe.name} fill sizes="64px" className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="line-clamp-1 text-[14px] font-medium text-ink">{recipe.name}</p>
        <p className="text-[11px] text-ink/50">{orderedLabel}</p>
      </div>
      <div className="relative shrink-0">
        {bursting && (
          <div className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden>
            {Array.from({ length: 22 }).map((_, i) => {
              const angle = (i / 22) * Math.PI * 2;
              const dist = 70 + Math.random() * 50;
              const tx = `calc(-50% + ${Math.cos(angle) * dist}px)`;
              const ty = `calc(-50% + ${Math.sin(angle) * dist}px)`;
              const rot = `${Math.random() * 720 - 360}deg`;
              return (
                <span
                  key={i}
                  className="confetti"
                  style={{
                    background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
                    ["--tx" as never]: tx,
                    ["--ty" as never]: ty,
                    ["--r" as never]: rot,
                    animationDelay: `${Math.random() * 80}ms`,
                  }}
                />
              );
            })}
          </div>
        )}
        <button
          type="button"
          onClick={handleCook}
          disabled={bursting}
          className={`relative rounded-full bg-ember px-4 py-2 text-[12px] font-semibold text-cream transition active:scale-[0.97] ${
            bursting ? "animate-glow" : ""
          }`}
        >
          {bursting ? "Nice ✓" : "I cooked it"}
        </button>
      </div>
    </li>
  );
}

// Shade ramp for activity cells (mock and real). Index 0 = no activity,
// index 4 = full cook. Real cooks always land on index 4.
const SHADES = [
  "bg-ink/5",
  "bg-ember/25",
  "bg-ember/50",
  "bg-ember/75",
  "bg-ember",
];

function dateKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Deterministic mock intensity, biased empty with a gentle recency lift so the
// recent weeks (right side) look more active than the old ones. Stable across
// renders since it only depends on (weekIdx, dayIdx).
function mockIntensity(weekIdx: number, dayIdx: number): number {
  const seed = ((weekIdx * 73856093) ^ (dayIdx * 19349663)) >>> 0;
  const r = seed % 100;
  const recencyBoost = Math.floor((weekIdx / (ACTIVITY_WEEKS - 1)) * 18);
  const adjusted = r + recencyBoost;
  if (adjusted < 60) return 0;
  if (adjusted < 78) return 1;
  if (adjusted < 90) return 2;
  if (adjusted < 98) return 3;
  return 4;
}

function formatMDY(d: Date): string {
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
}

function ActivityGrid({
  cookEntries,
  gridStart,
  todayKey,
}: {
  cookEntries: CookEntry[];
  gridStart: Date;
  todayKey: string;
}) {
  const realCookedDates = useMemo(() => {
    const set = new Set<string>();
    for (const entry of cookEntries) {
      if (!entry.cookedAt) continue;
      set.add(dateKey(new Date(entry.cookedAt)));
    }
    return set;
  }, [cookEntries]);

  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  // Resolve each cell's "meal count" the same way we do for the summary
  // totals. Real cooks land at level 4 (just so they paint the brightest
  // shade); for counting purposes they each contribute 1 actual meal.
  function levelFor(w: number, d: number, dKey: string, isFuture: boolean, isReal: boolean) {
    if (isFuture) return 0;
    if (isReal) return 4;
    return mockIntensity(w, d);
  }

  // Real cook → 1 meal that day. Otherwise the mock level == the day's count.
  function mealsForDay(w: number, d: number, dKey: string, isFuture: boolean, isReal: boolean) {
    if (isFuture) return 0;
    if (isReal) return 1;
    return mockIntensity(w, d);
  }

  const selectedInfo = useMemo(() => {
    if (selectedWeek == null) return null;
    const weekStart = new Date(gridStart);
    weekStart.setDate(weekStart.getDate() + selectedWeek * 7);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    let meals = 0;
    for (let d = 0; d < ACTIVITY_DAYS; d++) {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + d);
      const dKey = dateKey(date);
      const isReal = realCookedDates.has(dKey);
      const isFuture = dKey > todayKey;
      meals += mealsForDay(selectedWeek, d, dKey, isFuture, isReal);
    }
    return { weekStart, weekEnd, meals };
  }, [selectedWeek, gridStart, realCookedDates, todayKey]);

  return (
    <section className="space-y-2">
      <header className="flex items-baseline justify-between">
        <p className="text-[10px] uppercase tracking-[0.22em] text-ink/50">Activity</p>
        <p className="text-[10px] text-ink/40">Last 16 weeks</p>
      </header>

      {selectedInfo && (
        <div className="flex items-center justify-between rounded-xl bg-ember/12 px-3 py-2 ring-1 ring-ember/30 animate-rise">
          <div>
            <p className="text-[11px] font-medium leading-tight text-ink">
              Week of {formatMDY(selectedInfo.weekStart)} – {formatMDY(selectedInfo.weekEnd)}
            </p>
            <p className="text-[11px] leading-tight text-ember">
              {selectedInfo.meals} {selectedInfo.meals === 1 ? "meal" : "meals"} cooked
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSelectedWeek(null)}
            aria-label="Close week details"
            className="grid h-6 w-6 place-items-center rounded-full text-ink/55 transition hover:bg-ink/5"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path
                d="M2.5 2.5l7 7M9.5 2.5l-7 7"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      )}

      <div
        className="flex w-full gap-[3px]"
        role="grid"
        aria-label="Cooking activity grid, 16 weeks by 7 days"
      >
        {Array.from({ length: ACTIVITY_WEEKS }).map((_, w) => {
          const isSelected = selectedWeek === w;
          return (
            <div
              key={w}
              className={`flex flex-1 flex-col gap-[3px] rounded ${
                isSelected ? "ring-1 ring-ember/60 ring-offset-2 ring-offset-cream" : ""
              }`}
              role="row"
            >
              {Array.from({ length: ACTIVITY_DAYS }).map((_, d) => {
                const date = new Date(gridStart);
                date.setDate(date.getDate() + w * 7 + d);
                const dKey = dateKey(date);
                const isReal = realCookedDates.has(dKey);
                const isFuture = dKey > todayKey;
                const isToday = dKey === todayKey;
                const level = levelFor(w, d, dKey, isFuture, isReal);
                const label = `Week ${w + 1}, day ${d + 1}`;
                return (
                  <button
                    key={d}
                    type="button"
                    role="gridcell"
                    aria-label={label}
                    onClick={() => setSelectedWeek((cur) => (cur === w ? null : w))}
                    className={`aspect-square rounded-[2px] transition ${
                      isFuture ? "bg-ink/5 opacity-50" : SHADES[level]
                    } ${
                      isToday
                        ? "ring-2 ring-ink/60 ring-offset-[1px] ring-offset-cream"
                        : ""
                    }`}
                  />
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-1.5 pt-1">
        <span className="text-[10px] text-ink/45">Less</span>
        <div className="flex gap-[3px]">
          {SHADES.map((s, i) => (
            <div
              key={i}
              className={`h-2.5 w-2.5 rounded-[2px] ${s}`}
              title={`${i} ${i === 1 ? "meal" : "meals"}`}
            />
          ))}
        </div>
        <span className="text-[10px] text-ink/45">More</span>
      </div>
    </section>
  );
}
