import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const { event_type, sku, quantity_required, location } = payload;

    if (event_type !== 'STOCK_DEPLETION_ALERT' || !sku) {
      return NextResponse.json({ error: "Estructura no reconocida." }, { status: 400 });
    }

    const objetivoSintetizado = `ALERTA ERP AUTOMÁTICA: Rotura inminente SKU ${sku}. Faltan ${quantity_required} en ${location}. Genera ruta de importación aérea.`;

    // 1. Invocación del Modelo Flash (Baja latencia)
    const { text } = await generateText({
      model: google('gemini-2.5-flash'),
      prompt: `Actúa como Director de Cadena de Suministro. Responde estrictamente en formato JSON válido. NO uses Markdown, NO incluyas bloques de código ni la palabra "json". 
      Estructura obligatoria:
      {
        "dictamen": "String",
        "confidence": 99,
        "carrier": "String",
        "eta": "String",
        "coste_inaccion": 1000
      }
      Analiza: ${objetivoSintetizado}`,
    });

    // 2. Limpieza de Markdown (Evasión de SyntaxError)
    const cleanText = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    const jsonPayload = JSON.parse(cleanText);

    // 3. Persistencia en Base de Datos (Inyección de Agente M2M)
    const { error } = await supabase
      .from('dictamenes_b2b')
      .insert([{
        user_id: 'SYSTEM_AUTOPILOT', // Resolución quirúrgica del constraint NOT-NULL
        objetivo: objetivoSintetizado,
        payload: jsonPayload,
        status: 'AUTO_GENERATED'
      }]);

    if (error) throw new Error(`Bloqueo en Supabase: ${error.message}`);

    return NextResponse.json({ status: "SUCCESS" }, { status: 200 });

  } catch (error: any) {
    // Exposición cruda del error en la respuesta HTTP
    return NextResponse.json({ 
      error: "Fallo de ejecución", 
      detalle_tecnico: error.message 
    }, { status: 500 });
  }
}