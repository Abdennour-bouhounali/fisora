import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer';

const MainLayout = ({ children, title = 'FISORA' }) => {
  return (
    <>
      <Head title={title} />
      <CartDrawer />
      <div className="min-h-screen flex flex-col overflow-clip">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
