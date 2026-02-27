"use client";

import Link from "next/link";
import { SignInButton, useUser } from "@clerk/nextjs";
import { 
  ArrowRight, Activity, Zap, CheckCircle2, ShieldCheck, 
  Map, Database, Layers, Lock, Star, Rocket, Sparkles, 
  Bell, Globe, TrendingUp, Scale, FileText, Mail, Phone, 
  BarChart3, Linkedin, Twitter, Building2, ChevronDown, ShieldAlert
} from "lucide-react";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const { isSignedIn } = useUser();
  const [mounted, setMounted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  
  // 🔥 Sistema de Notificaciones Premium (Toasts)
  const [toast, setToast] = useState({ show: false, msg: "" });

  useEffect(() => {
    setMounted(true);
  }, []);

  const showToast = (msg: string) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 4000);
  };

  // 🔥 Sistema de Scroll Suave Milimétrico
  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // 🔥 Motor Interactivo para Botones Secundarios
  const handleAction = (e: React.MouseEvent, action: string) => {
    e.preventDefault();
    showToast(`⚡ Procesando: ${action}`);
  };

  // 🔥 Motor del Formulario de Captación B2B
  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showToast("✅ Solicitud enviada. Un ingeniero de datos te contactará en menos de 24 horas.");
    (e.target as HTMLFormElement).reset();
  };

  if (!mounted) return null;

  const faqs = [
    { q: "¿De dónde extrae los datos el motor OSINT de ADE OS?", a: "Nuestros agentes de IA auditan en tiempo real más de 2.500 bases de datos gubernamentales, registros de aduanas, listas de sanciones financieras y directorios de proveedores B2B verificados a nivel global." },
    { q: "¿Qué diferencia hay entre el Plan Free y el Enterprise?", a: "El Plan Free te permite probar la capacidad de comprensión del motor IA con consultas estructuradas. El Plan Enterprise desbloquea el tablero visual interactivo, simulaciones Monte Carlo, alertas geopolíticas en vivo y exportación de informes PDF para tu Junta Directiva." },
    { q: "¿Puedo analizar el Scope 3 para cumplir con normativas ESG?", a: "Sí. Nuestra plataforma está entrenada con los estándares SFDR y CBAM de la Unión Europea. Calcula estimaciones de huella de carbono en tu cadena de suministro y te avisa de posibles penalizaciones arancelarias." },
    { q: "¿Qué tan seguro es ingresar datos estratégicos de mi empresa?", a: "ADE OS opera bajo arquitectura Zero-Data-Retention para cuentas Enterprise. Tus prompts estratégicos y matrices de proveedores no se utilizan para entrenar modelos públicos y están encriptados end-to-end." }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans overflow-x-hidden relative selection:bg-blue-600/30 selection:text-white">
      
      {/* 🚀 TOAST NOTIFICATION (Notificaciones Premium Flotantes) */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] transition-all duration-500 transform ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className="bg-[#020617]/95 backdrop-blur-xl border border-white/10 text-white px-6 py-3.5 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.4)] font-bold text-[13px] flex items-center gap-3">
          <Sparkles size={16} className="text-blue-400" />
          {toast.msg}
        </div>
      </div>

      {/* 🚀 MOTOR CSS: TEXTURAS, ANIMACIONES FLOTANTES Y CRISTAL */}
      <style dangerouslySetInnerHTML={{__html: `
        html { scroll-behavior: smooth; }
        .bg-hero-stripes {
          background-color: #020617;
          background-image: 
            radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.25) 0%, transparent 60%),
            repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(255, 255, 255, 0.02) 80px, rgba(255, 255, 255, 0.02) 81px);
        }
        @keyframes float-1 { 0%, 100% { transform: translateY(0px) rotate(-12deg); } 50% { transform: translateY(-15px) rotate(-10deg); } }
        @keyframes float-2 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes float-3 { 0%, 100% { transform: translateY(0px) rotate(15deg); } 50% { transform: translateY(-20px) rotate(12deg); } }
        .anim-float-1 { animation: float-1 6s ease-in-out infinite; }
        .anim-float-2 { animation: float-2 5s ease-in-out infinite; }
        .anim-float-3 { animation: float-3 7s ease-in-out infinite; }
        .glass-blue-card {
          background: rgba(30, 58, 138, 0.4); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15); box-shadow: 0 30px 60px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.05);
        }
        .input-b2b {
          background: #ffffff; border: 1px solid #E2E8F0; border-radius: 12px;
          padding: 14px 20px; font-size: 13px; font-weight: 600; color: #020617; width: 100%; outline: none; transition: all 0.3s ease;
        }
        .input-b2b:focus { border-color: #2563EB; box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1); }
      `}} />

      {/* ==================== 1. HERO SECTION (DARK MODE) ==================== */}
      <section id="inicio" className="relative w-full pb-32 pt-6 bg-hero-stripes overflow-hidden z-10 scroll-mt-40">
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[40vw] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>

        {/* --- NAVBAR STICKY --- */}
        <nav className="fixed top-0 inset-x-0 z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 transition-all">
          <div className="max-w-[1300px] mx-auto px-6 h-20 flex items-center justify-between">
            <a href="#inicio" onClick={(e) => scrollTo(e, 'inicio')} className="flex items-center gap-2 cursor-pointer group outline-none">
              <Zap className="text-white fill-white group-hover:scale-110 transition-transform" size={24} />
              <span className="font-extrabold text-[22px] tracking-tight text-white">ADE OS<span className="text-blue-500">.PRO</span></span>
            </a>
            
            <div className="hidden lg:flex items-center gap-10 text-[12px] font-bold text-slate-300 uppercase tracking-widest">
              <a href="#features" onClick={(e) => scrollTo(e, 'features')} className="hover:text-blue-400 transition-colors outline-none">Motor OSINT</a>
              <a href="#how-it-works" onClick={(e) => scrollTo(e, 'how-it-works')} className="hover:text-blue-400 transition-colors outline-none">Metodología</a>
              <a href="#pricing" onClick={(e) => scrollTo(e, 'pricing')} className="hover:text-blue-400 transition-colors outline-none">Planes</a>
              <a href="#contact" onClick={(e) => scrollTo(e, 'contact')} className="hover:text-blue-400 transition-colors outline-none">Contacto</a>
            </div>

            <div className="flex items-center gap-6">
              {!isSignedIn ? (
                <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
                  <button className="bg-blue-600 hover:bg-blue-500 text-white px-7 py-2.5 rounded-full text-[12px] uppercase tracking-widest font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-95 cursor-pointer">
                    Acceder
                  </button>
                </SignInButton>
              ) : (
                <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-500 text-white px-7 py-2.5 rounded-full text-[12px] uppercase tracking-widest font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-95 cursor-pointer">
                  Dashboard
                </Link>
              )}
            </div>
          </div>
        </nav>

        {/* --- TEXTO HERO PRINCIPAL --- */}
        <div className="relative z-40 max-w-5xl mx-auto px-6 text-center mt-24">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold text-slate-300 mb-8 backdrop-blur-md uppercase tracking-widest cursor-pointer hover:bg-white/10 transition-colors" onClick={(e) => handleAction(e, 'Mostrando notas de la versión v2.0')}>
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> Decision Intelligence B2B <span className="text-blue-400">v2.0</span>
          </div>
          
          <h1 className="text-[3.2rem] md:text-[5rem] lg:text-[6.5rem] font-black text-white leading-[1.05] tracking-tight mb-6 relative inline-block">
            Decisiones de Millones <br />
            En <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">48 Segundos</span> ⚙️
            
            <div className="absolute -left-16 top-0 opacity-40 hidden md:block">
               <svg width="60" height="40" viewBox="0 0 80 40"><path d="M0,40 Q40,0 80,10" fill="none" stroke="white" strokeWidth="2" strokeDasharray="5 5" /><circle cx="80" cy="10" r="4" fill="white"/></svg>
            </div>
            <div className="absolute -right-20 -top-8 text-5xl text-blue-500 hidden md:block anim-float-2">
               <Rocket size={56} className="rotate-45" fill="currentColor"/>
            </div>
          </h1>
          
          <p className="text-slate-400 text-[16px] md:text-[18px] max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            Reemplaza semanas de consultoría estratégica. Analiza cadenas de suministro, evalúa el riesgo geopolítico y calcula la Matriz TCO con inteligencia artificial.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            {!isSignedIn ? (
              <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
                <button className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full text-[15px] font-bold transition-all shadow-[0_10px_30px_rgba(37,99,235,0.5)] group active:scale-95 cursor-pointer">
                  Auditar Mercado OSINT <div className="w-6 h-6 bg-white text-blue-600 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform"><ArrowRight size={14} strokeWidth={3}/></div>
                </button>
              </SignInButton>
            ) : (
              <Link href="/dashboard" className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full text-[15px] font-bold transition-all shadow-[0_10px_30px_rgba(37,99,235,0.5)] group active:scale-95 cursor-pointer">
                Abrir Espacio de Trabajo <div className="w-6 h-6 bg-white text-blue-600 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform"><ArrowRight size={14} strokeWidth={3}/></div>
              </Link>
            )}
            <a href="#features" onClick={(e) => scrollTo(e, 'features')} className="flex items-center justify-center gap-3 bg-transparent border border-white/20 hover:bg-white/5 text-white px-8 py-4 rounded-full text-[15px] font-bold transition-all active:scale-95 cursor-pointer">
              Ver Arquitectura IA
            </a>
          </div>
        </div>

        {/* ==================== EL "CLUSTER" 3D FLOTANTE (ESTÉTICA LLENA B2B) ==================== */}
        <div className="relative z-30 max-w-[1100px] mx-auto h-[550px] mt-10 hidden md:block perspective-1000">
          
          {/* Etiquetas Periféricas */}
          <div onClick={(e) => handleAction(e, 'Filtrando fuentes: TARIC & ADUANAS')} className="absolute top-[35%] left-[2%] bg-white/90 backdrop-blur-md text-[#020617] font-black text-[10px] px-6 py-2.5 rounded-full rotate-[-12deg] shadow-xl anim-float-1 z-40 tracking-widest border border-white cursor-pointer hover:bg-blue-50 transition-colors">TARIC & ADUANAS</div>
          <div onClick={(e) => handleAction(e, 'Filtrando fuentes: SUPPLY CHAIN')} className="absolute top-[65%] left-[8%] bg-white/90 backdrop-blur-md text-[#020617] font-black text-[10px] px-6 py-2.5 rounded-full rotate-[5deg] shadow-xl anim-float-2 z-40 tracking-widest border border-white cursor-pointer hover:bg-blue-50 transition-colors">SUPPLY CHAIN</div>
          <div onClick={(e) => handleAction(e, 'Filtrando fuentes: ESG SCOPE 3')} className="absolute top-[45%] right-[2%] bg-white/90 backdrop-blur-md text-[#020617] font-black text-[10px] px-6 py-2.5 rounded-full rotate-[15deg] shadow-xl anim-float-3 z-40 tracking-widest border border-white cursor-pointer hover:bg-blue-50 transition-colors">ESG SCOPE 3</div>
          
          {/* Avatar Testimonio Flotante */}
          <div className="absolute top-[-5%] right-[10%] bg-white/10 backdrop-blur-xl border border-white/20 p-2 pr-5 rounded-full shadow-2xl flex items-center gap-3 anim-float-2 z-50 cursor-pointer hover:bg-white/20 transition-colors" onClick={() => showToast("Caso de Éxito: 'Redujimos el riesgo logístico un 80% en Asia gracias al OSINT'.")}>
            <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-blue-500">
               <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Jannat&backgroundColor=transparent" alt="User" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black text-[12px] leading-tight">@cpo_anna</span>
              <span className="text-blue-200 text-[9px] font-bold uppercase tracking-wider">Chief Procurement Officer</span>
            </div>
          </div>

          {/* 🟦 TARJETA IZQUIERDA (ROI & TCO) */}
          <div className="absolute top-[12%] left-[6%] w-[280px] bg-white rounded-[2rem] p-6 shadow-[0_30px_60px_rgba(0,0,0,0.5)] anim-float-2 z-20 border border-slate-100 cursor-pointer hover:scale-105 transition-transform" onClick={(e) => handleAction(e, 'Abriendo desglose financiero de TCO y Aranceles detectados.')}>
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-[#020617] font-black text-[15px]">Capital Preservado</h4>
              <ShieldCheck className="text-emerald-500" size={20} />
            </div>
            <p className="text-slate-400 text-[10px] font-bold mb-4 uppercase tracking-widest">Auditoría: Asia vs LATAM</p>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[36px] font-black text-[#020617] leading-none">€1.4M</span>
              <span className="bg-emerald-100 text-emerald-700 text-[9px] font-black px-2 py-1 rounded-md flex items-center gap-1 uppercase tracking-wider shadow-sm"><CheckCircle2 size={10} strokeWidth={3}/> Validado</span>
            </div>
            <p className="text-slate-400 text-[10px] font-bold border-b border-slate-100 pb-4 mb-4">Eficiencia TCO Identificada</p>
            
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"><TrendingUp size={14}/></div>
                 <div>
                   <p className="text-[11px] font-black text-[#020617] leading-tight">Acción Sugerida</p>
                   <p className="text-[9px] text-slate-500 font-bold leading-tight">Mitigar Arancel (-18%)</p>
                 </div>
              </div>
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 text-slate-400"><ArrowRight size={12}/></div>
            </div>
          </div>

          {/* 🟦 TARJETA CENTRAL (La App OSINT) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[340px] h-[530px] bg-white rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.6)] anim-float-2 z-30 p-2 border-[6px] border-white/5 bg-clip-padding flex flex-col cursor-pointer hover:-translate-y-2 transition-transform" onClick={(e) => handleAction(e, 'Escaneando 2.500 bases de datos aduaneras e insolvencias...')}>
             <div className="bg-[#F8FAFC] rounded-[2rem] h-full pt-8 flex flex-col items-center relative overflow-hidden border border-slate-100">
                <div className="px-5 py-1.5 bg-white border border-slate-200 rounded-full text-[9px] font-black tracking-widest uppercase text-blue-600 mb-6 shadow-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div> ADE Motor OSINT
                </div>
                
                <h2 className="text-[#020617] font-black text-[22px] text-center leading-[1.1] mb-8">
                  Cruzando <span className="text-blue-600">2.500+</span><br/><span className="text-slate-500">Fuentes en Tiempo Real</span>
                </h2>

                <div className="flex items-center gap-4 mb-8 bg-white p-4 rounded-2xl w-[85%] shadow-sm border border-slate-100 hover:border-blue-200 transition-colors">
                  <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                     <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15.9155" stroke="#F1F5F9" strokeWidth="4" fill="none" />
                        <circle cx="18" cy="18" r="15.9155" stroke="#2563EB" strokeWidth="4" fill="none" strokeDasharray="88, 100" strokeLinecap="round" className="animate-[pulse_2s_ease-in-out_infinite]" />
                     </svg>
                     <span className="absolute text-[#020617] text-[13px] font-black">88%</span>
                  </div>
                  <p className="text-slate-500 text-[10px] font-bold leading-relaxed">
                    Evaluando riesgo geopolítico para proveedores en Asia Oriental. 🚢
                  </p>
                </div>

                <div className="w-[85%] flex-1 rounded-t-2xl relative overflow-hidden mt-auto border-t border-l border-r border-slate-200 shadow-inner bg-slate-800">
                   <img src="https://images.unsplash.com/photo-1586528116311-ad8ed7c80a30?q=80&w=600" alt="Supply Chain" className="w-full h-full object-cover mix-blend-overlay opacity-50" />
                   <div className="absolute bottom-0 inset-x-0 h-24 bg-white/60 backdrop-blur-md"></div>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-xl rounded-full p-2 pr-4 shadow-xl border border-white flex items-center gap-3 z-40 w-max">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center"><CheckCircle2 size={16}/></div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[#020617] font-black text-[10px] leading-tight mb-0.5">Trust Score: AAA</span>
                    <span className="text-slate-500 text-[8px] font-bold leading-tight">Proveedor validado (Enterprise)</span>
                  </div>
                </div>
             </div>
          </div>

          {/* 🟦 TARJETA DERECHA (Alerta/Veredicto) */}
          <div className="absolute top-[18%] right-[8%] w-[270px] glass-blue-card rounded-[2rem] p-7 shadow-2xl anim-float-1 z-20 cursor-pointer hover:border-blue-400 transition-colors" onClick={(e) => handleAction(e, 'Mostrando alternativas logísticas hacia Europa del Este.')}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-[10px] font-bold text-rose-200 mb-6 backdrop-blur-md uppercase tracking-widest">
              <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div> Riesgo Operativo
            </div>
            <p className="text-blue-200 text-[10px] font-bold mb-1">Impacto Aduanero</p>
            <h3 className="text-white font-black text-[22px] leading-tight mb-2">CBAM TARIC</h3>
            <div className="text-[28px] font-black text-rose-400 mb-3 tracking-tight">+18% Arancel</div>
            <p className="text-blue-200 text-[10px] font-medium border-t border-white/10 pt-4 mt-4 border-dashed">
              Recomendación: Deslocalizar producción hacia Europa del Este.
            </p>
            
            <div className="mt-8 w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.4)]">
              <ArrowRight size={16}/>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TRANSICIÓN OLA BLANCA ==================== */}
      <div className="relative w-full z-20 -mt-16 md:-mt-32 pointer-events-none">
        <svg viewBox="0 0 1440 200" className="w-full h-[80px] md:h-[200px] fill-[#F8FAFC]" preserveAspectRatio="none">
           <path d="M0,200 L1440,200 L1440,100 Q720,0 0,100 Z" />
        </svg>
      </div>

      {/* ==================== 2. TRUSTED BY LOGOS ==================== */}
      <section className="bg-[#F8FAFC] pb-10 pt-0 relative z-10 px-6">
        <div className="max-w-[1200px] mx-auto text-center border-b border-slate-200 pb-12">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-8">Estrategia validada por líderes de la industria</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 grayscale opacity-60 transition-all hover:grayscale-0 hover:opacity-100">
            <span className="text-xl font-black text-[#020617] tracking-tighter">STELLANTIS</span>
            <span className="text-xl font-black text-[#020617] font-serif">VERDALIA</span>
            <span className="text-xl font-black text-[#020617] tracking-widest">BASQUEVOLT</span>
            <span className="text-xl font-bold text-[#020617] tracking-tight flex items-center gap-1"><Globe size={20}/> LOGISTICS</span>
          </div>
        </div>
      </section>

      {/* ==================== 3. HOW IT WORKS (ARQUITECTURA) ==================== */}
      <section id="how-it-works" className="bg-[#F8FAFC] py-20 px-6 relative z-10 scroll-mt-20">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[#020617] text-[2.2rem] md:text-[3.5rem] font-black mb-4 leading-tight tracking-tight">Arquitectura Analítica en 3 Pasos</h2>
            <p className="text-slate-500 font-medium text-[16px]">De la duda estratégica a la decisión ejecutiva en menos de 1 minuto.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-1 bg-slate-100 rounded-full border-t border-slate-200"></div>
            
            <div className="relative flex flex-col items-center text-center z-10 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-blue-50 border-4 border-white rounded-full flex items-center justify-center text-blue-600 font-black text-xl mb-6 shadow-sm">1</div>
              <h3 className="font-black text-[#020617] text-lg mb-3">Prompt Estratégico</h3>
              <p className="text-slate-500 text-[13px] leading-relaxed">Escribe tu problema de negocio en lenguaje natural. El agente disecciona tus requerimientos automáticamente.</p>
            </div>
            
            <div className="relative flex flex-col items-center text-center z-10 bg-white p-8 rounded-[2rem] shadow-[0_20px_40px_rgba(37,99,235,0.06)] border border-blue-100 hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-blue-600 border-4 border-white rounded-full flex items-center justify-center text-white font-black text-xl mb-6 shadow-md shadow-blue-600/30">2</div>
              <h3 className="font-black text-[#020617] text-lg mb-3">Extracción OSINT</h3>
              <p className="text-slate-500 text-[13px] leading-relaxed">La IA cruza bases de datos de Eurostat, aduanas, sanciones e insolvencias corporativas en tiempo real.</p>
            </div>
            
            <div className="relative flex flex-col items-center text-center z-10 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-indigo-50 border-4 border-white rounded-full flex items-center justify-center text-indigo-600 font-black text-xl mb-6 shadow-sm">3</div>
              <h3 className="font-black text-[#020617] text-lg mb-3">Tablero Ejecutivo</h3>
              <p className="text-slate-500 text-[13px] leading-relaxed">Recibe un panel interactivo con el dictamen final, la Matriz TCO y un PDF exportable para el Consejo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 4. FEATURES (BENTO GRID BLANCO B2B) ==================== */}
      <section id="features" className="bg-[#F8FAFC] pb-32 pt-6 px-6 relative z-10 scroll-mt-20">
        <div className="max-w-[1200px] mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16 relative">
            <h2 className="text-[2.2rem] md:text-[3.5rem] font-black text-[#020617] leading-[1.1] tracking-tight mb-6">
              El Cerebro Analítico de<br/>Tu Cadena de Suministro.
            </h2>
            <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium leading-relaxed">
              Ejecuta simulaciones financieras, cruza datos aduaneros y blinda tus operaciones con agentes de Inteligencia Artificial especializados en B2B.
            </p>

            <div className="absolute top-[70%] -left-4 bg-white border border-slate-100 p-2 pr-5 rounded-full shadow-xl hidden xl:flex items-center gap-3 animate-float-fast z-10 cursor-pointer hover:scale-105 transition-transform" onClick={(e) => handleAction(e, 'Verificando certificación Zero-Trust y SOC2')}>
              <div className="w-10 h-10 rounded-full bg-emerald-100 overflow-hidden border border-emerald-200 flex items-center justify-center text-emerald-600"><Lock size={20}/></div>
              <div className="text-left">
                <p className="text-[#020617] text-[12px] font-black leading-none mb-1">CERO ALUCINACIONES</p>
                <p className="text-slate-500 text-[9px] font-bold uppercase tracking-wider">Privacidad Enterprise</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            
            {/* Tarjeta Activa (Azul) */}
            <div className="bg-blue-600 rounded-[2rem] p-8 text-white shadow-[0_20px_40px_rgba(37,99,235,0.3)] flex flex-col hover:-translate-y-2 transition-transform cursor-pointer relative group" onClick={(e) => handleAction(e, 'Módulo: OSINT Radar Geopolítico en vivo')}>
               <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-8 border border-white/20 backdrop-blur-sm">
                 <ShieldAlert size={24}/>
               </div>
               <h3 className="text-[19px] font-black mb-3 leading-tight">Threat Radar<br/>Geopolítico</h3>
               <p className="text-blue-100 text-[13px] font-medium mb-8 flex-1 leading-relaxed">
                 Monitorización 24/7 de rutas logísticas, huelgas portuarias y bloqueos arancelarios antes de firmar.
               </p>
               <div className="flex items-center gap-2 text-[13px] font-bold group-hover:gap-4 transition-all">
                 Descubrir Módulo <ArrowRight size={14}/>
               </div>
            </div>

            {/* 7 Tarjetas Blancas Funcionales */}
            {[
              { icon: Map, color: "text-indigo-600", bg: "bg-indigo-50", title: "Sourcing\nGlobal", desc: "Mapea y audita proveedores en 45 países cruzando bases de datos reales y actualizadas." },
              { icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-50", title: "Simulador\nMonte Carlo", desc: "Evalúa escenarios Best, Base y Worst Case proyectando la TIR y la exposición al riesgo." },
              { icon: CheckCircle2, color: "text-teal-500", bg: "bg-teal-50", title: "Compliance\nESG & Scope 3", desc: "Calcula automáticamente emisiones de carbono y adáptate a la normativa europea CBAM." },
              { icon: Layers, color: "text-orange-500", bg: "bg-orange-50", title: "Matriz TCO\nComparativa", desc: "Desglosa el Coste Total de Propiedad oculto entre la opción A y B en tiempo real." },
              { icon: Scale, color: "text-amber-500", bg: "bg-amber-50", title: "Análisis\nArancelario", desc: "El algoritmo inyecta códigos TARIC para evitar retenciones de aduanas y sobrecostes." },
              { icon: Building2, color: "text-rose-500", bg: "bg-rose-50", title: "Due Diligence\nFinanciera", desc: "Verificación instantánea de salud financiera e historial de insolvencias de partners." },
              { icon: FileText, color: "text-slate-700", bg: "bg-slate-100", title: "Exportación\nBoard-Ready", desc: "Genera PDFs ejecutivos inmaculados para el Consejo de Administración en 1 clic." }
            ].map((item, i) => (
              <div key={i} onClick={(e) => handleAction(e, `Abriendo Módulo: ${item.title.replace('\n', ' ')}`)} className={`bg-white rounded-[2rem] p-8 text-[#020617] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all cursor-pointer flex flex-col group ${i === 6 ? 'relative' : ''}`}>
                 <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center ${item.color} mb-8 border border-slate-50`}>
                   <item.icon size={24} strokeWidth={2}/>
                 </div>
                 <h3 className="text-[18px] font-black mb-3 leading-tight whitespace-pre-line">{item.title}</h3>
                 <p className="text-slate-500 text-[13px] font-medium mb-8 flex-1 leading-relaxed">
                   {item.desc}
                 </p>
                 <div className="flex items-center gap-2 text-[13px] font-bold text-blue-600 group-hover:gap-4 transition-all">
                   Saber más <ArrowRight size={14}/>
                 </div>

                 {i === 6 && (
                    <div className="absolute bottom-6 right-[-20px] bg-[#020617] text-white font-black text-[9px] uppercase tracking-widest px-6 py-2.5 rounded-full hidden xl:block shadow-lg border border-slate-700">
                      ENTERPRISE ONLY
                    </div>
                 )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 5. PRICING B2B ==================== */}
      <section id="pricing" className="bg-[#F8FAFC] pb-24 px-6 border-t border-slate-200 scroll-mt-20">
        <div className="max-w-[1000px] mx-auto pt-24">
          <div className="text-center mb-16">
             <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-200/50 text-[#020617] text-[11px] font-black uppercase tracking-widest mb-4">Planes Transparentes</div>
             <h2 className="text-[2.2rem] md:text-[3.5rem] font-black text-[#020617] leading-[1.1] tracking-tight mb-4">El Valor de la Certeza.</h2>
             <p className="text-slate-500 text-[16px] font-medium">Retorno de inversión (ROI) justificado en el primer análisis estratégico.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Free */}
            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm flex flex-col hover:-translate-y-2 transition-transform">
              <span className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest w-max mb-6">Plan Basic</span>
              <div className="text-[3rem] font-black text-[#020617] mb-8 leading-none">0€ <span className="text-[1rem] font-medium text-slate-400">/mes</span></div>
              <p className="text-sm text-slate-500 font-medium mb-8 pb-8 border-b border-slate-100">Prueba la capacidad analítica de la IA sin compromiso.</p>
              
              <ul className="space-y-4 mb-10 flex-1 text-[13px] font-bold text-slate-700">
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-blue-500"/> Búsqueda B2B Estructurada</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-blue-500"/> Historial de 5 Consultas</li>
                <li className="flex items-center gap-3 text-slate-400"><Lock size={18}/> Panel Interactivo (Bloqueado)</li>
                <li className="flex items-center gap-3 text-slate-400"><Lock size={18}/> Exportación PDF (Bloqueada)</li>
              </ul>
              {!isSignedIn ? (
                <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
                  <button className="w-full py-4 rounded-xl border-2 border-slate-200 hover:border-blue-600 hover:text-blue-600 text-[#020617] font-black transition-all text-[14px] uppercase tracking-wider cursor-pointer active:scale-95">Empezar Gratis</button>
                </SignInButton>
              ) : (
                <Link href="/dashboard" className="w-full py-4 rounded-xl border-2 border-slate-200 hover:border-blue-600 hover:text-blue-600 text-[#020617] font-black transition-all text-[14px] uppercase tracking-wider text-center block cursor-pointer active:scale-95">Ir al Dashboard</Link>
              )}
            </div>

            {/* Enterprise */}
            <div className="bg-[#020617] rounded-[2.5rem] p-10 shadow-[0_30px_60px_rgba(37,99,235,0.2)] relative overflow-hidden flex flex-col hover:-translate-y-2 transition-transform transform md:-translate-y-4 border border-slate-800">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[60px] rounded-full pointer-events-none"></div>
              <h3 className="text-lg font-black text-blue-400 mb-2 relative z-10 flex justify-between uppercase tracking-widest">Enterprise PRO <Star className="text-blue-400" size={20} fill="currentColor"/></h3>
              <div className="text-[3rem] font-black text-white mb-6 leading-none relative z-10">1.000€ <span className="text-[1rem] font-medium text-blue-200">/mes</span></div>
              <p className="text-sm text-slate-400 mb-8 border-b border-slate-800 pb-8 font-medium relative z-10">Potencia analítica ilimitada para la Alta Dirección.</p>
              
              <ul className="space-y-4 mb-10 flex-1 text-[13px] font-bold text-white relative z-10">
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-blue-400"/> Dictamen Ejecutivo Completo</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-blue-400"/> Threat Radar OSINT en vivo</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-blue-400"/> Simulador Monte Carlo & TCO</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-blue-400"/> Exportación PDF Corporativa</li>
              </ul>
              {!isSignedIn ? (
                <SignInButton mode="modal">
                  <button className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black transition-all text-[14px] uppercase tracking-wider relative z-10 shadow-[0_10px_20px_rgba(37,99,235,0.3)] cursor-pointer active:scale-95">Solicitar Acceso PRO</button>
                </SignInButton>
              ) : (
                <button onClick={(e) => handleAction(e, 'Redirigiendo a pasarela de pago segura Stripe para Plan Enterprise...')} className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black transition-all text-[14px] uppercase tracking-wider relative z-10 shadow-[0_10px_20px_rgba(37,99,235,0.3)] cursor-pointer active:scale-95">Abonar Suscripción</button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 6. FAQ (ACORDEÓN PREMIUM) ==================== */}
      <section id="faq" className="bg-[#F8FAFC] pb-24 px-6 scroll-mt-24">
        <div className="max-w-[800px] mx-auto border-t border-slate-200 pt-24">
          <h2 className="text-[2rem] md:text-[2.5rem] font-black text-[#020617] mb-4 text-center tracking-tight">Preguntas Frecuentes</h2>
          <p className="text-slate-500 font-medium text-center mb-12">Resolvemos las dudas técnicas de tu equipo directivo.</p>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all hover:border-blue-200">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer"
                >
                  <span className="font-bold text-[#020617] text-[15px] pr-4">{faq.q}</span>
                  <ChevronDown className={`text-blue-500 transition-transform duration-300 shrink-0 ${openFaq === i ? 'rotate-180' : ''}`} size={20}/>
                </button>
                <div className={`px-6 text-slate-500 text-[14px] font-medium leading-relaxed transition-all duration-300 overflow-hidden ${openFaq === i ? 'max-h-[200px] pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 7. FORMULARIO DE CONTACTO (B2B Lead Gen) ==================== */}
      <section id="contact" className="bg-[#F8FAFC] pb-32 px-6 scroll-mt-20">
        <div className="max-w-[1000px] mx-auto bg-white rounded-[3rem] p-10 md:p-14 shadow-[0_30px_60px_rgba(0,0,0,0.05)] border border-slate-100">
          
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 items-center">
            <div>
              <h2 className="text-[2rem] font-black text-[#020617] leading-tight mb-4 tracking-tight">Habla con<br/>Ventas Corporativas.</h2>
              <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8">
                Si representas a un fondo de inversión o eres C-Level en una empresa Enterprise, programa una demo privada de 15 minutos con nuestros ingenieros.
              </p>
              
              <div className="space-y-5">
                <div className="flex items-center gap-4 text-sm font-bold text-[#020617]">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center"><Phone size={18}/></div>
                  Soporte Prioritario 24/7
                </div>
                <div className="flex items-center gap-4 text-sm font-bold text-[#020617]">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center"><Mail size={18}/></div>
                  enterprise@adeos.pro
                </div>
              </div>
            </div>

            {/* Formulario que reacciona sin recargar la web */}
            <form onSubmit={handleContactSubmit} className="bg-[#F8FAFC] p-8 rounded-[2rem] border border-slate-200 shadow-inner">
               <h3 className="font-black text-[#020617] mb-6 text-[18px]">Agendar Demo B2B</h3>
               <div className="space-y-4 mb-6">
                 <input type="text" placeholder="Nombre y Apellidos" required className="input-b2b" />
                 <input type="text" placeholder="Empresa Corporativa" required className="input-b2b" />
                 <input type="email" placeholder="Email (Trabajo)" required className="input-b2b" />
               </div>
               <button type="submit" className="w-full bg-[#020617] hover:bg-blue-600 text-white font-black py-4 rounded-xl transition-colors shadow-lg text-[13px] uppercase tracking-widest active:scale-95 cursor-pointer">
                 Enviar Solicitud
               </button>
            </form>
          </div>

        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-[#020617] pt-16 pb-8 border-t border-slate-800 text-slate-400 relative z-20">
         <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4 cursor-pointer" onClick={(e) => scrollTo(e, 'inicio')}>
                <Zap className="text-white fill-blue-500" size={24} />
                <span className="font-extrabold text-[20px] text-white">ADE OS<span className="text-blue-500">.PRO</span></span>
              </div>
              <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
                Decision Intelligence Platform. Transformando el Sourcing Global y la Mitigación de Riesgos a través de IA para la empresa moderna.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Producto</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#features" onClick={(e) => scrollTo(e, 'features')} className="hover:text-blue-400 transition-colors cursor-pointer block">Motor OSINT</a></li>
                <li><a href="#pricing" onClick={(e) => scrollTo(e, 'pricing')} className="hover:text-blue-400 transition-colors cursor-pointer block">Enterprise Pricing</a></li>
                <li><button onClick={(e) => handleAction(e, 'Seguridad Zero-Trust y SOC2')} className="hover:text-blue-400 transition-colors cursor-pointer block text-left">Seguridad (SOC2)</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Compañía</h4>
              <ul className="space-y-3 text-sm">
                <li><button onClick={(e) => handleAction(e, 'Sobre Nosotros')} className="hover:text-blue-400 transition-colors cursor-pointer block text-left">About Us</button></li>
                <li><a href="#contact" onClick={(e) => scrollTo(e, 'contact')} className="hover:text-blue-400 transition-colors cursor-pointer block">Contacto Ventas</a></li>
                <li><button onClick={(e) => handleAction(e, 'Aviso Legal')} className="hover:text-blue-400 transition-colors cursor-pointer block text-left">Aviso Legal</button></li>
              </ul>
            </div>
         </div>
         <div className="max-w-[1200px] mx-auto px-6 border-t border-white/10 pt-8 text-[10px] font-bold uppercase tracking-widest flex flex-col md:flex-row justify-between items-center gap-4">
           <p>© 2026 ADE OS PRO. Todos los derechos reservados.</p>
           <div className="flex items-center gap-4">
              <button onClick={(e) => handleAction(e, 'Perfil LinkedIn')} className="hover:text-blue-400 transition-colors"><Linkedin size={16}/></button>
              <button onClick={(e) => handleAction(e, 'Perfil Twitter (X)')} className="hover:text-blue-400 transition-colors"><Twitter size={16}/></button>
           </div>
         </div>
      </footer>

    </div>
  );
}