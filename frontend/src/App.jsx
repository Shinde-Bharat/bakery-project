import React from 'react';
// import { ArrowRight } from 'lucide-react';

import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import ProductDetails from './pages/user/ProductDetails/ProductDetails';
import Layout from './pages/user/Layout';
import ExplorePage from './pages/user/ExplorePage/ExplorePage';
import CartPage from './pages/user/CartPage/CartPage';
import CheckoutPage from './pages/user/CheckoutPage/CheckoutPage';
import OrderConfirmedPage from './pages/user/CheckoutPage/OrderConfirmedPage';
import TrackOrderPage from './pages/user/CheckoutPage/TrackOrderPage';
import FavoritesPage from './pages/user/FavoritesPage/FavoritesPage';
import UserProfilePage from './pages/user/MyAccount/UserProfile';
import AdminLayout from './pages/admin/AdminLayout';
import AdminOverview from './pages/admin/AdminOverview/AdminOverview';
import OrderMgt from './pages/admin/OrdersMgt/OrdersMgt';
import ProductMgt from './pages/admin/ProductMgt/ProductMgt';
import DiscountCouponsMgt from './pages/admin/DiscountCouponsMgt/DiscountCouponsMgt';
import MessageReviewsMgt from './pages/admin/MessageReviewsMgt/MessageReviewsMgt';
import UserMgt from './pages/admin/UserMgt/UserMgt';
import DeliveryLayout from './pages/delivery/DeliveryLayout';
import DeliveryDashboard from './pages/delivery/DeliveryDashboard/DeliveryDashboard';
import DeliveryProfile from './pages/delivery/DeliveryProfile/DeliveryProfile';
import MyOrders from './pages/delivery/MyOrders/MyOrders';
import PrivacyPolicy from './pages/user/privacy_policy/PrivacyPolicy';
import Login from './pages/user/LoginRegister/Login';
import AdminLogin from './pages/admin/AdminLogin/AdminLogin';
import DeliveryLogin from './pages/delivery/DeliveryLogin/DeliveryLogin';
import LandingPage from './pages/user/Landing/LandingPage';
import NotFound from './pages/common/NotFound';
import ContactPage from './pages/user/Landing/ContactPage';
import PaymentStatus from './pages/user/CheckoutPage/PaymentStatus';

// color-amber

const App = () => {


  return (

    <div className="font-Manrope">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/confirmedOrdered/:orderId" element={<OrderConfirmedPage />} />
            <Route path="/track" element={<TrackOrderPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/payment-status" element={<PaymentStatus />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/privacy_policy" element={<PrivacyPolicy />} />


          <Route path="/admin" element={<AdminLayout />}>
            <Route path="/admin" element={<AdminOverview />} />
            <Route path="/admin/products" element={<ProductMgt />} />
            <Route path="/admin/orders" element={<OrderMgt />} />
            <Route path="/admin/users" element={<UserMgt />} />
            <Route path="/admin/discounts" element={<DiscountCouponsMgt />} />
            <Route path="/admin/messages" element={<MessageReviewsMgt />} />
          </Route>
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/delivery" element={<DeliveryLayout />}>
            <Route path="/delivery" element={<DeliveryDashboard />} />
            <Route path="/delivery/orders" element={<MyOrders />} />
            <Route path="/delivery/profile" element={<DeliveryProfile />} />
          </Route>
          <Route path="/delivery/login" element={<DeliveryLogin />} />


          <Route path="*" element={<NotFound />} />


        </Routes>
      </Router>
    </div>
  )


};

export default App;