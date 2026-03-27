
import { useMemo, useReducer, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import CartContext from './contexts/CartContext';
import AuthContext from './contexts/AuthContext';

import cartreducer from './reducers/cart';



function App() {

  console.log("App Rendered");
  const [cart, dispatch] = useReducer(cartreducer, []);
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('isAuth') === 'true');

  const login = (username, password) => {
    if (username === 'admin' && password === '1234') {
      setIsAuthenticated(true);
      localStorage.setItem('isAuth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuth');
  };

  const authValue = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
    }),
    [isAuthenticated],
  );

  return (
    <div className="container">
      <AuthContext.Provider value={authValue}>
        <CartContext.Provider value={{ cart, dispatch }}>
          <Navbar title="Shop IT" />
          <hr />
          <Outlet />
        </CartContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;