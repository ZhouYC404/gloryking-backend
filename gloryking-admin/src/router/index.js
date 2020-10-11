import Vue from 'vue'
import VueRouter from 'vue-router'
//使用懒加载引入组件↓
const main = ()=> import('../views/main');
//分类相关↓
const newcategories = ()=>import('../views/newcategories')
const categorieslist = ()=>import('../views/categorieslist')
const editcateogires = ()=>import('../views/editcategories')
//物品相关↓
const newitems = ()=>import('../views/newitems')
const edititems = ()=>import('../views/edititems')
const itemslist = ()=>import('../views/itemslist')
//英雄相关↓
const newheros = ()=>import('../views/newheros')
const editheros = ()=>import('../views/editheros')
const heroslist = ()=>import('../views/heroslist')
//文章相关↓
const newarticle = ()=>import('../views/newarticle')
const articleslist = ()=>import('../views/articleslist')
const editarticle = ()=>import('../views/editarticle')
//广告相关↓
const newad = ()=>import('../views/newad')
const adslist = ()=>import('../views/adslist')
const editad = ()=>import('../views/editad')
//管理员相关↓
const newadminuser = ()=>import('../views/newadminuser')
const editadminuser = ()=>import('../views/editadminuser')
const adminuserslist = ()=>import('../views/adminuserslist')
//登陆界面↓
const login = ()=>import('../views/login')
//注册界面↓(注意：github版本才有，此界面本不应该存在的，注册完一个管理员账号后应该关闭此页面和相关接口！)
const register = ()=>import('../views/register')
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect: '/login'
  },
  {
    path:'/login',
    component:login
  },
  {
    path:'/register',
    component:register
  },
  {
    path: '/categories',
    name: 'main',
    component:main,
    children:[
      {path:'/categories/new',
       component:newcategories
      },
      {
        path:'/categories/list',
        component:categorieslist
      },
      {
        path:'/categories/edit/:id',
        component:editcateogires
      }
    ]
  },
  {
    path: '/items',
    name: 'main',
    component:main,
    children:[
      {path:'/items/new',
       component:newitems
      },
      {
        path:'/items/list',
        component:itemslist
      },
      {
        path:'/items/edit/:id',
        component:edititems
      }
    ]
  },
  {
    path: '/heros',
    name: 'main',
    component:main,
    children:[
      {path:'/heros/new',
       component:newheros
      },
      {
        path:'/heros/list',
        component:heroslist
      },
      {
        path:'/heros/edit/:id',
        component:editheros
      }
    ]
  },
  {
    path: '/articles',
    name: 'main',
    component:main,
    children:[
      {path:'/articles/new',
       component:newarticle
      },
      {
        path:'/articles/list',
        component:articleslist
      },
      {
        path:'/articles/edit/:id',
        component:editarticle
      }
    ]
  },
  {
    path: '/ads',
    name: 'main',
    component:main,
    children:[
      {path:'/ads/new',
       component:newad
      },
      {
        path:'/ads/list',
        component:adslist
      },
      {
        path:'/ads/edit/:id',
        component:editad
      }
    ]
  },
  {
    path: '/adminusers',
    name: 'main',
    component:main,
    children:[
      {path:'/adminusers/new',
       component:newadminuser
      },
      {
        path:'/adminusers/list',
        component:adminuserslist
      },
      {
        path:'/adminusers/edit/:id',
        component:editadminuser
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
