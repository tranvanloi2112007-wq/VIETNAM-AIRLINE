const form = document.querySelector("#registerForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirmPassword").value;
    const message = document.querySelector("#message");

    if (!name || !email || !password || !confirmPassword) {
        message.textContent = "Vui lòng nhập đầy đủ thông tin!";
        return;
    }

    if (password !== confirmPassword) {
        message.textContent = "Mật khẩu nhập lại không đúng!";
        return;
    }

    const user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Đăng ký thành công!");

    window.location.href = "./login.html";
});