# Security Guide

## Security Overview

This static website has a minimal attack surface due to its architecture. However, proper security configuration is essential before deployment.

## Current Security Status

### ✅ Inherently Secure Features

1. **Static Site Architecture**
   - No server-side code execution
   - No database connections
   - No authentication system
   - No sensitive data processing

2. **React Security**
   - Automatic XSS protection (React escapes by default)
   - TypeScript prevents type-related vulnerabilities
   - No `dangerouslySetInnerHTML` usage

3. **No Secrets Exposure**
   - No API keys in code
   - No environment variables with sensitive data
   - Analytics script is public (Plausible)

### ⚠️ Areas Requiring Attention

## Pre-Deployment Security Checklist

### 1. Fix Dependency Vulnerabilities

The dependencies have some vulnerabilities in **dev tools only** (not production):

```bash
# Update wrangler (has available fix)
npm install wrangler@latest --save-dev

# Audit and review
npm audit

# For production dependencies only
npm audit --production
```

**Important:** Most vulnerabilities are in build tools (@cloudflare/next-on-pages, wrangler, esbuild). These don't run in production - they only build your static files.

### 2. Add Security Headers

Create `public/_headers` file for Cloudflare Pages:

```
/*
  # Prevent clickjacking
  X-Frame-Options: DENY

  # Prevent MIME type sniffing
  X-Content-Type-Options: nosniff

  # Enable XSS protection
  X-XSS-Protection: 1; mode=block

  # Referrer policy
  Referrer-Policy: strict-origin-when-cross-origin

  # Permissions policy
  Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()

  # Content Security Policy
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://plausible.io; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://plausible.io; frame-ancestors 'none'; base-uri 'self'; form-action 'self'

  # HSTS (after confirming HTTPS works)
  # Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

# Cache static assets for 1 year
/Assets/*
  Cache-Control: public, max-age=31536000, immutable

# Don't cache HTML
/*.html
  Cache-Control: public, max-age=0, must-revalidate
```

### 3. Contact Form Security

**Current State:** Form logs to console (no backend)

**For Production:** You need to add a backend endpoint

**Option A: Cloudflare Workers Function**

Create `functions/api/contact.ts`:

```typescript
interface ContactRequest {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
}

export async function onRequestPost(context: any) {
  try {
    const data: ContactRequest = await context.request.json();

    // Anti-spam: honeypot check
    if (data.honeypot) {
      return new Response(JSON.stringify({ error: 'Spam detected' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Rate limiting (use Cloudflare KV or Durable Objects)
    // TODO: Implement rate limiting

    // Validate input
    if (!data.name || !data.email || !data.message) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Send email (use Cloudflare Email Workers or external service)
    // TODO: Implement email sending
    // Example: SendGrid, Mailgun, AWS SES, etc.

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
```

**Option B: Use a Third-Party Service**

