import '../style/style.css'

import { renderApp } from './templates/index.js'
import { initDom } from './dom.js'
import { state } from './state.js'
import { fetchFlights } from './services/flightService.js'

import { initTripType } from './features/tripType.js'
import { initPassengers } from './features/passengers.js'
import { initPassengerDetails } from './features/passengerDetails/index.js'
import { initSearchForm } from './features/searchForm.js'
import { initPromotion } from './features/promotion.js'
import { initAuth } from './features/auth.js'
import { initBookingMessage } from './features/bookingMessage.js'
import { applyFlightFilter } from './features/flightFilter.js'
import { showLoadError } from './features/flightRenderer.js'
import { restorePendingBooking } from './features/pendingBooking.js'

// 1. Render giao diện, sau đó mới lấy DOM
renderApp()
initDom()

// 2. Khởi tạo các tính năng
initTripType()
initPassengers()
initPassengerDetails()
initSearchForm()
initPromotion()
initBookingMessage()
initAuth()

// 3. Tải dữ liệu chuyến bay
const loadDatabase = async () => {
  const flights = await fetchFlights()

  if (flights) {
    state.allFlights = flights
    applyFlightFilter()
      restorePendingBooking()
  } else {
    showLoadError()
  }
}



loadDatabase()
