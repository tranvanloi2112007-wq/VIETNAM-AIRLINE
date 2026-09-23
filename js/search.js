document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('flightSearchForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const departure = document.getElementById('departure').value;
            const destination = document.getElementById('destination').value;
            const departureDate = document.getElementById('departureDate').value;
            const passengers = document.getElementById('passengers').value;

            // Kiểm tra điểm đi và điểm đến
            if (departure === destination) {
                alert('Điểm đi và điểm đến không được trùng nhau!');
                return;
            }

            // Đóng gói dữ liệu tìm kiếm
            const searchData = {
                departure,
                destination,
                departureDate,
                passengers
            };

            // Lưu dữ liệu vào localStorage để trang danh sách chuyến bay của nhóm dễ dàng lấy ra sử dụng
            localStorage.setItem('searchFlightQuery', JSON.stringify(searchData));

            console.log('Dữ liệu tìm kiếm:', searchData);
            alert(`Đang tìm chuyến bay từ ${departure} đến ${destination} ngày ${departureDate} cho ${passengers} khách.`);
            
            // Nếu nhóm có trang hiển thị kết quả (ví dụ pages/flights.html), bạn bật dòng dưới ra:
            // window.location.href = './flights.html';
        });
    }
});