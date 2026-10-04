// Hiển thị lỗi cho từng trường trong form thông tin hành khách
export const getFieldErrorMessage = (field) => {
  const birthDateGroup = field.closest('.passenger-birth-date-selects')
  if (birthDateGroup && Array.from(birthDateGroup.querySelectorAll('select')).some((part) => !part.value)) {
    return 'Vui lòng chọn đầy đủ ngày, tháng và năm sinh.'
  }
  if (field.validity.valueMissing) return 'Vui lòng điền thông tin này.'
  if (field.validity.customError || field.validity.typeMismatch || field.validity.patternMismatch) {
    return field.validationMessage
  }
  if (field.validity.tooShort) return `Vui lòng nhập ít nhất ${field.minLength} ký tự.`
  if (field.validity.rangeOverflow) return 'Ngày sinh không thể ở tương lai.'
  return ''
}

export const showFieldError = (field) => {
  const errorElement = field.closest('.passenger-detail-field')?.querySelector('.field-error')
  if (!errorElement) return

  const message = getFieldErrorMessage(field)
  errorElement.textContent = message
  field.setAttribute('aria-invalid', String(Boolean(message)))
}
