import '../style/flight-detail.css'

import { fetchFlights } from './services/flightService.js'
import { AIRPORTS, BAGGAGE_BY_CABIN, EXTRA_BAGGAGE_OPTIONS, MAX_PASSENGERS } from './config/constants.js'
import { escapeHtml, formatCurrency, formatDuration, formatLongDate, getCityCode } from './utils/format.js'

const app = document.querySelector('#flight-detail-app')
const params = new URLSearchParams(window.location.search)

// ---------- Đọc tham số từ URL ----------
const readCount = (name, fallback) => {
  const value = Number.parseInt(params.get(name), 10)
  return Number.isInteger(value) && value >= 0 ? value : fallback
}

let adults = Math.max(1, readCount('adults', 1))
let children = readCount('children', 0)
let infants = Math.min(readCount('infants', 0), adults)
if (adults + children + infants > MAX_PASSENGERS) {
  adults = 1
  children = 0
  infants = 0
}
const passengerTotal = adults + children + infants

// ---------- Template ----------
const pageHeader = () => `
  <header class="detail-header">
    <a class="detail-brand" href="/index.html">✈ VIETNAM AIRLINES</a>
    <nav class="detail-nav">
      <a href="/index.html">Trang chủ</a>
      <a href="/index.html#flight-search">Tìm chuyến bay</a>
      <a href="/pages/login.html">Đăng nhập</a>
    </nav>
  </header>
`

const renderMessage = (title, text) => {
  app.innerHTML = `
    <div class="detail-shell">
      ${pageHeader()}
      <section class="detail-empty">
        <span class="detail-empty-mark">!</span>
        <h1>${escapeHtml(title)}</h1>
        <p>${escapeHtml(text)}</p>
        <a class="detail-primary-link" href="/index.html#flight-results">Quay lại danh sách chuyến bay</a>
      </section>
    </div>
  `
}

const passengerSummaryText = () => [
  adults ? `${adults} người lớn` : '',
  children ? `${children} trẻ em` : '',
  infants ? `${infants} em bé` : ''
].filter(Boolean).join(' · ')

const renderFlightDetail = (flight) => {
  const fromCode = getCityCode(flight.diemDi)
  const toCode = getCityCode(flight.diemDen)
  const baggage = BAGGAGE_BY_CABIN[flight.hangGhe] || BAGGAGE_BY_CABIN['Phổ thông']
  const longDate = formatLongDate(flight.ngay)

  document.title = `${flight.maChuyen} · ${flight.diemDi} → ${flight.diemDen} | Vietnam Airlines`

  app.innerHTML = `
    <div class="detail-shell">
      ${pageHeader()}

      <main class="detail-content">
        <a class="detail-back-link" href="/index.html#flight-results">← Quay lại danh sách chuyến bay</a>

        <div class="detail-layout">
          <div class="detail-main">
            <section class="detail-card">
              <header class="detail-card-heading">
                <div>
                  <p class="detail-eyebrow">CHI TIẾT CHUYẾN BAY</p>
                  <h1>${escapeHtml(flight.maChuyen)} <span>·</span> ${escapeHtml(flight.diemDi)} → ${escapeHtml(flight.diemDen)}</h1>
                  <p class="detail-subtitle">Vietnam Airlines · ${escapeHtml(longDate)}</p>
                </div>
                <span class="detail-badge">${escapeHtml(flight.hangGhe)}</span>
              </header>

              <div class="detail-route">
                <div class="detail-airport">
                  <span>KHỞI HÀNH</span>
                  <strong>${escapeHtml(flight.gioDi)}</strong>
                  <b>${escapeHtml(flight.diemDi)}${fromCode ? ` (${fromCode})` : ''}</b>
                  <small>${escapeHtml(AIRPORTS[fromCode] || '')}</small>
                </div>
                <div class="detail-duration">
                  <span>${escapeHtml(formatDuration(flight.gioDi, flight.gioDen))}</span>
                  <i></i>
                  <small>Bay thẳng</small>
                </div>
                <div class="detail-airport detail-arrival">
                  <span>ĐẾN NƠI</span>
                  <strong>${escapeHtml(flight.gioDen)}</strong>
                  <b>${escapeHtml(flight.diemDen)}${toCode ? ` (${toCode})` : ''}</b>
                  <small>${escapeHtml(AIRPORTS[toCode] || '')}</small>
                </div>
              </div>
            </section>

            <section class="detail-card">
              <header class="detail-card-heading">
                <div>
                  <p class="detail-eyebrow">DỊCH VỤ ĐI KÈM</p>
                  <h2>Hành lý &amp; tiện ích</h2>
                </div>
              </header>
              <div class="detail-services">
                <div class="detail-service">
                  <span class="detail-service-icon">▣</span>
                  <div><small>Hành lý xách tay</small><strong>${escapeHtml(baggage.cabin)}</strong></div>
                </div>
                <div class="detail-service">
                  <span class="detail-service-icon">♙</span>
                  <div><small>Hành lý ký gửi</small><strong>${escapeHtml(baggage.checked)}</strong></div>
                </div>
                <div class="detail-service">
                  <span class="detail-service-icon">✦</span>
                  <div><small>Suất ăn</small><strong>Có sẵn</strong></div>
                </div>
              </div>
              <p class="detail-note">Thông tin hành lý mang tính tham khảo (dữ liệu mẫu).</p>

              <div class="detail-extra">
                <label for="extra-baggage">Mua thêm hành lý ký gửi (mỗi hành khách)</label>
                <select id="extra-baggage">
                  ${EXTRA_BAGGAGE_OPTIONS.map((option, index) => `
                    <option value="${index}">${escapeHtml(option.label)}${option.fee ? ` (+${formatCurrency(option.fee)})` : ''}</option>
                  `).join('')}
                </select>
              </div>
            </section>
          </div>

          <aside class="detail-summary">
            <p class="detail-eyebrow">TÓM TẮT GIÁ</p>
            <h2>${passengerTotal} hành khách</h2>
            <p class="detail-summary-passengers">${escapeHtml(passengerSummaryText())}</p>
            <dl class="detail-price-list">
              <div><dt>Giá vé / khách</dt><dd>${formatCurrency(flight.gia)}</dd></div>
              <div><dt>Vé × ${passengerTotal}</dt><dd id="fare-subtotal"></dd></div>
              <div><dt>Hành lý mua thêm</dt><dd id="extra-total"></dd></div>
              <div class="detail-price-total"><dt>Tổng dự kiến</dt><dd id="total-price"></dd></div>
            </dl>
            <p class="detail-note">Chưa áp dụng giá riêng theo độ tuổi, thuế hoặc phí.</p>
            <button class="detail-continue" id="continue-btn" type="button">Tiếp tục đặt vé</button>
          </aside>
        </div>
      </main>

      <div class="detail-bar">
        <div>
          <span>Tổng dự kiến</span>
          <strong id="bar-total"></strong>
        </div>
        <button class="detail-continue" id="continue-btn-mobile" type="button">Tiếp tục đặt vé</button>
      </div>
    </div>
  `

  bindInteractions(flight)
}

