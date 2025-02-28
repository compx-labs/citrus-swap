import '../styles/globals.css'

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
