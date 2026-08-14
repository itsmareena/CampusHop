function RouteIllustration() {
  return (
    <svg
      className="route-illustration"
      viewBox="0 0 260 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 30 160 C 80 160, 70 60, 130 60 S 190 140, 230 40"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeDasharray="2 10"
        strokeLinecap="round"
      />

      <circle cx="30" cy="160" r="8" fill="#ffffff" />
      <circle cx="230" cy="40" r="8" fill="#ffffff" />
      <circle cx="230" cy="40" r="14" fill="none" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="2" />

      <g transform="translate(95, 95)">
        <circle cx="10" cy="45" r="14" fill="none" stroke="#ffffff" strokeWidth="4" />
        <circle cx="50" cy="45" r="14" fill="none" stroke="#ffffff" strokeWidth="4" />
        <path
          d="M 10 45 L 25 20 L 40 20 M 25 20 L 20 45 M 40 20 L 50 45"
          fill="none"
          stroke="#ffffff"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="25" cy="18" r="5" fill="#ffffff" />
      </g>
    </svg>
  );
}

export default RouteIllustration;