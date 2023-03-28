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
        path: '/ticket/create',
        name: '优先调度申请单',
        // src/pages/ticket/List
        routes: [
          {
            path: './ticket/create/apply',
            name: '申请',
            component: './ticket/Create/Apply',
          },
          {
            path: './ticket/create/review',
            name: '审核',
            component: './ticket/Create/Review',
          },
        ],
      },
      {
        path: '/ticket/cancel',
        name: '优先调度取消单',
        routes: [
          {
            path: '/ticket/cancel/apply',
            name: '申请',
            component: './ticket/Cancel/Apply',
          },
          {
            path: '/ticket/cancel/review',
            name: '审核',
            component: './ticket/Cancel/Review',
          },
        ],
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
