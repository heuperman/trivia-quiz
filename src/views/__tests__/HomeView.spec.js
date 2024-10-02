import { nextTick } from 'vue'
import { beforeAll, describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useQuestionsStore } from '@/stores/questions'
import HomeView from '@/views/HomeView.vue'

const mockRouterPush = vi.fn()

describe('HomeView', () => {
  let wrapper
  let questionsStore

  beforeAll(() => {
    wrapper = mount(HomeView, {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn
        })
      ]
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

  it('if there is a session token, does not start a new session', async () => {
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
    questionsStore = useQuestionsStore()

    expect(questionsStore.startSession).not.toHaveBeenCalled()
  })

  it('if there is no session token, starts a new session', async () => {
    questionsStore = useQuestionsStore()
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
    questionsStore = useQuestionsStore()

    await nextTick()
    expect(questionsStore.startSession).toHaveBeenCalled()
  })

  it('resets the questions store on start click', async () => {
    questionsStore = useQuestionsStore()

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(questionsStore.reset).toHaveBeenCalled()
  })

  it('gets the questions with the right difficulty on start click', async () => {
    questionsStore = useQuestionsStore()

    const select = wrapper.find('select')
    await select.setValue('easy')

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(questionsStore.getQuestions).toHaveBeenCalledWith('easy')
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
