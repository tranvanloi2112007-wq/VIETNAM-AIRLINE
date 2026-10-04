import { dom } from '../dom.js'
import { formatDateValue, getCityNameFromSelect } from '../utils/format.js'
import { applyFlightFilter } from './flightFilter.js'

const handleSwap = () => {
  const currentFrom = dom.fromCity.value
  dom.fromCity.value = dom.toCity.value
  dom.toCity.value = currentFrom
  applyFlightFilter()
}

const handleSubmit = (event) => {
  event.preventDefault()

  const from = getCityNameFromSelect(dom.fromCity)
  const to = getCityNameFromSelect(dom.toCity)
  const departureDate = formatDateValue('departure')
  const returnDate = formatDateValue('return')
  const tripType = dom.tripRound.checked ? 'Khứ hồi' : 'Một chiều'
  const adult = Number(dom.adultCount.textContent)
  const child = Number(dom.childCount.textContent)
  const infant = Number(dom.infantCount.textContent)
  const selectedCabin = dom.cabinClass.value

  const searchParams = {
    tripType,
    from,
    to,
    departureDate,
    returnDate: tripType === 'Khứ hồi' ? returnDate : null,
    cabinClass: selectedCabin,
    passengers: { adult, child, infant }
  }

  localStorage.setItem('flightSearchParams', JSON.stringify(searchParams))

  const summaryReturn = tripType === 'Khứ hồi' ? `\nNgày về: ${returnDate}` : ''
  alert(`Đã lưu yêu cầu tìm kiếm!\nLoại: ${tripType}\nHành trình: ${from} ➔ ${to}\nNgày đi: ${departureDate}${summaryReturn}\nHạng ghế: ${selectedCabin}\nHành khách: ${adult} Người lớn, ${child} Trẻ em, ${infant} Em bé`)

  applyFlightFilter()
}

export const initSearchForm = () => {
  dom.swapBtn.addEventListener('click', handleSwap)
  dom.searchForm.addEventListener('submit', handleSubmit)

  dom.fromCity.addEventListener('change', applyFlightFilter)
  dom.toCity.addEventListener('change', applyFlightFilter)
  document.querySelectorAll('.date-select').forEach((select) => select.addEventListener('change', applyFlightFilter))
  if (dom.cabinClass) {
    dom.cabinClass.addEventListener('change', applyFlightFilter)
  }
}
