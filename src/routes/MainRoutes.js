import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// Lazy loaded components
const AuthDashboard = Loadable(lazy(() => import('views/dashboard/Default')));
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
const AuthCreateInvoice = Loadable(lazy(() => import('views/invoice/Create')));
const AuthListInvoice = Loadable(lazy(() => import('views/invoice/List')));
const AuthListDeleted = Loadable(lazy(() => import('views/invoice/List')));
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login')));
const AuthAddLead = Loadable(lazy(() => import('views/lead/AddLead')));
const AuthLeadList = Loadable(lazy(() => import('views/lead/LeadList')));
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <AuthLogin />
    },
    {
      path: 'dashboard',
      element: (
        <MainLayout>
          <AuthDashboard />
        </MainLayout>
      )
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'invoice',
      children: [
        {
          path: 'Create',
          element: <AuthCreateInvoice />
        },
        {
          path: 'List',
          element: <AuthListInvoice />
        },
        {
          path: 'Listdeleted',
          element: <AuthListDeleted />
        }
      ]
    },
    {
      path: 'lead',
      children: [
        {
          path: 'AddLead',
          element: <AuthAddLead />
        },
        {
          path: 'LeadList',
          element: <AuthLeadList />
        }
      ]
    }
  ]
};

export default MainRoutes;
