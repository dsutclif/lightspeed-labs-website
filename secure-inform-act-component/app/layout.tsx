import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SecureInformAct Component',
  description: 'Interactive layered graphics component for Secure, Inform, Act',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}