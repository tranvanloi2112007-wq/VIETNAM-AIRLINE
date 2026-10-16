Pages.admin = () => {
  if (!Auth.require('admin')) return; let tab = 'b';
  const dlg = $('#dlg'); $$('.tabs button').forEach(b => b.onclick = () => { tab = b.dataset.t; $$('.tabs button').forEach(x => x.classList.toggle('on', x === b)); $('#pb').hidden = tab !== 'b'; $('#pf').hidden = tab !== 'f'; $('#pc').hidden = tab !== 'c'; $('#ps').hidden = tab !== 's'; $('#pa').hidden = tab !== 'a' });
  const rb = () => {
    const q = $('#qb').value.trim().toLowerCase();
    const r = Api.db().bookings.filter(b => !q || b.pnr.toLowerCase().includes(q) || b.passengers.some(p => p.name.toLowerCase().includes(q))).reverse();
    $('#tb').innerHTML = r.length ? r.map(b => `<tr><td><b>${b.pnr}</b></td><td>${esc(b.userEmail)}</td><td>${b.legs.map(l => esc(l.flight.code + ' ' + l.flight.from + '-' + l.flight.to)).join('<br>')}</td><td>${b.passengers.map(p => esc(p.name)).join('<br>')}</td><td>${money(b.total)}</td>
   <td><select data-s="${b.pnr}"><option${b.status === 'Đã đặt' ? ' selected' : ''}>Đã đặt</option><option${b.status === 'Đã hủy' ? ' selected' : ''}>Đã hủy</option></select></td><td><button class="btn sm ghost" data-v="${b.pnr}">Xem</button></td></tr>`).join('') : '<tr><td colspan="7" class="empty">Không có đơn đặt vé nào</td></tr>'
  };
  const rf = () => {
    const q = $('#qf').value.trim().toLowerCase(), a = Api.db().flights.filter(f => !q || (f.code + f.from + f.to + f.date).toLowerCase().includes(q));
    $('#ct').textContent = `${a.length} chuyến bay${a.length > 40 ? ' (hiển thị 40 đầu, hãy tìm kiếm để thu hẹp)' : ''}`;
    $('#tf').innerHTML = a.slice(0, 40).map(f => `<tr><td><b>${f.code}</b></td><td>${f.from}→${f.to}</td><td>${fmtDate(f.date)}</td><td>${f.dep}–${f.arr}</td><td>${money(f.prices.economy)}<br>${money(f.prices.business)}<br><small>Còn ${Api.left(f, 'economy')} PT / ${Api.left(f, 'business')} TG</small></td><td><button class="btn sm ghost" data-e="${f.id}">Sửa</button> <button class="btn sm danger" data-d="${f.id}">Xóa</button></td></tr>`).join('')
  };
  const rc = () => {
    const q = $('#qc').value.trim().toLowerCase(), all = Api.db().contacts || [], a = all.filter(c => !q || (c.name + c.phone + c.email + c.message).toLowerCase().includes(q)).reverse(), n = all.filter(c => c.status === 'Mới').length;
    $('#nc').textContent = n ? `(${n} mới)` : '';
    $('#tc').innerHTML = a.length ? a.map(c => `<tr><td>${new Date(c.createdAt).toLocaleString('vi-VN')}</td><td><b>${esc(c.name)}</b>${c.userId ? '<br><small>Thành viên</small>' : ''}</td><td>${esc(c.phone)}<br>${esc(c.email)}</td><td style="max-width:280px;white-space:pre-wrap">${esc(c.message)}</td>
   <td><select data-cs="${c.id}"><option${c.status === 'Mới' ? ' selected' : ''}>Mới</option><option${c.status === 'Đã xử lý' ? ' selected' : ''}>Đã xử lý</option></select></td><td><button class="btn sm danger" data-cd="${c.id}">Xóa</button></td></tr>`).join('') : '<tr><td colspan="6" class="empty">Chưa có thông tin liên hệ nào</td></tr>'
  };
  const rst = () => {
    const B = Api.db().bookings, ok = B.filter(b => b.status === 'Đã đặt'), n = +$('#rg').value, tk = { economy: 0, business: 0 };
    ok.forEach(b => b.legs.forEach(l => tk[l.cls] += b.passengers.length)); const t = tk.economy + tk.business, rev = ok.reduce((s, b) => s + b.total, 0);
    $('#kp').innerHTML = [['Tổng doanh thu', money(rev)], ['Tổng đơn đặt vé', B.length], ['Tổng số vé đã đặt', t], ['Vé Phổ thông', tk.economy], ['Vé Thương gia', tk.business], ['Đơn đã hủy', B.length - ok.length]].map(([a, b]) => `<div class="card kpi"><small>${a}</small><b>${b}</b></div>`).join('');
    const days = [...Array(n)].map((_, i) => { const d = new Date(); d.setDate(d.getDate() - (n - 1 - i)); return ymd(d) }), m = Object.fromEntries(days.map(x => [x, 0]));
    ok.forEach(b => { const k = ymd(new Date(b.createdAt)); if (k in m) m[k] += b.total });
    const mx = Math.max(...Object.values(m), 1), W = Math.max(n * 34, 300), H = 180, bw = W / n;
    $('#chr').innerHTML = `<div class="tbl"><svg viewBox="0 0 ${W} ${H + 40}" width="${W}" height="${H + 40}">${days.map((x, i) => { const h = m[x] / mx * H; return `<rect x="${i * bw + 4}" y="${H - h + 10}" width="${bw - 8}" height="${h}" fill="#13509c" rx="3"><title>${fmtDate(x)}: ${money(m[x])}</title></rect><text x="${i * bw + bw / 2}" y="${H + 28}" font-size="9" text-anchor="middle" fill="#6b7686">${x.slice(8)}/${x.slice(5, 7)}</text>` }).join('')}</svg></div><small>Cột cao nhất: ${money(mx)} · chỉ tính đơn "Đã đặt", theo ngày đặt</small>`;
    const pp = t ? tk.economy / t * 100 : 0;
    $('#chc').innerHTML = `<div class="donut" style="background:${t ? `conic-gradient(#13509c 0 ${pp}%,#c9a24a ${pp}% 100%)` : '#dde3ec'}"><span><b>${t}</b><small>vé</small></span></div><div class="lg"><p><i style="background:#13509c"></i>Phổ thông: <b>${tk.economy}</b> (${t ? Math.round(pp) : 0}%)</p><p><i style="background:#c9a24a"></i>Thương gia: <b>${tk.business}</b> (${t ? 100 - Math.round(pp) : 0}%)</p></div>`
  };
  const ra = () => {
    const q = $('#qa').value.trim().toLowerCase(), d = Api.db(), me = Auth.user().id;
    $('#ta').innerHTML = d.users.filter(u => !q || (u.name + u.email).toLowerCase().includes(q)).map(u => `<tr><td><b>${esc(u.name)}</b>${u.id === me ? ' <small>(bạn)</small>' : ''}</td><td>${esc(u.email)}</td><td><span class="tag">${u.role === 'admin' ? 'Quản trị viên' : 'Khách hàng'}</span></td><td>${d.bookings.filter(b => b.userId === u.id).length}</td>
   <td class="st ${u.locked ? 'no' : 'ok'}">${u.locked ? 'Đã khóa' : 'Hoạt động'}</td><td><button class="btn sm ghost" data-ue="${u.id}">Sửa</button>${u.id !== me ? ` <button class="btn sm ghost" data-ul="${u.id}">${u.locked ? 'Mở khóa' : 'Khóa'}</button> <button class="btn sm danger" data-ud="${u.id}">Xóa</button>` : ''}</td></tr>`).join('')
  };
  const uf = $('#ufm'), udg = $('#udlg');
  const openU = u => {
    uf.reset(); uf.uid.value = u ? u.id : ''; $('#ut').textContent = u ? 'Sửa tài khoản' : 'Thêm tài khoản'; $('#uhint').textContent = u ? 'Để trống nếu không đổi mật khẩu' : '';
    if (u) { uf.uname.value = u.name; uf.uemail.value = u.email; uf.urole.value = u.role } uf.urole.disabled = !!u && u.id === Auth.user().id; $$('.err', uf).forEach(x => x.textContent = ''); udg.showModal()
  };
  uf.onsubmit = e => {
    e.preventDefault(); const { uname, uemail, upass, urole } = uf, d = Api.db(), id = uf.uid.value, em = uemail.value.trim();
    const dup = d.users.some(u => u.email.toLowerCase() === em.toLowerCase() && u.id !== id);
    const ok = [setErr(uname, uname.value.trim().length >= 3 ? '' : 'Họ tên tối thiểu 3 ký tự'), setErr(uemail, !V.email(em) ? 'Email không hợp lệ' : dup ? 'Email đã tồn tại' : ''),
    setErr(upass, (!id || upass.value) && upass.value.length < 6 ? 'Mật khẩu tối thiểu 6 ký tự' : '')].every(Boolean); if (!ok) return;
    if (id) { const u = d.users.find(x => x.id === id); u.name = uname.value.trim(); u.email = em; if (upass.value) u.pass = upass.value; if (!urole.disabled) u.role = urole.value }
    else d.users.push({ id: 'u' + Date.now(), name: uname.value.trim(), email: em, pass: upass.value, role: urole.value });
    Api.save(d); udg.close(); toast('Đã lưu tài khoản'); ra()
  };
  $('#uadd').onclick = () => openU(); $('#ucx').onclick = () => udg.close(); $('#qa').oninput = ra;
  $('#rg').onchange = rst; $('#qc').oninput = rc; $('#qb').oninput = rb; $('#qf').oninput = rf; rb(); rf(); rc(); rst(); ra();
  document.addEventListener('change', e => { const id = e.target.dataset.cs; if (!id) return; const d = Api.db(); d.contacts.find(c => c.id === id).status = e.target.value; Api.save(d); toast('Đã cập nhật trạng thái liên hệ'); rc() });
  document.addEventListener('change', e => { const p = e.target.dataset.s; if (!p) return; Api.setStatus(p, e.target.value); toast('Đã cập nhật trạng thái ' + p); rst() });
  const form = $('#ffm'), A = Api.db().airports; form.from.innerHTML = opts(A); form.to.innerHTML = opts(A, 'HAN');
  const openF = f => {
    form.reset(); form.id.value = f ? f.id : ''; $('#dt').textContent = f ? 'Sửa chuyến bay' : 'Thêm chuyến bay';
    if (f) { form.code.value = f.code; form.from.value = f.from; form.to.value = f.to; form.date.value = f.date; form.dep.value = f.dep; form.dur.value = f.dur; form.eco.value = f.prices.economy; form.biz.value = f.prices.business }
    $$('.err', form).forEach(x => x.textContent = ''); dlg.showModal()
  };
  $('#addf').onclick = () => openF(); $('#cx').onclick = () => dlg.close();
  $('#rs').onclick = async () => { if (confirm('Khôi phục toàn bộ dữ liệu mẫu? Đơn đặt vé, liên hệ và tài khoản mới tạo sẽ bị xóa.')) { await Api.reset(); if (!Auth.user()) return Auth.logout(); toast('Đã khôi phục dữ liệu mẫu'); rb(); rf(); rc(); rst(); ra() } };
  document.addEventListener('click', e => {
    const t = e.target.dataset;
    if (t.v) { $('#dbody').innerHTML = Booking.html(Api.booking(t.v)); $('#vd').showModal() }
    if (t.e) openF(Api.flight(t.e));
    if (t.ue) openU(Api.db().users.find(u => u.id === t.ue));
    if (t.ul) { const d = Api.db(), u = d.users.find(x => x.id === t.ul); u.locked = !u.locked; Api.save(d); toast(u.locked ? 'Đã khóa tài khoản' : 'Đã mở khóa tài khoản'); ra() }
    if (t.ud && confirm('Xóa tài khoản này? Các đơn đặt vé của tài khoản vẫn được giữ lại.')) { const d = Api.db(); d.users = d.users.filter(u => u.id !== t.ud); Api.save(d); toast('Đã xóa tài khoản'); ra() }
    if (t.cd && confirm('Xóa liên hệ này?')) { const d = Api.db(); d.contacts = d.contacts.filter(c => c.id !== t.cd); Api.save(d); toast('Đã xóa liên hệ'); rc() }
    if (t.d && confirm('Xóa chuyến bay này?')) { const d = Api.db(); d.flights = d.flights.filter(f => f.id !== t.d); Api.save(d); toast('Đã xóa chuyến bay'); rf() }
  });
  form.onsubmit = e => {
    e.preventDefault(); const { code, from, to, date, dep, dur, eco, biz } = form;
    const ok = [setErr(code, /^[A-Z]{2}\d{2,4}$/i.test(code.value.trim()) ? '' : 'Mã chuyến dạng VN123'), setErr(to, to.value !== from.value ? '' : 'Điểm đến phải khác điểm đi'), setErr(date, date.value ? '' : 'Chọn ngày bay'), setErr(dep, dep.value ? '' : 'Chọn giờ đi'),
    setErr(dur, +dur.value >= 30 ? '' : 'Thời gian bay tối thiểu 30 phút'), setErr(eco, +eco.value > 0 ? '' : 'Giá không hợp lệ'), setErr(biz, +biz.value >= +eco.value && +biz.value > 0 ? '' : 'Giá thương gia phải ≥ giá phổ thông')].every(Boolean); if (!ok) return;
    const d = Api.db(), o = { code: code.value.trim().toUpperCase(), from: from.value, to: to.value, date: date.value, dep: dep.value, arr: addMin(dep.value, +dur.value), dur: +dur.value, prices: { economy: +eco.value, business: +biz.value } };
    if (form.id.value) Object.assign(d.flights.find(f => f.id === form.id.value), o); else d.flights.push({ id: 'F' + Date.now(), ...o });
    Api.save(d); dlg.close(); toast('Đã lưu chuyến bay'); rf()
  }
};
