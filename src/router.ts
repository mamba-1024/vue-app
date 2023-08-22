import { createRouter, createWebHistory } from 'vue-router';

// 1. 定义路由组件.
// 也可以从其他文件导入
import Home from './views/Home.vue'
import Employee from './views/Employee.vue'
import Attendance from './views/Attendance.vue'

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
const routes = [
  { title: '首页', path: '/', component: Home},
  { title: '员工管理', path: '/Employee', component: Employee },
  { title: '考勤管理', path: '/Attendance', component: Attendance },
]

export const menuItems = routes.map(ele => ({path: ele.path, title: ele.title}))

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
