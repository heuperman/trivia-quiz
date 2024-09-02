import { beforeEach, describe, it, expect, vi } from 'vitest'

import { mount, flushPromises } from '@vue/test-utils'
import HomeView from '../../views/HomeView.vue'

describe('HomeView', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(HomeView)
  })

  it('renders the title', () => {
    const header = wrapper.find('h1')
    expect(header.text()).toContain('Quiz Master')
  })

  it('renders the correct initial difficulty', () => {
    const select = wrapper.find('select')
    expect(select.element.value).toBe('medium')
  })

  it('updates the selected difficulty when changed', async () => {
    const select = wrapper.find('select')
    await select.setValue('hard')
    expect(wrapper.vm.difficulty).toBe('hard')
  })

  it('fetches a session token and updates the sessionToken ref on mount', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ token: 'mocked-token' })
    })

    wrapper = mount(HomeView)

    await flushPromises()

    expect(wrapper.vm.sessionToken).toBe('mocked-token')
  })
})
