import type React from "react"
import type { Metadata } from "next"
import { Roboto_Mono } from 'next/font/google'
import "./globals.css"

const robotoMono = Roboto_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "LMS Automation Dashboard - Moodle + Zoom Integration",
  description: "Educational platform automation system with Moodle 4.5 and Zoom API integration",
    generator: 'v0.app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={robotoMono.className}>
      <body>{children}</body>
    </html>
  )
}
