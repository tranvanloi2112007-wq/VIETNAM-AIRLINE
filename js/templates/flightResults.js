export const flightResultsTemplate = `
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
`
