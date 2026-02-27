"use client";

import { useState } from "react";
import { ChevronRight, Globe, Mail, MapPin, Linkedin, Camera, Circle } from "lucide-react";

export default function ContactForm({ hideTitle }: { hideTitle?: boolean }) {
  const [field1, setField1] = useState("");
  const [field2, setField2] = useState("");

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200/80">
      {!hideTitle && <h3 className="text-slate-900 font-bold text-lg mb-6">Contact Forms</h3>}
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={field1}
            onChange={(e) => setField1(e.target.value)}
            placeholder="Crato Gorttincodesest"
            className="w-full bg-slate-100 border border-slate-200 rounded-xl py-3.5 pl-4 pr-12 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-sm"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            <ChevronRight className="w-5 h-5" />
          </span>
        </div>
        <div className="relative">
          <input
            type="email"
            value={field2}
            onChange={(e) => setField2(e.target.value)}
            placeholder="Amrytassiet tour"
            className="w-full bg-slate-100 border border-slate-200 rounded-xl py-3.5 pl-4 pr-12 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-sm"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            <ChevronRight className="w-5 h-5" />
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 mt-6 pt-6 border-t border-slate-200">
        <a href="#" className="w-11 h-11 rounded-full bg-[#0a192f] text-white flex items-center justify-center hover:bg-[#0d2137] transition-colors shadow-md" aria-label="Globe">
          <Globe className="w-5 h-5" />
        </a>
        <a href="#" className="w-11 h-11 rounded-full bg-[#0a192f] text-white flex items-center justify-center hover:bg-[#0d2137] transition-colors shadow-md font-bold text-lg" aria-label="Facebook">
          f
        </a>
        <a href="#" className="w-11 h-11 rounded-full bg-[#0a192f] text-white flex items-center justify-center hover:bg-[#0d2137] transition-colors shadow-md" aria-label="Twitter">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a href="#" className="w-11 h-11 rounded-full bg-[#0a192f] text-white flex items-center justify-center hover:bg-[#0d2137] transition-colors shadow-md" aria-label="Instagram">
          <Camera className="w-5 h-5" />
        </a>
        <a href="#" className="w-11 h-11 rounded-full bg-[#0a192f] text-white flex items-center justify-center hover:bg-[#0d2137] transition-colors shadow-md" aria-label="More">
          <Circle className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
