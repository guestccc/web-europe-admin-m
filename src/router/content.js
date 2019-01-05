const ContentManagement = () => import('@/vuepage/content/index');
const ContentBannerList = () => import('@/vuepage/content/banner-list');
const ContentBannerAdd = () => import('@/vuepage/content/banner-add');
const ContentAbout = () => import('@/vuepage/content/about');
const ContentProblemList = () => import('@/vuepage/content/problem-list');
const ContentProblemAdd = () => import('@/vuepage/content/problem-add');
const ContentProblemHotList = () => import('@/vuepage/content/hot-list');
const ContentProblemFeedbackList = () => import('@/vuepage/content/feedback-list');
const ContentProblemFeedbackDetail = () => import('@/vuepage/content/feedback-detail');
const ContentProblemConditionList = () => import('@/vuepage/content/condition-list');

export default [
  {
    path: '/content-management',
    component: ContentManagement,
    children: [
      {
        path: 'condition-list',
        component: ContentProblemConditionList,
        meta: [
          {
            name: '内容管理',
            url: '/content-management',
          },
          {
            name: '条件设置',
            url: 'condition-list',
          },
        ],
      },
      {
        path: 'feedback-detail',
        component: ContentProblemFeedbackDetail,
        meta: [
          {
            name: '内容管理',
            url: '/content-management',
          },
          {
            name: '意见反馈',
            url: 'feedback-list',
          },
          {
            name: '查看详情',
            url: 'feedback-detail',
          },
        ],
      },
      {
        path: 'feedback-list',
        component: ContentProblemFeedbackList,
        meta: [
          {
            name: '内容管理',
            url: '/content-management',
          },
          {
            name: '意见反馈',
            url: 'feedback-list',
          },
        ],
      },
      {
        path: 'hot-list',
        component: ContentProblemHotList,
        meta: [
          {
            name: '内容管理',
            url: '/content-management',
          },
          {
            name: '热门搜索',
            url: 'hot-list',
          },
        ],
      },
      {
        path: 'problem-add',
        component: ContentProblemAdd,
        meta: [
          {
            name: '内容管理',
            url: '/content-management',
          },
          {
            name: '常见问题',
            url: 'problem-list',
          },
          {
            name: '新建问题',
            url: 'problem-add',
          },
        ],
      },
      {
        path: 'problem-list',
        component: ContentProblemList,
        meta: [
          {
            name: '内容管理',
            url: '/content-management',
          },
          {
            name: '常见问题',
            url: 'problem-list',
          },
        ],
      },
      {
        path: 'about',
        component: ContentAbout,
        meta: [
          {
            name: '内容管理',
            url: '/content-management',
          },
          {
            name: '关于我们',
            url: 'about',
          },
        ],
      },
      {
        path: 'banner-list',
        component: ContentBannerList,
        meta: [
          {
            name: '内容管理',
            url: '/content-management',
          },
          {
            name: '轮播图管理',
            url: 'banner-list',
          },
        ],
      },
      {
        path: 'banner-add',
        component: ContentBannerAdd,
        meta: [
          {
            name: '内容管理',
            url: '/content-management',
          },
          {
            name: '轮播图管理',
            url: 'banner-list',
          },
          {
            name: '新增轮播图',
            url: 'banner-add',
          },
        ],
      },
    ],
  },
];
