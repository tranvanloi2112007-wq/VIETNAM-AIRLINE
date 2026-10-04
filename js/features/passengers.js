import { dom } from '../dom.js'
import { MAX_PASSENGERS } from '../config/constants.js'
import { applyFlightFilter } from './flightFilter.js'

// Cập nhật text tóm tắt và trạng thái disable của các nút +/-
export const updatePassengerSummary = () => {
  const adult = Number(dom.adultCount.textContent)
  const child = Number(dom.childCount.textContent)
  const infant = Number(dom.infantCount.textContent)
  const total = adult + child + infant

  const text = [
    adult ? `${adult} Người lớn` : '',
    child ? `${child} Trẻ em` : '',
    infant ? `${infant} Em bé` : ''
  ].filter(Boolean).join(', ')

  dom.passengerSummary.textContent = total > 0 ? text : '0 hành khách'
  dom.passengerToggle.setAttribute('aria-label', `Hành khách: ${text || '0 hành khách'}`)

  document.querySelectorAll('.counter-btn').forEach((button) => {
    const type = button.dataset.type
    const action = button.dataset.action
    const count = Number(document.querySelector(`#${type}-count`).textContent)

    if (action === 'plus') {
      button.disabled = total >= MAX_PASSENGERS || (type === 'infant' && infant >= adult)
    } else if (type === 'adult') {
      button.disabled = adult <= Math.max(1, infant)
    } else {
      button.disabled = count === 0
    }
  })
}

const setPassengerMenuOpen = (isOpen) => {
  dom.passengerField.classList.toggle('is-open', isOpen)
  dom.passengerToggle.setAttribute('aria-expanded', String(isOpen))
}

const handleCounterClick = (button, e) => {
  e.stopPropagation()
  const type = button.dataset.type
  const action = button.dataset.action
  const valueEl = document.querySelector(`#${type}-count`)
  let value = Number(valueEl.textContent)
  const adult = Number(dom.adultCount.textContent)
  const child = Number(dom.childCount.textContent)
  const infant = Number(dom.infantCount.textContent)
  const total = adult + child + infant

  if (action === 'plus') {
    if (total >= MAX_PASSENGERS || (type === 'infant' && infant >= adult)) return
    value += 1
  } else if (action === 'minus' && value > 0 && (type !== 'adult' || value > Math.max(1, infant))) {
    value -= 1
  }

  valueEl.textContent = value

  if (type === 'adult' && Number(dom.infantCount.textContent) > value) {
    dom.infantCount.textContent = value
  }

  updatePassengerSummary()
  applyFlightFilter()
}

export const initPassengers = () => {
  document.querySelectorAll('.counter-btn').forEach((button) => {
    button.addEventListener('click', (e) => handleCounterClick(button, e))
  })

  dom.passengerToggle.addEventListener('click', (e) => {
    e.stopPropagation()
    setPassengerMenuOpen(!dom.passengerField.classList.contains('is-open'))
  })

  dom.passengerDone.addEventListener('click', () => {
    setPassengerMenuOpen(false)
    dom.passengerToggle.focus()
  })

  document.addEventListener('click', (event) => {
    if (!dom.passengerField.contains(event.target)) setPassengerMenuOpen(false)
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && dom.passengerField.classList.contains('is-open')) {
      setPassengerMenuOpen(false)
      dom.passengerToggle.focus()
    }
  })

  updatePassengerSummary()
  
}