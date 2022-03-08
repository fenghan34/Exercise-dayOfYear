import {
  assert,
  dayOfYear,
  getMonthDaysMapByYearType,
  isPositiveInteger,
} from './day-of-year'

describe('Compute the day of the year for that date.', () => {
  describe('dayOfYear()', () => {
    it('should throw error with message', () => {
      const msg = 'Invalid date'

      // @ts-ignore
      expect(() => dayOfYear('2022', '3', '1')).toThrowError(msg)

      expect(() => dayOfYear(0, 1, 31)).toThrowError(msg)

      // @ts-ignore
      expect(() => dayOfYear(2022, -1, 31)).toThrowError(msg)

      // @ts-ignore
      expect(() => dayOfYear(2022, 13, 31)).toThrowError(msg)

      // @ts-ignore
      expect(() => dayOfYear(0, 13, 31)).toThrowError(msg)

      // @ts-ignore
      expect(() => dayOfYear(2022, 4, 31)).toThrowError(msg)

      expect(() => dayOfYear(2022, 2, 29)).toThrowError(msg)
    })

    it('should return correct day', () => {
      expect(dayOfYear(2016, 1, 3)).toBe(3)

      expect(dayOfYear(2016, 2, 1)).toBe(32)

      expect(dayOfYear(2022, 1, 1)).toBe(1)

      expect(dayOfYear(2020, 3, 1)).toBe(61)

      expect(dayOfYear(2020, 12, 31)).toBe(366)

      expect(dayOfYear(2022, 12, 31)).toBe(365)
    })
  })

  describe('getMonthDaysMapByYearType()', () => {
    it('should return map', () => {
      expect(getMonthDaysMapByYearType(false) instanceof Map).toBe(true)
    })

    it('should return correct days of each month', () => {
      const days: number[] = Array.from({ length: 12 }, (_, i) => {
        return [4, 6, 9, 11].includes(i + 1) ? 30 : 31
      })

      const genValuesArray = (map: Map<number, number>) => {
        return Array.from(map.values())
      }

      days[1] = 28
      expect(genValuesArray(getMonthDaysMapByYearType(false))).toEqual(days)

      days[1] = 29
      expect(genValuesArray(getMonthDaysMapByYearType(true))).toEqual(days)
    })
  })

  describe('isPositiveInteger()', () => {
    it('should return false', () => {
      expect(isPositiveInteger(0)).toBe(false)

      expect(isPositiveInteger(-1)).toBe(false)

      // @ts-ignore
      expect(isPositiveInteger('11')).toBe(false)
    })

    it('should return true', () => {
      expect(isPositiveInteger(1)).toBe(true)

      expect(isPositiveInteger(100)).toBe(true)
    })
  })

  describe('assert()', () => {
    it('should throw error', () => {
      expect(() => assert(0, 'invalid')).toThrowError('invalid')

      expect(() => assert(undefined, '')).toThrowError('')

      expect(() => assert(false, '')).toThrowError('')

      expect(() => assert(1 > 2, '')).toThrowError('')
    })

    it('should not throw error', () => {
      expect(assert(true, 'invalid')).toBeUndefined()

      expect(assert(2 > 1, '')).toBeUndefined()
    })
  })
})
