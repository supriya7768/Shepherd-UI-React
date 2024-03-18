import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const AuthCreateInvoice = Loadable(lazy(() => import('views/invoice/Create')));
const AuthListInvoice = Loadable(lazy(() => import('views/invoice/List')));
const AuthListDeleted = Loadable(lazy(() => import('views/invoice/List')));
const AuthAddLead = Loadable(lazy(() => import('views/lead/AddLead')));
const AuthLeadList = Loadable(lazy(() => import('views/lead/LeadList')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/pages/login/login3',
      element: <AuthLogin3 />
    },
    {
      path: '/pages/register/register3',
      element: <AuthRegister3 />
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
