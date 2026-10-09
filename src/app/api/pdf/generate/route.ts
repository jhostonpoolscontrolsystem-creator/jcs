import { NextResponse } from 'next/server';
import jsPDF from 'jspdf';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { log_id, pool_id } = body;

    if (!log_id || !pool_id) {
      return NextResponse.json({ error: 'log_id e pool_id são obrigatórios' }, { status: 400 });
    }

    // Busca os dados da manutenção e da piscina
    const { data: log } = await supabase.from('maintenance_logs').select('*').eq('id', log_id).single();
    const { data: pool } = await supabase.from('pools').select('*').eq('id', pool_id).single();

    if (!log || !pool) {
      return NextResponse.json({ error: 'Dados não encontrados' }, { status: 404 });
    }

    // Inicia o jsPDF
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Cabeçalho / Logo (Texto simples simulando Logo para evitar dependência de imagem externa)
    doc.setFontSize(22);
    doc.setTextColor(0, 51, 102); // Azul Escuro
    doc.text('JHOSTON POOLS', 105, 20, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Engenharia em Revestimentos Monolíticos', 105, 26, { align: 'center' });

    doc.setLineWidth(0.5);
    doc.line(20, 32, 190, 32);

    // Título do Documento
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('LAUDO TÉCNICO DE MANUTENÇÃO', 105, 45, { align: 'center' });

    // Informações da Piscina
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('DADOS DO ATIVO', 20, 60);
    
    doc.setFont('helvetica', 'normal');
    doc.text(`Cliente / Nome da Piscina: ${pool.name}`, 20, 68);
    doc.text(`Volume: ${pool.volume_m3} m³`, 20, 75);
    doc.text(`Endereço: ${pool.address || 'Não cadastrado'}`, 20, 82);
    doc.text(`Data da Vistoria: ${new Date(log.created_at).toLocaleDateString('pt-BR')}`, 20, 89);

    // Parâmetros Químicos
    doc.setFont('helvetica', 'bold');
    doc.text('ANÁLISE FÍSICO-QUÍMICA', 20, 105);
    
    doc.setFont('helvetica', 'normal');
    doc.text(`pH Registrado: ${log.ph} (Ideal: 7.4 - 7.6)`, 20, 113);
    doc.text(`Cloro Livre: ${log.chlorine_ppm} ppm (Ideal: 1.0 - 3.0 ppm)`, 20, 120);
    if (log.alkalinity_ppm) {
      doc.text(`Alcalinidade: ${log.alkalinity_ppm} ppm (Ideal: 80 - 120 ppm)`, 20, 127);
    }
    
    // Status e Garantia
    doc.setFont('helvetica', 'bold');
    doc.text('AUDITORIA E GARANTIA', 20, 142);
    
    doc.setFont('helvetica', 'normal');
    if (log.is_audit_flagged) {
      doc.setTextColor(200, 0, 0); // Vermelho
      doc.text(`STATUS: ALERTA (RED ZONE / GARANTIA AFETADA)`, 20, 150);
      doc.text(`Motivo: ${log.flag_reason || 'Violação química'}`, 20, 157);
    } else {
      doc.setTextColor(0, 128, 0); // Verde
      doc.text(`STATUS: NORMAL (GARANTIA ATIVA)`, 20, 150);
      doc.text(`Os parâmetros preservam a integridade do revestimento.`, 20, 157);
    }
    doc.setTextColor(0, 0, 0); // Reset

    // Memória de Cálculo
    if (log.calculation_memory && log.calculation_memory.formula) {
      doc.setFont('helvetica', 'bold');
      doc.text('CONSUMO DE INSUMOS', 20, 172);
      doc.setFont('helvetica', 'normal');
      doc.text(`Dose Aplicada: ${log.calculation_memory.totalDebited} ${log.calculation_memory.unit}`, 20, 180);
      doc.text(`Memória: ${log.calculation_memory.formula}`, 20, 187);
    }

    // Assinatura Técnica
    doc.setLineWidth(0.5);
    doc.line(60, 240, 150, 240);
    doc.setFontSize(10);
    doc.text('Assinatura Eletrônica - JHostonTec Audit', 105, 245, { align: 'center' });
    doc.text(`ID Manutenção: ${log.id}`, 105, 252, { align: 'center' });

    // Gera o Base64 do PDF
    const pdfBase64 = doc.output('datauristring');

    return NextResponse.json({
      success: true,
      pdf_base64: pdfBase64, // Front-end pode baixar via <a> tag
      message: 'PDF gerado com sucesso',
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Falha ao gerar PDF' },
      { status: 500 }
    );
  }
}
