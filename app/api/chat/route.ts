import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { objetivo, contexto } = await req.json();
    const apiKey = process.env.DIFY_API_KEY?.trim(); 
    
    if (!apiKey) return NextResponse.json({ error: "Falta API Key" }, { status: 500 });

    const ordenMaestra = `NECESIDAD DE COMPRA: ${objetivo}\nPARÁMETROS: ${contexto || 'Ninguno'}`;

    const res = await fetch("https://api.dify.ai/v1/chat-messages", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: {},
        query: ordenMaestra,
        response_mode: "streaming", // 🔥 MODO CASCADA ACTIVADO
        user: "ade-os-ceo"
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json({ error: `Error Dify ${res.status}: ${errorText}` }, { status: res.status });
    }

    // 🔥 EL GOLPE A PERPLEXITY: Pasamos el "Stream" en crudo directo a la web del directivo
    return new Response(res.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });

  } catch (error: any) {
    return NextResponse.json({ error: `Fallo local: ${error.message}` }, { status: 500 });
  }
}