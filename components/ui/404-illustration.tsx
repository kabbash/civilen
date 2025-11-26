export function NotFoundIllustration() {
  return (
    <svg
      width="453"
      height="302"
      viewBox="0 0 453 302"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      {/* Background Bricks */}
      <g opacity="0.3">
        <rect
          x="30"
          y="40"
          width="80"
          height="40"
          rx="4"
          fill="#E8E8E8"
          stroke="#D0D0D0"
          strokeWidth="2"
        />
        <rect
          x="380"
          y="240"
          width="60"
          height="35"
          rx="4"
          fill="#E8E8E8"
          stroke="#D0D0D0"
          strokeWidth="2"
        />
        <rect
          x="20"
          y="260"
          width="50"
          height="30"
          rx="4"
          fill="#E8E8E8"
          stroke="#D0D0D0"
          strokeWidth="2"
        />
      </g>

      {/* Pipelines/Lines */}
      <g opacity="0.2" stroke="#D0D0D0" strokeWidth="3">
        <line x1="50" y1="100" x2="120" y2="100" />
        <line x1="350" y1="80" x2="420" y2="80" />
        <line x1="30" y1="220" x2="80" y2="220" />
      </g>

      {/* Gears */}
      <g opacity="0.25">
        <circle cx="100" cy="180" r="25" fill="none" stroke="#D0D0D0" strokeWidth="3" />
        <circle cx="100" cy="180" r="12" fill="#E8E8E8" />
        <circle cx="380" cy="120" r="20" fill="none" stroke="#D0D0D0" strokeWidth="2.5" />
        <circle cx="380" cy="120" r="10" fill="#E8E8E8" />
      </g>

      {/* Left "4" */}
      <text
        x="90"
        y="200"
        fontFamily="Gotham Bold, sans-serif"
        fontSize="160"
        fontWeight="700"
        fill="#2E2D2D"
      >
        4
      </text>

      {/* Center "0" - lighter */}
      <text
        x="200"
        y="200"
        fontFamily="Gotham Bold, sans-serif"
        fontSize="160"
        fontWeight="700"
        fill="#2E2D2D"
        opacity="0.4"
      >
        0
      </text>

      {/* Engineer Character in the "0" */}
      <g transform="translate(226, 80)">
        {/* Orange Hard Hat */}
        <ellipse cx="0" cy="0" rx="22" ry="10" fill="#EA7922" />
        <ellipse cx="0" cy="-2" rx="20" ry="8" fill="#EA5422" />

        {/* Head */}
        <circle cx="0" cy="15" r="15" fill="#F5D4C1" />

        {/* Orange Safety Vest - Body */}
        <path d="M -18 30 L -18 70 L 18 70 L 18 30 L 10 25 L -10 25 Z" fill="#EA7922" />
        <path d="M -16 32 L -16 68 L 16 68 L 16 32 L 10 27 L -10 27 Z" fill="#EA5422" />

        {/* Reflective Strips */}
        <rect x="-18" y="45" width="36" height="4" fill="#FFC107" opacity="0.8" />
        <rect x="-18" y="55" width="36" height="3" fill="#FFC107" opacity="0.8" />

        {/* Left Arm */}
        <rect
          x="-25"
          y="35"
          width="8"
          height="35"
          rx="4"
          fill="#F5D4C1"
          transform="rotate(-15 -21 35)"
        />

        {/* Right Arm - pointing up */}
        <rect
          x="17"
          y="20"
          width="8"
          height="30"
          rx="4"
          fill="#F5D4C1"
          transform="rotate(35 21 35)"
        />

        {/* Blueprint/Paper in hand */}
        <rect
          x="25"
          y="10"
          width="20"
          height="25"
          rx="2"
          fill="white"
          stroke="#D0D0D0"
          strokeWidth="1"
          transform="rotate(20 35 22)"
        />
        <line
          x1="28"
          y1="15"
          x2="40"
          y2="15"
          stroke="#D0D0D0"
          strokeWidth="1"
          transform="rotate(20 35 22)"
        />
        <line
          x1="28"
          y1="20"
          x2="40"
          y2="20"
          stroke="#D0D0D0"
          strokeWidth="1"
          transform="rotate(20 35 22)"
        />
        <line
          x1="28"
          y1="25"
          x2="35"
          y2="25"
          stroke="#D0D0D0"
          strokeWidth="1"
          transform="rotate(20 35 22)"
        />
      </g>

      {/* Right "4" */}
      <text
        x="310"
        y="200"
        fontFamily="Gotham Bold, sans-serif"
        fontSize="160"
        fontWeight="700"
        fill="#2E2D2D"
      >
        4
      </text>
    </svg>
  );
}
