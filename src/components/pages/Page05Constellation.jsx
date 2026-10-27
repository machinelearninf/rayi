import React from 'react';

export default function Page05Constellation() {
  return (
    <div className="scrap-card card-bg-cream flex flex-col items-center justify-center p-6 relative overflow-hidden select-none">
      {/* Constellation SVG Diagram */}
      <div className="relative w-full max-w-[260px] aspect-[4/5] flex items-center justify-center">
        <svg viewBox="0 0 260 320" className="w-full h-full">
          {/* Background scatter dots */}
          <circle cx="40" cy="50" r="3.5" fill="#7A1C1C" />
          <circle cx="220" cy="70" r="3.5" fill="#7A1C1C" />
          <circle cx="160" cy="40" r="3.5" fill="#7A1C1C" />
          <circle cx="30" cy="230" r="3.5" fill="#7A1C1C" />
          <circle cx="225" cy="245" r="3.5" fill="#7A1C1C" />
          <circle cx="140" cy="300" r="3.5" fill="#7A1C1C" />

          {/* Connected Constellation Lines */}
          <polyline
            points="35,145 130,150 150,115 195,145 140,210 100,225 150,115"
            fill="none"
            stroke="#7A1C1C"
            strokeWidth="1.5"
            strokeDasharray="2,2"
          />

          {/* Line from You to Moon */}
          <line x1="130" y1="150" x2="195" y2="145" stroke="#7A1C1C" strokeWidth="1.5" />
          {/* Line from I to You */}
          <line x1="35" y1="145" x2="130" y2="150" stroke="#7A1C1C" strokeWidth="1.5" />
          {/* Line from You to The */}
          <line x1="130" y1="150" x2="140" y2="210" stroke="#7A1C1C" strokeWidth="1.5" />
          {/* Line from The to To */}
          <line x1="140" y1="210" x2="100" y2="225" stroke="#7A1C1C" strokeWidth="1.5" />
          {/* Line from To to Love */}
          <line x1="100" y1="225" x2="150" y2="115" stroke="#7A1C1C" strokeWidth="1.5" />
          {/* Line from Love to And */}
          <line x1="150" y1="115" x2="175" y2="125" stroke="#7A1C1C" strokeWidth="1.5" />
          {/* Line from Moon to Back */}
          <line x1="195" y1="145" x2="185" y2="200" stroke="#7A1C1C" strokeWidth="1.5" />

          {/* Node 1: I */}
          <circle cx="35" cy="145" r="4.5" fill="#7A1C1C" />
          <text x="24" y="148" fill="#7A1C1C" fontSize="11" fontWeight="bold" fontFamily="sans-serif">I</text>

          {/* Node 2: Love */}
          <circle cx="150" cy="115" r="4.5" fill="#7A1C1C" />
          <text x="157" y="112" fill="#7A1C1C" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Love</text>

          {/* Node 3: You */}
          <circle cx="130" cy="150" r="4.5" fill="#7A1C1C" />
          <text x="100" y="153" fill="#7A1C1C" fontSize="10" fontWeight="bold" fontFamily="sans-serif">You</text>

          {/* Node 4: And */}
          <circle cx="175" cy="125" r="4" fill="#7A1C1C" />
          <text x="178" y="123" fill="#7A1C1C" fontSize="9" fontWeight="bold" fontFamily="sans-serif">And</text>

          {/* Node 5: Moon */}
          <circle cx="195" cy="145" r="4.5" fill="#7A1C1C" />
          <text x="203" y="149" fill="#7A1C1C" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Moon</text>

          {/* Node 6: The */}
          <circle cx="140" cy="210" r="4" fill="#7A1C1C" />
          <text x="146" y="215" fill="#7A1C1C" fontSize="9" fontWeight="bold" fontFamily="sans-serif">The</text>

          {/* Node 7: To */}
          <circle cx="100" cy="225" r="4" fill="#7A1C1C" />
          <text x="82" y="235" fill="#7A1C1C" fontSize="9" fontWeight="bold" fontFamily="sans-serif">To</text>

          {/* Node 8: Back */}
          <circle cx="185" cy="200" r="4.5" fill="#7A1C1C" />
          <text x="190" y="208" fill="#7A1C1C" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Back</text>
        </svg>
      </div>

      <p className="text-[10px] text-[#7A1C1C]/70 tracking-widest font-mono mt-2 uppercase">
        to the moon and back ♡
      </p>
    </div>
  );
}
