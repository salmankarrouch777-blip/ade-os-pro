import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: "Vector de identidad (UserID) no detectado." }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('dictamenes_b2b')
      .select('id, objetivo, created_at, payload')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50); // Restricción de carga para mantener latencia sub-100ms

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ data }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: `Fallo de recuperación: ${error.message}` }, { status: 500 });
  }
}