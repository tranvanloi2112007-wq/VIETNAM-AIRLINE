const API_URL = "http://localhost:9000";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Ngăn chặn load lại trang

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const messageEl = document.getElementById("message");

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // 1. KIỂM TRA NẾU CHƯA NHẬP DỮ LIỆU
  if (!email && !password) {
    messageEl.style.color = "red";
    messageEl.innerText = "Vui lòng nhập Email và Mật khẩu!";
    emailInput.focus();
    return;
  }

  if (!email) {
    messageEl.style.color = "red";
    messageEl.innerText = "Vui lòng nhập Email!";
    emailInput.focus();
    return;
  }

  if (!password) {
    messageEl.style.color = "red";
    messageEl.innerText = "Vui lòng nhập Mật khẩu!";
    passwordInput.focus();
    return;
  }

  // 2. XỬ LÝ ĐĂNG NHẬP VỚI API (JSON-SERVER-AUTH)
  try {
    messageEl.style.color = "blue";
    messageEl.innerText = "Đang xử lý đăng nhập...";

    // Dùng fetch (hoặc axios nếu có nhúng thư viện)
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Báo lỗi nếu sai thông tin tài khoản
      messageEl.style.color = "red";
      messageEl.innerText = typeof data === "string" ? data : "Email hoặc mật khẩu không chính xác!";
      return;
    }

    // 3. ĐĂNG NHẬP THÀNH CÔNG
    // Lưu token và user vào LocalStorage
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));

    messageEl.style.color = "green";
    messageEl.innerText = "Đăng nhập thành công! Đang chuyển hướng...";

    alert("Đăng nhập thành công!");

    // Chuyển hướng sang trang chủ index.html (thoát khỏi thư mục pages/ để ra thư mục gốc)
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 1000);

  } catch (error) {
    messageEl.style.color = "red";
    messageEl.innerText = "Không thể kết nối tới máy chủ API! Bạn đã bật json-server chưa?";
    console.error("Lỗi:", error);
  }
});