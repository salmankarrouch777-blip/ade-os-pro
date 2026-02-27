"use client";

import { useState } from "react";
import Image from "next/image";

export default function HeroImage() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="relative w-full h-full min-h-[380px] lg:min-h-[520px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-b from-slate-700/50 to-slate-900/70 flex items-end justify-center">
        <div className="absolute inset-0 flex items-center justify-center gap-4">
          <div className="flex items-end gap-2">
            <div className="w-8 h-24 bg-blue-500/80 rounded-t" />
            <div className="w-10 h-32 bg-blue-600/80 rounded-t" />
            <div className="w-8 h-16 bg-sky-500/80 rounded-t" />
            <div className="w-12 h-28 bg-indigo-500/80 rounded-t" />
          </div>
        </div>
        <div className="absolute bottom-0 w-full h-20 bg-slate-500/40 rounded-t-full" />
        <span className="absolute bottom-8 text-white/50 text-xs">3D City</span>
      </div>
    );
  }

  return (
    <div className="relative h-[380px] lg:h-[520px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
      <Image
        src="/hero-3d-city.png"
        alt="3D futuristic cityscape"
        fill
        className="object-cover object-center"
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority
        unoptimized
        onError={() => setFailed(true)}
      />
      <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-slate-500/50 to-transparent pointer-events-none" />
    </div>
  );
}
