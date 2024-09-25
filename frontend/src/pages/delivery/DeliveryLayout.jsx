import { DeliveryNav } from "@/components/utility/DeliveryNav";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const DeliveryLayout = () => {
    const navigate = useNavigate()
    const [isDelivery, setIsDelivery] = useState()
    useEffect(() => {
        const delivery = localStorage.getItem('user');
        setIsDelivery(delivery)
        if (!delivery) {
            navigate('/delivery/login');
        }
    }, [navigate]);
    return (
        <>{isDelivery &&
            <div className="min-h-screen bg-gray-100 font-Montserrat">
                {/* This will render the child routes dynamically */}
                <DeliveryNav />
                <Outlet />
            </div>
        }
        </>

    );
};

export default DeliveryLayout;