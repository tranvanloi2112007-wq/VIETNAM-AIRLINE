import '../style/style.css'

document.querySelector('#app').innerHTML = `
  <!-- HEADER -->
  <header class="header">
    <div class="header-container">
      <a href="#" class="logo">
        <span class="logo-icon">✈</span>
        <span>VIETNAM<br>AIRLINES</span>
      </a>

      <nav class="nav">
        <a href="#" class="active">Đặt vé</a>
        <a href="#flight-search">Tìm chuyến bay</a>
        <a href="#booking">Tra cứu vé</a>
        <a href="#services">Dịch vụ</a>
        <a href="#contact">Liên hệ</a>
      </nav>

      <div class="header-right" id="authArea">
        <button class="language">VI ▾</button>

        <!-- Khi CHƯA đăng nhập -->
        <div id="guestGroup" style="display: flex; gap: 10px;">
          <button onclick="window.location.href='pages/login.html'" class="login-btn">
            Đăng nhập
          </button>
        </div>

        <!-- Khi ĐÃ đăng nhập -->
        <div id="userGroup" style="display: none; align-items: center; gap: 8px;">
          <span class="user-icon" style="font-size: 18px;">👤</span>
          <span id="userEmail" style="font-weight: bold; color: #0056b3;"></span>
          <button id="logoutBtn" class="login-btn" style="background-color: #d9534f; border-color: #d9534f; margin-left: 5px;">
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- HERO -->
  <section class="hero">
    <div class="hero-overlay">
      <div class="hero-content">
        <p class="hero-subtitle">WELCOME TO VIETNAM AIRLINES</p>
        <h1>Khám phá Việt Nam<br>theo cách của bạn</h1>
        <p class="hero-text">
          Bay cùng Vietnam Airlines – an tâm trong từng hành trình.
        </p>
      </div>
    </div>
  </section>

  <!-- SEARCH BOOKING -->
  <section class="booking-section" id="flight-search">
    <div class="booking-card">

      <div class="booking-tabs">
        <button class="tab active">Đặt vé</button>
        <button class="tab">Quản lý đặt chỗ</button>
        <button class="tab">Check-in</button>
      </div>

      <div class="trip-type">
        <label>
          <input type="radio" name="trip" value="round" id="trip-round" checked>
          <span>Khứ hồi</span>
        </label>

        <label>
          <input type="radio" name="trip" value="oneway" id="trip-oneway">
          <span>Một chiều</span>
        </label>
      </div>

      <form class="search-form" id="flight-search-form">
        <div class="form-group">
          <label for="from-city">Điểm đi</label>
          <div class="input-box">
            <span class="input-icon">⌖</span>
            <select id="from-city" class="field-control">
              <option value="HAN">Hà Nội (HAN)</option>
              <option value="SGN">TP. Hồ Chí Minh (SGN)</option>
              <option value="DAD">Đà Nẵng (DAD)</option>
              <option value="CXR">Nha Trang (CXR)</option>
            </select>
          </div>
        </div>

        <button class="swap-btn" id="swap-btn" type="button" aria-label="Đổi điểm đi và điểm đến">
          ⇄
        </button>

        <div class="form-group">
          <label for="to-city">Điểm đến</label>
          <div class="input-box">
            <span class="input-icon">⌖</span>
            <select id="to-city" class="field-control">
              <option value="SGN">TP. Hồ Chí Minh (SGN)</option>
              <option value="HAN">Hà Nội (HAN)</option>
              <option value="DAD">Đà Nẵng (DAD)</option>
              <option value="CXR">Nha Trang (CXR)</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>Ngày đi</label>
          <div class="input-box date-box">
            <span class="input-icon">▣</span>
            <input class="field-control date-select" data-date-type="departure" type="date" value="2026-10-21" min="2026-01-01" max="2026-12-31">
          </div>
        </div>

        <div class="form-group" id="return-date-group">
          <label>Ngày về</label>
          <div class="input-box date-box">
            <span class="input-icon">▣</span>
            <input class="field-control date-select" data-date-type="return" type="date" value="2026-10-25" min="2026-01-01" max="2026-12-31">
          </div>
        </div>

        <div class="form-group">
          <label for="cabin-class">Hạng ghế</label>
          <div class="input-box">
            <span class="input-icon">✦</span>
            <select id="cabin-class" class="field-control">
              <option value="Tất cả">Tất cả hạng</option>
              <option value="Phổ thông">Phổ thông</option>
              <option value="Phổ thông đặc biệt">Phổ thông đặc biệt</option>
              <option value="Thương gia">Thương gia</option>
            </select>
          </div>
        </div>

        <div class="form-group passenger-field" id="passenger-field">
          <label for="passenger-toggle">Số hành khách</label>
          <div class="input-box passenger-box">
            <span class="input-icon">♙</span>
            <button class="passenger-toggle" id="passenger-toggle" type="button" aria-expanded="false" aria-controls="passenger-menu">
              <span class="passenger-summary" id="passenger-summary">1 Người lớn</span>
              <span class="passenger-chevron" aria-hidden="true">⌄</span>
            </button>
            <div class="passenger-menu" id="passenger-menu">
              <div class="passenger-row">
                <div>
                  <strong>Người lớn</strong>
                  <small>Từ 12 tuổi</small>
                </div>
                <div class="counter-controls">
                  <button type="button" class="counter-btn" data-type="adult" data-action="minus">−</button>
                  <span id="adult-count">1</span>
                  <button type="button" class="counter-btn" data-type="adult" data-action="plus">＋</button>
                </div>
              </div>

              <div class="passenger-row">
                <div>
                  <strong>Trẻ em</strong>
                  <small>2 - 11 tuổi</small>
                </div>
                <div class="counter-controls">
                  <button type="button" class="counter-btn" data-type="child" data-action="minus">−</button>
                  <span id="child-count">0</span>
                  <button type="button" class="counter-btn" data-type="child" data-action="plus">＋</button>
                </div>
              </div>

              <div class="passenger-row">
                <div>
                  <strong>Em bé</strong>
                  <small>Dưới 2 tuổi</small>
                </div>
                <div class="counter-controls">
                  <button type="button" class="counter-btn" data-type="infant" data-action="minus">−</button>
                  <span id="infant-count">0</span>
                  <button type="button" class="counter-btn" data-type="infant" data-action="plus">＋</button>
                </div>
              </div>
              <div class="passenger-menu-footer">
                <small>Tối đa 9 khách · Mỗi em bé cần một người lớn đi cùng</small>
                <button class="passenger-done" id="passenger-done" type="button">Xong</button>
              </div>
            </div>
          </div>
        </div>

        <button class="search-btn" id="search-btn" type="submit">
          Tìm chuyến bay
        </button>
      </form>

    </div>
  </section>

  <section class="flight-results" id="flight-results">
    <div class="section-container">
      <div class="section-title">
        <p>CHUYẾN BAY GỢI Ý</p>
        <h2>Danh sách chuyến bay mẫu</h2>
        <p class="results-summary" id="results-summary">Đang tải chuyến bay...</p>
      </div>

      <section class="fare-comparison" id="fare-comparison" aria-label="So sánh giá vé theo hạng ghế">
        <div class="fare-comparison-heading">
          <div>
            <p>GIÁ VÉ THEO HẠNG</p>
            <h3 id="fare-comparison-route">Đang tải giá vé...</h3>
          </div>
          <span id="fare-comparison-date"></span>
        </div>
        <div class="fare-comparison-options" id="fare-comparison-options"></div>
        <p class="fare-passenger-summary" id="fare-passenger-summary"></p>
        <p class="fare-comparison-note">Tổng dự kiến = giá mẫu mỗi khách × tổng số khách; chưa áp dụng giá riêng cho trẻ em/em bé, thuế hoặc phí.</p>
      </section>

      <div class="results-list" id="results-list"></div>

      <dialog class="passenger-details-dialog" id="passenger-details-dialog" aria-labelledby="passenger-details-title">
        <form class="passenger-details-panel" id="passenger-details-form">
          <header class="passenger-details-header">
            <div>
              <p>THÔNG TIN ĐẶT CHỖ</p>
              <h2 id="passenger-details-title">Thông tin hành khách</h2>
              <span id="passenger-flight-summary"></span>
            </div>
            <button class="passenger-details-close" id="passenger-details-close" type="button" aria-label="Đóng form">×</button>
          </header>
          <p class="passenger-details-intro">Nhập thông tin riêng cho từng hành khách. Các trường có dấu <b>*</b> là bắt buộc.</p>
          <div class="passenger-details-list" id="passenger-details-list"></div>
          <p class="passenger-details-status" id="passenger-details-status" role="status"></p>
          <footer class="passenger-details-actions">
            <button class="passenger-details-cancel" id="passenger-details-cancel" type="button">Để sau</button>
            <button class="passenger-details-submit" type="submit">Xem xác nhận đặt vé</button>
          </footer>
        </form>
      </dialog>
    </div>
  </section>

  <!-- QUICK SERVICES -->
  <section class="services" id="services">
    <div class="section-container">
      <div class="section-title">
        <p>DỊCH VỤ CỦA CHÚNG TÔI</p>
        <h2>Đồng hành cùng bạn trong mọi chuyến bay</h2>
      </div>

      <div class="service-grid">
        <div class="service-card">
          <div class="service-icon">✈</div>
          <h3>Tìm chuyến bay</h3>
          <p>Tìm kiếm và lựa chọn chuyến bay phù hợp với hành trình của bạn.</p>
          <a href="#flight-search">Tìm hiểu →</a>
        </div>

        <div class="service-card">
          <div class="service-icon">▣</div>
          <h3>Quản lý đặt chỗ</h3>
          <p>Kiểm tra thông tin, thay đổi hoặc quản lý đặt chỗ của bạn.</p>
          <a href="#booking">Quản lý →</a>
        </div>

        <div class="service-card">
          <div class="service-icon">✓</div>
          <h3>Làm thủ tục trực tuyến</h3>
          <p>Tiết kiệm thời gian với dịch vụ check-in trực tuyến.</p>
          <a href="#">Check-in →</a>
        </div>

        <div class="service-card">
          <div class="service-icon">♙</div>
          <h3>Hành lý</h3>
          <p>Tìm hiểu quy định hành lý và các dịch vụ hành lý của Vietnam Airlines.</p>
          <a href="#">Xem thêm →</a>
        </div>
      </div>
    </div>
  </section>

  <!-- POPULAR DESTINATIONS -->
  <section class="destinations">
    <div class="section-container">
      <div class="section-title">
        <p>ĐIỂM ĐẾN PHỔ BIẾN</p>
        <h2>Khám phá những hành trình tuyệt vời</h2>
      </div>

      <div class="destination-grid">
        <div class="destination-card">
          <div class="destination-image hanoi">
            <div class="destination-info">
              <span>HAN</span>
              <h3>Hà Nội</h3>
              <p>Thủ đô ngàn năm văn hiến</p>
            </div>
          </div>
        </div>

        <div class="destination-card">
          <div class="destination-image saigon">
            <div class="destination-info">
              <span>SGN</span>
              <h3>TP. Hồ Chí Minh</h3>
              <p>Thành phố năng động</p>
            </div>
          </div>
        </div>

        <div class="destination-card">
          <div class="destination-image danang">
            <div class="destination-info">
              <span>DAD</span>
              <h3>Đà Nẵng</h3>
              <p>Thành phố đáng sống</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- PROMOTION -->
  <section class="promotion">
    <div class="promotion-container">
      <div>
        <p class="promotion-label">ƯU ĐÃI ĐẶC BIỆT</p>
        <h2>Bay nội địa – Trải nghiệm Việt Nam</h2>
        <p>
          Đặt vé ngay hôm nay để bắt đầu hành trình khám phá những điểm đến tuyệt vời trên khắp Việt Nam.
        </p>
        <button class="promotion-btn" id="promotion-btn">
          Đặt vé ngay
        </button>
      </div>

      <div class="promotion-icon">✈</div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer" id="contact">
    <div class="footer-container">
      <div class="footer-column">
        <div class="footer-logo">
          <span>✈</span>
          <strong>VIETNAM<br>AIRLINES</strong>
        </div>
        <p>Sải cánh vươn cao, kết nối Việt Nam với thế giới.</p>
      </div>

      <div class="footer-column">
        <h3>Đặt vé</h3>
        <a href="#flight-search">Tìm chuyến bay</a>
        <a href="#booking">Quản lý đặt chỗ</a>
        <a href="#">Check-in</a>
      </div>

      <div class="footer-column">
        <h3>Dịch vụ</h3>
        <a href="#">Hành lý</a>
        <a href="#">Suất ăn</a>
        <a href="#">Dịch vụ trên chuyến bay</a>
      </div>

      <div class="footer-column">
        <h3>Hỗ trợ</h3>
        <a href="#">Trung tâm trợ giúp</a>
        <a href="#">Điều khoản sử dụng</a>
        <a href="#">Chính sách bảo mật</a>
      </div>
    </div>

    <div class="footer-bottom">
      <p>© 2026 Vietnam Airlines. Demo project phục vụ mục đích học tập.</p>
    </div>
  </footer>
`

