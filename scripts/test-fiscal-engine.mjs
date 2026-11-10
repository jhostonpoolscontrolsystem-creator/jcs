import { JHPCSFiscalEngine } from '../src/lib/fiscal/fiscalEngine.js';

console.log('🧪 Iniciando Testes Automatizados do JHPCS Fiscal Engine (NF-e & NFS-e)...');

let pass = 0;
let fail = 0;

function assert(cond, name, detail = '') {
  if (cond) {
    console.log(`✅ [PASS] ${name} ${detail ? '(' + detail + ')' : ''}`);
    pass++;
  } else {
    console.error(`❌ [FAIL] ${name} ${detail ? '(' + detail + ')' : ''}`);
    fail++;
  }
}

async function run() {
  const engineHomolog = new JHPCSFiscalEngine('HOMOLOGATION');
  const engineProd = new JHPCSFiscalEngine('PRODUCTION');

  // Teste 1: Rejeição de NF-e com NCM inválido (< 8 dígitos)
  const invalidNFe = await engineHomolog.emitNFe({
    tenantId: 'tenant_1',
    referenceId: 'order_123',
    natureOfOperation: 'VENDA DE MERCADORIA',
    environment: 'HOMOLOGATION',
    buyer: {
      document: '12345678000195',
      name: 'Piscina Park Hotel Ltda',
      street: 'Av das Águas',
      number: '100',
      neighborhood: 'Centro',
      city: 'Campinas',
      state: 'SP',
      zipCode: '13010000'
    },
    items: [
      {
        code: 'PROD_CLORO_10KG',
        description: 'Cloro Concentrado 10Kg',
        ncm: '123', // INVÁLIDO
        cfop: '5102',
        unit: 'BALDE',
        quantity: 2,
        unitPrice: 150.0,
        totalPrice: 300.0,
        cstCsosn: '102'
      }
    ],
    paymentMethod: 'PIX',
    totalProductsBrl: 300.0,
    totalInvoiceBrl: 300.0
  });

  assert(!invalidNFe.success && invalidNFe.status === 'REJECTED', 'Validação estrita de NCM de 8 dígitos para NF-e');

  // Teste 2: Emissão simulada de NF-e (Homologação) em Standby
  const validNFe = await engineHomolog.emitNFe({
    tenantId: 'tenant_1',
    referenceId: 'order_124',
    natureOfOperation: 'VENDA DE MERCADORIA',
    environment: 'HOMOLOGATION',
    buyer: {
      document: '12345678000195',
      name: 'Piscina Park Hotel Ltda',
      street: 'Av das Águas',
      number: '100',
      neighborhood: 'Centro',
      city: 'Campinas',
      state: 'SP',
      zipCode: '13010000'
    },
    items: [
      {
        code: 'PROD_CLORO_10KG',
        description: 'Cloro Concentrado 10Kg',
        ncm: '28281000', // Válido
        cfop: '5102',
        unit: 'BALDE',
        quantity: 2,
        unitPrice: 150.0,
        totalPrice: 300.0,
        cstCsosn: '102'
      }
    ],
    paymentMethod: 'PIX',
    totalProductsBrl: 300.0,
    totalInvoiceBrl: 300.0
  });

  assert(validNFe.success && validNFe.accessKey && validNFe.accessKey.length === 44, 'Geração de chave de acesso de 44 dígitos para NF-e', validNFe.accessKey);
  assert(validNFe.standbyMode === true, 'Operação segura em modo Standby (Sem envio real à Sefaz sem contratação)');

  // Teste 3: Emissão simulada de NFS-e (Serviço de Manutenção) em Standby
  const validNFSe = await engineProd.emitNFSe({
    tenantId: 'tenant_fleet_1',
    referenceId: 'visit_998',
    environment: 'PRODUCTION',
    buyer: {
      document: '98765432000109',
      name: 'Condomínio Reserva dos Bosques',
      street: 'Alameda das Palmeiras',
      number: '500',
      neighborhood: 'Jardins',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01400000'
    },
    municipalCode: '3550308',
    items: [
      {
        serviceCode: '07.10',
        description: 'Serviço de Limpeza, Conservação e Equilíbrio Químico ISL de Piscina Coletiva',
        quantity: 1,
        unitPrice: 850.0,
        totalPrice: 850.0,
        issAliquota: 5.0,
        issWithheld: false
      }
    ],
    totalServicesBrl: 850.0,
    totalInvoiceBrl: 850.0
  });

  assert(validNFSe.success && validNFSe.rpsNumber && validNFSe.invoiceNumber, 'Emissão estruturada de NFS-e municipal com número de RPS', validNFSe.invoiceNumber);

  console.log(`\n📊 RESULTADO: ${pass} Passou | ${fail} Falhou`);
  if (fail > 0) process.exit(1);
}

run();
