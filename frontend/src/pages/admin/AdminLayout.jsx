import SideNav from '@/components/utility/SideNav';
import { Outlet } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Tag,
    MessageSquare,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    IndianRupee
} from "lucide-react"
const navItems = [
    { path: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true }, // exact match for /admin
    { path: '/admin/products', label: 'Product Management', icon: Package },
    { path: '/admin/orders', label: 'Order Management', icon: ShoppingCart },
    { path: '/admin/users', label: 'User Management', icon: Users },
    { path: '/admin/discounts', label: 'Discounts and Coupons', icon: Tag },
    { path: '/admin/feedback', label: 'Feedback and Reviews', icon: MessageSquare },
];


const AdminLayout = () => {
    return (
        <div className="flex h-screen bg-gray-100 font-Montserrat">
            {/* This will render the child routes dynamically */}
            <SideNav navItems={navItems} />
            <Outlet />
        </div>
    );
};

export default AdminLayout;