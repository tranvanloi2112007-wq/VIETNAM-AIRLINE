const form = document.querySelector("#loginForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value;
    const message = document.querySelector("#message");

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        message.textContent = "Chưa có tài khoản!";
        return;
    }

    if (email === user.email && password === user.password) {
        localStorage.setItem("isLogin", "true");

        alert("Đăng nhập thành công!");

        window.location.href = "./index.html";
    } else {
        message.textContent = "Email hoặc mật khẩu không đúng!";
    }
});