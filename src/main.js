/*
 * @Description:
 * @Author: 莲白
 * @Date: 2022-09-25 08:47:33
 * @LastEditTime: 2022-09-25 10:12:51
 * @LastEditors: 莲白
 */
import { createApp } from "vue";
import App from "./App";
import router from "./router";
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
createApp(App)
  .use(router)
  // .use(ElementPlus)
  .mount(document.getElementById("app"));
