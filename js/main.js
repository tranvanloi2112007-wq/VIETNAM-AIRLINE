import './style/style.css'

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
        <button class="login-btn">Đăng nhập</button>
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

      <div class="trip-type">
        <label>
          <input type="radio" name="trip" value="round" checked>
          <span>Khứ hồi</span>
        </label>

        <label>
          <input type="radio" name="trip" value="oneway">
          <span>Một chiều</span>
        </label>
      </div>

      <div class="search-form">

        <div class="form-group">
          <label>Điểm đi</label>
          <div class="input-box">
            <span class="input-icon">⌖</span>
            <div>
              <strong id="from-code">HAN</strong>
              <small id="from-name">Hà Nội</small>
            </div>
          </div>
        </div>

        <button class="swap-btn" id="swap-btn" type="button">
          ⇄
        </button>

        <div class="form-group">
          <label>Điểm đến</label>
          <div class="input-box">
            <span class="input-icon">⌖</span>
            <div>
              <strong id="to-code">SGN</strong>
              <small id="to-name">TP. Hồ Chí Minh</small>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label>Ngày đi</label>
          <div class="input-box">
            <span class="input-icon">▣</span>
            <div>
              <strong>21/10/2026</strong>
              <small>Thứ Tư</small>
            </div>
          </div>
        </div>

        <div class="form-group return-date">
          <label>Ngày về</label>
          <div class="input-box">
            <span class="input-icon">▣</span>
            <div>
              <strong>25/10/2026</strong>
              <small>Chủ Nhật</small>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label>Hành khách</label>
          <div class="input-box">
            <span class="input-icon">♙</span>
            <div>
              <strong>1 Người lớn</strong>
              <small>Phổ thông</small>
            </div>
          </div>
        </div>

        <button class="search-btn" id="search-btn">
          Tìm chuyến bay
        </button>

      </div>

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
          Sải cánh vươn cao – kết nối Việt Nam với thế giới.
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

swapBtn.addEventListener('click', () => {
  const fromCode = document.querySelector('#from-code')
  const fromName = document.querySelector('#from-name')

  const toCode = document.querySelector('#to-code')
  const toName = document.querySelector('#to-name')

  const oldFromCode = fromCode.textContent
  const oldFromName = fromName.textContent

  fromCode.textContent = toCode.textContent
  fromName.textContent = toName.textContent

  toCode.textContent = oldFromCode
  toName.textContent = oldFromName
})

// Nút tìm chuyến bay
document.querySelector('#search-btn').addEventListener('click', () => {
  alert('Đang tìm chuyến bay...')
})

// Nút đặt vé
document.querySelector('#promotion-btn').addEventListener('click', () => {
  document.querySelector('#flight-search').scrollIntoView({
    behavior: 'smooth'
  })
})