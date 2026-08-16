function RouteIllustration() {
  return (
    <div className="route-visual">

      <svg
        className="route-illustration"
        viewBox="0 0 520 190"
        xmlns="http://www.w3.org/2000/svg"
      >

        {/* ROUTE PATH */}
        <path
          d="
            M 35 145
            C 110 145,
              105 55,
              205 65
            S 310 150,
              380 92
            S 445 45,
              490 32
          "
          fill="none"
          stroke="#55D5FF"
          strokeOpacity="0.55"
          strokeWidth="4"
          strokeDasharray="3 13"
          strokeLinecap="round"
        />


        {/* START LOCATION */}
        <circle
          cx="35"
          cy="145"
          r="9"
          fill="white"
        />

        <circle
          cx="35"
          cy="145"
          r="17"
          fill="none"
          stroke="#55D5FF"
          strokeOpacity="0.25"
          strokeWidth="2"
        />


        {/* DESTINATION PIN */}
        <path
          d="
            M490 14
            C475 14 464 26 464 40
            C464 59 490 76 490 76
            C490 76 516 59 516 40
            C516 26 505 14 490 14Z
          "
          fill="url(#pinGradient)"
        />

        <circle
          cx="490"
          cy="39"
          r="7"
          fill="white"
        />


        {/* CAMPUS BUILDING */}
        <g transform="translate(92 45)">

          {/* Roof */}
          <path
            d="M0 24 L30 5 L60 24"
            fill="none"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Building */}
          <rect
            x="7"
            y="24"
            width="46"
            height="32"
            rx="3"
            fill="rgba(255,255,255,0.08)"
            stroke="white"
            strokeWidth="3"
          />

          {/* Columns */}
          <line
            x1="18"
            y1="32"
            x2="18"
            y2="50"
            stroke="white"
            strokeWidth="3"
          />

          <line
            x1="30"
            y1="32"
            x2="30"
            y2="50"
            stroke="white"
            strokeWidth="3"
          />

          <line
            x1="42"
            y1="32"
            x2="42"
            y2="50"
            stroke="white"
            strokeWidth="3"
          />

        </g>


        {/* CAR */}
        <g
          transform="translate(270 92)"
          filter="url(#carShadow)"
        >

          {/* Car body */}
          <path
            d="
              M8 36
              L18 16
              C20 12 24 10 29 10
              H62
              C67 10 71 13 73 17
              L82 36
              Z
            "
            fill="#168CFF"
          />

          {/* Front window */}
          <path
            d="
              M27 16
              H41
              L46 29
              H21
              Z
            "
            fill="#C8F3FF"
          />

          {/* Rear window */}
          <path
            d="
              M45 16
              H61
              C64 16 66 18 68 21
              L71 29
              H49
              Z
            "
            fill="#C8F3FF"
          />

          {/* Car base */}
          <rect
            x="5"
            y="29"
            width="82"
            height="18"
            rx="8"
            fill="#168CFF"
          />

          {/* Left wheel */}
          <circle
            cx="24"
            cy="48"
            r="9"
            fill="#071827"
          />

          <circle
            cx="24"
            cy="48"
            r="4"
            fill="#8BDFFF"
          />

          {/* Right wheel */}
          <circle
            cx="70"
            cy="48"
            r="9"
            fill="#071827"
          />

          <circle
            cx="70"
            cy="48"
            r="4"
            fill="#8BDFFF"
          />

          {/* Headlight */}
          <circle
            cx="84"
            cy="34"
            r="3"
            fill="#EFFFFF"
          />

        </g>


        {/* ROUTE MATCHING POINTS */}
        <circle
          cx="205"
          cy="65"
          r="6"
          fill="#55D5FF"
        />

        <circle
          cx="380"
          cy="92"
          r="6"
          fill="#55D5FF"
        />


        {/* DEFINITIONS */}
        <defs>

          {/* Destination gradient */}
          <linearGradient
            id="pinGradient"
            x1="464"
            y1="14"
            x2="516"
            y2="76"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              stopColor="#27C2FF"
            />

            <stop
              offset="1"
              stopColor="#168CFF"
            />
          </linearGradient>


          {/* Car shadow */}
          <filter
            id="carShadow"
            x="-20%"
            y="-20%"
            width="140%"
            height="160%"
          >
            <feDropShadow
              dx="0"
              dy="8"
              stdDeviation="6"
              floodOpacity="0.3"
            />
          </filter>

        </defs>

      </svg>

    </div>
  );
}

export default RouteIllustration;