// 1. DOM ELEMENTS (Khai báo tập trung một lần duy nhất)
const swapBtn = document.querySelector('#swap-btn')
const fromCity = document.querySelector('#from-city')
const toCity = document.querySelector('#to-city')
const tripRound = document.querySelector('#trip-round')
const tripOneWay = document.querySelector('#trip-oneway')
const returnDateGroup = document.querySelector('#return-date-group')
const passengerSummary = document.querySelector('#passenger-summary')
const passengerField = document.querySelector('#passenger-field')
const passengerToggle = document.querySelector('#passenger-toggle')
const passengerDone = document.querySelector('#passenger-done')
const adultCount = document.querySelector('#adult-count')
const childCount = document.querySelector('#child-count')
const infantCount = document.querySelector('#infant-count')
const cabinClass = document.querySelector('#cabin-class')

// 2. ĐỔI ĐIỂM ĐI / ĐIỂM ĐẾN
swapBtn.addEventListener('click', () => {
  const currentFrom = fromCity.value
  fromCity.value = toCity.value
  toCity.value = currentFrom
  applyFlightFilter()
})

// 3. CHỌN LOẠI HÀNH TRÌNH (KHỨ HỒI / MỘT CHIỀU)
const formatDateValue = (type) => {
  const el = document.querySelector(`.date-select[data-date-type="${type}"]`)
  return el ? el.value : ''
}

