import React from 'react';
// import { ArrowRight } from 'lucide-react';

import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import LadingPage from './pages/Landing/LadingPage';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Layout from './pages/Layout';
import ExplorePage from './pages/ExplorePage/ExplorePage';
import CartPage from './pages/CartPage/CartPage';

// color-amber

const App = () => {


  return (
    <>

      <div className="font-Manrope">
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<LadingPage />} />
              <Route path="/details" element={<ProductDetails />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/cart" element={<CartPage />} />
            </Route>

          </Routes>
        </Router>
      </div>
    </>
  )


};

export default App;