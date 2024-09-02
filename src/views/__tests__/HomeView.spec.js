import { nextTick } from 'vue'
import { beforeAll, describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useQuestionsStore } from '@/stores/questions'
import { mockQuestions } from '@/lib/constants'
import HomeView from '@/views/HomeView.vue'

const mockRouterPush = vi.fn()

describe('HomeView', () => {
  let wrapper

  beforeAll(() => {
    wrapper = mount(HomeView, {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn
        })
      ]
    })
  })

  beforeEach(() => {
    global.fetch = vi.fn().mockImplementation((url) => {
      if (url.includes('api_token')) {
        return Promise.resolve({ json: () => Promise.resolve({ token: 'mocked-token' }) })
      } else {
        return Promise.resolve({ json: () => Promise.resolve({ results: mockQuestions }) })
      }
    })
  })

  afterEach(() => {
    vi.resetAllMocks()
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

  it('if there is a session token, does not fetch a new session token', async () => {
    wrapper = mount(HomeView, {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
          initialState: {
            questions: { sessionToken: 'mocked-token' }
          }
        })
      ]
    })

    expect(global.fetch).not.toHaveBeenCalledWith(
      'https://opentdb.com/api_token.php?command=request'
    )
  })

  it('if there is no session token, fetches a session token and sets it in the question store', async () => {
    wrapper = mount(HomeView, {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
          initialState: {
            questions: { sessionToken: '' }
          }
        })
      ]
    })

    await nextTick()

    const questionsStore = useQuestionsStore()
    expect(global.fetch).toHaveBeenCalledWith('https://opentdb.com/api_token.php?command=request')
    expect(questionsStore.setSessionToken).toHaveBeenCalledWith('mocked-token')
  })

  it('fetches questions using the session token and difficulty on start click', async () => {
    wrapper = mount(HomeView, {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
          initialState: {
            questions: { sessionToken: 'mocked-token' }
          }
        })
      ]
    })

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
    vi.mock('vue-router', async () => ({
      useRouter: () => ({
        push: mockRouterPush
      })
    }))

    const button = wrapper.find('button')
    await button.trigger('click')
    expect(mockRouterPush).toHaveBeenCalledWith('/questions')
  })
})
