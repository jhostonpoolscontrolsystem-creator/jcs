'use client';

import React, { Suspense } from 'react';
import { useParams } from 'next/navigation';
import { DataDrivenMagazineView } from '@/components/DataDrivenMagazineView';

function RevistaContent() {
  const params = useParams();
  const slug = (params?.slug as string) || 'jhoston';

  const brandName = slug === 'jhoston' || slug === 'master'
    ? 'Jhoston Pools & Lagoons'
    : slug.charAt(0).toUpperCase() + slug.slice(1) + ' Piscinas & Engenharia';

  return (
    <DataDrivenMagazineView
      tenantSlug={slug}
      brandName={brandName}
      whatsappContact="+55 (11) 99999-8888"
    />
  );
}

export default function RevistaPublicaPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#070B14] flex items-center justify-center text-cyan-400 font-mono text-sm">
        Carregando Edição Data-Driven...
      </div>
    }>
      <RevistaContent />
    </Suspense>
  );
}
