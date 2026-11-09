import fs from 'fs';
import path from 'path';
import { jsPDF } from 'jspdf';

console.log('🚀 Gerando Relatório Técnico de Refatoração para a Equipe do PWA de Campo (c:\\JHPCS-campo)...');

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4'
});

const pageWidth = 210;
const pageHeight = 297;
const margin = 14;
const contentWidth = pageWidth - (margin * 2);

function drawHeaderFooter(pageNumber, totalPages) {
  doc.setFillColor(3, 7, 18);
  doc.rect(0, 0, pageWidth, 19, 'F');
  
  doc.setFillColor(16, 185, 129); // Emerald
  doc.rect(margin, 17, contentWidth, 1.2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('GUIA DE REFATORAÇÃO & INTEGRAÇÃO • APP DE CAMPO (PWA)', margin, 11);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(`Diretriz Técnica para c:\\JHPCS-campo | Daniel Lopes & Patrícia Grübel`, margin + contentWidth, 11, { align: 'right' });

  doc.setDrawColor(51, 65, 85);
  doc.setLineWidth(0.4);
  doc.line(margin, 284, margin + contentWidth, 284);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Especificação para o Agente na janela c:\\JHPCS-campo • Versão 2.0 PoolTech', margin, 289);
  doc.text(`Página ${pageNumber} de ${totalPages}`, margin + contentWidth, 289, { align: 'right' });
}

// =============================================================================
// PÁGINA 1: VISÃO GERAL, MULTI-SUBSTRATO E UPLOAD CLOUDFLARE R2
// =============================================================================
doc.setFillColor(248, 250, 252);
doc.rect(0, 0, pageWidth, pageHeight, 'F');
drawHeaderFooter(1, 2);

let y = 26;

doc.setFont('helvetica', 'bold');
doc.setFontSize(14);
doc.setTextColor(15, 23, 42);
doc.text('Especificação de Refatoração: PWA de Campo (JHPCS-Campo)', margin, y);
y += 5.5;

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(71, 85, 105);
doc.text('Tudo o que a janela isolada (c:\\JHPCS-campo) precisa atualizar para se alinhar com a nova arquitetura.', margin, y);
y += 7.5;

// Hero Box
doc.setFillColor(241, 245, 249);
doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'F');
doc.setDrawColor(16, 185, 129);
doc.setLineWidth(0.6);
doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'D');

doc.setFont('helvetica', 'bold');
doc.setFontSize(8.5);
doc.setTextColor(5, 150, 105);
doc.text('OBJETIVO: MANTER O APP HIPERVELOZ, OFFLINE-FIRST E AGORA MULTI-SUBSTRATO', margin + 4, y + 5.5);

doc.setFont('helvetica', 'normal');
doc.setFontSize(7.5);
doc.setTextColor(51, 65, 85);
const objText = 'O app em c:\\JHPCS-campo já está rodando em jhpcs-campo.vercel.app. Para acompanhar a expansão de mercado do backend que acabamos de implantar no JHPCS, o app de campo precisa de 4 ajustes pontuais: 1) Seletor de substrato; 2) Upload apontando para o Cloudflare R2; 3) Modo White-label nos comprovantes; 4) Cache de fita e offline.';
doc.text(doc.splitTextToSize(objText, contentWidth - 8), margin + 4, y + 10.5);

y += 28;

// Tarefa 1: Seletor de Substrato na Borda
doc.setFont('helvetica', 'bold');
doc.setFontSize(10.5);
doc.setTextColor(15, 23, 42);
doc.text('TAREFA 1: SELETOR DE SUBSTRATO NA SELEÇÃO DA PISCINA', margin, y);
y += 4.5;

