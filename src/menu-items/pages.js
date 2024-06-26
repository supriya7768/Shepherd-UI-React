// assets
import { IconKey } from '@tabler/icons-react';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Pages',
  caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Authentication',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'login',
          title: 'Login',
          type: 'item',
          url: '/pages/login',
          target: true
        },
        {
          id: 'register',
          title: 'Register',
          type: 'item',
          url: '/pages/register',
          target: true
        },
        {
          id: 'addfields',
          title: 'Add Fields',
          type: 'item',
          url: '/pages/addfields',
          target: true
        }
      ]
    }
  ]
};

export default pages;
