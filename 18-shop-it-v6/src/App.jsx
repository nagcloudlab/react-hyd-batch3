
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  console.log("App Rendered");

  return (
    <div className="container">
      <Navbar title="Shop IT" />
      <hr />
      <Outlet />
    </div>
  );
}

export default App;