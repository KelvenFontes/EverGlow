import './globals.css'
import { Gothic_A1, Poppins } from 'next/font/google'

import { Metadata } from 'next'
import { NextAuthProvider } from '@/providers/auth'

const poppins = Gothic_A1({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] })

export const metadata: Metadata = {
  title: 'EverGlow - Descubra, Brilhe, Vibre com EverGlow!',
  description: 'Descubra, Brilhe, Vibre com EverGlow!',
  icons: '/favicon.ico'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
