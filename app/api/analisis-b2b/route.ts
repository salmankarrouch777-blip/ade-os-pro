import { google } from '@ai-sdk/google';
import { streamObject } from 'ai';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';

export const maxDuration = 60;

export async function POST(req: Request) {
  // Extraemos el userId que nos mandará el frontend
  const { objetivo, gobernanza, userId } = await req.json();

  if (!objetivo) {
    return new Response(JSON.stringify({ error: "Objetivo no definido" }), { status: 400 });
  }

  const result = await streamObject({
    model: google('gemini-2.5-pro'),
    system: `Eres el motor analítico central de ADE OS PRO (Dashboard B2B Enterprise).
REGLAS ESTRICTAS DE GENERACIÓN DE DATOS (MANDATORIO):
1. Cero narrativa. Prohibido usar párrafos explicativos.
2. Todo valor financiero DEBE ser un número exacto y conciso con su divisa (Ejemplo: "450.00 EUR", "12,500 USD", "+15%").
3. Los textos descriptivos DEBEN ser telegráficos. Límite estricto: máximo 8 palabras por campo.
4. Utiliza terminología técnica y acrónimos corporativos estándar (TCO, ROI, BAF, GRI, OEM, Tier 1).
5. Tu respuesta alimenta directamente una interfaz de cuadrícula estricta. Violar la longitud máxima romperá el DOM visual del cliente.`,
    prompt: `OBJETIVO ESTRATÉGICO:\n${objetivo}\n\nGOBERNANZA Y RESTRICCIONES:\n${gobernanza}`,
    schema: z.object({
      titulo_decision: z.string().describe("Título telegráfico de la operación, máximo 6 palabras."),
      categoria_sector: z.string().describe("Código HS/TARIC y nombre corto del sector."),
      dictamen_ejecutivo: z.object({
        titulo: z.string().describe("Veredicto final: APROBAR, DENEGAR o CONDICIONAR. Máximo 3 palabras."),
        confidence_index: z.string().describe("Valor numérico entre 0.0 y 99.9"),
        coste_inaccion: z.string().describe("Impacto financiero por retraso. Ejemplo: '15,000 EUR / día'"),
        compliance: z.array(z.object({
          normativa: z.string().describe("Nombre de la ley o estándar (Ej: ISO 9001, LkSG)"),
          estado: z.string().describe("CUMPLIDO, EN RIESGO o INCUMPLIDO"),
          impacto: z.string().describe("ALTO, MEDIO o BAJO"),
          color: z.enum(['red', 'green'])
        }))
      }),
      analisis_valor: z.object({
        coste_base: z.string().describe("Coste unitario o total estimado. Corto. Ej: '75.00 EUR / ud'"),
        costes_operativos: z.string().describe("Costes logísticos o aduaneros. Ej: '+12% TCO'"),
        margen_oculto: z.string().describe("Porcentaje de ahorro o ROI esperado. Ej: '14.5% ROI'"),
        vector_tactico: z.string().describe("Directriz de negociación. Máximo 8 palabras.")
      }),
      simulador_monte_carlo: z.object({
        confianza_estadistica: z.string().describe("Porcentaje exacto. Ej: '95%'"),
        optimista: z.string().describe("Impacto financiero escenario ideal. Máximo 5 palabras."),
        base: z.string().describe("Impacto financiero escenario actual. Máximo 5 palabras."),
        estres: z.string().describe("Impacto financiero escenario crítico. Máximo 5 palabras."),
        detonante_riesgo: z.string().describe("Principal variable de fallo. Máximo 4 palabras.")
      }),
      matriz_comparativa: z.object({
        opcion_a: z.string().describe("Nombre entidad opción principal."),
        opcion_b: z.string().describe("Nombre entidad alternativa principal."),
        filas: z.array(z.object({
          concepto: z.string().describe("Métrica de comparación. Ej: 'Lead Time'"),
          val_a: z.string().describe("Valor corto para opción A."),
          val_b: z.string().describe("Valor corto para opción B.")
        })),
        evaluacion: z.object({
          val_a: z.string().describe("Puntuación o coste total A. Corto."),
          val_b: z.string().describe("Puntuación o coste total B. Corto.")
        }),
        impacto_esg: z.object({
          texto_general: z.string().describe("Resumen de viabilidad sostenible. Máximo 10 palabras."),
          obligatorio_a: z.string().optional().describe("Condición climática o legal sine qua non.")
        }).optional()
      }),
      threat_radar: z.array(z.object({
        nivel: z.string().describe("CRÍTICO, ALERTA o INFO"),
        tipo: z.string().describe("Categoría del riesgo (Ej: GEOPOLÍTICO, LOGÍSTICO)"),
        texto: z.string().describe("Descripción exacta del riesgo. Máximo 12 palabras.")
      })),
      directorio_entidades: z.array(z.object({
        nombre: z.string(),
        etiqueta: z.string().optional().describe("Ej: GANADOR, BACKUP, DESCARTADO"),
        trust_score: z.string().describe("Calificación crediticia o de riesgo. Ej: 'AAA', 'B+'"),
        supervivencia: z.string().describe("Probabilidad de continuidad de negocio. Ej: 'Alta'"),
        riesgo_insolvencia: z.string().describe("BAJO, MEDIO o ALTO"),
        ubicacion: z.string().describe("Ciudad y País. Ej: 'Stuttgart, DE'"),
        url: z.string().describe("Dominio principal de la empresa.")
      })),
      trazabilidad_fuentes: z.array(z.object({
        nombre: z.string().describe("Nombre de la base de datos o API simulada."),
        url: z.string()
      }))
    }),
    
    // 🔥 EL CÓDIGO QUE GUARDA LOS DATOS AL TERMINAR EL ANÁLISIS
    onFinish: async ({ object }) => {
      if (object) {
        try {
          const { error } = await supabase.from('dictamenes_b2b').insert({
            user_id: userId || 'admin_local',
            objetivo: objetivo,
            gobernanza: gobernanza || '',
            payload: object
          });
          
          if (error) {
            console.error("Error crítico en capa de persistencia (Supabase):", error);
          } else {
            console.log("✅ Dictamen guardado en Supabase exitosamente.");
          }
        } catch (err) {
          console.error("Fallo de ejecución en onFinish:", err);
        }
      }
    },
  });

  return result.toTextStreamResponse();
}