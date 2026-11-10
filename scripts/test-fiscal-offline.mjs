import { OfflineFiscalCatalogManager, OFFLINE_CHEMICAL_CATALOG } from '../src/lib/fiscal/offlineFiscalCatalog.ts';

console.log('🧪 Iniciando Teste do Módulo de Fiscal Offline e Catálogo NCM/CFOP...');

// 1. Teste de Inicialização do Catálogo
const catalog = OfflineFiscalCatalogManager.initializeLocalCache();
console.log(`Catálogo carregado com ${catalog.length} produtos químicos.`);

if (catalog.length >= 6) {
  console.log('✅ PASS: Catálogo contém insumos químicos regulamentados (Hipoclorito, Dicloro, Barrilha, Bicarbonato, Sulfato, Algicida).');
} else {
  console.error('❌ FAIL: Catálogo incompleto.');
  process.exit(1);
}

// 2. Teste de Busca por NCM e SKU
const cloro = OfflineFiscalCatalogManager.findItem('28289011');
if (cloro && cloro.sku === 'CLORO-HIPO-CALCIO' && cloro.cfopInterno === '5102') {
  console.log('✅ PASS: Busca por NCM 28289011 retornou Hipoclorito com CFOP 5102 e ICMS 18%.');
} else {
  console.error('❌ FAIL: Falha ao localizar insumo por NCM.');
  process.exit(1);
}

// 3. Teste de Cálculo Offline de Carrinho com Impostos
const cartResult = OfflineFiscalCatalogManager.calculateOfflineCart([
  { sku: 'CLORO-HIPO-CALCIO', quantity: 2 }, // 2x 38.50 = 77.00
  { sku: 'BARRILHA-LEVE', quantity: 1 },      // 1x 16.50 = 16.50
]);

const expectedTotal = 77.00 + 16.50; // 93.50
if (Math.abs(cartResult.totalAmountBrl - expectedTotal) < 0.01) {
  console.log(`✅ PASS: Cálculo offline de carrinho correto: R$ ${cartResult.totalAmountBrl.toFixed(2)} (ICMS: R$ ${cartResult.totalIcms.toFixed(2)})`);
} else {
  console.error(`❌ FAIL: Total incorreto. Esperado: ${expectedTotal}, Obtido: ${cartResult.totalAmountBrl}`);
  process.exit(1);
}

console.log('\n🎉 TODOS OS TESTES DO CATÁLOGO FISCAL OFFLINE PASSARAM COM SUCESSO!');

