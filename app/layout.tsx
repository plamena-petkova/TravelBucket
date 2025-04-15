import React from 'react';
import './globals.css'


export const metadata = {
  title: 'TravelBucket',
  description: 'Your next adventure starts here!',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
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
