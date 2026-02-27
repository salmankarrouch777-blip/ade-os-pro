"use client";

import { useState, useEffect } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { 
  Search, Bell, ShieldAlert, Activity, Zap, ShieldCheck, 
  Building2, CheckCircle2, Download, AlertTriangle, MapPin, 
  LineChart, Clock, Terminal, Link2, Target, Play, Share2, 
  Link as LinkIcon, X, Layers
} from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import ExecutionEngine from "@/components/dashboard/ExecutionEngine";
import HistoryDrawer from "@/components/dashboard/HistoryDrawer";

export default function Dashboard() {
  const { isLoaded, user } = useUser();
  const [mounted, setMounted] = useState(false);
  
  // ESTADOS DEL SISTEMA
  const [objetivo, setObjetivo] = useState("");
  const [gobernanza, setGobernanza] = useState("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [toast, setToast] = useState({ show: false, msg: "", type: "default" });
  const [apiError, setApiError] = useState("");
  const [currentData, setCurrentData] = useState<any>(null);

  // ESTADOS DE MEMORIA INSTITUCIONAL
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historyData, setHistoryData] = useState<any[]>([]);

  // ESTADOS DE EJECUCIÓN TRANSACCIONAL
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [bookingResult, setBookingResult] = useState<any>(null);

  // ESTADO DE ALERTA ERP
  const [erpAlert, setErpAlert] = useState<any>(null);

  useEffect(() => { 
    setMounted(true); 
  }, []);

  const showToast = (msg: string, type: "default" | "warning" | "success" | "error" = "default") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: "", type: "default" }), 5000);
  };

  // POLLING DE ALERTAS ERP
  useEffect(() => {
    if (!mounted) return;

    const pollErpAlerts = async () => {
      try {
        const response = await fetch('/api/webhooks/erp/latest');
        if (!response.ok) return;
        
        const data = await response.json();
        if (data.alert && data.alert.id !== erpAlert?.id) {
          setErpAlert(data.alert);
          showToast("🚨 Nueva alerta ERP detectada", "error");
        }
      } catch (error) {
        // Silencio operativo
      }
    };

    pollErpAlerts();
    const interval = setInterval(pollErpAlerts, 10000);

    return () => clearInterval(interval);
  }, [mounted, erpAlert?.id]);

  // LECTURA DETERMINISTA (Sin Regex ni adivinanzas léxicas)
  const alertSku = erpAlert?.erp_sku || erpAlert?.sku || "DESCONOCIDO";
  const alertQty = erpAlert?.erp_cantidad || erpAlert?.cantidad || "0";

  const handleErpAutoExecute = () => {
    if (!erpAlert) return;
    
    const alertPayload = erpAlert.objetivo || `Alerta ERP: Stock crítico detectado. SKU: ${alertSku}, Cantidad: ${alertQty}. Se requiere acción inmediata.`;
    
    setObjetivo(alertPayload);
    setErpAlert(null);
    
    setTimeout(() => {
      handleSearch();
    }, 100);
  };

  // RECUPERACIÓN DE HISTORIAL (SUPABASE)
  const fetchHistory = async () => {
    if (!user?.id) {
      showToast("Autenticación requerida para auditar historial.", "error");
      return;
    }
    try {
      const response = await fetch(`/api/historial?userId=${user.id}`);
      if (!response.ok) throw new Error("Fallo al contactar con la base de datos.");
      const { data } = await response.json();
      setHistoryData(data || []);
      setIsHistoryOpen(true);
    } catch (error) {
      showToast("Error al cargar el historial institucional.", "error");
    }
  };

  const loadPastDictamen = (payload: any) => {
    setCurrentData(payload);
    setStatus('success');
    setBookingStatus('idle'); 
    setBookingResult(null);
    setIsHistoryOpen(false);
    showToast("✅ Dictamen recuperado desde memoria segura.", "success");
  };

  // MOTOR DE EJECUCIÓN ANALÍTICA (GEMINI)
  const handleSearch = async () => {
    if (!objetivo.trim()) return;
    
    setStatus('loading');
    setBookingStatus('idle');
    setBookingResult(null);
    setApiError("");
    showToast("⚡ Evaluando variables estratégicas...", "default");

    try {
      const response = await fetch('/api/analisis-b2b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          objetivo, 
          gobernanza,
          userId: user?.id || "admin_local"
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Fallo de conexión HTTP ${response.status}. Detalle: ${errorText}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulatedJSON = "";
      let lastValidData = null;

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          accumulatedJSON += decoder.decode(value, { stream: true });
          
          try {
            lastValidData = JSON.parse(accumulatedJSON);
            setCurrentData(lastValidData);
          } catch(e) {
            // Silencio operativo durante fragmentación
          }
        }
      }

      if (!accumulatedJSON.trim()) throw new Error("Payload vacío devuelto por el motor LLM.");

      try {
        const finalData = JSON.parse(accumulatedJSON);
        setCurrentData(finalData);
        setStatus('success');
        showToast("✅ Panel generado con precisión absoluta.", "success");
      } catch (finalError) {
        if (lastValidData) {
          setCurrentData(lastValidData);
          setStatus('success');
          showToast("⚠️ Conexión interrumpida. Recuperada última estructura válida.", "warning");
        } else {
          throw new Error("Corrupción irrecuperable en el payload de respuesta.");
        }
      }

    } catch (error: any) {
      setApiError(error.message);
      setStatus('error');
    }
  };

  // PROTOCOLO DE EJECUCIÓN LOGÍSTICA
  const executeTacticalPlan = async () => {
    setBookingStatus('processing');
    showToast("Iniciando protocolo de conexión EDI con Transitario...", "default");

    try {
      const response = await fetch('/api/logistics/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          objetivo: objetivo || currentData?.titulo_decision,
          accion_tactica: currentData?.analisis_valor?.vector_tactico,
          nivel_urgencia: "CRITICO"
        })
      });

      if (!response.ok) throw new Error("Fallo en la pasarela de integración logística.");

      const data = await response.json();
      setBookingResult(data.transaccional_data);
      setBookingStatus('success');
      showToast("✅ Capacidad logística asegurada. Operación en tránsito.", "success");
    } catch (error: any) {
      setBookingStatus('error');
      showToast(error.message, "error");
    }
  };

  if (!mounted) return null;

  // SAFE CHAINING
  const d = currentData || {};
  const dictamen = d.dictamen_ejecutivo || {};
  const compliance = Array.isArray(dictamen.compliance) ? dictamen.compliance : [];
  const alertas = Array.isArray(d.threat_radar) ? d.threat_radar : [];
  const valor = d.analisis_valor || {};
  const simulador = d.simulador_monte_carlo || {};
  const matriz = d.matriz_comparativa || { filas: [], evaluacion: {} };
  const proveedores = Array.isArray(d.directorio_entidades) ? d.directorio_entidades : [];
  const fuentes = Array.isArray(d.trazabilidad_fuentes) ? d.trazabilidad_fuentes : [];

  return (
    <div className="flex h-screen bg-[#050505] text-slate-300 font-sans overflow-hidden relative selection:bg-[#00E5FF]/30 selection:text-[#00E5FF]">
      
      <style dangerouslySetInnerHTML={{__html: `
        .ade-card { background: #0A0A0A; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.05); }
        .ade-card-green { background: #05130D; border: 1px solid rgba(16, 185, 129, 0.2); }
        .ade-card-red { background: #130505; border: 1px solid rgba(244, 63, 94, 0.2); }
        .ade-card-blue { background: #050E13; border: 1px solid rgba(0, 229, 255, 0.2); }
        .ade-input { background: #0A0A0A; border: 1px solid rgba(255, 255, 255, 0.1); }
        .ade-input:focus { border-color: #00E5FF; }
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,229,255,0.1); border-radius: 10px; }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}} />

      {/* NOTIFICACIONES */}
      <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[9999] transition-all duration-500 transform ${toast.show ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className={`bg-[#0B1221]/95 backdrop-blur-xl border px-6 py-3 rounded-full shadow-2xl font-bold text-[13px] flex items-center gap-3 tracking-widest uppercase ${toast.type === 'success' ? 'border-emerald-500/50 text-emerald-400' : toast.type === 'warning' ? 'border-amber-500/50 text-amber-400' : 'border-rose-500/50 text-rose-500'}`}>
          {toast.type === 'error' ? <AlertTriangle size={16}/> : toast.type === 'warning' ? <ShieldAlert size={16}/> : <Zap size={16} />} 
          {toast.msg}
        </div>
      </div>

      {/* BANNER DE ALERTA ERP */}
      {erpAlert && (
        <div className="fixed top-0 left-0 right-0 z-[10000] bg-[#130505] border-b border-rose-500/50 shadow-[0_4px_20px_rgba(244,63,94,0.3)]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <AlertTriangle size={24} className="text-rose-500 shrink-0 mt-0.5 animate-pulse" />
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">ALERTA ERP: STOCK CRÍTICO</span>
                <p className="text-[13px] text-white font-medium leading-relaxed">
                  {erpAlert.mensaje || `SKU ${alertSku}: Stock bajo (${alertQty} unidades). Se requiere acción inmediata.`}
                </p>
                <div className="flex items-center gap-4 mt-1 text-[11px] text-slate-400">
                  <span>SKU: <span className="font-mono text-white">{alertSku}</span></span>
                  <span>Cantidad: <span className="font-bold text-white">{alertQty}</span></span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setErpAlert(null)}
                className="text-slate-400 hover:text-white transition-colors p-2"
              >
                <X size={18} />
              </button>
              <button
                onClick={handleErpAutoExecute}
                className="bg-rose-600 hover:bg-rose-500 text-white font-black tracking-widest text-[11px] px-6 py-3 rounded-xl transition-all uppercase flex items-center gap-2 shadow-[0_0_20px_rgba(244,63,94,0.4)]"
              >
                <Zap size={16} />
                EJECUTAR DICTAMEN AUTOMÁTICO
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-[#00E5FF] opacity-[0.02] blur-[150px] rounded-full pointer-events-none z-0"></div>

      {/* PANEL LATERAL */}
      <Sidebar
        objetivo={objetivo}
        setObjetivo={setObjetivo}
        gobernanza={gobernanza}
        setGobernanza={setGobernanza}
        status={status}
        handleSearch={handleSearch}
        onFetchHistory={fetchHistory}
      />

      {/* ÁREA CENTRAL */}
      <main className={`flex-1 flex flex-col h-full overflow-hidden bg-[#000000] relative ${erpAlert ? 'pt-[76px]' : ''}`}>
        
        <header className="h-[70px] px-8 flex items-center justify-between z-10 shrink-0 border-b border-white/5 relative z-40 bg-[#000000]">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-[#10B981] tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981] animate-pulse"></span> GLOBAL NETWORK: SECURE
            </div>
            <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1.5"><Clock size={12}/> {new Date().toLocaleTimeString()}</div>
          </div>
          <div className="flex items-center gap-4">
             <span className="hidden md:flex items-center gap-1.5 text-[9px] font-black text-slate-400 border border-white/10 px-3 py-1.5 rounded-md uppercase tracking-widest"><ShieldCheck size={12}/> Validable por Legal & ESG</span>
             <div className="pl-4 border-l border-white/10">
               {isLoaded && user && <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "w-7 h-7" } }}/>}
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-8 pb-16 pt-8 w-full custom-scrollbar relative z-10">
          
          {status === 'idle' && (
            <div className="max-w-[700px] mx-auto flex flex-col items-center justify-center h-full animate-fade-in text-center opacity-40 pointer-events-none">
              <Target size={64} className="text-cyan-900 mb-6"/>
              <h2 className="text-[24px] font-black text-white tracking-widest uppercase mb-2">Motor Táctico en Espera</h2>
              <p className="text-[14px]">Define tu objetivo B2B en el panel lateral para iniciar el análisis.</p>
            </div>
          )}

          {status === 'loading' && !currentData && (
            <div className="flex flex-col items-center justify-center h-full animate-fade-in">
              <div className="w-16 h-16 rounded-full border-2 border-white/10 border-t-[#00E5FF] animate-spin mb-6"></div>
              <h3 className="text-[16px] font-black text-[#00E5FF] tracking-widest uppercase mb-3 animate-pulse">Estableciendo conexión segura...</h3>
            </div>
          )}

          {status === 'error' && (
            <div className="max-w-[700px] mx-auto animate-fade-in pt-10">
              <div className="ade-card-red p-8 flex flex-col items-center text-center">
                 <AlertTriangle className="text-rose-500 mb-6 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]" size={64}/>
                 <h3 className="text-[24px] font-black text-white tracking-widest uppercase mb-4">Error de Comunicación</h3>
                 <div className="bg-[#030508] border border-rose-900/30 p-6 rounded-xl w-full text-left">
                   <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-2 flex items-center gap-2"><Terminal size={12}/> Registro Técnico:</span>
                   <p className="text-rose-300/80 text-[12px] font-mono whitespace-pre-wrap leading-relaxed">{apiError}</p>
                 </div>
                 <button onClick={() => setStatus('idle')} className="mt-8 border border-white/20 text-white hover:bg-white/5 px-8 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors">
                   Reintentar
                 </button>
              </div>
            </div>
          )}

          {(status === 'success' || (status === 'loading' && currentData)) && (
            <div className="animate-fade-in flex flex-col w-full max-w-[1200px] mx-auto gap-6 pb-12">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-2">
                 <div className="flex-1">
                   <span className="text-[#00E5FF] text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mb-2"><Activity size={14}/> DECISIÓN DE NEGOCIO EN CURSO</span>
                   <h2 className="text-[22px] md:text-[28px] font-medium text-white tracking-tight leading-tight max-w-4xl">
                     {d.titulo_decision || "Procesando dictamen..."}
                   </h2>
                 </div>
                 <div className="flex flex-col items-end gap-3 shrink-0">
                    <div className="flex items-center gap-3">
                       <button className="text-slate-400 hover:text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-colors border border-white/5 rounded-lg"><Bell size={12}/> Crear Alerta</button>
                       <button className="text-slate-400 hover:text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-colors border border-white/5 rounded-lg"><Share2 size={12}/> Compartir Equipo</button>
                       <button className="bg-[#00E5FF] text-[#050505] px-6 py-2.5 rounded font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:opacity-90 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                         <Download size={14}/> EXPORTAR INFORME
                       </button>
                    </div>
                    <div className="bg-[#0D0A25]/50 border border-indigo-500/30 px-5 py-3 rounded-xl max-w-[400px] mt-2 w-full">
                       <p className="text-[10px] text-indigo-300 font-mono uppercase leading-relaxed"><span className="opacity-50">CATEGORÍA / SECTOR:</span> {d.categoria_sector || "..."}</p>
                    </div>
                 </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-6">
                 <ExecutionEngine
                   dictamen={dictamen}
                   bookingStatus={bookingStatus}
                   bookingResult={bookingResult}
                   onExecuteTacticalPlan={executeTacticalPlan}
                   onResetBookingStatus={() => setBookingStatus('idle')}
                 />

                 <div className="ade-card-red lg:w-[320px] p-8 flex flex-col justify-center items-start text-left relative overflow-hidden shrink-0">
                   <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-rose-500 opacity-[0.05] blur-[80px] rounded-full pointer-events-none"></div>
                   <div className="flex items-center gap-2 mb-4 relative z-10">
                     <Activity size={14} className="text-rose-500 animate-pulse"/>
                     <span className="text-[10px] font-black text-rose-500 tracking-widest uppercase">COSTE ESTIMADO DE INACCIÓN</span>
                   </div>
                   <h3 className="text-[44px] font-black text-white tracking-tighter leading-none relative z-10 drop-shadow-[0_0_10px_rgba(244,63,94,0.3)]">
                     {dictamen.coste_inaccion?.split(' ')[0] || "..."}
                   </h3>
                   <span className="text-[14px] text-slate-400 font-bold relative z-10 mt-1">{dictamen.coste_inaccion?.split(' ').slice(1).join(' ')}</span>
                 </div>
              </div>

              {alertas.length > 0 && (
                <div className="ade-card-red p-6 relative bg-[#0A0A0A]">
                   <div className="flex items-center gap-2 mb-6">
                     <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_#F43F5E]"></span>
                     <span className="text-[10px] font-black text-rose-500 tracking-widest uppercase">THREAT RADAR: ALERTAS ACTIVAS</span>
                   </div>
                   <div className="flex flex-col gap-4">
                     {alertas.map((alerta: any, i: number) => {
                       const isCritical = alerta.nivel?.toUpperCase().includes("CRÍTIC");
                       return (
                         <div key={i} className={`border ${isCritical ? 'border-rose-500/30' : 'border-amber-500/30'} bg-[#050505] p-4 rounded-xl flex flex-col md:flex-row md:items-center gap-4 md:gap-6 shadow-sm`}>
                           <div className={`w-40 shrink-0 flex flex-col gap-1 border-b md:border-b-0 md:border-r border-white/5 pb-2 md:pb-0 pr-4`}>
                             <div className={`flex items-center gap-2 ${isCritical ? 'text-rose-500' : 'text-amber-500'}`}>
                               <AlertTriangle size={14}/>
                               <span className="text-[11px] font-black uppercase tracking-widest">{alerta.nivel}</span>
                             </div>
                             <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest ml-6">{alerta.tipo}</span>
                           </div>
                           <p className="text-[12px] text-slate-300 font-medium leading-relaxed">{alerta.texto}</p>
                         </div>
                       );
                     })}
                   </div>
                </div>
              )}

              <div className="ade-card-blue p-8 flex flex-col relative overflow-hidden bg-[#0A0A0A]">
                 <div className="flex items-center gap-2 mb-8 relative z-10">
                   <Target size={14} className="text-[#00E5FF]"/>
                   <span className="text-[10px] font-black text-[#00E5FF] tracking-widest uppercase">ANÁLISIS DE VALOR ESTRATÉGICO</span>
                 </div>

                 <div className="flex flex-col md:flex-row gap-10 mb-8 relative z-10 border-b border-[#00E5FF]/20 pb-8">
                    <div className="flex-1">
                       <span className="text-[8px] font-bold text-slate-500 tracking-widest uppercase mb-1 flex items-center gap-1.5"><Layers size={10}/> COSTE BASE / INVERSIÓN</span>
                       <p className="text-[24px] font-black text-white leading-tight">{valor.coste_base || "..."}</p>
                    </div>
                    <div className="w-[1px] bg-white/10 hidden md:block"></div>
                    <div className="flex-1">
                       <span className="text-[8px] font-bold text-slate-500 tracking-widest uppercase mb-1 flex items-center gap-1.5"><Activity size={10}/> COSTES OPERATIVOS</span>
                       <p className="text-[24px] font-black text-white leading-tight">{valor.costes_operativos || "..."}</p>
                    </div>
                    <div className="w-[1px] bg-[#00E5FF]/20 hidden md:block"></div>
                    <div className="w-48 shrink-0">
                       <span className="text-[8px] font-black text-[#00E5FF] tracking-widest uppercase mb-1 block">MARGEN OCULTO / ROI</span>
                       <p className="text-[32px] font-black text-[#00E5FF] leading-none drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">{valor.margen_oculto || "..."}</p>
                    </div>
                 </div>

                 <div className="bg-[#050E13] border border-[#00E5FF]/20 rounded-xl p-5 flex items-start gap-4 relative z-10">
                   <div className="text-[#00E5FF] mt-0.5"><Zap size={16}/></div>
                   <div>
                     <span className="text-[9px] font-black text-[#00E5FF] uppercase tracking-widest block mb-1">VECTOR TÁCTICO</span>
                     <p className="text-[13px] text-slate-300 font-medium italic leading-relaxed">"{valor.vector_tactico || "..."}"</p>
                   </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="ade-card p-8 bg-[#0A0A0A]">
                   <div className="flex justify-between items-end mb-8">
                     <div className="flex items-center gap-2">
                       <LineChart size={14} className="text-[#8B5CF6]"/>
                       <span className="text-[10px] font-black text-[#8B5CF6] tracking-widest uppercase">SIMULADOR PREDICTIVO</span>
                     </div>
                     <span className="text-[10px] font-bold text-[#8B5CF6] uppercase tracking-widest bg-[#8B5CF6]/10 px-3 py-1 rounded">
                       {simulador.confianza_estadistica || "..."} CONFIANZA
                     </span>
                   </div>
                   <div className="grid grid-cols-1 gap-4">
                     <div className="ade-card border-[#10B981]/30 bg-[#05130D] p-4 flex flex-col">
                       <span className="text-[8px] text-slate-500 uppercase tracking-widest mb-1">BEST-CASE</span>
                       <p className="text-[12px] text-[#10B981] font-bold">{simulador.optimista || "..."}</p>
                     </div>
                     <div className="ade-card border-[#00E5FF]/40 bg-[#050E13] p-4 flex flex-col">
                       <span className="text-[8px] text-slate-500 uppercase tracking-widest mb-1">MOST-LIKELY</span>
                       <p className="text-[14px] text-white font-black">{simulador.base || "..."}</p>
                     </div>
                     <div className="ade-card border-rose-500/30 bg-[#130505] p-4 flex flex-col">
                       <span className="text-[8px] text-slate-500 uppercase tracking-widest mb-1">WORST-CASE</span>
                       <p className="text-[12px] text-rose-500 font-bold">{simulador.estres || "..."}</p>
                     </div>
                   </div>
                 </div>

                 <div className="flex flex-col gap-4">
                   <span className="text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2 pl-2"><Building2 size={14} className="text-[#00E5FF]"/> DIRECTORIO DE ENTIDADES</span>
                   <div className="flex flex-col gap-4">
                     {proveedores.map((ent: any, i: number) => (
                       <div key={i} className={`ade-card p-5 bg-[#0A0A0A] ${ent.etiqueta === 'GANADOR' ? "border-[#10B981]/40" : "border-white/5"}`}>
                         <div className="flex justify-between items-start mb-3">
                           <h3 className="text-[14px] font-black text-white">{ent.nombre}</h3>
                           {ent.etiqueta && <span className="bg-[#10B981] text-[#0A0A0A] text-[7px] font-black px-2 py-1 rounded tracking-widest uppercase">{ent.etiqueta}</span>}
                         </div>
                         <div className="flex items-center justify-between mt-4">
                           <span className="bg-[#00E5FF]/10 text-[#00E5FF] text-[8px] font-black px-2 py-1 rounded flex items-center gap-1 uppercase"><ShieldCheck size={10}/> SCORE: {ent.trust_score}</span>
                           <span className={`text-[8px] font-black uppercase ${ent.riesgo_insolvencia === 'BAJO' ? 'text-[#10B981]' : 'text-rose-500'}`}>RIESGO: {ent.riesgo_insolvencia}</span>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
              </div>

            </div>
          )}
        </div>

        <HistoryDrawer
          isOpen={isHistoryOpen}
          historyData={historyData}
          onClose={() => setIsHistoryOpen(false)}
          onLoadPastDictamen={loadPastDictamen}
        />

      </main>
    </div>
  );
}