export function isPositiveInteger(value: number) {
  return Number.isInteger(value) && value > 0
}

export function assert(condition: unknown, msg: string): asserts condition {
  if (!condition)
    throw new Error(msg)
}
