import './globals.css'
import { Gothic_A1, Poppins } from 'next/font/google'

import { Metadata } from 'next'
import { NextAuthProvider } from '@/providers/auth'
import { ButtonStateProvider } from '@/components/ButtonState'
import Footer from '@/components/Footer'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] })

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
          <ButtonStateProvider>
            {children}
            {/* <Footer /> */}
          </ButtonStateProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
