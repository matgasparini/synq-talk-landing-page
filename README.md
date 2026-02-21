# Synq Talk — Landing Page

Landing page oficial do [Synq Talk](https://synqtalk.com), um tradutor de reuniões com IA em tempo real. Construída com Next.js 15+ (App Router), React 19, Tailwind CSS 4 e TypeScript.

---

## Visão Geral

Synq Talk oferece tradução em tempo real com a menor latência do mercado (~120ms), suportando 30+ idiomas. Esta landing page é uma Single Page Application (SPA) com suporte a 4 idiomas (en, pt, es, fr) via troca de contexto client-side, integrada com uma lista de espera (waitlist).

---

## Stack Tecnológica

| Tecnologia | Versão | Finalidade |
|---|---|---|
| Next.js | 16.1.6 | Framework React com App Router |
| React | 19.2.4 | Biblioteca de UI |
| TypeScript | 5.7.3 | Tipagem estática |
| Tailwind CSS | 4.1.9 | Estilização utilitária |
| Radix UI | — | Componentes acessíveis sem estilo |
| Lucide React | 0.564+ | Ícones |
| Vercel Analytics | 1.6.1 | Analytics de produção |
| React Hook Form | 7.54+ | Gerenciamento de formulários |
| Zod | 3.24+ | Validação de schemas |

---

## Estrutura do Projeto

```
landing-page/
├── app/
│   ├── api/
│   │   └── waitlist/
│   │       └── route.ts        # API endpoint para submissão da waitlist
│   ├── globals.css             # Estilos globais e variáveis CSS
│   ├── layout.tsx              # Root layout com metadata SEO completo
│   ├── manifest.ts             # PWA manifest
│   ├── page.tsx                # Página principal
│   ├── robots.ts               # Gera /robots.txt automaticamente
│   └── sitemap.ts              # Gera /sitemap.xml automaticamente
├── components/
│   ├── ui/                     # Componentes Radix/shadcn genéricos
│   ├── bento-grid.tsx          # Seção de funcionalidades (Core Capabilities)
│   ├── demo-card.tsx           # Card de demonstração interativa
│   ├── final-cta.tsx           # Seção de CTA final
│   ├── footer.tsx              # Rodapé
│   ├── hero-section.tsx        # Seção hero com headlines rotativas multilíngue
│   ├── how-it-works.tsx        # Seção "How It Works" (3 passos)
│   ├── language-switcher.tsx   # Botão de troca de idioma
│   ├── navigation.tsx          # Barra de navegação
│   ├── page-content.tsx        # Wrapper da página com I18nProvider
│   ├── social-proof.tsx        # Depoimentos de usuários beta
│   ├── structured-data.tsx     # JSON-LD schemas para SEO
│   ├── theme-provider.tsx      # Provedor de tema (dark mode)
│   └── waitlist-modal.tsx      # Modal de captura da waitlist
├── lib/
│   └── i18n.tsx                # Context de internacionalização (en/pt/es/fr)
├── public/
│   ├── og-image.png            # Open Graph image (1200x630)
│   ├── apple-icon.png          # Apple touch icon
│   ├── icon.svg                # Ícone SVG principal
│   └── icon-light-32x32.png   # Favicon 32x32
├── next.config.mjs             # Configuração do Next.js
├── tailwind.config.ts          # Configuração do Tailwind
└── tsconfig.json               # Configuração TypeScript
```

---

## Como Executar

### Pré-requisitos

- Node.js 18+
- pnpm (recomendado) ou npm

### Instalação

```bash
pnpm install
```

### Desenvolvimento

```bash
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### Build de Produção

```bash
pnpm build
pnpm start
```

### Verificação de tipos

```bash
npx tsc --noEmit
```

---

## Internacionalização (i18n)

A i18n é implementada via React Context em `lib/i18n.tsx`. Os idiomas suportados são:

| Código | Idioma |
|---|---|
| `en` | English (padrão) |
| `pt` | Português |
| `es` | Español |
| `fr` | Français |

Para adicionar um novo idioma, inclua o objeto de traduções no arquivo `lib/i18n.tsx` e adicione o código ao tipo `Locale`.

> **Nota SEO:** A i18n atual é 100% client-side. O Google indexa apenas o conteúdo em inglês. Para suporte multilíngue completo no SEO, a migração para Next.js i18n routing com `app/[locale]/` é recomendada em uma sprint futura.

---

## API

### `POST /api/waitlist`

Endpoint para submissão de entrada na lista de espera.

**Body (JSON):**

```json
{
  "name": "string (obrigatório)",
  "email": "string (obrigatório)",
  "company": "string (opcional)",
  "role": "string (opcional)"
}
```

**Respostas:**

| Status | Descrição |
|---|---|
| `200` | Entrada registrada com sucesso |
| `400` | Dados inválidos |
| `500` | Erro interno |

---

## SEO

Esta landing page foi otimizada para máximo ranking no Google com:

### Metadata
- **Open Graph** completo (título, descrição, imagem 1200x630, locale, alternateLocale)
- **Twitter Cards** com `summary_large_image`
- **robots** com configuração explícita para Googlebot
- **Canonical URL** e `metadataBase`
- **hreflang** para en, pt-BR, es, fr e x-default
- **PWA manifest** referenciado

### Arquivos gerados automaticamente
- `/robots.txt` — via `app/robots.ts`
- `/sitemap.xml` — via `app/sitemap.ts`
- `/manifest.json` — via `app/manifest.ts`

### Structured Data (JSON-LD)
Três schemas declarados em `components/structured-data.tsx`:
- **Organization** — nome, URL, logo, redes sociais, contato
- **SoftwareApplication** — categoria, plataforma, features, oferta, rating agregado
- **FAQPage** — 5 perguntas frequentes para rich results no Google

### Core Web Vitals
- Fontes com `display: 'swap'` para evitar FOIT
- Otimização de imagens do Next.js habilitada
- Sem uso de `<img>` nativo (todos os casos usam componentes otimizados)

---

## Deploy

O projeto é deployado na [Vercel](https://vercel.com). O deploy ocorre automaticamente a cada push na branch principal.

Para configurar variáveis de ambiente de produção, acesse o painel da Vercel e adicione as variáveis necessárias para a API de waitlist.

---

## Contribuindo

1. Crie uma branch a partir de `main`
2. Faça suas alterações
3. Certifique-se que `npx tsc --noEmit` passa sem erros
4. Abra um Pull Request com descrição clara das mudanças
