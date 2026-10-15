// Tầng dữ liệu: nạp data/db.json (hoặc dữ liệu dự phòng) vào LocalStorage
const DEFAULT_DB = {
  users: [{ id: 'u0', name: 'Quản trị viên', email: 'admin@vna.vn', pass: 'admin123', role: 'admin' }, { id: 'u1', name: 'Nguyễn Văn A', email: 'user@vna.vn', pass: '123456', role: 'user' }],
  airports: { SGN: 'TP. Hồ Chí Minh', HAN: 'Hà Nội', DAD: 'Đà Nẵng', PQC: 'Phú Quốc', CXR: 'Nha Trang', HUI: 'Huế' },
  routes: [['SGN', 'HAN', 130, 1450000], ['SGN', 'DAD', 80, 1250000], ['HAN', 'DAD', 80, 1150000], ['SGN', 'PQC', 60, 990000], ['HAN', 'PQC', 130, 1650000], ['SGN', 'CXR', 65, 890000], ['HAN', 'CXR', 120, 1550000], ['HAN', 'HUI', 75, 1050000]],
  slots: ['06:15', '10:30', '15:00', '19:20'], days: 7
};
const SEATS = { business: { rows: [1, 3], cols: 'ACDF' }, economy: { rows: [4, 13], cols: 'ABCDEF' } };
const seatCodes = k => { const { rows: [a, b], cols } = SEATS[k], r = []; for (let i = a; i <= b; i++)for (const c of cols) r.push(i + c); return r };
const addMin = (t, m) => { const [h, i] = t.split(':').map(Number), x = (h * 60 + i + m) % 1440; return pad(Math.floor(x / 60)) + ':' + pad(x % 60) };
const Api = {
  async init() { if (localStorage.getItem('vna_db')) return; let t; try { const r = await fetch(ROOT + 'data/db.json'); if (!r.ok) throw 0; t = await r.json() } catch (e) { t = DEFAULT_DB } this.save(this.build(t)) },
  build(t) {
    const fl = []; let n = 0; const now = new Date();
    t.routes.forEach(([a, b, dur, p]) => [[a, b], [b, a]].forEach(([f, to]) => t.slots.forEach((s, si) => {
      const num = 200 + n++;
      for (let d = 0; d < t.days; d++) {
        const e = Math.round(p * (1 + si * .06) / 1e4) * 1e4;
        fl.push({ id: 'F' + fl.length, code: 'VN' + num, from: f, to, date: ymd(new Date(now.getFullYear(), now.getMonth(), now.getDate() + d)), dep: s, arr: addMin(s, dur), dur, prices: { economy: e, business: Math.round(e * 2.2 / 1e4) * 1e4 }, taken: ['business', 'economy'].flatMap(k => seatCodes(k).filter(() => Math.random() < (k === 'economy' ? .35 : .3))) })
      }
    })));
    return { users: t.users, airports: t.airports, flights: fl, bookings: [] }
  },
  db() { return JSON.parse(localStorage.getItem('vna_db')) },
  save(d) { localStorage.setItem('vna_db', JSON.stringify(d)) },
  async reset() { localStorage.removeItem('vna_db'); await this.init() },
  wait: (ms = 500) => new Promise(r => setTimeout(r, ms)),
  city(c) { return this.db().airports[c] || c },
  flight(id) { return this.db().flights.find(f => f.id === id) },
  booking(pnr) { return this.db().bookings.find(b => b.pnr === pnr.trim().toUpperCase()) },
  left(f, k) { const t = f.taken || []; return seatCodes(k).filter(c => !t.includes(c)).length },
  setStatus(pnr, st) {
    const d = this.db(), b = d.bookings.find(x => x.pnr === pnr); if (!b || b.status === st) return;
    b.legs.forEach(l => {
      const f = d.flights.find(x => x.id === l.flight.id); if (!f) return; const s = l.seats || []; f.taken = f.taken || [];
      f.taken = st === 'Đã hủy' ? f.taken.filter(c => !s.includes(c)) : [...new Set([...f.taken, ...s])]
    }); b.status = st; this.save(d)
  }
};
const city = c => Api.city(c);
