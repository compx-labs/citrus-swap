import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Citrus Swap',
  description: 'The micro ORA DEX!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="geist-sans geist-mono antialiased">{children}</body>
    </html>
  )
}
