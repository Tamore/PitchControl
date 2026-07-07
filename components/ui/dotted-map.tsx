'use client'

export function DottedMap({ className }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className || ''}`}>
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.15]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dotted-pattern"
            x="0"
            y="0"
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" className="fill-muted-foreground" />
          </pattern>
          <radialGradient id="fade-gradient">
            <stop offset="40%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="fade-mask">
            <rect width="100%" height="100%" fill="url(#fade-gradient)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotted-pattern)" mask="url(#fade-mask)" />
      </svg>
    </div>
  )
}
