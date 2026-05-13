// Slide icons — each is a 120px circular badge with a custom mark inside.
// Centered horizontally above the pitch text.

const RING =
  "absolute inset-0 rounded-full bg-creamDeep ring-1 ring-ink/15";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto h-28 w-28 sm:h-32 sm:w-32">
      <div className={RING} aria-hidden />
      <div className="relative grid h-full w-full place-items-center">
        {children}
      </div>
    </div>
  );
}

export function MoneyIcon() {
  return (
    <Badge>
      <svg viewBox="0 0 64 64" width="64" height="64" fill="none" aria-hidden>
        {/* outer coin */}
        <circle cx="32" cy="32" r="22" fill="#C2410C" />
        <circle cx="32" cy="32" r="22" stroke="#7A2306" strokeWidth="1.5" />
        {/* inner ring */}
        <circle cx="32" cy="32" r="17" stroke="#F8F5EE" strokeWidth="1.2" opacity="0.5" />
        {/* dollar sign */}
        <path
          d="M32 19v4M32 41v4M38 25c-1.2-1.6-3.5-2.5-6-2.5-3.3 0-6 1.7-6 4.2 0 2.4 2.4 3.6 6 4.3 3.6.7 6 1.9 6 4.3 0 2.5-2.7 4.2-6 4.2-2.5 0-4.8-.9-6-2.5"
          stroke="#F8F5EE"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    </Badge>
  );
}

export function LearnIcon() {
  return (
    <Badge>
      <svg viewBox="0 0 64 64" width="64" height="64" fill="none" aria-hidden>
        {/* open book */}
        <path
          d="M10 18c6-3 14-3 22 1v32c-8-4-16-4-22-1V18z"
          fill="#0A0A0A"
        />
        <path
          d="M54 18c-6-3-14-3-22 1v32c8-4 16-4 22-1V18z"
          fill="#0A0A0A"
        />
        <path
          d="M14 23c5-2 11-2 16 1M14 30c5-2 11-2 16 1M14 37c5-2 11-2 16 1M34 24c5-3 11-3 16-1M34 31c5-3 11-3 16-1M34 38c5-3 11-3 16-1"
          stroke="#F8F5EE"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.8"
        />
        {/* spark = aha */}
        <g transform="translate(46 12)">
          <path
            d="M0 -6L1.5 -1.5L6 0L1.5 1.5L0 6L-1.5 1.5L-6 0L-1.5 -1.5Z"
            fill="#C2410C"
          />
        </g>
      </svg>
    </Badge>
  );
}

export function ChartIcon() {
  return (
    <Badge>
      <svg viewBox="0 0 64 64" width="64" height="64" fill="none" aria-hidden>
        {/* axes */}
        <path
          d="M12 12v40h40"
          stroke="#0A0A0A"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* grid */}
        <path
          d="M12 24h40M12 36h40M24 12v40M36 12v40M48 12v40"
          stroke="#0A0A0A"
          strokeWidth="0.6"
          opacity="0.15"
        />
        {/* line up and to the right */}
        <path
          d="M14 46L24 40L34 30L44 22L52 14"
          stroke="#C2410C"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* arrowhead */}
        <path
          d="M46 14h7v7"
          stroke="#C2410C"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* data points */}
        <circle cx="14" cy="46" r="1.8" fill="#0A0A0A" />
        <circle cx="24" cy="40" r="1.8" fill="#0A0A0A" />
        <circle cx="34" cy="30" r="1.8" fill="#0A0A0A" />
        <circle cx="44" cy="22" r="1.8" fill="#0A0A0A" />
      </svg>
    </Badge>
  );
}

export function PickIcon() {
  return (
    <Badge>
      <svg viewBox="0 0 64 64" width="64" height="64" fill="none" aria-hidden>
        {/* calendar frame */}
        <rect
          x="10"
          y="14"
          width="44"
          height="40"
          rx="4"
          stroke="#0A0A0A"
          strokeWidth="2"
        />
        <path d="M10 24h44" stroke="#0A0A0A" strokeWidth="2" />
        <path d="M20 10v8M44 10v8" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
        {/* grid cells */}
        {[0, 1, 2, 3, 4, 5].map((c) => (
          <circle key={`a-${c}`} cx={16 + c * 6} cy={32} r="1.3" fill="#0A0A0A" opacity="0.2" />
        ))}
        {[0, 1, 2, 3, 4, 5].map((c) => (
          <circle key={`b-${c}`} cx={16 + c * 6} cy={42} r="1.3" fill="#0A0A0A" opacity="0.2" />
        ))}
        {/* the one picked */}
        <circle cx="34" cy="37" r="6" fill="#C2410C" />
        <path
          d="M31 37l2 2 4-4"
          stroke="#F8F5EE"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Badge>
  );
}

export function CartIcon() {
  return (
    <Badge>
      <svg viewBox="0 0 64 64" width="64" height="64" fill="none" aria-hidden>
        {/* receipt back */}
        <rect x="14" y="10" width="28" height="34" rx="3" fill="#0A0A0A" />
        <path
          d="M20 18h16M20 24h16M20 30h10"
          stroke="#F8F5EE"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.9"
        />
        {/* cart in front */}
        <g transform="translate(22 28)">
          <path
            d="M0 4h2.5l2.6 13a1.6 1.6 0 0 0 1.6 1.3h11.5a1.6 1.6 0 0 0 1.6-1.2L22 8H3.5"
            stroke="#C2410C"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#F8F5EE"
          />
          <circle cx="8.5" cy="22" r="1.6" fill="#C2410C" />
          <circle cx="17.5" cy="22" r="1.6" fill="#C2410C" />
        </g>
      </svg>
    </Badge>
  );
}
