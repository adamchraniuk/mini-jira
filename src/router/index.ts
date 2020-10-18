import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/projects',
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import(/* webpackChunkName: "admin" */ '@/views/projects/index.vue'),
  },
  {
    path: '/add-new-project',
    name: 'AddProject',
    component: () => import(/* webpackChunkName: "admin" */ '@/views/add-project.vue'),
  },
  {
    path: '/projects/:projectId',
    name: 'SingleProject',
    component: () => import(/* webpackChunkName: "admin" */ '@/views/single-project/index.vue'),
  },
  {
    path: '/add-new-issue/:projectId/',
    name: 'NewIssue',
    component: () => import(/* webpackChunkName: "admin" */ '@/views/add-issue.vue'),
  },
  {
    path: '/issues/:issueId',
    name: 'SingleIssue',
    component: () => import(/* webpackChunkName: "admin" */ '@/views/single-issue/index.vue'),
  },
  {
    path: '/issues/:projectId/:issueId/edit',
    name: 'EditIssue',
    component: () => import(/* webpackChunkName: "admin" */ '@/views/add-issue.vue'),
  },
  {
    path: '/projects/:projectId/edit',
    name: 'EditProject',
    component: () => import(/* webpackChunkName: "admin" */ '@/views/add-project.vue'),
  },
  {
    path: '/issues',
    name: 'Issues',
    component: () => import(/* webpackChunkName: "admin" */ '@/views/issues/index.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
