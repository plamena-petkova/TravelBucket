import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Travel Bucket',
  description: 'Your personal travel diary, anywhere you go.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}