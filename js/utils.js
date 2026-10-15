const ROOT = document.body.dataset.root || '';
const $ = (s, p = document) => p.querySelector(s), $$ = (s, p = document) => [...p.querySelectorAll(s)];
const money = n => Number(n).toLocaleString('vi-VN') + ' ₫';
const fmtDate = d => d ? d.split('-').reverse().join('/') : '';
const qs = k => new URLSearchParams(location.search).get(k);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad = n => String(n).padStart(2, '0');
const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const today = () => ymd(new Date());
function toast(m, t = 'ok') { const e = document.createElement('div'); e.className = 'toast ' + t; e.textContent = m; document.body.appendChild(e); setTimeout(() => e.remove(), 3200) }
function loading(on) { let l = $('#loading'); if (on && !l) { l = document.createElement('div'); l.id = 'loading'; l.innerHTML = '<div class="spin"></div>'; document.body.appendChild(l) } else if (!on && l) l.remove() }
const V = { email: s => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s), phone: s => /^(0|\+84)\d{9}$/.test(s), idno: s => /^(\d{12}|[A-Za-z]\d{7})$/.test(s) };
function setErr(i, m) { let e = i.parentElement.querySelector('.err'); if (!e) { e = document.createElement('small'); e.className = 'err'; i.parentElement.appendChild(e) } e.textContent = m || ''; i.classList.toggle('bad', !!m); return !m }
function opts(map, sel, ph) { return (ph ? `<option value="">${ph}</option>` : '') + Object.entries(map).map(([k, v]) => `<option value="${k}"${k === sel ? ' selected' : ''}>${esc(v)}</option>`).join('') }
const Pages = {};
const age = (dob, on) => { const [a, b, c] = dob.split('-').map(Number), [x, y, z] = on.split('-').map(Number); return x - a - ((y < b || (y === b && z < c)) ? 1 : 0) };
