import React from 'react';
import './globals.css'
import connectDB from '@/config/database';


export const metadata = {
  title: 'TravelBucket',
  description: 'Your next adventure starts here!',
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
  
  await connectDB();

  return (

    <html lang="en">
      <body>
        <main className="min-h-screen bg-white text-gray-900">{children}
        </main>
      </body>
    </html>

  );
};

export default Layout;
