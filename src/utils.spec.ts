/* eslint-disable @typescript-eslint/ban-ts-comment */
import { assert, isPositiveInteger } from './utils'

describe('utils', () => {
  describe('isPositiveInteger()', () => {
    it('should return false', () => {
      expect(isPositiveInteger(0)).toBe(false)

      expect(isPositiveInteger(-1)).toBe(false)

      // @ts-expect-error
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
