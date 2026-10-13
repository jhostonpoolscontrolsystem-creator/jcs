const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:Dn1dUJc0q5iGXQPq@db.abyfbwvihjctbskhiunh.supabase.co:5432/postgres',
  ssl: { rejectUnauthorized: false }
});

async function main() {
  await client.connect();
  console.log('Postgres conectado com sucesso!');

  const sql = `
    ALTER TABLE pools ADD COLUMN IF NOT EXISTS client_name TEXT;
    ALTER TABLE pools ADD COLUMN IF NOT EXISTS client_phone TEXT;
    ALTER TABLE pools ADD COLUMN IF NOT EXISTS client_email TEXT;
    ALTER TABLE pools ADD COLUMN IF NOT EXISTS facility_type TEXT DEFAULT 'RESIDENCIAL';
    ALTER TABLE pools ADD COLUMN IF NOT EXISTS subscription_tier TEXT DEFAULT 'STANDARD';
    ALTER TABLE pools ADD COLUMN IF NOT EXISTS client_chosen_tier TEXT DEFAULT 'PRO_EXECUTIVE';
    ALTER TABLE pools ADD COLUMN IF NOT EXISTS trial_started_at TIMESTAMPTZ DEFAULT (NOW() - INTERVAL '120 days');
    ALTER TABLE pools ADD COLUMN IF NOT EXISTS trial_ends_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '60 days');
    ALTER TABLE pools ADD COLUMN IF NOT EXISTS trial_extension_months INT DEFAULT 0;
    ALTER TABLE pools ADD COLUMN IF NOT EXISTS trial_extension_reason TEXT;
    ALTER TABLE pools ADD COLUMN IF NOT EXISTS trial_approved_by_director BOOLEAN DEFAULT FALSE;
  `;

  await client.query(sql);
  console.log('Colunas de assinatura e período gratuito adicionadas na tabela pools!');

  // Atualizar as piscinas existentes com dados reais dos clientes e status de degustação
  const updateSql = `
    UPDATE pools SET 
      client_name = 'Resort Terravista Trancoso S/A',
      client_phone = '5511999991111',
      client_email = 'diretoria@terravista.com.br',
      facility_type = 'RESORT_HOTEL',
      subscription_tier = 'STANDARD',
      client_chosen_tier = 'BLACK_ELITE',
      trial_started_at = NOW() - INTERVAL '162 days',
      trial_ends_at = NOW() + INTERVAL '18 days',
      trial_extension_months = 0,
      trial_approved_by_director = FALSE
    WHERE id = 'a0000001-0000-0000-0000-000000000001';

    UPDATE pools SET 
      client_name = 'Hotel Fasano Itaim S/A',
      client_phone = '5511988882222',
      client_email = 'operacoes@fasano.com.br',
      facility_type = 'HOTEL_LUXO',
      subscription_tier = 'STANDARD',
      client_chosen_tier = 'BLACK_ELITE',
      trial_started_at = NOW() - INTERVAL '180 days',
      trial_ends_at = NOW() + INTERVAL '42 days',
      trial_extension_months = 2,
      trial_extension_reason = 'Cura atípica e ajuste térmico homologado pela Diretoria JH',
      trial_approved_by_director = TRUE
    WHERE id = 'a0000002-0000-0000-0000-000000000002';

    UPDATE pools SET 
      client_name = 'Residencial Alphaville 04',
      client_phone = '5511977773333',
      client_email = 'sindico@alphaville4.com.br',
      facility_type = 'CONDOMINIO',
      subscription_tier = 'STANDARD',
      client_chosen_tier = 'PRO_EXECUTIVE',
      trial_started_at = NOW() - INTERVAL '90 days',
      trial_ends_at = NOW() + INTERVAL '90 days',
      trial_extension_months = 0,
      trial_approved_by_director = FALSE
    WHERE id = 'a0000003-0000-0000-0000-000000000003';

    UPDATE pools SET 
      client_name = 'Belmond Copacabana Palace',
      client_phone = '5521966664444',
      client_email = 'vip@copacabanapalace.com.br',
      facility_type = 'SPA_VIP',
      subscription_tier = 'STANDARD',
      client_chosen_tier = 'PRO_EXECUTIVE',
      trial_started_at = NOW() - INTERVAL '60 days',
      trial_ends_at = NOW() + INTERVAL '120 days',
      trial_extension_months = 0,
      trial_approved_by_director = FALSE
    WHERE id = 'a0000004-0000-0000-0000-000000000004';

    UPDATE pools SET 
      client_name = 'Condomínio EcoStone Resort',
      client_phone = '5511955555555',
      client_email = 'cliente@ecostone.com',
      facility_type = 'RESIDENCIAL',
      subscription_tier = 'STANDARD',
      client_chosen_tier = 'STANDARD',
      trial_started_at = NOW() - INTERVAL '30 days',
      trial_ends_at = NOW() + INTERVAL '150 days',
      trial_extension_months = 0,
      trial_approved_by_director = FALSE
    WHERE id = '33333333-3333-3333-3333-333333333333';
  `;

  await client.query(updateSql);
  console.log('Piscinas reais atualizadas com status de degustação e planos!');

  const check = await client.query('SELECT id, name, client_name, client_chosen_tier, trial_ends_at, trial_extension_months FROM pools;');
  console.log('POOLS REAL DATA:', check.rows);

  await client.end();
}

main().catch(err => {
  console.error('ERRO:', err);
  process.exit(1);
});
