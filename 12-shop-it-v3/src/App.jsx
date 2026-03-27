
import { useState, useReducer } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import CartTable from './components/CartTable';
import CartContext from './contexts/CartContext';

import cartreducer from './reducers/cart';

function App() {

  console.log("App Rendered");
  const [cart, dispatch] = useReducer(cartreducer, []);
  const [iscartOpen, setIsCartOpen] = useState(false);

  const handleToggleCart = () => {
    setIsCartOpen(!iscartOpen);
  }



  return (
    <div className="container">
      <CartContext.Provider value={{ cart, dispatch }}>
        <Navbar title="Shop IT" />
        <hr />
        <button onClick={handleToggleCart} className="btn btn-secondary">Toggle Cart</button>
        <hr />
        {iscartOpen && (
          <CartTable />
        )}
        {!iscartOpen && (
          <ProductList />
        )}
      </CartContext.Provider>
    </div>
  );
}

export default App;