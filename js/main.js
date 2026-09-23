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

     
  <div class="header-right">
    <button class="language">VI ▾</button>

    <button onclick="window.location.href='pages/login.html'"
            class="login-btn">
      Đăng nhập
    </button>
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
              <option value="Tất cả">Tất cả</option>
              <option value="Phổ thông">Phổ thông</option>
              <option value="Thương gia">Thương gia</option>
            </select>
          </div>
        </div>

        <div class="form-group passenger-field">
          <label>Số hành khách</label>
          <div class="input-box passenger-box">
            <span class="input-icon">♙</span>
            <div class="passenger-summary" id="passenger-summary">1 Người lớn</div>
            <div class="passenger-menu">
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

      <div class="results-list" id="results-list"></div>
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
          <p>
            Tìm kiếm và lựa chọn chuyến bay phù hợp với hành trình của bạn.
          </p>
          <a href="#flight-search">Tìm hiểu →</a>
        </div>

        <div class="service-card">
          <div class="service-icon">▣</div>
          <h3>Quản lý đặt chỗ</h3>
          <p>
            Kiểm tra thông tin, thay đổi hoặc quản lý đặt chỗ của bạn.
          </p>
          <a href="#booking">Quản lý →</a>
        </div>

        <div class="service-card">
          <div class="service-icon">✓</div>
          <h3>Làm thủ tục trực tuyến</h3>
          <p>
            Tiết kiệm thời gian với dịch vụ check-in trực tuyến.
          </p>
          <a href="#">Check-in →</a>
        </div>

        <div class="service-card">
          <div class="service-icon">♙</div>
          <h3>Hành lý</h3>
          <p>
            Tìm hiểu quy định hành lý và các dịch vụ hành lý của Vietnam Airlines.
          </p>
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
          Đặt vé ngay hôm nay để bắt đầu hành trình khám phá những điểm đến
          tuyệt vời trên khắp Việt Nam.
        </p>
        <button class="promotion-btn" id="promotion-btn">
          Đặt vé ngay
        </button>
      </div>

      <div class="promotion-icon">
        ✈
      </div>
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

        <p>
          Sải cánh vươn cao, kết nối Việt Nam với thế giới.
        </p>
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

// Đổi điểm đi / điểm đến
const swapBtn = document.querySelector('#swap-btn')
const fromCity = document.querySelector('#from-city')
const toCity = document.querySelector('#to-city')

swapBtn.addEventListener('click', () => {
  const currentFrom = fromCity.value
  fromCity.value = toCity.value
  toCity.value = currentFrom

  applyFlightFilter()
})

const tripRound = document.querySelector('#trip-round')
const tripOneWay = document.querySelector('#trip-oneway')
const returnDateGroup = document.querySelector('#return-date-group')
const passengerSummary = document.querySelector('#passenger-summary')
const adultCount = document.querySelector('#adult-count')
const childCount = document.querySelector('#child-count')
const infantCount = document.querySelector('#infant-count')
const cabinClass = document.querySelector('#cabin-class')

const formatDateValue = (type) => {
  return document.querySelector(`.date-select[data-date-type="${type}"]`).value
}

const toggleTripType = () => {
  const isRoundTrip = tripRound.checked
  returnDateGroup.classList.toggle('hidden', !isRoundTrip)
}

tripRound.addEventListener('change', toggleTripType)
tripOneWay.addEventListener('change', toggleTripType)

toggleTripType()

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
}

document.querySelectorAll('.counter-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const type = button.dataset.type
    const action = button.dataset.action
    const valueEl = document.querySelector(`#${type}-count`)
    let value = Number(valueEl.textContent)

    if (action === 'plus') {
      value += 1
    } else if (action === 'minus' && value > 0) {
      value -= 1
    }

    if (type === 'adult' && value === 0) {
      value = 1
    }

    valueEl.textContent = value
    updatePassengerSummary()
  })
})

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
    const cabinText = cabinClass.value === 'Tất cả' ? 'Phổ thông và Thương gia' : cabinClass.value
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
        <button class="flight-book-btn" type="button">Chọn</button>
      </div>
    </article>
  `).join('')
}

const applyFlightFilter = () => {
  const from = getCityNameFromSelect(fromCity)
  const to = getCityNameFromSelect(toCity)
  const selectedCabin = cabinClass.value

  const filteredFlights = allFlights.filter((flight) => {
    const matchesRoute = flight.diemDi === from && flight.diemDen === to
    const matchesCabin = selectedCabin === 'Tất cả' || flight.hangGhe === selectedCabin

    return matchesRoute && matchesCabin
  })

  renderFlights(filteredFlights)
}

fetch('/data/db.json')
  .then((response) => {
    if (!response.ok) throw new Error('Không tìm thấy dữ liệu chuyến bay')
    return response.json()
  })
  .then((data) => {
    allFlights = createYearlyFlights(data.flights || [])
    applyFlightFilter()
  })
  .catch((error) => {
    const list = document.querySelector('#results-list')
    if (list) {
      list.innerHTML = `<div class="flight-empty">${error.message}</div>`
    }
  })

// Nút tìm chuyến bay
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

  const summary = tripType === 'Khứ hồi'
    ? `\nNgày về: ${returnDate}`
    : ''

  alert(`Tìm chuyến bay:\nLoại hành trình: ${tripType}\nĐiểm đi: ${from}\nĐiểm đến: ${to}\nNgày đi: ${departureDate}${summary}\nSố hành khách: ${adult} Người lớn, ${child} Trẻ em, ${infant} Em bé`)

  applyFlightFilter()
})

fromCity.addEventListener('change', applyFlightFilter)
toCity.addEventListener('change', applyFlightFilter)
const dateSelects = document.querySelectorAll('.date-select')
dateSelects.forEach((select) => select.addEventListener('change', applyFlightFilter))
if (cabinClass) {
  cabinClass.addEventListener('change', applyFlightFilter)
}

// Nút đặt vé
document.querySelector('#promotion-btn').addEventListener('click', () => {
  document.querySelector('#flight-search').scrollIntoView({
    behavior: 'smooth'
  })
})