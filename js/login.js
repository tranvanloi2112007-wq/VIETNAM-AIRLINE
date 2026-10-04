// js/login.js
import { getUsers } from './config/authConfig.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            const users = getUsers();

            // Tìm kiếm người dùng khớp thông tin
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // Lưu thông tin phiên đăng nhập vào localStorage
                localStorage.setItem('currentUser', JSON.stringify(user));

                alert(`Đăng nhập thành công! Chào ${user.name}`);

                // Phân quyền chuyển hướng dựa theo role
                if (user.role === 'admin') {
                    // Nếu là Admin -> Chuyển vào trang quản trị admin
                    window.location.href = "/pages/admin-booking.html";
                } else {
                    // Nếu là User thường -> Chuyển về trang chủ hoặc trang tìm kiếm chuyến bay
                    window.location.href = "/index.html"; 
                }
            } else {
                alert("Sai tài khoản hoặc mật khẩu! Vui lòng thử lại.");
            }
        });
    }
});