import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';

interface MetalPlateOptions {
  pool_id: string;
  pool_name: string;
  facility_name: string;
  volume_m3: number;
  warranty_code: string;
  nfc_uid?: string;
  destination_type: 'CASA_DE_MAQUINAS' | 'RECEPCAO_TOTEM';
  plate_size_mm: '100x150' | '150x200'; // Dimensões industriais padrão em mm
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const poolId = searchParams.get('pool_id') || 'resort-vista-bela';
    const poolName = searchParams.get('pool_name') || 'Piscina Central Panorâmica';
    const facilityName = searchParams.get('facility_name') || 'Resort & Spa Vista Bela';
    const volumeM3 = parseFloat(searchParams.get('volume_m3') || '350');
    const warrantyCode = searchParams.get('warranty_code') || 'JH-2026-DECENAL-084';
    const nfcUid = searchParams.get('nfc_uid') || '04:8A:F3:1B:90:4C:80';
    const destination = searchParams.get('destination') || 'CASA_DE_MAQUINAS';
    const format = searchParams.get('format') || 'svg'; // svg ou json

    const activationUrl = `https://jhpcs-campo.vercel.app?pool_id=${encodeURIComponent(poolId)}&nfc=true`;

    // Gera QR Code vetorial em SVG puro
    const qrSvgString = await QRCode.toString(activationUrl, {
      type: 'svg',
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'H',
    });

    // Dimensões em milímetros convertidas para viewBox de alta precisão (100mm x 150mm)
    const widthMm = 100;
    const heightMm = 150;
    const isReceiversTotem = destination === 'RECEPCAO_TOTEM';

    // SVG Vetorial Otimizado para Máquinas CNC / Gravação Laser Fiber (1064nm)
    const vectorPlateSvg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" width="100mm" height="150mm" style="background:#ffffff; font-family:'Helvetica Neue', Arial, sans-serif;">
  <defs>
    <!-- Marcadores de furação mecânica (4 furos de 4mm nos cantos com margem de 6mm) -->
    <pattern id="brushedMetal" patternUnits="userSpaceOnUse" width="100" height="100">
      <line x1="0" y1="0" x2="100" y2="100" stroke="#f1f5f9" stroke-width="0.5" opacity="0.3"/>
    </pattern>
  </defs>

  <!-- Base da Chapa de Alumínio Naval Anodizado -->
  <rect x="2" y="2" width="396" height="596" rx="16" fill="#ffffff" stroke="#000000" stroke-width="3"/>
  <rect x="6" y="6" width="388" height="588" rx="12" fill="url(#brushedMetal)" stroke="#000000" stroke-width="0.8" stroke-dasharray="4,2"/>

  <!-- Furos de Fixação Mecânica (4mm para rebite ou parafuso inox 316) -->
  <circle cx="24" cy="24" r="8" fill="none" stroke="#000000" stroke-width="1.5"/>
  <circle cx="24" cy="24" r="2" fill="#000000"/>
  <circle cx="376" cy="24" r="8" fill="none" stroke="#000000" stroke-width="1.5"/>
  <circle cx="376" cy="24" r="2" fill="#000000"/>
  <circle cx="24" cy="576" r="8" fill="none" stroke="#000000" stroke-width="1.5"/>
  <circle cx="24" cy="576" r="2" fill="#000000"/>
  <circle cx="376" cy="576" r="8" fill="none" stroke="#000000" stroke-width="1.5"/>
  <circle cx="376" cy="576" r="2" fill="#000000"/>

  <!-- Cabeçalho Institucional JHOSTON POOLS & LAGOONS -->
  <g transform="translate(200, 50)" text-anchor="middle">
    <text y="0" font-size="14" font-weight="900" letter-spacing="3" fill="#000000">JHOSTON POOLS &amp; LAGOONS</text>
    <text y="14" font-size="7.5" font-weight="bold" letter-spacing="1.5" fill="#333333">ENGENHARIA &amp; REVESTIMENTOS MONOLÍTICOS</text>
    <line x1="-150" y1="22" x2="150" y2="22" stroke="#000000" stroke-width="1.5"/>
  </g>

  <!-- Destinação da Placa (Casa de Máquinas ou Recepção) -->
  <g transform="translate(200, 95)" text-anchor="middle">
    <rect x="-140" y="-12" width="280" height="24" rx="4" fill="#000000"/>
    <text y="4" font-size="9" font-weight="900" fill="#ffffff" letter-spacing="2">
      ${isReceiversTotem ? 'CHANCELA SANITÁRIA • TOTEM DE RECEPÇÃO' : 'PRONTUÁRIO FÍSICO • CASA DE MÁQUINAS'}
    </text>
  </g>

