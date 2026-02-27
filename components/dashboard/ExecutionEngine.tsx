"use client";

import { 
  CheckCircle2, Scale, AlertTriangle, Anchor, Map 
} from "lucide-react";

interface ComplianceItem {
  normativa: string;
  estado: string;
  impacto: string;
  color?: string;
}

interface DictamenEjecutivo {
  titulo?: string;
  confidence_index?: string | number;
  coste_inaccion?: string;
  compliance?: ComplianceItem[];
}

interface BookingResult {
  carrier: string;
  tracking_number: string;
  eta: string;
}

interface ExecutionEngineProps {
  dictamen: DictamenEjecutivo;
  bookingStatus: 'idle' | 'processing' | 'success' | 'error';
  bookingResult: BookingResult | null;
  onExecuteTacticalPlan: () => void;
  onResetBookingStatus: () => void;
}

export default function ExecutionEngine({
  dictamen,
  bookingStatus,
  bookingResult,
  onExecuteTacticalPlan,
  onResetBookingStatus,
}: ExecutionEngineProps) {
  const compliance = Array.isArray(dictamen.compliance) ? dictamen.compliance : [];

  return (
    <div className="ade-card-green flex-1 p-8 relative overflow-hidden flex flex-col shadow-[0_0_30px_rgba(16,185,129,0.03)] justify-between">
      <div>
        <div className="flex justify-between items-start mb-10 relative z-10">
          <span className="bg-[#10B981] text-[#03060A] px-4 py-1.5 rounded text-[11px] font-black tracking-widest uppercase flex items-center gap-2">
            <CheckCircle2 size={14}/> DICTAMEN EJECUTIVO
          </span>
          <div className="flex flex-col items-end">
            <span className="text-[9px] text-slate-400 font-bold tracking-widest uppercase mb-1">CONFIDENCE INDEX</span>
            <div className="flex items-center gap-3">
              <span className="text-white font-black text-[18px] leading-none">
                {dictamen.confidence_index || "..."}
                <span className="text-[12px] text-slate-500">/100</span>
              </span>
              <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden flex">
                <div className="w-[95%] bg-[#10B981] h-full"></div>
                <div className="w-[5%] bg-amber-500 h-full"></div>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-[32px] md:text-[40px] font-black text-[#10B981] tracking-tighter leading-none mb-10 uppercase relative z-10 drop-shadow-[0_0_10px_rgba(16,185,129,0.2)]">
          {dictamen.titulo || "..."}
        </h3>

        <div className="relative z-10 mb-6">
          <div className="flex items-center gap-2 mb-4 border-b border-amber-500/20 pb-2">
            <Scale size={12} className="text-amber-500"/>
            <span className="text-[9px] font-black text-amber-500 tracking-widest uppercase">COMPLIANCE & REQUISITOS</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {compliance.map((c: ComplianceItem, i: number) => (
              <div key={i} className="flex items-start gap-3 bg-[#030508]/50 border border-white/5 p-4 rounded-xl">
                <div className={`mt-0.5 shrink-0 ${c.color === 'red' || c.impacto?.includes('ALTO') ? 'text-rose-500' : 'text-[#10B981]'}`}>
                  {c.color === 'red' || c.impacto?.includes('ALTO') ? <AlertTriangle size={14}/> : <CheckCircle2 size={14}/>}
                </div>
                <div>
                  <p className="text-[11px] font-bold text-white leading-tight mb-1.5">{c.normativa}</p>
                  <div className="flex items-center gap-2 text-[8px] font-black tracking-widest uppercase">
                    <span className={c.color === 'red' || c.impacto?.includes('ALTO') ? 'text-rose-500 bg-rose-500/10 px-1 rounded' : 'text-[#10B981] bg-[#10B981]/10 px-1 rounded'}>
                      {c.estado}
                    </span>
                    <span className="text-slate-600">|</span>
                    <span className={c.color === 'red' || c.impacto?.includes('ALTO') ? 'text-rose-400' : 'text-[#10B981]'}>
                      {c.impacto}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOTOR DE EJECUCIÓN: BOTÓN DEL PÁNICO                      */}
      {/* ========================================================= */}
      <div className="mt-auto border-t border-[#10B981]/20 pt-6 relative z-10">
        {bookingStatus === 'idle' && (
          <button 
            onClick={onExecuteTacticalPlan} 
            className="w-full bg-rose-600 hover:bg-rose-500 text-white font-black tracking-widest text-[11px] py-4 rounded-xl transition-all uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(225,29,72,0.4)]"
          >
            <Anchor size={16}/> APROBAR Y EJECUTAR PLAN TÁCTICO (FLETE URGENTE)
          </button>
        )}

        {bookingStatus === 'processing' && (
          <button 
            disabled 
            className="w-full bg-[#130505] border border-rose-500/30 text-rose-500 font-black tracking-widest text-[11px] py-4 rounded-xl transition-all uppercase flex items-center justify-center gap-2 opacity-80 cursor-not-allowed"
          >
            <div className="w-4 h-4 border-2 border-rose-500/30 border-t-rose-500 rounded-full animate-spin"></div>
            NEGOCIANDO CON API DE TRANSITARIO...
          </button>
        )}

        {bookingStatus === 'success' && bookingResult && (
          <div className="w-full bg-[#05130D] border border-[#10B981] p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={24} className="text-[#10B981]"/>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-[#10B981] tracking-widest uppercase">
                  CARGA ASEGURADA • {bookingResult.carrier}
                </span>
                <span className="text-white font-mono text-[14px] font-bold">
                  {bookingResult.tracking_number}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-right">
              <div className="flex flex-col hidden md:flex">
                <span className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">ETA</span>
                <span className="text-[#10B981] font-bold text-[12px]">{bookingResult.eta}</span>
              </div>
              <button className="bg-[#10B981]/10 hover:bg-[#10B981]/20 border border-[#10B981]/30 text-[#10B981] px-4 py-2 rounded text-[9px] font-black uppercase tracking-widest transition-colors flex items-center gap-2">
                <Map size={12}/> LIVE TRACKING
              </button>
            </div>
          </div>
        )}

        {bookingStatus === 'error' && (
          <button 
            onClick={onResetBookingStatus} 
            className="w-full bg-[#130505] border border-rose-500 text-rose-500 font-black tracking-widest text-[11px] py-4 rounded-xl transition-all uppercase flex items-center justify-center gap-2"
          >
            <AlertTriangle size={16}/> ERROR DE API. REINTENTAR EJECUCIÓN
          </button>
        )}
      </div>
    </div>
  );
}
