
import type React from "react"
import type { Metadata } from "next"
import { Geist_Mono as GeistMono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const geistMono = GeistMono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "UAL Automate",
  description: "Educational platform automation system with Moodle 4.5 and Zoom API integration",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${geistMono.className} bg-black text-white antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