const toggleTripType = () => {
  const isRoundTrip = tripRound.checked
  returnDateGroup.style.display = isRoundTrip ? 'block' : 'none'
}

tripRound.addEventListener('change', toggleTripType)
tripOneWay.addEventListener('change', toggleTripType)
toggleTripType()

// 4. LOGIC BỘ CHỌN SỐ LƯỢNG HÀNH KHÁCH
const updatePassengerSummary = () => {
  const adult = Number(adultCount.textContent)
  const child = Number(childCount.textContent)
  const infant = Number(infantCount.textContent)
  const total = adult + child + infant

  const text = [
    adult ? `${adult} Người lớn` : '',
    child ? `${child} Trẻ em` : '',
    infant ? `${infant} Em bé` : ''
  ].filter(Boolean).join(', ')

  passengerSummary.textContent = total > 0 ? text : '0 hành khách'
  passengerToggle.setAttribute('aria-label', `Hành khách: ${text || '0 hành khách'}`)

  document.querySelectorAll('.counter-btn').forEach((button) => {
    const type = button.dataset.type
    const action = button.dataset.action
    const count = Number(document.querySelector(`#${type}-count`).textContent)

    if (action === 'plus') {
      button.disabled = total >= 9 || (type === 'infant' && infant >= adult)
    } else if (type === 'adult') {
      button.disabled = adult <= Math.max(1, infant)
    } else {
      button.disabled = count === 0
    }
  })
}

