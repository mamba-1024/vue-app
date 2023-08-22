<template>
  <div>
    <el-container>
      <el-header>
        <img class="logo" src="https://element-plus.org/images/element-plus-logo.svg" alt="logo" />
        <top-menu :menu-items="menuItems" :active-menu-item="$route.path" />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>
        <!-- 这里放置 Footer 部分的内容 -->
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Menu from './Menu.vue';
import { menuItems } from '../router';

export default {
  name: 'ContainerComponent',
  components: {
    TopMenu: Menu,
  },
  data() {
    return {
      menuItems,
    };
  },
};
</script>
