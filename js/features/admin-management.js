// Đoạn code kiểm tra phân quyền bảo vệ trang Admin
function checkAdminPermission() {
    const userRaw = localStorage.getItem('currentUser');
    if (!userRaw) {
        alert("Vui lòng đăng nhập để truy cập trang này!");
        window.location.href = "/pages/login.html";
        return;
    }

    const user = JSON.parse(userRaw);
    if (user.role !== 'admin') {
        alert("Bạn không có quyền truy cập trang quản trị!");
        window.location.href = "/index.html";
    }
}

// Gọi hàm này ngay khi file js quản lý admin chạy
checkAdminPermission();