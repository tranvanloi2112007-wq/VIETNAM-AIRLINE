// js/register.js
import { getUsers, saveUsers } from './config/authConfig.js';

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('regName').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const password = document.getElementById('regPassword').value.trim();

            let users = getUsers();

            // Kiểm tra xem email đã tồn tại chưa
            const existingUser = users.find(u => u.email === email);
            if (existingUser) {
                alert("Email này đã được đăng ký! Vui lòng chọn email khác hoặc đăng nhập.");
                return;
            }

            // Tạo tài khoản mới (mặc định role là user)
            const newUser = {
                name,
                email,
                password,
                role: "user"
            };

            users.push(newUser);
            saveUsers(users);

            alert("Đăng ký thành công! Chuyển hướng đến trang đăng nhập.");
            window.location.href = "/pages/login.html";
        });
    }
});