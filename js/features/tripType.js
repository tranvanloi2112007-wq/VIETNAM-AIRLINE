import { dom } from '../dom.js'

// Chọn loại hành trình (khứ hồi / một chiều)
const toggleTripType = () => {
  const isRoundTrip = dom.tripRound.checked
  dom.returnDateGroup.style.display = isRoundTrip ? 'block' : 'none'
}

export const initTripType = () => {
  dom.tripRound.addEventListener('change', toggleTripType)
  dom.tripOneWay.addEventListener('change', toggleTripType)
  toggleTripType()
}