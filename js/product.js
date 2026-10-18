// Chuyến bay: trang chủ, tìm kiếm, lọc, sắp xếp
const Product = {
  // Lọc và sắp xếp danh sách chuyến bay
  query({ from, to, date, max, sort }) {
    let r = Api.db().flights.filter(f =>
      f.date >= today() &&
      (!from || f.from === from) &&
      (!to || f.to === to) &&
      (!date || f.date === date) &&
      (!max || f.prices.economy <= max)
    );

    return r.sort((a, b) =>
      sort === 'asc'
        ? a.prices.economy - b.prices.economy
        : sort === 'desc'
          ? b.prices.economy - a.prices.economy
          : (a.date + a.dep).localeCompare(b.date + b.dep)
    );
  },

  // Tạo HTML cho một thẻ chuyến bay
  card(f, leg = 1) {
    const h = Math.floor(f.dur / 60), m = f.dur % 60;

    return `
    <div class="fl">
      <div>
        <b>${esc(f.code)}</b>
        <br><span class="tag">${fmtDate(f.date)}</span>
      </div>
      <div class="t">
        <b>${f.dep}</b>
        <small>${esc(city(f.from))}</small>
      </div>
      <div class="line">
        <small>${h}h ${m}m · bay thẳng</small>
      </div>
      <div class="t">
        <b>${f.arr}</b>
        <small>${esc(city(f.to))}</small>
      </div>
      <div class="pr">
        <b>${money(f.prices.economy)}</b>
        <small>Phổ thông / người</small>
        <br><small>Còn ${Api.left(f, 'economy')} ghế PT · ${Api.left(f, 'business')} ghế TG</small>
      </div>
      <a class="btn sm ghost" href="${ROOT}pages/flight-detail.html?id=${f.id}&leg=${leg}">Chi tiết</a>
    </div>`;
  }
};


// ===================== TRANG CHỦ =====================
Pages.home = () => {
  const a = Api.db().airports, f = $('#sf');

  // --- Điền sẵn form ---
  f.from.innerHTML = opts(a, 'SGN');
  f.to.innerHTML = opts(a, 'DAD');
  f.date.min = f.ret.min = today();
  f.date.value = today();

  // --- Chọn số hành khách ---
  const pv = { adults: 1, children: 0, infants: 0 }, pop = $('#paxpop');

  const syncPax = () => {
    const t = pv.adults + pv.children + pv.infants;

    ['adults', 'children', 'infants'].forEach(k => {
      f[k].value = pv[k];
      $('#v-' + k).textContent = pv[k];
    });
    f.paxsum.value = Cart.paxText(pv);

    // Bật/tắt các nút +/- theo quy tắc
    $$('[data-k]', pop).forEach(b => {
      const k = b.dataset.k;

      b.disabled = +b.dataset.d < 0
        ? (k === 'adults'
            ? pv.adults <= Math.max(1, pv.infants)
            : pv[k] <= 0)
        : (t >= 9 || (k === 'infants' && pv.infants >= Math.min(pv.adults, 4)));
    });
  };

  pop.onclick = e => {
    const k = e.target.dataset.k;
    if (k) {
      pv[k] += +e.target.dataset.d;
      syncPax();
    }
  };

  f.paxsum.onclick = () => pop.hidden = !pop.hidden;
  $('#paxok').onclick = () => pop.hidden = true;

  // Bấm ra ngoài thì đóng popup
  document.addEventListener('click', e => {
    if (!e.target.closest('.paxw')) pop.hidden = true;
  });
  syncPax();

  // --- Một chiều / khứ hồi: ẩn hiện ô ngày về ---
  const sync = () => {
    $('#retw').style.display = f.type.value === 'round' ? 'block' : 'none';
  };
  $$('[name=type]').forEach(r => r.onchange = sync);
  sync();

  // --- Gửi form ---
  f.onsubmit = e => {
    e.preventDefault();

    const ok = [
      setErr(f.infants,
        +f.infants.value > +f.adults.value
          ? 'Mỗi em bé cần đi cùng 1 người lớn'
          : (+f.adults.value + +f.children.value + +f.infants.value > 9
              ? 'Tối đa 9 hành khách'
              : '')),

      setErr(f.to,
        f.to.value === f.from.value ? 'Điểm đến phải khác điểm đi' : ''),

      setErr(f.date,
        f.date.value && f.date.value >= today() ? '' : 'Chọn ngày khởi hành hợp lệ'),

      setErr(f.ret,
        f.type.value === 'round' && (!f.ret.value || f.ret.value < f.date.value)
          ? 'Ngày về phải sau ngày đi'
          : '')
    ].every(Boolean);

    if (!ok) return;

    const na = +f.adults.value, nc = +f.children.value, ni = +f.infants.value;

    Cart.set({
      type: f.type.value,
      adults: na,
      children: nc,
      infants: ni,
      pax: na + nc + ni,
      ret: f.ret.value,
      legs: []
    });

    location.href = `pages/search.html?from=${f.from.value}&to=${f.to.value}&date=${f.date.value}&leg=1`;
  };

  // --- Chuyến bay nổi bật ---
  const fl = Product.query({ from: 'SGN', to: 'DAD' }).slice(0, 4);
  $('#featured').innerHTML = fl.map(x => Product.card(x)).join('');
};


// ===================== TRANG TÌM KIẾM =====================
Pages.search = () => {
  const leg = +(qs('leg') || 1),
        a = Api.db().airports,
        f = $('#ff'),
        c = Cart.get();

  // Chưa có giỏ thì tạo mặc định
  if (!c.pax) {
    Cart.set({ type: 'one', adults: 1, children: 0, infants: 0, pax: 1, ret: '', legs: [] });
  }

  // --- Điền sẵn bộ lọc từ URL ---
  f.from.innerHTML = opts(a, qs('from') || '', 'Tất cả');
  f.to.innerHTML = opts(a, qs('to') || '', 'Tất cả');
  f.date.value = qs('date') || '';
  f.date.min = today();

  // --- Tiêu đề theo ngữ cảnh ---
  $('#stitle').textContent =
    leg === 2
      ? 'Chọn chuyến bay chiều về'
      : (c.type === 'round' ? 'Chọn chuyến bay chiều đi' : 'Tìm chuyến bay');

  // --- Hiển thị kết quả ---
  const render = async () => {
    const box = $('#res');
    box.innerHTML = '<div class="empty">Đang tải danh sách chuyến bay...</div>';
    await Api.wait(350);

    $('#maxv').textContent = money(f.max.value);

    const r = Product.query({
      from: f.from.value,
      to: f.to.value,
      date: f.date.value,
      max: +f.max.value < 5e6 ? +f.max.value : 0,   // kéo hết thanh trượt = không giới hạn giá
      sort: f.sort.value
    });

    box.innerHTML = r.length
      ? `<small>${r.length} chuyến bay</small><div class="list">${r.slice(0, 60).map(x => Product.card(x, leg)).join('')}</div>`
      : '<div class="card empty">Không tìm thấy chuyến bay phù hợp. Hãy thử thay đổi bộ lọc.</div>';
  };

  // --- Đổi bộ lọc thì tải lại ---
  $$('#ff select,#ff input').forEach(i => i.onchange = render);
  f.max.oninput = () => $('#maxv').textContent = money(f.max.value);

  render();
};