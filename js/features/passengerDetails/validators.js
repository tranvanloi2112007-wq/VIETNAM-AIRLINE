import { showFieldError } from './fieldErrors.js'

export const validateNameField = (nameField) => {
  const name = nameField.value.trim()
  nameField.setCustomValidity(!name
    ? 'Vui lòng nhập họ và tên.'
    : name.length < 2 ? 'Họ và tên cần có ít nhất 2 ký tự.' : '')
  showFieldError(nameField)
}

export const validateEmailField = (emailField) => {
  const email = emailField.value.trim()
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(email)
  emailField.setCustomValidity(!email || isValidEmail ? '' : 'Vui lòng nhập email hợp lệ, ví dụ name@example.com.')
  showFieldError(emailField)
}

export const validatePhoneField = (phoneField) => {
  const enteredPhone = phoneField.value.trim().replace(/[\s().-]/g, '')
  const localPhone = enteredPhone.startsWith('+84')
    ? `0${enteredPhone.slice(3)}`
    : enteredPhone.startsWith('84') ? `0${enteredPhone.slice(2)}` : enteredPhone
  const isValidPhone = /^(?:03[2-9]|05[25689]|07[06-9]|08[1-9]|09[0-9])\d{7}$/.test(localPhone)
  phoneField.setCustomValidity(!enteredPhone || isValidPhone
    ? ''
    : 'Vui lòng nhập số di động Việt Nam hợp lệ gồm 10 số (có thể dùng đầu +84).')
  showFieldError(phoneField)
}

export const validateDocumentNumber = (documentNumberField, documentTypeField) => {
  const documentNumber = documentNumberField.value.trim()
  if (!documentNumber) {
    documentNumberField.setCustomValidity('Vui lòng nhập số giấy tờ.')
  } else if (documentTypeField.value === 'CCCD' && !/^(\d{9}|\d{12})$/.test(documentNumber)) {
    documentNumberField.setCustomValidity('Số CCCD phải gồm 9 hoặc 12 chữ số.')
  } else if (documentTypeField.value === 'Hộ chiếu' && !/^[A-Za-z0-9]{6,20}$/.test(documentNumber)) {
    documentNumberField.setCustomValidity('Số hộ chiếu phải gồm 6-20 ký tự chữ hoặc số.')
  } else {
    documentNumberField.setCustomValidity('')
  }
  showFieldError(documentNumberField)
}
