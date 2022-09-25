<!--
 * @Description: 
 * @Author: 莲白
 * @Date: 2022-09-25 08:51:49
 * @LastEditTime: 2022-09-25 10:12:30
 * @LastEditors: 莲白
-->
<template>
  <h1 class="title">hello app</h1>
  <ElButton type='primary'>按钮</ElButton>
  <ul>
    <li>
      <router-link to="/home">Home</router-link>
    </li>
    <li>
      <router-link to="/about">About</router-link>
    </li>
  </ul>
  <router-view/>
</template>
<script>
import {ElButton} from 'element-plus';
export default {
  name: "App",
  components:{
    ElButton
  }
};
</script>
<style>
.title {
  color: pink;
}
</style>
