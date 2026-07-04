import type { CRMStore } from './types'

export const SEED_DATA: CRMStore = {
  clients: [
    {
      id: 'client-caio-001',
      name: 'Caio',
      email: '',
      phone: '',
      company: 'Clínica & Cursos',
      notes: 'Cliente de implantação Kommo CRM. Dois fluxos: clínica de tratamento capilar e cursos.',
      createdAt: '2026-07-01T10:00:00.000Z',
      updatedAt: '2026-07-04T00:00:00.000Z',
    },
  ],
  projects: [
    {
      id: 'project-kommo-caio-001',
      clientId: 'client-caio-001',
      title: 'Implantação Kommo CRM',
      description:
        'Implantação inicial Kommo CRM para dois fluxos: clínica de tratamento capilar e cursos. Escopo: estrutura de funil, campos personalizados, Salesbot inicial, importação de base, handoff humano.',
      status: 'completed',
      startDate: '2026-07-01',
      endDate: '2026-07-04',
      value: 2500,
      currency: 'BRL',
      notes: 'Projeto concluído em 4 dias úteis. WhatsApp Business bloqueado pela Meta pendente de resolução pelo cliente.',
      createdAt: '2026-07-01T10:00:00.000Z',
      updatedAt: '2026-07-04T00:00:00.000Z',
    },
  ],
  contracts: [
    {
      id: 'contract-kommo-001',
      projectId: 'project-kommo-caio-001',
      title: 'Contrato Implantação Kommo – Caio',
      value: 2500,
      currency: 'BRL',
      status: 'signed',
      signedDate: '2026-07-01',
      notes: 'Contrato de serviço para implantação do Kommo CRM.',
      createdAt: '2026-07-01T10:00:00.000Z',
      updatedAt: '2026-07-01T10:00:00.000Z',
    },
  ],
  payments: [
    {
      id: 'payment-kommo-001',
      projectId: 'project-kommo-caio-001',
      description: 'Pagamento Implantação Kommo CRM – Caio (atualizar valor real)',
      amount: 2500,
      currency: 'BRL',
      status: 'received',
      dueDate: '2026-07-04',
      receivedDate: '2026-07-04',
      notes: 'TODO: confirmar valor e data real do pagamento recebido.',
      createdAt: '2026-07-04T00:00:00.000Z',
      updatedAt: '2026-07-04T00:00:00.000Z',
    },
  ],
  activities: [
    {
      id: 'activity-kommo-dia1',
      projectId: 'project-kommo-caio-001',
      title: 'Dia 1 – Diagnóstico e desenho',
      description:
        'Validar operação atual. Confirmar dois fluxos (clínica/cursos). Mapear responsáveis. Definir funis, etapas, campos, tags e motivos de perda. Desenhar fluxo inicial do bot.',
      status: 'done',
      dueDate: '2026-07-01',
      completedAt: '2026-07-01T18:00:00.000Z',
      createdAt: '2026-07-01T10:00:00.000Z',
      updatedAt: '2026-07-01T18:00:00.000Z',
    },
    {
      id: 'activity-kommo-dia2',
      projectId: 'project-kommo-caio-001',
      title: 'Dia 2 – Estrutura Kommo e campos/tags',
      description:
        'Criar/ajustar 2 funis. Criar campos personalizados. Criar tags padronizadas. Criar motivos de perda. Preparar modelo de importação. Testar importação com contatos fake.',
      status: 'done',
      dueDate: '2026-07-02',
      completedAt: '2026-07-02T18:00:00.000Z',
      createdAt: '2026-07-01T10:00:00.000Z',
      updatedAt: '2026-07-02T18:00:00.000Z',
    },
    {
      id: 'activity-kommo-dia3',
      projectId: 'project-kommo-caio-001',
      title: 'Dia 3 – Fluxo bot/IA e testes fake',
      description:
        'Criar fluxo inicial de boas-vindas. Ramificação clínica e cursos. Atualizar campos/tags conforme respostas. Regras de passagem para humano. Testar com contatos fake.',
      status: 'done',
      dueDate: '2026-07-03',
      completedAt: '2026-07-03T18:00:00.000Z',
      createdAt: '2026-07-01T10:00:00.000Z',
      updatedAt: '2026-07-03T18:00:00.000Z',
    },
    {
      id: 'activity-kommo-dia4',
      projectId: 'project-kommo-caio-001',
      title: 'Dia 4 – Ajustes, documentação e handoff',
      description:
        'Ajustar etapas e bot com base nos testes. Documentar campos, tags, etapas. Criar checklist de pendências. Registrar riscos e limitações. Dimensionar próxima fase.',
      status: 'done',
      dueDate: '2026-07-04',
      completedAt: '2026-07-04T18:00:00.000Z',
      createdAt: '2026-07-01T10:00:00.000Z',
      updatedAt: '2026-07-04T18:00:00.000Z',
    },
  ],
  discussions: [
    {
      id: 'disc-kommo-001',
      projectId: 'project-kommo-caio-001',
      content:
        'Kickoff: alinhamento de escopo — dois fluxos (clínica + cursos), prazo 4 dias úteis, entrega de estrutura CRM + Salesbot inicial + documentação.',
      direction: 'internal',
      channel: 'reunião',
      createdAt: '2026-07-01T10:00:00.000Z',
    },
    {
      id: 'disc-kommo-002',
      projectId: 'project-kommo-caio-001',
      content:
        'Status WhatsApp Business: conta Meta bloqueada. Não é possível conectar canal WhatsApp ao Kommo sem desbloqueio. Caminhos: apelação Meta, número alternativo ou email/teste sem canal real.',
      direction: 'outbound',
      channel: 'mensagem',
      createdAt: '2026-07-02T14:00:00.000Z',
    },
    {
      id: 'disc-kommo-003',
      projectId: 'project-kommo-caio-001',
      content:
        'Entrega final: estrutura Kommo configurada, Salesbot funcional com roteamento clínica/cursos, documentação completa. WhatsApp pendente de resolução pelo cliente.',
      direction: 'outbound',
      channel: 'mensagem',
      createdAt: '2026-07-04T17:00:00.000Z',
    },
  ],
}
