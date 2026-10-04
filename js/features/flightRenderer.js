import { dom } from '../dom.js'
import { state } from '../state.js'
import { FARE_CABINS, MAX_VISIBLE_FLIGHTS } from '../config/constants.js'
import { formatCurrency, formatDateValue, getCityNameFromSelect } from '../utils/format.js'

// ---------- Bảng so sánh giá theo hạng ghế ----------

const getRouteFares = (departureDate) => state.allFlights
  .filter((flight) => flight.diemDi === getCityNameFromSelect(dom.fromCity)
    && flight.diemDen === getCityNameFromSelect(dom.toCity)
    && flight.ngay === departureDate)
  .reduce((fares, flight) => {
    const currentFare = fares[flight.hangGhe]
    if (currentFare === undefined || flight.gia < currentFare.gia) {
      fares[flight.hangGhe] = {
        gia: flight.gia,
        maChuyen: flight.maChuyen,
        gioDi: flight.gioDi
      }
    }
    return fares
  }, {})

const renderFareBreakdown = (unitPrice) => {
  const passengerCategories = [
    { label: 'Người lớn', count: Number(dom.adultCount.textContent) },
    { label: 'Trẻ em', count: Number(dom.childCount.textContent) },
    { label: 'Em bé', count: Number(dom.infantCount.textContent) }
  ]
  const estimatedTotal = passengerCategories.reduce((total, category) => total + category.count * unitPrice, 0)

  return `
    <details class="fare-breakdown">
      <summary>Chi tiết cách tính</summary>
      <dl>
        ${passengerCategories.map((category) => `
          <div>
            <dt>${category.label}<small>${category.count} ×${formatCurrency(unitPrice)}</small></dt>
            <dd>${formatCurrency(category.count * unitPrice)}</dd>
          </div>
        `).join('')}
        <div class="fare-breakdown-total">
          <dt>Tổng dự kiến</dt>
          <dd>${formatCurrency(estimatedTotal)}</dd>
        </div>
      </dl>
    </details>
  `
}

const renderFareComparison = () => {
  const departureDate = formatDateValue('departure')
  const routeFares = getRouteFares(departureDate)

  dom.fareRoute.textContent = `${getCityNameFromSelect(dom.fromCity)} → ${getCityNameFromSelect(dom.toCity)}`

  const fareDate = departureDate ? new Date(`${departureDate}T12:00:00`) : null
  dom.fareDate.textContent = fareDate && !Number.isNaN(fareDate.valueOf())
    ? new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }).format(fareDate)
    : 'Chọn ngày khởi hành'

  const passengerBreakdown = [
    `${dom.adultCount.textContent} người lớn`,
    `${dom.childCount.textContent} trẻ em`,
    `${dom.infantCount.textContent} em bé`
  ].join(' · ')
  const passengerCount = Number(dom.adultCount.textContent)
    + Number(dom.childCount.textContent)
    + Number(dom.infantCount.textContent)
  dom.farePassengerSummary.textContent = `Đang tính cho: ${passengerBreakdown}`

  dom.fareOptions.innerHTML = FARE_CABINS.map((cabin) => `
    <div class="fare-comparison-option${cabin === dom.cabinClass.value ? ' is-active' : ''}${routeFares[cabin] === undefined ? ' is-unavailable' : ''}">
      <span class="fare-cabin-name">${cabin}</span>
      <strong>${routeFares[cabin] === undefined ? 'Chưa có giá mẫu' : formatCurrency(routeFares[cabin].gia)}</strong>
      <small>${routeFares[cabin] === undefined
        ? 'Chưa có dữ liệu cho tuyến và ngày này'
        : `Chuyến ${routeFares[cabin].maChuyen} ·${routeFares[cabin].gioDi} · Giá mẫu / khách`}</small>
      ${routeFares[cabin] === undefined ? '' : `
        <div class="fare-total-row">
          <span>Tổng dự kiến · ${passengerCount} khách</span>
          <strong>${formatCurrency(routeFares[cabin].gia * passengerCount)}</strong>
        </div>
        ${renderFareBreakdown(routeFares[cabin].gia)}
      `}
    </div>
  `).join('')
}

