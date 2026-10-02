// js/search.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('flightSearchForm');

    // 1. LOGIC XỬ LÝ KHI SUBMIT FORM TÌM KIẾM (Tại Trang chủ / Form tìm kiếm)
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const departure = document.getElementById('departure')?.value || '';
            const destination = document.getElementById('destination')?.value || '';
            const departureDate = document.getElementById('departureDate')?.value || '';
            const passengers = document.getElementById('passengers')?.value || '1';
            const cabinClass = document.getElementById('cabinClass')?.value || 'Tất cả';

            // Validation: Kiểm tra điểm đi và điểm đến
            if (departure && destination && departure === destination) {
                alert('Điểm đi và điểm đến không được trùng nhau!');
                return;
            }

            // Đóng gói dữ liệu tìm kiếm
            const searchData = {
                departure,
                destination,
                departureDate,
                passengers: parseInt(passengers, 10) || 1,
                cabinClass
            };

            // Lưu dữ liệu vào localStorage
            localStorage.setItem('searchFlightQuery', JSON.stringify(searchData));
            console.log('Đã lưu dữ liệu tìm kiếm:', searchData);

            // Chuyển hướng sang trang kết quả (ưu tiên flights.html hoặc search.html)
            if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
                window.location.href = './pages/flights.html';
            } else {
                // Nếu đang ở trong thư mục pages/
                window.location.href = './flights.html';
            }
        });
    }

    // 2. LOGIC HIỂN THỊ KẾT QUẢ TÌM KIẾM (Tại Trang kết quả: flights.html / search.html)
    const resultsContainer = document.getElementById('flight-results-list') || document.getElementById('search-results');
    
    if (resultsContainer) {
        renderSearchResults(resultsContainer);
    }
});

/**
 * Hàm đọc dữ liệu từ localStorage và fetch dữ liệu từ db.json để hiển thị
 */
async function renderSearchResults(container) {
    const rawData = localStorage.getItem('searchFlightQuery');
    
    if (!rawData) {
        container.innerHTML = `<div class="flight-empty">Bạn chưa thực hiện tìm kiếm chuyến bay nào.</div>`;
        return;
    }

    const query = JSON.parse(rawData);

    // Hiển thị thông tin tiêu đề tìm kiếm nếu có element
    const searchSummary = document.getElementById('search-summary');
    if (searchSummary) {
        searchSummary.textContent = `Kết quả tìm kiếm: ${query.departure || 'Tất cả'} ➔ ${query.destination || 'Tất cả'} (${query.passengers} hành khách)`;
    }

    try {
        // Đặt đường dẫn động đến db.json phù hợp với cấp thư mục
        const dbPath = window.location.pathname.includes('/pages/') 
            ? '../public/data/db.json' 
            : './public/data/db.json';

        const response = await fetch(dbPath);
        if (!response.ok) throw new Error('Không thể tải dữ liệu db.json');

        const data = await response.json();
        const flights = data.flights || [];

        // Lọc dữ liệu khớp với điều kiện tìm kiếm
        const filteredFlights = flights.filter(flight => {
            const matchDeparture = !query.departure || flight.diemDi.toLowerCase().includes(query.departure.toLowerCase());
            const matchDestination = !query.destination || flight.diemDen.toLowerCase().includes(query.destination.toLowerCase());
            const matchDate = !query.departureDate || flight.ngay === query.departureDate;
            const matchCabin = !query.cabinClass || query.cabinClass === 'Tất cả' || flight.hangGhe === query.cabinClass;

            return matchDeparture && matchDestination && matchDate && matchCabin;
        });

        // Hiển thị kết quả ra giao diện
        if (filteredFlights.length === 0) {
            container.innerHTML = `
                <div class="flight-empty">
                    <h3>Không tìm thấy chuyến bay phù hợp</h3>
                    <p>Vui lòng thử chọn lại ngày khác hoặc đổi lộ trình tìm kiếm.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredFlights.map(flight => {
            const totalPrice = (flight.gia * query.passengers).toLocaleString('vi-VN');
            const pricePerPerson = flight.gia.toLocaleString('vi-VN');

            return `
                <div class="flight-card">
                    <div class="flight-info">
                        <div class="flight-header">
                            <span class="flight-code">${flight.maChuyen}</span>
                            <span class="flight-cabin">${flight.hangGhe}</span>
                        </div>
                        <div class="flight-route">
                            <div class="route-point">
                                <strong>${flight.gioDi}</strong>
                                <span>${flight.diemDi}</span>
                            </div>
                            <div class="route-line">
                                <span>✈</span>
                                <small>${flight.ngay || ''}</small>
                            </div>
                            <div class="route-point">
                                <strong>${flight.gioDen}</strong>
                                <span>${flight.diemDen}</span>
                            </div>
                        </div>
                    </div>
                    <div class="flight-side">
                        <div class="flight-price">${totalPrice} VNĐ</div>
                        ${query.passengers > 1 ? `<small style="color:#64748b;">(${pricePerPerson} VNĐ/khách)</small>` : ''}
                        <br/>
                        <button class="flight-book-btn" onclick="bookFlight('${flight.maChuyen}')">Chọn chuyến</button>
                    </div>
                </div>
            `;
        }).join('');

    } catch (error) {
        console.error('Lỗi khi tải dữ liệu chuyến bay:', error);
        container.innerHTML = `<div class="flight-empty">Có lỗi xảy ra khi tải dữ liệu chuyến bay.</div>`;
    }
}

/**
 * Hàm xử lý khi bấm nút "Chọn chuyến"
 */
function bookFlight(flightCode) {
    alert(`Bạn đã chọn chuyến bay ${flightCode}. Đang chuyển đến trang đặt chỗ!`);
    // Chuyển sang trang đặt vé / thanh toán nếu có:
    // window.location.href = './booking.html?code=' + flightCode;
}