type NumberRange<
  Max extends number,
  T extends number[] = []
> = T['length'] extends Max
  ? T[number]
  : NumberRange<
      Max,
      [[...T, any] extends [...infer Compo] ? Compo['length'] : never, ...T]
    >

type Tuple<T extends number, U extends any[] = []> = U['length'] extends T
  ? U
  : Tuple<T, [...U, any]>

type LessThan<A extends number, B extends number> = Tuple<A> extends [
  ...[Tuple<B>, any],
  ...any
]
  ? false
  : true

type IsSafe<T extends number> = LessThan<T, 997> extends true ? false : true
type IsLeapYear<Year extends number> = Year extends 0
  ? true
  : LessThan<Year, 4> extends true
  ? false
  : Tuple<Year> extends [...Tuple<4>, ...infer Rest]
  ? IsLeapYear<Rest['length']>
  : false

type MonthRange = NumberRange<12>

type February = 2
type LunarMonths = 4 | 9 | 11
type MonthDaysRange<
  Month extends number,
  Year extends number = any
> = Month extends February
  ? NumberRange<IsLeapYear<Year> extends true ? 29 : 28>
  : MonthRange extends LunarMonths
  ? NumberRange<30>
  : NumberRange<31>

/**
 *  Compute the day of the year for that date.
 *  计算给定日期是当年的第几天
 *  @param year
 *  @param month
 *  @param day
 *  @returns the day. 天数
 */
export const dayOfYear = (function () {
  const cache = new Map<string, number>()

  return function dayOfYearInner<Year extends number, Month extends MonthRange>(
    year: Year,
    month: Month,
    day: MonthDaysRange<Month, Year>
  ): number {
    const cacheKey = `${year},${month},${day}`

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey)
    }

    const isLeapYear = year % 4 === 0
    const monthDaysMap = getMonthDaysMapByYearType(isLeapYear)

    const result =
      Array.from({ length: month - 1 }, (_, i) => i + 1).reduce(
        (sum, month) => (sum += monthDaysMap.get(month)),
        0
      ) + day

    cache.set(cacheKey, result)

    return result
  }
})()

/**
 * Get the months map of specific year type
 * @param {boolean} isLeapYear if it is leap year
 * @returns
 */
const getMonthDaysMapByYearType = (function () {
  const monthDaysMap = Array.from({ length: 11 }, (_, i) => i + 1).reduce(
    (map, month) => {
      const lunarMonths = [4, 9, 11]
      const totalDays = month === 2 ? 28 : lunarMonths.includes(month) ? 30 : 31
      return map.set(month, totalDays)
    },
    new Map<number, number>()
  )

  return function (isLeapYear: boolean): Map<number, number> {
    monthDaysMap.set(2, isLeapYear ? 29 : 28)
    return monthDaysMap
  }
})()

dayOfYear(800, 2, 29)
