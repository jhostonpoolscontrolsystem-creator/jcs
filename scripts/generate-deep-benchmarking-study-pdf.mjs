import fs from 'fs';
import path from 'path';
import { jsPDF } from 'jspdf';

console.log('🚀 Gerando Estudo Profundo de Benchmarking, Unificação e Roadmap de Transição...');

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4'
});

const pageWidth = 210;
const pageHeight = 297;
const margin = 14;
const contentWidth = pageWidth - (margin * 2);

function drawHeaderFooter(pageNumber, totalPages, title = 'ESTUDO DE BENCHMARKING DEEP-DIVE & TRANSIÇÃO POOLTECH • JHPCS') {
  doc.setFillColor(3, 7, 18);
  doc.rect(0, 0, pageWidth, 19, 'F');
  
  doc.setFillColor(6, 182, 212);
  doc.rect(margin, 17, contentWidth, 1.2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text(title, margin, 11);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(`Visão Estratégica & Engenharia | Daniel Lopes & Patrícia Grübel`, margin + contentWidth, 11, { align: 'right' });

  doc.setDrawColor(51, 65, 85);
  doc.setLineWidth(0.4);
  doc.line(margin, 284, margin + contentWidth, 284);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Pensar Grande, Mirar Pequeno: Da Perícia e Campo ao ERP Unificado de Mercado', margin, 289);
  doc.text(`Página ${pageNumber} de ${totalPages}`, margin + contentWidth, 289, { align: 'right' });
}

// =============================================================================
// PÁGINA 1: RAIO-X DOS 8 CONCORRENTES & MATRIZ DE ABSORÇÃO DE QUALIDADES
// =============================================================================
doc.setFillColor(248, 250, 252);
doc.rect(0, 0, pageWidth, pageHeight, 'F');
drawHeaderFooter(1, 4);

let y = 26;

doc.setFont('helvetica', 'bold');
doc.setFontSize(14);
doc.setTextColor(15, 23, 42);
doc.text('Raio-X de Benchmarking: O Melhor de Cada Concorrente no JHPCS', margin, y);
y += 5.5;

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(71, 85, 105);
doc.text('Análise cirúrgica das 8 soluções mapeadas: o que cada uma faz de melhor e como o JHPCS absorve essas forças.', margin, y);
y += 7.5;

// Tabela de Benchmarking Deep-Dive
doc.setFillColor(15, 23, 42);
doc.rect(margin, y, contentWidth, 7, 'F');

doc.setFont('helvetica', 'bold');
doc.setFontSize(7);
doc.setTextColor(255, 255, 255);
doc.text('CONCORRENTE', margin + 2, y + 4.8);
doc.text('A MAIOR QUALIDADE (O QUE ABSORVEMOS)', margin + 30, y + 4.8);
doc.text('PONTO FRACO CRÍTICO', margin + 95, y + 4.8);
doc.text('COMO O JHPCS SUPERA DEFINITIVAMENTE', margin + 135, y + 4.8);

y += 7;

const competitors = [
  {
    name: 'AquApp',
    best: 'Simplicidade na agenda e comprovante instantâneo no WhatsApp com 1 toque.',
    flaw: 'Zero inteligência química ou cálculo de ISL; vira apenas um bloco de notas.',
    jhpcs: 'PWA jhpcs-campo com comprovante automático + estequiometria química real.'
  },
  {
    name: 'PiscinApp / PRO',
    best: 'Reconhecimento ótico de fitas de teste e cálculo de dosagem por marca de produto.',
    flaw: 'Completamente desconectado do faturamento, rotas e da integridade física do tanque.',
    jhpcs: 'Leitura de fita + cálculo ISL atrelado ao Prontuário Vitalício e garantia.'
  },
  {
    name: 'Poolloop',
    best: 'Roteirização geográfica de equipes e controle de faturamento recorrente mensal.',
    flaw: 'Foco transacional frio; sem vínculo pericial ou proteção de ativos com construtoras.',
    jhpcs: 'Roteirização de rotas com Geofencing GPS atrelada ao laudo pericial inviolável.'
  },
  {
    name: 'Servicfy',
    best: 'Fluxo de Ordens de Serviço (OS) corporativas com assinatura do cliente na tela.',
    flaw: 'Software genérico de manutenção predial; não entende nada de cimento ou água.',
    jhpcs: 'OS 100% nativa para tratamento aquático, rejeitando produtos que corroem resina.'
  },
  {
    name: 'App PSS',
    best: 'Histórico compartilhado em tempo real com o cliente e controle de rotinas.',
    flaw: 'Sem controle estequiométrico ou previsão de término de estoque.',
    jhpcs: 'Portal do Cliente com Digital Twin ao vivo + previsão climática OpenWeather.'
  },
  {
    name: 'Blue Connect',
    best: 'Leitura contínua automatizada e visual de telemetria futurista de alta precisão.',
    flaw: 'Custo de hardware de R$ 3.000+ por piscina; inviável para 95% do mercado.',
    jhpcs: 'Modelo híbrido: Cockpit F1 de software via fita/app com suporte a sensores IoT.'
  },
  {
    name: 'Simples Agenda',
    best: 'Gestão ágil de comissões por colaborador e disparo automatizado de lembretes.',
    flaw: 'Feito para salões de beleza e clínicas; atrito enorme ao adaptar para piscinas.',
    jhpcs: 'Módulo de comissão nativo para técnicos por piscina tratada ou produto aplicado.'
  },
  {
    name: 'Evolutivo ERP',
    best: 'Controle fiscal completo, estoque físico na loja e frente de caixa (PDV).',
    flaw: 'Totalmente isolado no balcão; não sabe o que acontece na borda da piscina.',
    jhpcs: 'Unificação total: o teste de campo gera a venda no balcão e baixa no ERP.'
  }
];

competitors.forEach((c, idx) => {
  const isEven = idx % 2 === 0;
  doc.setFillColor(isEven ? 255 : 241, isEven ? 255 : 245, isEven ? 255 : 249);
  doc.rect(margin, y, contentWidth, 12.5, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, y + 12.5, margin + contentWidth, y + 12.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(15, 23, 42);
  doc.text(c.name, margin + 2, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(51, 65, 85);
  doc.text(doc.splitTextToSize(c.best, 63), margin + 30, y + 3.8);

  doc.setTextColor(185, 28, 28);
  doc.text(doc.splitTextToSize(c.flaw, 38), margin + 95, y + 3.8);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(14, 116, 144);
  doc.text(doc.splitTextToSize(c.jhpcs, 46), margin + 135, y + 3.8);

  y += 12.5;
});

y += 5;

// Box Síntese da Estratégia de Unificação
doc.setFillColor(241, 245, 249);
doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'F');
doc.setDrawColor(6, 182, 212);
doc.setLineWidth(0.6);
doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'D');

doc.setFont('helvetica', 'bold');
doc.setFontSize(8.5);
doc.setTextColor(14, 116, 144);
doc.text('A SÍNTESE DA UNIFICAÇÃO: "O SISTEMA QUE NENHUM CONCORRENTE CONSEGUE COPIAR"', margin + 4, y + 5.5);

doc.setFont('helvetica', 'normal');
doc.setFontSize(7.5);
doc.setTextColor(51, 65, 85);
const unifText = 'Os concorrentes dividem o mercado em silos: ou são só para o tratador (AquApp/PiscinApp), ou só para empresas (Poolloop), ou só para lojas (Evolutivo). O JHPCS une a cadeia inteira em um ciclo fechado: o tratador na borda alimenta o prontuário, que gera a receita para a loja, que alimenta o laudo pericial para o síndico e origina a reforma para a construtora.';
doc.text(doc.splitTextToSize(unifText, contentWidth - 8), margin + 4, y + 10.5);

// =============================================================================
// PÁGINA 2: A FILOSOFIA "PENSAR GRANDE, MIRAR PEQUENO" & ERP EM STANDBY
// =============================================================================
doc.addPage();
doc.setFillColor(248, 250, 252);
doc.rect(0, 0, pageWidth, pageHeight, 'F');
drawHeaderFooter(2, 4);

y = 26;

doc.setFont('helvetica', 'bold');
doc.setFontSize(14);
doc.setTextColor(15, 23, 42);
doc.text('Estratégia: Pensar Grande, Mirar Pequeno', margin, y);
y += 5.5;

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(71, 85, 105);
doc.text('Como arquitetar um ERP robusto sem afogar o time de desenvolvimento em burocracias fiscais precoces.', margin, y);
y += 8;

// As 3 Fases de Evolução Cirúrgica
const phases = [
  {
    step: 'FASE 1 (HOJE - MIRAR PEQUENO & EXECUTAR COM PERFEIÇÃO): O CORE ESSENCIAL',
    color: [16, 185, 129],
    desc: 'O que gera tração imediata sem atrito: PWA de Campo (jhpcs-campo.vercel.app), Motor ISL com multi-substrato, Laudos Periciais em PDF e comprovantes no WhatsApp.',
    points: [
      '• Experiência de campo em 90 segundos: Tratador não digita textão; clica, bate foto e valida.',
      '• Blindagem Jurídica: Bloqueio estrito de ácido muriático gerando laudo para construtoras e reformas.',
      '• Infraestrutura Custo Zero Escalável: Cloudflare R2 com egress grátis + Supabase PostgreSQL.'
    ]
  },
  {
    step: 'FASE 2 (PRÓXIMO PASSO - CRESCIMENTO & RECEITA): TRADE & RECEITUÁRIO DE BALCÃO',
    color: [14, 116, 144],
    desc: 'A ponte entre a borda da piscina e o dinheiro: Receituário Digital da Água e Checkout Expresso via PIX.',
    points: [
      '• Prescrição da Água: Lojas e tratadores calculam a reposição química exata e geram lista de compras.',
      '• Cobrança PIX Dinâmica: Geração de QR Code e Copia e Cola para pagamento imediato sem maquininha.',
      '• Baixa Estequiométrica: Estoque volante do veículo é baixado automaticamente pelo m³ tratado.'
    ]
  },
  {
    step: 'FASE 3 (FUTURO PLANEJADO - PENSAR GRANDE): ERP COMPLETO & FISCAL EM STANDBY',
    color: [139, 92, 246],
    desc: 'O módulo corporativo mantido em arquitetura modular (Plug-and-Play), ativado apenas sob demanda comercial.',
    points: [
      '• Arquitetura Pronta em Standby: Tabelas no Supabase (`invoices_nfe`, `tax_rules`, `pos_registers`).',
      '• Integração Fiscal via API Especializada: Uso de gateways fiscais (Focus NFe, PlugNotas ou Focus) em vez de codificar regras de ICMS/PIS/COFINS do zero dentro do JHPCS.',
      '• Gestão de Lotes & Validades: Rastreamento de lotes de cloro e relatórios de curva ABC para revendas.'
    ]
  }
];

phases.forEach(ph => {
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, y, contentWidth, 38, 2, 2, 'F');
  doc.setDrawColor(...ph.color);
  doc.setLineWidth(0.6);
  doc.roundedRect(margin, y, contentWidth, 38, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...ph.color);
  doc.text(ph.step, margin + 4, y + 6);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(ph.desc, margin + 4, y + 11.5);

  let pY = y + 17;
  ph.points.forEach(pt => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);
    doc.text(pt, margin + 4, pY);
    pY += 5.5;
  });

  y += 42;
});

