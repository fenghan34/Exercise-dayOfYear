/**
 * Generates a tuple of numeric ranges from a given maximum integer.
 *
 * @example type Example = NumberRange<4> // [1, 2, 3, 4]
 */
type NumberRange<
  Max extends number,
  T extends number[] = [],
> = T['length'] extends Max
  ? T[number]
  : NumberRange<
  Max,
  [[...T, any]['length'], ...T]
  >

/**
 * Month range.
 */
type MonthRange = NumberRange<12>

type February = 2
type LunarMonths = 4 | 6 | 9 | 11

/**
 * Generates a range of days corresponding to a given month.
 *
 * @example type Example = DaysRange<2> // 1 | 2 | 3 | ... | 29
 */
type DaysRange<Month extends number> = Month extends February
  ? NumberRange<29>
  : Month extends LunarMonths
    ? NumberRange<30>
    : NumberRange<31>

/**
 * Generate a tuple of the given length.
 *
 * @example type Example = Tuple<4> // [any, any, any, any]
 */
type Tuple<T extends number, U extends any[] = []> = U['length'] extends T
  ? U
  : Tuple<T, [...U, any]>

/**
 * Determine if it is a leap year.
 *
 * The current maximum supported year is 999
 * since TypeScript has a recursive stack limit.
 *
 * @example type Example = IsLeapYear<200> // true
 */
type IsLeapYear<Year extends number> = Year extends 0
  ? true
  : Year extends 1 | 2 | 3
    ? false
    : Tuple<Year> extends [...Tuple<4>, ...infer Rest]
      ? IsLeapYear<Rest['length']>
      : false
