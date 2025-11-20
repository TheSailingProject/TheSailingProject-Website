# The Sailing Project - Portfolio Website

A beautifully minimalist, modern portfolio and resume website for thesailingproject.com. Built with Next.js, TypeScript, and Tailwind CSS, featuring smooth animations, dark mode support, and privacy-focused analytics.

## Features

- **Modern Tech Stack**: Built with Next.js 15, React 18, TypeScript, and Tailwind CSS
- **Responsive Design**: Fully responsive across all devices with mobile-first approach
- **Dark Mode**: Seamless dark/light mode toggle with system preference detection
- **Smooth Animations**: Polished animations using Framer Motion
- **Privacy-Focused Analytics**: Integrated with Plausible.io for GDPR-compliant analytics
- **Accessibility**: WCAG-compliant design with proper ARIA labels and keyboard navigation
- **SEO Optimized**: Meta tags, Open Graph, and semantic HTML
- **Fast Performance**: Static site generation for optimal loading speeds
- **Cloudflare Ready**: Configured for deployment on Cloudflare Pages

## Project Structure

```
thesailingproject-website/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── sections/           # Page sections
│   │   ├── hero.tsx
│   │   ├── about.tsx
│   │   ├── portfolio.tsx
│   │   ├── resume.tsx
│   │   └── contact.tsx
│   ├── navigation.tsx      # Navigation bar
│   ├── theme-provider.tsx  # Theme context
│   ├── theme-toggle.tsx    # Dark mode toggle
│   └── plausible-provider.tsx
├── data/                    # Data files
│   └── projects.ts         # Portfolio projects
├── Assets/                  # Static assets
│   └── Branding/           # Logo and branding assets
├── public/                  # Public static files
│   └── cv.pdf              # Downloadable CV (add your own)
├── tailwind.config.ts      # Tailwind configuration
├── next.config.js          # Next.js configuration
├── wrangler.toml           # Cloudflare configuration
└── package.json            # Dependencies
```

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn package manager

### Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Add your CV:**

Place your CV PDF file in the `public` directory as `cv.pdf`. This will be available for download from the Resume section.

3. **Configure Plausible Analytics (optional):**

If you want to use Plausible analytics, update the domain in `components/plausible-provider.tsx`:

```tsx
<script
  defer
  data-domain="your-domain.com"
  src="https://plausible.io/js/script.js"
/>
```

4. **Update Projects:**

Edit `data/projects.ts` to add your own projects. Each project should include:
- Title and description
- Tech stack
- Status (live, in-development, archived)
- Optional: demo URL, GitHub URL, thumbnail

5. **Customize Content:**

Update the following files with your personal information:
- `components/sections/about.tsx` - Your bio and skills
- `components/sections/resume.tsx` - Your experience and education
- `components/sections/contact.tsx` - Your contact information
- `app/layout.tsx` - SEO metadata

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

Create a production build:

```bash
npm run build
```

This will generate a static export in the `out` directory.

## Deployment to Cloudflare Pages

### Option 1: Using Wrangler CLI

1. **Install Wrangler:**

```bash
npm install -g wrangler
```

2. **Login to Cloudflare:**

```bash
wrangler login
```

3. **Deploy:**

```bash
npm run build
wrangler pages deploy out --project-name=thesailingproject
```

### Option 2: Using Cloudflare Dashboard

1. **Build the project:**

```bash
npm run build
```

2. **Go to Cloudflare Pages dashboard:**
   - Click "Create a project"
   - Connect your Git repository or upload the `out` directory directly

3. **Configure build settings:**
   - Build command: `npm run build`
   - Build output directory: `out`
   - Node version: 20

4. **Deploy:**
   - Click "Save and Deploy"
   - Your site will be live at `your-project.pages.dev`

5. **Add custom domain:**
   - Go to "Custom domains" in your Pages project
   - Add `thesailingproject.com`
   - Update DNS records as instructed

### Environment Variables

If you need environment variables, create a `.env.local` file (see `.env.example`) and add them in the Cloudflare Pages dashboard under Settings > Environment variables.

## Customization Guide

### Colors and Branding

The design uses colors extracted from your branding assets. To modify:

1. Edit `tailwind.config.ts` to adjust the color palette
2. Update the brand colors in the `theme.extend.colors.brand` section

### Fonts

The site uses Inter as the primary font. To change:

1. Update the font import in `app/layout.tsx`
2. Modify the font family in `tailwind.config.ts`

### Adding More Projects

1. Edit `data/projects.ts`
2. Add a new project object with all required fields
3. The portfolio section will automatically display the new project

### Contact Form Integration

The contact form currently logs submissions to the console. To integrate with a backend:

1. Create an API endpoint (e.g., using Cloudflare Workers)
2. Update the `onSubmit` function in `components/sections/contact.tsx`
3. Add your API URL to the environment variables

Example integration with Cloudflare Workers:

```typescript
const onSubmit = async (data: ContactFormData) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  // Handle response...
};
```

## Performance Optimization

The site is already optimized for performance:

- Static site generation for instant page loads
- Image optimization (unoptimized for Cloudflare compatibility)
- Code splitting and lazy loading
- Minimal JavaScript bundle
- CSS purging via Tailwind

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- iOS Safari (latest 2 versions)
- Android Chrome (latest 2 versions)

## Accessibility

The site follows WCAG 2.1 Level AA guidelines:

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Sufficient color contrast ratios
- Focus indicators
- Screen reader friendly

## Analytics

The site uses Plausible.io for privacy-focused analytics:

- No cookies
- GDPR compliant
- Lightweight (< 1KB)
- Does not track personal data

To view analytics:
1. Sign up for Plausible.io
2. Add your domain
3. Update the domain in `components/plausible-provider.tsx`

## Troubleshooting

### Build Errors

If you encounter build errors:

```bash
# Clear cache and reinstall
rm -rf node_modules .next out
npm install
npm run build
```

### Cloudflare Deployment Issues

- Ensure Node version is set to 20 (check `.node-version`)
- Verify build output directory is `out`
- Check that all dependencies are in `dependencies` (not `devDependencies`)

### Dark Mode Not Working

- Clear browser cache
- Check that JavaScript is enabled
- Verify `next-themes` is properly installed

## License

This project is open source and available for personal and commercial use.

## Support

For questions or issues:
- Email: contact@thesailingproject.com
- Check the documentation
- Review the code comments

## Credits

- Design inspiration: Flighty.com
- Built with Next.js, React, Tailwind CSS, and Framer Motion
- Analytics by Plausible.io
- Hosted on Cloudflare Pages

---

Made with care by Arno Schutijser
