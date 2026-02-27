import React from 'react';

export default function IsometricHero() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <svg 
        viewBox="0 0 800 800" 
        className="w-full h-full drop-shadow-2xl z-10 scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cyanTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="cyanLeft" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0891b2" stopOpacity="1"/>
            <stop offset="100%" stopColor="#164e63" stopOpacity="1"/>
          </linearGradient>
          <linearGradient id="cyanRight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#083344" stopOpacity="0.8"/>
          </linearGradient>
          <linearGradient id="glassPlatform" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.1"/>
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.05"/>
          </linearGradient>
        </defs>

        <polygon points="400,200 750,375 400,550 50,375" fill="url(#glassPlatform)" stroke="#06b6d4" strokeWidth="1" strokeOpacity="0.3" />
        <path d="M 225 287.5 L 575 462.5 M 575 287.5 L 225 462.5" stroke="#06b6d4" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 4" />

        <g transform="translate(-150, 50)">
          <polygon points="400,300 460,330 400,360 340,330" fill="url(#cyanTop)" stroke="#67e8f9" strokeWidth="1"/>
          <polygon points="340,330 400,360 400,440 340,410" fill="url(#cyanLeft)" stroke="#0891b2" strokeWidth="1"/>
          <polygon points="400,360 460,330 460,410 400,440" fill="url(#cyanRight)" stroke="#0891b2" strokeWidth="1"/>
          <line x1="350" y1="350" x2="390" y2="370" stroke="#a5f3fc" strokeWidth="2" />
          <line x1="350" y1="370" x2="390" y2="390" stroke="#a5f3fc" strokeWidth="2" />
        </g>

        <g transform="translate(150, -20) scale(0.8)">
          <polygon points="400,300 460,330 400,360 340,330" fill="url(#cyanTop)" stroke="#67e8f9" strokeWidth="1"/>
          <polygon points="340,330 400,360 400,440 340,410" fill="url(#cyanLeft)" stroke="#0891b2" strokeWidth="1"/>
          <polygon points="400,360 460,330 460,410 400,440" fill="url(#cyanRight)" stroke="#0891b2" strokeWidth="1"/>
          <line x1="410" y1="350" x2="450" y2="330" stroke="#a5f3fc" strokeWidth="2" />
        </g>

        <g transform="translate(0, -80)">
          <polygon points="400,250 480,290 400,330 320,290" fill="url(#cyanTop)" stroke="#cffafe" strokeWidth="1.5"/>
          <polygon points="320,290 400,330 400,500 320,460" fill="url(#cyanLeft)" stroke="#06b6d4" strokeWidth="1"/>
          <polygon points="400,330 480,290 480,460 400,500" fill="url(#cyanRight)" stroke="#06b6d4" strokeWidth="1"/>
          <polygon points="400,230 460,260 400,290 340,260" fill="none" stroke="#22d3ee" strokeWidth="2" className="animate-pulse" />
          <line x1="340" y1="320" x2="340" y2="440" stroke="#22d3ee" strokeWidth="1.5" strokeOpacity="0.5" />
          <line x1="380" y1="340" x2="380" y2="460" stroke="#22d3ee" strokeWidth="1.5" strokeOpacity="0.5" />
        </g>

        <path d="M 400 420 L 250 345 M 400 420 L 550 345" stroke="#22d3ee" strokeWidth="3" strokeDasharray="6 6" className="animate-pulse" />
        <circle cx="250" cy="345" r="4" fill="#06b6d4" />
        <circle cx="550" cy="345" r="4" fill="#06b6d4" />
        <circle cx="400" cy="420" r="8" fill="#fff" />
      </svg>
    </div>
  );
}