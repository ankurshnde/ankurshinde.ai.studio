import type { Metadata } from "next"
import { ROUTES, SITE } from "@/lib/site"

const page = ROUTES.find((r) => r.path === "/publications")!

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/publications" },
  openGraph: {
    title: `${page.title} | Ankur Shinde`,
    description: page.description,
    url: `${SITE.url}/publications`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${page.title} | Ankur Shinde`,
    description: page.description,
  },
}

export default function PublicationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
