import fs from 'fs';
import path from 'path';

async function generate() {
  const { generateBimonthlyMagazinePdf } = await import('../src/lib/magazine/bimonthlyMagazinePdf.ts');
  const buffer = await generateBimonthlyMagazinePdf({
    tenantName: 'Jhoston Pools & Lagoons',
    tenantWhatsapp: '+55 (11) 99999-8888',
  });

  const outPath = path.join(process.cwd(), 'public', 'REVISTA_POOLTECH_EDICAO_01.pdf');
  fs.writeFileSync(outPath, buffer);
  console.log('PDF gerado com sucesso em: ' + outPath + ' (' + buffer.length + ' bytes)');
}

generate().catch(console.error);
