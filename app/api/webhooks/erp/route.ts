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

    const objetivoSintetizado = `ALERTA ERP AUTOMÁTICA: Rotura de stock inminente para SKU ${sku}. Faltan ${quantity_required} unidades en ${location}. Genera una ruta de importación aérea de emergencia.`;

    console.log(`[AUTOPILOTO] Ingesta completada. Analizando SKU: ${sku}...`);

    const { text } = await generateText({
      model: google('gemini-2.5-flash'),
      prompt: `Actúa como Director de Cadena de Suministro. Responde estrictamente en formato JSON válido, sin Markdown. Analiza esta crisis: ${objetivoSintetizado}. 
      El JSON debe tener esta estructura:
      {
        "dictamen": "String con la decisión",
        "confidence": Número entre 0 y 100,
        "carrier": "Nombre del transportista",
        "eta": "Tiempo estimado",
        "coste_inaccion": Número
      }`,
    });

    const { error } = await supabase
      .from('dictamenes_b2b')
      .insert([{
        objetivo: objetivoSintetizado,
        payload: JSON.parse(text),
        status: 'AUTO_GENERATED'
      }]);

    if (error) throw new Error(`Fallo en persistencia: ${error.message}`);

    return NextResponse.json({ 
      status: "SUCCESS", 
      message: "Incidencia resuelta en segundo plano."
    }, { status: 200 });

  } catch (error: any) {
    console.error("[CRITICAL ERROR]", error);
    return NextResponse.json({ error: "Colapso del motor Autopiloto." }, { status: 500 });
  }
}