"use client";

import { Database, X, Clock, ChevronRight } from "lucide-react";

interface HistoryItem {
  id: string;
  objetivo: string;
  created_at: string;
  payload: {
    analisis_valor?: {
      coste_base?: string;
    };
  };
}

interface HistoryDrawerProps {
  isOpen: boolean;
  historyData: HistoryItem[];
  onClose: () => void;
  onLoadPastDictamen: (payload: any) => void;
}

export default function HistoryDrawer({
  isOpen,
  historyData,
  onClose,
  onLoadPastDictamen,
}: HistoryDrawerProps) {
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[8000]" 
          onClick={onClose}
        />
      )}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-[#050505] border-l border-white/10 shadow-2xl z-[9000] transform transition-transform duration-500 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="h-[70px] border-b border-white/5 flex items-center justify-between px-6 shrink-0 bg-[#0A0A0A]">
          <div className="flex items-center gap-2 text-[#00E5FF]">
            <Database size={16} />
            <span className="text-[11px] font-black uppercase tracking-widest">Memoria Institucional</span>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 custom-scrollbar">
          {historyData.length === 0 ? (
            <p className="text-[11px] text-slate-500 text-center mt-10 uppercase tracking-widest">
              No hay registros auditables.
            </p>
          ) : (
            historyData.map((item) => (
              <div 
                key={item.id} 
                onClick={() => onLoadPastDictamen(item.payload)} 
                className="ade-card p-5 cursor-pointer hover:border-[#00E5FF]/40 transition-all group"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[9px] text-slate-500 font-mono flex items-center gap-1">
                    <Clock size={10}/> {new Date(item.created_at).toLocaleDateString()}
                  </span>
                  <span className="bg-[#10B981]/10 text-[#10B981] text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest">
                    Auditado
                  </span>
                </div>
                <h4 className="text-[12px] font-bold text-white mb-2 line-clamp-2 leading-tight group-hover:text-[#00E5FF] transition-colors">
                  {item.objetivo}
                </h4>
                <div className="flex items-center justify-between mt-4 border-t border-white/5 pt-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    TCO: {item.payload?.analisis_valor?.coste_base || "N/A"}
                  </span>
                  <ChevronRight size={14} className="text-slate-600 group-hover:text-[#00E5FF] transition-colors"/>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
