import React from 'react';
import './globals.css'
import Providers from './providers';
import NavBar from '@/components/NavBar';


export const metadata = {
  title: 'TravelBucket',
  description: 'Your next adventure starts here!',
};

const Layout = async ({ children }: { children: React.ReactNode }) => {



  return (

    <html lang="en">
      <body>
        <Providers>
          <main className="min-h-screen bg-white text-gray-900">
            <NavBar />
            {children}
          </main>
        </Providers>


      </body>
    </html>

  );
};

export default Layout;
