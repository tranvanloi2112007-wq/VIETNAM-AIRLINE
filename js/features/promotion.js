import { dom } from '../dom.js'

export const initPromotion = () => {
  dom.promotionBtn.addEventListener('click', () => {
    dom.flightSearchSection.scrollIntoView({ behavior: 'smooth' })
  })
}
