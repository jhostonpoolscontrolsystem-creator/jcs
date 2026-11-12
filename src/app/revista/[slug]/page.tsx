'use client';

import React, { Suspense, use } from 'react';
import { useRouter } from 'next/navigation';

function RedirectContent({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const { slug } = use(params);

  React.useEffect(() => {
    router.replace(`/revista/${slug || 'jhoston'}/edicao-01`);
  }, [router, slug]);

  return (
    <div className="min-h-screen bg-[#080A14] flex items-center justify-center text-cyan-400 font-mono text-xs">
      Redirecionando para a Edição Vigente...
    </div>
  );
}

export default function TenantDefaultEditionRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#080A14] flex items-center justify-center text-cyan-400 font-mono text-xs">
          Carregando...
        </div>
      }
    >
      <RedirectContent params={params} />
    </Suspense>
  );
}