  <!-- Identificação do Ativo e Complexo -->
  <g transform="translate(30, 135)">
    <text x="0" y="0" font-size="8" font-weight="bold" fill="#666666">COMPLEXO / EMPREENDIMENTO:</text>
    <text x="0" y="14" font-size="12" font-weight="900" fill="#000000">${facilityName.toUpperCase()}</text>

    <text x="0" y="34" font-size="8" font-weight="bold" fill="#666666">PISCINA / ATIVO AUDITADO:</text>
    <text x="0" y="48" font-size="11" font-weight="800" fill="#000000">${poolName.toUpperCase()}</text>

    <text x="0" y="68" font-size="8" font-weight="bold" fill="#666666">VOLUME DO TANQUE:</text>
    <text x="0" y="82" font-size="11" font-weight="900" fill="#000000">${volumeM3.toFixed(1)} m³ (${(volumeM3 * 1000).toLocaleString('pt-BR')} LITROS)</text>

    <text x="180" y="68" font-size="8" font-weight="bold" fill="#666666">CERTIFICADO GARANTIA:</text>
    <text x="180" y="82" font-size="10" font-weight="900" fill="#000000">${warrantyCode}</text>
  </g>

  <!-- Separação -->
  <line x1="30" y1="235" x2="370" y2="235" stroke="#000000" stroke-width="1" stroke-dasharray="2,2"/>

  <!-- Bloco Central do QR Code Vetorial -->
  <g transform="translate(130, 250)">
    <rect x="-10" y="-10" width="160" height="160" rx="8" fill="#ffffff" stroke="#000000" stroke-width="1.5"/>
    <g transform="scale(0.875)">
      ${qrSvgString.replace('<?xml version="1.0" standalone="yes"?>', '')}
    </g>
  </g>

  <!-- Indicador de Leitura NFC / Sensor Dual -->
  <g transform="translate(200, 435)" text-anchor="middle">
    <circle cx="-65" cy="-2" r="7" fill="none" stroke="#000000" stroke-width="1.2"/>
    <path d="M-69 -2 A4 4 0 0 1 -61 -2" stroke="#000000" stroke-width="1.2" fill="none"/>
    <text x="-48" y="2" font-size="8" font-weight="bold" fill="#000000">CHIP NFC EMBUTIDO</text>
    <text x="65" y="2" font-size="8" font-weight="bold" fill="#000000">LEITURA ÓPTICA QR 2D</text>
    <text y="18" font-size="7" font-weight="bold" fill="#666666">APROXIME O SMARTPHONE OU APONTE A CÂMERA</text>
    <text y="30" font-size="6.5" font-family="monospace" fill="#333333">NFC-UID: ${nfcUid} • GEOFENCE: 50 METROS</text>
  </g>

  <!-- Diretrizes Técnicas Gravadas em Laser -->
  <g transform="translate(30, 485)">
    <rect x="0" y="0" width="340" height="52" rx="4" fill="#f8fafc" stroke="#000000" stroke-width="0.8"/>
    <text x="10" y="14" font-size="7" font-weight="bold" fill="#000000">1. OBRIGATÓRIO CHECK-IN IN-LOCO ANTES DE ADICIONAR QUÍMICOS.</text>
    <text x="10" y="26" font-size="7" font-weight="bold" fill="#000000">2. TOLERÂNCIA ZERO A ÁCIDOS FORTES SEM PRÉVIA DILUIÇÃO EM BALDE.</text>
    <text x="10" y="38" font-size="7" font-weight="bold" fill="#000000">3. VISTORIAS FORA DO RAIO DE 50M SÃO REJEITADAS PELA AUDITORIA.</text>
  </g>

  <!-- Rodapé de Validação Pericial -->
  <g transform="translate(200, 560)" text-anchor="middle">
    <text y="0" font-size="6.5" font-weight="bold" fill="#666666">SISTEMA AUDITADO VIA PLATAFORMA JHPCS • CRQ-IV &amp; NBR 10.818</text>
    <text y="10" font-size="6" font-family="monospace" fill="#999999">PLACA GRAVADA EM ALUMÍNIO NAVAL 5052-H32 COM PROTEÇÃO UV PERENE</text>
  </g>
</svg>`;

    if (format === 'svg') {
      return new NextResponse(vectorPlateSvg, {
        headers: {
          'Content-Type': 'image/svg+xml; charset=utf-8',
          'Content-Disposition': `attachment; filename="PLAQUETA_LASER_${poolId}.svg"`,
          'Cache-Control': 'public, max-age=86400',
        },
      });
    }

    return NextResponse.json({
      success: true,
      pool_id: poolId,
      svg: vectorPlateSvg,
      dimensions: {
        width_mm: widthMm,
        height_mm: heightMm,
        material: 'Alumínio Naval Anodizado 5052-H32 (1.5mm a 2.0mm)',
        laser_type: 'Fiber Laser (1064nm) ou CNC Gravura Mecânica',
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Falha ao gerar arte vetorial da plaqueta' },
      { status: 500 }
    );
  }
}