// Arquitetura do Módulo em Standby
doc.setFillColor(241, 245, 249);
doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'F');
doc.setDrawColor(139, 92, 246);
doc.setLineWidth(0.5);
doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'D');

doc.setFont('helvetica', 'bold');
doc.setFontSize(8.5);
doc.setTextColor(109, 40, 217);
doc.text('COMO DEIXAMOS O ERP/FISCAL EM STANDBY SEM ATRAPALHAR O PROJETO ATUAL:', margin + 4, y + 6);

doc.setFont('helvetica', 'normal');
doc.setFontSize(7.5);
doc.setTextColor(51, 65, 85);
const standbyDesc = 'O banco de dados já recebe o esquema relacional preparado (`pos_terminals`, `sales_orders`, `fiscal_configs`), porém as rotas e interfaces de PDV fiscal permanecem desativadas por uma Feature Flag global (`ENABLE_FISCAL_ERP: false`). Isso mantém o código limpo, ultrarrápido e livre de débito técnico, pronto para ser "ligado" com um clique quando a primeira rede de lojas contratar a plataforma.';
doc.text(doc.splitTextToSize(standbyDesc, contentWidth - 8), margin + 4, y + 11.5);

// =============================================================================
// PÁGINA 3: PROMPTS INICIAIS DE DESENVOLVIMENTO (SPRINTS 1 E 2)
// =============================================================================
doc.addPage();
doc.setFillColor(248, 250, 252);
doc.rect(0, 0, pageWidth, pageHeight, 'F');
drawHeaderFooter(3, 4);

