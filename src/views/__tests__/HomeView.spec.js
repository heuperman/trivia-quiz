import { beforeAll, describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { useQuestionsStore } from '@/stores/questions'
import { mockQuestions } from '@/lib/constants'
import HomeView from '@/views/HomeView.vue'

const mockRouterPush = vi.fn()

vi.mock('vue-router', async () => {
  return {
    RouterView: {},
    useRouter: () => {
      return {
        push: mockRouterPush
      }
    }
  }
})

describe('HomeView', () => {
  let wrapper

  beforeAll(() => {
    setActivePinia(createPinia())
    global.fetch = vi.fn().mockImplementation((url) => {
      if (url.includes('api_token')) {
        return Promise.resolve({ json: () => Promise.resolve({ token: 'mocked-token' }) })
      } else {
        return Promise.resolve({ json: () => Promise.resolve({ results: mockQuestions }) })
      }
    })
    wrapper = mount(HomeView, { plugins: [createTestingPinia({ createSpy: vi.fn })] })
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
    expect(wrapper.vm.sessionToken).toBe('mocked-token')
  })

  it('fetches questions using the session token and difficulty on start click', async () => {
    const select = wrapper.find('select')
    await select.setValue('easy')

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(fetch).toHaveBeenCalledWith(
      'https://opentdb.com/api.php?amount=10&difficulty=easy&token=mocked-token'
    )
  })

  it('resets the questions store on start click', async () => {
    const questionsStore = useQuestionsStore()

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(questionsStore.reset).toHaveBeenCalled()
  })

  it('updates the questions store with the fetched questions', async () => {
    const questionsStore = useQuestionsStore()

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(questionsStore.setQuestions).toHaveBeenCalledWith(mockQuestions)
  })

  it('pushes the questions route on start click', async () => {
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(mockRouterPush).toHaveBeenCalledWith('/questions')
  })
})
