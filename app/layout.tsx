// import './globals.css'
// import { ReactNode } from 'react'

// export const metadata = {
//   title: 'Travel Bucket',
//   description: 'Your personal travel diary, anywhere you go.',
// }

// export default function RootLayout({ children }: { children: ReactNode }) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   )
// }


import React, { Suspense } from 'react';
import './globals.css'
import Loading from '@/components/Loading';


export const metadata = {
  title: 'TravelBucket',
  description: 'Your next adventure starts here!',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<Loading />}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </Suspense>
  );
};

export default Layout;
