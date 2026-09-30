const API_URL = "http://localhost:9000";

document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Ngăn nộp form load lại trang

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const messageEl = document.getElementById("message");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  // 1. KIỂM TRA DỮ LIỆU ĐẦU VÀO
  if (!name) {
    messageEl.style.color = "red";
    messageEl.innerText = "Vui lòng nhập Họ và tên!";
    nameInput.focus();
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

  if (!confirmPassword) {
    messageEl.style.color = "red";
    messageEl.innerText = "Vui lòng xác nhận lại Mật khẩu!";
    confirmPasswordInput.focus();
    return;
  }

  // Kiểm tra mật khẩu nhập lại có trùng khớp không
  if (password !== confirmPassword) {
    messageEl.style.color = "red";
    messageEl.innerText = "Mật khẩu nhập lại không trùng khớp!";
    confirmPasswordInput.focus();
    return;
  }

  // 2. XỬ LÝ ĐĂNG KÝ VỚI API (JSON-SERVER-AUTH)
  try {
    messageEl.style.color = "blue";
    messageEl.innerText = "Đang xử lý đăng ký...";

    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Báo lỗi nếu email đã tồn tại hoặc dữ liệu không hợp lệ
      messageEl.style.color = "red";
      messageEl.innerText = typeof data === "string" ? data : "Đăng ký thất bại! Email có thể đã được sử dụng.";
      return;
    }

    // 3. ĐĂNG KÝ THÀNH CÔNG
    messageEl.style.color = "green";
    messageEl.innerText = "Đăng ký thành công! Đang chuyển hướng đến trang đăng nhập...";

    alert("Đăng ký tài khoản thành công!");

    // Chuyển hướng sang trang đăng nhập login.html (cùng nằm trong thư mục pages/)
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);

  } catch (error) {
    messageEl.style.color = "red";
    messageEl.innerText = "Không thể kết nối tới máy chủ API! Bạn đã bật json-server chưa?";
    console.error("Lỗi:", error);
  }
});