// ---------- Tương tác ----------
const bindInteractions = (flight) => {
  const select = document.querySelector('#extra-baggage')
  const getExtra = () => EXTRA_BAGGAGE_OPTIONS[Number(select.value)] || EXTRA_BAGGAGE_OPTIONS[0]

  const updatePrices = () => {
    const extra = getExtra()
    const fareSubtotal = flight.gia * passengerTotal
    const extraTotal = extra.fee * passengerTotal
    const total = fareSubtotal + extraTotal

    document.querySelector('#fare-subtotal').textContent = formatCurrency(fareSubtotal)
    document.querySelector('#extra-total').textContent = extra.fee ? formatCurrency(extraTotal) : '—'
    document.querySelector('#total-price').textContent = formatCurrency(total)
    document.querySelector('#bar-total').textContent = formatCurrency(total)
  }

  const continueBooking = () => {
    const extra = getExtra()
    sessionStorage.setItem('pendingBooking', JSON.stringify({
      maChuyen: flight.maChuyen,
      ngay: flight.ngay,
      adults,
      children,
      infants,
      trip: params.get('trip') === 'oneway' ? 'oneway' : 'round',
      returnDate: params.get('ret') || '',
      extraBaggage: extra.fee ? { fee: extra.fee, label: extra.label } : null
    }))
    window.location.href = '/index.html'
  }

  select.addEventListener('change', updatePrices)
  document.querySelector('#continue-btn').addEventListener('click', continueBooking)
  document.querySelector('#continue-btn-mobile').addEventListener('click', continueBooking)
  updatePrices()
}

// ---------- Khởi chạy ----------
const init = async () => {
  const code = params.get('code')
  const date = params.get('date')

  if (!code || !date) {
    renderMessage('Chưa chọn chuyến bay', 'Hãy chọn một chuyến bay từ danh sách để xem chi tiết.')
    return
  }

  app.innerHTML = `<div class="detail-shell">${pageHeader()}<p class="detail-loading">Đang tải thông tin chuyến bay...</p></div>`

  const flights = await fetchFlights()
  if (!flights) {
    renderMessage('Không tải được dữ liệu', 'Không thể đọc dữ liệu chuyến bay từ public/data/db.json.')
    return
  }

  const flight = flights.find((item) => item.maChuyen === code && item.ngay === date)
  if (!flight) {
    renderMessage('Không tìm thấy chuyến bay', 'Chuyến bay này không tồn tại hoặc không khai thác vào ngày đã chọn.')
    return
  }

  renderFlightDetail(flight)
}

init()