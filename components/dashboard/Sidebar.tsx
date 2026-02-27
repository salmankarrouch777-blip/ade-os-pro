"use client";

import { Globe, Layers, History, Target } from "lucide-react";

interface SidebarProps {
  objetivo: string;
  setObjetivo: (value: string) => void;
  gobernanza: string;
  setGobernanza: (value: string) => void;
  status: 'idle' | 'loading' | 'success' | 'error';
  handleSearch: () => void;
  onFetchHistory: () => void;
}

export default function Sidebar({
  objetivo,
  setObjetivo,
  gobernanza,
  setGobernanza,
  status,
  handleSearch,
  onFetchHistory,
}: SidebarProps) {
  return (
    <aside className="w-[300px] bg-[#050505] border-r border-white/5 hidden lg:flex flex-col z-20 shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.5)] relative z-50">
      <div className="h-[70px] flex items-center px-6 border-b border-white/5 justify-between">
        <div className="flex flex-col leading-none">
          <span className="text-[8px] font-bold text-slate-500 tracking-widest uppercase mb-1">DECISION INTELLIGENCE - PROCUREMENT</span>
          <div className="flex items-center gap-2">
            <Target size={18} className="text-[#00E5FF]" />
            <span className="font-black text-white text-[16px] tracking-widest">ADE OS <span className="text-[#00E5FF]">PRO</span></span>
          </div>
        </div>
        <span className="bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse"></div> Producción</span>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
        <div>
           <div className="flex items-center gap-2 mb-3">
             <Globe size={14} className="text-[#00E5FF]" />
             <span className="text-[10px] font-black text-[#00E5FF] uppercase tracking-widest">OBJETIVO ESTRATÉGICO (B2B)</span>
           </div>
           <textarea 
              value={objetivo} 
              onChange={(e) => setObjetivo(e.target.value)}
              placeholder="Ej: Análisis de proveedores para 50 unidades de pistones OEM..."
              className="w-full ade-input rounded-xl px-4 py-4 text-[12px] text-white resize-none h-[120px]"
           />
        </div>

        <div>
           <div className="flex items-center gap-2 mb-3">
             <Layers size={14} className="text-[#00E5FF]" />
             <span className="text-[10px] font-black text-[#00E5FF] uppercase tracking-widest">GOBERNANZA & RESTRICCIONES</span>
           </div>
           <textarea 
              value={gobernanza} 
              onChange={(e) => setGobernanza(e.target.value)}
              placeholder="Restricciones de flete, cumplimiento normativo..."
              className="w-full ade-input rounded-xl px-4 py-4 text-[12px] text-slate-400 resize-none h-[120px]"
           />
        </div>
      </div>

      <div className="p-6 border-t border-white/5 flex flex-col gap-4 bg-[#030303]">
        <button 
          onClick={onFetchHistory} 
          className="w-full bg-[#0A0A0A] border border-white/10 hover:border-[#00E5FF]/50 text-slate-300 hover:text-[#00E5FF] font-bold tracking-widest text-[10px] py-3 rounded-xl transition-all uppercase flex items-center justify-center gap-2"
        >
          <History size={14}/> AUDITAR HISTORIAL B2B
        </button>
        
        <button 
          onClick={handleSearch} 
          disabled={!objetivo.trim() || status === 'loading'} 
          className="w-full bg-[#0072FF] hover:bg-[#00C6FF] text-white font-black tracking-widest text-[12px] py-4 rounded-xl transition-all uppercase flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {status === 'loading' ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Globe size={16}/>}
          {status === 'loading' ? 'ANALIZANDO...' : 'EJECUTAR DECISIÓN'}
        </button>
      </div>
    </aside>
  );
}
