import '../css/app.css';
import './i18n/config';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

import { CartProvider } from './context/CartContext';

import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/admin/AdminLayout';

const defaultLayout = page => <MainLayout>{page}</MainLayout>;
const adminLayout = page => <AdminLayout>{page}</AdminLayout>;

createInertiaApp({
    title: (title) => `${title} - FISORA`,
    resolve: async (name) => {
        const page = await resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        );
        if (!name.startsWith('Admin/')) {
            page.default.layout = defaultLayout;
        } else if (name !== 'Admin/Login') {
            page.default.layout = adminLayout;
        }
        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <CartProvider>
                <App {...props} />
            </CartProvider>
        );
    },
    progress: {
        color: '#00934A',
    },
});
