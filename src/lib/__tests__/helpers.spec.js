import { describe, it, expect } from 'vitest'
import { htmlDecode, shuffleArray } from '../helpers'

describe('shuffleArray', () => {
  it('returns an array with the same length and items', () => {
    const array = [1, 2, 3, 4, 5]
    const shuffledArray = shuffleArray(array)
    expect(shuffledArray.length).toEqual(array.length)
    expect(shuffledArray.sort()).toEqual(array.sort())
  })

  it('shuffles the array', () => {
    const array = [1, 2, 3, 4, 5]
    const shuffleCount = 100
    let orderChanged = false
    for (let i = 0; i < shuffleCount; i++) {
      const shuffledArray = shuffleArray(array)
      if (shuffledArray.sort() !== array.sort()) {
        orderChanged = true
        break
      }
    }
    expect(orderChanged).toEqual(true)
  })
})

describe('htmlDecode', () => {
  it('decodes html entities', () => {
    const input = '&lt;h1&gt;Hello&lt;/h1&gt;'
    const output = '<h1>Hello</h1>'
    expect(htmlDecode(input)).toEqual(output)
  })
})
