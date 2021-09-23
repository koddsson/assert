function assert(condition: unknown, message: string): void {
  if (condition) return

  fail(message || `Expected ${condition} to be truthy`)
}

function fail(message: string) {
  throw new Error(message)
}

function deepEqual(obj1: Record<string, never>, obj2: Record<string, never>) {
  if (obj1 === obj2) {
    // it's just the same object. No need to compare.
    return true
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false

  // compare objects with same number of keys
  for (const key in obj1) {
    if (!(key in obj2)) return false //other object doesn't have this prop
    if (!deepEqual(obj1[key], obj2[key])) return false
  }

  return true
}

assert.fail = fail

assert.isOk = function (thing: unknown, message: string) {
  if (thing) return

  fail(message || `Expected ${thing} to be ok`)
}

assert.isNotOk = function (thing: unknown, message: string) {
  if (!thing) return

  fail(message || `Expected ${thing} to be not ok`)
}

assert.equal = function <T = unknown>(actual: T, expected: T, message: string) {
  if (actual == expected) return

  fail(message || `Expected ${actual} and ${expected} to be equal`)
}

assert.notEqual = function <T = unknown>(actual: T, expected: T, message: string) {
  if (actual != expected) return

  fail(message || `Expected ${actual} and ${expected} to be not equal`)
}

assert.strictEqual = function <T = unknown>(actual: T, expected: T, message: string) {
  if (actual === expected) return

  fail(message || `Expected ${actual} and ${expected} to be strict equal`)
}

assert.notStrictEqual = function <T = unknown>(actual: T, expected: T, message: string) {
  if (actual !== expected) return

  fail(message || `Expected ${actual} and ${expected} to be not strict equal`)
}

assert.deepEqual = function (actual: Record<string, never>, expected: Record<string, never>, message: string) {
  if (deepEqual(actual, expected)) return

  fail(message || `Expected ${expected} to be equal ${actual}`)
}

assert.notDeepEqual = function (actual: Record<string, never>, expected: Record<string, never>, message: string) {
  if (!deepEqual(actual, expected)) return

  fail(message || `Expected ${expected} to be equal ${actual}`)
}

assert.isAbove = function (valueToCheck: number, valueToBeAbove: number, message: string) {
  if (valueToCheck > valueToBeAbove) return

  fail(message || `Expected ${valueToCheck} to be higher than ${valueToBeAbove}`)
}

assert.isAtLeast = function (valueToCheck: number, valueToBeAtLeast: number, message: string) {
  if (valueToCheck >= valueToBeAtLeast) return

  fail(message || `Expected ${valueToCheck} to be lower than ${valueToBeAtLeast}`)
}

assert.isBelow = function (valueToCheck: number, valueToBeBelow: number, message: string) {
  if (valueToCheck < valueToBeBelow) return

  fail(message || `Expected ${valueToCheck} to be lower than ${valueToBeBelow}`)
}

assert.isTrue = function (value: unknown, message: string) {
  if (value === true) return

  fail(message || `Expected ${value} to be true`)
}

assert.isFalse = function (value: unknown, message: string) {
  if (value === false) return

  fail(message || `Expected ${value} to be false`)
}

assert.isNull = function (value: unknown, message: string) {
  if (value === null) return

  fail(message || `Expected ${value} to be null`)
}

assert.isNotNull = function (value: unknown, message: string) {
  if (value !== null) return

  fail(message || `Expected ${value} to be not null`)
}

assert.isUndefined = function (value: unknown, message: string) {
  if (value === undefined) return

  fail(message || `Expected ${value} to be undefined`)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
assert.instanceOf = function (value: unknown, construct: any, message: string) {
  if (value instanceof construct) return

  fail(message || `Expected ${value} to be a instance of ${construct}`)
}

assert.include = function (haystack: unknown[], needle: unknown, message: string) {
  if (haystack.includes(needle)) return

  fail(message || `Expected ${haystack} to include ${needle}`)
}

assert.notInclude = function (haystack: unknown[], needle: unknown, message: string) {
  if (!haystack.includes(needle)) return

  fail(message || `Expected ${haystack} to not include ${needle}`)
}

assert.match = function (value: string, regexp: string | RegExp, message: string) {
  if (value.match(regexp)) return

  fail(message || `Expected ${value} to match ${regexp}`)
}

assert.hasAllKeys = function (thing: Record<string, never>, keys: string[], message: string) {
  const objectKeys = Object.keys(thing)
  const hasAllKeys = objectKeys.length === keys.length && keys.every(key => objectKeys.includes(key))
  if (hasAllKeys) return

  fail(message || `Expected ${objectKeys} to include ${keys} and only those keys`)
}

assert.containsAllKeys = function (thing: Record<string, never>, keys: string[], message: string) {
  const hasAllKeys = keys.every(key => Object.keys(thing).includes(key))
  if (hasAllKeys) return

  fail(message || `Expected ${Object.keys(thing)} to include all the keys: ${keys}`)
}

assert.throws = function (fn: () => void, errorLike: string | RegExp) {
  try {
    fn()
  } catch (error) {
    if (!(error instanceof Error)) return
    if (error.message.match(errorLike)) return
    fail(`Expected error message ${error.message} to match ${errorLike}`)
  }
  fail(`Expected function to throw`)
}

assert.isEmpty = function (target: unknown) {
  if (typeof target === 'string' || target instanceof Array || target instanceof NodeList) {
    if (target.length === 0) return
    fail(`Expected ${target} to be empty`)
  } else if (target instanceof Map || target instanceof Set) {
    if (target.size === 0) return
    fail(`Expected ${target} to be empty`)
  }
  fail(`Didn't know how to check if ${target} is empty`)
}

assert.isNotEmpty = function (target: unknown) {
  if (typeof target === 'string' || target instanceof Array || target instanceof NodeList) {
    if (target.length !== 0) return
    fail(`Expected ${target} to be not empty`)
  } else if (target instanceof Map || target instanceof Set) {
    if (target.size !== 0) return
    fail(`Expected ${target} to be not empty`)
  }
  fail(`Didn't know how to check if ${target} is not empty`)
}

export {assert}
