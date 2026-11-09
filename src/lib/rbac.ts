import { UserRole } from '@/types/database';

export interface RolePermissions {
  canAccessMasterSettings: boolean;
  canViewGlobalBI: boolean;
  canAuditRedZones: boolean;
  canSuspendWarranty: boolean;
  canManageMaintainers: boolean;
  canApproveChemicalPurchases: boolean;
  canInsertMaintenanceLogs: boolean;
  canViewFinancials: boolean;
  canViewUnmaskedSensitiveData: boolean; // LGPD: Se falso, dados pessoais são ofuscados
  canFilterJhostonExclusivePools: boolean; // Segmenta piscinas reformadas pela JHoston
  scope: 'GLOBAL' | 'CLIENT_ONLY' | 'ASSIGNED_POOLS_ONLY';
}

export const ROLE_DEFINITIONS: Record<UserRole, { label: string; description: string; permissions: RolePermissions }> = {
  MASTER: {
    label: 'Master (Administração Geral & Governança)',
    description: 'Acesso à infraestrutura, segurança e telemetria. Por compliance com a LGPD, visualiza dados pessoais e bancários de terceiros de forma anonimizada.',
    permissions: {
      canAccessMasterSettings: true,
      canViewGlobalBI: true,
      canAuditRedZones: true,
      canSuspendWarranty: true,
      canManageMaintainers: true,
      canApproveChemicalPurchases: true,
      canInsertMaintenanceLogs: true,
      canViewFinancials: true,
      canViewUnmaskedSensitiveData: false, // LGPD Estrita: Superusuário não espiona dados pessoais de clientes de terceiros
      canFilterJhostonExclusivePools: true, // Prioriza acompanhamento de piscinas entregues pela JHoston
      scope: 'GLOBAL',
    },
  },

  DIRETORIA_JH: {
    label: 'Diretoria JHoston Pools & Lagoons',
    description: 'Acompanhamento exclusivo das piscinas executadas pela JHoston, garantias ativas e funil de originação de reformas de alto padrão.',
    permissions: {
      canAccessMasterSettings: false,
      canViewGlobalBI: true,
      canAuditRedZones: true,
      canSuspendWarranty: true,
      canManageMaintainers: false,
      canApproveChemicalPurchases: false,
      canInsertMaintenanceLogs: false,
      canViewFinancials: true,
      canViewUnmaskedSensitiveData: false,
      canFilterJhostonExclusivePools: true,
      scope: 'GLOBAL',
    },
  },

  TECNICO_JH: {
    label: 'Equipe Técnica & Pericial JHoston',
    description: 'Visão pericial e arbitral. Atua prioritariamente nas Red Zones das piscinas sob garantia decenal da JHoston.',
    permissions: {
      canAccessMasterSettings: false,
      canViewGlobalBI: false,
      canAuditRedZones: true,
      canSuspendWarranty: true,
      canManageMaintainers: true,
      canApproveChemicalPurchases: false,
      canInsertMaintenanceLogs: false,
      canViewFinancials: false,
      canViewUnmaskedSensitiveData: false,
      canFilterJhostonExclusivePools: true,
      scope: 'GLOBAL',
    },
  },

  GERENCIA_CLI: {
    label: 'Gerência do Cliente (Síndico / Dono / Gerente Geral)',
    description: 'O proprietário do ativo (B2B/B2C). Acompanha a saúde da piscina, compra insumos químicos e recebe laudos mensais de garantia.',
    permissions: {
      canAccessMasterSettings: false,
      canViewGlobalBI: false,
      canAuditRedZones: false,
      canSuspendWarranty: false,
      canManageMaintainers: true,
      canApproveChemicalPurchases: true,
      canInsertMaintenanceLogs: false,
      canViewFinancials: true,
      canViewUnmaskedSensitiveData: true, // Dono/Gerente da conta vê os dados da própria equipe
      canFilterJhostonExclusivePools: false,
      scope: 'CLIENT_ONLY',
    },
  },

  TECNICO_CLI: {
    label: 'Equipe Técnica do Cliente (Zelador / Chefe de Manutenção)',
    description: 'Interface operacional B2B entre a gerência do hotel e o tratador. Valida estoques físicos e autoriza intervenções na casa de máquinas.',
    permissions: {
      canAccessMasterSettings: false,
      canViewGlobalBI: false,
      canAuditRedZones: false,
      canSuspendWarranty: false,
      canManageMaintainers: false,
      canApproveChemicalPurchases: false,
      canInsertMaintenanceLogs: true,
      canViewFinancials: false,
      canViewUnmaskedSensitiveData: false,
      canFilterJhostonExclusivePools: false,
      scope: 'CLIENT_ONLY',
    },
  },

  PISCINEIRO: {
    label: 'Piscineiro / Tratador (Prestador de Serviço)',
    description: 'Operacional restrito (PWA de Campo). Insere coletas do dia atual com câmera in-app e GPS. Sem acesso comercial ou financeiro.',
    permissions: {
      canAccessMasterSettings: false,
      canViewGlobalBI: false,
      canAuditRedZones: false,
      canSuspendWarranty: false,
      canManageMaintainers: false,
      canApproveChemicalPurchases: false,
      canInsertMaintenanceLogs: true,
      canViewFinancials: false,
      canViewUnmaskedSensitiveData: false,
      canFilterJhostonExclusivePools: false,
      scope: 'ASSIGNED_POOLS_ONLY',
    },
  },
};
