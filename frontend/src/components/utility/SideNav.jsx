import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import React from 'react'
import { NavLink } from 'react-router-dom'

function SideNav({ navItems }) {
    return (
        <aside className="w-fit bg-white shadow-md">
            <div className="p-4">
                <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
            </div>
            <nav className="mt-6 px-4">
                {navItems.map(({ path, label, icon: Icon, exact }) => (
                    <NavLink to={path} key={path} end={exact} className="w-full">
                        {({ isActive }) => (
                            <div
                                className={`w-full justify-start mt-2  flex items-center py-2 px-2 text-nowrap hover:shadow-none rounded-lg font-medium ${isActive ? "bg-bprimary text-white shadow-lg shadow-bsecondary/30 hover:bg-bprimary hover:text-white hover:shadow-lg hover:shadow-bsecondary/30" : "hover:text-bprimary hover:bg-bternary "}`}
                            >
                                <Icon className="mr-2 h-5 w-5" />
                                <p className='text-sm'>{label}</p>
                            </div>
                        )}
                    </NavLink>
                ))}
            </nav>
        </aside>
    )
}

export default SideNav