import React, { lazy } from 'react';

import Layout from './pages/Layout'
import { AuthProvider } from './contexts/AuthContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeRoute from './routes/HomeRoute';
import LoginRoute from './routes/LoginRoute';
import ErrorRoute from './routes/ErrorRoute';
import UserDetailsRoute from './routes/UserDetailsRoute';
import AdminRoute from './routes/AdminRoute';
import AuthGuard from './HOC/AuthGuard';

const UsersRouteLazy = lazy(() => import('./routes/UsersRoute'));
const UserDashboardRouteLazy = lazy(() => import('./routes/UserDashboardRoute'));
const UserEditRouteLazy = lazy(() => import('./routes/UserEditRoute'));


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
          element: <LoginRoute />
        },
        {
          path: `users`,
          element: <AuthGuard><UsersRouteLazy /></AuthGuard>
        },
        {
          path: `users/:id`,
          element: <AuthGuard><UserDetailsRoute /></AuthGuard>
        },
        {
          path: `users/:id/edit`,
          element: <AuthGuard><UserEditRouteLazy /></AuthGuard>
        },
        {
          path: `dashboard`,
          element: <AuthGuard><UserDashboardRouteLazy /></AuthGuard>
        },
        {
          path:`admin`,
          element: <AuthGuard><AdminRoute /></AuthGuard>
        }
      ],
      errorElement: <ErrorRoute />
    }
  ])
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}
