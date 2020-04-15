import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '首页', icon: 'home'}
    }]
  }
]

export const asyncRouterMap = [
  {
    path: '/ams',
    component: Layout,
    redirect: '/ams/article',
    name: 'ams',
    meta: {
      title: '文章',
      icon: 'ams'
    },
    children: [
      {
        path: 'article',
        name: 'article',
        component: () => import('@/views/ams/article/index'),
        meta: {
          title: '文章列表',
          icon: 'list'
        }
      },
      {
        path: 'addArticle',
        name: 'addArticle',
        component: () => import('@/views/ams/article/add'),
        meta: {
          title: '添加文章',
          icon: 'add'
        },
        hidden: true
      },
      {
        path: 'updateArticle',
        name: 'updateArticle',
        component: () => import('@/views/ams/article/update'),
        meta: {
          title: '编辑文章',
          icon: 'edit'
        },
        hidden: true
      },
      {
        path: 'articleCate',
        name: 'articleCate',
        component: () => import('@/views/ams/articleCate/index'),
        meta: {
          title: '分类管理',
          icon: 'category'
        }
      },
      {
        path: 'articleTag',
        name: 'articleTag',
        component: () => import('@/views/ams/articleTag/index'),
        meta: {
          title: '标签管理',
          icon: 'tag'
        }
      },
    ]
  },
  {
    path:'/ams',
    component: Layout,
    redirect: '/ams/user',
    name: 'ams',
    meta: {title: '权限', icon: 'ams'},
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/ams/user/index'),
        meta: {title: '用户列表', icon: 'ams-admin'}
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/ams/menu/index'),
        meta: {
          title: '菜单列表',
          icon: 'ams-admin'
        }
      },
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

