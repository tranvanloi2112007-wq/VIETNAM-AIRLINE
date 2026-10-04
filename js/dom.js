// Các phần tử DOM dùng chung. Chỉ gọi initDom() SAU KHI đã render HTML.
export const dom = {}

export const initDom = () => {
  Object.assign(dom, {
    // Form tìm kiếm
    searchForm: document.querySelector('#flight-search-form'),
    swapBtn: document.querySelector('#swap-btn'),
    fromCity: document.querySelector('#from-city'),
    toCity: document.querySelector('#to-city'),
    tripRound: document.querySelector('#trip-round'),
    tripOneWay: document.querySelector('#trip-oneway'),
    returnDateGroup: document.querySelector('#return-date-group'),
    cabinClass: document.querySelector('#cabin-class'),

    // Hành khách
    passengerSummary: document.querySelector('#passenger-summary'),
    passengerField: document.querySelector('#passenger-field'),
    passengerToggle: document.querySelector('#passenger-toggle'),
    passengerDone: document.querySelector('#passenger-done'),
    adultCount: document.querySelector('#adult-count'),
    childCount: document.querySelector('#child-count'),
    infantCount: document.querySelector('#infant-count'),

    // Kết quả chuyến bay
    resultsList: document.querySelector('#results-list'),
    resultsSummary: document.querySelector('#results-summary'),
    fareOptions: document.querySelector('#fare-comparison-options'),
    fareRoute: document.querySelector('#fare-comparison-route'),
    fareDate: document.querySelector('#fare-comparison-date'),
    farePassengerSummary: document.querySelector('#fare-passenger-summary'),

    // Dialog thông tin hành khách
    passengerDetailsDialog: document.querySelector('#passenger-details-dialog'),
    passengerDetailsForm: document.querySelector('#passenger-details-form'),
    passengerDetailsList: document.querySelector('#passenger-details-list'),
    passengerDetailsStatus: document.querySelector('#passenger-details-status'),
    passengerFlightSummary: document.querySelector('#passenger-flight-summary'),
    passengerDetailsClose: document.querySelector('#passenger-details-close'),
    passengerDetailsCancel: document.querySelector('#passenger-details-cancel'),

    // Khác
    promotionBtn: document.querySelector('#promotion-btn'),
    flightSearchSection: document.querySelector('#flight-search')
  })
}