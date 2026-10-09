import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { mockPools } from '@/lib/mock-data';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('pools')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, pools: data, source: 'supabase_live' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
