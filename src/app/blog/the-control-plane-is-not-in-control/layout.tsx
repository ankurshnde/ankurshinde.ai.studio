import type { Metadata } from "next"
import { ARTICLES, SITE } from "@/lib/site"

const article = ARTICLES.find(
  (a) => a.path === "/blog/the-control-plane-is-not-in-control"
)!

export const metadata: Metadata = {
  title: article.title,
  description: article.description,
  keywords: [...article.tags],
  authors: [{ name: SITE.author, url: SITE.url }],
  alternates: { canonical: article.path },
  openGraph: {
    type: "article",
    title: article.title,
    description: article.description,
    url: `${SITE.url}${article.path}`,
    siteName: SITE.name,
    publishedTime: article.datePublished,
    authors: [SITE.author],
    tags: [...article.tags],
    images: [
      {
        url: article.image,
        alt: article.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: article.title,
    description: article.description,
    images: [article.image],
    creator: SITE.twitterHandle,
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: article.description,
  image: article.image,
  datePublished: article.datePublished,
  dateModified: article.datePublished,
  author: {
    "@type": "Person",
    name: SITE.author,
    url: SITE.url,
  },
  publisher: {
    "@type": "Person",
    name: SITE.author,
    url: SITE.url,
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE.url}${article.path}`,
  },
  keywords: article.tags.join(", "),
  inLanguage: "en-US",
  isAccessibleForFree: true,
}

export default function ControlPlaneLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