// ---------- Danh sách chuyến bay ----------

// Chọn tối đa 10 chuyến, xoay vòng giữa các hạng ghế
const pickVisibleFlights = (flights) => {
  const visibleFlights = []
  const flightsByCabin = flights.reduce((groups, flight) => {
    const cabinFlights = groups.get(flight.hangGhe) || []
    cabinFlights.push(flight)
    groups.set(flight.hangGhe, cabinFlights)
    return groups
  }, new Map())

  while (visibleFlights.length < MAX_VISIBLE_FLIGHTS) {
    let addedFlight = false

    for (const cabinFlights of flightsByCabin.values()) {
      const nextFlight = cabinFlights[visibleFlights.length % cabinFlights.length]

      if (nextFlight && !visibleFlights.includes(nextFlight)) {
        visibleFlights.push(nextFlight)
        addedFlight = true
      }

      if (visibleFlights.length === MAX_VISIBLE_FLIGHTS) break
    }

    if (!addedFlight) break
  }

  return visibleFlights
}

// Link sang trang chi tiết chuyến bay (kèm số hành khách, loại hành trình)
const getDetailUrl = (flight) => {
  const params = new URLSearchParams({
    code: flight.maChuyen,
    date: flight.ngay,
    adults: dom.adultCount.textContent,
    children: dom.childCount.textContent,
    infants: dom.infantCount.textContent,
    trip: dom.tripRound.checked ? 'round' : 'oneway',
    ret: formatDateValue('return')
  })
  return `/pages/flight-detail.html?${params.toString()}`
}

const renderFlightCard = (flight) => `
  <article class="flight-card">
    <div class="flight-main">
      <div class="flight-code-block">
        <span class="flight-code">${flight.maChuyen}</span>
        <span class="flight-cabin">${flight.hangGhe}</span>
      </div>

      <div class="flight-route">
        <div class="route-point">
          <strong>${flight.gioDi}</strong>
          <span>${flight.diemDi}</span>
        </div>

        <div class="route-line">
          <span></span>
          <small>${flight.ngay}</small>
        </div>

        <div class="route-point right">
          <strong>${flight.gioDen}</strong>
          <span>${flight.diemDen}</span>
        </div>
      </div>
    </div>

    <div class="flight-side">
      <div class="flight-price">${formatCurrency(flight.gia)}</div>
        <a class="flight-detail-link" href="${getDetailUrl(flight)}">Chi tiết</a>   <!-- THÊM -->
      <button class="flight-book-btn" type="button" data-flight-index="${state.allFlights.indexOf(flight)}">Chọn</button>
    </div>
  </article>
`

export const renderFlights = (flights) => {
  renderFareComparison()

  const list = dom.resultsList
  const summary = dom.resultsSummary
  const visibleFlights = pickVisibleFlights(flights)

  if (!list) return

  if (!visibleFlights.length) {
    if (summary) summary.textContent = 'Không có chuyến bay phù hợp với lựa chọn hiện tại.'
    list.innerHTML = '<div class="flight-empty">Không tìm thấy chuyến bay phù hợp.</div>'
    return
  }

  if (summary) {
    const cabinText = dom.cabinClass.value === 'Tất cả' ? 'Tất cả hạng ghế' : dom.cabinClass.value
    summary.textContent = `${getCityNameFromSelect(dom.fromCity)} → ${getCityNameFromSelect(dom.toCity)} · ${visibleFlights.length} chuyến · ${cabinText}`
  }

  list.innerHTML = visibleFlights.map(renderFlightCard).join('')
}

export const showLoadError = () => {
  if (dom.resultsList) {
    dom.resultsList.innerHTML = '<div class="flight-empty">Không tìm thấy dữ liệu chuyến bay từ public/data/db.json</div>'
  }
}
