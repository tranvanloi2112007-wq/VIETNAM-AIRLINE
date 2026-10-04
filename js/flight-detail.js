document.addEventListener('DOMContentLoaded', () => {
  let currentFlight = null;
  let basePrice = 0;

  // 1. Lấy dữ liệu từ db.json qua fetch API
  async function loadFlightDetail() {
    try {
      // Lấy flightId từ URL parameter (ví dụ: flight-detail.html?id=1)
      const urlParams = new URLSearchParams(window.location.search);
      const flightId = urlParams.get('id') || "1"; // Mặc định là 1 nếu không truyền id

      const response = await fetch('../public/data/db.json');
      const data = await response.json();

      // Tìm chuyến bay trong danh sách flights từ db.json
      currentFlight = data.flights ? data.flights.find(f => f.id == flightId) : null;

      if (!currentFlight) {
        // Mock data dự phòng nếu chưa cấu hình db.json chuẩn
        currentFlight = {
          flightNumber: "VN 123",
          airline: "Vietnam Airlines",
          aircraft: "Airbus A350",
          type: "Bay thẳng",
          duration: "2h 10m",
          departure: { time: "07:30", date: "21/10/2026", airport: "Hà Nội (HAN)", terminal: "Nhà ga T1" },
          arrival: { time: "09:45", date: "21/10/2026", airport: "TP. Hồ Chí Minh (SGN)", terminal: "Nhà ga T1" },
          price: 1450000
        };
      }

      renderFlightInfo(currentFlight);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu chuyến bay:', error);
    }
  }

  // 2. Hiển thị thông tin lên giao diện
  function renderFlightInfo(flight) {
    document.getElementById('airlineName').innerText = flight.airline;
    document.getElementById('flightNumberAndPlane').innerText = `${flight.flightNumber} • ${flight.aircraft || 'Airbus A320'}`;
    document.getElementById('flightType').innerText = flight.type || 'Bay thẳng';

    document.getElementById('depTime').innerText = flight.departure.time;
    document.getElementById('depDate').innerText = flight.departure.date;
    document.getElementById('depAirport').innerText = flight.departure.airport;
    document.getElementById('depTerminal').innerText = flight.departure.terminal;

    document.getElementById('arrTime').innerText = flight.arrival.time;
    document.getElementById('arrDate').innerText = flight.arrival.date;
    document.getElementById('arrAirport').innerText = flight.arrival.airport;
    document.getElementById('arrTerminal').innerText = flight.arrival.terminal;

    document.getElementById('flightDuration').innerText = flight.duration;

    basePrice = flight.price;
    updateTotalPrice();
  }

  // 3. Tính toán tổng tiền khi chọn thêm dịch vụ
  function updateTotalPrice() {
    const extraBaggageFee = parseInt(document.getElementById('extraBaggage').value) || 0;
    const total = basePrice + extraBaggageFee;

    document.getElementById('totalPrice').innerText = total.toLocaleString('vi-VN') + ' VNĐ';
  }

  // Event listener cho ô chọn thêm hành lý
  document.getElementById('extraBaggage').addEventListener('change', updateTotalPrice);

  // Event listener nút Tiếp tục đặt vé
  document.getElementById('btnContinue').addEventListener('click', () => {
    // Chuyển sang trang xác nhận đặt vé
    window.location.href = 'booking-confirmation.html';
  });

  // Chạy ứng dụng
  loadFlightDetail();
});