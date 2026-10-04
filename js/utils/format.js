import { CITY_NAMES } from '../config/constants.js'

export const formatCurrency = (value) => new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0
}).format(value)

export const formatDateValue = (type) => {
  const el = document.querySelector(`.date-select[data-date-type="${type}"]`)
  return el ? el.value : ''
}

export const getCityNameFromSelect = (selectElement) => CITY_NAMES[selectElement.value]

export const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
})[character])

// Mã sân bay (HAN, SGN...) từ tên thành phố
export const getCityCode = (cityName) => Object.keys(CITY_NAMES).find((code) => CITY_NAMES[code] === cityName) || ''

// "2026-10-21" -> "Thứ Tư, 21/10/2026"
export const formatLongDate = (value) => {
  const date = new Date(`${value}T12:00:00`)
  if (Number.isNaN(date.valueOf())) return value || ''
  return new Intl.DateTimeFormat('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date)
}

// "07:30", "09:45" -> "2 giờ 15 phút"
export const formatDuration = (departureTime, arrivalTime) => {
  const [departureHour, departureMinute] = departureTime.split(':').map(Number)
  const [arrivalHour, arrivalMinute] = arrivalTime.split(':').map(Number)
  let duration = arrivalHour * 60 + arrivalMinute - departureHour * 60 - departureMinute
  if (duration < 0) duration += 24 * 60
  return `${Math.floor(duration / 60)} giờ${duration % 60 ? ` ${duration % 60} phút` : ''}`
}