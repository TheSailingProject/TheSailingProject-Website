import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navigation from "@/components/navigation";
import PlausibleProvider from "@/components/plausible-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Arno Snoeys | Data Analyst & Professional Yachtmaster",
  description: "Portfolio of Arno Snoeys - Data Analyst specializing in statistical analysis and predictive models, Professional Yachtmaster, and multilingual professional based in Brussels.",
  keywords: ["data analyst", "statistical analysis", "Power BI", "Python", "SQL", "yachtmaster", "Brussels", "sailing"],
  authors: [{ name: "Arno Snoeys" }],
  openGraph: {
    title: "Arno Snoeys | Data Analyst & Professional Yachtmaster",
    description: "Portfolio showcasing data analysis expertise, maritime qualifications, and professional experience.",
    url: "https://thesailingproject.com",
    siteName: "The Sailing Project",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PlausibleProvider />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
