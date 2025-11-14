This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

Deploy this Multi-AI Conversation Manager to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/aibymlorg/MI-LearntoDiscuss)

### Quick Deployment Steps

1. Click the "Deploy with Vercel" button above
2. Sign in to your Vercel account (or create one)
3. Add your AI provider API keys as environment variables:
   - `NEXT_PUBLIC_OPENAI_API_KEY`
   - `NEXT_PUBLIC_ANTHROPIC_API_KEY`
   - `NEXT_PUBLIC_GEMINI_API_KEY`
   - `NEXT_PUBLIC_OLLAMA_API_KEY` (if using Ollama Cloud)
4. Click "Deploy"

For detailed deployment instructions, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md).

### Alternative Deployment Methods

- **Vercel CLI**: `npm install -g vercel && vercel`
- **GitHub Integration**: Connect your repo for automatic deployments
- **Manual**: Import project at [vercel.com/new](https://vercel.com/new)

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
