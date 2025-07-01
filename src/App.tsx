import React from 'react';
import './App.scss';
import Layout from './pages/Layout';
import HomeRouter from './routes/HomeRouter';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserDetailsRoute from './routes/UserDetailsRoute';

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: `/`,
          element: <HomeRouter />
        },
          {
      path: '/users',
      element: <UserDetailsRoute />
    },
      {
      path: '/users/:id',
      element: <UserDetailsRoute />
    },
      ]
    }
  ]);
  export default function App() {
  
  return (
    <RouterProvider router={router} />
   
  )
}
