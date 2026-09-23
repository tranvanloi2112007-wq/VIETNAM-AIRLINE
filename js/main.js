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
        <button onclick="window.location.href='pages/login.html'" class="login-btn">
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
          Bay cùng Vietnam Airlines – an tâm trên mọi hành trình.
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

      <form id="flight-search-form">
        <div class="trip-type">
          <label>
            <input type="radio" name="trip" value="round" checked id="trip-round">
            <span>Khứ hồi</span>
          </label>
          <label>
            <input type="radio" name="trip" value="oneway" id="trip-oneway">
            <span>Một chiều</span>
          </label>
        </div>

        <div class="search-form">

          <!-- Điểm đi -->
          <div class="form-group">
            <label for="departure">Điểm đi</label>
            <div class="input-box">
              <span class="input-icon">⌖</span>
              <select id="departure" name="departure" required>
                <option value="">-- Chọn điểm đi --</option>
                <option value="HAN" selected>Hà Nội (HAN)</option>
                <option value="SGN">TP. Hồ Chí Minh (SGN)</option>
                <option value="DAD">Đà Nẵng (DAD)</option>
                <option value="CXR">Nha Trang (CXR)</option>
              </select>
            </div>
          </div>

          <!-- Nút Đổi điểm đi/đến -->
          <button class="swap-btn" id="swap-btn" type="button">
            ⇄
          </button>

          <!-- Điểm đến -->
          <div class="form-group">
            <label for="destination">Điểm đến</label>
            <div class="input-box">
              <span class="input-icon">⌖</span>
              <select id="destination" name="destination" required>
                <option value="">-- Chọn điểm đến --</option>
                <option value="HAN">Hà Nội (HAN)</option>
                <option value="SGN" selected>TP. Hồ Chí Minh (SGN)</option>
                <option value="DAD">Đà Nẵng (DAD)</option>
                <option value="CXR">Nha Trang (CXR)</option>
              </select>
            </div>
          </div>

          <!-- Ngày đi -->
          <div class="form-group">
            <label for="departure-date">Ngày đi</label>
            <div class="input-box">
              <span class="input-icon">▣</span>
              <input type="date" id="departure-date" required>
            </div>
          </div>

          <!-- Ngày về -->
          <div class="form-group return-date" id="return-date-group">
            <label for="return-date">Ngày về</label>
            <div class="input-box">
              <span class="input-icon">▣</span>
              <input type="date" id="return-date">
            </div>
          </div>

          <!-- Số hành khách -->
          <div class="form-group">
            <label for="passengers">Hành khách</label>
            <div class="input-box">
              <span class="input-icon">♙</span>
              <input type="number" id="passengers" min="1" max="10" value="1" required>
            </div>
          </div>

          <!-- Nút submit -->
          <button class="search-btn" type="submit" id="search-btn">
            Tìm chuyến bay
          </button>

        </div>
      </form>

    </div>
  </section>

  <!-- QUICK SERVICES -->
  <section class="services" id="services">
    <div class="section-container">
      <div class="section-title">
        <p>DỊCH VỤ CỦA CHÚNG TÔI</p>
        <h2>Đồng hành cùng bạn trên mọi chuyến bay</h2>
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
          Đặt vé ngay hôm nay để bắt đầu hành trình khám phá những điểm đến
          tuyệt vời trên khắp Việt Nam.
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
        <p>Sải cánh vươn cao – kết nối Việt Nam với thế giới.</p>
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

// ------------------- XỬ LÝ LOGIC SỰ KIỆN -------------------

// 1. Set ngày mặc định cho ô Ngày đi (ngày hiện tại)
const departureDateInput = document.querySelector('#departure-date')
if (departureDateInput) {
  departureDateInput.value = new Date().toISOString().split('T')[0]
}

// 2. Ẩn/hiện ô "Ngày về" khi chọn Khứ hồi / Một chiều
const roundTripRadio = document.querySelector('#trip-round')
const oneWayRadio = document.querySelector('#trip-oneway')
const returnDateGroup = document.querySelector('#return-date-group')

roundTripRadio.addEventListener('change', () => {
  returnDateGroup.style.display = 'block'
})

oneWayRadio.addEventListener('change', () => {
  returnDateGroup.style.display = 'none'
})

// 3. Đổi điểm đi / điểm đến (Swap)
const swapBtn = document.querySelector('#swap-btn')
swapBtn.addEventListener('click', () => {
  const departureSelect = document.querySelector('#departure')
  const destinationSelect = document.querySelector('#destination')

  const temp = departureSelect.value
  departureSelect.value = destinationSelect.value
  destinationSelect.value = temp
})

// 4. Xử lý Submit Form Tìm chuyến bay
const flightSearchForm = document.querySelector('#flight-search-form')
flightSearchForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const departure = document.querySelector('#departure').value
  const destination = document.querySelector('#destination').value
  const departureDate = document.querySelector('#departure-date').value
  const returnDate = document.querySelector('#return-date').value
  const passengers = document.querySelector('#passengers').value
  const isRoundTrip = document.querySelector('#trip-round').checked

  if (departure === destination) {
    alert('Điểm đi và điểm đến không được trùng nhau!')
    return
  }

  const searchData = {
    tripType: isRoundTrip ? 'round' : 'oneway',
    departure,
    destination,
    departureDate,
    returnDate: isRoundTrip ? returnDate : null,
    passengers
  }

  // Lưu vào LocalStorage để trang Danh sách chuyến bay sử dụng
  localStorage.setItem('searchFlightQuery', JSON.stringify(searchData))

  console.log('Thông tin tìm kiếm chuyến bay:', searchData)
  alert(`Đang tìm chuyến bay từ ${departure} đến ${destination} ngày ${departureDate} cho ${passengers} hành khách!`)
})

// 5. Nút đặt vé ở phần Promotion
document.querySelector('#promotion-btn').addEventListener('click', () => {
  document.querySelector('#flight-search').scrollIntoView({
    behavior: 'smooth'
  })
})