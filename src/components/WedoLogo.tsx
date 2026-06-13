import { useId } from "react";

interface WedoLogoProps {
  size?: number;
  className?: string;
  glowOpacity?: number;
}

let counter = 0;

export default function WedoLogo({ size = 32, className = "", glowOpacity = 0 }: WedoLogoProps) {
  const uid = useId();
  const r = `wl${uid.replace(/:/g, "")}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="WEDO"
    >
      <defs>
        <linearGradient id={`stroke-${r}`} x1="4" y1="2" x2="36" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C4B5FD" />
          <stop offset="45%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>
        <linearGradient id={`fill-${r}`} x1="4" y1="2" x2="36" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#180840" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#080320" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id={`w-${r}`} x1="10" y1="14" x2="30" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#C4B5FD" />
        </linearGradient>
        {glowOpacity > 0 && (
          <filter id={`glow-${r}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        )}
      </defs>
      <path
        d="M20 2L35.5 11V29L20 38L4.5 29V11L20 2Z"
        fill={`url(#fill-${r})`}
        stroke={`url(#stroke-${r})`}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M11 11L20 6L29 11"
        stroke="rgba(196,181,253,0.25)"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <path
        d="M10.5 15L14.2 26L20 19.5L25.8 26L29.5 15"
        stroke={`url(#w-${r})`}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={glowOpacity > 0 ? `url(#glow-${r})` : undefined}
      />
    </svg>
  );
}
