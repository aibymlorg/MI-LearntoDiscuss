# Deploying MI-LearntoDiscuss to Vercel

This guide will walk you through deploying the Multi-AI Conversation Manager to Vercel.

## Prerequisites

- A [Vercel account](https://vercel.com/signup) (free tier is fine)
- API keys for the AI providers you want to use (see API_SETUP.md)
- Git repository access (already set up)

## Deployment Methods

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit [https://vercel.com/new](https://vercel.com/new)
   - Sign in to your Vercel account

2. **Import Your Repository**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Choose this repository (`MI-LearntoDiscuss`)
   - Click "Import"

3. **Configure Your Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Add Environment Variables**
   Click "Environment Variables" and add the following:

   | Variable Name | Description | Required |
   |--------------|-------------|----------|
   | `NEXT_PUBLIC_OPENAI_API_KEY` | Your OpenAI API key | Optional* |
   | `NEXT_PUBLIC_ANTHROPIC_API_KEY` | Your Anthropic (Claude) API key | Optional* |
   | `NEXT_PUBLIC_GEMINI_API_KEY` | Your Google Gemini API key | Optional* |
   | `NEXT_PUBLIC_OLLAMA_API_KEY` | Your Ollama Cloud API key | Optional* |
   | `NEXT_PUBLIC_OLLAMA_URL` | Ollama API URL (default: `https://api.ollama.ai`) | Optional |
   | `NEXT_PUBLIC_OLLAMA_MODEL` | Ollama model to use (default: `llama3.3:latest`) | Optional |

   **Note**: At least one AI provider API key is required for the app to function. You can configure API keys in the app's Settings panel after deployment as well.

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually 2-3 minutes)
   - Your app will be live at `https://your-project-name.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   # From the project root directory
   vercel
   ```

4. **Follow the prompts**
   - Set up and deploy? **Y**
   - Which scope? (select your account)
   - Link to existing project? **N**
   - Project name? (accept default or enter custom name)
   - In which directory is your code located? **./**
   - Want to override settings? **N**

5. **Add Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_OPENAI_API_KEY
   vercel env add NEXT_PUBLIC_ANTHROPIC_API_KEY
   vercel env add NEXT_PUBLIC_GEMINI_API_KEY
   vercel env add NEXT_PUBLIC_OLLAMA_API_KEY
   vercel env add NEXT_PUBLIC_OLLAMA_URL
   vercel env add NEXT_PUBLIC_OLLAMA_MODEL
   ```

6. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Method 3: Deploy via GitHub Integration (Continuous Deployment)

1. **Connect GitHub to Vercel**
   - Go to [https://vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Authorize Vercel to access your GitHub account
   - Select the `MI-LearntoDiscuss` repository

2. **Configure as in Method 1**
   - Add environment variables
   - Click "Deploy"

3. **Automatic Deployments**
   - Every push to your main branch will trigger a new deployment
   - Pull requests will get preview deployments automatically

## Post-Deployment Configuration

### 1. Verify Deployment

Visit your deployed app URL and check that:
- The app loads correctly
- AI providers are accessible (check Settings panel)
- You can start a conversation with at least one AI model

### 2. Configure Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

### 3. Configure Environment Variables

You can manage environment variables in two ways:

**Via Vercel Dashboard:**
1. Go to your project settings
2. Click "Environment Variables"
3. Add, edit, or remove variables
4. Redeploy to apply changes

**Via CLI:**
```bash
vercel env ls                    # List all environment variables
vercel env add <name>            # Add new variable
vercel env rm <name>             # Remove variable
vercel env pull .env.local       # Pull variables to local file
```

### 4. Monitor Deployment

- **Analytics**: Vercel Dashboard → Analytics
- **Logs**: Vercel Dashboard → Deployments → [Your Deployment] → Logs
- **Performance**: Vercel Dashboard → Speed Insights

## Important Notes

### Security Considerations

1. **API Keys**: Although we use `NEXT_PUBLIC_` prefix for client-side access, be aware that these keys will be visible in the browser. Consider implementing a backend API route for sensitive operations in production.

2. **Rate Limiting**: Consider implementing rate limiting to prevent abuse of your API keys.

3. **CORS**: If you plan to access the app from other domains, configure CORS properly in `next.config.ts`.

### Troubleshooting

**Build Fails**
- Check build logs in Vercel Dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript has no errors: `npm run build` locally

**Environment Variables Not Working**
- Ensure variables start with `NEXT_PUBLIC_` prefix
- Redeploy after adding new variables
- Clear browser cache and hard refresh

**API Calls Failing**
- Verify API keys are correct
- Check API provider status pages
- Review browser console for errors
- Check Vercel function logs

**Performance Issues**
- Enable Vercel Edge Functions for faster response times
- Implement caching strategies
- Optimize images and assets
- Use Vercel Analytics to identify bottlenecks

## Updating Your Deployment

### Automatic Updates (with GitHub integration)
```bash
git add .
git commit -m "Your commit message"
git push origin main
```
Vercel will automatically detect and deploy changes.

### Manual Updates (via CLI)
```bash
vercel --prod
```

## Rollback to Previous Deployment

1. Go to Vercel Dashboard → Deployments
2. Find the deployment you want to rollback to
3. Click the three dots menu → "Promote to Production"

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Environment Variables Guide](https://vercel.com/docs/environment-variables)

## Support

If you encounter issues:
1. Check [Vercel Status](https://www.vercel-status.com/)
2. Review [Vercel Community](https://github.com/vercel/vercel/discussions)
3. Check project issues on GitHub

---

**Quick Deploy Button**

Click the button below for one-click deployment:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/aibymlorg/MI-LearntoDiscuss)

After clicking, you'll be prompted to:
1. Create a Vercel account or sign in
2. Clone the repository to your account
3. Add environment variables
4. Deploy!
