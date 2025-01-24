export function WaveBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 1440 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 600L48 566.7C96 533.3 192 466.7 288 466.7C384 466.7 480 533.3 576 533.3C672 533.3 768 466.7 864 466.7C960 466.7 1056 533.3 1152 533.3C1248 533.3 1344 466.7 1392 433.3L1440 400V800H1392C1344 800 1248 800 1152 800C1056 800 960 800 864 800C768 800 672 800 576 800C480 800 384 800 288 800C192 800 96 800 48 800H0V600Z"
          fill="url(#gradient-1)"
          fillOpacity="0.1"
        />
        <path
          d="M0 700L48 666.7C96 633.3 192 566.7 288 566.7C384 566.7 480 633.3 576 633.3C672 633.3 768 566.7 864 566.7C960 566.7 1056 633.3 1152 633.3C1248 633.3 1344 566.7 1392 533.3L1440 500V800H1392C1344 800 1248 800 1152 800C1056 800 960 800 864 800C768 800 672 800 576 800C480 800 384 800 288 800C192 800 96 800 48 800H0V700Z"
          fill="url(#gradient-2)"
          fillOpacity="0.1"
        />
        <defs>
          <linearGradient id="gradient-1" x1="0" y1="400" x2="1440" y2="800" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#EC4899" />
          </linearGradient>
          <linearGradient id="gradient-2" x1="0" y1="500" x2="1440" y2="800" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EC4899" />
            <stop offset="1" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

