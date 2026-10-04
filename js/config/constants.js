export const CITY_NAMES = {
  HAN: 'Hà Nội',
  SGN: 'TP. Hồ Chí Minh',
  DAD: 'Đà Nẵng',
  CXR: 'Nha Trang'
}

export const MAX_PASSENGERS = 9
export const FARE_CABINS = ['Phổ thông', 'Thương gia']
export const DATA_PATHS = ['/public/data/db.json', '/data/db.json']
export const MAX_VISIBLE_FLIGHTS = 10

// ---- Trang chi tiết chuyến bay ----
export const AIRPORTS = {
  HAN: 'Sân bay quốc tế Nội Bài',
  SGN: 'Sân bay quốc tế Tân Sơn Nhất',
  DAD: 'Sân bay quốc tế Đà Nẵng',
  CXR: 'Sân bay quốc tế Cam Ranh'
}

// Thông tin hành lý mang tính tham khảo (dữ liệu mẫu)
export const BAGGAGE_BY_CABIN = {
  'Phổ thông': { cabin: '10 kg', checked: '23 kg' },
  'Phổ thông đặc biệt': { cabin: '12 kg', checked: '23 kg' },
  'Thương gia': { cabin: '18 kg', checked: '2 × 32 kg' }
}

export const EXTRA_BAGGAGE_OPTIONS = [
  { fee: 0, label: 'Không mua thêm' },
  { fee: 200000, label: '+10 kg' },
  { fee: 350000, label: '+20 kg' },
  { fee: 500000, label: '+30 kg' }
]
