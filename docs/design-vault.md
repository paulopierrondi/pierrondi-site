# Pierrondi Design Vault

Rota publica/local: `/design`

Objetivo: manter um repertorio proprio de componentes, referencias e sistemas visuais para acelerar novas paginas, produtos, propostas e portfolios sem copiar identidade de terceiros.

## Fontes canonicas

- 21st Community components: `https://21st.dev/community/components`
- 21st docs: `https://help.21st.dev/community`
- Snapshot local: `docs/design-vault/21st-source-snapshot.json`
- Catalogo renderizado: `app/design/design-catalog.ts`

## Regra de uso

1. Consultar `/design` antes de criar qualquer pagina visual relevante.
2. Escolher categoria fonte: hero, pricing, AI chat, dashboard, forms, cards, loaders, footer etc.
3. Instalar componente apenas quando houver uso real no produto.
4. Preservar autor/licenca MIT quando copiar codigo.
5. Remixar para o sistema Pierrondi: preto profundo, lime/cyan/brass, evidencia, motion real e copy executiva.
6. Rodar `npm run build`, `npm run lint` e screenshot QA quando houver mudanca visual.

## Comandos

```bash
npm run design:sync-21st
npm run design:install -- author/component
npm run design:install -- https://21st.dev/r/author/component
```

## Politica de importacao

- O catalogo inteiro pode ficar mapeado como metadata.
- Codigo de terceiros nao entra em massa no bundle publico.
- Cada componente instalado precisa de:
  - fonte;
  - autor;
  - dependencias;
  - motivo de uso;
  - adaptacao visual;
  - build/lint;
  - evidencia visual quando afetar pagina publica.

## Componentes seed

| Componente | Autor | Uso | Comando |
| --- | --- | --- | --- |
| Pricing Component | `jatin-yadav05` | pricing table | `npm run design:install -- jatin-yadav05/pricing-component` |
| Cards Stack | `youcefbnm` | cases/cards | `npm run design:install -- youcefbnm/cards-stack` |
| Footer Column | `mvp_Subha` | footer institucional | `npm run design:install -- mvp_Subha/footer-column` |
| Thinking Tool | `21st.dev` | agent reasoning UI | referencia visual |
| Search Tool | `21st.dev` | search/tool UI | referencia visual |

## Design intake checklist

- [ ] A referencia tem licenca clara ou e usada apenas como inspiracao.
- [ ] O bloco resolve um caso real da pagina.
- [ ] Dependencias cabem no projeto.
- [ ] Copy e dados de demo foram trocados.
- [ ] Estados loading/empty/error foram considerados quando aplicavel.
- [ ] Mobile nao tem overflow.
- [ ] Acessibilidade basica: foco, contraste, labels e touch targets.
- [ ] Attribution/autor preservados quando codigo foi copiado.

## Nota para agentes

Antes de criar paginas novas para `pierrondi.dev`, `pierrondi-site` ou portfolio visual do Paulo, usar este Design Vault como primeira referencia local. A regra tambem esta registrada no Obsidian em `High Craft Frontend Visual Standard.md`.
