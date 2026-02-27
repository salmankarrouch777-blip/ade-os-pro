"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { 
  Download, ChevronLeft, Lock, AlertTriangle, TrendingUp, 
  ShieldCheck, CheckCircle2, BarChart, Building2, Sparkles, ArrowRight
} from "lucide-react";

const mockData = {
  producto_auditado: "Fondo 50M€: Baterías Estado Sólido vs LFP",
  codigo_taric: "8507.60",
  dictamen: {
    veredicto: "Priorizar Serie B Europea Artículo 9",
    confidence: 94,
    compliance: [
      { label: "SFDR Art. 9", valor: "Inversión Sostenible", riesgo: "OBLIGATORIO" },
      { label: "CBAM", valor: "Ajuste Frontera", riesgo: "OBLIGATORIO" },
      { label: "TARIC", valor: "8507.60", riesgo: "VERIFICADO" }
    ]
  },
  coste_inaccion: { valor: "+7.384 €", periodo: "trimestral en ventana perdida" },
  threat_radar: [
    { nivel: "CRÍTICO", texto: "La rápida escalabilidad del LFP chino amenaza los márgenes para 2027." },
    { nivel: "AVISO", texto: "Exigencias de CAPEX amenazan con dilución de posiciones minoritarias." }
  ],
  tco: {
    filas: [
      { concepto: "Inversión Base", a: "50 M€", b: "50 M€" },
      { concepto: "Horizonte Liquidez", a: "2–3 años", b: "5–7 años" },
      { concepto: "TIR Proyectada", a: "12% (Riesgo)", b: "35% (Protegido)" }
    ],
    veredicto: "Serie B Europea superior en TIR y protección anti-dilución."
  },
  monte_carlo: {
    confianza: 88,
    escenarios: [
      { tipo: "BEST", tir: "45%", texto: "Adopción temprana en 2026. Salida vía IPO." },
      { tipo: "BASE", tir: "15%", texto: "Retrasos de manufactura hasta 2028." },
      { tipo: "WORST", tir: "−42.5M €", texto: "LFP chino domina el mercado masivo." }
    ]
  }
};

