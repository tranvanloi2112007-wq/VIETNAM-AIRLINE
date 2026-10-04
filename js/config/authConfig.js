// js/config/authConfig.js

// Lấy danh sách tài khoản từ localStorage, nếu chưa có thì dùng danh sách mẫu
export function getUsers() {
    const users = localStorage.getItem('app_users');
    if (users) {
        return JSON.parse(users);
    }
    // Tài khoản mẫu mặc định (bao gồm 1 tài khoản Admin và 1 User thường)
    const defaultUsers = [
        { email: "admin@airline.com", password: "admin123", role: "admin", name: "Quản Trị Viên" },
        { email: "user@gmail.com", password: "123456", role: "user", name: "Nguyễn Văn Khách" }
    ];
    localStorage.setItem('app_users', JSON.stringify(defaultUsers));
    return defaultUsers;
}

export function saveUsers(users) {
    localStorage.setItem('app_users', JSON.stringify(users));
}