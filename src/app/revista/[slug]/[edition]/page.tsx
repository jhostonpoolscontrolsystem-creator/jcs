'use client';

import React, { Suspense, useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { EditorialDocument } from '@/components/editorial/EditorialDocument';
import { buildEditorialPagesFromSaaS } from '@/components/editorial/editorialAdapter';
import { MagazineProfile } from '@/lib/magazine/dataDrivenMagazineEngine';
import { toast } from 'sonner';

function RevistaEditorialView() {
  const params = useParams();
  const searchParams = useSearchParams();

  const slug = (params?.slug as string) || 'jhoston';
  const rawProfile = searchParams.get('perfil');
  const profile: MagazineProfile = rawProfile === 'orcamento' ? 'orcamento' : 'garantia';

  const brandName = slug === 'jhoston' || slug === 'master'
    ? 'Jhoston Pools & Lagoons'
    : slug.charAt(0).toUpperCase() + slug.slice(1) + ' Piscinas & Engenharia';

  const whatsapp = '+55 (11) 99999-8888';

  // Monta as 6 páginas A4 desacopladas com os dados do SaaS
  const pages = useMemo(() => {
    return buildEditorialPagesFromSaaS(brandName, whatsapp, profile);
  }, [brandName, whatsapp, profile]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link editorial copiado! Compartilhe com clientes.');
    }
  };

  return (
    <EditorialDocument
      pages={pages}
      onShare={handleShare}
      pdfDownloadUrl={`/api/pdf/magazine-edition?tenant=${encodeURIComponent(brandName)}&whatsapp=${encodeURIComponent(whatsapp)}&perfil=${profile}`}
    />
  );
}

export default function RevistaPublicaPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#080A14] flex items-center justify-center text-cyan-400 font-mono text-xs">
        Carregando Sistema Editorial A4...
      </div>
    }>
      <RevistaEditorialView />
    </Suspense>
  );
}
