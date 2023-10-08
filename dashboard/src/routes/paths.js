// -----------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_USER = '/user';
export const ROOTS_TEST = '/test';

export const PATH_AFTER_LOGIN = '/dashboard/app';

// -----------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  // loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  // registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  // verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    couriers: path(ROOTS_DASHBOARD, '/couriers'),
    accounts: path(ROOTS_DASHBOARD, '/accounts'),
    settings: path(ROOTS_DASHBOARD, '/settings'),
    queries: path(ROOTS_DASHBOARD, '/queries'),
    estimation: path(ROOTS_DASHBOARD, '/estimation-request'),
  },
  consignment: {
    root: path(ROOTS_DASHBOARD, '/consignments'),
    search: path(ROOTS_DASHBOARD, '/consignments/search'),
    add: path(ROOTS_DASHBOARD, '/consignments/add'),
    upload: path(ROOTS_DASHBOARD, '/consignments/upload'),
  },
  tracking: {
    root: path(ROOTS_DASHBOARD, '/trackings'),
    all: path(ROOTS_DASHBOARD, '/trackings/all'),
    connected: path(ROOTS_DASHBOARD, '/trackings/connected'),
    ontransit: path(ROOTS_DASHBOARD, '/trackings/on-transit'),
    out: path(ROOTS_DASHBOARD, '/trackings/out-for-delivery'),
    undelivered: path(ROOTS_DASHBOARD, '/trackings/undelivered'),
    delivered: path(ROOTS_DASHBOARD, '/trackings/delivered'),
    rto: path(ROOTS_DASHBOARD, '/trackings/rto'),
  },


  user: {
    root: ROOTS_USER,
    profile: path(ROOTS_USER, '/profile'),
    account: path(ROOTS_USER, '/account')
  },

  test: {
    root: ROOTS_TEST,
    components: path(ROOTS_TEST, '/components'),
    pages: path(ROOTS_TEST, '/pages'),
  }
};

export const PATH_DOCS = '';
