import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';


// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
import RoleBasedGuard from '../guards/RoleBasedGuard';


// components
import Loadable from '../components/micro/Loadable';
import { PATH_AFTER_LOGIN, PATH_DASHBOARD } from './paths';


// layouts
const DashboardLayout = Loadable(lazy(() => import('../layouts/dashboardLayout')));
const LogoOnlyLayout = Loadable(lazy(() => import('../layouts/LogoOnlyLayout')));
const MainLayout = Loadable(lazy(() => import('../layouts/mainLayout')));


// -----------------------------------------------


export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
      ],
    },

    // protected routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <RoleBasedGuard allowedRoles={['*']}>
            <DashboardLayout />
          </RoleBasedGuard>
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <GeneralApp /> },
        {
          path: 'consignments',
          children: [
            { element: <Navigate to="/dashboard/consignments/search" replace />, index: true },
            { path: ':tabType', element: <Consignments /> },
          ],
        },
        {
          path: 'trackings',
          children: [
            { element: <Navigate to="/dashboard/trackings/all" replace />, index: true },
            { path: ':trackingType', element: <Tracking /> },
          ],
        },
        { path: 'couriers', element: <Couriers /> },
        { path: 'queries', element: <Queries /> },
        { path: 'queries/:editType', element: <Queries /> },
        { path: 'estimation-request', element: <EstimationRequest /> },
        { path: 'estimation-request/:editType', element: <EstimationRequest /> },
        // { path: 'settings', element: <Settings /> },
      ],
    },


    // protected routes, for admin and supper admin
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <RoleBasedGuard allowedRoles={[8, 9]}>
            <DashboardLayout />
          </RoleBasedGuard>
        </AuthGuard>
      ),
      children: [
        { path: 'accounts', element: <Accounts /> },
        { path: 'accounts/:editType', element: <Accounts /> },
      ],
    },




    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        // { path: '404', element: <NotFound /> },
        { path: '*', element: <NotFound /> },
      ],
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/dashboard" replace />, index: true },
      ],
    },
    { path: '*', element: <NotFound /> },
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/auth/Login')));

// Dashboard
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard')));
// const Settings = Loadable(lazy(() => import('../pages/settings')));
const Accounts = Loadable(lazy(() => import('../pages/accounts')));
const Couriers = Loadable(lazy(() => import('../pages/couriers')));
const Queries = Loadable(lazy(() => import('../pages/query')));
const EstimationRequest = Loadable(lazy(() => import('../pages/estimation-request')));

const Consignments = Loadable(lazy(() => import('../pages/consignments')));
const Tracking = Loadable(lazy(() => import('../pages/tracking')));


// Main
const NotFound = Loadable(lazy(() => import('../pages/Page404')));


