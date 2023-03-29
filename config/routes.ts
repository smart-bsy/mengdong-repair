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
        name: '申请单',
        // src/pages/ticket/List
        routes: [
          {
            path: './ticket/create/apply',
            name: '申请',
            component: './ticket/Create/Apply',
          },
          {
            path: '/ticket/create/process',
            name: '已发起流程需求单查询',
            component: './ticket/Create/Process',
          },
          {
            path: './ticket/create/review',
            name: '审核',
            component: './ticket/Create/Review',
          },
          {
            path: './ticket/create/approve',
            name: '批准',
            component: './ticket/Create/Approve',
          },
          {
            path: './ticket/create/new-energy',
            name: '新能源会签',
            component: './ticket/Create/NewEnergy',
          },
          {
            path: './ticket/create/scheduling',
            name: '调度会签',
            component: './ticket/Create/Scheduling',
          },
          {
            path: './ticket/create/scheduling-receive',
            name: '调度接收',
            component: './ticket/Create/ScheduleReceive',
          },
          {
            path: './ticket/create/executing',
            name: '需求单执行',
            component: './ticket/Create/Executing',
          },
          {
            path: './ticket/create/end',
            name: '结束（归档箱）',
            component: './ticket/Create/End',
          },
        ],
      },
      {
        path: '/ticket/cancel',
        name: '取消单',
        routes: [
          {
            path: '/ticket/cancel/apply',
            name: '申请',
            component: './ticket/Cancel/Apply',
          },
          {
            path: '/ticket/cancel/process',
            name: '已发起流程需求单查询',
            component: './ticket/Cancel/Process',
          },
          {
            path: '/ticket/cancel/review',
            name: '审核',
            component: './ticket/Cancel/Review',
          },
          {
            path: './ticket/cancel/approve',
            name: '批准',
            component: './ticket/Cancel/Approve',
          },
          {
            path: './ticket/cancel/new-energy',
            name: '新能源会签',
            component: './ticket/Cancel/NewEnergy',
          },
          {
            path: './ticket/cancel/scheduling',
            name: '调度会签',
            component: './ticket/Cancel/Scheduling',
          },
          {
            path: './ticket/cancel/scheduling-receive',
            name: '调度接收',
            component: './ticket/Cancel/ScheduleReceive',
          },
          {
            path: './ticket/cancel/executing',
            name: '需求单执行',
            component: './ticket/Cancel/Executing',
          },
          {
            path: './ticket/cancel/end',
            name: '结束（归档箱）',
            component: './ticket/Cancel/End',
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
