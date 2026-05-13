import type { NutritionFacts as NF } from "@/lib/types";

type Props = {
  nutrition: NF;
  servings?: number;
  compact?: boolean;
};

export function NutritionFacts({ nutrition, servings, compact }: Props) {
  return (
    <section
      aria-label="Nutrition facts per serving"
      className={`rounded-2xl bg-creamDeep px-5 ${compact ? "py-4" : "py-5"}`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <div className="space-y-0.5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/55">
            Per serving
          </p>
          {servings ? (
            <p className="text-[10px] text-ink/40">
              recipe serves {servings}
            </p>
          ) : null}
        </div>
        <div className="text-right">
          <p className="font-display text-3xl font-medium leading-none">
            {nutrition.calories}
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-ink/50">
            calories
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <Macro label="Protein" value={nutrition.protein} unit="g" />
        <Macro label="Carbs" value={nutrition.carbs} unit="g" />
        <Macro label="Fat" value={nutrition.fat} unit="g" />
      </div>

      {nutrition.sodium != null ? (
        <p className="mt-3 text-[11px] text-ink/45">
          Sodium · {nutrition.sodium} mg
        </p>
      ) : null}
    </section>
  );
}

function Macro({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <div className="rounded-xl bg-cream px-3 py-2.5">
      <p className="text-[10px] uppercase tracking-[0.18em] text-ink/50">
        {label}
      </p>
      <p className="mt-0.5 font-display text-lg font-medium leading-none">
        {value}
        <span className="ml-0.5 text-xs font-normal text-ink/55">{unit}</span>
      </p>
    </div>
  );
}
