const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('app/test/vitest/__tests__/demo/IndexPage.vue') },
      { path: 'about', component: () => import('app/test/vitest/__tests__/demo/AboutUs.vue') },
      { path: 'dashboard', component: () => import('app/test/vitest/__tests__/demo/FarmersDashboard.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('app/test/vitest/__tests__/demo/ErrorNotFound.vue')
  }
]

export default routes
