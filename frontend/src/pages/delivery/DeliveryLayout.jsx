import { DeliveryNav } from "@/components/utility/DeliveryNav";
import { Outlet } from "react-router-dom";

const DeliveryLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100 font-Montserrat">
            {/* This will render the child routes dynamically */}
            <DeliveryNav />
            <Outlet />
        </div>
    );
};

export default DeliveryLayout;