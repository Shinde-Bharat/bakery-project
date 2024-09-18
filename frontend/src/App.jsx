import React from 'react';
// import { ArrowRight } from 'lucide-react';

import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import LadingPage from './pages/Landing/LadingPage';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Layout from './pages/Layout';
import ExplorePage from './pages/ExplorePage/ExplorePage';
import CartPage from './pages/CartPage/CartPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import OrderConfirmedPage from './pages/CheckoutPage/OrderConfirmedPage';
import TrackOrderPage from './pages/CheckoutPage/TrackOrderPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import UserProfilePage from './pages/MyAccount/UserProfile';

// color-amber

const App = () => {


  return (

    <div className="font-Manrope">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<LadingPage />} />
            <Route path="/product" element={<ProductDetails />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/cart/:cartId" element={<CartPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/confirmedOrdered" element={<OrderConfirmedPage />} />
            <Route path="/track" element={<TrackOrderPage />} />
          </Route>

        </Routes>
      </Router>
    </div>
  )


};

export default App;