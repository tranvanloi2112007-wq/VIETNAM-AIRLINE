// Tầng dữ liệu: nạp data/db.json (hoặc dữ liệu dự phòng) vào LocalStorage

// Dữ liệu dự phòng khi không đọc được data/db.json
const DEFAULT_DB = {
  users: [
    { id: 'u0', name: 'Quản trị viên', email: 'admin@vna.vn', pass: 'admin123', role: 'admin' },
    { id: 'u1', name: 'Nguyễn Văn A', email: 'user@vna.vn', pass: '123456', role: 'user' }
  ],
  airports: {
    SGN: 'TP. Hồ Chí Minh',
    HAN: 'Hà Nội',
    DAD: 'Đà Nẵng',
    PQC: 'Phú Quốc',
    CXR: 'Nha Trang',
    HUI: 'Huế'
  },
  // Mỗi tuyến: [điểm A, điểm B, thời gian bay (phút), giá vé Phổ thông cơ bản]
  routes: [
    ['SGN', 'HAN', 130, 1450000],
    ['SGN', 'DAD', 80, 1250000],
    ['HAN', 'DAD', 80, 1150000],
    ['SGN', 'PQC', 60, 990000],
    ['HAN', 'PQC', 130, 1650000],
    ['SGN', 'CXR', 65, 890000],
    ['HAN', 'CXR', 120, 1550000],
    ['HAN', 'HUI', 75, 1050000]
  ],
  slots: ['06:15', '10:30', '15:00', '19:20'],   // các khung giờ bay mỗi ngày
  days: 7                                         // số ngày sinh chuyến bay, tính từ hôm nay
};

// Sơ đồ ghế: khoảng hàng và các cột ghế của từng hạng
const SEATS = {
  business: { rows: [1, 3], cols: 'ACDF' },
  economy: { rows: [4, 13], cols: 'ABCDEF' }
};

// Danh sách mã ghế của một hạng, ví dụ ['1A', '1C', ...]
const seatCodes = k => {
  const { rows: [a, b], cols } = SEATS[k], r = [];

  for (let i = a; i <= b; i++)
    for (const c of cols)
      r.push(i + c);

  return r;
};

// Cộng thêm m phút vào giờ t (dạng 'HH:MM'), quay vòng sau 24 giờ
const addMin = (t, m) => {
  const [h, i] = t.split(':').map(Number),
        x = (h * 60 + i + m) % 1440;

  return pad(Math.floor(x / 60)) + ':' + pad(x % 60);
};

const Api = {
  // Khởi tạo db lần đầu: đã có trong localStorage thì thôi
  async init() {
    if (localStorage.getItem('vna_db')) return;

    let t;
    try {
      const r = await fetch(ROOT + 'data/db.json');
      if (!r.ok) throw 0;
      t = await r.json();
    } catch (e) {
      t = DEFAULT_DB;   // không đọc được file thì dùng dữ liệu dự phòng
    }

    this.save(this.build(t));
  },

  // Sinh danh sách chuyến bay từ cấu hình tuyến + khung giờ + số ngày
  build(t) {
    const fl = [];
    let n = 0;
    const now = new Date();

    t.routes.forEach(([a, b, dur, p]) =>
      // Mỗi tuyến bay cả hai chiều: a → b và b → a
      [[a, b], [b, a]].forEach(([f, to]) =>
        t.slots.forEach((s, si) => {
          const num = 200 + n++;   // số hiệu chuyến: VN200, VN201, ...

          for (let d = 0; d < t.days; d++) {
            // Giá Phổ thông: khung giờ càng muộn càng đắt (+6%/khung), làm tròn chục nghìn
            const e = Math.round(p * (1 + si * .06) / 1e4) * 1e4;

            fl.push({
              id: 'F' + fl.length,
              code: 'VN' + num,
              from: f,
              to,
              date: ymd(new Date(now.getFullYear(), now.getMonth(), now.getDate() + d)),
              dep: s,
              arr: addMin(s, dur),
              dur,
              prices: {
                economy: e,
                business: Math.round(e * 2.2 / 1e4) * 1e4   // Thương gia gấp 2,2 lần
              },
              // Giả lập ghế đã có người đặt: ngẫu nhiên ~35% Phổ thông, ~30% Thương gia
              taken: ['business', 'economy'].flatMap(k =>
                seatCodes(k).filter(() => Math.random() < (k === 'economy' ? .35 : .3))
              )
            });
          }
        })
      )
    );

    return { users: t.users, airports: t.airports, flights: fl, bookings: [] };
  },

  // --- Đọc / ghi / xóa db trong localStorage ---
  db() {
    return JSON.parse(localStorage.getItem('vna_db'));
  },

  save(d) {
    localStorage.setItem('vna_db', JSON.stringify(d));
  },

  // Xóa db và tạo lại từ đầu
  async reset() {
    localStorage.removeItem('vna_db');
    await this.init();
  },

  // Chờ ms mili giây (giả lập thời gian chờ server)
  wait: (ms = 500) => new Promise(r => setTimeout(r, ms)),

  // --- Tra cứu ---
  // Mã sân bay → tên thành phố (không có thì trả lại chính mã)
  city(c) {
    return this.db().airports[c] || c;
  },

  flight(id) {
    return this.db().flights.find(f => f.id === id);
  },

  booking(pnr) {
    return this.db().bookings.find(b => b.pnr === pnr.trim().toUpperCase());
  },

  // Số ghế còn trống của hạng k trên chuyến f
  left(f, k) {
    const t = f.taken || [];
    return seatCodes(k).filter(c => !t.includes(c)).length;
  },

  // Đổi trạng thái đặt vé và cập nhật ghế:
  // 'Đã hủy' thì trả ghế lại, trạng thái khác thì đánh dấu ghế đã đặt
  setStatus(pnr, st) {
    const d = this.db(),
          b = d.bookings.find(x => x.pnr === pnr);

    if (!b || b.status === st) return;

    b.legs.forEach(l => {
      const f = d.flights.find(x => x.id === l.flight.id);
      if (!f) return;

      const s = l.seats || [];
      f.taken = f.taken || [];

      f.taken = st === 'Đã hủy'
        ? f.taken.filter(c => !s.includes(c))
        : [...new Set([...f.taken, ...s])];
    });

    b.status = st;
    this.save(d);
  }
};

// Hàm city dùng chung toàn site (các file khác gọi city(...))
const city = c => Api.city(c);