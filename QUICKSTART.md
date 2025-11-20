# Quick Start Guide

This guide will help you get your portfolio website up and running in minutes.

## Prerequisites

- Node.js 20 or higher installed
- Basic knowledge of terminal/command line

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Add Your CV

Place your CV PDF file in the `public` directory and name it `cv.pdf`:

```
public/
└── cv.pdf  <-- Your CV goes here
```

### 3. Customize Your Content

#### Update Personal Information

Edit these files with your information:

**About Section** (`components/sections/about.tsx`):
- Update your bio
- Modify the skills list

**Resume Section** (`components/sections/resume.tsx`):
- Update work experience
- Update education
- Update certifications

**Contact Section** (`components/sections/contact.tsx`):
- Update location
- Update email address
- Update social links (LinkedIn, GitHub, etc.)

**Site Metadata** (`app/layout.tsx`):
- Update title and description
- Update Open Graph information
- Update keywords

#### Add Your Projects

Edit `data/projects.ts` to add your projects:

```typescript
{
  id: "your-project-id",
  title: "Your Project Name",
  description: "A brief description of your project",
  techStack: ["React", "Node.js", "etc"],
  demoUrl: "https://demo-url.com", // optional
  githubUrl: "https://github.com/you/project", // optional
  status: "live", // or "in-development" or "archived"
  featured: true, // true for featured projects
}
```

### 4. Configure Analytics (Optional)

If you want to use Plausible analytics:

1. Sign up at [plausible.io](https://plausible.io)
2. Add your domain to Plausible
3. Update `components/plausible-provider.tsx`:

```tsx
data-domain="your-domain.com"
```

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your site!

### 6. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `out` directory.

## Deployment to Cloudflare Pages

### Using Cloudflare Dashboard

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Click "Create a project"
3. Connect your Git repository or upload the `out` folder
4. Configure:
   - Build command: `npm run build`
   - Build output directory: `out`
   - Node version: 20
5. Click "Save and Deploy"
6. Add your custom domain in the Pages settings

### Using Wrangler CLI

```bash
# Install Wrangler globally
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build the project
npm run build

# Deploy
wrangler pages deploy out --project-name=thesailingproject
```

## Customization Tips

### Change Colors

Edit `tailwind.config.ts` to modify the brand colors:

```typescript
brand: {
  blue: {
    500: '#YOUR_COLOR',
  },
  beige: {
    500: '#YOUR_COLOR',
  }
}
```

### Add More Sections

1. Create a new component in `components/sections/`
2. Import it in `app/page.tsx`
3. Add it to the page layout

### Modify Navigation

Edit `components/navigation.tsx` to add/remove navigation items:

```typescript
const navItems = [
  { name: "About", href: "#about" },
  { name: "Apps", href: "#apps" },
  // Add more items here
];
```

## Troubleshooting

### Build fails

```bash
# Clear everything and reinstall
rm -rf node_modules .next out
npm install
npm run build
```

### Dark mode not working

- Clear browser cache
- Check that JavaScript is enabled
- Verify `next-themes` is installed

### Images not loading

- Make sure images are in the `public` folder
- Use `/` prefix for public folder paths (e.g., `/cv.pdf`)
- Check image paths are correct

## Support

If you run into issues:
1. Check the full [README.md](./README.md)
2. Review the code comments
3. Check the Next.js documentation

## Next Steps

After your site is running:
1. ✅ Add your CV to the `public` folder
2. ✅ Update all personal information
3. ✅ Add your projects
4. ✅ Test on mobile devices
5. ✅ Deploy to Cloudflare Pages
6. ✅ Add your custom domain
7. ✅ Set up analytics (optional)

Happy building! 🚀
