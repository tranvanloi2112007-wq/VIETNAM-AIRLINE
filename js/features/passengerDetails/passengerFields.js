import { dom } from '../../dom.js'
import { showFieldError } from './fieldErrors.js'
import {
  validateNameField,
  validateEmailField,
  validatePhoneField,
  validateDocumentNumber
} from './validators.js'

// Template HTML cho 1 hành khách
const renderPassengerCard = ({ group, passengerNumber, monthOptions, yearOptions }) => {
  const fieldId = `${group.type}-${passengerNumber}`

  return `
    <fieldset class="passenger-detail-card">
      <legend>${group.label} ${passengerNumber}</legend>
      <div class="passenger-detail-grid">
        <div class="passenger-detail-field passenger-detail-full-width">
          <label for="${fieldId}-name">Họ và tên</label>
          <input id="${fieldId}-name" name="${fieldId}-name" type="text" autocomplete="name" minlength="2" maxlength="100" placeholder="Nhập họ tên như trên giấy tờ" aria-describedby="${fieldId}-name-error" required>
          <small class="field-error" id="${fieldId}-name-error" aria-live="polite"></small>
        </div>
        <div class="passenger-detail-field">
          <label for="${fieldId}-gender">Giới tính</label>
          <select id="${fieldId}-gender" name="${fieldId}-gender" required>
            <option value="">Chọn giới tính</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </select>
          <small class="field-error" id="${fieldId}-gender-error" aria-live="polite"></small>
        </div>
        <div class="passenger-detail-field">
          <label for="${fieldId}-email">Email <b aria-hidden="true">*</b></label>
          <input id="${fieldId}-email" name="${fieldId}-email" type="email" autocomplete="email" maxlength="254" placeholder="tenban@email.com" aria-describedby="${fieldId}-email-error" required>
          <small class="field-error" id="${fieldId}-email-error" aria-live="polite"></small>
        </div>
        <div class="passenger-detail-field">
          <label for="${fieldId}-phone">Số điện thoại <b aria-hidden="true">*</b></label>
          <input id="${fieldId}-phone" name="${fieldId}-phone" type="tel" autocomplete="tel" maxlength="20" placeholder="0912 345 678 hoặc +84912 345 678" aria-describedby="${fieldId}-phone-error" required>
          <small class="passenger-field-help">Số di động Việt Nam, có thể dùng đầu số +84.</small>
          <small class="field-error" id="${fieldId}-phone-error" aria-live="polite"></small>
        </div>
        <div class="passenger-detail-field">
          <label for="${fieldId}-birth-day">Ngày sinh</label>
          <div class="passenger-birth-date-selects" aria-describedby="${fieldId}-birth-error">
            <select id="${fieldId}-birth-day" name="${fieldId}-birth-day" data-birth-date-part="day" aria-label="Ngày sinh - ngày" required>
              <option value="">Ngày</option>
              ${Array.from({ length: 31 }, (_, index) => `<option value="${String(index + 1).padStart(2, '0')}">${index + 1}</option>`).join('')}
            </select>
            <select id="${fieldId}-birth-month" name="${fieldId}-birth-month" data-birth-date-part="month" aria-label="Ngày sinh - tháng" required>
              <option value="">Tháng</option>
              ${monthOptions}
            </select>
            <select id="${fieldId}-birth-year" name="${fieldId}-birth-year" data-birth-date-part="year" aria-label="Ngày sinh - năm" required>
              <option value="">Năm</option>
              ${yearOptions}
            </select>
          </div>
          <small class="field-error" id="${fieldId}-birth-error" aria-live="polite"></small>
        </div>
        <div class="passenger-detail-field">
          <label for="${fieldId}-document-type">Loại giấy tờ</label>
          <select id="${fieldId}-document-type" name="${fieldId}-document-type" required>
            <option value="">Chọn loại giấy tờ</option>
            <option value="CCCD">CCCD</option>
            <option value="Hộ chiếu">Hộ chiếu</option>
          </select>
          <small class="field-error" id="${fieldId}-document-type-error" aria-live="polite"></small>
        </div>
        <div class="passenger-detail-field">
          <label for="${fieldId}-document-number">Số CCCD / Hộ chiếu</label>
          <input id="${fieldId}-document-number" name="${fieldId}-document-number" type="text" autocomplete="off" maxlength="20" placeholder="Nhập số giấy tờ" aria-describedby="${fieldId}-document-number-error" required>
          <small class="field-error" id="${fieldId}-document-number-error" aria-live="polite"></small>
        </div>
      </div>
    </fieldset>
  `
}

