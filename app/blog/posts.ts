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
    title: 'Automação com n8n no Brasil: o guia prático para 2026',
    category: 'Automação',
    excerpt:
      'Como implementar automações de processo com n8n — sem programar, sem Zapier caro, sem vendor lock-in. Guia completo para PMEs brasileiras.',
    date: '2026-03-10',
    readTime: '9 min',
    content: `
<h2>O que é o n8n e por que ele importa agora</h2>
<p>O n8n é uma plataforma de automação de fluxo de trabalho de código aberto. Em termos práticos: você conecta ferramentas, define regras e ele executa processos automaticamente — sem intervenção humana. Pense em Zapier ou Make, mas com diferenças fundamentais que mudam o cálculo financeiro para PMEs.</p>
<p>Diferente dos concorrentes baseados em nuvem, o n8n pode ser hospedado no seu próprio servidor. Isso tem implicações diretas: <strong>você controla os dados, não paga por execução e não fica refém de reajuste de preço.</strong></p>
<blockquote>n8n não é ferramenta para developer. É ferramenta para quem quer resultado sem depender de developer.</blockquote>

<h2>n8n vs Zapier vs Make: a comparação honesta</h2>
<p>Esse é o ponto que a maioria dos guias erra por não ser direta. Veja os números:</p>
<p><strong>Zapier:</strong> plano profissional começa em ~USD 49/mês para 2.000 tarefas. Escala rápido. Um fluxo com 10 etapas consome 10 tarefas por execução. Uma empresa com 500 leads/mês e 3 automações ativas chega facilmente em USD 200–400/mês.</p>
<p><strong>Make:</strong> modelo de "operações" é mais barato que Zapier, mas também cobra por volume. A interface visual é boa, mas o vendor lock-in continua: seus fluxos ficam presos na plataforma deles.</p>
<p><strong>n8n self-hosted:</strong> custo fixo de infraestrutura. Um VPS básico na DigitalOcean, Hetzner ou Railway cobre a maioria dos casos por R$ 50–120/mês. Sem limite de execuções. Sem custo por tarefa. Os fluxos são seus — exportáveis em JSON, versionáveis no Git.</p>
<p>A desvantagem real do n8n: a curva inicial é maior. A interface é poderosa, mas requer mais configuração no começo. Para quem não tem tempo, faz sentido contratar alguém para implantar e treinar o time.</p>

<h2>Casos de uso reais para PMEs brasileiras</h2>
<h2>1. Gestão de leads do Instagram e WhatsApp</h2>
<p>Cenário comum: lead manda mensagem no Instagram, ninguém responde rápido, lead esfria. Com n8n:</p>
<ul style="margin: 16px 0 16px 24px; line-height: 1.9;">
  <li>Webhook captura a mensagem do Instagram via API</li>
  <li>n8n classifica a intenção com uma chamada ao GPT-4o (custo: frações de centavo)</li>
  <li>Lead quente → envia mensagem automática no WhatsApp via Evolution API ou Z-API</li>
  <li>Cria card no CRM (Pipedrive, HubSpot ou planilha Google)</li>
  <li>Avisa o vendedor via Slack ou WhatsApp pessoal</li>
</ul>
<p>Tempo de resposta cai de horas para segundos. Taxa de conversão aumenta porque o lead ainda está quente.</p>

<h2>2. Relatórios financeiros automáticos</h2>
<p>Todo contador ou gestor financeiro perde horas compilando relatórios que poderiam ser gerados automaticamente. Com n8n:</p>
<ul style="margin: 16px 0 16px 24px; line-height: 1.9;">
  <li>Toda segunda-feira às 8h, busca dados no ERP ou planilhas Google</li>
  <li>Consolida receitas, despesas, inadimplência</li>
  <li>Gera PDF ou Google Docs com o resumo</li>
  <li>Envia por email para sócios e contador</li>
</ul>
<p>Nenhuma linha de código. Só configuração de nós no n8n.</p>

<h2>3. Onboarding de clientes</h2>
<p>Quando um novo cliente fecha contrato, o processo manual é: criar acesso, enviar boas-vindas, agendar reunião de kick-off, avisar time interno. Com n8n, um trigger no CRM ou formulário executa tudo isso em sequência, com zero esforço humano pós-configuração.</p>

<h2>4. Monitoramento de estoque e compras</h2>
<p>Para varejistas e distribuidores: quando estoque de um produto cai abaixo de um threshold, n8n pode enviar alerta automático, criar pedido de compra em rascunho e avisar o comprador. Integra com sistemas legados via API ou até via scraping de telas.</p>

<h2>Como começar com n8n hoje</h2>
<p><strong>Opção 1 — n8n Cloud:</strong> plano gratuito limitado, mas suficiente para testar. Acesse n8n.io e crie uma conta. Sem servidor, sem configuração.</p>
<p><strong>Opção 2 — Self-hosted no Railway:</strong> deploy em 10 minutos com o template oficial do n8n no Railway. Custo em torno de R$ 30–60/mês para uso moderado. Controle total.</p>
<p><strong>Opção 3 — VPS dedicado:</strong> Hetzner CAX11 (ARM, 2vCPU, 4GB RAM) custa ~EUR 3,79/mês. Com Docker Compose, n8n roda estável para centenas de execuções por hora.</p>
<p>Para instalar com Docker:</p>
<p><strong>Passo a passo mínimo:</strong> instale Docker, copie o docker-compose.yml oficial do n8n, configure as variáveis de ambiente (domínio, usuário, senha), suba o container. Em 20 minutos você tem n8n rodando com HTTPS.</p>

<h2>Quando contratar alguém para implementar</h2>
<p>Faz sentido contratar quando:</p>
<ul style="margin: 16px 0 16px 24px; line-height: 1.9;">
  <li>O processo envolve mais de 3 sistemas distintos</li>
  <li>Há lógica condicional complexa (múltiplos cenários, tratamento de erros)</li>
  <li>O custo do erro é alto (cobranças, comunicação com cliente)</li>
  <li>Seu time não tem tempo para a curva de aprendizado</li>
  <li>Você quer documentação e treinamento incluídos</li>
</ul>
<p>Uma implementação profissional custa R$ 1.500–4.000 dependendo da complexidade. O ROI aparece em semanas quando você soma as horas que seu time para de gastar em tarefas repetitivas.</p>
<p>O n8n não é bala de prata — é uma ferramenta. Usada no contexto certo, com a configuração certa, entrega resultado mensurável em menos tempo do que qualquer outra alternativa no mercado hoje.</p>
    `,
  },
  {
    slug: 'mvp-em-4-semanas',
    title: 'Como lançar um MVP em 4 semanas (sem contratar um time)',
    category: 'Produto Digital',
    excerpt:
      'O framework que usamos para ir do briefing ao deploy em menos de um mês. Stack, decisões, armadilhas e o que realmente importa no MVP.',
    date: '2026-03-18',
    readTime: '10 min',
    content: `
<h2>MVP não é protótipo — entenda a diferença antes de começar</h2>
<p>Existe uma confusão recorrente que custa dinheiro e tempo: tratar MVP como sinônimo de protótipo. Não é.</p>
<p><strong>Protótipo</strong> é uma representação visual ou funcional limitada para validar conceito. Não vai para produção. Não tem usuário real.</p>
<p><strong>MVP (Minimum Viable Product)</strong> é o menor produto funcional que entrega valor real para um usuário real e permite coletar feedback qualificado. Tem deploy, tem acesso, tem dados.</p>
<p>A diferença prática: um protótipo no Figma ou Framer leva 3–5 dias. Um MVP leva 3–6 semanas com a stack certa. Confundir os dois leva a duas armadilhas opostas: lançar um protótipo caro demais, ou gastar 6 meses num produto que ninguém pediu.</p>
<blockquote>O objetivo do MVP não é ser pequeno. É ser o mínimo para aprender algo específico sobre o mercado.</blockquote>

<h2>A stack que funciona: Next.js + Supabase + Railway</h2>
<p>Para a maioria dos MVPs de produto digital — aplicativos web, SaaS, dashboards, portais — essa stack entrega velocidade real sem débito técnico grave:</p>
<p><strong>Next.js 15 (App Router):</strong> React com SSR, rotas de API integradas, deploy trivial. Não precisa de backend separado para a maioria dos casos. TypeScript por padrão. Ecossistema maduro.</p>
<p><strong>Supabase:</strong> PostgreSQL gerenciado com autenticação, storage e realtime fora da caixa. A alternativa ao Firebase sem vendor lock-in. Plano gratuito generoso para validação. Migração para instância própria é direta quando o produto crescer.</p>
<p><strong>Railway:</strong> deploy do Next.js em 2 minutos. CI automático no push do GitHub. Custo proporcional ao uso — começa em zero. Melhor custo-benefício que Vercel para backends com volume.</p>
<p>O que essa stack não cobre bem: apps mobile nativos, processamento intensivo de dados, sistemas com requisitos de compliance muito específicos. Para esses casos, a stack muda.</p>

<h2>As 4 semanas — o que acontece em cada uma</h2>
<h2>Semana 1: Briefing e decisões</h2>
<p>Não escreve código ainda. O trabalho aqui é:</p>
<ul style="margin: 16px 0 16px 24px; line-height: 1.9;">
  <li>Mapear o fluxo principal do usuário (1 jornada, não todas)</li>
  <li>Definir o que entra no MVP e o que vai para a v2 (essa lista é mais importante do que parece)</li>
  <li>Configurar o ambiente: repositório, Supabase, Railway, variáveis de ambiente</li>
  <li>Validar layout mobile no Figma ou em wireframe — sem pixel-perfect, só fluxo</li>
  <li>Escrever os critérios de aceite das telas principais</li>
</ul>
<p>Tempo gasto aqui previne 3x mais tempo perdido nas semanas seguintes.</p>

<h2>Semana 2: Core funcional</h2>
<p>Agora escreve código. Foco total na funcionalidade central — a ação que define o produto:</p>
<ul style="margin: 16px 0 16px 24px; line-height: 1.9;">
  <li>Autenticação (Supabase Auth resolve em 2 horas)</li>
  <li>Modelo de dados no banco — tabelas, relacionamentos, RLS policies</li>
  <li>As 2–3 telas que compõem o fluxo principal</li>
  <li>API routes para as operações críticas</li>
</ul>
<p>Sem dashboard de admin ainda. Sem configurações. Sem relatórios. Só o que o usuário precisa para completar a ação principal.</p>

<h2>Semana 3: Polimento e casos de erro</h2>
<p>O que separa um MVP que converte de um que frustra usuários:</p>
<ul style="margin: 16px 0 16px 24px; line-height: 1.9;">
  <li>Estados de loading, empty states, mensagens de erro claras</li>
  <li>Validação de formulários no cliente e no servidor</li>
  <li>Responsividade — pelo menos iOS Safari e Chrome Android</li>
  <li>Emails transacionais básicos (Resend ou SendGrid — Supabase integra nativamente)</li>
  <li>Tela de onboarding mínima para novo usuário não se perder</li>
</ul>

<h2>Semana 4: Deploy, testes e lançamento controlado</h2>
<ul style="margin: 16px 0 16px 24px; line-height: 1.9;">
  <li>Deploy em produção no Railway com domínio customizado</li>
  <li>Teste manual de todo o fluxo principal em diferentes dispositivos</li>
  <li>Convite para 5–10 usuários beta selecionados</li>
  <li>Configurar analytics básico (Plausible ou PostHog)</li>
  <li>Canal de feedback (pode ser um grupo no WhatsApp, um formulário, um Typeform)</li>
</ul>
<p>Lançamento controlado não é fraqueza — é estratégia. Você quer feedback qualificado de pessoas que representam o usuário ideal, não métricas de vaidade.</p>

<h2>O que NÃO fazer no MVP</h2>
<p>Essa lista é tão importante quanto o que fazer:</p>
<ul style="margin: 16px 0 16px 24px; line-height: 1.9;">
  <li><strong>Não construir múltiplos planos de precificação</strong> antes de ter o primeiro cliente pagando</li>
  <li><strong>Não otimizar performance</strong> antes de ter usuários reais</li>
  <li><strong>Não criar dashboard admin completo</strong> — acesse o banco direto no começo</li>
  <li><strong>Não implementar notificações push, gamificação, sistema de indicações</strong> — essas features são para v2</li>
  <li><strong>Não esperar estar "pronto" para mostrar</strong> — nenhum MVP está. O objetivo é aprender.</li>
</ul>

<h2>Quando contratar vs fazer interno</h2>
<p>Faça interno quando: o fundador tem background técnico, o produto é simples, você tem 3+ meses de runway para aprender enquanto constrói.</p>
<p>Contrate quando: cada semana parado tem custo de oportunidade real, o produto envolve integrações complexas, ou o fundador precisa focar em vendas enquanto o produto é construído.</p>
<p>O custo de um MVP contratado varia de R$ 5.000 a R$ 15.000 dependendo da complexidade. O critério de decisão não é o valor — é quanto custa cada semana adicional sem o produto no mercado.</p>
    `,
  },
  {
    slug: 'quanto-custa-cto-fracionado',
    title: 'Quanto custa um CTO fracionado no Brasil em 2026?',
    category: 'Tech Partner',
    excerpt:
      'Comparativo real: CTO CLT vs CTO fracionado vs agência vs freelancer. Quando cada modelo faz sentido para startups e PMEs.',
    date: '2026-03-25',
    readTime: '8 min',
    content: `
<h2>Por que o CTO fracionado cresceu tanto</h2>
<p>O modelo de liderança técnica fracionada não é novo — existe em outros países há mais de uma década. No Brasil, ganhou tração nos últimos 3 anos por uma razão simples: o custo de um CTO sênior CLT se tornou proibitivo para a maioria das startups early-stage e PMEs em crescimento.</p>
<p>Ao mesmo tempo, a complexidade técnica dos negócios aumentou. Hoje qualquer empresa de médio porte precisa tomar decisões sobre stack tecnológica, fornecedores de IA, segurança de dados, arquitetura de integrações. Essas decisões têm impacto financeiro direto — e tomá-las sem orientação técnica sólida custa caro.</p>

<h2>O comparativo real de custos</h2>
<p><strong>CTO CLT sênior:</strong> salário entre R$ 18.000 e R$ 30.000/mês. Soma os encargos trabalhistas (FGTS, INSS patronal, férias, 13º, benefícios mínimos) e o custo total para a empresa fica entre R$ 28.000 e R$ 48.000/mês. Mais os benefícios de mercado esperados por um profissional desse nível: plano de saúde família, equity, bônus. All-in: R$ 35.000–60.000/mês.</p>
<p><strong>CTO fracionado:</strong> entre R$ 2.500 e R$ 8.000/mês dependendo da carga horária e nível de senioridade. Geralmente cobre 20–40 horas mensais. Sem encargos. Sem benefícios. Sem processo seletivo longo.</p>
<p><strong>Agência de tecnologia:</strong> entre R$ 8.000 e R$ 25.000/mês para entregas contínuas. Foco em execução, não em estratégia. O problema com agências é que elas entregam o que você pede — não necessariamente o que você precisa.</p>
<p><strong>Freelancer técnico sênior:</strong> entre R$ 150 e R$ 350/hora. Bom para execução pontual, ruim para responsabilidade contínua e visão estratégica.</p>
<blockquote>A pergunta certa não é "quanto custa o CTO fracionado?" — é "quanto custa uma decisão técnica errada sem orientação?"</blockquote>

<h2>O que um CTO fracionado faz (e não faz)</h2>
<p><strong>Faz:</strong></p>
<ul style="margin: 16px 0 16px 24px; line-height: 1.9;">
  <li>Define e documenta a arquitetura técnica da empresa</li>
  <li>Avalia e seleciona fornecedores de tecnologia e SaaS</li>
  <li>Contrata, onboarda e avalia desenvolvedores e freelancers</li>
  <li>Participa de reuniões com investidores como representante técnico</li>
  <li>Gerencia débito técnico e define prioridades do roadmap</li>
  <li>Garante boas práticas de segurança, backup e compliance</li>
  <li>Traduz necessidades de negócio em requisitos técnicos</li>
</ul>
<p><strong>Não faz:</strong></p>
<ul style="margin: 16px 0 16px 24px; line-height: 1.9;">
  <li>Execução de código em tempo integral (geralmente)</li>
  <li>Suporte técnico de primeiro nível</li>
  <li>Gestão operacional do dia a dia do time de dev</li>
  <li>Substituir um VP de Engenharia em empresa com mais de 20 devs</li>
</ul>

<h2>Sinais de que você precisa de um CTO fracionado</h2>
<p>Os mais comuns que vejo em startups e PMEs:</p>
<ul style="margin: 16px 0 16px 24px; line-height: 1.9;">
  <li>Você está contratando um dev sênior mas não sabe como avaliá-lo</li>
  <li>Você tem 2–3 fornecedores tech e não sabe se as escolhas são boas</li>
  <li>Seu produto está crescendo mas ficando lento e instável</li>
  <li>Você vai captar investimento e o investidor vai perguntar sobre a stack</li>
  <li>Você acabou de demitir um CTO interno e precisa de continuidade</li>
  <li>Você tem decisões técnicas críticas pendentes há meses por falta de clareza</li>
</ul>

<h2>Como escolher o CTO fracionado certo</h2>
<p>Critérios objetivos que fazem diferença:</p>
<p><strong>Background em produto, não só em infraestrutura.</strong> CTOs que só sabem falar de cloud e DevOps raramente ajudam startups early-stage. Você precisa de alguém que entenda produto, go-to-market técnico e integração de IA.</p>
<p><strong>Experiência com o seu estágio.</strong> Um CTO que trabalhou sempre em empresas grandes não sabe operar em contexto de recurso escasso. Procure histórico em early-stage ou em empresas de tamanho similar à sua.</p>
<p><strong>Modelo de contrato claro.</strong> Defina horas, escopo, disponibilidade para urgências e forma de comunicação. CTO fracionado sem contrato estruturado vira consultoria cara e desestruturada.</p>
<p><strong>Referências verificáveis.</strong> Fale com 1–2 empresas onde ele atuou. Pergunte: qual foi o maior problema que ele resolveu? Qual foi a maior limitação?</p>
<p>O modelo fracionado faz mais sentido para empresas entre R$ 500 mil e R$ 5 milhões de faturamento anual, ou startups de seed até série A. Depois disso, geralmente faz sentido internalizar a liderança técnica.</p>
    `,
  },
  {
    slug: 'ia-para-pequenas-empresas-2026',
    title: 'IA para pequenas empresas em 2026: o que funciona de verdade',
    category: 'IA',
    excerpt:
      'Claude, n8n, Make, Gemini — o que realmente dá resultado para PMEs brasileiras vs o que é hype. Casos práticos e ROI real.',
    date: '2026-04-01',
    readTime: '11 min',
    content: `
<h2>Desmistificando IA para PMEs</h2>
<p>A maioria das PMEs brasileiras está em um de dois extremos: ignorando IA completamente por achar complexo demais, ou comprando ferramentas caras que nunca saem do piloto. Os dois caminhos custam dinheiro.</p>
<p>A realidade é mais simples: <strong>IA para PMEs em 2026 não é sobre transformação digital radical</strong>. É sobre automatizar tarefas repetitivas específicas com ROI mensurável em 30–90 dias. Nada mais sofisticado do que isso para começar.</p>
<p>Este guia vai ignorar o hype e focar no que realmente funciona — com custo real, tempo real de implementação e ROI esperado.</p>
<blockquote>A pergunta certa não é "como usar IA no meu negócio?" — é "qual tarefa repetitiva específica, se eliminada, libera mais tempo ou dinheiro este mês?"</blockquote>

<h2>O que funciona: casos com ROI comprovado</h2>
<h2>1. Atendimento automático via WhatsApp</h2>
<p>O caso de uso com maior adoção e ROI mais rápido para PMEs brasileiras. O WhatsApp é o canal de comunicação dominante no Brasil — qualquer empresa que vende para consumidor final usa.</p>
<p><strong>Como funciona:</strong> bot conectado à API do WhatsApp Business (via Z-API ou Evolution API) responde perguntas frequentes, qualifica leads, agenda reuniões e só escala para humano quando necessário.</p>
<p><strong>Custo real:</strong> R$ 150–400/mês de infraestrutura (API + LLM). Implementação: R$ 2.000–5.000 uma única vez.</p>
<p><strong>ROI real:</strong> empresa com 200 atendimentos/mês e 1 atendente dedicado economiza 60–80 horas mensais. A R$ 25/hora, isso é R$ 1.500–2.000/mês liberados. Payback em menos de 3 meses.</p>

<h2>2. Qualificação automática de leads</h2>
<p>Vendas B2B com volume médio de leads (50–300/mês) costumam ter um gargalo claro: SDR gasta horas pesquisando leads antes de qualificar. IA resolve isso.</p>
<p><strong>Como funciona:</strong> quando um lead entra (formulário, LinkedIn, indicação), n8n dispara uma rotina que busca informações públicas da empresa (LinkedIn, site, CNPJ), passa para um LLM que gera um resumo de qualificação e nota de 1–10, e entrega isso pro vendedor antes do primeiro contato.</p>
<p><strong>Custo real:</strong> R$ 0,05–0,20 por lead qualificado (custo do LLM). Infraestrutura: n8n self-hosted ou Make.</p>
<p><strong>ROI real:</strong> SDR que qualificava 40 leads/dia passa a qualificar 120. Ou a mesma qualificação com 1/3 do tempo, permitindo mais tempo em conversas reais.</p>

<h2>3. Geração automática de relatórios</h2>
<p>Relatórios recorrentes — financeiro, vendas, operacional — são o caso de uso mais subestimado. Toda empresa de médio porte tem alguém gastando 4–8 horas por semana compilando dados que poderiam ser automatizados.</p>
<p><strong>Como funciona:</strong> n8n busca dados nas fontes (ERP, Google Sheets, banco de dados, APIs), estrutura em template, passa por LLM para adicionar análise narrativa, gera PDF ou Google Doc e envia por email.</p>
<p><strong>Custo real:</strong> praticamente zero além da infraestrutura já existente.</p>
<p><strong>ROI real:</strong> 4–8 horas semanais liberadas. Para um gestor a R$ 80/hora, isso é R$ 1.280–2.560/mês em produtividade recuperada.</p>

<h2>4. Criação de conteúdo estruturado</h2>
<p>Não estamos falando de substituir redator. Estamos falando de eliminar o trabalho de formatação, adaptação e distribuição de conteúdo existente.</p>
<p><strong>Casos concretos:</strong></p>
<ul style="margin: 16px 0 16px 24px; line-height: 1.9;">
  <li>Transcrever reuniões de cliente → gerar ata + próximos passos automaticamente</li>
  <li>Adaptar post de blog para formato LinkedIn, Instagram e email em 1 clique</li>
  <li>Gerar rascunho de proposta comercial a partir de briefing preenchido</li>
  <li>Criar FAQ atualizado a partir das perguntas mais frequentes do suporte</li>
</ul>

<h2>Ferramentas por caso de uso</h2>
<p><strong>Para automação de fluxo (orquestração):</strong> n8n (self-hosted, melhor custo-benefício) ou Make (mais fácil, mais caro em escala).</p>
<p><strong>Para o LLM em si:</strong> Claude 3.5 Sonnet para tarefas que exigem raciocínio e precisão. GPT-4o para integração com ecossistema OpenAI. Gemini 2.0 Flash para volume alto com custo baixo.</p>
<p><strong>Para WhatsApp:</strong> Evolution API (open source, self-hosted) ou Z-API (SaaS brasileiro, mais simples).</p>
<p><strong>Para criação de conteúdo:</strong> Claude.ai para tarefas estratégicas e redação. Ideogram ou Flux para imagens.</p>

<h2>O que NÃO funciona (ainda) para PMEs</h2>
<ul style="margin: 16px 0 16px 24px; line-height: 1.9;">
  <li><strong>Agentes totalmente autônomos</strong> — IA tomando decisões sem supervisão humana em processos críticos ainda falha muito</li>
  <li><strong>Substituição de atendimento humano 100%</strong> — clientes percebem e ressentem em situações complexas</li>
  <li><strong>Previsão de demanda com dados históricos limitados</strong> — modelos precisam de volume de dados que a maioria das PMEs não tem</li>
  <li><strong>Personalização em escala sem dados de comportamento</strong> — sem histórico, a personalização é superficial</li>
</ul>

<h2>Por onde começar</h2>
<p>O framework que recomendamos para PMEs que estão começando com IA:</p>
<p><strong>Semana 1:</strong> Liste as 5 tarefas repetitivas que seu time mais reclama. Estime o tempo gasto por semana em cada uma.</p>
<p><strong>Semana 2:</strong> Escolha a de maior impacto e menor complexidade técnica. Mapeie o processo passo a passo.</p>
<p><strong>Semanas 3–4:</strong> Implemente uma automação simples. Não precisa ser perfeita. Precisa funcionar.</p>
<p><strong>Mês 2:</strong> Meça o resultado real. Se positivo, avance para o próximo processo. Se negativo, entenda o motivo antes de avançar.</p>
<p>A armadilha mais comum é querer implementar tudo de uma vez. IA mal implementada cria mais problema do que resolve. Um processo automatizado bem implementado cria confiança para o próximo.</p>
<p>O mercado brasileiro tem características específicas que favorecem a adoção: WhatsApp como canal dominante, alta tolerância a chatbots para atendimento, e um custo de mão-de-obra que torna o ROI de automação muito atrativo mesmo com soluções simples.</p>
    `,
  },
  {
    slug: 'audit-de-automacao',
    title: 'Audit de Automação: o que é, quando faz sentido e o que você recebe',
    category: 'Automação',
    excerpt:
      'Antes de contratar qualquer implementação, você precisa saber o que exatamente pode ser automatizado no seu processo — e quanto isso vai custar. É isso que um audit de automação entrega.',
    date: '2026-05-09',
    readTime: '7 min',
    content: `
<h2>O problema de pular o diagnóstico</h2>
<p>A maioria das empresas contrata automação da forma errada: chega com um problema vago ("quero automatizar o meu funil"), recebe uma proposta com escopo aberto, paga um valor sem referência, e três meses depois descobre que automatizou a parte errada do processo.</p>
<p>O problema não é a ferramenta. É a falta de diagnóstico antes da implementação.</p>
<p>Um audit de automação é exatamente isso: um diagnóstico técnico que vem antes de qualquer implementação. Ele responde três perguntas concretas:</p>
<ul style="margin: 16px 0 16px 24px; line-height: 1.9;">
  <li>O que no seu processo atual é automatizável — e o que não é?</li>
  <li>Com quais ferramentas, em quanto tempo, por quanto?</li>
  <li>Qual o ROI esperado — horas liberadas, custo evitado, payback?</li>
</ul>
<p>Com essas respostas em mãos, você pode decidir se investe, posterga ou descarta. Sem elas, você está atirando no escuro.</p>

<h2>O que um audit de automação cobre</h2>
<p>Um audit bem feito não é uma consultoria genérica. É um relatório técnico com escopo definido. O que você deve esperar receber:</p>

<h3>1. Mapa do processo atual</h3>
<p>Antes de falar em automação, é preciso entender o que está acontecendo hoje. Isso significa mapear o fluxo passo a passo: quem faz o quê, em quanto tempo, com quais ferramentas, e onde estão os gargalos. O mapa não é teórico — é desenhado a partir de como o processo realmente funciona, não como foi planejado.</p>

<h3>2. Identificação do que dá pra automatizar</h3>
<p>Nem tudo pode ser automatizado com custo-benefício positivo. Processos com alta variabilidade humana, decisões que dependem de julgamento, ou situações de exceção frequente raramente valem a complexidade técnica de automatizar. O audit separa o que é viável do que seria sobre-engenharia.</p>

<h3>3. Stack recomendada</h3>
<p>Não existe ferramenta universal. n8n faz sentido para processos que precisam de lógica customizada e que vão escalar. Make é melhor para equipes não-técnicas com integrações simples. Scripts Python ou TypeScript fazem sentido quando a lógica é muito específica. O audit recomenda a stack certa para o seu caso — sem parceria comercial, sem viés de vendor.</p>

<h3>4. Estimativa de ROI</h3>
<p>Horas economizadas por semana × custo da hora do seu time = economia anual. Divida pelo custo de implementação e você tem o payback. Um audit sério faz esse cálculo com os seus números reais — não com médias do mercado.</p>

<h3>5. Proposta de implementação (se quiser seguir)</h3>
<p>Se o diagnóstico apontar que faz sentido avançar, o audit já sai com escopo, prazo e preço de implementação fechados. Sem surpresa na proposta porque o trabalho de entender o problema já foi feito.</p>

<h2>Quando um audit faz sentido</h2>
<p>Um audit de automação faz sentido quando você tem pelo menos uma das seguintes situações:</p>
<ul style="margin: 16px 0 16px 24px; line-height: 1.9;">
  <li><strong>Processo manual que consome mais de 5 horas/semana</strong> do seu time ou de você mesmo</li>
  <li><strong>Você já tentou automatizar</strong> e não conseguiu ou o resultado foi insatisfatório</li>
  <li><strong>Você tem orçamento para implementação</strong> mas não sabe por onde começar ou o que priorizar</li>
  <li><strong>Você está avaliando proposta de outra agência</strong> e quer um segundo olhar independente sobre o escopo</li>
  <li><strong>Seu time cresceu</strong> e os processos que funcionavam com 3 pessoas não escalam para 10</li>
</ul>
<p>Um audit <em>não</em> faz sentido quando você já sabe exatamente o que precisa e só precisa de execução. Nesse caso, vá direto para orçamento de implementação.</p>

<h2>Quanto custa um audit de automação</h2>
<p>Depende do escopo e de quem está fazendo. Um audit feito por alguém que vai executar depois tem custo diferente de um diagnóstico independente. O que é razoável esperar:</p>
<ul style="margin: 16px 0 16px 24px; line-height: 1.9;">
  <li><strong>R$0</strong>: diagnósticos gratuitos existem, mas geralmente são vendas disfarçadas. O relatório vai apontar que a solução deles resolve tudo.</li>
  <li><strong>R$200–500</strong>: faixa para audits de processo único, escopo fechado, entrega em uma semana. É o modelo que faz sentido para PMEs — paga o suficiente para garantir trabalho sério, não o suficiente para virar projeto.</li>
  <li><strong>R$2.000–8.000</strong>: audits de processos múltiplos ou envolvendo múltiplos departamentos, com workshops internos e entrevistas com time. Faz sentido para empresas maiores ou quando o processo é crítico o suficiente para justificar o investimento.</li>
</ul>
<p>O critério de avaliação não é preço — é o que está incluído no escopo. Um audit de R$297 com relatório de 10 páginas, planilha de ROI e call de 30 minutos entrega mais valor do que um de R$0 que empurra uma solução específica.</p>

<h2>O que fazer com o relatório</h2>
<p>Um bom audit entrega informação suficiente para você tomar três decisões possíveis:</p>
<p><strong>Implementar internamente:</strong> se o relatório recomenda ferramentas que seu time consegue operar, você pode seguir com os seus recursos. O relatório funciona como guia técnico independente de quem vai executar.</p>
<p><strong>Contratar implementação:</strong> se o escopo justifica contratação, o audit já entrega proposta com prazo e custo fechados. Você não precisa começar o processo de orçamento do zero.</p>
<p><strong>Postergar ou descartar:</strong> às vezes o diagnóstico mostra que o ROI não compensa agora — o processo vai mudar em 6 meses, ou a complexidade de implementação é maior do que o ganho. Saber que não faz sentido hoje também é resultado útil.</p>

<h2>Red flags em um audit de automação</h2>
<p>Antes de contratar qualquer diagnóstico, observe:</p>
<ul style="margin: 16px 0 16px 24px; line-height: 1.9;">
  <li><strong>Relatório genérico demais:</strong> se o relatório poderia se aplicar a qualquer empresa do mesmo setor, não foi feito para o seu processo.</li>
  <li><strong>Recommenda só uma ferramenta:</strong> quem tem parceria com Salesforce vai recomendar Salesforce. Audit independente olha para o problema e escolhe a ferramenta certa, não a favorita.</li>
  <li><strong>Sem estimativa de ROI:</strong> automação sem número não é diagnóstico, é opção política.</li>
  <li><strong>Prazo indefinido:</strong> se o audit não tem prazo de entrega, provavelmente não tem escopo real.</li>
</ul>
<p>Um audit de automação bem feito é o investimento mais barato que você pode fazer antes de gastar R$5.000–30.000 em implementação. O custo de descobrir que automatizou a coisa errada é ordens de magnitude maior do que o custo de um diagnóstico.</p>
    `,
  },
  {
    slug: 'agente-de-ia-para-marketing',
    title: 'Agente de IA para marketing: como PMEs estão produzindo conteúdo sem contratar redatores',
    category: 'Marketing OS',
    excerpt:
      'Como usar agentes de IA para escalar produção de conteúdo sem perder a voz da marca — e sem precisar revisar cada post do zero.',
    date: '2026-05-09',
    readTime: '8 min',
    content: `
<h2>O problema de conteúdo que ninguém fala</h2>
<p>Toda empresa que depende de tráfego orgânico enfrenta o mesmo gargalo: não falta ideia de conteúdo, falta capacidade de executar. Um post de LinkedIn leva 45 minutos de uma pessoa sênior para escrever, revisar e adaptar. Um blog como este leva 3–4 horas. Uma newsletter semanal, mais 2 horas.</p>
<p>Multiply por 4 posts/semana, 52 semanas por ano, e você tem um número que não cabe no orçamento de marketing de uma PME.</p>
<p>A resposta óbvia é contratar redatores. A resposta real é que redatores bons custam R$3.000–6.000/mês, levam semanas para aprender a voz da marca, e ainda precisam de revisão constante. Agências de conteúdo resolvem a escala mas cobram por volume, com qualidade que cai à medida que o volume aumenta.</p>
<p>Agentes de IA mudam esse cálculo — mas não da forma que a maioria das pessoas imagina.</p>

<h2>O que um agente de IA para marketing faz (de verdade)</h2>
<p>Um agente de IA para marketing não é um gerador de texto. É um sistema que executa um fluxo de trabalho — da ideia ao draft publicável — com intervenção humana nos pontos certos.</p>
<p>A distinção importa porque a maioria das implementações falha exatamente aqui: usam IA como gerador de texto em vez de como executor de processo. O resultado é conteúdo genérico que soa como IA, porque literalmente é — sem processo, sem contexto, sem voz.</p>
<p>Um agente de marketing bem configurado funciona assim:</p>
<ul style="margin: 16px 0 16px 24px; line-height: 1.9;">
  <li><strong>Recebe um input</strong> (tema, ângulo, dado novo, evento de mercado)</li>
  <li><strong>Busca contexto</strong> (posts anteriores, dados da empresa, tom de voz calibrado)</li>
  <li><strong>Gera o draft</strong> seguindo estrutura definida (hook, corpo, CTA)</li>
  <li><strong>Passa por revisão de agente</strong> (checagem de tom, factual, consistência com brand)</li>
  <li><strong>Entra em fila de aprovação humana</strong> antes de qualquer publicação</li>
</ul>
<p>O humano entra em duas etapas: no input (decidir o que produzir) e na aprovação (aprovar o draft ou pedir ajuste). Tudo no meio é executado pelo agente.</p>

<h2>Por que a aprovação humana é inegociável</h2>
<p>Toda implementação séria de agente de marketing tem um gate de aprovação explícito antes de publicar qualquer coisa. Não porque IA erra sempre — mas porque o custo de um post com tom errado, dado incorreto, ou mensagem off-brand é alto demais para publicar sem revisão.</p>
<p>O modelo que funciona na prática: o agente produz, um humano aprova ou rejeita em 2 minutos. Não é revisão completa — é validação rápida. Com um draft bem estruturado, a revisão leva o tempo de ler o texto uma vez.</p>
<p>O que isso entrega: escala de produção com controle de qualidade. Você produz 10x mais conteúdo sem 10x mais tempo de revisão.</p>

<h2>Como treinar um agente com a voz da sua marca</h2>
<p>A diferença entre conteúdo que soa como IA e conteúdo que soa como você é o system prompt — o conjunto de instruções que define como o agente deve escrever.</p>
<p>Um system prompt de marketing inclui:</p>
<ul style="margin: 16px 0 16px 24px; line-height: 1.9;">
  <li><strong>Tom e voz:</strong> direto, técnico, sem buzzword? Informal, próximo, com gírias específicas? O agente precisa de exemplos concretos, não de descrições genéricas.</li>
  <li><strong>Vocabulário proibido:</strong> palavras ou expressões que a empresa nunca usa. "Inovador", "disruptivo", "soluções" geralmente entram nessa lista.</li>
  <li><strong>Estruturas de post:</strong> qual é a estrutura padrão de um post de LinkedIn? De uma newsletter? De um thread? Agente que segue estrutura consistente produz conteúdo com identidade reconhecível.</li>
  <li><strong>CTAs disponíveis:</strong> quais ações você quer que o leitor tome? O agente precisa saber para encerrar o post da forma certa.</li>
  <li><strong>Dados e prova:</strong> quais números, cases ou dados a empresa pode usar? Agente sem acesso a dados reais inventa — e invenção mata credibilidade.</li>
</ul>
<p>A calibração leva uma tarde. O resultado é um agente que produz drafts que precisam de ajuste mínimo — em vez de textos que precisam ser reescritos do zero.</p>

<h2>Canais que um agente de marketing consegue operar</h2>
<p>Um agente de marketing moderno consegue produzir conteúdo para múltiplos canais com regras específicas por canal:</p>
<p><strong>LinkedIn:</strong> posts de até 3.000 caracteres, com hook nas primeiras linhas (as únicas que aparecem sem clicar em "ver mais"), sem hashtags genéricas, com dados e perspectiva técnica.</p>
<p><strong>X (Twitter):</strong> threads de 3–8 tweets, com primeiro tweet como hook autossuficiente, cada tweet com uma ideia completa.</p>
<p><strong>Blog:</strong> posts longos de 1.200–2.500 palavras com estrutura de H2/H3, otimizados para SEO com keyword primária definida, com links internos para páginas de serviço.</p>
<p><strong>Email / newsletter:</strong> formato diferente — mais pessoal, sem necessidade de SEO, com call-to-action único claro.</p>
<p>Um agente bem configurado adapta o mesmo conteúdo para cada canal automaticamente, em vez de você adaptar manualmente quatro vezes.</p>

<h2>O que um Marketing OS entrega na prática</h2>
<p>Marketing OS é o nome que estamos usando para o sistema completo: agentes de geração + fila de aprovação + distribuição multi-canal + analytics de performance.</p>
<p>Na prática, o fluxo de uma empresa que usa Marketing OS funciona assim:</p>
<ul style="margin: 16px 0 16px 24px; line-height: 1.9;">
  <li>Segunda-feira de manhã: campanha da semana é configurada com tema e ângulos</li>
  <li>Agentes geram drafts para LinkedIn, X e blog durante a semana</li>
  <li>Founder ou marketing manager aprova (ou rejeita) cada draft em 2 minutos via interface web</li>
  <li>Posts aprovados são agendados automaticamente nos melhores horários de cada canal</li>
  <li>Analytics de performance alimenta as próximas campanhas</li>
</ul>
<p>O que o humano faz: decide a estratégia, valida os drafts, interpreta os resultados. O que o sistema faz: executa a produção, distribui, coleta dados.</p>

<h2>O que não funciona com agentes de marketing</h2>
<p>Para ser honesto sobre o que não resolve:</p>
<p><strong>Conteúdo de opinion leadership genuíno:</strong> posts que dependem de perspectiva pessoal forte, opinião controversa ou experiência não documentada precisam do humano como autor real. O agente pode ajudar na estrutura e edição, mas o conteúdo original precisa vir de você.</p>
<p><strong>Resposta a eventos em tempo real:</strong> quando algo acontece no mercado hoje, o agente não sabe a menos que você alimente o contexto. Reactância ao noticiário ainda depende de input humano rápido.</p>
<p><strong>Construção de relacionamento nos comentários:</strong> engajamento autêntico em comentários é humano. Agente pode rascunhar respostas, mas publicar sem revisão aqui é risco alto.</p>
<p>O modelo correto: agente para escala de conteúdo planejado + humano para engajamento, reactância e opinion leadership. Os dois juntos entregam uma presença digital consistente que seria impossível para uma pessoa ou uma equipe pequena manter manualmente.</p>

<h2>Como começar</h2>
<p>Se você quer experimentar antes de implementar um sistema completo:</p>
<p><strong>Passo 1:</strong> escreva 5 posts dos seus melhores do último ano. Identifique o padrão de estrutura, tom e o que funcionou.</p>
<p><strong>Passo 2:</strong> use esses posts como exemplos para criar um system prompt básico. Ferramentas como Claude, GPT-4o ou Gemini aceitam exemplos como referência.</p>
<p><strong>Passo 3:</strong> peça ao modelo para gerar um post sobre um tema específico seguindo os exemplos. Compare com os seus originais. Ajuste o prompt até o output ser aproveitável com 5 minutos de edição.</p>
<p><strong>Passo 4:</strong> se o resultado for bom o suficiente para publicar com edição mínima, você tem a prova de conceito. Aí faz sentido investir em automação do fluxo completo.</p>
<p>O critério de sucesso não é "o agente escreve melhor que eu". É "o agente produz drafts bons o suficiente para eu publicar com 5 minutos de revisão em vez de 45". Esse é o ROI real de um agente de marketing.</p>
    `,
  },
]

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}
