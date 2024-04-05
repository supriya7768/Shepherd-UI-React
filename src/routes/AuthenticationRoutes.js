import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
// import MinimalLayout from 'layout/MinimalLayout';
import MainLayout from 'layout/MainLayout';
// import { Dashboard } from '@mui/icons-material';

// login option 3 routing
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login')));
const AuthRegister = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register')));
const AuthCreateInvoice = Loadable(lazy(() => import('views/invoice/Create')));
const AuthListInvoice = Loadable(lazy(() => import('views/invoice/List')));
const AuthListDeleted = Loadable(lazy(() => import('views/invoice/List')));
const AuthAddLead = Loadable(lazy(() => import('views/lead/AddLead')));
const AuthLeadList = Loadable(lazy(() => import('views/lead/LeadList')));
const AuthAddFields = Loadable(lazy(() => import('views/pages/authentication/authentication3/AddFields')));
const AuthDashboard = Loadable(lazy(() => import('views/dashboard/Default')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/views/dashboard/default',
      element: <AuthDashboard />
    },
    {
      path: '/pages/login',
      element: <AuthLogin />
    },
    {
      path: '/pages/register',
      element: <AuthRegister />
    },
    {
      path: '/pages/addfields',
      element: <AuthAddFields />
    },
    {
      path: '/invoice/Create',
      element: <AuthCreateInvoice />
    },
    {
      path: '/invoice/List',
      element: <AuthListInvoice />
    },
    {
      path: '/invoice/Listdeleted',
      element: <AuthListDeleted />
    },
    {
      path: '/lead/AddLead',
      element: <AuthAddLead />
    },
    {
      path: '/lead/LeadList',
      element: <AuthLeadList />
    }
  ]
};

export default AuthenticationRoutes;