document.querySelectorAll('.counter-btn').forEach((button) => {
  button.addEventListener('click', (e) => {
    e.stopPropagation()
    const type = button.dataset.type
    const action = button.dataset.action
    const valueEl = document.querySelector(`#${type}-count`)
    let value = Number(valueEl.textContent)
    const adult = Number(adultCount.textContent)
    const child = Number(childCount.textContent)
    const infant = Number(infantCount.textContent)
    const total = adult + child + infant

    if (action === 'plus') {
      if (total >= 9 || (type === 'infant' && infant >= adult)) return
      value += 1
    } else if (action === 'minus' && value > 0 && (type !== 'adult' || value > Math.max(1, infant))) {
      value -= 1
    }

    valueEl.textContent = value

    if (type === 'adult' && Number(infantCount.textContent) > value) {
      infantCount.textContent = value
    }

    updatePassengerSummary()
    applyFlightFilter()
  })
})

const setPassengerMenuOpen = (isOpen) => {
  passengerField.classList.toggle('is-open', isOpen)
  passengerToggle.setAttribute('aria-expanded', String(isOpen))
}

passengerToggle.addEventListener('click', (e) => {
  e.stopPropagation()
  setPassengerMenuOpen(!passengerField.classList.contains('is-open'))
})

passengerDone.addEventListener('click', () => {
  setPassengerMenuOpen(false)
  passengerToggle.focus()
})

document.addEventListener('click', (event) => {
  if (!passengerField.contains(event.target)) setPassengerMenuOpen(false)
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && passengerField.classList.contains('is-open')) {
    setPassengerMenuOpen(false)
    passengerToggle.focus()
  }
})

updatePassengerSummary()

// 5. HIỂN THỊ VÀ LỌC DỮ LIỆU CHUYẾN BAY
const formatCurrency = (value) => new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0
}).format(value)

const cityNames = {
  HAN: 'Hà Nội',
  SGN: 'TP. Hồ Chí Minh',
  DAD: 'Đà Nẵng',
  CXR: 'Nha Trang'
}

const getCityNameFromSelect = (selectElement) => cityNames[selectElement.value]

let allFlights = []

const createYearlyFlights = (flightTemplates) => {
  const yearlyFlights = []
  const startDate = new Date(Date.UTC(2026, 0, 1))

  flightTemplates.forEach((template) => {
    for (let dayIndex = 0; dayIndex < 365; dayIndex += 1) {
      const date = new Date(startDate)
      date.setUTCDate(startDate.getUTCDate() + dayIndex)

      yearlyFlights.push({
        ...template,
        ngay: date.toISOString().slice(0, 10)
      })
    }
  })

  return yearlyFlights
}

