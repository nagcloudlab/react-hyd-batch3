import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import App from './App.jsx'
import Home from './components/Home.jsx'
import ProductList from './components/ProductList.jsx'
import CartTable from './components/CartTable.jsx'
import NotFound from './components/NotFound.jsx'
import Login from './components/Login.jsx'
import Orders from './components/Orders.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import RoutingDemo from './components/RoutingDemo.jsx'
import RoutingDemoIndex from './components/RoutingDemoIndex.jsx'
import RoutingDemoCategory from './components/RoutingDemoCategory.jsx'
import RoutingDemoItem from './components/RoutingDemoItem.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'products',
        element: <ProductList />,
      },
      {
        path: 'cart',
        element: <CartTable />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'routing-demo',
        element: <RoutingDemo />,
        children: [
          {
            index: true,
            element: <RoutingDemoIndex />,
          },
          {
            path: ':categoryId',
            element: <RoutingDemoCategory />,
            children: [
              {
                path: 'item/:itemId',
                element: <RoutingDemoItem />,
              },
            ],
          },
        ],
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: 'orders',
            element: <Orders />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
