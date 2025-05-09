
import React, { useState } from 'react';
import './globals.css'
import connectDB from '@/config/database';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Providers from './providers';


export const metadata = {
  title: 'TravelBucket',
  description: 'Your next adventure starts here!',
};

const Layout = async ({ children }: { children: React.ReactNode }) => {



  return (

    <html lang="en">
      <body>
        <Providers>
          <main className="min-h-screen bg-white text-gray-900">{children}
          </main>
        </Providers>


      </body>
    </html>

  );
};

export default Layout;
