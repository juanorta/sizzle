type Props = {
  size?: number;
  className?: string;
};

export function SizzleMark({ size = 26, className }: Props) {
  return (
    <svg
      viewBox="0 0 28 28"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* smoke */}
      <path
        d="M10.5 3.5c0 1 1.2 1.4 1.2 2.4S10.5 7.1 10.5 8.1"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M14.8 2.5c0 1 1.2 1.4 1.2 2.4S14.8 6.1 14.8 7.1"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.3"
      />
      {/* flame */}
      <path
        d="M13.2 9c-2 2.1-3 3.7-3 5.4 0 1.8 1.3 3 3 3s3-1.2 3-3c0-1.7-1-3.3-3-5.4z"
        fill="#C2410C"
      />
      {/* pan handle + rim */}
      <path
        d="M3.5 19h13l5.5-1.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* pan basin */}
      <path
        d="M5 19c.4 1.5 2.4 2.6 5.5 2.6S15.6 20.5 16 19"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
