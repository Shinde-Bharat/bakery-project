import SideNav from '@/components/utility/SideNav';
import { Outlet, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Tag,
    MessageSquare,

} from "lucide-react"
import { useEffect, useState } from 'react';
const navItems = [
    { path: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true }, // exact match for /admin
    { path: '/admin/products', label: 'Product Management', icon: Package },
    { path: '/admin/orders', label: 'Order Management', icon: ShoppingCart },
    { path: '/admin/users', label: 'User Management', icon: Users },
    { path: '/admin/discounts', label: 'Coupons and Offers', icon: Tag },
    { path: '/admin/messages', label: 'Messages', icon: MessageSquare },
];


const AdminLayout = () => {
    // Check if admin is already logged in
    const navigate = useNavigate()
    const [isAdmin, setIsAdmin] = useState()
    useEffect(() => {
        const admin = localStorage.getItem('user');
        setIsAdmin(admin)
        if (!admin) {
            navigate('/admin/login');
        }
    }, [navigate]);
    return (
        <> {

            isAdmin &&
            <div className="flex h-screen  font-Montserrat">
                {/* This will render the child routes dynamically */}
                <SideNav navItems={navItems} />
                <Outlet />
            </div>
        }

        </>

    );
};

export default AdminLayout;