import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Recupera o país de origem do IP através do header injetado pela Vercel em produção
  const country = request.headers.get('x-vercel-ip-country');

  // Se o país for identificado e não for o Brasil ('BR'), bloqueamos o acesso.
  // (Em localhost esse header é nulo, então não afeta o desenvolvimento).
  if (country && country !== 'BR') {
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Acesso Bloqueado - Segurança JHoston</title>
          <style>
            body { 
              background-color: #020617; /* slate-950 */
              color: #f8fafc; /* slate-50 */
              font-family: system-ui, -apple-system, sans-serif; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              height: 100vh; 
              margin: 0; 
              text-align: center; 
              padding: 20px; 
            }
            .shield-container { 
              border: 1px solid #334155; 
              background-color: #0f172a; 
              padding: 40px; 
              border-radius: 16px; 
              max-width: 450px; 
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
            }
            .icon {
              font-size: 48px;
              margin-bottom: 16px;
            }
            h1 { 
              color: #f43f5e; /* rose-500 */
              font-size: 22px; 
              margin-top: 0;
            }
            p { 
              color: #94a3b8; /* slate-400 */
              font-size: 14px; 
              line-height: 1.6; 
              margin-bottom: 16px;
            }
            .country-tag {
              display: inline-block;
              background: #f43f5e20;
              color: #f43f5e;
              padding: 4px 12px;
              border-radius: 9999px;
              font-weight: bold;
              font-size: 12px;
              border: 1px solid #f43f5e40;
            }
          </style>
        </head>
        <body>
          <div class="shield-container">
            <div class="icon">🛡️</div>
            <h1>Acesso Bloqueado (Geofencing)</h1>
            <p>O sistema interno da <strong>JHoston Pools</strong> possui restrições de segurança ativas (Compliance & LGPD) e é estritamente limitado para acessos originados dentro do território brasileiro.</p>
            <p>Sua conexão foi interceptada e encerrada na borda (Edge Network).</p>
            <div class="country-tag">Origem Detectada: ${country}</div>
          </div>
        </body>
      </html>
      `,
      {
        status: 403,
        headers: { 'Content-Type': 'text/html' }
      }
    );
  }

  // Se estiver no Brasil ou em ambiente local, segue o fluxo normalmente
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Roda em todas as rotas da aplicação, exceto assets estáticos e rotas internas do Next
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
