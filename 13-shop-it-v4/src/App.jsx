
import { useState, useReducer } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import CartTable from './components/CartTable';
import CartContext from './contexts/CartContext';

import cartreducer from './reducers/cart';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom'

// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";

import Home from './components/Home';
import NotFound from './components/NotFound';



function App() {

  console.log("App Rendered");
  const [cart, dispatch] = useReducer(cartreducer, []);

  return (
    <div className="container">
      <CartContext.Provider value={{ cart, dispatch }}>
        <BrowserRouter>
          <Navbar title="Shop IT" />
          <hr />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/cart" element={<CartTable />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartContext.Provider>
    </div>
  );
}

export default App;