// routes
import { PATH_DASHBOARD } from '../routes/paths';
// components
// import Label from '../components/micro/Label';
import SvgIconStyle from '../components/micro/SvgIconStyle';
import {urls} from '.';

// -----------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`${urls.appBaseUrl}/assets/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  dashboard: getIcon('dashboard'),
  bill: getIcon('bill'),
  truck: getIcon('truck'),
  settings: getIcon('settings'),
  user: getIcon('user'),
  query: getIcon('query'),
  estimation: getIcon('estimation'),
  tracking: getIcon('tracking'),
};




export const navConfig = [
  // GENERAL
  // -----------------------------------------------
  {
    subheader: 'general',
    items: [
      {
        title: 'dashboard',
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard
      },
      {
        title: 'consignment',
        path: PATH_DASHBOARD.consignment.root,
        icon: ICONS.bill,
        children: [
          // { title: 'search', path: PATH_DASHBOARD.consignment.search },
          { title: 'add', path: PATH_DASHBOARD.consignment.add },
          { title: 'upload', path: PATH_DASHBOARD.consignment.upload },
        ],
      },
      {
        title: 'tracking',
        path: PATH_DASHBOARD.tracking.root,
        icon: ICONS.tracking,
        children: [
          { title: 'all', path: PATH_DASHBOARD.tracking.all },
          { title: 'connected', path: PATH_DASHBOARD.tracking.connected },
          { title: 'on transit', path: PATH_DASHBOARD.tracking.ontransit },
          { title: 'out for delivery', path: PATH_DASHBOARD.tracking.out },
          { title: 'un-delivered', path: PATH_DASHBOARD.tracking.undelivered },
          { title: 'delivered', path: PATH_DASHBOARD.tracking.delivered },
          { title: 'return to origin', path: PATH_DASHBOARD.tracking.rto },
        ],
      },
      {
        title: 'couriers',
        path: PATH_DASHBOARD.general.couriers,
        icon: ICONS.truck
      },
    ],
  },

  // SALES
  // -----------------------------------------------
  {
    subheader: 'others',
    items: [
      {
        title: 'queries',
        path: PATH_DASHBOARD.general.queries,
        icon: ICONS.query,
      },
      {
        title: 'estimation requests',
        path: PATH_DASHBOARD.general.estimation,
        icon: ICONS.estimation,
      },
      {
        title: 'accounts',
        path: PATH_DASHBOARD.general.accounts,
        icon: ICONS.user,
      },
    ],
  },

];

