import type { Metadata } from "next"
import { ROUTES, SITE } from "@/lib/site"

const page = ROUTES.find((r) => r.path === "/connect")!

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/connect" },
  openGraph: {
    title: `${page.title} | Ankur Shinde`,
    description: page.description,
    url: `${SITE.url}/connect`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${page.title} | Ankur Shinde`,
    description: page.description,
  },
}

export default function ConnectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
