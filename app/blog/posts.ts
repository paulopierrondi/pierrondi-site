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
    slug: 'automacao-com-n8n-brasil',
    title: 'Automação com n8n no Brasil: arquitetura, custos e segurança em 2026',
    category: 'Automação',
    excerpt:
      'Guia prático para decidir entre n8n Cloud e self-hosted, desenhar workflows confiáveis e operar automações com segurança, evidência e human gates.',
    date: '2026-07-18',
    readTime: '10 min',
    content: `
<h2>Resposta direta: quando o n8n faz sentido?</h2>
<p>O n8n faz sentido quando um processo precisa conectar sistemas, aplicar regras e deixar evidência de cada execução. Ele é especialmente útil quando a automação vai além de copiar dados entre duas ferramentas: valida entradas, chama APIs, transforma informações, espera aprovações, trata erros e registra o resultado.</p>
<p>Para uma empresa brasileira, a decisão não deve começar pela quantidade de integrações. Deve começar por quatro perguntas: qual trabalho será eliminado, quais dados serão processados, quem responde por exceções e como o resultado será auditado.</p>
<blockquote>Automação confiável não é um diagrama que roda uma vez. É um workflow com dono, limites, tratamento de falha e evidência.</blockquote>

<h2>O que mudou no modelo do n8n</h2>
<p>O n8n oferece serviço hospedado e opções self-hosted. Nos planos pagos atuais, a unidade central de cobrança é a execução completa do workflow, e não cada nó individual. Preços, limites, retenção de histórico e recursos de colaboração mudam por plano; por isso a fonte correta para uma decisão comercial é a <a href="https://n8n.io/pricing/">página oficial de preços do n8n</a>, consultada na data da contratação.</p>
<p>A Community Edition self-hosted continua disponível, mas &quot;self-hosted&quot; não significa custo zero. Infraestrutura, banco de dados, backups, observabilidade, atualizações, segurança e suporte viram responsabilidade de quem opera a instância. Recursos empresariais específicos também podem exigir licença própria.</p>

<h2>n8n Cloud ou self-hosted?</h2>
<h3>Escolha n8n Cloud quando</h3>
<ul>
  <li>o time quer começar rápido e não quer operar servidor, banco e atualizações;</li>
  <li>os requisitos de residência, rede e customização são atendidos pelo serviço;</li>
  <li>o volume e a concorrência cabem no plano escolhido;</li>
  <li>a prioridade é reduzir carga operacional de infraestrutura.</li>
</ul>
<h3>Escolha self-hosted quando</h3>
<ul>
  <li>há requisito real de rede privada, customização, escala ou controle da infraestrutura;</li>
  <li>o time consegue manter TLS, backups, banco, workers, monitoramento e atualização de segurança;</li>
  <li>existe um owner operacional e um runbook de recuperação;</li>
  <li>a decisão de licença e suporte foi validada para o uso comercial pretendido.</li>
</ul>
<p>A documentação oficial mantém o caminho de <a href="https://docs.n8n.io/hosting/installation/docker/">instalação com Docker</a>, mas também alerta que self-hosting exige conhecimento de servidores, containers, segurança e configuração. Copiar um compose e abrir a porta não é uma arquitetura de produção.</p>

<h2>Arquitetura mínima de um workflow confiável</h2>
<p>Um workflow de produção deve ser desenhado como sistema operacional, não como sequência feliz de nós.</p>
<ol>
  <li><strong>Trigger autenticado:</strong> webhook assinado, agenda controlada ou evento de sistema com origem conhecida.</li>
  <li><strong>Validação:</strong> schema, campos obrigatórios, tamanho, formato e autorização antes de chamar serviços externos.</li>
  <li><strong>Idempotência:</strong> uma chave impede que retry, webhook duplicado ou clique repetido gere cobrança, mensagem ou registro duas vezes.</li>
  <li><strong>Separação de credenciais:</strong> cada integração usa a menor permissão necessária. Segredos não entram em código, planilha, prompt ou log.</li>
  <li><strong>Tratamento de erro:</strong> timeout, retry com limite, fila de exceção e alerta com contexto redigido.</li>
  <li><strong>Human gate:</strong> comunicação externa, gasto, exclusão, mudança de acesso ou ação irreversível espera aprovação explícita.</li>
  <li><strong>Evidência:</strong> ID da execução, timestamps, decisão, aprovador, resultado e link para o registro de origem.</li>
</ol>
<p>Para escala horizontal, o n8n documenta <a href="https://docs.n8n.io/hosting/scaling/queue-mode/">queue mode</a>. Ele exige desenho de workers, Redis, banco e persistência de dados binários compatível com a topologia. Ativar fila sem entender esses componentes apenas muda o lugar da falha.</p>

<h2>Segurança e LGPD: o que precisa ser decidido</h2>
<p>n8n é o processador do workflow, não uma dispensa de governança. A empresa continua responsável por mapear finalidade, base legal, operadores, retenção, transferência internacional e atendimento ao titular quando houver dados pessoais.</p>
<ul>
  <li>Classifique os dados antes de automatizar: público, interno, pessoal, sensível ou segredo.</li>
  <li>Evite enviar payload completo a um LLM quando campos redigidos ou agregados resolvem a tarefa.</li>
  <li>Defina retenção para dados de execução e elimine conteúdo que não precisa permanecer no histórico.</li>
  <li>Restrinja nodes de alto risco e acesso ao filesystem ou shell em ambientes self-hosted.</li>
  <li>Separe desenvolvimento, homologação e produção; não teste com credenciais ou dados reais.</li>
  <li>Faça backup e teste restauração. Backup nunca testado é apenas uma hipótese.</li>
</ul>
<p>A própria documentação reúne medidas de <a href="https://docs.n8n.io/privacy-security/what-you-can-do/">privacidade e segurança</a> e opções para <a href="https://docs.n8n.io/hosting/configuration/configuration-examples/isolation/">isolar a instância</a>. Para uso comercial, confira também a <a href="https://docs.n8n.io/sustainable-use-license/">Sustainable Use License</a> vigente.</p>

<h2>Casos de uso que costumam entregar valor</h2>
<h3>Lead e atendimento</h3>
<p>Receber um evento do formulário, validar consentimento, enriquecer apenas os campos necessários, criar ou atualizar o registro no CRM e alertar o owner. Mensagem ao cliente deve ter template aprovado, limite de frequência e saída para atendimento humano.</p>
<h3>Operação financeira</h3>
<p>Consolidar dados de fontes autorizadas, gerar uma prévia e pedir aprovação antes de emitir, pagar, cancelar ou comunicar. O workflow pode preparar a decisão; o sistema financeiro e o aprovador continuam sendo os controles finais.</p>
<h3>Relatórios e evidência</h3>
<p>Coletar métricas, validar período e fonte, gerar resumo e armazenar o artefato com data e provenance. Um relatório automático útil mostra também falhas de coleta e dados ausentes, em vez de preencher lacunas silenciosamente.</p>
<h3>AgentOps e IA</h3>
<p>Orquestrar classificação, busca de contexto, chamada ao modelo, avaliação e aprovação. A resposta do LLM é um input não confiável até passar por validação de schema, política e risco.</p>

<h2>Quando não usar n8n</h2>
<ul>
  <li>Para lógica transacional central que precisa de garantias fortes e já pertence a um serviço de domínio.</li>
  <li>Para processamento pesado de baixa latência que exige controle fino de memória e concorrência.</li>
  <li>Quando não existe owner para credenciais, falhas, atualização e suporte.</li>
  <li>Para automatizar um processo instável que muda toda semana e ainda não tem regra clara.</li>
</ul>
<p>Nesses casos, n8n pode continuar útil como camada de integração, mas não deve substituir o sistema que detém a regra de negócio.</p>

<h2>Plano de implantação em 30 dias</h2>
<ol>
  <li><strong>Semana 1 — diagnóstico:</strong> escolha um processo, meça volume, tempo, erros e custo atual. Defina owner e stop condition.</li>
  <li><strong>Semana 2 — workflow controlado:</strong> implemente o caminho feliz com dados de teste, idempotência e logs redigidos.</li>
  <li><strong>Semana 3 — falhas e gates:</strong> simule timeout, duplicidade, credencial expirada e aprovação negada.</li>
  <li><strong>Semana 4 — produção limitada:</strong> libere para uma amostra, acompanhe taxa de sucesso, tempo economizado, exceções e custo por execução.</li>
</ol>
<p>O indicador de sucesso não é &quot;quantos workflows foram criados&quot;. É quanto trabalho confiável passou a acontecer com menos tempo, menos erro e uma trilha de decisão melhor.</p>

<h2>Checklist de decisão</h2>
<ul>
  <li>O processo tem owner, entrada, saída e métrica de valor?</li>
  <li>Cloud versus self-hosted foi decidido por requisito, não por moda?</li>
  <li>Credenciais têm menor privilégio e rotação definida?</li>
  <li>Retries são limitados e operações críticas são idempotentes?</li>
  <li>Ações externas ou irreversíveis têm human gate?</li>
  <li>Logs e retenção respeitam segurança e LGPD?</li>
  <li>Existe rollback, alerta e runbook para falhas?</li>
</ul>
<p>Se essas respostas ainda não existem, o próximo passo não é adicionar mais nodes. É fechar o modelo operacional da automação.</p>
    `,
  },
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
