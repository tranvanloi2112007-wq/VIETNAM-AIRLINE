const Auth = {
  user() {
    try {
      const s = JSON.parse(localStorage.getItem('vna_session')); if (!s) return null; const u = ((Api.db() || {}).users || []).find(x => x.id === s.id);
      if (!u || u.locked) { localStorage.removeItem('vna_session'); return null } return { id: u.id, name: u.name, email: u.email, role: u.role }
    } catch { return null }
  },
  login(email, pass, role) {
    const u = Api.db().users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.pass === pass && u.role === role);
    if (!u) throw new Error(role === 'admin' ? 'Sai tài khoản quản trị viên hoặc mật khẩu' : 'Email hoặc mật khẩu không đúng');
    if (u.locked) throw new Error('Tài khoản đã bị khóa. Vui lòng liên hệ quản trị viên');
    localStorage.setItem('vna_session', JSON.stringify({ id: u.id, name: u.name, email: u.email, role: u.role })); return u
  },
  register(name, email, pass) {
    const d = Api.db(); if (d.users.some(u => u.email.toLowerCase() === email.toLowerCase())) throw new Error('Email này đã được đăng ký');
    d.users.push({ id: 'u' + Date.now(), name, email, pass, role: 'user' }); Api.save(d)
  },
  logout() { localStorage.removeItem('vna_session'); location.href = ROOT + 'index.html' },
  require(role) {
    const u = this.user(); if (u && u.role === role) return true;
    location.href = ROOT + 'pages/login.html?next=' + encodeURIComponent(location.pathname.split('/').pop() + location.search) + (role === 'admin' ? '&role=admin' : ''); return false
  }
};
Pages.login = () => {
  let role = qs('role') === 'admin' ? 'admin' : 'user'; const f = $('#lf');
  const sync = () => { $$('.tabs button').forEach(b => b.classList.toggle('on', b.dataset.r === role)); $('#reg').style.display = role === 'admin' ? 'none' : 'block'; $('#ltitle').textContent = role === 'admin' ? 'Đăng nhập Quản trị viên' : 'Đăng nhập khách hàng' };
  $$('.tabs button').forEach(b => b.onclick = () => { role = b.dataset.r; sync() }); sync();
  f.onsubmit = async e => {
    e.preventDefault(); const em = f.email, pw = f.pass;
    const ok = [setErr(em, V.email(em.value) ? '' : 'Email không hợp lệ'), setErr(pw, pw.value ? '' : 'Vui lòng nhập mật khẩu')].every(Boolean); if (!ok) return;
    loading(true); await Api.wait(); loading(false);
    try {
      Auth.login(em.value, pw.value, role); toast('Đăng nhập thành công');
      setTimeout(() => location.href = qs('next') || (role === 'admin' ? 'admin.html' : ROOT + 'index.html'), 500)
    } catch (x) { $('#lmsg').innerHTML = `<div class="msg">${x.message}</div>` }
  }
};
Pages.register = () => {
  const f = $('#rf');
  f.onsubmit = async e => {
    e.preventDefault(); const { name, email, pass, pass2 } = f;
    const ok = [setErr(name, name.value.trim().length >= 3 ? '' : 'Họ tên tối thiểu 3 ký tự'), setErr(email, V.email(email.value) ? '' : 'Email không hợp lệ'),
    setErr(pass, pass.value.length >= 6 ? '' : 'Mật khẩu tối thiểu 6 ký tự'), setErr(pass2, pass2.value === pass.value ? '' : 'Mật khẩu nhập lại không khớp')].every(Boolean); if (!ok) return;
    loading(true); await Api.wait(); loading(false);
    try { Auth.register(name.value.trim(), email.value.trim(), pass.value); toast('Đăng ký thành công! Hãy đăng nhập'); setTimeout(() => location.href = 'login.html', 900) } catch (x) { $('#rmsg').innerHTML = `<div class="msg">${x.message}</div>` }
  }
};
