import PrivateRoute from './privateRoutes';
import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import LayoutLogin from '../layouts/LayoutLogin';
import Layout from '../layouts/LayoutMain';
const login = lazy(() => import('../pages/Login'));
const painelPrincipal = lazy(() => import('../pages/PainelPrincipal'));
const lanchoneteHistorico = lazy(() => import('../pages/LanchoneteHistorico'));
const hotelPainel = lazy(() => import('../pages/HotelPainel'));
const hotelHistorico = lazy(() => import('../pages/HotelHistorico'));

export const routes = [
  {
    element: <LayoutLogin />,
    children: [{ path: '/login', element: <PrivateRoute component={login} /> }],
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/principal',
        element: <PrivateRoute component={painelPrincipal} />,
      },
    ],
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/painelHotel',
        element: <PrivateRoute component={hotelPainel} />,
      },
    ],
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/painelHistorico',
        element: <PrivateRoute component={hotelHistorico} />,
      },
    ],
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/lanchoneteHistorico',
        element: <PrivateRoute component={lanchoneteHistorico} />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  }
];
