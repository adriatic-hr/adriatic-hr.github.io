import React from 'react'
import { addDays } from 'date-fns'
import { isBefore } from 'date-fns'

export default function Price(props) {

  const pricelist = props.pricelistInEuros.map((price, index) => price.pricePerNight)
  const minPrice = Math.min(...pricelist)
  const maxPrice = Math.max(...pricelist)

  function stayCalculator(range, pricelist) {
    let nights = 0
    let price = 0

    if (range.startDate && range.endDate) {
      let startDate = range.startDate

      const sortedPricelist = pricelist.sort(function compareDates(a, b) {
        return new Date(a.intervalStart) - new Date(b.intervalStart)
      })

      function findPrice(date, pricelist) {
        const intervalStart = new Date(pricelist.intervalStart).setHours(0) 
        const intervalEnd = new Date(pricelist.intervalEnd).setHours(0)  // This is a workaround to set time to zero

        if (!isBefore(date, intervalStart) && isBefore(date, intervalEnd))
          return pricelist.pricePerNight
      }

      while (startDate < new Date(range.endDate)) {
        for (let interval of sortedPricelist) {
          let pricePerNight = findPrice(startDate, interval)
          if (pricePerNight) {
            price += pricePerNight
            break
          }

        }
        startDate = addDays(startDate, 1)
        nights++
      }
    }
    return [price, nights]
  }

  const [price, nights] = stayCalculator(props.filters.dateRange, props.pricelistInEuros)

  function renderTotalPrice() {
    return (
      <>
        {price} EUR ({nights} night/s)
      </>
    )
  }

  function renderPriceRange() {
    return (
      <>
        {minPrice} {maxPrice != minPrice ? " - " + maxPrice : null}* EUR <br />
        * Estimated price per night. Select your dates to see the total price!
      </>
    )
  }

  return (
    <div>
      Price: {price ? renderTotalPrice() : renderPriceRange()}
    </div>
  )
}
