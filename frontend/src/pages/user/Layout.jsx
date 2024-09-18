import NavBar from '@/components/utility/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from './Landing/Footer';


const Layout = () => {
    return (
        <>
            <NavBar />
            <main className="min-h-screen">
                {/* This will render the child routes dynamically */}
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;
