import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "../lib/env" // Validate environment variables on app startup

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Commence Theater - The Future of Theater Management",
  description:
    "Join forward-thinking theater owners and managers who are revolutionizing their operations with the first CRM built specifically for the performing arts industry.",
  keywords: "theater management, CRM, performing arts, box office, patron management, theater software",
  authors: [{ name: "Commence Corporation" }],
  openGraph: {
    title: "Commence Theater - The Future of Theater Management",
    description:
      "Join forward-thinking theater owners and managers who are revolutionizing their operations with the first CRM built specifically for the performing arts industry.",
    type: "website",
    siteName: "Commence Theater",
  },
  twitter: {
    card: "summary_large_image",
    title: "Commence Theater - The Future of Theater Management",
    description:
      "Join forward-thinking theater owners and managers who are revolutionizing their operations with the first CRM built specifically for the performing arts industry.",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}
