import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import AdminSidebar from './AdminSidebar';
import { Menu, Bell, Search, LogOut } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { props } = usePage();
  const userInfo = props.auth?.user || { name: 'Admin FISORA' };

  const handleLogout = () => {
    router.post('/admin/logout');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      <Toaster position="top-right" />
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-grow lg:ml-72 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="h-24 bg-nature-white border-b border-nature-beige px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-6 flex-grow max-w-xl">
            <button 
              className="lg:hidden p-2 text-nature-green"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative flex-grow hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-nature-green/30" />
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="w-full bg-nature-beige/20 border-none rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-nature-green transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-3 bg-nature-beige/30 rounded-xl text-nature-green hover:bg-nature-green hover:text-nature-white transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-nature-orange rounded-full" />
            </button>
            <div className="h-10 w-[1px] bg-nature-beige mx-2 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-nature-green">{userInfo?.name || 'Admin FISORA'}</p>
                <p className="text-[10px] uppercase font-black text-nature-green/40">
                  Gérant
                </p>
              </div>
              <div className="w-10 h-10 bg-nature-beige rounded-xl flex items-center justify-center text-nature-green font-bold">
                {userInfo?.name?.charAt(0) || 'A'}
              </div>
            </div>
            <div className="h-10 w-[1px] bg-nature-beige mx-2" />
            <button 
              onClick={handleLogout}
              className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all group"
              title="Déconnexion"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 md:p-12">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
