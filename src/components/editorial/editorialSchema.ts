export interface MetricSlot {
  label: string;
  value: string;
  accent?: 'cyan' | 'green' | 'amber' | 'emerald' | 'white';
  sublabel?: string;
  sourceRef?: string;
}

export interface AuditItemSlot {
  id: string;
  sourceType: string;
  title: string;
  metricLabel: string;
  metricValue: string;
  verifiedAt?: string;
  details?: string;
}

export interface ComparisonItemSlot {
  title: string;
  description: string;
  highlightValue?: string;
  badge?: string;
  accent?: 'cyan' | 'green' | 'amber' | 'emerald';
}

export interface TableColumnSlot {
  header: string;
  accessorKey: string;
  align?: 'left' | 'center' | 'right';
  widthPercent?: number;
}

export interface TableRowSlot {
  [key: string]: any;
}

export interface CTASlot {
  title: string;
  description: string;
  buttonLabel: string;
  buttonUrl?: string;
  secondaryLabel?: string;
  secondaryUrl?: string;
  contactLine?: string;
}

export interface QuoteSlot {
  text: string;
  authorTitle?: string;
  institution?: string;
}

export interface ImageSlotData {
  src?: string;
  alt?: string;
  caption?: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'wide';
}

export interface IndexEntrySlot {
  indexNumber: string;
  pillarLabel: string;
  title: string;
  subtitle?: string;
  readingTimeMinutes?: number;
  targetPage: number;
  isAudited?: boolean;
}

export type PageTemplateType = 'cover' | 'index' | 'article' | 'comparison' | 'table' | 'closing';

export interface EditorialPageSlotData {
  pageNumber: number;
  totalPages: number;
  type: PageTemplateType;
  publicationTitle: string;
  editionLabel: string;
  editionDate: string;
  sectionLabel?: string;
  sectionAccent?: 'cyan' | 'green' | 'amber' | 'emerald';
  
  // Textos estruturados
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  editorLetter?: string;
  
  // Conteúdos editoriais
  bodyParagraphs?: string[];
  keyHighlights?: string[];
  
  // Componentes ricos
  metrics?: MetricSlot[];
  auditItems?: AuditItemSlot[];
  comparisonItems?: ComparisonItemSlot[];
  tableColumns?: TableColumnSlot[];
  tableRows?: TableRowSlot[];
  quote?: QuoteSlot;
  cta?: CTASlot;
  image?: ImageSlotData;
  indexEntries?: IndexEntrySlot[];
  
  // Rodapé e metadados White-Label
  organizationLabel?: string;
  contactLabel?: string;
}
