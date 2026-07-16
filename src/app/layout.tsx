import type { Metadata } from "next";
import { Imbue, Manrope, Geist, Instrument_Serif } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { BodyClassManager } from "@/components/body-class-manager";
import { SITE } from "@/lib/site";
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
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: "%s | Ankur Shinde",
  },
  description: SITE.description,
  keywords: [
    "Ankur Shinde",
    "AI Agents",
    "Decentralized AI",
    "Digital Public Infrastructure",
    "NANDA Protocol",
    "Agentic Ecosystems",
    "Project NANDA",
    "Agentic trust infrastructure",
    "Cross-border agent transactions",
  ],
  authors: [{ name: SITE.author, url: SITE.url }],
  creator: SITE.author,
  publisher: SITE.author,
  category: "Technology",
  alternates: {
    canonical: "/",
    types: {
      "application/json": `${SITE.url}/profile.json`,
      "text/plain": `${SITE.url}/about.txt`,
    },
  },
  icons: {
    icon: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    title: SITE.title,
    description: SITE.description,
    siteName: SITE.name,
    images: [
      {
        url: SITE.defaultOgImage,
        width: 1200,
        height: 630,
        alt: "Ankur Shinde — Research on decentralized AI agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    creator: SITE.twitterHandle,
    images: [SITE.defaultOgImage],
  },
  other: {
    "ai-content": "This site publishes original research and essays on AI agents and infrastructure. Machine-readable summaries: /llms.txt, /llms-full.txt, /profile.json, /about.txt",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE.url}/#person`,
      name: SITE.author,
      url: SITE.url,
      email: SITE.email,
      sameAs: SITE.sameAs,
      jobTitle: SITE.jobTitle,
      description: SITE.description,
      image: SITE.defaultOgImage,
      knowsAbout: SITE.knowsAbout,
      worksFor: {
        "@type": "Organization",
        name: "Project NANDA",
        url: "https://projectnanda.org/",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      name: SITE.name,
      url: SITE.url,
      description: SITE.description,
      inLanguage: "en-US",
      publisher: { "@id": `${SITE.url}/#person` },
      author: { "@id": `${SITE.url}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE.url}/#profilepage`,
      url: SITE.url,
      name: SITE.title,
      isPartOf: { "@id": `${SITE.url}/#website` },
      about: { "@id": `${SITE.url}/#person` },
      mainEntity: { "@id": `${SITE.url}/#person` },
    },
  ],
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
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM summary" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="LLM full summary" />
        <link rel="alternate" type="application/json" href="/profile.json" title="JSON profile" />
        <link rel="alternate" type="text/plain" href="/about.txt" title="Plain text about" />
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
