import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    // Busca el último dictamen generado por la máquina, no por humanos
    const { data, error } = await supabase
      .from('dictamenes_b2b')
      .select('*')
      .eq('status', 'AUTO_GENERATED')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return NextResponse.json({ alert: null }, { status: 200 });
    }

    return NextResponse.json({ alert: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ alert: null }, { status: 500 });
  }
}