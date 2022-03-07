import assert from 'assert'
import { dayOfYear } from './day-of-year'

const test = (params: Parameters<typeof dayOfYear>, value: number): void => {
  const result = dayOfYear(...params)
  console.log(result)
  assert(result === value, params.join(','))
}

test([2016, 2, 30], 32)
