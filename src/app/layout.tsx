import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-site-v2-dusky.vercel.app"),

  title: {
    default: "Nazneen Rizvi | Front-End Developer",
    template: "%s | Nazneen Rizvi",
  },
  

  description:
    "Front-End Developer specializing in Next.js, React, TypeScript and Tailwind CSS. Explore my portfolio, projects and contact me for freelance or full-time opportunities.",

  keywords: [
    "Nazneen Rizvi",
    "Frontend Developer",
    "Front-End Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "JavaScript",
    "Portfolio",
    "Web Developer",
  ],

  authors: [{ name: "Nazneen Rizvi" }],

  creator: "Nazneen Rizvi",

  openGraph: {
    title: "Nazneen Rizvi | Front-End Developer",
    description:
      "Explore my portfolio, projects and skills built with Next.js, React and TypeScript.",
    url: "https://portfolio-site-v2-dusky.vercel.app",
    siteName: "Nazneen Rizvi Portfolio",
    locale: "en_US",
    type: "website",
    images: [
  {
    url: "/og-image.png",
    width: 1200,
    height: 630,
    alt: "Nazneen Rizvi Portfolio",
  },
],
  },

  twitter: {
    card: "summary_large_image",
    title: "Nazneen Rizvi | Front-End Developer",
    description:
      "Portfolio built using Next.js, React, TypeScript and Tailwind CSS.",
  },

  robots: {
    index: true,
    follow: true,
  },

  verification: {
    google: "G-YOUR_SEARCH_CONSOLE_ID", // Change this to your Google Search Console verification code
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Analytics Tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_ANALYTICS_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YOUR_ANALYTICS_ID');
          `}
        </Script>
        {children}
       
      </body>
    </html>
  );
}
