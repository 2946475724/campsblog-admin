import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
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
    children: [{
        path: 'article',
        name: 'article',
        component: () => import('@/views/ams/article/index'),
        meta: {
          title: '文章列表',
          icon: 'ums-admin'
        }
      },
      {
        path: 'addArticle',
        name: 'addArticle',
        component: () => import('@/views/ams/article/add'),
        meta: {
          title: '添加文章',
          icon: 'ums-admin'
        }
      },
      {
        path: 'articleCate',
        name: 'articleCate',
        component: () => import('@/views/ams/articleCate/index'),
        meta: {
          title: '文章分类',
          icon: 'ums-admin'
        }
      },
    ]
  },
  {
    path:'/ums',
    component: Layout,
    redirect: '/ums/user',
    name: 'ums',
    meta: {title: '权限', icon: 'ums'},
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/ums/user/index'),
        meta: {title: '用户列表', icon: 'ums-admin'}
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/ums/menu/index'),
        meta: {
          title: '菜单列表',
          icon: 'ums-admin'
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

