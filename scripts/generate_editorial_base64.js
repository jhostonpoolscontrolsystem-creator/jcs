const fs = require('fs');
const path = require('path');

const files = [
  { key: 'GADAP_LOGO_BASE64', file: 'public/GADAP_Logo.png', mime: 'image/png' },
  { key: 'HERO_SAND_POOL_BASE64', file: 'public/editorial/hero_sand_pool.jpg', mime: 'image/jpeg' },
  { key: 'MONOLITHIC_CURE_BASE64', file: 'public/editorial/monolithic_cure.jpg', mime: 'image/jpeg' },
  { key: 'PITWALL_TELEMETRY_BASE64', file: 'public/editorial/pitwall_telemetry.jpg', mime: 'image/jpeg' },
  { key: 'QR_MAINTENANCE_BASE64', file: 'public/editorial/qr_maintenance.jpg', mime: 'image/jpeg' },
  { key: 'FAMILY_OASIS_BASE64', file: 'public/editorial/family_oasis.jpg', mime: 'image/jpeg' }
];

let output = '// Auto-generated editorial base64 assets\n';

for (const item of files) {
  const filePath = path.join(__dirname, '..', item.file);
  const buf = fs.readFileSync(filePath);
  const b64 = buf.toString('base64');
  output += `export const ${item.key} = 'data:${item.mime};base64,${b64}';\n`;
}

const target = path.join(__dirname, '..', 'src', 'lib', 'editorial-images-base64.ts');
fs.writeFileSync(target, output, 'utf8');
console.log('Generated successfully at:', target);