const renderFlights = (flights) => {
  const list = document.querySelector('#results-list')
  const summary = document.querySelector('#results-summary')
  const fareOptionsContainer = document.querySelector('#fare-comparison-options')
  const departureDate = formatDateValue('departure')
  const routeFares = allFlights
    .filter((flight) => flight.diemDi === getCityNameFromSelect(fromCity)
      && flight.diemDen === getCityNameFromSelect(toCity)
      && flight.ngay === departureDate)
    .reduce((fares, flight) => {
      const currentFare = fares[flight.hangGhe]
      if (currentFare === undefined || flight.gia < currentFare.gia) {
        fares[flight.hangGhe] = {
          gia: flight.gia,
          maChuyen: flight.maChuyen,
          gioDi: flight.gioDi
        }
      }
      return fares
    }, {})

  document.querySelector('#fare-comparison-route').textContent = `${getCityNameFromSelect(fromCity)} → ${getCityNameFromSelect(toCity)}`
  const fareDate = departureDate ? new Date(`${departureDate}T12:00:00`) : null
  document.querySelector('#fare-comparison-date').textContent = fareDate && !Number.isNaN(fareDate.valueOf())
    ? new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }).format(fareDate)
    : 'Chọn ngày khởi hành'
  const passengerBreakdown = [
    `${adultCount.textContent} người lớn`,
    `${childCount.textContent} trẻ em`,
    `${infantCount.textContent} em bé`
  ].join(' · ')
  const passengerCount = Number(adultCount.textContent)
    + Number(childCount.textContent)
    + Number(infantCount.textContent)
  document.querySelector('#fare-passenger-summary').textContent = `Đang tính cho: ${passengerBreakdown}`

  const renderFareBreakdown = (unitPrice) => {
    const passengerCategories = [
      { label: 'Người lớn', count: Number(adultCount.textContent) },
      { label: 'Trẻ em', count: Number(childCount.textContent) },
      { label: 'Em bé', count: Number(infantCount.textContent) }
    ]
    const estimatedTotal = passengerCategories.reduce((total, category) => total + category.count * unitPrice, 0)

    return `
      <details class="fare-breakdown">
        <summary>Chi tiết cách tính</summary>
        <dl>
          ${passengerCategories.map((category) => `
            <div>
              <dt>${category.label}<small>${category.count} ×${formatCurrency(unitPrice)}</small></dt>
              <dd>${formatCurrency(category.count * unitPrice)}</dd>
            </div>
          `).join('')}
          <div class="fare-breakdown-total">
            <dt>Tổng dự kiến</dt>
            <dd>${formatCurrency(estimatedTotal)}</dd>
          </div>
        </dl>
      </details>
    `
  }

  fareOptionsContainer.innerHTML = ['Phổ thông', 'Thương gia'].map((cabin) => `
    <div class="fare-comparison-option${cabin === cabinClass.value ? ' is-active' : ''}${routeFares[cabin] === undefined ? ' is-unavailable' : ''}">
      <span class="fare-cabin-name">${cabin}</span>
      <strong>${routeFares[cabin] === undefined ? 'Chưa có giá mẫu' : formatCurrency(routeFares[cabin].gia)}</strong>
      <small>${routeFares[cabin] === undefined
        ? 'Chưa có dữ liệu cho tuyến và ngày này'
        : `Chuyến ${routeFares[cabin].maChuyen} ·${routeFares[cabin].gioDi} · Giá mẫu / khách`}</small>
      ${routeFares[cabin] === undefined ? '' : `
        <div class="fare-total-row">
          <span>Tổng dự kiến · ${passengerCount} khách</span>
          <strong>${formatCurrency(routeFares[cabin].gia * passengerCount)}</strong>
        </div>
        ${renderFareBreakdown(routeFares[cabin].gia)}
      `}
    </div>
  `).join('')

  const visibleFlights = []
  const flightsByCabin = flights.reduce((groups, flight) => {
    const cabinFlights = groups.get(flight.hangGhe) || []
    cabinFlights.push(flight)
    groups.set(flight.hangGhe, cabinFlights)
    return groups
  }, new Map())

  while (visibleFlights.length < 10) {
    let addedFlight = false

    for (const cabinFlights of flightsByCabin.values()) {
      const nextFlight = cabinFlights[visibleFlights.length % cabinFlights.length]

      if (nextFlight && !visibleFlights.includes(nextFlight)) {
        visibleFlights.push(nextFlight)
        addedFlight = true
      }

      if (visibleFlights.length === 10) break
    }

    if (!addedFlight) break
  }

  if (!list) return

  if (!visibleFlights.length) {
    if (summary) summary.textContent = 'Không có chuyến bay phù hợp với lựa chọn hiện tại.'
    list.innerHTML = '<div class="flight-empty">Không tìm thấy chuyến bay phù hợp.</div>'
    return
  }

  if (summary) {
    const cabinText = cabinClass.value === 'Tất cả' ? 'Tất cả hạng ghế' : cabinClass.value
    summary.textContent = `${getCityNameFromSelect(fromCity)} → ${getCityNameFromSelect(toCity)} · ${visibleFlights.length} chuyến · ${cabinText}`
  }

  list.innerHTML = visibleFlights.map((flight) => `
    <article class="flight-card">
      <div class="flight-main">
        <div class="flight-code-block">
          <span class="flight-code">${flight.maChuyen}</span>
          <span class="flight-cabin">${flight.hangGhe}</span>
        </div>

        <div class="flight-route">
          <div class="route-point">
            <strong>${flight.gioDi}</strong>
            <span>${flight.diemDi}</span>
          </div>

          <div class="route-line">
            <span></span>
            <small>${flight.ngay}</small>
          </div>

          <div class="route-point right">
            <strong>${flight.gioDen}</strong>
            <span>${flight.diemDen}</span>
          </div>
        </div>
      </div>

      <div class="flight-side">
        <div class="flight-price">${formatCurrency(flight.gia)}</div>
        <button class="flight-book-btn" type="button" data-flight-index="${allFlights.indexOf(flight)}">Chọn</button>
      </div>
    </article>
  `).join('')
}

const passengerDetailsDialog = document.querySelector('#passenger-details-dialog')
const passengerDetailsForm = document.querySelector('#passenger-details-form')
const passengerDetailsList = document.querySelector('#passenger-details-list')
const passengerDetailsStatus = document.querySelector('#passenger-details-status')
let selectedFlightForConfirmation = null

const getFieldErrorMessage = (field) => {
  const birthDateGroup = field.closest('.passenger-birth-date-selects')
  if (birthDateGroup && Array.from(birthDateGroup.querySelectorAll('select')).some((part) => !part.value)) {
    return 'Vui lòng chọn đầy đủ ngày, tháng và năm sinh.'
  }
  if (field.validity.valueMissing) return 'Vui lòng điền thông tin này.'
  if (field.validity.customError || field.validity.typeMismatch || field.validity.patternMismatch) {
    return field.validationMessage
  }
  if (field.validity.tooShort) return `Vui lòng nhập ít nhất ${field.minLength} ký tự.`
  if (field.validity.rangeOverflow) return 'Ngày sinh không thể ở tương lai.'
  return ''
}

const showFieldError = (field) => {
  const errorElement = field.closest('.passenger-detail-field')?.querySelector('.field-error')
  if (!errorElement) return

  const message = getFieldErrorMessage(field)
  errorElement.textContent = message
  field.setAttribute('aria-invalid', String(Boolean(message)))
}

passengerDetailsForm.addEventListener('invalid', (event) => {
  if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement) {
    showFieldError(event.target)
  }
}, true)

const validateEmailField = (emailField) => {
  const email = emailField.value.trim()
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(email)
  emailField.setCustomValidity(!email || isValidEmail ? '' : 'Vui lòng nhập email hợp lệ, ví dụ name@example.com.')
  showFieldError(emailField)
}

const validatePhoneField = (phoneField) => {
  const enteredPhone = phoneField.value.trim().replace(/[\s().-]/g, '')
  const localPhone = enteredPhone.startsWith('+84')
    ? `0${enteredPhone.slice(3)}`
    : enteredPhone.startsWith('84') ? `0${enteredPhone.slice(2)}` : enteredPhone
  const isValidPhone = /^(?:03[2-9]|05[25689]|07[06-9]|08[1-9]|09[0-9])\d{7}$/.test(localPhone)
  phoneField.setCustomValidity(!enteredPhone || isValidPhone
    ? ''
    : 'Vui lòng nhập số di động Việt Nam hợp lệ gồm 10 số (có thể dùng đầu +84).')
  showFieldError(phoneField)
}

