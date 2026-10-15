import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  server: {
    watch: {
      // json-server ghi vào db.json mỗi khi có người đăng ký.
      // Nếu không bỏ qua file này, Vite tưởng code đổi và TẢI LẠI TRANG ngay lúc đăng ký,
      // làm mất thông báo và không chuyển về trang chủ được.
      ignored: ['**/public/data/db.json']
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        login: resolve(import.meta.dirname, 'pages/login.html'),
        register: resolve(import.meta.dirname, 'pages/register.html'),
        bookingConfirmation: resolve(import.meta.dirname, 'pages/booking-confirmation.html'),
        flightDetail: resolve(import.meta.dirname, 'pages/flight-detail.html')
      }
    }
  }
})