import { SVGProps } from "react"

export function PlanitLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <text
        x="2"
        y="30"
        fontSize="32"
        fontWeight="bold"
        fill="url(#text-gradient)"
      >
        Plan
      </text>
      <text
        x="78"
        y="30"
        fontSize="32"
        fontWeight="bold"
        fill="url(#text-gradient)"
      >
        t
      </text>
      
      {/* Saturn (dot of the i) */}
      <g transform="translate(68, 8) scale(0.7)">
        <ellipse cx="10" cy="10" rx="10" ry="9" fill="url(#saturn-gradient)" />
        <path d="M0 10 Q 10 13 20 10 Q 10 7 0 10" fill="url(#ring-gradient)" />
      </g>

      <defs>
        <linearGradient id="text-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="saturn-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#D97706" stopOpacity="0.6" />
        </linearGradient>
      </defs>
    </svg>
  )
}

