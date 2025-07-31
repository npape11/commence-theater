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
  icons: {
    icon: [
      {
        url: "/commence-icon.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/commence-icon.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/commence-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: "Commence Theater - The Future of Theater Management",
    description:
      "Join forward-thinking theater owners and managers who are revolutionizing their operations with the first CRM built specifically for the performing arts industry.",
    type: "website",
    siteName: "Commence Theater",
    images: [
      {
        url: "/commence-icon.png",
        width: 1200,
        height: 630,
        alt: "Commence Theater - The Future of Theater Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Commence Theater - The Future of Theater Management",
    description:
      "Join forward-thinking theater owners and managers who are revolutionizing their operations with the first CRM built specifically for the performing arts industry.",
    images: ["/commence-icon.png"],
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
