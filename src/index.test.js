/* eslint-disable import/no-unresolved, filenames/match-regex */
import {fail} from './index.js'
import {inspect} from 'loupe'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function testFail() {
  try {
    fail()
  } catch (error) {
    return
  }
  throw new Error('fail did not throw an error')
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function testFailMessage() {
  const errorMessage = 'This was a really bad thing'
  try {
    fail(errorMessage)
  } catch (error) {
    if (error.message !== errorMessage) {
      throw new Error(`Expected ${inspect(error.message)} to equal ${inspect(errorMessage)}`)
    }
    return
  }
  throw new Error('fail did not throw an error')
}
