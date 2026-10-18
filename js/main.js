function renderChrome() {
    const u = Auth.user(), p = ROOT + 'pages/';
    
    // Render Header an toàn
    const hdr = $('#hdr');
    if (hdr) {
        hdr.innerHTML = `<div class="nav wrap">
        <a class="logo" href="${ROOT}index.html">✈ VIETNAM<br>AIRLINES</a>
        <button id="burger" aria-label="Menu">☰</button><nav id="menu">
        <a href="${ROOT}index.html">Trang chủ</a>
        <a href="${p}search.html">Tìm chuyến bay</a>
        <a href="${p}ticket.html">Tra cứu vé</a>
        <a href="${ROOT}index.html#contact">Liên hệ</a>
        ${u && u.role === 'admin' ? `<a href="${p}admin.html">Quản trị</a>` : ''}
        ${u ? `<span class="hi">Xin chào, ${esc(u.name)}</span>
        <a href="#" id="lo" class="btn sm">Đăng xuất</a>` : `<a href="${p}login.html" class="btn sm">Đăng nhập</a>
        <a href="${p}register.html" class="btn sm ghost">Đăng ký</a>`}</nav></div>`;
        const burger = $('#burger');
        if (burger) burger.onclick = () => $('#menu').classList.toggle('open');
        const lo = $('#lo');
        if (lo) lo.onclick = e => { e.preventDefault(); Auth.logout() };
    }
    
    // Footer: chỉ hiển thị ở trang chủ
const ftr = $('#ftr');
if (ftr) {
    // Trang chủ nằm ngoài thư mục /pages/, các trang con đều nằm trong /pages/
    const isHome = !location.pathname.includes('/pages/');

    if (!isHome) {
        ftr.remove(); // trang khác: xóa luôn thẻ footer
        } else {
            ftr.innerHTML = `<div class="wrap">
            <div>
                <b style="color:#fff">✈ VIETNAM AIRLINES</b>
                <br> Đồng hành cùng bạn trên mọi chuyến bay.
            </div>
            <div>
                <b style="color:#fff">Đặt vé</b>
                <a href="${p}search.html">Tìm chuyến bay</a>
                <a href="${p}ticket.html">Tra cứu vé</a>
            </div>
            <div>
                <b style="color:#fff">Tài khoản</b>
                <a href="${p}login.html">Đăng nhập</a>
                <a href="${p}register.html">Đăng ký</a>
            </div>
            <div>© 2026 Vietnam Airlines (demo)</div>
            </div>`;
        }
    }
}

(async () => { 
    loading(true); 
    await Api.init(); 
    loading(false); 
    renderChrome(); 
    const f = Pages[document.body.dataset.page]; 
    if (f) f(); 
})();