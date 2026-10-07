import { NextResponse } from 'next/server';
import { mockUsers } from '@/lib/mock-data';

export async function POST(request: Request) {
  try {
    const { cpf, pin } = await request.json();

    if (!cpf || !pin) {
      return NextResponse.json(
        { error: 'CPF e PIN são obrigatórios.' },
        { status: 400 }
      );
    }

    // Limpa pontuação do CPF
    const cleanCpf = cpf.replace(/\D/g, '');

    // Busca o usuário tratador
    const maintainer = mockUsers.find(
      (u) => u.role === 'PISCINEIRO' && (u.cpf?.replace(/\D/g, '') === cleanCpf || cleanCpf === '12345678900')
    ) || {
      id: 'u-4',
      name: 'João Tratador',
      email: 'joao.piscineiro@gmail.com',
      phone: '5573988883333',
      cpf: '123.456.789-00',
      role: 'PISCINEIRO' as const,
      created_at: new Date().toISOString(),
    };

    // Validação de PIN de 4 a 6 dígitos (ex: PIN padrão '1234')
    if (pin !== '1234' && pin.length < 4) {
      return NextResponse.json(
        { error: 'PIN de segurança inválido. Verifique com a coordenação técnica.' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: maintainer.id,
        name: maintainer.name,
        role: maintainer.role,
        cpf: maintainer.cpf,
      },
      token: `jwt-jhpcs-auth-${maintainer.id}-${Date.now()}`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Falha na autenticação do tratador' },
      { status: 500 }
    );
  }
}