const t1 = [
  '• Onde Alterar: No componente MaintainerPwaWizard.tsx (ou na tela de seleção de piscina).',
  '• Novo Campo: Exibir o badge ou seletor com as 5 opções: [Monolítico Sand, Fibra de Vidro, Vinil, Pastilha, Alvenaria Pintada].',
  '• Impacto no Campo: Quando o piscineiro selecionar Fibra ou Vinil, o app alerta dinamicamente: "Atenção: Não jogar cloro granulado diretamente no fundo" ou "Fibra: Mantenha dureza cálcica mínima para evitar branqueamento".'
];
t1.forEach(item => {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text(item, margin + 2, y);
  y += 5;
});

y += 4;

// Tarefa 2: Upload Direto no Cloudflare R2
doc.setFont('helvetica', 'bold');
doc.setFontSize(10.5);
doc.setTextColor(15, 23, 42);
doc.text('TAREFA 2: INTEGRAÇÃO DO UPLOAD DE FOTOS NO CLOUDFLARE R2', margin, y);
y += 4.5;

const t2 = [
  '• Onde Alterar: Na rota /api/storage/upload-evidence do c:\\JHPCS-campo e no hook de envio de imagens.',
  '• Credenciais: Copiar as 6 variáveis R2_* do .env.local para o .env.local do c:\\JHPCS-campo.',
  '• Benefício no Campo: A compressão de fotos no celular (WebP 80%) agora sobe para o bucket jhpcs-fotos-inspecoes com egress zero, permitindo 10 fotos por visita sem estourar limites de dados.'
];
t2.forEach(item => {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text(item, margin + 2, y);
  y += 5;
});

y += 4;

// Tarefa 3: Modo White-Label no Comprovante de WhatsApp
doc.setFont('helvetica', 'bold');
doc.setFontSize(10.5);
doc.setTextColor(15, 23, 42);
doc.text('TAREFA 3: PERSONALIZAÇÃO WHITE-LABEL PARA TRATADORES AUTÔNOMOS', margin, y);
y += 4.5;

const t3 = [
  '• Onde Alterar: Na tela final de resumo de envio do comprovante de visita.',
  '• Configuração Local (LocalStorage / IndexedDB): Campo para o tratador salvar "Nome da Sua Empresa / Apelido" e "WhatsApp de Contato".',
  '• Formatação do WhatsApp: O texto disparado para o cliente passa a sair como: "💦 *Relatório de Manutenção - [Nome da Empresa do Tratador]* • Sua piscina está 100% pronta para banho! • _Certificação Química por JHPCS Engine_".'
];
t3.forEach(item => {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text(item, margin + 2, y);
  y += 5;
});

// =============================================================================
// PÁGINA 2: O PROMPT EXATO PARA COLAR NO AGENTE DO C:\JHPCS-CAMPO
// =============================================================================
doc.addPage();
doc.setFillColor(248, 250, 252);
doc.rect(0, 0, pageWidth, pageHeight, 'F');
drawHeaderFooter(2, 2);

y = 26;

doc.setFont('helvetica', 'bold');
doc.setFontSize(14);
doc.setTextColor(15, 23, 42);
doc.text('Prompt de Execução para a Janela c:\\JHPCS-campo', margin, y);
y += 5.5;

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(71, 85, 105);
doc.text('Basta copiar o bloco de código abaixo e enviar no chat da janela c:\\JHPCS-campo para executar a refatoração.', margin, y);
y += 8;

