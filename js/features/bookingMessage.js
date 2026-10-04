// Hiển thị thông báo đặt vé thành công (được set từ trang xác nhận)
export const initBookingMessage = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const successMessage = sessionStorage.getItem('bookingSuccessMessage')

    if (successMessage) {
      alert(successMessage)
      // Xóa để không lặp lại khi refresh trang
      sessionStorage.removeItem('bookingSuccessMessage')
    }
  })
}
