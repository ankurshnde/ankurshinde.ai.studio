import type { Metadata } from "next";
import { Imbue, Manrope, Geist, Instrument_Serif } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { BodyClassManager } from "@/components/body-class-manager";
import "./globals.css";

const imbue = Imbue({
  variable: "--font-imbue",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Ankur Shinde | Research, Strategy & Decentralized AI Agent Ecosystems",
  description: "Official publications, research preprints, and systems thoughts on decentralized AI agents and digital public infrastructure by Ankur Shinde.",
  keywords: [
    "Ankur Shinde",
    "AI Agents",
    "Decentralized AI",
    "Digital Public Infrastructure",
    "Beijing AI Frontier",
    "NANDA Protocol",
    "Agentic Ecosystems"
  ],
  authors: [{ name: "Ankur Shinde" }],
  creator: "Ankur Shinde",
  publisher: "Ankur Shinde",
  metadataBase: new URL("https://ankurshinde.vercel.app"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ankurshinde.vercel.app",
    title: "Ankur Shinde | Research, Strategy & Decentralized AI Agent Ecosystems",
    description: "Official publications, research preprints, and systems thoughts on decentralized AI agents and digital public infrastructure by Ankur Shinde.",
    siteName: "Ankur Shinde Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ankur Shinde | Research, Strategy & Decentralized AI Agent Ecosystems",
    description: "Official publications, research preprints, and systems thoughts on decentralized AI agents and digital public infrastructure by Ankur Shinde.",
  },
};

// Rich JSON-LD Structured Data Schema for Person representation (highly crawled and preferred by both Google and AI engines)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Ankur Shinde",
  "url": "https://ankurshinde.vercel.app",
  "sameAs": [
    "https://ankurshinde.medium.com",
    "https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm?per_id=6622601",
    "https://www.media.mit.edu/publications/ai-agents-for-kumbh-mela/"
  ],
  "jobTitle": "Decentralized AI Researcher",
  "knowsAbout": [
    "AI Agents",
    "Decentralized AI",
    "Agentic Ecosystems",
    "Digital Public Infrastructure",
    "Beijing AI Frontier",
    "NANDA Protocol",
    "Complex Systems Architecture"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${imbue.variable} ${manrope.variable} ${geist.variable} ${instrumentSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <BodyClassManager />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
