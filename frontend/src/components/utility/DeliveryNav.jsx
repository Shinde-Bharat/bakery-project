import { Home, Clipboard, FileText, Truck, User, Package } from 'lucide-react'
import { NavLink } from 'react-router-dom'

function NavItem({ to, icon, text }) {
    return (
        <li>
            <NavLink to={to} className="flex flex-col md:flex-row items-center text-gray-600 hover:text-blue-500">
                {icon}
                <span className="text-xs md:text-sm md:ml-2">{text}</span>
            </NavLink>
        </li>
    )
}

export function DeliveryNav() {
    return (
        <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-10">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <NavLink to="/dashboard" className="flex items-center text-xl font-bold text-gray-800">
                        DeliveryApp
                    </NavLink>
                    <ul className="hidden md:flex space-x-4">
                        <NavItem to="/delivery" icon={<Home className="h-5 w-5" />} text="Dashboard" />
                        <NavItem to="/delivery/orders" icon={<Package className="h-5 w-5" />} text="My Orders" />
                        <NavItem to="/delivery/profile" icon={<User className="h-5 w-5" />} text="Profile" />
                    </ul>
                </div>
            </div>
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2">
                <ul className="flex justify-around items-center">
                    <NavItem to="/delivery" icon={<Home className="h-6 w-6" />} text="Dashboard" />
                    <NavItem to="/delivery/orders" icon={<Package className="h-6 w-6" />} text="My Orders" />
                    <NavItem to="/delivery/profile" icon={<User className="h-6 w-6" />} text="Profile" />
                </ul>
            </div>
        </nav>
    )
}

