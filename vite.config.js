import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8081,
    proxy: {
      '/api': {              //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
        target: 'http://localhost:8082/',     //代理的目标地址
        changeOrigin: true,              //是否设置同源，输入是的
        rewrite: (path) => path.replace(/^\/api/, "")
        // pathRewrite: {                   //路径重写
        // '/api': ''                     //选择忽略拦截器里面的单词
        // }
      }
    }
  }
})
