import { dom } from '../dom.js'
import { state } from '../state.js'
import { formatDateValue, getCityNameFromSelect } from '../utils/format.js'
import { renderFlights } from './flightRenderer.js'

// Lọc chuyến bay theo tuyến, ngày, hạng ghế rồi hiển thị
export const applyFlightFilter = () => {
  const from = getCityNameFromSelect(dom.fromCity)
  const to = getCityNameFromSelect(dom.toCity)
  const departureDate = formatDateValue('departure')
  const selectedCabin = dom.cabinClass.value

  const filteredFlights = state.allFlights.filter((flight) => {
    const matchesRoute = flight.diemDi === from && flight.diemDen === to
    const matchesDate = flight.ngay === departureDate
    const matchesCabin = selectedCabin === 'Tất cả' || flight.hangGhe === selectedCabin

    return matchesRoute && matchesDate && matchesCabin
  })

  renderFlights(filteredFlights)
}
