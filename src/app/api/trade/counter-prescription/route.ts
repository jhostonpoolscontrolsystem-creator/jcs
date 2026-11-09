import { NextResponse } from 'next/server';
import { calculateLSI } from '@/lib/substrate-rules';

export interface PrescriptionItem {
  id: string;
  name: string;
  category: 'SANITIZANTE' | 'EQUILIBRIO_PH' | 'CLARIFICANTE' | 'ACESSORIO';
  dosageAmount: number;
  unit: string;
  priceEstimateBrl: number;
  instructions: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerPhone,
      poolVolumeM3,
      substrateType = 'MONOLITICO_SAND',
      ph,
      chlorinePpm,
      alkalinityPpm = 100,
      calciumHardnessPpm = 250,
      tempC = 26,
    } = body;

    if (!poolVolumeM3 || ph === undefined || chlorinePpm === undefined) {
      return NextResponse.json(
        { error: 'Volume da piscina (m³), pH e Cloro são obrigatórios para a prescrição de balcão.' },
        { status: 400 }
      );
    }

    // 1. Diagnóstico do Índice de Saturação de Langelier (ISL)
    const lsiResult = calculateLSI({
      ph,
      tempC,
      alkalinityPpm,
      calciumHardnessPpm,
    });

    const items: PrescriptionItem[] = [];
    let totalPrice = 0;

    // 2. Monta a lista de compras baseada nas deficiências químicas
    // 2.1. Ajuste de Cloro
    if (chlorinePpm < 1.5) {
      const neededGrams = Math.round((2.5 - chlorinePpm) * 2 * poolVolumeM3);
      const buckets = Math.max(1, Math.ceil(neededGrams / 1000));
      const price = buckets * 68.0;
      totalPrice += price;
      items.push({
        id: 'p-cloro-65',
        name: 'Cloro Dicloro Estabilizado Premium (Balde 1kg)',
        category: 'SANITIZANTE',
        dosageAmount: neededGrams,
        unit: 'g',
        priceEstimateBrl: price,
        instructions: `Aplicar ${neededGrams}g dissolvido previamente em balde plástico ao entardecer.`,
      });
    }

    // 2.2. Ajuste de Alcalinidade / pH Ácido
    if (ph < 7.2 || alkalinityPpm < 80) {
      const neededGrams = Math.round(((100 - Math.min(100, alkalinityPpm)) / 10) * 17 * poolVolumeM3);
      const bags = Math.max(1, Math.ceil(neededGrams / 2000));
      const price = bags * 34.0;
      totalPrice += price;
      items.push({
        id: 'p-barrilha-pura',
        name: 'Barrilha Leve / Bicarbonato Puro Mineral (Pacote 2kg)',
        category: 'EQUILIBRIO_PH',
        dosageAmount: neededGrams,
        unit: 'g',
        priceEstimateBrl: price,
        instructions: `Dissolver ${neededGrams}g e espalhar uniformemente na superfície com recirculação ativa por 4 horas.`,
      });
    }

    // 2.3. Clarificante Mineral para Manutenção
    const clarifierMl = Math.round(poolVolumeM3 * 6);
    const clarifierPrice = 28.5;
    totalPrice += clarifierPrice;
    items.push({
      id: 'p-clarificante',
      name: 'Clarificante & Floculante Mineral JHoston (Frasco 1L)',
      category: 'CLARIFICANTE',
      dosageAmount: clarifierMl,
      unit: 'ml',
      priceEstimateBrl: clarifierPrice,
      instructions: `Dosar ${clarifierMl}ml à noite com motobomba em recirculação por 15 minutos e repouso por 8 horas.`,
    });

    // 3. Geração do Payload de Checkout PIX Instantâneo
    const pixTxId = `REC-${Date.now().toString(36).toUpperCase()}`;
    const pixCopyAndPaste = `00020126580014BR.GOV.BCB.PIX0136jhostontec@jhostontec.com.br520400005303986540${totalPrice.toFixed(2).replace('.', '')}5802BR5925JHOSTON POOLS TECNOLOGIA6009SAO PAULO62070503***6304ABCD`;

    return NextResponse.json({
      success: true,
      prescriptionId: pixTxId,
      customer: {
        name: customerName || 'Cliente Balcão',
        phone: customerPhone || '',
      },
      diagnosis: {
        lsi: lsiResult.lsi,
        classification: lsiResult.classification,
        isSafe: lsiResult.isSafe,
        substrateType,
        status: lsiResult.isSafe ? 'EQUILIBRADA' : 'CORRECAO_URGENTE',
      },
      items,
      totalAmountBrl: Number(totalPrice.toFixed(2)),
      checkout: {
        pixTxId,
        pixCopyAndPaste,
        pixQrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(pixCopyAndPaste)}`,
        status: 'PENDING_PAYMENT',
      },
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

