import { describe, it, expect, vi } from 'vitest'
import { htmlDecode, shuffleArray } from '../helpers'

describe('shuffleArray', () => {
  it('shuffles the array', () => {
    const array = [1, 2, 3, 4, 5]
    const shuffledArray = shuffleArray(array)
    expect(shuffledArray.length).toEqual(array.length)
    expect(shuffledArray).not.toEqual(array)
  })
})

describe('htmlDecode', () => {
  it('decodes html entities', () => {
    const input = '&lt;h1&gt;Hello&lt;/h1&gt;'
    const output = '<h1>Hello</h1>'
    expect(htmlDecode(input)).toEqual(output)
  })
})
