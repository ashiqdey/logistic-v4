// routes
import { PATH_DASHBOARD } from '../routes/paths';

// API
// -----------------------------------------------


export const urls = {
  apiBaseUrl: process.env.REACT_APP_API,
  appBaseUrl: process.env.REACT_APP_BASEURL,
  authenticate: '/auth/authenticate',
  getToken: '/auth/generate-token',
  logout: '/auth/logout',
  tracking: {
    get: '/tracking/tracking-get',
    add: '/tracking/tracking-add',
    update: '/tracking/tracking-update',
    upload: '/tracking/tracking-upload',
    delete: '/tracking/tracking-delete',
    statusUpdate: '/tracking/tracking-status-update',
  },
  courier: {
    get: '/tracking/couriers-get',
    delete: '/tracking/couriers-delete',
    add: '/tracking/couriers-add',
  },
  status: {
    get: '/tracking/status-get',
    add: '/tracking/status-add',
    update: '/tracking/status-update',
    delete: '/tracking/status-delete',
  },
  account: {
    add: '/auth/account-add',
    get: '/auth/account-get',
    update: '/auth/account-update',
    delete: '/auth/account-delete',
  },
  query: {
    get: '/query/index',
    resolved: '/query/resolved'
  },
  estimation: {
    get: '/estimation/index',
    resolved: '/estimation/resolved'
  }

};


export const statusMap = {
  '1': 'connected',
  '2': 'on-transit',
  '3': 'out-for-delivery',
  '4': 'undelivered',
  '5': 'delivered',
  '6': 'rto',
};

export const statusObj = {
  "1": "Connected",
  "2": "On Transit",
  "3": "Out for delivery",
  "4": "Undelivered",
  "5": "Delivered",
  "6": "RTO"
}
export const statusColor = {
  "1": "#4c56fb",
  "2": "#00dbea",
  "3": "#ffe663",
  "4": "#ff9f68",
  "5": "#3dffa6",
  "6": "#fb4b84"
}
export const config = {
  GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  SECRET: process.env.REACT_APP_SECRET,
  ENV: process.env.REACT_APP_NODE_ENV,

  BATCH_SIZE: 100, // batch size while importing excel
  ROW_SIZE: 100, // row size in tracking page
  DEMO : process.env.REACT_DEMO === "DEMO",
};

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.general.app; // as '/dashboard/app'



// -----------------------------------------------



// LAYOUT
export const HEADER = {
  MOBILE_HEIGHT: 64,
  MAIN_DESKTOP_HEIGHT: 88,
  DASHBOARD_DESKTOP_HEIGHT: 0,
  DASHBOARD_DESKTOP_OFFSET_HEIGHT: 0,
};

export const NAVBAR = {
  BASE_WIDTH: 260,
  DASHBOARD_WIDTH: 280,
  DASHBOARD_COLLAPSE_WIDTH: 88,
  //
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 40,
  DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32,
};

export const ICON = {
  NAVBAR_ITEM: 22,
  NAVBAR_ITEM_HORIZONTAL: 20,
};

// SETTINGS
// Please remove `localStorage` when you set settings.
// -----------------------------------------------

export const defaultSettings = {
  themeMode: 'light',
  themeDirection: 'ltr',
  themeColorPresets: 'default',
  themeLayout: 'horizontal',
  themeStretch: false,
};
