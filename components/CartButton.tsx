"use client";

type Props = {
  count: number;
  onClick: () => void;
};

export function CartButton({ count, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}
      className="relative grid h-10 w-10 place-items-center rounded-full bg-ink text-cream transition active:scale-95"
    >
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        aria-hidden
      >
        <path
          d="M3 4h2.2l2.4 12.4a1.5 1.5 0 0 0 1.5 1.2h9.6a1.5 1.5 0 0 0 1.5-1.2L21.5 7.5H6"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="20.5" r="1.4" fill="currentColor" />
        <circle cx="17" cy="20.5" r="1.4" fill="currentColor" />
      </svg>
      {count > 0 && (
        <span
          className="absolute -right-1 -top-1 grid h-5 min-w-[20px] place-items-center rounded-full bg-ember px-1 text-[10px] font-semibold leading-none text-cream ring-2 ring-cream"
          aria-hidden
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
