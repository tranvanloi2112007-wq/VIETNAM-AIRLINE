// Giỏ đặt vé tạm (phiên đặt vé đang thực hiện)
const BAG_RATE = 60000, BAG_OPTS = [0, 5, 10, 20, 30, 50]; // giá mua thêm cân gửi hàng hóa (đ/kg)
const CHILD_RATE = .75, INFANT_RATE = .1; // trẻ em 75% giá vé, em bé 10% giá vé (không chiếm ghế)
const Cart = {
    TYPES: { adult: 'Người lớn', child: 'Trẻ em', infant: 'Em bé' },
    get() { try { return JSON.parse(localStorage.getItem('vna_draft')) || {} } catch { return {} } }, set(d) { localStorage.setItem('vna_draft', JSON.stringify(d)) }, clear() { localStorage.removeItem('vna_draft') },
    legsNeeded(d = this.get()) { return d.type === 'round' ? 2 : 1 },
    cnt(d) { return { a: d.adults ?? d.pax ?? 0, c: d.children || 0, i: d.infants || 0 } },
    seatN(d = this.get()) { const n = this.cnt(d); return n.a + n.c },
    fare(d, price) { const n = this.cnt(d); return Math.round(price * (n.a + n.c * CHILD_RATE + n.i * INFANT_RATE) / 1e3) * 1e3 },
    paxText(d) { const n = this.cnt(d); return [n.a && n.a + ' người lớn', n.c && n.c + ' trẻ em', n.i && n.i + ' em bé'].filter(Boolean).join(', ') },
    total(d = this.get()) { return (d.legs || []).reduce((s, l) => s + this.fare(d, Api.flight(l.id).prices[l.cls]) + (l.kg || 0) * BAG_RATE, 0) }
};
