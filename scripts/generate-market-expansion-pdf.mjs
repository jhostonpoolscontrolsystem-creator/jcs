import fs from 'fs';
import path from 'path';
import { jsPDF } from 'jspdf';

console.log('🚀 Gerando Tese de Pivotagem & Expansão de Mercado Aberto (JHPCS -> PoolTech SaaS Global)...');

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4'
});

const pageWidth = 210;
const pageHeight = 297;
const margin = 16;
const contentWidth = pageWidth - (margin * 2);

function drawHeaderFooter(pageNumber, totalPages, title = 'TESE DE EXPANSÃO PARA MERCADO ABERTO • POOLTECH SAAS & ECOSSISTEMA') {
  doc.setFillColor(3, 7, 18); // Slate-950
  doc.rect(0, 0, pageWidth, 20, 'F');
  
  doc.setFillColor(16, 185, 129); // Emerald-500 (Growth/Expansion)
  doc.rect(margin, 18, contentWidth, 1.2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text(title, margin, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text(`Visão Estratégica & Monetização Aberta | Daniel Lopes & Patrícia Grübel`, margin + contentWidth, 12, { align: 'right' });

  doc.setDrawColor(51, 65, 85);
  doc.setLineWidth(0.4);
  doc.line(margin, 284, margin + contentWidth, 284);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Estratégia de Escala B2B/B2C • Da Garantia Proprietária à Plataforma Vertical do Mercado Aquático', margin, 289);
  doc.text(`Página ${pageNumber} de ${totalPages}`, margin + contentWidth, 289, { align: 'right' });
}

// =============================================================================
// PÁGINA 1: A NOVA TESE DE EXPANSÃO, PÚBLICOS E BRANDING WHITE-LABEL
// =============================================================================
doc.setFillColor(248, 250, 252);
doc.rect(0, 0, pageWidth, pageHeight, 'F');
drawHeaderFooter(1, 2);

let y = 28;

doc.setFont('helvetica', 'bold');
doc.setFontSize(15);
doc.setTextColor(15, 23, 42);
doc.text('Pivotagem Estratégica: O JHPCS no Mercado Aberto', margin, y);
y += 6;

doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(71, 85, 105);
doc.text('Como transformar um sistema interno de garantias na maior plataforma vertical (PoolTech) do Brasil.', margin, y);
y += 9;

// Hero Box: A Grande Virada de Chave
doc.setFillColor(241, 245, 249);
doc.roundedRect(margin, y, contentWidth, 30, 3, 3, 'F');
doc.setDrawColor(16, 185, 129);
doc.setLineWidth(0.8);
doc.roundedRect(margin, y, contentWidth, 30, 3, 3, 'D');

doc.setFont('helvetica', 'bold');
doc.setFontSize(10);
doc.setTextColor(5, 150, 105); // Emerald 600
doc.text('DE CONSTRUTORA COM SOFTWARE PARA UMA POOLTECH ABERTA (SAAS VERTICAL)', margin + 5, y + 7);

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(51, 65, 85);
const pivotSummary = 'A JHoston Pools continua usando o sistema para blindar suas garantias de reformas e obras monolíticas, mas o JHPCS agora se posiciona como um ecossistema agnóstico. Qualquer tratador, revenda, empresa de manutenção ou condomínio do Brasil pode adotar o sistema, gerando receita recorrente de assinaturas e marketplace de insumos.';
doc.text(doc.splitTextToSize(pivotSummary, contentWidth - 10), margin + 5, y + 13);

y += 37;

// Bloco 1: Os 4 Novos Clientes do Mercado Aberto
doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.setTextColor(15, 23, 42);
doc.text('1. QUEM SÃO OS CLIENTES PAGANTES NO MERCADO AMPLO?', margin, y);
y += 5;

const personas = [
  '• Tratadores Autônomos & Pequenos Prestadores (B2Solo): Precisam de organização, roteiro de visitas, cobrança automática e relatórios profissionais no WhatsApp para valorizar seu serviço e cobrar mais caro dos donos de piscina.',
  '• Empresas de Manutenção & Facilities (B2B): Cuidam de dezenas de condomínios, academias e hotéis. Precisam de geolocalização dos técnicos, controle de escala de visitas, laudo sanitário para a Anvisa e relatórios automáticos.',
  '• Lojas & Revendas de Piscinas (B2Trade): Querem reter o cliente que leva água para testar no balcão. O sistema gera a "Receita da Água" e a lista de produtos a serem comprados, aumentando o ticket médio do balcão.',
  '• Condomínios & Síndicos Profissionais (B2Gov): Exigem transparência, controle de custos de cloro e proteção contra deterioração do patrimônio coletivo com conformidade sanitária.'
];

personas.forEach(p => {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const splitted = doc.splitTextToSize(p, contentWidth - 4);
  doc.text(splitted, margin + 2, y);
  y += (splitted.length * 4) + 1.5;
});

y += 4;

// Bloco 2: O Poder do White-Label & Agnóstico a Substratos
doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.setTextColor(14, 116, 144);
doc.text('2. EVOLUÇÃO DE PRODUTO: AGNOSTICISMO A SUBSTRATOS & WHITE-LABEL', margin, y);
y += 5;

const evolutionPoints = [
  '• Multi-Substrato (Não apenas Areia/Monolítico): O motor ISL agora deve calibrar o cálculo químico para Vinil, Fibra de Vidro, Pastilha e Alvenaria Tradicional. Cada material tem uma tolerância diferente de pH e agressividade ácida.',
  '• White-Label para Empresas Parceiras: A empresa de manutenção coloca seu próprio logotipo e número de WhatsApp no relatório gerado pelo PWA de campo. "Powered by JHPCS Core Engine".',
  '• Isolamento Total Multi-Tenant: Empresas concorrentes usam o mesmo software em instâncias isoladas no Supabase, garantindo que a carteira de clientes de cada uma permaneça sob absoluto sigilo.'
];

evolutionPoints.forEach(ep => {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const splitted = doc.splitTextToSize(ep, contentWidth - 4);
  doc.text(splitted, margin + 2, y);
  y += (splitted.length * 4) + 1.5;
});

// =============================================================================
// PÁGINA 2: MODELO DE MONETIZAÇÃO, FLYWHEEL E ROADMAP DE EXECUÇÃO
// =============================================================================
doc.addPage();
doc.setFillColor(248, 250, 252);
doc.rect(0, 0, pageWidth, pageHeight, 'F');
drawHeaderFooter(2, 2);

y = 28;

doc.setFont('helvetica', 'bold');
doc.setFontSize(14);
doc.setTextColor(15, 23, 42);
doc.text('Modelo de Monetização & O Efeito Flywheel de Escala', margin, y);
y += 6;

doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(71, 85, 105);
doc.text('Como faturar com assinaturas SaaS e comissões de insumos em todo o território nacional.', margin, y);
y += 8;

// Tabela de Planos de Mercado Aberto
doc.setFillColor(15, 23, 42);
doc.rect(margin, y, contentWidth, 8, 'F');

doc.setFont('helvetica', 'bold');
doc.setFontSize(8);
doc.setTextColor(255, 255, 255);
doc.text('PLANO SAAS', margin + 3, y + 5.5);
doc.text('PÚBLICO-ALVO', margin + 35, y + 5.5);
doc.text('PREÇO SUGERIDO', margin + 85, y + 5.5);
doc.text('RECURSOS CHAVE', margin + 125, y + 5.5);

y += 8;

const pricingTiers = [
  {
    tier: 'Plano SOLO Free',
    target: 'Piscineiro Iniciante',
    price: 'R$ 0,00',
    features: 'Até 5 piscinas, app PWA offline, envio de comprovante no WhatsApp.'
  },
  {
    tier: 'Plano PRO Solo',
    target: 'Tratador Profissional',
    price: 'R$ 49,90 / mês',
    features: 'Piscinas ilimitadas, logo próprio nos relatórios, histórico de fita com IA.'
  },
  {
    tier: 'Plano FLEET Pro',
    target: 'Empresas de Limpeza',
    price: 'R$ 199,00 / mês',
    features: 'Até 5 técnicos, roteirização GPS, controle de dosagens e painel de gestão.'
  },
  {
    tier: 'Plano ENTERPRISE',
    target: 'Hotéis, Clubes, Lojas',
    price: 'R$ 490,00 / mês',
    features: 'Logbook vigilância sanitária, múltiplos tanques, receituário de balcão e API.'
  }
];

pricingTiers.forEach((pt, idx) => {
  const isEven = idx % 2 === 0;
  doc.setFillColor(isEven ? 255 : 241, isEven ? 255 : 245, isEven ? 255 : 249);
  doc.rect(margin, y, contentWidth, 12, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, y + 12, margin + contentWidth, y + 12);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text(pt.tier, margin + 3, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(pt.target, margin + 35, y + 5);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(5, 150, 105);
  doc.text(pt.price, margin + 85, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  const splittedFeat = doc.splitTextToSize(pt.features, 65);
  doc.text(splittedFeat, margin + 125, y + 4.5);

  y += 12;
});

y += 8;

// O Flywheel de Monetização
doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.setTextColor(15, 23, 42);
doc.text('3. O VOLANTE DE CRESCIMENTO (THE POOLTECH FLYWHEEL)', margin, y);
y += 5;

const flywheel = [
  '1. Adoção na Base (Piscineiros): O app grátis de campo atrai tratadores que precisam de uma ferramenta simples para o dia a dia.',
  '2. Conexão com Clientes Finais: O tratador envia relatórios bem diagramados com link de transparência para síndicos e proprietários.',
  '3. Demanda por Insumos e Peças: Ao diagnosticar o desequilíbrio da água, o app sugere o produto exato e gera pedidos com comissão para a plataforma.',
  '4. Canal de Obras e Reformas de Alta Margem: A plataforma identifica piscinas antigas com vazamentos crônicos ou revestimentos degradados e direciona os leads quentes para a equipe de engenharia de reformas da JHoston!'
];

flywheel.forEach(fw => {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const splitted = doc.splitTextToSize(fw, contentWidth - 4);
  doc.text(splitted, margin + 2, y);
  y += (splitted.length * 4) + 1.5;
});

y += 4;

// Bloco Conclusivo
doc.setFillColor(236, 253, 245);
doc.roundedRect(margin, y, contentWidth, 24, 3, 3, 'F');
doc.setDrawColor(16, 185, 129);
doc.setLineWidth(0.6);
doc.roundedRect(margin, y, contentWidth, 24, 3, 3, 'D');

doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(6, 95, 70);
doc.text('IMPACTO NA ESTRATÉGIA DA JHOSTON POOLS & LAGOONS:', margin + 5, y + 6);

doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.setTextColor(4, 120, 87);
const concText = 'Essa expansão não enfraquece a garantia das reformas da JHoston; pelo contrário, transforma o JHPCS na maior vitrine e canal de atração de clientes do país. Em vez de esperar clientes pedirem orçamento de reforma, o sistema já estará instalado no bolso de milhares de piscineiros identificando quem precisa de obra!';
doc.text(doc.splitTextToSize(concText, contentWidth - 10), margin + 5, y + 11);

const outputPdfPath = path.resolve('public', 'TESE_EXPANSAO_MERCADO_ABERTO_JHPCS.pdf');
const pdfBytes = doc.output('arraybuffer');
fs.writeFileSync(outputPdfPath, Buffer.from(pdfBytes));

console.log(`✅ Documento executivo de mercado aberto gerado em: ${outputPdfPath}`);
