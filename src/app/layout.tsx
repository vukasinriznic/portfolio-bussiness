import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { NameWidthSync } from "@/components/NameWidthSync";
import { SITE_URL } from "@/lib/site";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const title = "Vukašin Riznić | Web Developer";
const description =
  "Web developer koji dizajnira i razvija brze, pristupačne sajtove i web aplikacije, izrađene da traju.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: "Vukašin Riznić",
    images: [{ url: "/images/vukasin_hero.png", width: 1254, height: 1254 }],
    locale: "sr_RS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/vukasin_hero.png"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Vukašin Riznić",
  jobTitle: "Web Developer",
  url: SITE_URL,
  image: `${SITE_URL}/images/vukasin_hero.png`,
  sameAs: [
    "https://www.instagram.com/afera.digital/",
    "https://www.instagram.com/vukasinrizniic/",
    "https://www.linkedin.com/in/vukasinriznic/",
    "https://github.com/vukasinriznic",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Afera Digital",
    sameAs: "https://www.instagram.com/afera.digital/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="sr"
      className={`${syne.variable} ${inter.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col cursor-none bg-background text-foreground"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SmoothScroll />
        <Cursor />
        <NameWidthSync />
        {children}
      </body>
    </html>
  );
}
