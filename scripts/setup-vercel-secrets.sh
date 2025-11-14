#!/bin/bash

# Script to help set up Vercel secrets for GitHub Actions
# Run this script to get your Vercel Organization ID and Project ID

set -e

echo "=================================================="
echo "  Vercel CI/CD Setup Helper"
echo "=================================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed."
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "✅ Vercel CLI is installed"
echo ""

# Step 1: Login
echo "Step 1: Login to Vercel"
echo "------------------------"
echo "This will open your browser for authentication..."
echo ""
vercel login

echo ""
echo "Step 2: Link to your Vercel project"
echo "------------------------------------"
echo "This will link this directory to your Vercel project."
echo "If you haven't deployed yet, it will create a new project."
echo ""

# Link the project
vercel link

echo ""
echo "Step 3: Extract IDs from Vercel configuration"
echo "----------------------------------------------"

# Check if .vercel/project.json exists
if [ -f ".vercel/project.json" ]; then
    echo "✅ Found Vercel project configuration!"
    echo ""

    # Extract IDs using node/python/jq if available
    if command -v jq &> /dev/null; then
        ORG_ID=$(jq -r '.orgId' .vercel/project.json)
        PROJECT_ID=$(jq -r '.projectId' .vercel/project.json)
    else
        # Fallback: just display the file
        echo "📄 Vercel project configuration:"
        cat .vercel/project.json
        echo ""
        echo "⚠️  Install 'jq' for automatic extraction, or copy the IDs manually from above"
        echo ""
        ORG_ID=$(grep -o '"orgId":"[^"]*' .vercel/project.json | cut -d'"' -f4)
        PROJECT_ID=$(grep -o '"projectId":"[^"]*' .vercel/project.json | cut -d'"' -f4)
    fi

    echo "=================================================="
    echo "  📋 Your Vercel IDs"
    echo "=================================================="
    echo ""
    echo "Organization ID:  $ORG_ID"
    echo "Project ID:       $PROJECT_ID"
    echo ""
else
    echo "❌ Could not find .vercel/project.json"
    echo "   Run 'vercel link' manually and try again"
    exit 1
fi

echo "Step 4: Getting Vercel Token"
echo "----------------------------"
echo "⚠️  You need to create a Vercel token manually:"
echo ""
echo "1. Go to: https://vercel.com/account/tokens"
echo "2. Click 'Create Token'"
echo "3. Name it: 'GitHub Actions CI/CD'"
echo "4. Copy the token (you'll only see it once!)"
echo ""

echo "=================================================="
echo "  🔐 GitHub Secrets to Add"
echo "=================================================="
echo ""
echo "Go to your GitHub repository settings and add these secrets:"
echo ""
echo "Secret Name              | Value"
echo "-------------------------|----------------------------------------"
echo "VERCEL_TOKEN             | [Paste token from Vercel dashboard]"
echo "VERCEL_ORG_ID            | $ORG_ID"
echo "VERCEL_PROJECT_ID        | $PROJECT_ID"
echo ""
echo "=================================================="
echo ""
echo "📍 Add secrets at:"
echo "   https://github.com/aibymlorg/MI-LearntoDiscuss/settings/secrets/actions"
echo ""
echo "Or use GitHub CLI:"
echo "   gh secret set VERCEL_TOKEN"
echo "   gh secret set VERCEL_ORG_ID -b \"$ORG_ID\""
echo "   gh secret set VERCEL_PROJECT_ID -b \"$PROJECT_ID\""
echo ""
echo "=================================================="
echo "  ✅ Setup Complete!"
echo "=================================================="
echo ""
echo "After adding secrets to GitHub:"
echo "1. Create a pull request"
echo "2. Watch GitHub Actions run automatically"
echo "3. See preview deployment in PR comments"
echo "4. Merge to deploy to production"
echo ""
echo "🚀 Happy deploying!"
echo ""
