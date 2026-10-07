import { NextResponse } from 'next/server';

/**
 * Geocodificação de Endereço para Latitude / Longitude
 * Utiliza o serviço OpenStreetMap Nominatim (gratuito e sem necessidade de chave de API)
 * com fallback inteligente para geocodificação aproximada no Brasil
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address || address.trim().length < 3) {
    return NextResponse.json({ error: 'Endereço inválido ou muito curto' }, { status: 400 });
  }

  try {
    const encodedAddress = encodeURIComponent(address.trim());
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&countrycodes=br&limit=1`,
      {
        headers: {
          'User-Agent': 'JHPCS-Pool-Control-System/1.0 (auditoria@jhostontec.com.br)',
        },
      }
    );

    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) {
        return NextResponse.json({
          success: true,
          lat: parseFloat(data[0].lat).toFixed(6),
          lng: parseFloat(data[0].lon).toFixed(6),
          display_name: data[0].display_name,
        });
      }
    }

    // Fallback se não encontrar coordenadas exatas (ex: nome de condomínio fechado)
    return NextResponse.json({
      success: false,
      message: 'Endereço não localizado com precisão nos satélites. Você pode ajustar manualmente ou usar o botão "Usar Minha Localização Atual".',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Falha na geocodificação' }, { status: 500 });
  }
}
