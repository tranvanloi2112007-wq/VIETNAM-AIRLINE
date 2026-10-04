import { headerTemplate } from './header.js'
import { heroTemplate } from './hero.js'
import { bookingSearchTemplate } from './bookingSearch.js'
import { flightResultsTemplate } from './flightResults.js'
import { servicesTemplate } from './services.js'
import { destinationsTemplate } from './destinations.js'
import { promotionTemplate } from './promotion.js'
import { footerTemplate } from './footer.js'

export const renderApp = () => {
  document.querySelector('#app').innerHTML = [
    headerTemplate,
    heroTemplate,
    bookingSearchTemplate,
    flightResultsTemplate,
    servicesTemplate,
    destinationsTemplate,
    promotionTemplate,
    footerTemplate
  ].join('\n')
}