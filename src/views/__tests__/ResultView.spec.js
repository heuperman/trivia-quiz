import { beforeAll, describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import ResultView from '@/views/ResultView.vue'

describe('ResultView', () => {
  let wrapper

  beforeAll(() => {
    wrapper = mount(ResultView, {
      plugins: [
        createTestingPinia({
          initialState: {
            questions: { score: 6 }
          },
          createSpy: vi.fn
        })
      ]
    })
  })

  it('renders the header', () => {
    const header = wrapper.find('h1')
    expect(header.text()).toContain('Result')
  })

  it('shows the score', () => {
    const header = wrapper.find('p')
    expect(header.text()).toContain('Your score: 60 / 100')
  })
})
