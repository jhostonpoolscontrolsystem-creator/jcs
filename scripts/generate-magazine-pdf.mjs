import fs from 'fs';
import path from 'path';

async function generate() {
  const { generateLuxuryDataDrivenPdf } = await import('../src/lib/magazine/luxuryDataDrivenPdf.ts');
  const buffer = await generateLuxuryDataDrivenPdf({
    tenantName: 'Jhoston Pools & Lagoons',
    tenantWhatsapp: '+55 (11) 99999-8888',
    profile: 'garantia',
  });

  const outPath = path.join(process.cwd(), 'public', 'REVISTA_POOLTECH_DATA_DRIVEN_EDICAO_01.pdf');
  fs.writeFileSync(outPath, buffer);
  console.log('PDF de Luxo Data-Driven gerado com sucesso em: ' + outPath + ' (' + buffer.length + ' bytes)');
}

generate().catch(console.error);
