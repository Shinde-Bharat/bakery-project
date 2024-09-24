import React from 'react';
// import { ArrowRight } from 'lucide-react';

import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import LadingPage from './pages/user/Landing/LadingPage';
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

// color-amber

const App = () => {


  return (

    <div className="font-Manrope">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<LadingPage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/confirmedOrdered/:id" element={<OrderConfirmedPage />} />
            <Route path="/track" element={<TrackOrderPage />} />

          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/privacy_policy" element={<PrivacyPolicy />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="/admin" element={<AdminOverview />} />
            <Route path="/admin/products" element={<ProductMgt />} />
            <Route path="/admin/orders" element={<OrderMgt />} />
            <Route path="/admin/users" element={<UserMgt />} />
            <Route path="/admin/discounts" element={<DiscountCouponsMgt />} />
            <Route path="/admin/reviews_messages" element={<MessageReviewsMgt />} />
          </Route>
          <Route path="/delivery" element={<DeliveryLayout />}>
            <Route path="/delivery" element={<DeliveryDashboard />} />
            <Route path="/delivery/orders" element={<MyOrders />} />
            <Route path="/delivery/profile" element={<DeliveryProfile />} />

          </Route>


        </Routes>
      </Router>
    </div>
  )


};

export default App;