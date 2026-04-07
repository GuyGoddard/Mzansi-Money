import type { Metadata } from 'next'
import { Poppins, DM_Sans } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Mzansi Money Guide — Free Financial Help for South Africans',
    template: '%s | Mzansi Money Guide',
  },
  description:
    'Free, simple financial guidance for South Africans. Step-by-step help with SASSA grants, SARS tax, business registration (CIPC), UIF, VAT, and budgeting. No jargon.',
  keywords: [
    'SASSA grant application',
    'how to register a business in South Africa',
    'SARS tax calculator South Africa',
    'UIF claim South Africa',
    'CIPC business registration',
    'VAT registration South Africa',
    'income tax calculator South Africa',
    'how to claim SASSA SRD grant',
    'South Africa financial advice',
    'small business South Africa',
  ],
  authors: [{ name: 'Mzansi Money Guide' }],
  creator: 'Mzansi Money Guide',
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: 'https://mzansi-money.com',
    siteName: 'Mzansi Money',
    title: 'Mzansi Money Guide — Free Financial Help for South Africans',
    description:
      'Step-by-step help with SASSA, tax, business registration, UIF, and budgeting. Free, simple, no jargon.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mzansi Money Guide',
    description: 'Free financial guidance for South Africans.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" className={`${poppins.variable} ${dmSans.variable}`}>
      <body className="font-body bg-sand-50 text-sand-900 antialiased">
        {children}
      </body>
    </html>
  )
}
