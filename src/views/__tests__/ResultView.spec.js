import { beforeAll, describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import ResultView from '@/views/ResultView.vue'

const mockRouterPush = vi.fn()

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

  it('redirects to home page on play again button click', async () => {
    vi.mock('vue-router', async () => ({
      useRouter: () => ({
        push: mockRouterPush
      })
    }))

    const button = wrapper.find('button')
    await button.trigger('click')
    expect(mockRouterPush).toHaveBeenCalledWith('/')
  })
})
