import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { mockPools } from '@/lib/mock-data';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('pools')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return NextResponse.json({ success: true, pools: data, source: 'supabase_live' });
    }

    return NextResponse.json({ success: true, pools: mockPools, source: 'fallback_mock' });
  } catch (err: any) {
    return NextResponse.json({ success: true, pools: mockPools, source: 'fallback_mock' });
  }
}
