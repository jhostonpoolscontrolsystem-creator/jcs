import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const rawCnpj = searchParams.get('cnpj') || '';
    const cleanCnpj = rawCnpj.replace(/\D/g, '');

    if (!cleanCnpj || cleanCnpj.length !== 14) {
      return NextResponse.json(
        { error: 'CNPJ inválido. Forneça exatamente 14 dígitos numéricos.' },
        { status: 400 }
      );
    }

    // 1. Consulta primária: BrasilAPI
    try {
      const brasilApiRes = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cleanCnpj}`, {
        headers: { 'User-Agent': 'JHPCS-SaaS-Onboarding/1.0' },
        next: { revalidate: 3600 },
      });

      if (brasilApiRes.ok) {
        const data = await brasilApiRes.json();
        const situacao = (data.descricao_situacao_cadastral || data.situacao_cadastral || 'ATIVA').toUpperCase();
        const isAtiva = situacao === 'ATIVA' || situacao === '02';

        return NextResponse.json({
          success: true,
          provider: 'BrasilAPI',
          cnpj: cleanCnpj,
          razao_social: data.razao_social || data.nome_fantasia || '',
          nome_fantasia: data.nome_fantasia || data.razao_social || '',
          logradouro: `${data.descricao_tipo_de_logradouro || ''} ${data.logradouro || ''}`.trim(),
          numero: data.numero || 'S/N',
          bairro: data.bairro || '',
          municipio: data.municipio || '',
          uf: data.uf || '',
          cep: data.cep || '',
          situacao_cadastral: situacao,
          is_apta: isAtiva,
          alerta_impedimento: !isAtiva ? `Atenção: A empresa encontra-se com situação ${situacao} na Receita Federal.` : null,
        });
      }
    } catch (err) {
      console.warn('[BrasilAPI Error] Tentando fallback para ReceitaWS...', err);
    }

    // 2. Fallback: ReceitaWS
    try {
      const receitaWsRes = await fetch(`https://www.receitaws.com.br/v1/cnpj/${cleanCnpj}`, {
        headers: { 'User-Agent': 'JHPCS-SaaS-Onboarding/1.0' },
        next: { revalidate: 3600 },
      });

      if (receitaWsRes.ok) {
        const data = await receitaWsRes.json();
        if (data.status === 'ERROR') {
          return NextResponse.json({ error: data.message || 'CNPJ não localizado na base.' }, { status: 404 });
        }

        const situacao = (data.situacao || 'ATIVA').toUpperCase();
        const isAtiva = situacao === 'ATIVA';

        return NextResponse.json({
          success: true,
          provider: 'ReceitaWS',
          cnpj: cleanCnpj,
          razao_social: data.nome || data.fantasia || '',
          nome_fantasia: data.fantasia || data.nome || '',
          logradouro: data.logradouro || '',
          numero: data.numero || 'S/N',
          bairro: data.bairro || '',
          municipio: data.municipio || '',
          uf: data.uf || '',
          cep: data.cep ? data.cep.replace(/\D/g, '') : '',
          situacao_cadastral: situacao,
          is_apta: isAtiva,
          alerta_impedimento: !isAtiva ? `Atenção: A empresa encontra-se com situação ${situacao} na Receita Federal.` : null,
        });
      }
    } catch (err) {
      console.warn('[ReceitaWS Error]:', err);
    }

    // Fallback gracioso para ambiente offline ou teste
    if (cleanCnpj === '11111111000101' || cleanCnpj === '22222222000102') {
      return NextResponse.json({
        success: true,
        provider: 'MockHomologacao',
        cnpj: cleanCnpj,
        razao_social: 'POOL MASTER ENGENHARIA & TRATAMENTO LTDA',
        nome_fantasia: 'PoolMaster Frotas',
        logradouro: 'Av. Paulista',
        numero: '1000',
        bairro: 'Bela Vista',
        municipio: 'São Paulo',
        uf: 'SP',
        cep: '01310100',
        situacao_cadastral: 'ATIVA',
        is_apta: true,
        alerta_impedimento: null,
      });
    }

    return NextResponse.json(
      { error: 'Não foi possível consultar os dados do CNPJ na Receita Federal no momento. Preencha manualmente os campos.' },
      { status: 502 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erro interno na consulta de CNPJ.' }, { status: 500 });
  }
}

