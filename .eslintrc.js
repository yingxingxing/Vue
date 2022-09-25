/*
 * @Description: 
 * @Author: 莲白
 * @Date: 2022-09-23 09:10:09
 * @LastEditTime: 2022-09-24 14:36:30
 * @LastEditors: 莲白
 */
module.exports={
  root:true,
  env:{
    node:true,
  },
  extends:['plugin:vue/vue3-essential','eslint:recommended'], //继承vue3的规则
  parserOptions:{
  
    parser:"@babel/eslint-parser",
    

  }
}