y = 26;

doc.setFont('helvetica', 'bold');
doc.setFontSize(14);
doc.setTextColor(15, 23, 42);
doc.text('Prompts de Desenvolvimento: Execução Passo a Passo', margin, y);
y += 5.5;

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(71, 85, 105);
doc.text('Prompts prontos e estruturados para você comandar a evolução do sistema nas próximas sprints.', margin, y);
y += 8;

const promptsPart1 = [
  {
    tag: 'PROMPT SPRINT 1: MOTOR ISL MULTI-SUBSTRATO & WHITE-LABEL NO PWA DE CAMPO',
    goal: 'Tornar o app de campo agnóstico a qualquer piscina e permitir que qualquer prestador coloque seu logotipo.',
    promptText: `Atue como Engenheiro Sênior Full-Stack no repositório c:\\JHPCS-campo.
Precisamos evoluir o PWA de campo (jhpcs-campo.vercel.app) para suportar múltiplos substratos e opção White-Label:
1. Substratos Suportados: No cadastro e edição da piscina, adicione o campo 'substrate_type' com as opções: [MONOLITICO_AREIA, FIBRA_VIDRO, VINIL, PASTILHA_CERAMICA, ALVENARIA_PINTADA].
2. Calibração Química ISL: Ajuste o cálculo de Langelier para que a tolerância de pH e alcalinidade respeite os limites de cada material (ex: fibra exige dureza cálcica mínima para evitar branqueamento; pastilha requer cuidado com rejunte cimentício).
3. Modo White-Label no Comprovante WhatsApp: Permita que o tratador insira sua 'Marca/Logo' e telefone nas configurações. Ao gerar o comprovante de visita, a mensagem no WhatsApp sai com o nome dele chancelado com 'Auditoria Técnica por JHPCS Engine'.
Mantenha a performance offline-first e compatibilidade com o banco Supabase.`
  },
  {
    tag: 'PROMPT SPRINT 2: BAIXA ESTEQUIOMÉTRICA AUTOMÁTICA DE ESTOQUE VOLANTE',
    goal: 'Eliminar a bipagem manual de produtos químicos na caminhonete do tratador.',
    promptText: `No repositório principal c:\\JHPCS, implemente a inteligência de Baixa Estequiométrica de Estoque:
1. Schema Supabase: Crie as tabelas 'technician_truck_inventory' (estoque no carro do técnico) e 'inventory_deductions_log' (histórico de baixas).
2. Lógica de Dedução por m³: Sempre que uma manutenção for enviada via /api/maintenance/submit com os valores de produtos dosados (ex: 200g de cloro estabilizado, 1.5kg de barrilha para 100m³), o sistema deve debitar automaticamente do estoque volante daquele técnico.
3. Alerta de Nível Mínimo: Se o saldo de cloro ou barrilha no carro atingir menos de 2 dias de autonomia, dispare notificação via WhatsApp (Evolution API) para o técnico reabastecer a carga.
Adicione testes unitários para validar a matemática de consumo por metro cúbico.`
  }
];

