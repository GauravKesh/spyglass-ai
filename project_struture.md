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