import { dom } from '../dom.js'
import { state } from '../state.js'
import { CITY_NAMES, MAX_PASSENGERS } from '../config/constants.js'
import { getCityCode } from '../utils/format.js'
import { updatePassengerSummary } from './passengers.js'
import { applyFlightFilter } from './flightFilter.js'
import { renderPassengerFields } from './passengerDetails/passengerFields.js'

const isCount = (value) => Number.isInteger(value) && value >= 0

// Khi người dùng bấm "Tiếp tục đặt vé" ở trang chi tiết chuyến bay,
// trang chủ khôi phục lựa chọn và mở thẳng form thông tin hành khách.
export const restorePendingBooking = () => {
  const raw = sessionStorage.getItem('pendingBooking')
  if (!raw) return
  sessionStorage.removeItem('pendingBooking')

  let pending
  try {
    pending = JSON.parse(raw)
  } catch {
    return
  }

  const flight = state.allFlights.find((item) => item.maChuyen === pending.maChuyen && item.ngay === pending.ngay)
  const { adults, children, infants } = pending
  if (!flight || ![adults, children, infants].every(isCount)) return
  if (adults < 1 || infants > adults || adults + children + infants > MAX_PASSENGERS) return

  // Khôi phục tuyến bay, ngày đi, hạng ghế
  const fromCode = getCityCode(flight.diemDi)
  const toCode = getCityCode(flight.diemDen)
  if (CITY_NAMES[fromCode]) dom.fromCity.value = fromCode
  if (CITY_NAMES[toCode]) dom.toCity.value = toCode
  document.querySelector('.date-select[data-date-type="departure"]').value = flight.ngay
  if (Array.from(dom.cabinClass.options).some((option) => option.value === flight.hangGhe)) {
    dom.cabinClass.value = flight.hangGhe
  }

  // Khôi phục loại hành trình
  const isRoundTrip = pending.trip !== 'oneway'
  dom.tripRound.checked = isRoundTrip
  dom.tripOneWay.checked = !isRoundTrip
  dom.tripRound.dispatchEvent(new Event('change'))
  if (isRoundTrip && pending.returnDate) {
    document.querySelector('.date-select[data-date-type="return"]').value = pending.returnDate
  }

  // Khôi phục số hành khách
  dom.adultCount.textContent = adults
  dom.childCount.textContent = children
  dom.infantCount.textContent = infants
  updatePassengerSummary()
  applyFlightFilter()

  state.selectedFlight = flight
  state.extraBaggage = pending.extraBaggage || null
  document.querySelector('#flight-results').scrollIntoView()
  renderPassengerFields(flight)
}