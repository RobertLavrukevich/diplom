import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

export default function MainLayout() {
    const location = useLocation();
    const savedCategory = localStorage.getItem('selectedCategory') || 'music';
    const currentCategory = location.pathname.includes('/music') ? 'music' : 
                    location.pathname.includes('/cinema') ? 'cinema' : savedCategory;
    
    useEffect(() => {
        if (location.pathname.includes('/music')) {
            localStorage.setItem('selectedCategory', 'music');
        } else if (location.pathname.includes('/cinema')) {
            localStorage.setItem('selectedCategory', 'cinema');
        }
    }, [location.pathname]);

    return (
        <>
            <Header category={currentCategory}/>
            <main className="main-content">
                <Outlet /> 
            </main>
            <Footer />
        </>
    );
}