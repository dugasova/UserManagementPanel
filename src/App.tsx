import React from 'react';

import Layout from './pages/Layout'
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import HomeRoute from './routes/HomeRoute';
import LoginRoute from './routes/LoginRoute';
import ErrorRoute from './routes/ErrorRoute';
import UsersRoute from './routes/UsersRoute';
import UserDetailsRoute from './routes/UserDetailsRoute';
import UserDashboardRoute from './routes/UserDashboardRoute';
import UserEditRoute from './routes/UserEditRoute'; // New import


export default function App() {

  const router = createBrowserRouter([
    {
      path: `/`,
      element: <Layout />,
      children: [
        {
          path: `/`,
          element: <HomeRoute />
        },
        {
          path: `login`,
          element:<LoginRoute />
        },
        {
          path:  `users`,
          element: <UsersRoute />
        },
        {
          path: `users/:id`,
          element: <UserDetailsRoute />
        },
        {
          path: `users/:id/edit`, // New edit route
          element: <UserEditRoute />
        },
        {
          path: `dashboard`,
          element:<UserDashboardRoute />
        }
      ],
      errorElement: <ErrorRoute />
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}
