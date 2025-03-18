import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { BookMange } from './pages/BookManage';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import './index.css';

const routes = [
  {
    path: '/',
    element: <BookMange />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
];

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}>
    <StrictMode></StrictMode>,
  </RouterProvider>,
);
