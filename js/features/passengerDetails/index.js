import { dom } from '../../dom.js'
import { state } from '../../state.js'
import { formatDateValue } from '../../utils/format.js'
import { showFieldError } from './fieldErrors.js'
import { renderPassengerFields } from './passengerFields.js'

// Thu thập dữ liệu hành khách từ form
const collectPassengers = () => Array.from(dom.passengerDetailsList.querySelectorAll('.passenger-detail-card')).map((card) => {
  const getValue = (suffix) => card.querySelector(`[name$="-${suffix}"]`)?.value.trim() || ''
  const birthDay = card.querySelector('[data-birth-date-part="day"]').value
  const birthMonth = card.querySelector('[data-birth-date-part="month"]').value
  const birthYear = card.querySelector('[data-birth-date-part="year"]').value

  return {
    name: getValue('name'),
    gender: getValue('gender'),
    birthDate: `${birthYear}-${birthMonth}-${birthDay}`,
    email: getValue('email'),
    phone: getValue('phone'),
    documentType: getValue('document-type'),
    documentNumber: getValue('document-number')
  }
})

const handleSubmit = (event) => {
  event.preventDefault()
  if (!state.selectedFlight || !dom.passengerDetailsForm.reportValidity()) return

  const confirmation = {
    flight: state.selectedFlight,
    tripType: dom.tripRound.checked ? 'Khứ hồi' : 'Một chiều',
    returnDate: dom.tripRound.checked ? formatDateValue('return') : '',
    passengers: collectPassengers(),
      extraBaggage: state.extraBaggage          // ← THÊM
  }

  sessionStorage.setItem('bookingConfirmation', JSON.stringify(confirmation))
  window.location.href = '/pages/booking-confirmation.html'
}

export const initPassengerDetails = () => {
  const closeDialog = () => dom.passengerDetailsDialog.close()

  // Hiển thị lỗi khi trình duyệt báo invalid
  dom.passengerDetailsForm.addEventListener('invalid', (event) => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement) {
      showFieldError(event.target)
    }
  }, true)

  // Bấm "Chọn" trên một chuyến bay
  dom.resultsList.addEventListener('click', (event) => {
    const chooseButton = event.target.closest('[data-flight-index]')
    if (!chooseButton) return

    const flight = state.allFlights[Number(chooseButton.dataset.flightIndex)]
    if (flight) {
      state.selectedFlight = flight
      state.extraBaggage = null               // ← THÊM
      renderPassengerFields(flight)
    }
  })

  dom.passengerDetailsClose.addEventListener('click', closeDialog)
  dom.passengerDetailsCancel.addEventListener('click', closeDialog)
  dom.passengerDetailsDialog.addEventListener('click', (event) => {
    if (event.target === dom.passengerDetailsDialog) closeDialog()
  })
  dom.passengerDetailsForm.addEventListener('submit', handleSubmit)
}