const renderPassengerFields = (flight) => {
  const passengerGroups = [
    { type: 'adult', label: 'Người lớn', count: Number(adultCount.textContent) },
    { type: 'child', label: 'Trẻ em', count: Number(childCount.textContent) },
    { type: 'infant', label: 'Em bé', count: Number(infantCount.textContent) }
  ]
  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth() + 1
  const currentDay = today.getDate()
  const monthOptions = Array.from({ length: 12 }, (_, index) => {
    const month = String(index + 1).padStart(2, '0')
    return `<option value="${month}">Tháng ${index + 1}</option>`
  }).join('')
  const yearOptions = Array.from({ length: currentYear - 1899 }, (_, index) => {
    const year = currentYear - index
    return `<option value="${year}">${year}</option>`
  }).join('')
  const flightDate = new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date(`${flight.ngay}T12:00:00`))

  document.querySelector('#passenger-flight-summary').textContent = `${flight.maChuyen} · ${flight.diemDi} → ${flight.diemDen} · ${flightDate} · ${flight.hangGhe}`
  passengerDetailsStatus.textContent = ''
  passengerDetailsList.innerHTML = passengerGroups.map((group) => Array.from({ length: group.count }, (_, index) => {
    const passengerNumber = index + 1
    const fieldId = `${group.type}-${passengerNumber}`

    return `
      <fieldset class="passenger-detail-card">
        <legend>${group.label} ${passengerNumber}</legend>
        <div class="passenger-detail-grid">
          <div class="passenger-detail-field passenger-detail-full-width">
            <label for="${fieldId}-name">Họ và tên</label>
            <input id="${fieldId}-name" name="${fieldId}-name" type="text" autocomplete="name" minlength="2" maxlength="100" placeholder="Nhập họ tên như trên giấy tờ" aria-describedby="${fieldId}-name-error" required>
            <small class="field-error" id="${fieldId}-name-error" aria-live="polite"></small>
          </div>
          <div class="passenger-detail-field">
            <label for="${fieldId}-gender">Giới tính</label>
            <select id="${fieldId}-gender" name="${fieldId}-gender" required>
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
            <small class="field-error" id="${fieldId}-gender-error" aria-live="polite"></small>
          </div>
          <div class="passenger-detail-field">
            <label for="${fieldId}-email">Email <b aria-hidden="true">*</b></label>
            <input id="${fieldId}-email" name="${fieldId}-email" type="email" autocomplete="email" maxlength="254" placeholder="tenban@email.com" aria-describedby="${fieldId}-email-error" required>
            <small class="field-error" id="${fieldId}-email-error" aria-live="polite"></small>
          </div>
          <div class="passenger-detail-field">
            <label for="${fieldId}-phone">Số điện thoại <b aria-hidden="true">*</b></label>
            <input id="${fieldId}-phone" name="${fieldId}-phone" type="tel" autocomplete="tel" maxlength="20" placeholder="0912 345 678 hoặc +84912 345 678" aria-describedby="${fieldId}-phone-error" required>
            <small class="passenger-field-help">Số di động Việt Nam, có thể dùng đầu số +84.</small>
            <small class="field-error" id="${fieldId}-phone-error" aria-live="polite"></small>
          </div>
          <div class="passenger-detail-field">
            <label for="${fieldId}-birth-day">Ngày sinh</label>
            <div class="passenger-birth-date-selects" aria-describedby="${fieldId}-birth-error">
              <select id="${fieldId}-birth-day" name="${fieldId}-birth-day" data-birth-date-part="day" aria-label="Ngày sinh - ngày" required>
                <option value="">Ngày</option>
                ${Array.from({ length: 31 }, (_, index) => `<option value="${String(index + 1).padStart(2, '0')}">${index + 1}</option>`).join('')}
              </select>
              <select id="${fieldId}-birth-month" name="${fieldId}-birth-month" data-birth-date-part="month" aria-label="Ngày sinh - tháng" required>
                <option value="">Tháng</option>
                ${monthOptions}
              </select>
              <select id="${fieldId}-birth-year" name="${fieldId}-birth-year" data-birth-date-part="year" aria-label="Ngày sinh - năm" required>
                <option value="">Năm</option>
                ${yearOptions}
              </select>
            </div>
            <small class="field-error" id="${fieldId}-birth-error" aria-live="polite"></small>
          </div>
          <div class="passenger-detail-field">
            <label for="${fieldId}-document-type">Loại giấy tờ</label>
            <select id="${fieldId}-document-type" name="${fieldId}-document-type" required>
              <option value="">Chọn loại giấy tờ</option>
              <option value="CCCD">CCCD</option>
              <option value="Hộ chiếu">Hộ chiếu</option>
            </select>
            <small class="field-error" id="${fieldId}-document-type-error" aria-live="polite"></small>
          </div>
          <div class="passenger-detail-field">
            <label for="${fieldId}-document-number">Số CCCD / Hộ chiếu</label>
            <input id="${fieldId}-document-number" name="${fieldId}-document-number" type="text" autocomplete="off" maxlength="20" placeholder="Nhập số giấy tờ" aria-describedby="${fieldId}-document-number-error" required>
            <small class="field-error" id="${fieldId}-document-number-error" aria-live="polite"></small>
          </div>
        </div>
      </fieldset>
    `
  }).join('')).join('')

  passengerDetailsList.querySelectorAll('.passenger-detail-card').forEach((card) => {
    const nameField = card.querySelector('[name$="-name"]')
    const birthDayField = card.querySelector('[data-birth-date-part="day"]')
    const birthMonthField = card.querySelector('[data-birth-date-part="month"]')
    const birthYearField = card.querySelector('[data-birth-date-part="year"]')
    const documentTypeField = card.querySelector('[name$="-document-type"]')
    const documentNumberField = card.querySelector('[name$="-document-number"]')
    const genderField = card.querySelector('[name$="-gender"]')
    const emailField = card.querySelector('[name$="-email"]')
    const phoneField = card.querySelector('[name$="-phone"]')
    const birthDateError = birthDayField.closest('.passenger-detail-field').querySelector('.field-error')
    const birthDateFields = [birthDayField, birthMonthField, birthYearField]

    const refreshBirthDateError = () => {
      if (!birthDateError.textContent) return
      const isComplete = birthDateFields.every((field) => field.value)
      birthDateError.textContent = isComplete ? '' : 'Vui lòng chọn đầy đủ ngày, tháng và năm sinh.'
      birthDateFields.forEach((field) => field.setAttribute('aria-invalid', String(!isComplete)))
    }

    const updateBirthDays = () => {
      const selectedYear = Number(birthYearField.value)
      const selectedMonth = Number(birthMonthField.value)
      const previousDay = Number(birthDayField.value)
      const monthOptions = Array.from(birthMonthField.options)

      monthOptions.forEach((option) => {
        option.disabled = selectedYear === currentYear && Number(option.value) > currentMonth
      })

      if (selectedYear === currentYear && selectedMonth > currentMonth) {
        birthMonthField.value = ''
      }

      const month = Number(birthMonthField.value)
      let dayLimit = selectedYear && month ? new Date(selectedYear, month, 0).getDate() : 31
      if (selectedYear === currentYear && month === currentMonth) {
        dayLimit = Math.min(dayLimit, currentDay)
      }

      birthDayField.innerHTML = `<option value="">Ngày</option>${Array.from({ length: dayLimit }, (_, index) => {
        const day = String(index + 1).padStart(2, '0')
        return `<option value="${day}">${index + 1}</option>`
      }).join('')}`

      if (previousDay > 0 && previousDay <= dayLimit) {
        birthDayField.value = String(previousDay).padStart(2, '0')
      }

      refreshBirthDateError()
    }

    birthMonthField.addEventListener('change', updateBirthDays)
    birthYearField.addEventListener('change', updateBirthDays)
    birthDayField.addEventListener('change', refreshBirthDateError)
    updateBirthDays()

    nameField.addEventListener('input', () => {
      const name = nameField.value.trim()
      nameField.setCustomValidity(!name
        ? 'Vui lòng nhập họ và tên.'
        : name.length < 2 ? 'Họ và tên cần có ít nhất 2 ký tự.' : '')
      showFieldError(nameField)
    })

    const validateDocumentNumber = () => {
      const documentNumber = documentNumberField.value.trim()
      if (!documentNumber) {
        documentNumberField.setCustomValidity('Vui lòng nhập số giấy tờ.')
      } else if (documentTypeField.value === 'CCCD' && !/^(\d{9}|\d{12})$/.test(documentNumber)) {
        documentNumberField.setCustomValidity('Số CCCD phải gồm 9 hoặc 12 chữ số.')
      } else if (documentTypeField.value === 'Hộ chiếu' && !/^[A-Za-z0-9]{6,20}$/.test(documentNumber)) {
        documentNumberField.setCustomValidity('Số hộ chiếu phải gồm 6-20 ký tự chữ hoặc số.')
      } else {
        documentNumberField.setCustomValidity('')
      }
      showFieldError(documentNumberField)
    }

    genderField.addEventListener('change', () => showFieldError(genderField))
    emailField.addEventListener('input', () => validateEmailField(emailField))
    phoneField.addEventListener('input', () => validatePhoneField(phoneField))
    documentTypeField.addEventListener('change', () => {
      showFieldError(documentTypeField)
      validateDocumentNumber()
    })
    documentNumberField.addEventListener('input', validateDocumentNumber)
  })

  passengerDetailsDialog.showModal()
}

