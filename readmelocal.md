# 🔧 Mantis — Local Development Documentation

> **AI-Powered Product Diagnostic Assistant**
> A multi-company RAG (Retrieval-Augmented Generation) chatbot marketplace where companies upload their product manuals and users get AI-powered diagnostic help, grounded exclusively in official documentation.

---

## 📋 Table of Contents

- [Architecture Overview](#architecture-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Backend Deep Dive](#backend-deep-dive)
  - [Services Layer](#services-layer)
  - [Controllers Layer](#controllers-layer)
  - [Routes Layer](#routes-layer)
  - [Middleware Layer](#middleware-layer)
- [RAG Pipeline — How It Works](#rag-pipeline--how-it-works)
- [AI Prompt Engineering](#ai-prompt-engineering)
- [API Endpoints](#api-endpoints)
- [Frontend Integration](#frontend-integration)
- [Environment Variables](#environment-variables)
- [Setup & Running Locally](#setup--running-locally)
- [Seeding Data](#seeding-data)
- [Current Products in DB](#current-products-in-db)
- [Troubleshooting](#troubleshooting)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                           USER (Browser)                            │
│                     React + Vite + Tailwind CSS                     │
│               localhost:5174  →  Landing / Products / Chat          │
└───────────────────────────────┬─────────────────────────────────────┘
                                │  HTTP (axios)
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       BACKEND (Express + TS)                        │
│                         localhost:5000/api                           │
│                                                                     │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐   │
│   │ Company  │  │ Product  │  │ Resource │  │   Chat Controller │   │
│   │Controller│  │Controller│  │Controller│  │  (orchestrates)   │   │
│   └────┬─────┘  └────┬─────┘  └────┬─────┘  └───────┬──────────┘   │
│        │              │              │                │              │
│   ┌────▼─────┐  ┌────▼─────┐  ┌────▼─────┐  ┌──────▼──────────┐   │
│   │ Company  │  │ Product  │  │   PDF    │  │  Chat Service   │   │
│   │ Service  │  │ Service  │  │ Service  │  │  (history mgmt) │   │
│   └──────────┘  └──────────┘  └──────────┘  └─────────────────┘   │
│                                                     │               │
│                                            ┌────────┴────────┐      │
│                                            │                 │      │
│                                     ┌──────▼──────┐  ┌──────▼────┐ │
│                                     │ MOSS Service │  │  Gemini   │ │
│                                     │ (vector DB)  │  │  Service  │ │
│                                     │   ↕ Python   │  │  (LLM)   │ │
│                                     └──────────────┘  └──────────┘ │
└──────────────────────────┬──────────────────┬───────────────────────┘
                           │                  │
                           ▼                  ▼
                   ┌──────────────┐    ┌──────────────┐
                   │   Supabase   │    │ MOSS (Infr-  │
                   │  (Postgres)  │    │ edge Vector  │
                   │  + Storage   │    │  Database)   │
                   └──────────────┘    └──────────────┘
```

---

## Tech Stack

| Layer           | Technology                          | Purpose                                |
|-----------------|-------------------------------------|----------------------------------------|
| **Frontend**    | Vite + React + TypeScript           | SPA with product browsing + chat UI    |
| **Styling**     | Tailwind CSS                        | Utility-first responsive design        |
| **Backend**     | Express.js + TypeScript (tsx)       | REST API server                        |
| **Database**    | Supabase (PostgreSQL)               | Companies, products, sessions, messages|
| **Vector DB**   | MOSS (InferEdge)                    | Semantic vector search over PDF chunks |
| **LLM**        | Google Gemini 2.5 Flash             | AI response generation                 |
| **PDF Parsing** | pdf-parse v1.1.1                    | Extract text from uploaded PDFs        |
| **File Storage**| Supabase Storage                    | Store uploaded PDF manuals             |
| **Security**    | Helmet + CORS                       | HTTP security headers                  |

---

## Project Structure

```
MantisLocalMain/
├── Backend/
│   ├── src/
│   │   ├── app.ts                          # Express app setup (CORS, Helmet, routes)
│   │   ├── server.ts                       # Server entry point (port 5000)
│   │   ├── config/
│   │   │   └── supabase.ts                 # Supabase client initialization
│   │   ├── controllers/
│   │   │   ├── chatController.ts           # Chat orchestration (the brain)
│   │   │   ├── companyController.ts        # CRUD for companies
│   │   │   ├── productController.ts        # CRUD for products
│   │   │   └── resourceController.ts       # PDF upload + processing
│   │   ├── services/
│   │   │   ├── geminiService.ts            # Gemini LLM with diagnostic prompt
│   │   │   ├── chatService.ts              # Chat history (save/fetch messages)
│   │   │   ├── mossService.ts              # MOSS vector search (Node→Python bridge)
│   │   │   ├── moss_worker.py              # Python worker for MOSS SDK
│   │   │   ├── pdfService.ts               # PDF text extraction + chunking
│   │   │   ├── companyService.ts           # Company DB operations
│   │   │   └── productService.ts           # Product DB operations
│   │   ├── routes/
│   │   │   ├── index.ts                    # Route aggregator + health check
│   │   │   ├── chatRoutes.ts               # POST /api/chat
│   │   │   ├── companyRoutes.ts            # GET/POST /api/companies
│   │   │   ├── productRoutes.ts            # GET/POST /api/products
│   │   │   └── resourceRoutes.ts           # POST /api/resources/upload
│   │   └── middlewares/
│   │       ├── errorHandler.ts             # Global error handler
│   │       └── uploadMiddleware.js          # Multer config for PDF uploads
│   ├── Data/                               # Product manuals (PDFs)
│   │   ├── activa_USER_MANUAL_9.pdf        # Honda Activa 6G manual
│   │   ├── TVS Jupiter 110 SmartXonnect.pdf# TVS Jupiter 110 manual
│   │   └── creta.pdf                       # Hyundai Creta manual
│   ├── schema.sql                          # Supabase database schema
│   ├── process_data.ts                     # Script: bulk process all PDFs → MOSS
│   ├── seed.js                             # Script: seed sample company + product
│   ├── seed_moss.ts                        # Script: seed manual chunks into MOSS
│   ├── package.json
│   ├── tsconfig.json
│   └── .env                                # Environment variables
│
├── project/                                # Frontend (Vite + React)
│   ├── src/
│   │   ├── main.tsx                        # App entry + router
│   │   ├── App.tsx                         # Root component
│   │   ├── api.ts                          # Axios API client
│   │   ├── pages/
│   │   │   ├── Landing.tsx                 # Homepage
│   │   │   ├── Products.tsx                # Product grid (fetches from API)
│   │   │   ├── ProdutDetail.tsx            # Product detail + ChatWindow
│   │   │   ├── Dashboard.tsx               # Company dashboard
│   │   │   └── Analytics.tsx               # Analytics page
│   │   ├── components/
│   │   │   ├── assistant/
│   │   │   │   ├── Chatwindow.tsx          # Main chat UI component
│   │   │   │   └── MessageBubble.tsx       # Individual message bubble
│   │   │   └── layout/
│   │   │       └── Navbar.tsx              # Navigation bar
│   │   └── routes/
│   │       └── AppRoutes.tsx               # React Router config
│   └── package.json
│
└── readmelocal.md                          # ← You are here
```

---

## Database Schema

All tables live in **Supabase** (hosted PostgreSQL). Schema defined in `Backend/schema.sql`.

```sql
-- Companies: Honda, TVS, Hyundai, etc.
companies (id UUID PK, name TEXT, created_at TIMESTAMPTZ)

-- Products: Honda Activa, TVS Jupiter, Hyundai Creta
products (id UUID PK, company_id UUID FK→companies, name TEXT, description TEXT, created_at TIMESTAMPTZ)

-- Resources: uploaded PDFs, images, URLs
resources (id UUID PK, product_id UUID FK→products, type TEXT ['manual','image','url'], file_url TEXT, created_at TIMESTAMPTZ)

-- Document Chunks: split text for RAG (pgvector-ready)
document_chunks (id UUID PK, resource_id UUID FK→resources, content TEXT, embedding vector(768), created_at TIMESTAMPTZ)

-- Chat Sessions: one per user conversation
chat_sessions (id UUID PK, product_id UUID FK→products, user_id TEXT, status TEXT DEFAULT 'active', created_at TIMESTAMPTZ)

-- Chat Messages: full conversation history
chat_messages (id UUID PK, session_id UUID FK→chat_sessions, role TEXT ['user','assistant'], content TEXT, created_at TIMESTAMPTZ)
```

### Entity Relationship

```
companies 1──────M products 1──────M resources
                    │                    │
                    │                    └────M document_chunks
                    │
                    └──────M chat_sessions 1──────M chat_messages
```

---

## Backend Deep Dive

### Services Layer

#### 1. `geminiService.ts` — AI Brain

The core of the diagnostic chatbot. Uses Google Gemini 2.5 Flash with a professionally engineered system prompt.

**Key features:**
- **Identity**: The AI believes it's a certified technician with 15+ years of experience for the specific company
- **Strict grounding**: Only answers from the provided manual context (RAG chunks)
- **Diagnostic approach**: 5-step process (Understand → Identify → Diagnose → Safety → Escalate)
- **Formatted responses**: Uses emoji headers (🔍🧰📋📖⚠️) for structured output
- **Never hallucinates**: If the manual doesn't cover it, says "visit a service center"
- **Company-aware**: Each product's AI knows which company it belongs to

```typescript
// Signature
generateMechanicResponse(chatHistory, newQuery, manualContext, companyName, productName)
```

#### 2. `mossService.ts` — Vector Search Bridge

Node.js ↔ Python bridge. Spawns `moss_worker.py` as a child process to interact with the MOSS vector database.

- `indexChunks(productId, chunks)` — Upload text chunks to MOSS under a product-specific index
- `searchContext(productId, query)` — Semantic search for relevant manual chunks

Each product gets its own isolated MOSS index named `product_{productId}` (hyphens stripped).

#### 3. `moss_worker.py` — Python MOSS SDK

The actual MOSS SDK calls happen here (the SDK is Python-only):
- Uses `MossClient` with project ID/key
- `upload_chunks()` — Creates `DocumentInfo` objects, sanitizes UTF-8, calls `add_docs()`
- `search_moss()` — Calls `client.query()`, extracts text from `SearchResult.docs`

Communication: JSON over stdin/stdout between Node.js and Python.

#### 4. `chatService.ts` — Conversation Memory

- `getSessionHistory(sessionId)` — Fetches last 15 messages (so the AI remembers context)
- `saveMessage(sessionId, role, content)` — Persists user and assistant messages

#### 5. `pdfService.ts` — Document Processing

- `extractTextFromBuffer(buffer)` — Uses `pdf-parse` to extract raw text from PDF binary
  - Strips invalid Unicode surrogate characters to prevent Python JSON encoding errors
- `chunkText(text, maxChunkLength=1000, overlap=200)` — Splits text into overlapping chunks
  - Word-boundary aware (doesn't cut mid-word)
  - Deduplicates chunks
  - Filters out tiny chunks (<50 chars)

#### 6. `companyService.ts` / `productService.ts` — CRUD

Standard Supabase insert/select operations for companies and products.

---

### Controllers Layer

#### `chatController.ts` — The Orchestrator

This is where the magic happens. The chat endpoint follows this exact flow:

```
User sends message
        │
        ▼
┌─ 1. Fetch product name + company name from Supabase
│
├─ 2. Create chat session (if first message)
│
├─ 3. Save user message to DB
│
├─ 4. Load last 15 messages as chat history
│
├─ 5. Query MOSS → get relevant manual chunks (semantic search)
│
├─ 6. Send to Gemini with:
│      • Company name (e.g., "Honda")
│      • Product name (e.g., "Honda Activa 6G")
│      • Manual context chunks (RAG results)
│      • Full chat history
│      • Latest user message
│
├─ 7. Save AI response to DB
│
└─ 8. Return response to frontend
```

#### `resourceController.ts` — PDF Upload Pipeline

```
PDF File uploaded via multipart form
        │
        ▼
┌─ 1. Upload to Supabase Storage (bucket: "manuals")
├─ 2. Save resource metadata to DB
├─ 3. Extract text from PDF (pdfService)
├─ 4. Chunk text into overlapping segments
├─ 5. Index all chunks into MOSS (vector embeddings)
└─ 6. Return success with chunk count
```

---

### Routes Layer

| File                | Base Path             | Methods |
|---------------------|-----------------------|---------|
| `index.ts`          | `/api/health`         | GET     |
| `companyRoutes.ts`  | `/api/companies`      | GET, POST |
| `productRoutes.ts`  | `/api/products`       | GET, POST, GET /:id |
| `resourceRoutes.ts` | `/api/resources`      | POST /upload |
| `chatRoutes.ts`     | `/api/chat`           | POST    |

---

### Middleware Layer

- **`errorHandler.ts`** — Global Express error handler, returns structured JSON errors
- **`uploadMiddleware.js`** — Multer configuration for in-memory PDF file uploads
- **`helmet`** — Security headers (XSS, content-type sniffing, etc.)
- **`cors`** — Open CORS for localhost development

---

## RAG Pipeline — How It Works

RAG = **Retrieval-Augmented Generation**. Instead of feeding the entire 500-page manual to the AI, we:

### Step 1: Ingestion (one-time per PDF)
```
PDF Manual
    │
    ▼ pdf-parse extracts text
    │
    ▼ chunkText() splits into ~1000-char overlapping segments
    │
    ▼ MOSS embeds each chunk into a vector (semantic meaning)
    │
    ▼ Vectors stored in MOSS index (one per product)
```

### Step 2: Query (every chat message)
```
User: "My horn is not working"
    │
    ▼ MOSS performs semantic search across product's chunks
    │
    ▼ Returns top 5 most relevant chunks (e.g., horn circuit info)
    │
    ▼ Chunks injected into Gemini prompt as "MANUAL CONTEXT"
    │
    ▼ Gemini answers ONLY using those chunks
```

### Why RAG?
- ✅ AI only sees relevant info → better accuracy
- ✅ No hallucination → grounded in real manual text
- ✅ Works with huge documents (500+ pages)
- ✅ Each product is isolated → Honda AI never sees TVS docs

---

## AI Prompt Engineering

The system prompt in `geminiService.ts` is structured in 6 sections:

### 1. Identity & Role
```
"You are a certified {companyName} technician with 15+ years experience"
"You speak like a helpful mechanic — clear, calm, step-by-step"
"You are NOT a general AI assistant. You ONLY know {productName}"
```

### 2. Strict Rules (NEVER break)
- Only use manual context
- Never guess or use general vehicle knowledge
- Always cite: "According to the manual..."
- Never recommend competitors
- Never reveal AI identity

### 3. Diagnosis Approach (5 steps)
1. **UNDERSTAND** — Ask one clarifying question
2. **IDENTIFY** — State likely cause from manual
3. **DIAGNOSE** — Numbered steps to check/fix
4. **SAFETY WARNING** — If risky, warn the user
5. **ESCALATE** — If needs service center, say so

### 4. Response Format
```
🔍 Understanding your issue
🧰 Likely cause
📋 Step-by-step diagnosis
📖 From the manual
⚠️ Important
```

### 5. Manual Context (injected by RAG)
The relevant chunks from MOSS are injected here.

### 6. Chat History
Last 15 messages for conversation continuity.

---

## API Endpoints

### Health Check
```
GET /api/health
→ { status: "success", message: "API is running", timestamp: "..." }
```

### Companies
```
POST /api/companies
Body: { name: "Honda", email: "support@honda.com" }
→ { status: "success", data: { id: "uuid", name: "Honda", ... } }

GET /api/companies
→ { status: "success", data: [...] }
```

### Products
```
POST /api/products
Body: { name: "Honda Activa 6G", description: "...", company_id: "uuid" }
→ { status: "success", data: { id: "uuid", name: "Honda Activa 6G", ... } }

GET /api/products
→ { status: "success", data: [...all products...] }

GET /api/products/:id
→ { status: "success", data: { id: "uuid", name: "...", ... } }
```

### Chat (Main AI Endpoint)
```
POST /api/chat
Body: {
  "productId": "d3e97adf-eedb-413b-a2bb-9f450aa29c1e",
  "message": "My horn is not working",
  "sessionId": null  ← (optional, auto-created on first message)
}
→ {
  "status": "success",
  "data": {
    "sessionId": "uuid",
    "role": "assistant",
    "content": "🔍 Understanding your issue\nYou've mentioned that..."
  }
}
```

### Resource Upload
```
POST /api/resources/upload
Content-Type: multipart/form-data
Fields: productId (text), file (PDF binary)
→ {
  "status": "success",
  "message": "PDF processed successfully",
  "data": {
    "resource": {...},
    "chunksProcessed": 94,
    "mossStatus": { "status": "success", "indexed": 94 }
  }
}
```

---

## Frontend Integration

### API Client (`project/src/api.ts`)
```typescript
const api = axios.create({ baseURL: 'http://localhost:5000/api' });

getCompanies()                           // GET /api/companies
getProducts(companyId?)                  // GET /api/products
getProduct(id)                           // GET /api/products/:id
sendChatMessage(productId, msg, session) // POST /api/chat
```

### Page Flow
```
Landing Page → Products Grid → Product Detail Page
                                    ├── Product info (left)
                                    └── ChatWindow (right)
                                         ├── Message history
                                         ├── Suggested checks
                                         └── Text input + Send
```

### ChatWindow Component
- Manages local `messages[]` state
- Creates a session on first message
- Sends messages to backend, appends AI response
- Shows loading indicator while AI thinks

---

## Environment Variables

Create a `.env` file in `Backend/`:

```env
# Server
PORT=5000

# Supabase (PostgreSQL + Storage)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhb...your_key

# MOSS (InferEdge Vector DB)
MOSS_PROJECT_ID=your-moss-project-id
MOSS_PROJECT_KEY=moss_your_api_key

# Google Gemini (LLM)
GEMINI_API_KEY=your_gemini_api_key
```

---

## Setup & Running Locally

### Prerequisites
- Node.js v22+
- Python 3.10+ (with `inferedge-moss` package installed globally)
- npm

### Backend Setup
```bash
cd Backend
npm install                    # Install Node dependencies
pip install inferedge-moss     # Install MOSS Python SDK (global)
npm run dev                    # Start dev server on port 5000
```

### Frontend Setup
```bash
cd project
npm install                    # Install React dependencies
npm run dev                    # Start Vite dev server on port 5174
```

### Process PDFs (one-time data ingestion)
```bash
cd Backend
npx tsx process_data.ts        # Reads all PDFs from Data/ → extracts text → chunks → MOSS
```

---

## Seeding Data

### Quick Seed (company + one product)
```bash
cd Backend
node seed.js
```
Creates: `Honda` company + `Honda Activa 6G` product.

### Bulk PDF Processing
```bash
cd Backend
npx tsx process_data.ts
```
Reads all 3 PDFs from `Backend/Data/`, creates products if missing, extracts text, chunks it, and indexes into MOSS.

**Output:**
```
--- Processing Honda Activa 6G ---
Found existing product ID: d3e97adf-...
Extracted 84126 characters.
Created 94 chunks.
MOSS Success: { status: 'success', indexed: 94 }

--- Processing TVS Jupiter 110 ---
Created new product ID: 1e16ef22-...
Extracted 137875 characters.
Created 158 chunks.
MOSS Success: { status: 'success', indexed: 158 }

--- Processing Hyundai Creta ---
Created new product ID: c8ba860a-...
Extracted 538271 characters.
Created 625 chunks.
MOSS Success: { status: 'success', indexed: 625 }
```

---

## Current Products in DB

| Product            | Company | Chunks Indexed | Product ID                            |
|--------------------|---------|----------------|---------------------------------------|
| Honda Activa 6G    | Honda   | 94             | `d3e97adf-eedb-413b-a2bb-9f450aa29c1e` |
| TVS Jupiter 110    | Honda*  | 158            | `1e16ef22-dd18-401e-886c-ab3bf0b2f381` |
| Hyundai Creta      | Honda*  | 625            | `c8ba860a-2c42-429b-9238-23cd172e5f8f` |

> \* TVS and Creta were auto-created under the same Honda company during bulk processing. Create separate companies for production.

---

## Troubleshooting

### "MOSS query error: got unexpected keyword argument"
**Cause**: MOSS Python SDK uses `name=` parameter, not `index_name=`.
**Fix**: Already fixed in `moss_worker.py`. Use `client.query(name=..., query=...)`.

### "pdf-parse: ENOENT test/data/05-versions-space.pdf"
**Cause**: pdf-parse v1.x auto-runs a test file on import.
**Fix**: Import from `pdf-parse/lib/pdf-parse.js` directly instead of `pdf-parse`.

### "utf-8 codec can't encode surrogate characters"
**Cause**: Some PDFs contain invalid Unicode surrogates that break Python JSON serialization.
**Fix**: Strip surrogates in `pdfService.ts`: `text.replace(/[\uD800-\uDFFF]/g, '')` and in `moss_worker.py`: `c.encode('utf-8', 'ignore').decode('utf-8')`.

### "Class constructors cannot be invoked without 'new'"
**Cause**: pdf-parse v2.x exports a class (`PDFParse`), not a function.
**Fix**: Downgraded to pdf-parse v1.1.1 which exports a callable function.

### "parse is not a function" / "pdfParse is not a function"
**Cause**: ESM/CJS interop issue with pdf-parse.
**Fix**: Use `import pdfParse from 'pdf-parse/lib/pdf-parse.js'` (skip the index wrapper).

### Products page shows nothing
**Cause**: Database was empty — no products seeded yet.
**Fix**: Run `node seed.js` and/or `npx tsx process_data.ts`.

### Chat returns "error connecting to AI"
**Cause**: Could be missing `GEMINI_API_KEY` in `.env` or MOSS index not created yet.
**Fix**: Ensure `.env` has all keys. Process PDFs first with `npx tsx process_data.ts`.

---

## What Was Built (Session Log)

### Phase 1: Backend Foundation
- Express.js server with TypeScript (tsx for dev)
- Supabase client initialization
- Full database schema (6 tables)
- CRUD for companies and products
- Global error handler + Helmet security

### Phase 2: RAG Pipeline
- PDF text extraction service (pdf-parse)
- Text chunking with overlap (1000 char chunks, 200 char overlap)
- MOSS vector database integration via Python child process
- Semantic search for retrieving relevant manual chunks

### Phase 3: AI Chat Engine
- Gemini 2.5 Flash integration
- Professional mechanic diagnostic system prompt
- Chat history management (last 15 messages)
- Company-aware + product-aware prompting
- 5-step diagnostic methodology

### Phase 4: Frontend Integration
- Connected Products page to real API (replaces mock data)
- Connected ProductDetail page to real API
- Built ChatWindow with session management
- Real-time message send/receive with loading states

### Phase 5: Data Ingestion
- Processed 3 PDFs (Honda Activa, TVS Jupiter, Hyundai Creta)
- Total: 877 chunks indexed across 3 products
- Fixed UTF-8 encoding issues for international PDFs

---

*Last updated: 14 June 2026*
