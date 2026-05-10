<!-- BEGIN:nextjs-agent-rules -->

# Next.js 16+ Agent Rules

This project uses Next.js 16+ App Router.

The framework contains breaking changes compared to older Next.js versions.

Before generating or modifying code, always verify behavior against:
node_modules/next/dist/docs/

Do NOT assume:

* old routing behavior
* legacy data fetching patterns
* Pages Router conventions
* deprecated APIs

Always prefer:

* App Router
* Route Handlers
* Server Components by default
* modern async APIs
* latest Next.js conventions

---

# Core Project Rules

## Framework

* Next.js 16+
* React 18+
* TypeScript
* TailwindCSS

---

# Routing Rules

Use:
app/

Do NOT use:
pages/

Preferred:

* route.ts
* layout.tsx
* loading.tsx
* error.tsx

---

# Data Fetching Rules

Prefer:

* async server components
* fetch()
* Route Handlers

Avoid:

* getServerSideProps
* getStaticProps
* getInitialProps

These are legacy patterns.

---

# Component Rules

Default:
Server Components

Use:
"use client"

ONLY when needed:

* hooks
* state
* event handlers
* browser APIs

Avoid unnecessary client components.

---

# API Rules

All APIs must:

* return JSON
* use proper status codes
* handle errors safely

Use:
NextResponse.json()

Structure:

```ts
return NextResponse.json(
  {
    success: true,
  },
  {
    status: 200,
  }
);
```

---

# Authentication Rules

Current auth system:

* JWT-based
* email/password
* HTTP-only cookies

Security is intentionally lightweight for MVP speed.

Cookie name:
token

Protected routes handled via:
middleware.ts

---

# Database Rules

Database:
MongoDB + Mongoose

Schemas must live in:
models/

Connection logic must live in:
lib/mongodb.ts

Avoid:

* inline schemas
* duplicate model creation
* multiple DB connections

Always use:
mongoose.models.ModelName || mongoose.model(...)

---

# AI Rules

Primary AI provider:
Gemini 2.5 Flash

Rules:

* structured JSON output only
* prompts centralized in lib/prompts.ts
* parsing handled in lib/utils.ts

Gemini responses may contain:

```json
{}
```

Always clean responses before parsing.

---

# Crawling Rules

Crawler provider:
Anakin Crawl API

Current implementation:

* simple polling
* lightweight crawling
* markdown extraction

Do NOT overengineer crawling logic during MVP stage.

---

# UI/UX Rules

Design language:

* dark mode
* premium feel
* minimal UI
* large spacing
* glassmorphism-inspired

Inspirations:

* Linear
* Vercel
* Perplexity
* Notion AI

---

# Styling Rules

Use:

* Tailwind utility classes
* reusable components
* minimal custom CSS

Avoid:

* inline styles
* bloated CSS files

---

# State Management Rules

Current preference:

* local React state
* lightweight hooks

Avoid:

* Redux
* MobX
* unnecessary complexity

---

# File Organization Rules

## app/

Routes + layouts

## components/

UI components grouped by feature

## lib/

Business logic

## models/

Database schemas

## hooks/

Reusable client hooks

## types/

TypeScript types

---

# Coding Standards

Always:

* use TypeScript
* keep files modular
* keep components small
* use descriptive names
* avoid deeply nested logic

Prefer:

* readability
* maintainability
* rapid iteration

Over:

* overengineering
* premature optimization

---

# Performance Rules

Prefer:

* server rendering
* lightweight client bundles
* minimal dependencies

Avoid:

* unnecessary client-side rendering
* large libraries
* expensive effects

---

# MVP Philosophy

The goal is:

* polished UX
* fast execution
* impressive demos
* meaningful AI usage

The goal is NOT:

* enterprise architecture
* maximum scalability
* perfect security
* infrastructure complexity

Prioritize:
speed + polish + usefulness.

---

# Product Positioning

SpyGlass AI is:
“AI-powered competitor intelligence workspace.”

NOT:

* generic chatbot
* generic scraper
* generic dashboard

The product should feel like:

* AI research copilot
* market intelligence terminal
* startup analysis workspace

---

# Future Expansion Areas

Potential future additions:

* competitor comparison
* battlecards
* trend tracking
* AI research agents
* recurring monitoring
* browser automation
* SEO intelligence
* GTM insights

Current MVP should remain lean.

---

# Agent Development Rule

When generating future code:

* preserve current architecture
* avoid unnecessary rewrites
* extend modularly
* maintain App Router conventions
* keep implementation hackathon-friendly

Always optimize for:
developer velocity + clean UX.


<!-- END:nextjs-agent-rules -->
