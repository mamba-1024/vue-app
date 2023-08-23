import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    proxy:{
      '/api':{
        target:'http:// 192.168.74.1:8080',
        changeOrigin:true,
        // rewrite:(path)=>path.replace(/^\/api/,'')
      },
      '/employees':{
        target:'http:// 192.168.74.1:8080',
        changeOrigin:true,
        // rewrite:(path)=>path.replace(/^\/api/,'')
      }
    }
  }
})
