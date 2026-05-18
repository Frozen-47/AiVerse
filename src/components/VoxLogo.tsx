import { useId } from "react";

interface VoxLogoProps {
  size?: number | string;
  className?: string;
  variant?: "gradient" | "current";
}

/** Vox — chat bubble with sparkle (assistant mark). */
export function VoxLogo({
  size = 24,
  className = "",
  variant = "gradient",
}: VoxLogoProps) {
  const uid = useId().replace(/:/g, "");
  const gradId = `vox-grad-${uid}`;

  const stroke = variant === "current" ? "currentColor" : `url(#${gradId})`;
  const fill = variant === "current" ? "currentColor" : `url(#${gradId})`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {variant === "gradient" && (
        <defs>
          <linearGradient id={gradId} x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
            <stop stopColor="#22d3ee" />
            <stop offset="1" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      )}

      <path
        d="M6.25 4.75h11.5a2.25 2.25 0 0 1 2.25 2.25v6.25a2.25 2.25 0 0 1-2.25 2.25H11.5l-3.75 3.25V15.5H6.25a2.25 2.25 0 0 1-2.25-2.25V7a2.25 2.25 0 0 1 2.25-2.25Z"
        stroke={stroke}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M12 8.25l.85 1.7 1.9.75-1.9.75-.85 1.7-.85-1.7-1.9-.75 1.9-.75.85-1.7Z"
        fill={fill}
      />
    </svg>
  );
}
