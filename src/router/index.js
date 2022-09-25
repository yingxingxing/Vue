/*
 * @Description: 
 * @Author: 莲白
 * @Date: 2022-09-25 09:27:40
 * @LastEditTime: 2022-09-25 09:32:57
 * @LastEditors: 莲白
 */
import { createRouter ,createWebHashHistory} from 'vue-router'
/**
 * 路由懒加载
 */
const Home=()=>import('../views/Home')
const About=()=>import('../views/About')
export default createRouter({
  history:createWebHashHistory(),
  routes:[
    {
      path:'/home',
      component:Home
    },
    {
      path:'/about',
      component:About
    },
  ]
})