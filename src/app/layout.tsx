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
  title: "Ankur",
  description: "Official blog and publications of Ankur Shinde.",
  icons: {
    icon: "/favicon.png",
  },
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
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light">
          <BodyClassManager />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
