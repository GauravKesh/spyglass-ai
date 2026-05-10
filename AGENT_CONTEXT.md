# SpyGlass AI — Full Project Context

## Project Name

SpyGlass AI

## One-Line Description

AI-powered competitor intelligence workspace that crawls startup websites, analyzes business strategy, and lets users chat with an AI market analyst.

---

# Core Vision

SpyGlass AI helps founders, marketers, agencies, and product teams understand competitors using AI.

Users can:

* analyze startup websites
* understand positioning
* identify strengths and weaknesses
* discover SEO opportunities
* compare competitors
* chat with an AI business analyst

The product combines:

* web crawling
* AI analysis
* structured business intelligence
* conversational AI

The goal is to feel like:

* Perplexity for startups
* Bloomberg for founders
* AI-powered market intelligence workspace

---

# Current MVP Scope

The current MVP focuses on:

1. Authentication
2. Website crawling
3. AI analysis
4. Dashboard visualization
5. AI analyst chat
6. Persistent MongoDB storage

This MVP is optimized for:

* hackathons
* rapid iteration
* portfolio showcase
* future SaaS expansion

---

# Project Structure
```bash
spyglass-ai/
│
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── route.ts
│   │   │   │
│   │   │   ├── register/
│   │   │   │   └── route.ts
│   │   │   │
│   │   │   ├── logout/
│   │   │   │   └── route.ts
│   │   │   │
│   │   │   └── me/
│   │   │       └── route.ts
│   │   │
│   │   ├── analyze/
│   │   │   └── route.ts
│   │   │
│   │   ├── chat/
│   │   │   └── route.ts
│   │   │
│   │   └── companies/
│   │       ├── route.ts
│   │       └── [id]/
│   │           └── route.ts
│   │
│   ├── dashboard/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   │
│   ├── login/
│   │   └── page.tsx
│   │
│   ├── register/
│   │   └── page.tsx
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── LogoutButton.tsx
│   │
│   ├── landing/
│   │   ├── Hero.tsx
│   │   ├── UrlForm.tsx
│   │   └── DemoPreview.tsx
│   │
│   ├── dashboard/
│   │   ├── CompanyCard.tsx
│   │   ├── SummaryCard.tsx
│   │   ├── SWOTCard.tsx
│   │   ├── FeatureTable.tsx
│   │   ├── SEOCard.tsx
│   │   ├── PricingCard.tsx
│   │   ├── PositioningCard.tsx
│   │   └── RecommendationsCard.tsx
│   │
│   ├── chat/
│   │   ├── ChatPanel.tsx
│   │   ├── ChatInput.tsx
│   │   ├── ChatMessage.tsx
│   │   └── SuggestedPrompts.tsx
│   │
│   ├── shared/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Loader.tsx
│   │   └── ProtectedRoute.tsx
│   │
│   └── ui/
│
├── lib/
│   ├── anakin.ts
│   ├── gemini.ts
│   ├── mongodb.ts
│   ├── auth.ts
│   ├── prompts.ts
│   ├── parser.ts
│   ├── constants.ts
│   └── utils.ts
│
├── models/
│   ├── User.ts
│   ├── Company.ts
│   └── Chat.ts
│
├── types/
│   ├── auth.ts
│   ├── analysis.ts
│   └── chat.ts
│
├── hooks/
│   ├── useAuth.ts
│   ├── useChat.ts
│   └── useCompanies.ts
│
├── public/
│   ├── logo.png
│   └── demo.png
│
├── middleware.ts
├── .env.local
├── .gitignore
├── components.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md


```


# Tech Stack

## Frontend

* Next.js 15 App Router
* React
* TypeScript
* TailwindCSS

## Backend

* Next.js Route Handlers
* JWT authentication
* MongoDB + Mongoose

## AI

* Gemini 2.5 Flash

## Crawling

* Anakin Crawl API

## Deployment

* Vercel

---

# Authentication System

Current auth is intentionally simple.

Uses:

* email/password
* bcryptjs password hashing
* JWT token stored in HTTP-only cookie

No OAuth currently.

Important:
Security is intentionally lightweight because this is a hackathon MVP.

Future upgrades may include:

* refresh tokens
* OAuth
* email verification
* RBAC
* session management

---

# Product Flow

## Authentication Flow

User:

1. registers
2. logs in
3. receives JWT cookie
4. accesses dashboard

---

## Intelligence Pipeline

### Step 1 — User submits URL

Example:
https://stripe.com

---

### Step 2 — Crawl Website

Uses:
Anakin Crawl API

Pipeline:

* submit crawl job
* wait a few seconds
* fetch crawl result
* combine markdown

Current crawling:

* maxPages = 5

Future:

* advanced crawling
* sitemap expansion
* authenticated crawling
* browser automation

---

### Step 3 — AI Analysis

Gemini receives:

* cleaned markdown
* structured prompt

Gemini returns:

* summary
* target audience
* features
* pricing
* strengths
* weaknesses
* SEO keywords
* positioning
* recommendations

Response format:
strict JSON only

---

### Step 4 — Save to MongoDB

Stores:

* structured intelligence
* raw markdown
* metadata
* ownership info

---

### Step 5 — Dashboard

Displays:

