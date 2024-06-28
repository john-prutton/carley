import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"

import PlausibleProvider from "next-plausible"

import "./globals.css"

const geistSans = localFont({
  src: "../../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans"
})
const geistMono = localFont({
  src: "../../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono"
})

export const viewport: Viewport = {
  maximumScale: 1
}

export const metadata: Metadata = {
  title: {
    default: "Carley | AI Nutritionist",
    template: "%s | Carley"
  },
  description:
    "A AI nutritionist that helps you easily track your meals by analyzing pictures, and records nutritional information like calories and macros.",
  keywords: [
    "ai",
    "nutrition",
    "health",
    "food",
    "calories",
    "macros",
    "diet",
    "tracker"
  ],
  authors: [
    {
      name: "John Prutton",
      url: "https://github.com/john-prutton"
    }
  ],
  creator: "John Prutton",

  metadataBase: new URL(process.env.BASE_URL!)
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <PlausibleProvider
          domain={new URL(process.env.BASE_URL!).hostname}
          customDomain={process.env.PLAUSIBLE_CUSTOM_DOMAIN}
          selfHosted
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  )
}
