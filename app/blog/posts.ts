export interface Post {
  slug: string
  title: string
  category: string
  excerpt: string
  date: string
  readTime: string
  content: string
}

export const posts: Post[] = [
  {
    slug: 'ia-enterprise-modelo-operacional',
    title: 'IA enterprise começa pelo modelo operacional',
    category: 'Tese',
    excerpt:
      'Pilotos de IA falham quando tratam modelo como produto acabado. O valor aparece quando governança, contexto, workflow e accountability entram no mesmo desenho.',
    date: '2026-06-15',
    readTime: '6 min',
    content: `
<h2>O problema raramente é o modelo</h2>
<p>A maioria das empresas já consegue testar modelos, criar copilotos e gerar demos convincentes. A dificuldade começa depois: quem aprova uma ação, onde o agente busca contexto, como exceções são tratadas, qual registro prova que a decisão foi correta e quem responde quando o fluxo falha.</p>
<p>Por isso a pergunta central não é "qual LLM usar?". A pergunta útil é: qual modelo operacional permite que IA trabalhe dentro das regras reais da empresa?</p>
<blockquote>IA enterprise não é uma camada mágica sobre processos frágeis. É uma forma mais exigente de operar processos críticos.</blockquote>

<h2>Do piloto ao sistema operacional</h2>
<p>Um piloto mede possibilidade. Um sistema operacional mede repetibilidade. Para sair de um ponto ao outro, a organização precisa conectar quatro elementos: política, dados, workflow e evidência.</p>
<ul>
  <li><strong>Política:</strong> limites claros para o que o agente pode sugerir, executar ou escalar.</li>
  <li><strong>Dados:</strong> contexto confiável, com ownership e qualidade suficientes para orientar decisões.</li>
  <li><strong>Workflow:</strong> ações integradas ao trabalho real, não a uma tela isolada de demonstração.</li>
  <li><strong>Evidência:</strong> logs, handoffs e trilhas de decisão que permitam auditoria e melhoria contínua.</li>
</ul>

<h2>O papel da plataforma</h2>
<p>Plataformas como ServiceNow importam porque já ocupam a camada onde trabalho, dados operacionais, aprovações e experiência de serviço se encontram. Quando IA entra nesse ponto, ela deixa de ser só interface conversacional e passa a acelerar execução com controle.</p>
<p>A vantagem não vem de "ter IA". Vem de reduzir o intervalo entre intenção, roteamento, decisão e execução sem perder governança.</p>

<h2>A métrica que muda a conversa</h2>
<p>Quando o modelo operacional está claro, a discussão sai de hype e entra em adoption velocity: quanto tempo uma capacidade leva para sair de piloto, ser adotada por times reais, virar rotina medida e gerar expansão de valor.</p>
<p>Esse é o ponto em que IA deixa de ser experimento e passa a compor o operating model da empresa.</p>
    `,
  },
  {
    slug: 'governanca-agentes-human-gates',
    title: 'Human gates são arquitetura, não burocracia',
    category: 'Governança',
    excerpt:
      'Aprovação humana não precisa frear agentes. Quando desenhada como contrato de execução, ela aumenta confiança, reduz risco e acelera adoção.',
    date: '2026-06-14',
    readTime: '5 min',
    content: `
<h2>Governança não é o oposto de velocidade</h2>
<p>Em ambientes regulados, "deixar o agente decidir tudo" é uma caricatura. O desenho maduro separa sugestão, decisão, execução e auditoria. Cada etapa tem dono, limite e evidência.</p>
<p>Human gates funcionam quando são específicos. Um gate genérico vira fila manual. Um gate bem desenhado responde: qual risco está sendo controlado, quais dados embasam a decisão, qual SLA existe e o que acontece se o humano não responder.</p>

<h2>Três níveis de autonomia</h2>
<ul>
  <li><strong>Assistida:</strong> o agente recomenda e o humano executa.</li>
  <li><strong>Supervisionada:</strong> o agente prepara e executa depois de aprovação explícita.</li>
  <li><strong>Delegada:</strong> o agente executa dentro de limites preaprovados e escala exceções.</li>
</ul>
<p>O erro comum é discutir autonomia sem classificar o risco do workflow. Um reset de senha, uma mudança de acesso privilegiado e uma comunicação externa não merecem o mesmo contrato.</p>

<h2>O que precisa ficar registrado</h2>
<p>Todo gate precisa deixar rastro: input, contexto usado, decisão tomada, aprovador, timestamp, ação executada e resultado. Sem isso, a organização não aprende e a confiança não escala.</p>
<blockquote>A trilha de decisão é parte do produto. Sem evidência, não existe operação confiável.</blockquote>

<h2>O desenho vencedor</h2>
<p>O melhor human gate é quase invisível para fluxos de baixo risco e rigoroso para decisões de alto impacto. Essa seletividade permite escalar agentes sem transformar cada execução em comitê.</p>
    `,
  },
  {
    slug: 'agentops-registry-handoffs-evidencia',
    title: 'AgentOps precisa de registry, handoff e evidência',
    category: 'AgentOps',
    excerpt:
      'Operar agentes em produção exige mais que prompts bons. É preciso saber quem roda, com qual escopo, em qual estado, usando qual evidência.',
    date: '2026-06-13',
    readTime: '6 min',
    content: `
<h2>O agente não pode ser uma caixa solta</h2>
<p>Quando vários agentes começam a trabalhar sobre produto, código, operações e conteúdo, a pergunta deixa de ser "o prompt é bom?" e vira "qual é o sistema de controle?".</p>
<p>Sem registry, ninguém sabe quais agentes existem. Sem handoff, o trabalho some entre sessões. Sem evidência, decisões viram opinião. AgentOps é a disciplina que conecta essas peças.</p>

<h2>O registry define identidade</h2>
<p>Cada agente precisa ter escopo, dono, permissões, superfície de execução, riscos e stop conditions. Esse inventário evita duplicidade, reduz colisão de responsabilidades e ajuda a decidir quando criar, pausar ou aposentar um agente.</p>

<h2>O handoff preserva continuidade</h2>
<p>Trabalho operacional raramente cabe em uma única sessão. Handoff bom registra objetivo, estado atual, arquivos tocados, comandos rodados, validações, risco residual e próxima ação exata. O próximo agente não deveria reconstruir a história do zero.</p>

<h2>A evidência protege a operação</h2>
<ul>
  <li>Logs mostram o que aconteceu.</li>
  <li>Checks mostram o que foi validado.</li>
  <li>Screenshots mostram o que o usuário verá.</li>
  <li>Diffs mostram o que mudou.</li>
  <li>Decisões registradas mostram por que o caminho foi escolhido.</li>
</ul>
<p>Essa camada parece operacional, mas é estratégica: ela permite aumentar volume sem perder controle.</p>
    `,
  },
  {
    slug: 'servicenow-como-plataforma-de-orquestracao',
    title: 'ServiceNow como camada de orquestração de IA',
    category: 'Plataforma',
    excerpt:
      'O valor de IA cresce quando ela está perto do catálogo, dos dados operacionais, dos approvals, dos SLAs e do histórico de serviço.',
    date: '2026-06-12',
    readTime: '7 min',
    content: `
<h2>IA precisa estar onde o trabalho acontece</h2>
<p>Assistentes isolados geram respostas. Plataformas operacionais geram resolução. A diferença aparece quando IA consegue ler contexto, acionar workflows, respeitar políticas e registrar resultado no mesmo ambiente em que o serviço é gerenciado.</p>
<p>ServiceNow tem uma posição natural nessa conversa porque conecta experiência, workflow, dados operacionais e governança.</p>

<h2>CMDB e CSDM como contexto vivo</h2>
<p>Agentes precisam de contexto confiável para tomar decisões úteis. CMDB e CSDM não são apenas disciplina de arquitetura; são a base para entender impacto, dependências, ownership e criticidade.</p>
<p>Sem esse contexto, IA responde com fluência. Com esse contexto, IA pode priorizar, rotear e agir com mais precisão.</p>

<h2>Workflow como trilho de execução</h2>
<p>Quando uma recomendação vira tarefa, aprovação, mudança, incidente ou solicitação, o valor deixa de depender da memória do usuário. O trabalho entra em um sistema mensurável, com SLA, responsável e histórico.</p>

<h2>O ponto executivo</h2>
<p>A plataforma não é só tecnologia. Ela define como adoção vira rotina. Quanto mais perto a IA estiver da operação governada, maior a chance de sair do experimento e entrar no P&L.</p>
    `,
  },
  {
    slug: 'execucao-governada-adoption-velocity',
    title: 'Adoption velocity é a métrica executiva de IA',
    category: 'Execução',
    excerpt:
      'A pergunta executiva não é quantos pilotos existem. É quantas capacidades entram em rotina governada, com uso recorrente e impacto mensurável.',
    date: '2026-06-11',
    readTime: '5 min',
    content: `
<h2>Pilotos criam sinal, não necessariamente valor</h2>
<p>É possível ter dezenas de experimentos e pouca mudança operacional. O gargalo costuma aparecer entre demonstração e adoção: falta sponsor, falta processo, falta treinamento, falta governança ou falta integração com o trabalho real.</p>

<h2>Como medir adoption velocity</h2>
<p>Uma boa métrica acompanha a velocidade com que uma capacidade passa por quatro estágios:</p>
<ul>
  <li><strong>Identificada:</strong> caso de uso priorizado e dono definido.</li>
  <li><strong>Validada:</strong> hipótese testada com usuários e dados reais.</li>
  <li><strong>Operacionalizada:</strong> workflow, governança e suporte prontos.</li>
  <li><strong>Escalada:</strong> uso recorrente, impacto medido e expansão planejada.</li>
</ul>

<h2>Onde a execução trava</h2>
<p>O travamento raramente é só técnico. Ele aparece em decisão de ownership, disponibilidade de dados, integração com sistemas, comunicação com usuários e clareza sobre risco.</p>
<blockquote>Adoption velocity força a empresa a olhar para o sistema inteiro, não apenas para a demo.</blockquote>

<h2>O que acelera</h2>
<p>Casos de uso bem recortados, sponsor ativo, dados minimamente confiáveis, gates explícitos e um caminho claro de escala. Sem isso, o piloto vira teatro de inovação.</p>
    `,
  },
  {
    slug: 'medir-valor-ia-operacional',
    title: 'Como medir valor em IA operacional',
    category: 'Medição',
    excerpt:
      'Valor aparece em resolução, tempo, qualidade, risco reduzido e capacidade de escala. Métricas ruins empurram IA para vanity dashboards.',
    date: '2026-06-10',
    readTime: '6 min',
    content: `
<h2>Comece pelo resultado operacional</h2>
<p>Métricas de uso são úteis, mas insuficientes. A pergunta é o que mudou no processo: o tempo caiu, a qualidade subiu, o retrabalho reduziu, a fila andou, o risco foi melhor controlado?</p>

<h2>Cinco dimensões de valor</h2>
<ul>
  <li><strong>Tempo:</strong> redução no ciclo entre solicitação e resolução.</li>
  <li><strong>Qualidade:</strong> menos erro, menos retrabalho, mais consistência.</li>
  <li><strong>Capacidade:</strong> mais volume processado sem aumento linear de esforço.</li>
  <li><strong>Experiência:</strong> menos fricção para usuário, operador e gestor.</li>
  <li><strong>Risco:</strong> melhor controle, mais rastreabilidade e menos decisão informal.</li>
</ul>

<h2>O cuidado com dashboards bonitos</h2>
<p>Um painel pode mostrar prompts executados, mensagens enviadas e agentes ativos. Isso não prova valor. Valor exige comparação com baseline, janela de tempo e clareza sobre causa.</p>

<h2>A métrica certa muda comportamento</h2>
<p>Quando a métrica é resolução governada, o time desenha melhor o fluxo. Quando a métrica é volume de uso, o time otimiza adoção superficial. IA operacional precisa premiar qualidade de execução, não apenas atividade.</p>
    `,
  },
]

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}
