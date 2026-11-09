import fs from 'fs';
import path from 'path';
import { jsPDF } from 'jspdf';

console.log('🚀 Gerando Master Plan de Evolução & Expansão de Mercado (JHPCS -> PoolTech Global)...');

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4'
});

const pageWidth = 210;
const pageHeight = 297;
const margin = 15;
const contentWidth = pageWidth - (margin * 2);

function drawHeaderFooter(pageNumber, totalPages, title = 'PLANO DIRETOR EVOLUTIVO • JHPCS POOLTECH PLATFORM') {
  // Top Banner
  doc.setFillColor(3, 7, 18); // Slate 950
  doc.rect(0, 0, pageWidth, 20, 'F');
  
  doc.setFillColor(6, 182, 212); // Cyan 500
  doc.rect(margin, 18, contentWidth, 1.2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text(title, margin, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text(`Evolução Estratégica & Arquitetura SaaS | Daniel Lopes & Patrícia Grübel`, margin + contentWidth, 12, { align: 'right' });

  // Bottom Line
  doc.setDrawColor(51, 65, 85);
  doc.setLineWidth(0.4);
  doc.line(margin, 284, margin + contentWidth, 284);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('JHPCS: Da Garantia Proprietária à Plataforma Operacional do Setor Aquático Nacional', margin, 289);
  doc.text(`Página ${pageNumber} de ${totalPages}`, margin + contentWidth, 289, { align: 'right' });
}

// =============================================================================
// PÁGINA 1: A NOVA TESE EXPANDIDA & O NOVO MAPA DE BENCHMARKING
// =============================================================================
doc.setFillColor(248, 250, 252);
doc.rect(0, 0, pageWidth, pageHeight, 'F');
drawHeaderFooter(1, 3);

let y = 28;

doc.setFont('helvetica', 'bold');
doc.setFontSize(15);
doc.setTextColor(15, 23, 42);
doc.text('Plano Diretor Evolutivo: JHPCS PoolTech Platform', margin, y);
y += 5.5;

doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(71, 85, 105);
doc.text('A transição de um sistema de garantia proprietário para o Sistema Operacional definitivo do mercado de piscinas.', margin, y);
y += 8.5;

// Hero Box: A Tese Unificada
doc.setFillColor(241, 245, 249);
doc.roundedRect(margin, y, contentWidth, 29, 3, 3, 'F');
doc.setDrawColor(6, 182, 212);
doc.setLineWidth(0.8);
doc.roundedRect(margin, y, contentWidth, 29, 3, 3, 'D');

doc.setFont('helvetica', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(14, 116, 144);
doc.text('A NOVA TESE ESTRATÉGICA: O SISTEMA OPERACIONAL DA CADEIA AQUÁTICA', margin + 5, y + 6.5);

doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.setTextColor(51, 65, 85);
const teseText = 'O JHPCS evolui de uma ferramenta interna da JHoston para se tornar a infraestrutura digital que conecta: Fabricantes/Reformadores (Garantia Pericial ISL), Tratadores de Campo (App PWA sem atrito), Lojas de Piscinas (Receituário de Balcão e Venda Expressa) e Condomínios/Clubes (Logbook Sanitário Anvisa). A JHoston mantém a soberania técnica e utiliza a base nacional como canal de originação de reformas de alto valor.';
doc.text(doc.splitTextToSize(teseText, contentWidth - 10), margin + 5, y + 12.5);

y += 35;

// Benchmarking Revisitado com Visão de Mercado Aberto
doc.setFont('helvetica', 'bold');
doc.setFontSize(10.5);
doc.setTextColor(15, 23, 42);
doc.text('1. BENCHMARKING DE MERCADO: ONDE O JHPCS VENCE CADA CONCORRENTE', margin, y);
y += 5;

// Tabela de Benchmarking
doc.setFillColor(15, 23, 42);
doc.rect(margin, y, contentWidth, 7, 'F');

doc.setFont('helvetica', 'bold');
doc.setFontSize(7.5);
doc.setTextColor(255, 255, 255);
doc.text('SOLUÇÃO', margin + 3, y + 4.8);
doc.text('PÚBLICO-ALVO', margin + 30, y + 4.8);
doc.text('GAP DO CONCORRENTE', margin + 75, y + 4.8);
doc.text('DIFERENCIAL DECISIVO JHPCS', margin + 125, y + 4.8);

y += 7;

const benchRows = [
  { name: 'AquApp', target: 'Piscineiros Solo', gap: 'Financeiro básico; sem químico ou balcão', diff: 'Cálculo ISL rigoroso + Laudo com fotos' },
  { name: 'PiscinApp / PRO', target: 'Tratadores', gap: 'Leitura de fita isolada; sem roteirização', diff: 'Conecta diagnóstico à recompra imediata' },
  { name: 'Poolloop', target: 'Técnicos & Lojas', gap: 'Genérico; sem prontuário de substrato', diff: 'Prontuário vitalício multi-substrato' },
  { name: 'Servicfy', target: 'Prestadores OS', gap: 'Agnóstico a serviços; sem química de água', diff: '100% nativo para engenharia aquática' },
  { name: 'App PSS', target: 'Operações Campo', gap: 'Sem inteligência de reposição de químicos', diff: 'Baixa estequiométrica automática por m³' },
  { name: 'Blue Connect', target: 'IoT Clubes', gap: 'Hardware caro; inacessível a residências', diff: 'Modelo Híbrido (IoT opcional + App/Fita)' },
  { name: 'Evolutivo ERP', target: 'Lojas / Revendas', gap: 'Preso no caixa; desconectado da piscina', diff: 'Receituário de balcão integrado ao técnico' }
];

benchRows.forEach((r, idx) => {
  const isEven = idx % 2 === 0;
  doc.setFillColor(isEven ? 255 : 241, isEven ? 255 : 245, isEven ? 255 : 249);
  doc.rect(margin, y, contentWidth, 9, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, y + 9, margin + contentWidth, y + 9);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(15, 23, 42);
  doc.text(r.name, margin + 3, y + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(r.target, margin + 30, y + 5.5);
  doc.text(doc.splitTextToSize(r.gap, 48), margin + 75, y + 4);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(14, 116, 144);
  doc.text(doc.splitTextToSize(r.diff, 50), margin + 125, y + 4);

  y += 9;
});

y += 6;

// Os 4 Pilares de Expansão
doc.setFont('helvetica', 'bold');
doc.setFontSize(10.5);
doc.setTextColor(15, 23, 42);
doc.text('2. OS 4 PILARES DA PLATAFORMA DE MERCADO ABERTO', margin, y);
y += 4.5;

const pillars = [
  '• Pilar A: Engenharia & Perícia (Core JHoston): Mantém o Prontuário Vitalício, o motor ISL (-0.3 a +0.3) e os laudos com validade jurídica para construtoras e reformas.',
  '• Pilar B: JHPCS Campo (PWA Multi-Substrato): App leve (jhpcs-campo), offline-first com calibração química para Vinil, Fibra, Pastilha e Revestimento de Areia.',
  '• Pilar C: Facility & Frotas (Condomínios/Clubes): Geofencing por GPS, baixa estequiométrica automática e Logbook Sanitário exigido pela Vigilância.',
  '• Pilar D: Trade & Receituário (Lojas/Revendas): "Receituário Digital de Balcão" com conversão direta do desequilíbrio da água em carrinho de compras PIX.'
];

pillars.forEach(p => {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  const splitted = doc.splitTextToSize(p, contentWidth - 4);
  doc.text(splitted, margin + 2, y);
  y += (splitted.length * 3.8) + 1;
});

// =============================================================================
// PÁGINA 2: ARQUITETURA MODULAR REFINADA & MONETIZAÇÃO
// =============================================================================
doc.addPage();
doc.setFillColor(248, 250, 252);
doc.rect(0, 0, pageWidth, pageHeight, 'F');
drawHeaderFooter(2, 3);

y = 28;

doc.setFont('helvetica', 'bold');
doc.setFontSize(14);
doc.setTextColor(15, 23, 42);
doc.text('Refinamento dos Módulos Operacionais', margin, y);
y += 5.5;

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(71, 85, 105);
doc.text('Como os 4 módulos originais foram aprimorados para evitar complexidade excessiva e maximizar receita.', margin, y);
y += 8;

const modules = [
  {
    title: 'MÓDULO 1: JHOSTON GUARANTEE & FORENSIC ENGINE (PERICIAL)',
    color: [14, 116, 144],
    desc: 'O ativo central da plataforma. Atende tanto piscinas reformadas pela JHoston quanto obras de outras construtoras que contratam a certificação pericial.',
    items: [
      '• Prontuário Vitalício com Plaqueta QR/NFC permanente na casa de máquinas.',
      '• Algoritmo de Langelier com tolerância calibrada por substrato (fibra, pastilha ou monólito).',
      '• Bloqueio automático de garantia perante uso de ácido muriático ou pH ácido contínuo.',
      '• Laudo Pericial Unificado em PDF (A4) com carimbo de tempo, IP e GPS para disputas judiciais.'
    ]
  },
  {
    title: 'MÓDULO 2: JHPCS CAMPO (TRATADORES AUTÔNOMOS E EQUIPES)',
    color: [16, 185, 129],
    desc: 'O app no bolso do piscineiro, agora isolado e hiperveloz em jhpcs-campo.vercel.app.',
    items: [
      '• Operação 100% Offline com IndexedDB nativo (sincroniza sozinho ao sair da casa de máquinas).',
      '• Checklist em 90 segundos: Foto do antes/depois, fita de pH/cloro e confirmação de escovação.',
      '• Relatório VIP no WhatsApp do proprietário/síndico (comprovante profissional de serviço).',
      '• White-label: Pequenos prestadores podem colocar sua logomarca no cabeçalho do relatório.'
    ]
  },
  {
    title: 'MÓDULO 3: FLEET & FACILITY (FROTAS, CLUBES E HOTÉIS)',
    color: [139, 92, 246],
    desc: 'Gestão de múltiplos ativos para grandes condomínios, resorts e empresas de limpeza.',
    items: [
      '• Baixa Estequiométrica de Estoque: Elimina a bipagem manual de frascos. A dosagem de 100m³ deduz automaticamente a quantidade calculada de químicos do estoque volante.',
      '• Geofencing de Segurança: Check-in automático por raio de 50m da coordenada GPS da piscina.',
      '• Logbook Digital Sanitário: Histórico de medições por turno em conformidade com as normas da Anvisa e Secretarias de Saúde, substituindo os livros de papel.'
    ]
  },
  {
    title: 'MÓDULO 4: TRADE & RECEITUÁRIO DE BALCÃO (LOJAS E REPOSIÇÃO)',
    color: [245, 158, 11],
    desc: 'A evolução inteligente do PDV: em vez de construir um ERP fiscal complexo, focamos na conversão.',
    items: [
      '• Receituário da Água: O balconista insere os parâmetros da amostra trazida pelo cliente e o sistema gera na hora a "Prescrição Química Exata" por m³.',
      '• Checkout Expresso via PIX: Geração de QR Code dinâmico na tela do balcão para pagamento imediato.',
      '• Reposição Automatizada de Insumos: Previsão de quando o cloro do condomínio vai acabar, disparando lembrete de recompra no WhatsApp do síndico.'
    ]
  }
];

modules.forEach(m => {
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, y, contentWidth, 43, 2, 2, 'F');
  doc.setDrawColor(...m.color);
  doc.setLineWidth(0.6);
  doc.roundedRect(margin, y, contentWidth, 43, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...m.color);
  doc.text(m.title, margin + 4, y + 6);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(m.desc, margin + 4, y + 11);

  let itemY = y + 16;
  m.items.forEach(it => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);
    doc.text(it, margin + 4, itemY);
    itemY += 5.5;
  });

  y += 47;
});

// =============================================================================
// PÁGINA 3: INFRAESTRUTURA DE ESCALA, SEGURANÇA E MATRIZ DE PRECIFICAÇÃO
// =============================================================================
doc.addPage();
doc.setFillColor(248, 250, 252);
doc.rect(0, 0, pageWidth, pageHeight, 'F');
drawHeaderFooter(3, 3);

y = 28;

doc.setFont('helvetica', 'bold');
doc.setFontSize(14);
doc.setTextColor(15, 23, 42);
doc.text('Infraestrutura de Escala & Modelo de Receita', margin, y);
y += 5.5;

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(71, 85, 105);
doc.text('Evolução da arquitetura tecnológica: como sair do Free Tier para uma operação comercial robusta.', margin, y);
y += 8;

// Matriz de Transição Tecnológica
doc.setFillColor(15, 23, 42);
doc.rect(margin, y, contentWidth, 7, 'F');

doc.setFont('helvetica', 'bold');
doc.setFontSize(7.5);
doc.setTextColor(255, 255, 255);
doc.text('CAMADA', margin + 3, y + 4.8);
doc.text('FASE INICIAL (TIER FREE)', margin + 35, y + 4.8);
doc.text('ESCALA DE MERCADO ABERTO', margin + 95, y + 4.8);
doc.text('IMPACTO COMERCIAL', margin + 145, y + 4.8);

y += 7;

const stackRows = [
  { layer: 'Front & PWA', free: 'Vercel Hobby (R$ 0)', scale: 'Vercel Pro ($20/mês)', impact: 'Domínio próprio e SLA 99.9%' },
  { layer: 'Banco & Auth', free: 'Supabase Free (KeepAlive)', scale: 'Supabase Pro ($25/mês)', impact: 'Sem pausa de inatividade + Backups' },
  { layer: 'Armazenamento', free: 'Cloudflare R2 (10GB Free)', scale: 'Cloudflare R2 Pay-as-you-go', impact: 'Egress zero mesmo com 1M fotos' },
  { layer: 'WhatsApp SLA', free: 'Evolution API (1 Chip SIM)', scale: 'Evolution + Meta Cloud API Fallback', impact: 'Imunidade a bloqueios em massa' },
  { layer: 'Engine ISL', free: 'Next.js Server Actions', scale: 'Edge Functions distribuídas', impact: 'Latência < 50ms na ponta' }
];

stackRows.forEach((sr, idx) => {
  const isEven = idx % 2 === 0;
  doc.setFillColor(isEven ? 255 : 241, isEven ? 255 : 245, isEven ? 255 : 249);
  doc.rect(margin, y, contentWidth, 8, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, y + 8, margin + contentWidth, y + 8);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(15, 23, 42);
  doc.text(sr.layer, margin + 3, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(sr.free, margin + 35, y + 5);
  doc.text(sr.scale, margin + 95, y + 5);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(14, 116, 144);
  doc.text(sr.impact, margin + 145, y + 5);

  y += 8;
});

y += 7;

// Planos de Monetização
doc.setFont('helvetica', 'bold');
doc.setFontSize(10.5);
doc.setTextColor(15, 23, 42);
doc.text('3. OS 4 PLANOS COMERCIAIS DE MERCADO ABERTO', margin, y);
y += 4.5;

const plans = [
  '• PLANO SOLO FREE (R$ 0): Até 5 piscinas monitoradas. App PWA de campo offline e envio de comprovante no WhatsApp. Objetivo: Atração massiva de tratadores em todo o Brasil (topo do funil).',
  '• PLANO PRO TRATADOR (R$ 49,90 / mês): Piscinas ilimitadas, leitura ótica de fitas com IA, logo próprio nos relatórios e cálculo automático de dosagem por substrato.',
  '• PLANO FLEET EMPRESAS (R$ 199,00 / mês): Até 5 operadores de campo, roteirização com GPS, baixa estequiométrica de estoque volante e painel de supervisão em tempo real.',
  '• PLANO ENTERPRISE / RESORTS (R$ 490,00 / mês): Múltiplos tanques, conformidade sanitária Anvisa, laudos periciais unificados e canal de originação de reformas de alto valor.'
];

plans.forEach(pl => {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  const splitted = doc.splitTextToSize(pl, contentWidth - 4);
  doc.text(splitted, margin + 2, y);
  y += (splitted.length * 3.8) + 1;
});

y += 4;

// O Flywheel da Construtora JHoston
doc.setFillColor(236, 253, 245);
doc.roundedRect(margin, y, contentWidth, 30, 2.5, 2.5, 'F');
doc.setDrawColor(16, 185, 129);
doc.setLineWidth(0.6);
doc.roundedRect(margin, y, contentWidth, 30, 2.5, 2.5, 'D');

doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(6, 95, 70);
doc.text('O GRANDE GANHO PARA A JHOSTON POOLS & REFORMAS:', margin + 4, y + 6);

doc.setFont('helvetica', 'normal');
doc.setFontSize(7.5);
doc.setTextColor(4, 120, 87);
const finalVision = 'Enquanto concorrentes de SaaS sobrevivem apenas da mensalidade de R$ 49, a JHoston possui a maior máquina de geração de leads de reformas do país. Quando um tratador cadastrar no sistema uma piscina de clube ou condomínio com azulejos desplacando, o JHPCS gera um alerta de oportunidade para o time de engenharia da JHoston oferecer a conversão para Revestimento Monolítico Sand/Quartzo, fechando contratos de R$ 50.000 a R$ 250.000 com custo de aquisição (CAC) próximo de zero!';
doc.text(doc.splitTextToSize(finalVision, contentWidth - 8), margin + 4, y + 12);

// Salva o PDF no disco
const outputPdfPath = path.resolve('public', 'PLANO_DIRETOR_JHPCS_POOLTECH_GLOBAL.pdf');
const pdfBytes = doc.output('arraybuffer');
fs.writeFileSync(outputPdfPath, Buffer.from(pdfBytes));

console.log(`✅ Master Plan consolidado em PDF gerado em: ${outputPdfPath}`);