// Gắn sự kiện + validate cho 1 card hành khách
const bindPassengerCard = (card, { currentYear, currentMonth, currentDay }) => {
  const nameField = card.querySelector('[name$="-name"]')
  const birthDayField = card.querySelector('[data-birth-date-part="day"]')
  const birthMonthField = card.querySelector('[data-birth-date-part="month"]')
  const birthYearField = card.querySelector('[data-birth-date-part="year"]')
  const documentTypeField = card.querySelector('[name$="-document-type"]')
  const documentNumberField = card.querySelector('[name$="-document-number"]')
  const genderField = card.querySelector('[name$="-gender"]')
  const emailField = card.querySelector('[name$="-email"]')
  const phoneField = card.querySelector('[name$="-phone"]')
  const birthDateError = birthDayField.closest('.passenger-detail-field').querySelector('.field-error')
  const birthDateFields = [birthDayField, birthMonthField, birthYearField]

  const refreshBirthDateError = () => {
    if (!birthDateError.textContent) return
    const isComplete = birthDateFields.every((field) => field.value)
    birthDateError.textContent = isComplete ? '' : 'Vui lòng chọn đầy đủ ngày, tháng và năm sinh.'
    birthDateFields.forEach((field) => field.setAttribute('aria-invalid', String(!isComplete)))
  }

  const updateBirthDays = () => {
    const selectedYear = Number(birthYearField.value)
    const selectedMonth = Number(birthMonthField.value)
    const previousDay = Number(birthDayField.value)
    const monthOptions = Array.from(birthMonthField.options)

    monthOptions.forEach((option) => {
      option.disabled = selectedYear === currentYear && Number(option.value) > currentMonth
    })

    if (selectedYear === currentYear && selectedMonth > currentMonth) {
      birthMonthField.value = ''
    }

    const month = Number(birthMonthField.value)
    let dayLimit = selectedYear && month ? new Date(selectedYear, month, 0).getDate() : 31
    if (selectedYear === currentYear && month === currentMonth) {
      dayLimit = Math.min(dayLimit, currentDay)
    }

    birthDayField.innerHTML = `<option value="">Ngày</option>${Array.from({ length: dayLimit }, (_, index) => {
      const day = String(index + 1).padStart(2, '0')
      return `<option value="${day}">${index + 1}</option>`
    }).join('')}`

    if (previousDay > 0 && previousDay <= dayLimit) {
      birthDayField.value = String(previousDay).padStart(2, '0')
    }

    refreshBirthDateError()
  }

  birthMonthField.addEventListener('change', updateBirthDays)
  birthYearField.addEventListener('change', updateBirthDays)
  birthDayField.addEventListener('change', refreshBirthDateError)
  updateBirthDays()

  nameField.addEventListener('input', () => validateNameField(nameField))
  genderField.addEventListener('change', () => showFieldError(genderField))
  emailField.addEventListener('input', () => validateEmailField(emailField))
  phoneField.addEventListener('input', () => validatePhoneField(phoneField))
  documentTypeField.addEventListener('change', () => {
    showFieldError(documentTypeField)
    validateDocumentNumber(documentNumberField, documentTypeField)
  })
  documentNumberField.addEventListener('input', () => validateDocumentNumber(documentNumberField, documentTypeField))
}

// Render form nhập thông tin cho tất cả hành khách rồi mở dialog
export const renderPassengerFields = (flight) => {
  const passengerGroups = [
    { type: 'adult', label: 'Người lớn', count: Number(dom.adultCount.textContent) },
    { type: 'child', label: 'Trẻ em', count: Number(dom.childCount.textContent) },
    { type: 'infant', label: 'Em bé', count: Number(dom.infantCount.textContent) }
  ]
  const today = new Date()
  const dateInfo = {
    currentYear: today.getFullYear(),
    currentMonth: today.getMonth() + 1,
    currentDay: today.getDate()
  }
  const monthOptions = Array.from({ length: 12 }, (_, index) => {
    const month = String(index + 1).padStart(2, '0')
    return `<option value="${month}">Tháng ${index + 1}</option>`
  }).join('')
  const yearOptions = Array.from({ length: dateInfo.currentYear - 1899 }, (_, index) => {
    const year = dateInfo.currentYear - index
    return `<option value="${year}">${year}</option>`
  }).join('')
  const flightDate = new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date(`${flight.ngay}T12:00:00`))

  dom.passengerFlightSummary.textContent = `${flight.maChuyen} · ${flight.diemDi} → ${flight.diemDen} · ${flightDate} · ${flight.hangGhe}`
  dom.passengerDetailsStatus.textContent = ''
  dom.passengerDetailsList.innerHTML = passengerGroups.map((group) => Array.from({ length: group.count }, (_, index) => (
    renderPassengerCard({ group, passengerNumber: index + 1, monthOptions, yearOptions })
  )).join('')).join('')

  dom.passengerDetailsList.querySelectorAll('.passenger-detail-card').forEach((card) => {
    bindPassengerCard(card, dateInfo)
  })

  dom.passengerDetailsDialog.showModal()
}
