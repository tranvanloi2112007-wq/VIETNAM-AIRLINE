export const bookingSearchTemplate = `
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
`