import { redirect } from 'next/navigation';

export default async function TenantDefaultEditionRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || 'jhoston';
  redirect(`/revista/${slug}/edicao-01`);
}
