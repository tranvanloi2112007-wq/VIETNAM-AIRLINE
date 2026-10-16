// Quy trình đặt vé: chi tiết -> hành khách -> xác nhận -> vé điện tử
const Booking = {
  html(b, cancel) {
    const st = b.status === 'Đã đặt' ? 'ok' : 'no';
    return `<div class="tk"><div class="row"><div><small>Mã đặt chỗ (PNR)</small><div class="pnr">${esc(b.pnr)}</div></div><div><span class="st ${st}">${b.status}</span><br><small>Đặt lúc ${new Date(b.createdAt).toLocaleString('vi-VN')}</small></div></div>
  ${b.legs.map((l, i) => `<p><b>${b.legs.length > 1 ? (i ? 'Chiều về: ' : 'Chiều đi: ') : ''}${esc(l.flight.code)}</b> · ${esc(city(l.flight.from))} → ${esc(city(l.flight.to))}<br>${fmtDate(l.flight.date)} · ${l.flight.dep} – ${l.flight.arr} · Hạng ${l.cls === 'business' ? 'Thương gia' : 'Phổ thông'} · Ghế: ${(l.seats || []).join(', ') || '—'}${l.kg ? ` · Hành lý thêm ${l.kg}kg` : ''}</p>`).join('')}
  <table><tr><th>Hành khách</th><th>Giới tính</th><th>Ngày sinh</th><th>CCCD/Hộ chiếu</th></tr>${b.passengers.map(p => `<tr><td>${esc(p.name)}${p.type ? ` <small>(${Cart.TYPES[p.type]})</small>` : ''}</td><td>${esc(p.gender)}</td><td>${fmtDate(p.dob)}</td><td>${esc(p.idno)}</td></tr>`).join('')}</table>
  <p>Liên hệ: ${esc(b.contact.phone)} · ${esc(b.contact.email)}</p><div class="row"><b>Tổng tiền: ${money(b.total)}</b>${cancel && b.status === 'Đã đặt' ? `<button class="btn danger sm" data-cancel="${b.pnr}">Hủy đặt vé</button>` : ''}</div></div>`
  },
  summary(d) { return d.legs.map((l, i) => { const f = Api.flight(l.id); return `<p><b>${d.legs.length > 1 ? (i ? 'Chiều về: ' : 'Chiều đi: ') : ''}${esc(f.code)}</b> · ${esc(city(f.from))} → ${esc(city(f.to))} · ${fmtDate(f.date)} · ${f.dep}–${f.arr} · ${l.cls === 'business' ? 'Thương gia' : 'Phổ thông'} · ${Cart.paxText(d)} · Ghế: ${l.seats.join(', ')}${l.kg ? ` · Hành lý thêm ${l.kg}kg` : ''}</p>` }).join('') },
  guard() {
    if (!Auth.require('user')) return null; const d = Cart.get();
    if (!d.pax || !d.legs || d.legs.length < Cart.legsNeeded(d)) { $('main').innerHTML = '<div class="card empty">Phiên đặt vé chưa hoàn tất. <a href="../index.html">Quay lại trang chủ</a></div>'; return null } return d
  }
};
Pages.detail = () => {
  if (!Auth.require('user')) return; const f = Api.flight(qs('id')), d = Cart.get(), leg = +(qs('leg') || 1);
  if (!f || !d.pax) { $('main').innerHTML = '<div class="card empty">Không tìm thấy chuyến bay hoặc phiên đặt vé. <a href="../index.html">Về trang chủ</a></div>'; return }
  const n = Cart.seatN(d), L = d.legs[leg - 1] || {}; let cls = L.cls || 'economy', sel = (L.seats || []).slice(), kg = L.kg || 0;
  const C = { economy: ['Phổ thông', 'Hành lý xách tay 12kg', 'Hành lý ký gửi 23kg', 'Suất ăn nhẹ', 'Đổi vé có phí'], business: ['Thương gia', 'Hành lý xách tay 18kg', 'Hành lý ký gửi 32kg', 'Phòng chờ thương gia', 'Ghế ngả 180°, ưu tiên làm thủ tục', 'Đổi vé miễn phí'] };
  $('#info').innerHTML = `<h2>${esc(f.code)}: ${esc(city(f.from))} → ${esc(city(f.to))}</h2><p>${fmtDate(f.date)} · ${f.dep} – ${f.arr} (${Math.floor(f.dur / 60)}h ${f.dur % 60}m) · ${Cart.paxText(d)}</p><small>Trẻ em tính 75% giá vé, em bé tính 10% giá vé và không chiếm ghế.</small>`;
  $('#cls').innerHTML = Object.entries(C).map(([k, [n, ...b]]) => { const left = Api.left(f, k); return `<label class="${k === cls ? 'sel' : ''}"><input type="radio" name="cls" value="${k}" ${k === cls ? 'checked' : ''} ${left < n ? 'disabled' : ''}><b>${n}</b><b class="p">${money(f.prices[k])}</b><small>/ người lớn · ${left >= n ? `Còn <b>${left}</b> ghế` : 'Không đủ chỗ'}</small><ul>${b.map(x => `<li>${x}</li>`).join('')}</ul></label>` }).join('');
  $('#rate').textContent = money(BAG_RATE); $('#kg').innerHTML = BAG_OPTS.map(k => `<option value="${k}"${k === kg ? ' selected' : ''}>${k ? k + ' kg (+' + money(k * BAG_RATE) + ')' : 'Không mua thêm'}</option>`).join('');
  const upd = () => { $$('#cls label').forEach(l => l.classList.toggle('sel', l.querySelector('input').checked)); $('#total').textContent = money(Cart.fare(d, f.prices[cls]) + kg * BAG_RATE); $('#need').textContent = `(${sel.length}/${n} ghế)`; $('#sel').textContent = sel.join(', ') || 'chưa chọn' };
  const draw = () => {
    const t = f.taken || [], { rows: [a, b], cols } = SEATS[cls]; let h = '';
    for (let r = a; r <= b; r++) { h += `<div class="srow"><i>${r}</i>`; for (let i = 0; i < cols.length; i++) { const c = r + cols[i], x = t.includes(c); if (i === cols.length / 2) h += '<span class="aisle"></span>'; h += `<button type="button" class="seat${x ? ' x' : ''}${sel.includes(c) ? ' on' : ''}" data-s="${c}" ${x ? 'disabled' : ''}>${cols[i]}</button>` } h += '</div>' }
    $('#seats').innerHTML = h; upd()
  };
  if (Api.left(f, cls) < n) { cls = Api.left(f, 'economy') >= n ? 'economy' : 'business'; sel = [] }
  $$('[name=cls]').forEach(r => r.onchange = () => { cls = r.value; sel = []; draw() });
  $('#kg').onchange = e => { kg = +e.target.value; upd() };
  $('#seats').onclick = e => { const c = e.target.dataset.s; if (!c) return; if (sel.includes(c)) sel = sel.filter(x => x !== c); else if (sel.length >= n) return toast(`Bạn chỉ cần chọn ${n} ghế`, 'error'); else sel.push(c); draw() };
  draw();
  $('#next').onclick = () => {
    if (sel.length !== n) return toast(`Vui lòng chọn đủ ${n} ghế ngồi`, 'error');
    d.legs = d.legs.slice(0, leg - 1); d.legs.push({ id: f.id, cls, kg, seats: sel }); Cart.set(d);
    location.href = (d.type === 'round' && leg === 1) ? `search.html?from=${f.to}&to=${f.from}&date=${d.ret}&leg=2` : 'passenger.html'
  }
};
Pages.passenger = () => {
  const d = Booking.guard(); if (!d) return; const P = d.passengers || [], c = d.contact || { email: Auth.user().email }, on = Api.flight(d.legs[0].id).date, N = Cart.cnt(d);
  const types = [...Array(N.a).fill('adult'), ...Array(N.c).fill('child'), ...Array(N.i).fill('infant')];
  $('#pf-list').innerHTML = types.map((t, i) => {
    const p = P[i] && P[i].type === t ? P[i] : {}; return `<fieldset data-t="${t}"><legend>Hành khách ${i + 1} · ${Cart.TYPES[t]}</legend><div class="grid">
  <label>Họ và tên<input name="name" value="${esc(p.name)}" placeholder="NGUYEN VAN A"></label>
  <label>Giới tính<select name="gender">${opts({ Nam: 'Nam', Nữ: 'Nữ', Khác: 'Khác' }, p.gender, '-- Chọn --')}</select></label>
  <label>Ngày sinh<input type="date" name="dob" max="${today()}" value="${p.dob || ''}"></label>
  <label>${t === 'adult' ? 'CCCD (12 số) / Hộ chiếu' : 'Giấy khai sinh / CCCD / Hộ chiếu (nếu có)'}<input name="idno" value="${esc(p.idno)}"></label></div></fieldset>`
  }).join('');
  $('#phone').value = c.phone || ''; $('#email').value = c.email || '';
  $('#pf').onsubmit = e => {
    e.preventDefault(); const ps = []; let ok = true;
    $$('#pf-list fieldset').forEach(fs => {
      const t = fs.dataset.t, g = n => fs.querySelector(`[name=${n}]`), name = g('name'), gender = g('gender'), dob = g('dob'), idno = g('idno'), v = idno.value.trim();
      const a = dob.value ? age(dob.value, on) : -1;
      const dm = !dob.value || dob.value > today() ? 'Ngày sinh không hợp lệ' : t === 'adult' && a < 12 ? 'Người lớn phải từ 12 tuổi trở lên' : t === 'child' && (a < 2 || a >= 12) ? 'Trẻ em phải từ 2 đến dưới 12 tuổi' : t === 'infant' && (a < 0 || a >= 2) ? 'Em bé phải dưới 2 tuổi (tính đến ngày bay)' : '';
      const im = t === 'adult' ? (V.idno(v) ? '' : 'CCCD gồm 12 số hoặc Hộ chiếu (1 chữ + 7 số)') : (!v || /^[A-Za-z0-9]{6,15}$/.test(v) ? '' : 'Giấy tờ gồm 6–15 ký tự chữ/số');
      const r = [setErr(name, /^[\p{L}\s]{3,}$/u.test(name.value.trim()) ? '' : 'Họ tên chỉ gồm chữ, tối thiểu 3 ký tự'), setErr(gender, gender.value ? '' : 'Vui lòng chọn giới tính'), setErr(dob, dm), setErr(idno, im)];
      ok = ok && r.every(Boolean); ps.push({ type: t, name: name.value.trim().toUpperCase(), gender: gender.value, dob: dob.value, idno: v.toUpperCase() })
    });
    const ph = $('#phone'), em = $('#email');
    const r2 = [setErr(ph, V.phone(ph.value.trim()) ? '' : 'Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0)'), setErr(em, V.email(em.value.trim()) ? '' : 'Email không hợp lệ')];
    if (!ok || !r2.every(Boolean)) { toast('Vui lòng kiểm tra lại thông tin', 'error'); return }
    d.passengers = ps; d.contact = { phone: ph.value.trim(), email: em.value.trim() }; Cart.set(d); location.href = 'confirm.html'
  }
};
Pages.confirm = () => {
    const d = Booking.guard(); if (!d) return; if (!d.passengers || d.passengers.length !== d.pax) { location.href = 'passenger.html'; return }
    $('#sum').innerHTML = Booking.summary(d) + `<table><tr><th>Họ tên</th><th>Giới tính</th><th>Ngày sinh</th><th>CCCD/HC</th></tr>${d.passengers.map(p => `<tr><td>${esc(p.name)}${p.type ? ` <small>(${Cart.TYPES[p.type]})</small>` : ''}</td><td>${p.gender}</td><td>${fmtDate(p.dob)}</td><td>${esc(p.idno)}</td></tr>`).join('')}</table><p>Liên hệ: ${esc(d.contact.phone)} · ${esc(d.contact.email)}</p><h3>Tổng tiền: ${money(Cart.total(d))}</h3>`;
    
    // Xử lý khi bấm nút Xác nhận đặt vé trên trang confirm.html
    $('#ok').onclick = async () => {
        loading(true); await Api.wait(500); const db = Api.db(); let pnr;
        
        // Kiểm tra xem ghế đã bị người khác đặt chưa
        for (const [i, l] of d.legs.entries()) { 
            const f = db.flights.find(x => x.id === l.id); 
            if (!f || l.seats.some(s => (f.taken || []).includes(s))) { 
                loading(false); 
                toast('Ghế vừa được người khác đặt, vui lòng chọn lại', 'error'); 
                setTimeout(() => location.href = 'flight-detail.html?id=' + l.id + '&leg=' + (i + 1), 1200); 
                return; 
            } 
        }

        // Tạo mã PNR ngẫu nhiên gồm 6 ký tự
        const ch = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        do { 
            pnr = Array.from({ length: 6 }, () => ch[Math.floor(Math.random() * ch.length)]).join(''); 
        } while (db.bookings.some(b => b.pnr === pnr));

        // Đóng gói thông tin đơn hàng dưới dạng trạng thái 'Pending' (Chờ thanh toán)
        const bookingData = {
            pnr: pnr,
            userId: Auth.user().id,
            userEmail: Auth.user().email,
            legs: d.legs.map(l => { 
                const f = db.flights.find(x => x.id === l.id); 
                const { taken, ...fs } = f; 
                return { flight: fs, cls: l.cls, kg: l.kg || 0, seats: l.seats }; 
            }),
            passengers: d.passengers,
            contact: d.contact,
            total: Cart.total(d),
            status: 'Pending',
            createdAt: Date.now()
        };

        // Lưu tạm thông tin đơn hàng vào localStorage để trang thanh toán đọc
        localStorage.setItem('vna_current_booking', JSON.stringify(bookingData));
        
        loading(false);
        
        // Chuyển hướng sang trang thanh toán
        location.href = 'payment.html';
    }
};
Pages.ticket = () => {
  const show = (b, own) => $('#res').innerHTML = b ? Booking.html(b, own) : '<div class="msg">Không tìm thấy mã đặt chỗ. Vui lòng kiểm tra lại.</div>';
  const u = Auth.user(), mine = () => u && u.role === 'user' ? Api.db().bookings.filter(b => b.userId === u.id).reverse() : [];
  const own = b => b && u && b.userId === u.id;
  const list = () => { const m = mine(); $('#mine').innerHTML = u ? (m.length ? m.map(b => Booking.html(b, true)).join('') : '<div class="empty">Bạn chưa có vé nào.</div>') : '<div class="empty"><a href="login.html?next=ticket.html">Đăng nhập</a> để xem các vé đã đặt.</div>' };
  if (qs('pnr')) { const b = Api.booking(qs('pnr')); show(b, own(b)) } list();
  $('#lk').onsubmit = async e => {
    e.preventDefault(); const i = e.target.pnr; if (!setErr(i, i.value.trim().length === 6 ? '' : 'Mã đặt chỗ gồm 6 ký tự')) return;
    loading(true); await Api.wait(400); loading(false); const b = Api.booking(i.value); show(b, own(b))
  };
  document.addEventListener('click', e => {
    const p = e.target.dataset.cancel; if (!p || !confirm('Bạn chắc chắn muốn hủy vé ' + p + '?')) return;
    Api.setStatus(p, 'Đã hủy'); toast('Đã hủy vé ' + p);
    const cur = Api.booking(p); if ($('#res').innerHTML.includes(p)) show(cur, true); list()
  })
};
