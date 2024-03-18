// assets
// import { IconReportMoney, IconMoneybag, IconZoomMoney } from '@tabler/icons';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PeopleIcon from '@mui/icons-material/People';

// constant
const icons = {
  PersonAddAltIcon,
  PeopleIcon
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const lead = {
  id: 'lead',
  title: 'Lead Management',
  type: 'group',
  // icon: icons.IconDashboard,
  children: [
    {
      id: 'addlead',
      title: 'Add Lead',
      type: 'item',
      url: '/lead/AddLead',
      icon: PersonAddAltIcon,
      breadcrumbs: false
    },
    {
      id: 'leadlist',
      title: 'Lead List',
      type: 'item',
      url: '/lead/LeadList',
      icon: icons.PeopleIcon,
      breadcrumbs: false
    }
  ]
};

export default lead;
