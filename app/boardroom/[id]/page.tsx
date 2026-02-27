"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// MOCK DATA: Simula exactamente el JSON estructurado que nos devolverá Dify
const mockData = {
  producto_auditado: "Fondo 50M€: Baterías de Estado Sólido — QuantumScape vs Serie B Europea",
  codigo_taric: "8507.60",
  dictamen: {
    veredicto: "Priorizar Serie B Europea Artículo 9",
    confidence: 82,
    compliance: [
      { label: "SFDR Artículo 9", valor: "Inversión Sostenible", status: "obligatorio", riesgo: "OBLIGATORIO · IMPACTO ALTO" },
      { label: "CBAM — Litio/Manganeso", valor: "Ajuste Frontera CO₂", status: "obligatorio", riesgo: "OBLIGATORIO · IMPACTO ALTO" },
      { label: "MiCA — Tokenización", valor: "Activos Industriales", status: "recomendado", riesgo: "RECOMENDADO · MEDIO" },
      { label: "TARIC", valor: "8507.60 Acumuladores", status: "verificado", riesgo: "VERIFICADO · ESMA" }
    ]
  },
  coste_inaccion: { valor: "+7.384 €", periodo: "por trimestre en ventana competitiva perdida" },
  threat_radar: [
    { nivel: "critico", texto: "La rápida escalabilidad del LFP chino (CATL Shenxing) amenaza directamente el time-to-market y los márgenes del estado sólido para 2027." },
    { nivel: "advertencia", texto: "Las exigencias de CAPEX antes del Start of Production (SOP) amenazan con diluir agresivamente posiciones minoritarias no protegidas." }
  ],
  roi: {
    coste_base: "[Benchmark] 45–60 €/kWh",
    coste_operativo: "[Benchmark] 120–150 €/kWh",
    roi_pct: "18%",
    vector_tactico: "OBLIGATORIO: Insertar cláusula de Liquidation Preference 1.5x y protección Anti-Dilución (Broad-based Weighted Average) en el Term Sheet de la Serie B europea."
  },
  monte_carlo: {
    confianza: 32,
    escenarios: [
      { tipo: "best", titulo: "BEST-CASE · OPTIMISTA", texto: "OEMs europeos adoptan estado sólido en 2026. Salida vía IPO o M&A estratégico.", tir: "TIR 45%" },
      { tipo: "base", titulo: "MOST-LIKELY · BASE", texto: "Madurez tecnológica se retrasa hasta 2028 por problemas de manufactura. Requiere capital puente.", tir: "TIR 15%" },
      { tipo: "worst", titulo: "WORST-CASE · ESTRÉS", texto: "LFP chino logra 250 Wh/kg a 40€/kWh antes de 2027. Estado sólido reducido a nicho hiper-premium.", tir: "−42.5M €" }
    ],
    detonante: "El mayor obstáculo industrial global sigue siendo el rendimiento masivo libre de defectos (yield) en la laminación de separadores de polímero o cerámica."
  },
  tco: {
    filas: [
      { concepto: "Inversión Base (Equity Minoritario)", opcion_a: "50 M€", opcion_b: "50 M€" },
      { concepto: "Horizonte de Liquidez Estimado", opcion_a: "2–3 años (cotizada)", opcion_b: "5–7 años (Serie B)" },
      { concepto: "TIR Proyectada (5 años)", opcion_a: "12% (dilución alta)", opcion_b: "35% (con anti-dilución)" }
    ],
    veredicto_estrategico: "Serie B Europea superior: mayor TIR, protección anti-dilución negociable y elegibilidad SFDR Artículo 9. QuantumScape ofrece liquidez más rápida pero mayor riesgo de dilución sin protección contractual."
  },
  esg: {
    texto: "Un activo europeo nativo (Greenfield) maximiza la elegibilidad SFDR Artículo 9, logrando neutralidad en el Scope 3 al integrar PPAs 100% renovables desde el inicio, frente al impacto logístico internacional de QuantumScape.",
    tco2eq: 38,
    unidad: "tCO₂eq / MWh"
  },
  directorio: [
    { nombre: "Basquevolt — Venture Deal Europeo", trust_score: "AAA", riesgo_insolvencia: "bajo", ciudad: "Vitoria-Gasteiz", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80" },
    { nombre: "QuantumScape Corp. — Posición Pública", trust_score: "AA", riesgo_insolvencia: "medio", ciudad: "San Jose, USA", img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80" },
    { nombre: "FREYR Battery — Gigafactoría Semi-Sólido", trust_score: "A", riesgo_insolvencia: "alto", ciudad: "Oslo / Luxemburgo", img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=80" }
  ],
  fuentes: [
    { nombre: "European Battery Alliance (EBA250)", url: "https://www.eba250.com/", icon: "🔋" },
    { nombre: "ESMA — SFDR Technical Standards", url: "https://www.esma.europa.eu/sustainable-finance/sfdr", icon: "📋" },
    { nombre: "BloombergNEF — Global Battery Cost Benchmark", url: "https://about.bnef.com/", icon: "📊" }
  ]
};

export default function ResultsPage() {
  const router = useRouter();

  // Aseguramos que cargue arriba del todo
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="results" style={{ display: 'block', minHeight: '100vh', paddingTop: '68px', paddingBottom: '80px' }}>
      
      {/* 1. TOPBAR (Se oculta al imprimir el PDF) */}
      <div className="results-bar print:hidden">
        <div className="rb-bread">
          <a onClick={() => router.push('/dashboard')} style={{ cursor: 'pointer', color: 'var(--muted)', transition: 'color .2s' }}>Dashboard</a>
          <span>›</span>
          <span style={{ color: 'var(--text2)' }}>{mockData.producto_auditado}</span>
        </div>
        <div className="rb-actions">
          <button className="rb-btn rb-btn-o">🔔 Crear alerta</button>
          <button className="rb-btn rb-btn-o">👥 Compartir</button>
          <button className="rb-btn rb-btn-p" onClick={() => window.print()}>⬇ Exportar PDF</button>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <div className="res-hero">
        <img src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=1800&q=80" alt="Industry" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'saturate(.25) brightness(.3)' }} />
        <div className="res-hero-over"></div>
        <div className="res-hero-c">
          <div className="res-hero-title">{mockData.producto_auditado}</div>
          <div className="res-tags">
            <span className="res-tag">SECTOR {mockData.codigo_taric}</span>
            <span className="res-tag">ESG VALIDABLE</span>
            <span className="res-tag">⏱ 48s</span>
          </div>
        </div>
      </div>

      {/* 3. BODY (Datos mapeados a las clases CSS originales) */}
      <div className="res-body">
        
        {/* DICTAMEN & COSTE */}
        <div className="res-top">
          <div className="dictamen">
            <div className="d-kicker">● DICTAMEN EJECUTIVO</div>
            <div className="d-conf">
              <div className="d-conf-bar"><div className="d-conf-fill" style={{ width: `${mockData.dictamen.confidence}%` }}></div></div>
              <div className="d-conf-val">{mockData.dictamen.confidence}/100</div>
            </div>
            <div className="d-verdict">{mockData.dictamen.veredicto}</div>
            <div className="d-items">
              {mockData.dictamen.compliance.map((item, i) => (
                <div key={i} className="d-item">
                  <div className="d-item-l">{item.label}</div>
                  <div className="d-item-v">{item.valor}</div>
                  <div className={`d-item-s ${item.status === 'obligatorio' ? 's-req' : 's-ok'}`}>{item.riesgo}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="cost-box">
            <div className="cost-l">⚡ COSTE DE INACCIÓN</div>
            <div className="cost-v">{mockData.coste_inaccion.valor}</div>
            <div className="cost-p">{mockData.coste_inaccion.periodo}</div>
          </div>
        </div>

        {/* THREAT RADAR */}
        <div className="res-section">
          <div className="res-section-h">
            <div className="rs-dot" style={{ background: 'var(--red)', animation: 'blink 1.5s infinite' }}></div>
            <div className="rs-title" style={{ color: 'var(--red)' }}>Threat Radar — Alertas Activas</div>
          </div>
          <div className="threats">
            {mockData.threat_radar.map((threat, i) => (
              <div key={i} className={`threat ${threat.nivel === 'critico' ? 'crit' : 'warn'}`}>
                <span className={`threat-lv ${threat.nivel === 'critico' ? 'lv-c' : 'lv-w'}`}>{threat.nivel.toUpperCase()}</span>
                <div className="threat-t">{threat.texto}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ROI / SHOULD-COST */}
        <div className="roi-box">
          <div className="res-section-h" style={{ marginBottom: '18px' }}>
            <div className="rs-title" style={{ color: 'var(--text2)' }}>Análisis de Valor Estratégico (ROI / Should-Cost)</div>
          </div>
          <div className="roi-grid">
            <div><div className="roi-item-l">COSTE BASE / INVERSIÓN</div><div className="roi-item-v">{mockData.roi.coste_base}</div></div>
            <div><div className="roi-item-l">COSTES OPERATIVOS</div><div className="roi-item-v">{mockData.roi.coste_operativo}</div></div>
            <div><div className="roi-item-l">ROI ESTIMADO</div><div className="roi-item-v big">{mockData.roi.roi_pct}</div></div>
          </div>
          <div className="roi-tactic">&quot;{mockData.roi.vector_tactico}&quot;</div>
        </div>

        {/* MONTE CARLO */}
        <div className="res-section">
          <div className="mc-header">
            <div className="res-section-h" style={{ margin: 0 }}>
              <div className="rs-dot" style={{ background: 'var(--blue)' }}></div>
              <div className="rs-title" style={{ color: 'var(--blue)' }}>Simulador Predictivo (Monte Carlo)</div>
            </div>
            <div className="mc-conf">Confianza estadística: {mockData.monte_carlo.confianza}%</div>
          </div>
          <div className="mc-grid">
            {mockData.monte_carlo.escenarios.map((esc, i) => (
              <div key={i} className={`mc-card ${esc.tipo}`}>
                <div className="mc-sc">{esc.titulo}</div>
                <div className="mc-text">{esc.texto}</div>
                <div className="mc-tir" style={esc.tipo === 'worst' ? { color: 'var(--red)' } : {}}>{esc.tir}</div>
              </div>
            ))}
          </div>
          <div className="mc-det">&quot;{mockData.monte_carlo.detonante}&quot;</div>
        </div>

        {/* TCO MATRIZ */}
        <div className="tco">
          <div className="res-section-h" style={{ marginBottom: '16px' }}>
            <div className="rs-title" style={{ color: 'var(--text2)' }}>Matriz Comparativa Universal (TCO)</div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="tco-t" style={{ width: '100%', minWidth: '600px' }}>
              <thead>
                <tr>
                  <th>Línea de Coste B2B</th>
                  <th className="a">Opción A — Principal</th>
                  <th>Opción B — Alternativa</th>
                </tr>
              </thead>
              <tbody>
                {mockData.tco.filas.map((row, i) => (
                  <tr key={i}>
                    <td>{row.concepto}</td>
                    <td className="a-val">{row.opcion_a}</td>
                    <td>{row.opcion_b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="tco-verdict">✓ {mockData.tco.veredicto_estrategico}</div>
        </div>

        {/* ESG */}
        <div className="esg">
          <div>
            <div className="esg-l">🌱 IMPACTO SOSTENIBLE — ESG / ARTÍCULO 9 SFDR</div>
            <div className="esg-t">{mockData.esg.texto}</div>
          </div>
          <div>
            <div className="esg-m-v">{mockData.esg.tco2eq}</div>
            <div className="esg-m-l">tCO₂eq / MWh<br/>ciclo inicial</div>
          </div>
        </div>

        {/* DIRECTORIO */}
        <div className="dir-grid">
          {mockData.directorio.map((prov, i) => (
            <div key={i} className="dir-card">
              <img src={prov.img} alt={prov.nombre} className="dir-img" style={{ width: '100%', height: '90px', objectFit: 'cover', filter: 'saturate(.35) brightness(.45)' }} />
              <div className="dir-body">
                {i === 0 && <span className="dir-winner">GANADOR</span>}
                <div className="dir-name">{prov.nombre}</div>
                <div className="dir-trust">Trust Score: {prov.trust_score} · {prov.ciudad}</div>
                <div className="dir-risk">
                  <div className="risk-dot" style={{ background: i === 0 ? 'var(--cyan)' : i === 1 ? 'var(--gold)' : 'var(--red)' }}></div>
                  Insolvencia: {prov.riesgo_insolvencia.toUpperCase()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FUENTES */}
        <div className="sources">
          <div className="sources-l">Trazabilidad de Datos — Fuentes OSINT</div>
          {mockData.fuentes.map((fuente, i) => (
            <div key={i} className="source">
              <div className="source-ic">{fuente.icon}</div>
              <div>
                <div className="source-name">{fuente.nombre}</div>
                <div className="source-url">{fuente.url}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}