import {inspect} from 'loupe'

/**
 * Check if two objects are equal
 */
function _deepEqual(obj1: Record<string, never>, obj2: Record<string, never>): boolean {
  if (obj1 === obj2) {
    // it's just the same object. No need to compare.
    return true
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false

  // compare objects with same number of keys
  for (const key in obj1) {
    if (!(key in obj2)) return false //other object doesn't have this prop
    if (!_deepEqual(obj1[key], obj2[key])) return false
  }

  return true
}

/**
 * Fail the assertion by throwing a error with the message provided.
 */
export function fail(message: string): void {
  throw new Error(message)
}

/**
 * Fail the assertion if the condition provided isn't truthy.
 */
export function assert(condition: unknown, message: string): void {
  if (condition) return

  fail(message || `Expected ${inspect(condition)} to be truthy`)
}

/**
 * Fail the assertion if the condition provided isn't truthy.
 */
export function isOk(thing: unknown, message: string): void {
  if (thing) return

  fail(message || `Expected ${inspect(thing)} to be ok`)
}

/**
 * Fail the assertion if the condition provided isn't falsey.
 */
export function isNotOk(thing: unknown, message: string): void {
  if (!thing) return

  fail(message || `Expected ${inspect(thing)} to be not ok`)
}

/**
 * Fail the assertion if the provided `actual` value isn't equal to the
 * provided `expected` value using the `==` operator.
 */
export function equal<T = unknown>(actual: T, expected: T, message: string): void {
  if (actual == expected) return

  fail(message || `Expected ${inspect(actual)} and ${inspect(expected)} to be equal`)
}

/**
 * Fail the assertion if the provided `actual` value is equal to the provided
 * `expected` value using the `==` operator.
 */
export function notEqual<T = unknown>(actual: T, expected: T, message: string): void {
  if (actual != expected) return

  fail(message || `Expected ${inspect(actual)} and ${inspect(expected)} to be not equal`)
}

/**
 * Fail the assertion if the provided `actual` value isn't equal to the provided
 * `expected` value using the `===` operator.
 */
export function strictEqual<T = unknown>(actual: T, expected: T, message: string): void {
  if (actual === expected) return

  fail(message || `Expected ${inspect(actual)} and ${inspect(expected)} to be strict equal`)
}

/**
 * Fail the assertion if the provided `actual` value is equal to the provided
 * `expected` value using the `===` operator.
 */
export function notStrictEqual<T = unknown>(actual: T, expected: T, message: string): void {
  if (actual !== expected) return

  fail(message || `Expected ${inspect(actual)} and ${inspect(expected)} to be not strict equal`)
}

/**
 * Fail the assertion if the provided `actual` object is equal to the provided
 * `expected` object.
 */
export function deepEqual(actual: Record<string, never>, expected: Record<string, never>, message: string): void {
  if (_deepEqual(actual, expected)) return

  fail(message || `Expected ${inspect(expected)} to be equal ${inspect(actual)}`)
}

/**
 * Fail the assertion if the provided `actual` object isn't equal to the provided
 * `expected` object.
 */
export function notDeepEqual(actual: Record<string, never>, expected: Record<string, never>, message: string): void {
  if (!_deepEqual(actual, expected)) return

  fail(message || `Expected ${inspect(expected)} to be equal ${inspect(actual)}`)
}

/**
 * Fail the assertion if the provided `actual` object isn't equal to the provided
 * `expected` object.
 */
export function isAbove(valueToCheck: number, valueToBeAbove: number, message: string): void {
  if (valueToCheck > valueToBeAbove) return

  fail(message || `Expected ${inspect(valueToCheck)} to be higher than ${inspect(valueToBeAbove)}`)
}

/**
 * Fail the assertion if the provided `valueToCheck` number is at least equal
 * or higher than the provided `valueToBeAtLeast` number.
 */
export function isAtLeast(valueToCheck: number, valueToBeAtLeast: number, message: string): void {
  if (valueToCheck >= valueToBeAtLeast) return

  fail(message || `Expected ${inspect(valueToCheck)} to be lower than ${inspect(valueToBeAtLeast)}`)
}

/**
 * Fail the assertion if the provided `valueToCheck` number is at lower than
 * the provided `valueToBeAtLeast` number.
 */
export function isBelow(valueToCheck: number, valueToBeBelow: number, message: string): void {
  if (valueToCheck < valueToBeBelow) return

  fail(message || `Expected ${inspect(valueToCheck)} to be lower than ${inspect(valueToBeBelow)}`)
}

/**
 * Fail the assertion if the provided `value` isn't falsey
 */
export function isTrue(value: unknown, message: string): void {
  if (value === true) return

  fail(message || `Expected ${inspect(value)} to be true`)
}

/**
 * Fail the assertion if the provided `value` isn't truthy
 */
export function isFalse(value: unknown, message: string): void {
  if (value === false) return

  fail(message || `Expected ${inspect(value)} to be false`)
}

/**
 * Fail the assertion if the provided `value` isn't null
 */
export function isNull(value: unknown, message: string): void {
  if (value === null) return

  fail(message || `Expected ${inspect(value)} to be null`)
}

/**
 * Fail the assertion if the provided `value` is null
 */
export function isNotNull(value: unknown, message: string): void {
  if (value !== null) return

  fail(message || `Expected ${inspect(value)} to be not null`)
}

/**
 * Fail the assertion if the provided `value` is undefined
 */
export function isUndefined(value: unknown, message: string): void {
  if (value === undefined) return

  fail(message || `Expected ${inspect(value)} to be undefined`)
}

/**
 * Fail the assertion if the provided `value` isn't a instance of the provided
 * `construct` value.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function instanceOf(value: unknown, construct: Function, message: string): void {
  if (value instanceof construct) return

  fail(message || `Expected ${inspect(value)} to be a instance of ${inspect(construct)}`)
}

/**
 * Fail the assertion if the provided `needle` value isn't included in the
 * provided `haystack` array.
 */
export function include(haystack: unknown[], needle: unknown, message: string): void {
  if (haystack.includes(needle)) return

  fail(message || `Expected ${inspect(haystack)} to include ${inspect(needle)}`)
}

/**
 * Fail the assertion if the provided `needle` value is included in the
 * provided `haystack` array.
 */
export function notInclude(haystack: unknown[], needle: unknown, message: string): void {
  if (!haystack.includes(needle)) return

  fail(message || `Expected ${inspect(haystack)} to not include ${inspect(needle)}`)
}

/**
 * Fail the assertion if the provided `value` value doesn't match the `regexp`
 * value.
 */
export function match(value: string, regexp: string | RegExp, message: string): void {
  if (value.match(regexp)) return

  fail(message || `Expected ${inspect(value)} to match ${inspect(regexp)}`)
}

/**
 * Fail the assertion if the provided object doesn't have each and every key
 * that is provided and no other keys.
 */
export function hasAllKeys(thing: Record<string, never>, keys: string[], message: string): void {
  const objectKeys = Object.keys(thing)
  const allKeys = objectKeys.length === keys.length && keys.every(key => objectKeys.includes(key))
  if (allKeys) return

  fail(message || `Expected ${inspect(objectKeys)} to include ${inspect(keys)} and only those keys`)
}

/**
 * Fail the assertion if the provided object doesn't have each and every key
 * that is provided. The object can have other keys.
 */
export function containsAllKeys(thing: Record<string, never>, keys: string[], message: string): void {
  const allKeys = keys.every(key => Object.keys(thing).includes(key))
  if (allKeys) return

  fail(message || `Expected ${inspect(Object.keys(thing))} to include all the keys: ${inspect(keys)}`)
}

/**
 * Fail the assertion if the provided object doesn't throw a error. Also fail
 * the assertion if the error message doesn't match the provided `errorLike`
 * value.
 */
export function throws(fn: () => void, errorLike: string | RegExp): void {
  try {
    fn()
  } catch (error) {
    if (!(error instanceof Error)) return
    if (error.message.match(errorLike)) return
    fail(`Expected error message ${inspect(error.message)} to match ${inspect(errorLike)}`)
  }
  fail(`Expected function to throw`)
}

/**
 * Fail the assertion if the provided `target` value isn't empty.
 */
export function isEmpty(target: string | unknown[] | NodeList | Map<unknown, unknown> | Set<unknown>): void {
  if (typeof target === 'string' || target instanceof Array || target instanceof NodeList) {
    if (target.length === 0) return
    fail(`Expected ${inspect(target)} to be empty`)
  } else if (target instanceof Map || target instanceof Set) {
    if (target.size === 0) return
    fail(`Expected ${inspect(target)} to be empty`)
  }
  fail(`Didn't know how to check if ${inspect(target)} is empty`)
}

/**
 * Fail the assertion if the provided `target` value is empty.
 */
export function isNotEmpty(target: string | unknown[] | NodeList | Map<unknown, unknown> | Set<unknown>): void {
  if (typeof target === 'string' || target instanceof Array || target instanceof NodeList) {
    if (target.length !== 0) return
    fail(`Expected ${inspect(target)} to be not empty`)
  } else if (target instanceof Map || target instanceof Set) {
    if (target.size !== 0) return
    fail(`Expected ${inspect(target)} to be not empty`)
  }
  fail(`Didn't know how to check if ${inspect(target)} is not empty`)
}
