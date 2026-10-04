export const headerTemplate = `
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
`