const promptFieldTeam = `Olá! O backend principal (c:\\JHPCS) foi atualizado para suportar a expansão de mercado do ecossistema PoolTech (multi-substrato, Cloudflare R2 e baixa estequiométrica).
Precisamos refatorar o nosso app de campo isolado (c:\\JHPCS-campo) com 3 passos simples:

1. CONFIGURAÇÃO DE AMBIENTE:
   - Adicione no nosso .env.local as credenciais do Cloudflare R2 (iguais às do c:\\JHPCS):
     R2_ACCOUNT_ID="bebf687de63b2dd1f07d07409a858ebc"
     R2_ACCESS_KEY_ID="8d763cb4a58154049863a6ac2ce73737"
     R2_SECRET_ACCESS_KEY="5f9ba1717e26807ca3ee97d4a8b625e5a817e08fdc6f4dcf6f69453eb51e199f"
     R2_BUCKET_NAME="jhpcs-fotos-inspecoes"
     R2_PUBLIC_DOMAIN="https://pub-0698df4992464295bd9d323e91a2aee4.r2.dev"
     R2_ENDPOINT="https://bebf687de63b2dd1f07d07409a858ebc.r2.cloudflarestorage.com"
   - Garanta que a rota /api/storage/upload-evidence use o @aws-sdk/client-s3 com fallback no Supabase.

2. SELETOR DE SUBSTRATO NO CHECK-IN:
   - No fluxo de seleção da piscina (MaintainerPwaWizard), exiba o tipo de revestimento: [Monolítico Areia, Fibra de Vidro, Vinil, Pastilha, Alvenaria].
   - Alerte o tratador com dicas de segurança específicas de cada material (ex: não jogar cloro granulado puro em vinil).

3. COMPROVANTE WHITE-LABEL NO WHATSAPP:
   - Permita ao tratador salvar seu Nome Comercial e Telefone na aba Perfil/Configurações.
   - O texto enviado ao cliente no WhatsApp deve valorizar a marca dele (ex: "Relatório de Manutenção - [Sua Marca] • Auditoria Técnica JHPCS").

Preserve 100% da velocidade offline-first e persistência IndexedDB.`;

doc.setFillColor(255, 255, 255);
doc.roundedRect(margin, y, contentWidth, 140, 2, 2, 'F');
doc.setDrawColor(16, 185, 129);
doc.setLineWidth(0.6);
doc.roundedRect(margin, y, contentWidth, 140, 2, 2, 'D');

doc.setFont('helvetica', 'bold');
doc.setFontSize(8.5);
doc.setTextColor(5, 150, 105);
doc.text('PROMPT PRONTO PARA COPIAR E COLAR NA OUTRA JANELA (c:\\JHPCS-campo):', margin + 4, y + 6);

doc.setFillColor(15, 23, 42);
doc.roundedRect(margin + 4, y + 10, contentWidth - 8, 124, 1.5, 1.5, 'F');

doc.setFont('courier', 'normal');
doc.setFontSize(7);
doc.setTextColor(226, 232, 240);
const splittedPromptField = doc.splitTextToSize(promptFieldTeam, contentWidth - 14);
doc.text(splittedPromptField, margin + 7, y + 16);

y += 147;

// Box de Conclusão da Refatoração
doc.setFillColor(236, 253, 245);
doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'F');
doc.setDrawColor(16, 185, 129);
doc.setLineWidth(0.6);
doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'D');

doc.setFont('helvetica', 'bold');
doc.setFontSize(8.5);
doc.setTextColor(6, 95, 70);
doc.text('RESULTADO ESPERADO APÓS APLICAR NA OUTRA JANELA:', margin + 4, y + 5.5);

doc.setFont('helvetica', 'normal');
doc.setFontSize(7.5);
doc.setTextColor(4, 120, 87);
const expResult = 'O app de campo continuará ultrarrápido e independente em jhpcs-campo.vercel.app, mas passará a salvar fotos no Cloudflare R2 com custo zero de saída e a gerar relatórios profissionais que transformam o tratador no melhor embaixador comercial do sistema.';
doc.text(doc.splitTextToSize(expResult, contentWidth - 8), margin + 4, y + 10.5);

const outputPdfPath = path.resolve('public', 'RELATORIO_REFATORACAO_PWA_CAMPO.pdf');
const pdfBytes = doc.output('arraybuffer');
fs.writeFileSync(outputPdfPath, Buffer.from(pdfBytes));

console.log(`✅ Relatório de refatoração em PDF gerado em: ${outputPdfPath}`);

