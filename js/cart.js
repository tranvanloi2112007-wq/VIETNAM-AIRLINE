// Giỏ đặt vé tạm (phiên đặt vé đang thực hiện)

// Giá mua thêm cân gửi hàng hóa (đ/kg) và các mức cân có thể chọn
const BAG_RATE = 60000,
      BAG_OPTS = [0, 5, 10, 20, 30, 50];

// Trẻ em 75% giá vé, em bé 10% giá vé (không chiếm ghế)
const CHILD_RATE = .75,
      INFANT_RATE = .1;

const Cart = {
  TYPES: { adult: 'Người lớn', child: 'Trẻ em', infant: 'Em bé' },

  // --- Đọc / ghi / xóa giỏ trong localStorage ---
  get() {
    try {
      return JSON.parse(localStorage.getItem('vna_draft')) || {};
    } catch {
      return {};
    }
  },

  set(d) {
    localStorage.setItem('vna_draft', JSON.stringify(d));
  },

  clear() {
    localStorage.removeItem('vna_draft');
  },

  // Số chặng cần chọn: khứ hồi 2, một chiều 1
  legsNeeded(d = this.get()) {
    return d.type === 'round' ? 2 : 1;
  },

  // Đếm hành khách: a = người lớn, c = trẻ em, i = em bé
  // (d.pax là dữ liệu cũ, dùng dự phòng cho số người lớn)
  cnt(d) {
    return {
      a: d.adults ?? d.pax ?? 0,
      c: d.children || 0,
      i: d.infants || 0
    };
  },

  // Số ghế cần đặt (em bé không chiếm ghế)
  seatN(d = this.get()) {
    const n = this.cnt(d);
    return n.a + n.c;
  },

  // Tiền vé cho cả đoàn trên một chặng, làm tròn đến nghìn đồng
  fare(d, price) {
    const n = this.cnt(d);
    return Math.round(price * (n.a + n.c * CHILD_RATE + n.i * INFANT_RATE) / 1e3) * 1e3;
  },

  // Chuỗi mô tả hành khách, ví dụ "2 người lớn, 1 trẻ em"
  paxText(d) {
    const n = this.cnt(d);
    return [
      n.a && n.a + ' người lớn',
      n.c && n.c + ' trẻ em',
      n.i && n.i + ' em bé'
    ].filter(Boolean).join(', ');
  },

  // Tổng tiền: cộng tiền vé và tiền cân gửi thêm của từng chặng
  total(d = this.get()) {
    return (d.legs || []).reduce(
      (s, l) => s + this.fare(d, Api.flight(l.id).prices[l.cls]) + (l.kg || 0) * BAG_RATE,
      0
    );
  }
};