document.querySelector('#results-list').addEventListener('click', (event) => {
  const chooseButton = event.target.closest('[data-flight-index]')
  if (!chooseButton) return

  const flight = allFlights[Number(chooseButton.dataset.flightIndex)]
  if (flight) {
    selectedFlightForConfirmation = flight
    renderPassengerFields(flight)
  }
})

document.querySelector('#passenger-details-close').addEventListener('click', () => passengerDetailsDialog.close())
document.querySelector('#passenger-details-cancel').addEventListener('click', () => passengerDetailsDialog.close())
passengerDetailsDialog.addEventListener('click', (event) => {
  if (event.target === passengerDetailsDialog) passengerDetailsDialog.close()
})
passengerDetailsForm.addEventListener('submit', (event) => {
  event.preventDefault()
  if (!selectedFlightForConfirmation || !passengerDetailsForm.reportValidity()) return

  const passengers = Array.from(passengerDetailsList.querySelectorAll('.passenger-detail-card')).map((card) => {
    const getValue = (suffix) => card.querySelector(`[name$="-${suffix}"]`)?.value.trim() || ''
    const birthDay = card.querySelector('[data-birth-date-part="day"]').value
    const birthMonth = card.querySelector('[data-birth-date-part="month"]').value
    const birthYear = card.querySelector('[data-birth-date-part="year"]').value

    return {
      name: getValue('name'),
      gender: getValue('gender'),
      birthDate: `${birthYear}-${birthMonth}-${birthDay}`,
      email: getValue('email'),
      phone: getValue('phone'),
      documentType: getValue('document-type'),
      documentNumber: getValue('document-number')
    }
  })

  const confirmation = {
    flight: selectedFlightForConfirmation,
    tripType: tripRound.checked ? 'Khứ hồi' : 'Một chiều',
    returnDate: tripRound.checked ? formatDateValue('return') : '',
    passengers
  }

  sessionStorage.setItem('bookingConfirmation', JSON.stringify(confirmation))
  window.location.href = '/pages/booking-confirmation.html'
})

