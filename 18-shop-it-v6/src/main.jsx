import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import store from './store/index.js'

const loadRoute = (loader) => async () => {
  const module = await loader()
  return { Component: module.default }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        lazy: loadRoute(() => import('./components/Home.jsx')),
      },
      {
        path: 'products',
        lazy: loadRoute(() => import('./components/ProductList.jsx')),
      },
      {
        path: 'cart',
        lazy: loadRoute(() => import('./components/CartTable.jsx')),
      },
      {
        path: 'login',
        lazy: loadRoute(() => import('./components/Login.jsx')),
      },
      {
        path: 'routing-demo',
        lazy: loadRoute(() => import('./components/RoutingDemo.jsx')),
        children: [
          {
            index: true,
            lazy: loadRoute(() => import('./components/RoutingDemoIndex.jsx')),
          },
          {
            path: ':categoryId',
            lazy: loadRoute(() => import('./components/RoutingDemoCategory.jsx')),
            children: [
              {
                path: 'item/:itemId',
                lazy: loadRoute(() => import('./components/RoutingDemoItem.jsx')),
              },
            ],
          },
        ],
      },
      {
        lazy: loadRoute(() => import('./components/RequireAuth.jsx')),
        children: [
          {
            path: 'orders',
            lazy: loadRoute(() => import('./components/Orders.jsx')),
          },
        ],
      },
      {
        path: '*',
        lazy: loadRoute(() => import('./components/NotFound.jsx')),
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider
      router={router}
      fallbackElement={<div className="alert alert-secondary mt-3">Loading page...</div>}
    />
  </Provider>
)
