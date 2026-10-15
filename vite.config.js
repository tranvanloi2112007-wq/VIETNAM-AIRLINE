
import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        admin: resolve(process.cwd(), 'pages/admin.html'),
        confirm: resolve(process.cwd(), 'pages/confirm.html'),
        flightDetail: resolve(process.cwd(), 'pages/flight-detail.html'),
        login: resolve(process.cwd(), 'pages/login.html'),
        passenger: resolve(process.cwd(), 'pages/passenger.html'),
        register: resolve(process.cwd(), 'pages/register.html'),
        search: resolve(process.cwd(), 'pages/search.html'),
        ticket: resolve(process.cwd(), 'pages/ticket.html')
      }
    }
  }
});