const applyFlightFilter = () => {
  const from = getCityNameFromSelect(fromCity)
  const to = getCityNameFromSelect(toCity)
  const departureDate = formatDateValue('departure')
  const selectedCabin = cabinClass.value

  const filteredFlights = allFlights.filter((flight) => {
    const matchesRoute = flight.diemDi === from && flight.diemDen === to
    const matchesDate = flight.ngay === departureDate
    const matchesCabin = selectedCabin === 'Tất cả' || flight.hangGhe === selectedCabin

    return matchesRoute && matchesDate && matchesCabin
  })

  renderFlights(filteredFlights)
}

// 6. TẢI DỮ LIỆU TỪ DB.JSON
const loadDatabase = async () => {
  const paths = ['/public/data/db.json', '/data/db.json']
  for (const path of paths) {
    try {
      const response = await fetch(path)
      if (response.ok) {
        const data = await response.json()
        allFlights = createYearlyFlights(data.flights || [])
        applyFlightFilter()
        return
      }
    } catch (e) {
      // Thử đường dẫn tiếp theo
    }
  }
  const list = document.querySelector('#results-list')
  if (list) list.innerHTML = `<div class="flight-empty">Không tìm thấy dữ liệu chuyến bay từ public/data/db.json</div>`
}

loadDatabase()

// 7. SỰ KIỆN FORM VÀ SỰ KIỆN KHÁC
document.querySelector('#flight-search-form').addEventListener('submit', (event) => {
  event.preventDefault()

  const from = getCityNameFromSelect(fromCity)
  const to = getCityNameFromSelect(toCity)
  const departureDate = formatDateValue('departure')
  const returnDate = formatDateValue('return')
  const tripType = tripRound.checked ? 'Khứ hồi' : 'Một chiều'
  const adult = Number(adultCount.textContent)
  const child = Number(childCount.textContent)
  const infant = Number(infantCount.textContent)
  const selectedCabin = cabinClass.value

  const searchParams = {
    tripType,
    from,
    to,
    departureDate,
    returnDate: tripType === 'Khứ hồi' ? returnDate : null,
    cabinClass: selectedCabin,
    passengers: { adult, child, infant }
  }

  localStorage.setItem('flightSearchParams', JSON.stringify(searchParams))

  const summaryReturn = tripType === 'Khứ hồi' ? `\nNgày về: ${returnDate}` : ''
  alert(`Đã lưu yêu cầu tìm kiếm!\nLoại: ${tripType}\nHành trình: ${from} ➔ ${to}\nNgày đi: ${departureDate}${summaryReturn}\nHạng ghế: ${selectedCabin}\nHành khách: ${adult} Người lớn, ${child} Trẻ em, ${infant} Em bé`)

  applyFlightFilter()
})

fromCity.addEventListener('change', applyFlightFilter)
toCity.addEventListener('change', applyFlightFilter)
document.querySelectorAll('.date-select').forEach((select) => select.addEventListener('change', applyFlightFilter))
if (cabinClass) {
  cabinClass.addEventListener('change', applyFlightFilter)
}

document.querySelector('#promotion-btn').addEventListener('click', () => {
  document.querySelector('#flight-search').scrollIntoView({
    behavior: 'smooth'
  })
})

// 8. XỬ LÝ TRẠNG THÁI ĐĂNG NHẬP & ĐĂNG XUẤT (AUTH)
const checkAuthStatus = () => {
  const guestGroup = document.querySelector('#guestGroup')
  const userGroup = document.querySelector('#userGroup')
  const userEmail = document.querySelector('#userEmail')
  const logoutBtn = document.querySelector('#logoutBtn')

  const token = localStorage.getItem('token')
  const userStr = localStorage.getItem('user')

  if (token && userStr) {
    try {
      const user = JSON.parse(userStr)
      if (guestGroup) guestGroup.style.display = 'none'
      if (userGroup) userGroup.style.display = 'flex'
      if (userEmail) userEmail.textContent = user.name || user.email
    } catch (e) {
      console.error('Lỗi đọc dữ liệu người dùng:', e)
    }
  } else {
    if (guestGroup) guestGroup.style.display = 'flex'
    if (userGroup) userGroup.style.display = 'none'
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      alert('Bạn đã đăng xuất thành công!')
      window.location.reload()
    })
  }
}

checkAuthStatus()