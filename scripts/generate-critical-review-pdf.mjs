import fs from 'fs';
import path from 'path';
import { jsPDF } from 'jspdf';

console.log('🚀 Gerando Relatório Crítico e Parecer Estratégico (Plano Diretor JHPCS)...');

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4'
});

const pageWidth = 210;
const pageHeight = 297;
const margin = 16;
const contentWidth = pageWidth - (margin * 2);

function drawHeaderFooter(pageNumber, totalPages, title = 'PARECER CRÍTICO & EVOLUÇÃO ESTRATÉGICA • JHPCS ECOSYSTEM') {
  // Top Banner Bar
  doc.setFillColor(3, 7, 18); // Slate-950
  doc.rect(0, 0, pageWidth, 20, 'F');
  
  doc.setFillColor(6, 182, 212); // Cyan-500
  doc.rect(margin, 18, contentWidth, 1.2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text(title, margin, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text(`Doc Ref: JHPCS-DIR-2026-REV1 | Daniel Lopes & Patrícia Grübel`, margin + contentWidth, 12, { align: 'right' });

  // Bottom Line
  doc.setDrawColor(51, 65, 85);
  doc.setLineWidth(0.4);
  doc.line(margin, 284, margin + contentWidth, 284);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Avaliação Arquitetural & Viabilidade Econômica • JHoston Pools & Lagoons', margin, 289);
  doc.text(`Página ${pageNumber} de ${totalPages}`, margin + contentWidth, 289, { align: 'right' });
}

// =============================================================================
// PÁGINA 1: AVALIAÇÃO GERAL, PONTOS FORTES E CRÍTICAS DE RISCO
// =============================================================================
doc.setFillColor(248, 250, 252); // Fundo Slate-50 leve
doc.rect(0, 0, pageWidth, pageHeight, 'F');
drawHeaderFooter(1, 2);

let y = 28;

// Título Principal
doc.setFont('helvetica', 'bold');
doc.setFontSize(16);
doc.setTextColor(15, 23, 42); // Slate-900
doc.text('Análise Crítica do Plano Diretor de Evolução do JHPCS', margin, y);
y += 6;

doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(71, 85, 105);
doc.text('Diagnóstico profundo da tese de produto, expansão modular (PDV/Frotas) e viabilidade da Stack Custo Zero.', margin, y);
y += 10;

// Hero Box: Veredito Executivo
doc.setFillColor(241, 245, 249);
doc.roundedRect(margin, y, contentWidth, 26, 3, 3, 'F');
doc.setDrawColor(6, 182, 212);
doc.setLineWidth(0.8);
doc.roundedRect(margin, y, contentWidth, 26, 3, 3, 'D');

doc.setFont('helvetica', 'bold');
doc.setFontSize(10);
doc.setTextColor(14, 116, 144); // Cyan 700
doc.text('★ VEREDITO EXECUTIVO: EXCELENTE POSICIONAMENTO, MAS COM RISCO DE DISPERSÃO (FEATURE CREEP)', margin + 5, y + 7);

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(51, 65, 85);
const summaryText = 'O documento é brilhante ao identificar que NENHUM concorrente de mercado liga a fabricação e garantia monolítica à ponta de campo. Contudo, tentar virar um ERP de Varejo (PDV) e Gestão de Frotas ao mesmo tempo pode desviar a JHoston do seu "Moat" (vantagem competitiva inegociável): a Blindagem Forense da Garantia Decenal.';
doc.text(doc.splitTextToSize(summaryText, contentWidth - 10), margin + 5, y + 13);

y += 33;

// Bloco 1: O Que Está Impecável (Pontos Fortes)
doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.setTextColor(16, 185, 129); // Emerald 600
doc.text('1. O QUE ESTÁ BRILHANTE (ACERTOS ESTRATÉGICOS RAROS NO MERCADO)', margin, y);
y += 5;

const strengths = [
  '• Foco no Moat Pericial (ISL + Prontuário): Nenhum app comercial (AquApp, PiscinApp) calcula o Índice de Langelier para proteger o cimento/gelcoat da piscina. Isso cria autoridade forense indiscutível.',
  '• Arquitetura Multi-Tenant com Boundary Rígido: O piscineiro como prestador do cliente (e não empregado da JHoston) elimina qualquer passivo trabalhista e protege segredos comerciais entre resorts concorrentes.',
  '• Desacoplamento JHPCS-Campo (PWA Isolado): Decisão acertada de manter o app do tratador em subdomínio leve (jhpcs-campo), garantindo funcionamento em 3G/4G na beira da piscina.',
  '• Adoção do Cloudflare R2 com Egress Gratuito: Substituição perfeita para o Supabase Storage em fotos pesadas, reduzindo a zero o risco de cobranças astronômicas de transferência de imagens.'
];

strengths.forEach(st => {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const splitted = doc.splitTextToSize(st, contentWidth - 4);
  doc.text(splitted, margin + 2, y);
  y += (splitted.length * 4) + 1.5;
});

y += 4;

// Bloco 2: Alertas Críticos e Riscos do Documento
doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.setTextColor(225, 29, 72); // Rose 600
doc.text('2. CRÍTICAS & PONTOS DE ATENÇÃO (ONDE O PLANO PODE ENGASGAR)', margin, y);
y += 5;

const risks = [
  '• A Armadilha do ERP/PDV Varejista (Módulo 4): Construir Frente de Caixa (NFC-e, TEF, leitor de código de barras, devoluções) é um ralo infinito de horas de desenvolvimento e suporte fiscal. A JHoston deve ser uma Concessionária de Engenharia, e não competir com Bling, Tiny ou Totvs.',
  '• Ilusão da "Stack 100% Custo Zero" em Produção: A Oracle Cloud Free Tier e o Supabase Free possuem limitações drásticas de Cold Starts, pausas de inatividade a cada 7 dias e risco de instabilidade sem SLA. Para atender redes como Fasano e Terravista, um plano Pro ($25/mês) é obrigatório.',
  '• Risco Operacional da Evolution API no Chip SIM Pré-Pago: Chip de operadora em WhatsApp comum sofre bloqueio por SPAM se disparar relatórios em massa. É crucial ter contingência com a Cloud API Oficial da Meta.',
  '• Complexidade Excessiva de Frotas e Estoque Volante (Módulo 3): O piscineiro não terá paciência para bipar frasco de cloro dentro da caminhonete. A baixa deve ser estequiométrica automática pelo m³ da piscina dosada.'
];

risks.forEach(rk => {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const splitted = doc.splitTextToSize(rk, contentWidth - 4);
  doc.text(splitted, margin + 2, y);
  y += (splitted.length * 4) + 1.5;
});

// =============================================================================
// PÁGINA 2: RECOMENDAÇÕES PRÁTICAS, ROADMAP & PLANO DE AÇÃO
// =============================================================================
doc.addPage();
doc.setFillColor(248, 250, 252);
doc.rect(0, 0, pageWidth, pageHeight, 'F');
drawHeaderFooter(2, 2);

y = 28;

doc.setFont('helvetica', 'bold');
doc.setFontSize(14);
doc.setTextColor(15, 23, 42);
doc.text('Recomendações Práticas e Roadmap de Evolução', margin, y);
y += 6;

doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(71, 85, 105);
doc.text('Como transformar o plano diretor em execução cirúrgica sem inflar a complexidade do sistema.', margin, y);
y += 8;

// Matriz de Ajuste de Rota (Tabela Comparativa)
doc.setFillColor(15, 23, 42); // Header escuro
doc.rect(margin, y, contentWidth, 8, 'F');

doc.setFont('helvetica', 'bold');
doc.setFontSize(8);
doc.setTextColor(255, 255, 255);
doc.text('MÓDULO PROPOSTO', margin + 3, y + 5.5);
doc.text('PROPOSTA ORIGINAL', margin + 45, y + 5.5);
doc.text('AJUSTE RECOMENDADO (DIRETORIA JHOSTON)', margin + 105, y + 5.5);

y += 8;

const tableRows = [
  {
    mod: 'Módulo 1: Guarantee',
    orig: 'Prontuário + Motor ISL + Laudo',
    recom: 'MANTER 100%. É o coração do negócio. Adicionar laudo pericial exportável para contestação judicial de garantias.'
  },
  {
    mod: 'Módulo 2: JHPCS Solo',
    orig: 'PWA Offline + Dosagem + WhatsApp',
    recom: 'MANTER E ACELERAR. Já está isolado em jhpcs-campo.vercel.app. Foco em UX de 90 segundos na beira da piscina.'
  },
  {
    mod: 'Módulo 3: Fleet & Facility',
    orig: 'Geofencing + Estoque Volante no carro',
    recom: 'SIMPLIFICAR. Trocar bipagem manual por baixa automática estequiométrica: "Piscina de 100m³ dosada = -1.5kg de barrilha baixado do lote".'
  },
  {
    mod: 'Módulo 4: Retail & PDV',
    orig: 'Frente de Caixa (PDV) completo',
    recom: 'REDIRECIONAR. Não criar PDV fiscal. Criar um "Receituário Digital & Recompra": o sistema gera a lista de insumos com link PIX dinâmico.'
  }
];

tableRows.forEach((r, idx) => {
  const isEven = idx % 2 === 0;
  doc.setFillColor(isEven ? 255 : 241, isEven ? 255 : 245, isEven ? 255 : 249);
  doc.rect(margin, y, contentWidth, 14, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, y + 14, margin + contentWidth, y + 14);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text(r.mod, margin + 3, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  const splittedOrig = doc.splitTextToSize(r.orig, 55);
  doc.text(splittedOrig, margin + 45, y + 5);

  doc.setTextColor(14, 116, 144);
  const splittedRecom = doc.splitTextToSize(r.recom, 70);
  doc.text(splittedRecom, margin + 105, y + 5);

  y += 14;
});

y += 8;

// Bloco 4: As 5 Sugestões de Próxima Geração (Next-Gen Features)
doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.setTextColor(14, 116, 144);
doc.text('3. AS 5 RECOMENDAÇÕES DE OURO PARA O ROADMAP (2026/2027)', margin, y);
y += 5;

const futureSuggestions = [
  '1. Pedido de Recompra Inteligente via PIX: Ao detectar cloro ou alcalinidade cronicamente baixa, o sistema sugere o "Kit de Equilíbrio Mineral JHoston" com botão no WhatsApp com PIX Copia e Cola instantâneo.',
  '2. QR Code de Ativação Metálico com NFC Integrado: Em vez de adesivo de papel, oferecer plaqueta metálica com Tag NFC gravada para encostar o celular e abrir jhpcs-campo.vercel.app em hotéis de ultra luxo.',
  '3. Selo de Conformidade Sanitária para Resorts: Gerar selo dinâmico para colocar na recepção do hotel ou site: "Água Certificada com Balanço Mineral Monitorado por JHoston Pools & Lagoons".',
  '4. Integração com WhatsApp Oficial Meta (Cloud API como Fallback): Manter Evolution API para mensagens operacionais baratas, mas chavear para a Cloud API Oficial em alertas graves de garantia para evitar bloqueio.',
  '5. Precificação por Piscina Monitorada (SaaS Híbrido): Cobrar R$ 0 de software para quem compra insumos homologados JHoston, e R$ 49/mês por tanque para clientes que compram químicos em lojas genéricas.'
];

futureSuggestions.forEach(sug => {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const splitted = doc.splitTextToSize(sug, contentWidth - 4);
  doc.text(splitted, margin + 2, y);
  y += (splitted.length * 4) + 2;
});

y += 4;
// Caixa de Conclusão Final
doc.setFillColor(236, 253, 245); // Emerald-50
doc.roundedRect(margin, y, contentWidth, 20, 3, 3, 'F');
doc.setDrawColor(16, 185, 129);
doc.setLineWidth(0.6);
doc.roundedRect(margin, y, contentWidth, 20, 3, 3, 'D');

doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(6, 95, 70); // Emerald 800
doc.text('SÍNTESE PARA A DIRETORIA EXECUTIVA:', margin + 5, y + 6);

doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.setTextColor(4, 120, 87);
doc.text('O Plano Diretor consolida a JHoston como a única autoridade técnica e legal em revestimentos monolíticos do Brasil. O segredo do sucesso não é construir um ERP gigante, mas sim dominar a estequiometria da água e transformar o laudo pericial na maior alavanca de venda e fidelização da empresa.', margin + 5, y + 12);

// Salva o PDF no disco
const outputPdfPath = path.resolve('public', 'PARECER_CRITICO_PLANO_DIRETOR_JHPCS.pdf');
const pdfBytes = doc.output('arraybuffer');
fs.writeFileSync(outputPdfPath, Buffer.from(pdfBytes));

console.log(`✅ Parecer crítico em PDF gerado com sucesso em: ${outputPdfPath}`);

