# Deployment Guide for Cloudflare Pages

This guide provides detailed instructions for deploying your portfolio website to Cloudflare Pages.

## Prerequisites

- A Cloudflare account (free tier is sufficient)
- Your website code in a Git repository (GitHub, GitLab, or Bitbucket) OR built locally
- Your domain configured with Cloudflare DNS (optional, for custom domain)

## Deployment Methods

### Method 1: Direct Git Integration (Recommended)

This method automatically deploys your site whenever you push to your repository.

1. **Push your code to a Git repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Select "Workers & Pages" from the left sidebar
   - Click "Create application" > "Pages" > "Connect to Git"
   - Authorize Cloudflare to access your Git provider
   - Select your repository

3. **Configure Build Settings**
   - **Project name**: `thesailingproject` (or your preferred name)
   - **Production branch**: `main`
   - **Framework preset**: `Next.js (Static HTML Export)`
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Root directory**: `/` (leave empty if repo root)

4. **Environment Variables** (if needed)
   - Click "Add variable" for any environment variables
   - Example: `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=thesailingproject.com`

5. **Deploy**
   - Click "Save and Deploy"
   - Wait 2-5 minutes for the first build
   - Your site will be live at `<project-name>.pages.dev`

### Method 2: Manual Upload

If you don't want to use Git integration:

1. **Build your site locally**
   ```bash
   npm run build
   ```

2. **Upload to Cloudflare Pages**
   - Go to Cloudflare Dashboard > Workers & Pages
   - Click "Create application" > "Pages" > "Upload assets"
   - Drag and drop the `out` folder
   - Click "Deploy site"

### Method 3: Wrangler CLI

For command-line enthusiasts:

1. **Install Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Build and Deploy**
   ```bash
   npm run build
   wrangler pages deploy out --project-name=thesailingproject
   ```

4. **Subsequent Deployments**
   ```bash
   npm run build && wrangler pages deploy out
   ```

## Custom Domain Setup

### Step 1: Add Domain to Cloudflare

If your domain isn't on Cloudflare yet:

1. Go to Cloudflare Dashboard
2. Click "Add a Site"
3. Enter your domain name
4. Follow the instructions to change your nameservers
5. Wait for DNS propagation (usually 24 hours)

### Step 2: Connect Domain to Pages

1. Go to your Pages project
2. Click "Custom domains"
3. Click "Set up a custom domain"
4. Enter your domain: `thesailingproject.com`
5. Cloudflare will automatically configure DNS
6. Also add `www.thesailingproject.com` if desired

### Step 3: SSL/TLS

Cloudflare automatically provisions SSL certificates. Ensure:
- SSL/TLS encryption mode is set to "Full" or "Full (strict)"
- Always Use HTTPS is enabled

## Post-Deployment Checklist

- [ ] Site is accessible at `<project-name>.pages.dev`
- [ ] Custom domain is working (if configured)
- [ ] HTTPS is working correctly
- [ ] All pages load correctly
- [ ] Navigation works properly
- [ ] Dark mode toggle works
- [ ] Contact form submits (check console for logs)
- [ ] CV download link works (after adding cv.pdf)
- [ ] Mobile responsiveness looks good
- [ ] Analytics are tracking (if Plausible configured)

## Performance Optimization

Cloudflare Pages automatically provides:
- ✅ Global CDN distribution
- ✅ HTTP/2 and HTTP/3 support
- ✅ Brotli compression
- ✅ Automatic minification
- ✅ DDoS protection
- ✅ Free SSL certificates

Additional optimizations:
- Enable "Rocket Loader" in Speed > Optimization
- Enable "Auto Minify" for HTML, CSS, JS
- Set Browser Cache TTL to "Respect Existing Headers"

## Continuous Deployment

With Git integration, your site automatically rebuilds when you:
- Push to your production branch
- Merge a pull request
- Make changes through the GitHub web interface

**Build Settings:**
- Production builds: Deploy from `main` branch
- Preview builds: Deploy from pull requests
- Branch deployments: Deploy from other branches

## Environment Variables

Add environment variables in Pages settings:

**For Production:**
```
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=thesailingproject.com
NEXT_PUBLIC_SITE_URL=https://thesailingproject.com
```

**For Preview:**
Same as production, or different values for testing

## Rollback

If a deployment breaks your site:

1. Go to Pages project > Deployments
2. Find a working deployment
3. Click the three dots > "Rollback to this deployment"
4. Confirm rollback

## Monitoring

### Analytics

1. **Cloudflare Analytics** (free)
   - Pages project > Analytics
   - View traffic, requests, bandwidth

2. **Plausible** (privacy-focused, paid)
   - Configure in `components/plausible-provider.tsx`
   - View detailed visitor analytics

### Build Logs

- View build logs in Pages project > Deployments
- Click on any deployment to see full build output
- Useful for debugging build failures

## Troubleshooting

### Build Failures

**Issue:** "Build exceeded 20 minute limit"
- **Solution:** Optimize dependencies, check for infinite loops

**Issue:** "Module not found"
- **Solution:** Ensure all dependencies are in `package.json` dependencies (not devDependencies)

**Issue:** "Out of memory"
- **Solution:** Reduce build complexity, optimize images

### Runtime Issues

**Issue:** "Page not found" on refresh
- **Solution:** Already configured in `next.config.js` with `output: 'export'`

**Issue:** "Images not loading"
- **Solution:** Use `unoptimized: true` in `next.config.js` (already configured)

**Issue:** "API routes not working"
- **Solution:** Static export doesn't support API routes. Use Cloudflare Workers for backend functionality.

### DNS Issues

**Issue:** "Domain not resolving"
- **Solution:** Wait up to 48 hours for DNS propagation
- Check DNS records in Cloudflare DNS settings

**Issue:** "Too many redirects"
- **Solution:** Set SSL/TLS to "Full" (not "Flexible")

## Advanced Configuration

### Custom Headers

Create `public/_headers` file:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### Redirects

Create `public/_redirects` file:

```
/old-path /new-path 301
/blog/* /articles/:splat 301
```

### Functions (Cloudflare Workers)

For dynamic functionality:

1. Create `functions` directory in project root
2. Add serverless functions as needed
3. Deploy with Pages - they automatically become Workers

Example: `functions/api/contact.ts`
```typescript
export async function onRequest(context) {
  // Handle contact form submissions
  return new Response(JSON.stringify({ success: true }))
}
```

## Costs

**Free Tier Includes:**
- Unlimited sites
- Unlimited requests
- Unlimited bandwidth
- 500 builds per month
- 1 concurrent build

**Paid Plan ($20/month):**
- 5,000 builds per month
- 5 concurrent builds
- Advanced features

For a portfolio site, the free tier is more than sufficient!

## Support Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Next.js Static Export Guide](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Cloudflare Community](https://community.cloudflare.com/)

## Quick Reference Commands

```bash
# Build locally
npm run build

# Deploy with Wrangler
wrangler pages deploy out --project-name=thesailingproject

# View logs
wrangler pages deployment tail

# List deployments
wrangler pages deployment list --project-name=thesailingproject
```

---

Your portfolio website is now live on Cloudflare Pages with global CDN distribution, automatic HTTPS, and excellent performance!
