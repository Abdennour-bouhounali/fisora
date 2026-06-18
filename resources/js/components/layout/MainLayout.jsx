import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import WaitlistModal from '../common/WaitlistModal';

const MainLayout = ({ children, title = 'FISORA' }) => {
  const { props } = usePage();
  const coming_soon_mode = !!props.coming_soon_mode;

  return (
    <>
      <Head title={title} />
      {!coming_soon_mode && <CartDrawer />}
      {coming_soon_mode && <WaitlistModal />}
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