- [FormSpree](https://formspree.io/) - Easy integration, free tier
- [Netlify Forms](https://www.netlify.com/products/forms/) - If using Netlify
- [Web3Forms](https://web3forms.com/) - Privacy-focused, free

### 4. Environment Variables

Never commit sensitive data. Use Cloudflare Pages environment variables:

```bash
# In Cloudflare Pages dashboard:
# Settings > Environment variables

# Add (if needed):
CONTACT_FORM_ENDPOINT=https://your-api.com/contact
EMAIL_API_KEY=your-secret-key  # Never in code!
```

In your code:
```typescript
const apiKey = process.env.EMAIL_API_KEY; // Safe
```

### 5. HTTPS Configuration

Cloudflare automatically provides SSL/TLS. Verify:

1. Go to SSL/TLS settings in Cloudflare
2. Set encryption mode to **"Full (strict)"**
3. Enable **"Always Use HTTPS"**
4. Enable **"Automatic HTTPS Rewrites"**

After HTTPS is confirmed working, enable HSTS (uncomment in `_headers`):
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

### 6. Rate Limiting (Recommended)

Protect contact form from abuse:

**Option A: Cloudflare Rate Limiting Rules**
1. Go to Security > WAF > Rate limiting rules
2. Create rule:
   - Request matching: `/api/contact`
   - Requests: 5 requests per 60 seconds
   - Action: Block

**Option B: Client-Side Rate Limiting**
Add to contact form component:

```typescript
const [lastSubmit, setLastSubmit] = useState<number>(0);

const onSubmit = async (data: ContactFormData) => {
  const now = Date.now();
  if (now - lastSubmit < 60000) { // 1 minute
    setSubmitStatus("error");
    return;
  }
  setLastSubmit(now);
  // ... rest of submit logic
};
```

### 7. Content Security Policy (CSP)

Already included in `_headers` above. Adjust based on your needs:

- Allows scripts from `self` and Plausible analytics
- Blocks inline scripts (with unsafe-inline for Next.js)
- Restricts external resources

**Fine-tune CSP:**
```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://plausible.io;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self' data:;
  connect-src 'self' https://plausible.io;
  frame-ancestors 'none';
```

### 8. Input Validation

Contact form already has:
- ✅ Zod schema validation
- ✅ Honeypot anti-spam
- ✅ Email format validation

Enhance with:
- ✅ Max length limits (already in Zod)
- ✅ Sanitization (React handles this)
- ⚠️ Backend validation (needed when you add backend)

### 9. Monitoring & Logging

**Cloudflare Analytics** (Free):
- Traffic patterns
- Bot detection
- Attack mitigation

**Set up alerts:**
1. Cloudflare dashboard > Notifications
2. Create alerts for:
   - SSL/TLS certificate expiry
   - Security events
   - Unusual traffic spikes

### 10. Regular Updates

```bash
# Check for updates monthly
npm outdated

# Update non-breaking changes
npm update

# Update all (review changes first)
npm install package@latest
```

## Production Security Checklist

Before going live:

- [ ] Security headers added (`public/_headers`)
- [ ] HTTPS enabled and forced
- [ ] Contact form has backend (or disabled)
- [ ] Rate limiting configured
- [ ] CSP configured and tested
- [ ] No secrets in code
- [ ] Dependencies audited
- [ ] Error messages don't leak information
- [ ] Analytics configured (Plausible)
- [ ] Monitoring/alerts set up
- [ ] Backup/rollback plan in place

## Ongoing Security

### Monthly Tasks
- [ ] Review Cloudflare security events
- [ ] Check for dependency updates
- [ ] Review analytics for unusual patterns

### Quarterly Tasks
- [ ] Full security audit
- [ ] Test contact form (if active)
- [ ] Review and update security headers
- [ ] Check SSL certificate status

## Vulnerability Reporting

If you discover a security issue:
1. Don't publish it publicly
2. Document the issue with reproduction steps
3. Patch immediately
4. Review related code for similar issues

## Security Best Practices

### ✅ DO
- Use HTTPS everywhere
- Keep dependencies updated
- Monitor security events
- Use strong CSP headers
- Validate all inputs
- Rate limit forms
- Use environment variables for secrets

### ❌ DON'T
- Commit API keys or secrets
- Disable security features
- Ignore security warnings
- Trust user input
- Use HTTP
- Expose stack traces in production

## Cloudflare Security Features

Free tier includes:
- ✅ DDoS protection
- ✅ SSL/TLS encryption
- ✅ Web Application Firewall (WAF)
- ✅ Bot management
- ✅ Always Online
- ✅ Analytics

Enable in Cloudflare:
1. **Under Attack Mode**: If experiencing DDoS
2. **Bot Fight Mode**: Block bot traffic
3. **Security Level**: Medium or higher
4. **Challenge Passage**: 30 minutes

## Contact Form Security Deep Dive

Since the contact form is the only user input:

### Client-Side (Already Implemented)
```typescript
// Zod validation
const contactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254),
  message: z.string().min(10).max(5000),
  honeypot: z.string().max(0), // Anti-spam
});
```

### Server-Side (To Implement)
```typescript
// Add when you create backend:
- Validate all fields again (never trust client)
- Check honeypot
- Rate limit by IP
- Sanitize inputs
- Log suspicious activity
- Use CAPTCHA if spam persists (hCaptcha, Cloudflare Turnstile)
```

## Advanced Security (Optional)

### Subresource Integrity (SRI)
For external scripts:
```html
<script src="https://plausible.io/js/script.js"
  integrity="sha384-..."
  crossorigin="anonymous"></script>
```

### DNS Security
- Enable DNSSEC in Cloudflare
- Set up CAA records
- Configure proper SPF/DKIM if using email

### Privacy Enhancements
- ✅ Already using Plausible (privacy-focused)
- ✅ No cookies (unless you add them)
- ✅ No user tracking
- ✅ No third-party ads

## Compliance

### GDPR Compliance
- ✅ No unnecessary data collection
- ✅ Privacy-focused analytics (Plausible)
- ✅ Clear privacy policy (add to site)
- ⚠️ Add cookie banner if you use cookies

### Accessibility & Security
- ✅ WCAG 2.1 AA compliant
- ✅ Screen reader friendly
- ✅ Keyboard navigation
- ✅ No security through obscurity

## Emergency Response

If your site is compromised:

1. **Immediate Actions**
   - Enable "Under Attack Mode" in Cloudflare
   - Roll back to last known good deployment
   - Review Cloudflare logs

2. **Investigation**
   - Check git history for unauthorized changes
   - Review Cloudflare access logs
   - Audit environment variables

3. **Recovery**
   - Deploy clean version
   - Rotate any exposed credentials
   - Update dependencies
   - Review and strengthen security

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Cloudflare Security Docs](https://developers.cloudflare.com/fundamentals/security/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/deploying#security-headers)
- [React Security Best Practices](https://react.dev/learn/security)

## Conclusion

Your static portfolio website is **inherently secure** due to its architecture. The main security considerations are:

1. ✅ **Low Risk**: Static site, no backend, no database
2. ⚠️ **Medium Priority**: Add security headers before launch
3. ⚠️ **High Priority**: Secure contact form backend (when you add it)
4. ✅ **Ongoing**: Keep dependencies updated

**Bottom line:** This site is safer than 90% of websites because it's static!