* summary
* SWOT analysis
* SEO insights
* pricing strategy
* positioning
* recommendations

---

### Step 6 — AI Analyst Chat

Users can ask:

* pricing questions
* SEO questions
* positioning questions
* strategic questions

Current system:

* simple context injection
* no embeddings
* no vector DB

The entire company document is injected into Gemini prompts.

This was intentionally chosen for:

* speed
* simplicity
* hackathon execution

---

# Database Design

## Users Collection

Fields:

* name
* email
* hashed password

---

## Companies Collection

Stores:

* analyzed startup intelligence
* structured AI output
* raw markdown

Fields:

* userId
* name
* url
* summary
* positioning
* pricing
* features
* strengths
* weaknesses
* seoKeywords
* recommendations
* rawMarkdown

---

## Chat Collection

Stores:

* chat history
* user questions
* AI responses

Fields:

* companyId
* userId
* role
* message

---

# Current Architecture

Frontend:
React components + Tailwind UI

Backend:
Next.js API routes

AI:
Gemini SDK

Storage:
MongoDB

Crawler:
Anakin API

---

# Folder Structure Philosophy

The codebase is intentionally modular.

## app/

Contains:

* pages
* route handlers
* layouts

## components/

UI split by feature:

* auth
* dashboard
* chat
* landing
* shared

## lib/

Business logic:

* AI
* crawling
* DB
* auth
* prompts
* utilities

## models/

Mongoose schemas

## hooks/

Client-side data hooks

## types/

TypeScript types

---

# AI Prompting Strategy

The application heavily relies on:

* structured prompting
* JSON-only responses
* deterministic output formatting

Prompts are centralized in:
lib/prompts.ts

Future improvements:

* chain-of-thought planning
* competitor comparison prompts
* investor-mode prompts
* GTM analysis prompts

---

# UI/UX Philosophy

The UI should feel:

* premium
* dark
* AI-native
* modern
* startup-grade

Visual inspirations:

* Linear
* Perplexity
* Vercel
* Granola
* Notion AI

Key design principles:

* glassmorphism
* large typography
* spacious layouts
* smooth transitions
* clean cards

---

# Current Limitations

The MVP intentionally avoids:

* vector databases
* queues
* websocket streaming
* RBAC
* organizations
* billing
* notifications
* background jobs

Reason:
speed of execution

---

# Future Roadmap

## Phase 1

Current MVP:

* crawl
* analyze
* dashboard
* chat

---

## Phase 2

Advanced intelligence:

* competitor comparison
* AI-generated battlecards
* SEO gap analysis
* market mapping

---

## Phase 3

AI research agents:

* recurring monitoring
* daily intelligence updates
* trend detection
* pricing change alerts

---

## Phase 4

Enterprise:

* teams
* shared workspaces
* exportable reports
* investor intelligence
* API access

---

# Potential Advanced Features

## Roast Mode

Aggressive landing page critique.

---

## AI Battlecards

Compare:

* pricing
* positioning
* features
* messaging

---

## GTM Suggestions

Suggest:

* ICP
* SEO
* acquisition strategy

---

## Competitor Tracking

Track website changes over time.

---

## Browser Automation

Use Anakin Browser API for:

* screenshots
* UX audits
* authenticated intelligence

---

# Coding Standards

## General

* TypeScript everywhere
* modular files
* reusable components
* avoid giant files

## Components

* small
* feature-specific
* isolated state

## APIs

* always return JSON
* proper status codes
* centralized utilities

## MongoDB

* use models/
* avoid inline schemas

---

# Important Technical Notes

## Gemini Responses

Gemini may wrap JSON in:

```json
{}
```

safeJSONParse() cleans this.

---

## Authentication

JWT stored in cookie named:
token

---

## Protected Routes

Handled through:
middleware.ts

---

## Crawl API

Currently simplistic polling:

* submit
* wait 5 seconds
* fetch result

Future:
proper async polling.

---

# Project Goal

The goal is NOT:

* maximum backend complexity

The goal IS:

* impressive product feel
* polished UX
* meaningful AI usage
* fast execution
* strong demoability

---

# Ideal Demo Script

1. Login
2. Paste startup URL
3. AI crawls website
4. Dashboard appears
5. Ask AI strategic questions
6. Receive competitor insights instantly

This creates a strong “AI analyst workspace” experience.

---

# Product Positioning

SpyGlass AI is positioned as:

“AI-powered competitor intelligence workspace.”

NOT:

* generic chatbot
* generic scraper
* generic dashboard

The emphasis is:

* strategic intelligence
* startup analysis
* AI market analyst
* persistent research workspace

---

# Success Criteria

The MVP succeeds if users can:

* analyze any startup quickly
* understand positioning instantly
* ask strategic questions
* get useful AI insights
* feel like they are using a premium AI research tool

---

# Development Priorities

## Highest Priority

* stable crawling
* clean dashboard
* smooth AI chat
* fast UX

## Medium Priority

* comparison tools
* roast mode
* animations

## Lowest Priority

* enterprise auth
* billing
* infra complexity

---

# Final Philosophy

SpyGlass AI should feel:

* simple
* intelligent
* premium
* fast
* useful

The product should prioritize:
clarity + insights + polish over complexity.