promptsPart1.forEach(pr => {
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, y, contentWidth, 54, 2, 2, 'F');
  doc.setDrawColor(6, 182, 212);
  doc.setLineWidth(0.6);
  doc.roundedRect(margin, y, contentWidth, 54, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(14, 116, 144);
  doc.text(pr.tag, margin + 4, y + 5.5);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text(`Objetivo: ${pr.goal}`, margin + 4, y + 10);

  doc.setFillColor(15, 23, 42);
  doc.roundedRect(margin + 4, y + 13, contentWidth - 8, 38, 1.5, 1.5, 'F');

  doc.setFont('courier', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(226, 232, 240);
  const splittedPrompt = doc.splitTextToSize(pr.promptText, contentWidth - 14);
  doc.text(splittedPrompt, margin + 7, y + 18);

  y += 58;
});

// =============================================================================
// PÁGINA 4: PROMPTS SPRINTS 3 E 4 (TRADE & ERP STANDBY) + MATRIZ DE GOVERNANÇA
// =============================================================================
doc.addPage();
doc.setFillColor(248, 250, 252);
doc.rect(0, 0, pageWidth, pageHeight, 'F');
drawHeaderFooter(4, 4);

y = 26;

doc.setFont('helvetica', 'bold');
doc.setFontSize(14);
doc.setTextColor(15, 23, 42);
doc.text('Prompts de Desenvolvimento: Trade, Balcão & ERP Standby', margin, y);
y += 5.5;

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(71, 85, 105);
doc.text('Prompts para a Sprint 3 (Receituário de Balcão com PIX) e Sprint 4 (Estrutura do ERP em Standby).', margin, y);
y += 8;

const promptsPart2 = [
  {
    tag: 'PROMPT SPRINT 3: RECEITUÁRIO DE BALCÃO & CHECKOUT EXPRESSO VIA PIX',
    goal: 'Criar o módulo de lojas que converte testes de água em carrinho de compras instantâneo.',
    promptText: `No projeto c:\\JHPCS, desenvolva o 'Receituário Digital de Balcão' para Lojas e Revendas:
1. Interface do Balconista: Crie a tela /trade/balcao onde o lojista insere os dados da garrafa d'água trazida pelo cliente (pH, Cloro, Alcalinidade, Dureza e Volume da piscina em m³).
2. Prescrição Química: O motor gera na hora a lista de produtos exatos para equilibrar a água (ex: 2kg Barrilha Leve + 500ml Clarificante Mineral + 1 Balde Cloro 10kg).
3. Checkout PIX Instantâneo: Adicione botão 'Gerar PIX de Balcão' que exibe um QR Code na tela e copia o código copia-e-cola, integrado com confirmação automática de pagamento.
4. Impressão / Envio WhatsApp: Botão para imprimir cupom térmico não-fiscal com as instruções passo a passo para o cliente aplicar em casa.`
  },
  {
    tag: 'PROMPT SPRINT 4: ESTRUTURA DO ERP FISCAL COMPLETO (ARQUITETURA EM STANDBY)',
    goal: 'Deixar o módulo fiscal e PDV estruturado e adormecido, ativado por Feature Flag.',
    promptText: `No repositório c:\\JHPCS, prepare a arquitetura do ERP Fiscal em modo STANDBY (Feature Flagged):
1. Feature Flag: Crie NEXT_PUBLIC_ENABLE_FISCAL_ERP=false no .env. Todas as rotas /erp/* devem verificar essa flag e retornar 404 se estiver desligada.
2. Migration Supabase: Crie as tabelas 'erp_products', 'erp_sales_orders', 'erp_pos_terminals' e 'erp_fiscal_invoices' (campos para chave NFe, XML, protocolo SEFAZ e status).
3. Adaptador de Provedor Fiscal: Crie uma interface abstrata FiscalProvider (src/lib/fiscal/types.ts) com métodos 'emitNFCe', 'cancelNFCe' e 'consultNFCeStatus'. Implemente o mock provider e a casca para futura integração com Focus NFe / PlugNotas.
4. Documentação: Adicione DOCS_ERP_STANDBY.md explicando como ativar o módulo quando fechar o primeiro contrato de grande rede de lojas.`
  }
];

promptsPart2.forEach(pr => {
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, y, contentWidth, 54, 2, 2, 'F');
  doc.setDrawColor(139, 92, 246);
  doc.setLineWidth(0.6);
  doc.roundedRect(margin, y, contentWidth, 54, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(109, 40, 217);
  doc.text(pr.tag, margin + 4, y + 5.5);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text(`Objetivo: ${pr.goal}`, margin + 4, y + 10);

  doc.setFillColor(15, 23, 42);
  doc.roundedRect(margin + 4, y + 13, contentWidth - 8, 38, 1.5, 1.5, 'F');

  doc.setFont('courier', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(226, 232, 240);
  const splittedPrompt = doc.splitTextToSize(pr.promptText, contentWidth - 14);
  doc.text(splittedPrompt, margin + 7, y + 18);

  y += 58;
});

// Box de Conclusão Final
doc.setFillColor(236, 253, 245);
doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'F');
doc.setDrawColor(16, 185, 129);
doc.setLineWidth(0.6);
doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'D');

doc.setFont('helvetica', 'bold');
doc.setFontSize(8.5);
doc.setTextColor(6, 95, 70);
doc.text('PLANO DE AÇÃO IMEDIATO PARA A DIRETORIA:', margin + 4, y + 5.5);

doc.setFont('helvetica', 'normal');
doc.setFontSize(7.5);
doc.setTextColor(4, 120, 87);
const actionPlan = '1. Rodar o Prompt da Sprint 1 na janela c:\\JHPCS-campo para liberar multi-substrato e white-label. 2. Implementar a Sprint 2 e 3 em c:\\JHPCS (estoque automático e receituário PIX). 3. Manter a Sprint 4 (ERP Fiscal) documentada e adormecida, pronta para ativação comercial sob demanda.';
doc.text(doc.splitTextToSize(actionPlan, contentWidth - 8), margin + 4, y + 10.5);

const outputPdfPath = path.resolve('public', 'ESTUDO_BENCHMARKING_E_ROADMAP_POOLTECH.pdf');
const pdfBytes = doc.output('arraybuffer');
fs.writeFileSync(outputPdfPath, Buffer.from(pdfBytes));

console.log(`✅ Estudo profundo de benchmarking e prompts em PDF gerado em: ${outputPdfPath}`);

