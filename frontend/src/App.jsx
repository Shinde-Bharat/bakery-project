import React from 'react';
// import { ArrowRight } from 'lucide-react';

import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import LadingPage from './pages/Landing/LadingPage';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Layout from './pages/Layout';

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
            </Route>

          </Routes>
        </Router>
      </div>
    </>
  )


};

export default App;