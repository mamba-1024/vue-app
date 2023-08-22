<template>
  <el-menu
    :default-active="activeMenuItem"
    class="el-menu-top"
    mode="horizontal"
  >
    <el-menu-item v-for="item in menuItems" :key="item.path" :index="item.path">
      <router-link :to="item.path">{{ item.title }}</router-link>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'Menu',
  props: {
    menuItems: Array,
    activeMenuItem: String,
  },
  data() {
    return {
      
    };
  }
};
</script>
