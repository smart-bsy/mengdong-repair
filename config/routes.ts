export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '/ticket',
    name: '优先调度单',
    icon: 'crown',
    routes: [
      {
        path: '/ticket/apply',
        name: '调度单',
        component: './ticket/Apply',
      },
      {
        path: '/ticket/approve',
        name: '待审批',
        component: './ticket/Approve',
      },
    ],
  },
  {
    component: './404',
  },
];

// authorization
/**
 *  1. 普通职员
 *  2.
 *
 */
