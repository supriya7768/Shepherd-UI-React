// assets
import { IconReportMoney, IconMoneybag, IconZoomMoney } from '@tabler/icons';

// constant
const icons = {
  IconReportMoney,
  IconMoneybag,
  IconZoomMoney
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const invoice = {
  id: 'invoice',
  title: 'Invoice',
  type: 'group',

  children: [
    {
      id: 'crvinvoice',
      title: 'Create',
      type: 'item',
      url: '/invoice/Create',
      icon: icons.IconReportMoney,
      breadcrumbs: false
    },
    // {
    //   id: 'listdeleted',
    //   title: 'List Deleted',
    //   type: 'item',
    //   url: '/invoice/Listdeleted',
    //   icon: icons.IconZoomMoney,
    //   breadcrumbs: false
    // },
    {
      id: 'listinvoice',
      title: 'Invoice List',
      type: 'item',
      url: '/invoice/List',
      icon: icons.IconMoneybag,
      breadcrumbs: false
    }
  ]
};

export default invoice;
