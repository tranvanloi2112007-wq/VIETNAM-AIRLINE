import '../style/style.css'

const app = document.querySelector('#booking-confirmation-app')
const storedConfirmation = sessionStorage.getItem('bookingConfirmation')
sessionStorage.removeItem('bookingConfirmation')

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
})[character])

const formatCurrency = (amount) => new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0
}).format(amount)

const formatDate = (value, options = {}) => {
  if (!value) return 'Chưa chọn'
  const date = new Date(`${value}T12:00:00`)
  if (Number.isNaN(date.valueOf())) return 'Không hợp lệ'

  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    ...options
  }).format(date)
}

if (!storedConfirmation) {
  app.innerHTML = `
    <main class="confirmation-page-shell">
      <header class="confirmation-header">
        <a class="confirmation-brand" href="/index.html">✈ VIETNAM AIRLINES</a>
      </header>
      <section class="confirmation-empty">
        <span class="confirmation-empty-mark">!</span>
        <p class="confirmation-eyebrow">XÁC NHẬN ĐẶT VÉ</p>
        <h1>Chưa có thông tin xác nhận</h1>
        <p>Hãy chọn chuyến bay và hoàn tất thông tin hành khách trước.</p>
        <a class="confirmation-primary-link" href="/index.html#flight-results">Quay lại chọn chuyến bay</a>
      </section>
    </main>
  `
} else {
  let confirmation
  try {
    confirmation = JSON.parse(storedConfirmation)
  } catch {
    confirmation = null
  }

  if (!confirmation?.flight || !Array.isArray(confirmation.passengers) || confirmation.passengers.length === 0) {
    app.innerHTML = `
      <main class="confirmation-page-shell">
        <header class="confirmation-header">
          <a class="confirmation-brand" href="/index.html">✈ VIETNAM AIRLINES</a>
        </header>
        <section class="confirmation-empty">
          <span class="confirmation-empty-mark">!</span>
          <p class="confirmation-eyebrow">XÁC NHẬN ĐẶT VÉ</p>
          <h1>Dữ liệu xác nhận không hợp lệ</h1>
          <p>Quay lại trang chủ và nhập lại thông tin chuyến bay, hành khách.</p>
          <a class="confirmation-primary-link" href="/index.html#flight-search">Về trang tìm chuyến bay</a>
        </section>
      </main>
    `
  } else {
    const { flight, passengers, tripType, returnDate } = confirmation
    const passengerTotal = passengers.length
    const estimatedTotal = Number(flight.gia) * passengerTotal
    const departureDate = formatDate(flight.ngay, { weekday: 'long' })
    const flightDuration = (() => {
      const [departureHour, departureMinute] = flight.gioDi.split(':').map(Number)
      const [arrivalHour, arrivalMinute] = flight.gioDen.split(':').map(Number)
      let duration = arrivalHour * 60 + arrivalMinute - departureHour * 60 - departureMinute
      if (duration < 0) duration += 24 * 60
      return `${Math.floor(duration / 60)} giờ${duration % 60 ? ` ${duration % 60} phút` : ''}`
    })()
    const passengerCards = passengers.map((passenger, index) => `
      <section class="confirmation-passenger">
        <header>
          <div>
            <p class="confirmation-eyebrow">HÀNH KHÁCH ${String(index + 1).padStart(2, '0')}</p>
            <h3>${escapeHtml(passenger.name)}</h3>
          </div>
          <span>${escapeHtml(passenger.gender)}</span>
        </header>
        <dl class="confirmation-passenger-details">
          <div><dt>Ngày sinh</dt><dd>${escapeHtml(formatDate(passenger.birthDate))}</dd></div>
          <div><dt>Email</dt><dd>${escapeHtml(passenger.email)}</dd></div>
          <div><dt>Số điện thoại</dt><dd>${escapeHtml(passenger.phone)}</dd></div>
          <div><dt>Giấy tờ</dt><dd>${escapeHtml(passenger.documentType)} · ${escapeHtml(passenger.documentNumber)}</dd></div>
        </dl>
      </section>
    `).join('')

    app.innerHTML = `
      <main class="confirmation-page-shell">
        <header class="confirmation-header">
          <a class="confirmation-brand" href="/index.html">✈ VIETNAM AIRLINES</a>
          <span class="confirmation-header-label">THÔNG TIN ĐẶT CHỖ</span>
        </header>

        <div class="confirmation-content">
          <a class="confirmation-back-link" href="/index.html#flight-results">← Quay lại danh sách chuyến bay</a>
          <div class="confirmation-title-row">
            <div>
              <p class="confirmation-eyebrow">XÁC NHẬN ĐẶT VÉ</p>
              <h1>Kiểm tra thông tin hành trình</h1>
              <p class="confirmation-subtitle">Thông tin chuyến bay và hành khách đã nhập</p>
            </div>
            <span class="confirmation-pending-badge">CHỜ XÁC NHẬN</span>
          </div>

          <aside class="confirmation-notice">
            <strong>Vui lòng kiểm tra kỹ thông tin trước khi xác nhận.</strong>
            <span>Trang này chưa kết nối hệ thống đặt chỗ hoặc thanh toán; chưa có mã đặt chỗ hay vé máy bay được phát hành.</span>
          </aside>

          <section class="confirmation-flight-section">
            <header class="confirmation-section-heading">
              <div>
                <p class="confirmation-eyebrow">CHI TIẾT CHUYẾN BAY</p>
                <h2>${escapeHtml(flight.maChuyen)} <span>·</span> ${escapeHtml(flight.hangGhe)}</h2>
              </div>
              <span class="confirmation-trip-type">${escapeHtml(tripType)}</span>
            </header>

            <div class="confirmation-route">
              <div class="confirmation-airport">
                <span>KHỞI HÀNH</span>
                <strong>${escapeHtml(flight.gioDi)}</strong>
                <b>${escapeHtml(flight.diemDi)}</b>
                <small>${escapeHtml(departureDate)}</small>
              </div>
              <div class="confirmation-duration">
                <span>${escapeHtml(flightDuration)}</span>
                <i></i>
                <small>Thời gian bay</small>
              </div>
              <div class="confirmation-airport confirmation-arrival">
                <span>ĐẾN NƠI</span>
                <strong>${escapeHtml(flight.gioDen)}</strong>
                <b>${escapeHtml(flight.diemDen)}</b>
                <small>${escapeHtml(departureDate)}</small>
              </div>
            </div>

            <dl class="confirmation-flight-facts">
              <div><dt>Ngày khởi hành</dt><dd>${escapeHtml(departureDate)}</dd></div>
              <div><dt>Hạng vé</dt><dd>${escapeHtml(flight.hangGhe)}</dd></div>
              ${tripType === 'Khứ hồi' ? `<div><dt>Ngày về</dt><dd>${escapeHtml(formatDate(returnDate, { weekday: 'long' }))}</dd></div>` : ''}
              <div><dt>Số hành khách</dt><dd>${passengerTotal} người</dd></div>
              <div><dt>Giá tham khảo / khách</dt><dd>${formatCurrency(Number(flight.gia))}</dd></div>
              <div class="confirmation-total"><dt>Tổng dự kiến</dt><dd>${formatCurrency(estimatedTotal)}</dd></div>
            </dl>
            <p class="confirmation-price-note">Tạm tính theo cùng giá mẫu cho mỗi khách; chưa áp dụng giá riêng theo độ tuổi, thuế hoặc phí.</p>
          </section>

          <section class="confirmation-passengers-section">
            <header class="confirmation-section-heading">
              <div>
                <p class="confirmation-eyebrow">THÔNG TIN HÀNH KHÁCH</p>
                <h2>${passengerTotal} hồ sơ hành khách</h2>
              </div>
            </header>
            <div class="confirmation-passenger-list">${passengerCards}</div>
          </section>

          <footer class="confirmation-actions">
            <a class="confirmation-secondary-link" href="/index.html#flight-search">Thay đổi thông tin</a>
            <button class="confirmation-confirm-button" id="confirmation-confirm" type="button">Xác nhận đặt vé</button>
          </footer>
          <p class="confirmation-final-status" id="confirmation-final-status" role="status" aria-live="polite"></p>
        </div>
      </main>
    `

    const confirmButton = document.querySelector('#confirmation-confirm')
    confirmButton.addEventListener('click', () => {
      confirmButton.disabled = true
      confirmButton.textContent = 'Đã xác nhận thông tin'
      document.querySelector('#confirmation-final-status').textContent = 'Thông tin đã được xác nhận trên trang. Hệ thống chưa tạo mã đặt chỗ, chưa thanh toán và chưa phát hành vé.'
    })
  }
}
