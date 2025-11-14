# Multi-AI Conversation Manager

A Next.js application that enables multi-provider AI conversations with support for OpenAI, Anthropic Claude, Google Gemini, and Ollama (both local and cloud).

## Features

- **Multiple AI Provider Support**: OpenAI, Anthropic/Claude, Google Gemini, Ollama Local, and Ollama Cloud
- **Multi-AI Conversations**: Run conversations with multiple AI providers simultaneously
- **Memory System**: Each AI maintains its own conversation memory
- **Flexible Configuration**: Easy API key management through environment variables
- **Local & Cloud Ollama**: Use both local Ollama installation and Ollama Cloud in the same app

## Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm/bun
- (Optional) [Ollama Desktop](https://ollama.ai) for local LLM support

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Add your API keys to `.env.local` (see Configuration section below)

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and configure your API keys:

```env
# OpenAI (GPT-4)
NEXT_PUBLIC_OPENAI_API_KEY=sk-your-openai-key-here

# Anthropic (Claude)
NEXT_PUBLIC_ANTHROPIC_API_KEY=sk-ant-your-anthropic-key-here

# Google Gemini
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-key-here

# Ollama Cloud
NEXT_PUBLIC_OLLAMA_API_KEY=your-ollama-cloud-key-here
NEXT_PUBLIC_OLLAMA_URL=https://api.ollama.ai

# Ollama Model (for both local and cloud)
NEXT_PUBLIC_OLLAMA_MODEL=llama3.3:latest
```

**Note**: All variables must use the `NEXT_PUBLIC_` prefix to be accessible in the browser.

## Using Multiple Providers Simultaneously

### The Dual-Provider Pattern

This application implements a clean pattern for using **multiple LLM providers with different API endpoints** in the same application, without conflicts.

#### How It Works

Each provider is instantiated with its own:
1. **Base URL** (hardcoded in `/src/app/api/ai/route.ts`)
2. **API Key** (from environment variables)
3. **Authentication Method** (Bearer token, API key header, etc.)

**Example**: Using both OpenAI and Ollama Cloud together:

```env
# .env.local
NEXT_PUBLIC_OPENAI_API_KEY=sk-real-openai-key
NEXT_PUBLIC_OLLAMA_API_KEY=ollama_your-cloud-key
NEXT_PUBLIC_OLLAMA_URL=https://api.ollama.ai
```

**Why this works without conflicts:**
- OpenAI calls go to `https://api.openai.com/v1/chat/completions`
- Ollama Cloud calls go to `https://api.ollama.ai/api/chat`
- Each provider client overrides the endpoint in code
- No reliance on global `OPENAI_API_BASE` environment variables
- Each provider is explicitly instantiated in `/src/app/api/ai/route.ts`

See the implementation in:
- **Frontend**: `/src/components/MultiAIConversationManager.tsx:148-179` (API key loading)
- **Backend**: `/src/app/api/ai/route.ts` (Provider instantiation)

### Ollama Configuration

#### Local Ollama

1. Install [Ollama Desktop](https://ollama.ai)
2. Pull models: `ollama pull llama3.3`
3. Select "Ollama (Local)" in the UI
4. No API key needed

#### Ollama Cloud

1. Sign up for Ollama Cloud
2. Get your API key
3. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_OLLAMA_API_KEY=your-cloud-key
   NEXT_PUBLIC_OLLAMA_URL=https://api.ollama.ai
   ```
4. Select "Ollama Cloud" in the UI

**You can use BOTH local and cloud simultaneously!** Just select the appropriate provider in the dropdown.

## Supported Providers

| Provider | Model | API Endpoint | Authentication |
|----------|-------|--------------|----------------|
| **OpenAI** | GPT-4 | `api.openai.com` | Bearer token |
| **Anthropic** | Claude 3.5 Sonnet | `api.anthropic.com` | x-api-key header |
| **Google Gemini** | Gemini 2.5 Flash | `generativelanguage.googleapis.com` | Query param |
| **Ollama (Local)** | Configurable | `localhost:11434` | None |
| **Ollama Cloud** | Configurable | `api.ollama.ai` | Bearer token |

## Available Ollama Models

The app supports 10+ pre-configured Ollama models:
- `llama3.2-vision:latest` (7.9 GB)
- `mistral-small3.1:latest` (15 GB)
- `llama3.3:latest` (42 GB)
- `deepseek-r1:70b` (43 GB)
- And more...

Check installed models: `ollama list`

## Architecture

### Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/ai/route.ts          # Backend API route (provider instantiation)
│   │   ├── page.tsx                 # Main entry point
│   │   └── layout.tsx               # Root layout
│   └── components/
│       └── MultiAIConversationManager.tsx  # Main UI component
├── .env.example                     # Environment variable template
├── .env.local                       # Your actual API keys (gitignored)
└── package.json
```

### How API Calls Work

1. **Frontend** (`MultiAIConversationManager.tsx`):
   - User selects provider(s) and sends message
   - Loads API keys from environment variables
   - Calls `/api/ai` endpoint with provider ID and credentials

2. **Backend API Route** (`route.ts`):
   - Receives provider ID, API key, and message
   - Routes to correct provider using switch statement
   - Instantiates provider client with explicit endpoint
   - Returns formatted response

3. **No CORS Issues**: All external API calls go through the Next.js backend

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Deployment

### Deploy to Vercel (Recommended)

This app is optimized for deployment on [Vercel](https://vercel.com), the platform created by the makers of Next.js.

#### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/aibymlorg/MI-LearntoDiscuss)

#### Manual Deployment with Vercel CLI

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   # Preview deployment
   vercel

   # Production deployment
   vercel --prod
   ```

4. **Configure Environment Variables**:

   During first deployment, Vercel will prompt you to set up your project. Add environment variables:

   **Option A: Via Vercel CLI**
   ```bash
   vercel env add NEXT_PUBLIC_OPENAI_API_KEY production
   vercel env add NEXT_PUBLIC_ANTHROPIC_API_KEY production
   vercel env add NEXT_PUBLIC_GEMINI_API_KEY production
   vercel env add NEXT_PUBLIC_OLLAMA_API_KEY production
   vercel env add NEXT_PUBLIC_OLLAMA_URL production
   vercel env add NEXT_PUBLIC_OLLAMA_MODEL production
   ```

   When prompted, enter the corresponding values from your `.env.local` file.

   **Option B: Via Vercel Dashboard**
   1. Go to your project at `https://vercel.com/your-username/mi-learntodicuss`
   2. Click **Settings** → **Environment Variables**
   3. Add each variable from `.env.example`:
      - `NEXT_PUBLIC_OPENAI_API_KEY`
      - `NEXT_PUBLIC_ANTHROPIC_API_KEY`
      - `NEXT_PUBLIC_GEMINI_API_KEY`
      - `NEXT_PUBLIC_OLLAMA_API_KEY`
      - `NEXT_PUBLIC_OLLAMA_URL` (use `https://api.ollama.ai`)
      - `NEXT_PUBLIC_OLLAMA_MODEL` (use `llama3.3:latest`)
   4. Save and redeploy

5. **Redeploy after adding variables**:
   ```bash
   vercel --prod
   ```

#### Important Notes for Production

**Ollama Local Won't Work**:
- The "Ollama (Local)" provider connects to `localhost:11434`
- This only works on your local machine, not on Vercel's servers
- **Solution**: Only use "Ollama Cloud" in production
- Consider hiding the local option in production builds

**Automatic Deployments**:
- Once connected to GitHub, Vercel auto-deploys on every push to main
- Feature branches get preview deployments automatically
- View deployments at `https://vercel.com/your-username/mi-learntodicuss`

**Environment Variables Best Practices**:
- Set variables for all environments: Production, Preview, Development
- Never commit `.env.local` to git
- Rotate API keys regularly for security
- Monitor usage on each provider's dashboard

#### Alternative Deployment Options

**Netlify**:
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

**Railway**:
```bash
npm install -g @railway/cli
railway login
railway up
```

**Docker**:
```bash
docker build -t multi-ai-chat .
docker run -p 3000:3000 --env-file .env.local multi-ai-chat
```

## Key Implementation Details

### API Key Loading (Frontend)

See `/src/components/MultiAIConversationManager.tsx:148-179`

```typescript
const loadApiKeys = () => {
  const envKeys = {
    openai: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
    anthropic: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || '',
    ollama: 'http://localhost:11434',
    ollamaCloud: process.env.NEXT_PUBLIC_OLLAMA_API_KEY || '',
    gemini: process.env.NEXT_PUBLIC_GEMINI_API_KEY || ''
  };
  setApiKeys(envKeys);
};
```

### Provider Instantiation (Backend)

See `/src/app/api/ai/route.ts`

Each provider case explicitly sets:
- API endpoint URL
- Authentication headers
- Request/response format

Example for OpenAI:
```typescript
case 'openai':
  response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({ model: 'gpt-4', messages, ... })
  });
```

## Security Notes

- **Never commit `.env.local`** to version control (already in `.gitignore`)
- API keys are loaded from environment variables only
- All external API calls are proxied through the Next.js backend
- No API keys are stored in localStorage or exposed to the browser
- Each provider has isolated credentials and endpoints

## Troubleshooting

### "API key not found" error
- Check that you've copied `.env.example` to `.env.local`
- Verify your API keys are correct and have the `NEXT_PUBLIC_` prefix
- Restart the development server after changing `.env.local`

### Ollama local not working
- Ensure Ollama Desktop is running
- Check that `http://localhost:11434` is accessible
- Verify you have models installed: `ollama list`

### Provider not responding
- Check your API key is valid and has credits/quota
- Review the browser console and terminal for error messages
- Verify the provider's API is not experiencing downtime

## Contributing

Contributions are welcome! Please ensure:
1. Environment variables follow the `NEXT_PUBLIC_` naming convention
2. New providers are added to both frontend and backend
3. Documentation is updated for new features

## License

MIT

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [OpenAI API](https://platform.openai.com/docs)
- [Anthropic API](https://docs.anthropic.com/)
- [Google Gemini API](https://ai.google.dev/)
- [Ollama Documentation](https://ollama.ai/docs)

---

**Built with Next.js, React, TypeScript, and Tailwind CSS**
