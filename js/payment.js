document.addEventListener('DOMContentLoaded', () => {
    // 1. Lấy thông tin đơn hàng từ localStorage
    const currentBooking = JSON.parse(localStorage.getItem('vna_current_booking') || '{}');

    if (currentBooking && currentBooking.pnr) {
        if (document.getElementById('summary-pnr')) document.getElementById('summary-pnr').innerText = currentBooking.pnr;
        if (document.getElementById('pnr-code')) document.getElementById('pnr-code').innerText = currentBooking.pnr;
        
        // Hiển thị thông tin hành trình linh hoạt theo cấu trúc dữ liệu của bạn
        if (document.getElementById('summary-flight')) {
            document.getElementById('summary-flight').innerText = currentBooking.legs && currentBooking.legs[0] ? currentBooking.legs[0].flight.code : (currentBooking.flightCode || 'VN-123');
        }
        if (document.getElementById('summary-route')) {
            document.getElementById('summary-route').innerText = currentBooking.legs && currentBooking.legs[0] ? `${currentBooking.legs[0].flight.from} ➔ ${currentBooking.legs[0].flight.to}` : `${currentBooking.from || 'HAN'} ➔ ${currentBooking.to || 'SGN'}`;
        }
        if (document.getElementById('summary-date')) {
            document.getElementById('summary-date').innerText = currentBooking.legs && currentBooking.legs[0] ? currentBooking.legs[0].flight.date : (currentBooking.date || 'Hôm nay');
        }
        if (document.getElementById('summary-total-price')) {
            const totalPrice = currentBooking.total || currentBooking.totalPrice || 1500000;
            document.getElementById('summary-total-price').innerText = totalPrice.toLocaleString('vi-VN') + ' VNĐ';
        }
    }

    // 2. Chuyển đổi phương thức thanh toán giao diện
    const options = document.querySelectorAll('.pay-option');
    options.forEach(opt => {
        opt.addEventListener('click', () => {
            options.forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            const radio = opt.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
        });
    });

    // 3. Xử lý sự kiện bấm "Xác nhận & Hoàn tất thanh toán"
    const payForm = document.getElementById('payment-form');
    if (payForm) {
        payForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!currentBooking || !currentBooking.pnr) {
                alert('Không tìm thấy thông tin đơn hàng!');
                window.location.href = '../index.html';
                return;
            }

            const db = Api.db();

            // Đánh dấu ghế đã được đặt (taken) vào danh sách chuyến bay thực tế trong db
            if (currentBooking.legs) {
                currentBooking.legs.forEach(l => {
                    const flightId = l.flight ? l.flight.id : l.id;
                    const flightInDb = db.flights.find(x => x.id === flightId);
                    if (flightInDb) {
                        flightInDb.taken = [...(flightInDb.taken || []), ...l.seats];
                    }
                });
            }

            // Cập nhật trạng thái chính thức thành 'Đã đặt' khớp với chuẩn của hệ thống
            currentBooking.status = 'Đã đặt';
            currentBooking.paidAt = new Date().toISOString();

            // Đẩy đơn hàng vào mảng bookings của cơ sở dữ liệu
            db.bookings.push(currentBooking);
            Api.save(db);

            // Xóa bộ nhớ tạm thanh toán
            localStorage.removeItem('vna_current_booking');

            alert('Thanh toán thành công! Vé của bạn đã được xác nhận.');
            
            // Chuyển hướng sang trang xem vé điện tử
            window.location.href = `ticket.html?pnr=${currentBooking.pnr}`;
        });
    }
});