export default function Results() {
  const router = useRouter();
  const { isLoaded } = useUser();
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // PAYWALL: Salta a los 3.5 segundos exactos
    if (isLoaded) { setTimeout(() => setShowPaywall(true), 3500); }
  }, [isLoaded]);

  return (
    <div className="min-h-screen bg-[#0B1121] text-slate-300 font-sans pb-24 relative overflow-hidden selection:bg-sky-500/30 selection:text-sky-200">
      <div className="fixed inset-0 hero-gradient pointer-events-none z-0" />
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-sky-600/15 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/12 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* =========================================================
          EL NUEVO PAYWALL PREMIUM (Modal de Cristal Flotante)
      ========================================================= */}
      {showPaywall && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 print-hidden">
          {/* Desenfoque de fondo brutal */}
          <div className="absolute inset-0 bg-[#0B1121]/80 backdrop-blur-xl transition-all"></div>
          
          <div className="relative glass-card p-10 md:p-12 rounded-[2.5rem] max-w-lg w-full text-center shadow-[0_0_80px_rgba(59,130,246,0.2)] animate-in fade-in zoom-in duration-500 overflow-hidden border border-blue-500/20">
            {/* Brillo superior en la tarjeta */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-80"></div>
            
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center rounded-3xl mx-auto mb-8 shadow-[0_10px_30px_rgba(59,130,246,0.4)] border border-white/20 transform rotate-6 hover:rotate-0 transition-transform">
              <Lock size={32} className="text-white" />
            </div>
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-[10px] font-bold tracking-widest uppercase mb-6">
              <Sparkles size={12} /> Inteligencia Restringida
            </div>
            
            <h3 className="text-3xl font-extrabold text-white mb-4 tracking-tight">Desbloquea el Panel PRO</h3>
            <p className="text-sm text-slate-400 mb-8 leading-relaxed">
              El reporte avanzado OSINT y las simulaciones exceden el límite del Plan Free. Actualiza para acceder a inteligencia en tiempo real.
            </p>
            
            <button onClick={() => alert("Redirigiendo a Stripe...")} className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-lg rounded-2xl transition-all shadow-[0_10px_30px_rgba(59,130,246,0.4)] hover:-translate-y-1 mb-6 flex items-center justify-center gap-2">
              Desbloquear Informe (1.000€) <ArrowRight size={20} />
            </button>
            
            <button onClick={() => router.push('/dashboard')} className="text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">
              Volver al Dashboard
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          CONTENIDO DEL INFORME (Glassmorphism Bento Grid)
      ========================================================= */}
      <div className={`relative z-10 transition-all duration-1000 ${showPaywall ? 'blur-xl opacity-30 pointer-events-none select-none h-screen overflow-hidden' : ''}`}>
        
        {/* TOPBAR FLOTANTE */}
        <header className="sticky top-4 z-40 mx-4 md:mx-8 glass-card h-16 flex items-center justify-between px-6 rounded-2xl shadow-lg print-hidden">
          <button onClick={() => router.push('/dashboard')} className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors">
            <ChevronLeft size={18} /> Volver a Búsqueda
          </button>
          <button onClick={() => window.print()} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold rounded-full transition-all shadow-[0_0_15px_rgba(59,130,246,0.4)]">
            <Download size={16} /> Exportar PDF
          </button>
        </header>

        <main className="max-w-6xl mx-auto px-4 md:px-8 mt-10 space-y-6">
          
          {/* HEADER DEL INFORME */}
          <div className="pb-8">
            <div className="flex gap-3 mb-6">
              <span className="px-5 py-2 glass-card text-white text-xs font-bold rounded-full uppercase tracking-wider">
                TARIC {mockData.codigo_taric}
              </span>
              <span className="px-5 py-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold rounded-full flex items-center gap-2 uppercase tracking-wider shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <Sparkles size={16} /> AI Confidence {mockData.dictamen.confidence}%
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-slate-400 tracking-tight leading-[1.1]">
              {mockData.producto_auditado}
            </h1>
          </div>

          {/* ROW 1: DICTAMEN & COSTE */}
          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* TARJETA DICTAMEN */}
            <div className="lg:col-span-2 glass-card p-8 md:p-10 rounded-[2rem] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
              
              <div className="flex items-center gap-3 text-xs font-bold text-blue-400 uppercase tracking-widest mb-8">
                <div className="p-2 bg-blue-500/20 rounded-xl"><ShieldCheck size={18} /></div> Dictamen Ejecutivo
              </div>
              
              <p className="text-3xl md:text-4xl font-extrabold text-white mb-10 tracking-tight leading-snug">
                {mockData.dictamen.veredicto}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-8 border-t border-white/10">
                {mockData.dictamen.compliance.map((c, i) => (
                   <div key={i} className="bg-white/5 p-5 rounded-2xl border border-white/5">
                     <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-2 font-bold">{c.label}</p>
                     <p className="text-base text-white font-bold mb-3">{c.valor}</p>
                     <p className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded inline-block ${c.riesgo.includes('OBLIGATORIO') ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'}`}>
                       {c.riesgo}
                     </p>
                   </div>
                ))}
              </div>
            </div>

            {/* TARJETA COSTE */}
            <div className="glass-card border border-rose-500/20 p-8 md:p-10 rounded-[2rem] flex flex-col justify-center relative overflow-hidden shadow-[0_0_40px_rgba(225,29,72,0.1)] group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-rose-500/10 blur-[50px] rounded-full group-hover:bg-rose-500/20 transition-all"></div>
              <div className="flex items-center gap-3 text-xs font-bold text-rose-400 uppercase tracking-widest mb-6 relative z-10">
                <div className="p-2 bg-rose-500/20 rounded-xl"><AlertTriangle size={18} /></div> Coste Inacción
              </div>
              <p className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                {mockData.coste_inaccion.valor}
              </p>
              <p className="text-sm text-slate-400 font-medium relative z-10">
                {mockData.coste_inaccion.periodo}
              </p>
            </div>
          </div>

          {/* ROW 2: TCO & MONTE CARLO */}
          <div className="grid lg:grid-cols-2 gap-6">
            
            {/* TCO Matrix */}
            <div className="glass-card p-8 md:p-10 rounded-[2rem]">
              <div className="flex items-center gap-3 text-xs font-bold text-slate-300 uppercase tracking-widest mb-8">
                <div className="p-2 bg-white/10 rounded-xl"><TrendingUp size={18} /></div> Matriz Comparativa (TCO)
              </div>
              
              <div className="overflow-x-auto mb-8">
                <table className="w-full text-left text-sm">
                  <thead className="text-slate-400 border-b border-white/10">
                    <tr>
                      <th className="pb-4 font-bold text-[10px] uppercase tracking-wider">Concepto B2B</th>
                      <th className="pb-4 font-bold text-[10px] uppercase tracking-wider text-blue-400">Opción A (IA)</th>
                      <th className="pb-4 font-bold text-[10px] uppercase tracking-wider">Opción B</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {mockData.tco.filas.map((row, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors">
                        <td className="py-5 text-slate-300 font-medium">{row.concepto}</td>
                        <td className="py-5 font-bold text-white bg-blue-500/5 px-2 rounded-lg">{row.a}</td>
                        <td className="py-5 text-slate-500">{row.b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-2xl p-5 flex items-start gap-4">
                <CheckCircle2 size={24} className="text-blue-400 shrink-0 mt-0.5" />
                <span className="font-semibold text-slate-200 leading-relaxed">{mockData.tco.veredicto}</span>
              </div>
            </div>

            {/* Monte Carlo */}
            <div className="glass-card p-8 md:p-10 rounded-[2rem] flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3 text-xs font-bold text-indigo-400 uppercase tracking-widest">
                  <div className="p-2 bg-indigo-500/20 rounded-xl"><BarChart size={18} /></div> Monte Carlo
                </div>
                <span className="text-[10px] text-indigo-300 bg-indigo-500/10 px-3 py-1.5 rounded-full font-bold border border-indigo-500/20">
                  CONF: {mockData.monte_carlo.confianza}%
                </span>
              </div>
              
              <div className="space-y-4 flex-1">
                {mockData.monte_carlo.escenarios.map((m, i) => (
                  <div key={i} className="flex justify-between items-center p-5 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="pr-6">
                      <div className={`inline-flex items-center gap-2 text-[10px] font-bold mb-2 tracking-widest uppercase px-2.5 py-1 rounded-md ${m.tipo === 'BEST' ? 'bg-blue-500/20 text-blue-400' : m.tipo === 'WORST' ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-500/20 text-slate-300'}`}>
                        {m.tipo} CASE
                      </div>
                      <div className="text-sm text-slate-300 font-medium leading-relaxed">{m.texto}</div>
                    </div>
                    <div className={`text-2xl font-bold tracking-tight shrink-0 ${m.tipo === 'WORST' ? 'text-rose-400' : 'text-white'}`}>
                      {m.tir}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}