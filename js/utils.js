// ===== Cấu hình & chọn phần tử =====
const ROOT = document.body.dataset.root || '';

const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];

// ===== Định dạng dữ liệu =====
const money = n => Number(n).toLocaleString('vi-VN') + ' ₫';

const fmtDate = d => d ? d.split('-').reverse().join('/') : '';

const qs = k => new URLSearchParams(location.search).get(k);

// Chống XSS: thay ký tự đặc biệt bằng mã HTML
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[c]));

// ===== Ngày tháng =====
const pad = n => String(n).padStart(2, '0');

const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const today = () => ymd(new Date());

// Tính tuổi của người sinh ngày dob, tính tại ngày on (dạng YYYY-MM-DD)
const age = (dob, on) => {
  const [a, b, c] = dob.split('-').map(Number);
  const [x, y, z] = on.split('-').map(Number);

  return x - a - ((y < b || (y === b && z < c)) ? 1 : 0);
};

// ===== Giao diện: thông báo & loading =====
function toast(m, t = 'ok') {
  const e = document.createElement('div');
  e.className = 'toast ' + t;
  e.textContent = m;
  document.body.appendChild(e);

  setTimeout(() => e.remove(), 3200);
}

function loading(on) {
  let l = $('#loading');

  if (on && !l) {
    l = document.createElement('div');
    l.id = 'loading';
    l.innerHTML = '<div class="spin"></div>';
    document.body.appendChild(l);
  } else if (!on && l) {
    l.remove();
  }
}

// ===== Kiểm tra dữ liệu nhập =====
const V = {
  email: s => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s),
  phone: s => /^(0|\+84)\d{9}$/.test(s),
  idno: s => /^(\d{12}|[A-Za-z]\d{7})$/.test(s)  // CCCD hoặc hộ chiếu
};

// Hiện/xóa lỗi dưới ô nhập. Trả về true nếu không có lỗi
function setErr(i, m) {
  let e = i.parentElement.querySelector('.err');

  if (!e) {
    e = document.createElement('small');
    e.className = 'err';
    i.parentElement.appendChild(e);
  }

  e.textContent = m || '';
  i.classList.toggle('bad', !!m);

  return !m;
}

// ===== Tạo danh sách <option> cho <select> =====
function opts(map, sel, ph) {
  return (ph ? `<option value="">${ph}</option>` : '')
    + Object.entries(map)
      .map(([k, v]) => `<option value="${k}"${k === sel ? ' selected' : ''}>${esc(v)}</option>`)
      .join('');
}

// ===== Nơi các trang tự đăng ký =====
const Pages = {};