

import { DATA_PATHS } from '../config/constants.js'

// Tạo dữ liệu chuyến bay cho cả năm từ các mẫu chuyến bay
export const createYearlyFlights = (flightTemplates) => {
  const yearlyFlights = []
  const startDate = new Date(Date.UTC(2026, 0, 1))

  flightTemplates.forEach((template) => {
    for (let dayIndex = 0; dayIndex < 365; dayIndex += 1) {
      const date = new Date(startDate)
      date.setUTCDate(startDate.getUTCDate() + dayIndex)

      yearlyFlights.push({
        ...template,
        ngay: date.toISOString().slice(0, 10)
      })
    }
  })

  return yearlyFlights
}

// Tải db.json; trả về mảng chuyến bay hoặc null nếu thất bại
export const fetchFlights = async () => {
  for (const path of DATA_PATHS) {
    try {
      const response = await fetch(path)
      if (response.ok) {
        const data = await response.json()
        return createYearlyFlights(data.flights || [])
      }
    } catch (e) {
      // Thử đường dẫn tiếp theo
    }
  }
  return null
}