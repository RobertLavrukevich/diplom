import { Outlet, useLocation } from 'react-router-dom';
import Header from '../OtherComponents/Header';
import Footer from '../OtherComponents/Footer';

export default function MainLayout() {
    const location = useLocation();
    
    const category = location.pathname.includes('/music') ? 'music' : 
                    location.pathname.includes('/cinema') ? 'cinema' : null;
    return (
        <>
            <Header category={category}/>
            <main className="main-content">
                <Outlet /> 
            </main>
            <Footer />
        </>
    );
}