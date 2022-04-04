import { assert, isPositiveInteger } from './utils'

/**
 * Get the number of days in each month according to whether it is a leap year.
 *
 * @param isLeapYear - If it is leap year
 * @returns The number of days in each month
 */
export const getMonthDaysMapByYearType = (function () {
  let monthDaysMap: Map<number, number>

  const LUNAR_MONTHS = [4, 6, 9, 11]
  const FEBRUARY = 2

  return function (isLeapYear: boolean): Map<number, number> {
    if (!monthDaysMap) {
      // initialize map lazily

      const totalMonths = Array.from({ length: 12 }, (_, i) => i + 1)

      monthDaysMap = totalMonths.reduce((map, month) => {
        return map.set(month, LUNAR_MONTHS.includes(month) ? 30 : 31)
      }, new Map())
    }

    monthDaysMap.set(FEBRUARY, isLeapYear ? 29 : 28)

    return monthDaysMap
  }
})()

/**
 * Compute the day of the year for that date.
 *
 * @param year - Year
 * @param month - Month
 * @param day - Day
 * @returns The day of the year for specific date.
 */
export const dayOfYear = (function () {
  const cache = new Map<string, number>()

  return function dayOfYearInner<Year extends number, Month extends MonthRange>(
    year: Year,
    month: Month,
    day: DaysRange<Month>,
  ): number {
    const errorMessage = 'Invalid date'
    const params = [year, month, day]

    // check param types
    params.forEach(() => assert(isPositiveInteger(year), errorMessage))

    // check month
    assert(month <= 12, errorMessage)

    const cacheKey = `${year},${month},${day}`

    if (cache.has(cacheKey)) {
      // if we found cached result
      return cache.get(cacheKey)
    }

    const isLeapYear = year % 4 === 0
    const monthDaysMap = getMonthDaysMapByYearType(isLeapYear)

    // check day
    assert(day <= monthDaysMap.get(month), errorMessage)

    const result
      = Array.from({ length: month - 1 }, (_, i) => i + 1).reduce(
        (sum, month) => (sum += monthDaysMap.get(month)),
        0,
      ) + day

    // save result to cache map
    cache.set(cacheKey, result)

    return result
  }
})()
