import { beforeAll, describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { mockQuestions } from '@/lib/constants'
import { useQuestionsStore } from '@/stores/questions'
import QuestionsView from '@/views/QuestionsView.vue'

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

const shuffledArray = ['a', 'b', 'c', 'd', 'e']

vi.mock('@/lib/helpers', () => ({
  shuffleArray: () => shuffledArray,
  htmlDecode: (string) => string
}))

describe('QuestionsView', () => {
  let wrapper

  beforeAll(() => {
    wrapper = mount(QuestionsView, {
      plugins: [
        createTestingPinia({
          initialState: {
            questions: { questions: mockQuestions }
          },
          createSpy: vi.fn
        })
      ]
    })
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('renders the question number', () => {
    const header = wrapper.find('h1')
    expect(header.text()).toContain('Question 1 of 10')
  })

  it('renders the question', () => {
    const question = wrapper.find('p')
    expect(question.text()).toContain(mockQuestions[0].question)
  })

  it('renders the shuffled answers if it is a multiple choice question', () => {
    const answers = wrapper.findAll('button').map((button) => button.text())
    expect(answers).toEqual(shuffledArray)
  })

  it('renders the answers in a the correct order if it is a boolean question', () => {
    wrapper = mount(QuestionsView, {
      plugins: [
        createTestingPinia({
          initialState: {
            questions: { questions: mockQuestions, currentQuestionIndex: 1 }
          },
          createSpy: vi.fn
        })
      ]
    })

    const answerButtons = wrapper.findAll('button')
    expect(answerButtons.length).toEqual(2)
    expect(answerButtons[0].text()).toEqual('True')
    expect(answerButtons[1].text()).toEqual('False')
  })

  it('increments the current question index on answer click', async () => {
    const questionsStore = useQuestionsStore()

    const answerButton = wrapper.find('button')
    await answerButton.trigger('click')
    expect(questionsStore.incrementQuestionIndex).toHaveBeenCalledOnce()
  })

  it('increments the score on correct answer', async () => {
    const questionsStore = useQuestionsStore()

    const answerButtons = wrapper.findAll('button')
    const correctAnswerButton = answerButtons.find(
      (button) => button.text() === questionsStore.getCurrentQuestion.correct_answer
    )
    await correctAnswerButton.trigger('click')
    expect(questionsStore.incrementScore).toHaveBeenCalledOnce()
  })

  it('does not increment the score on incorrect answer', async () => {
    const questionsStore = useQuestionsStore()

    const answerButtons = wrapper.findAll('button')
    const correctAnswerButton = answerButtons.find(
      (button) => button.text() !== questionsStore.getCurrentQuestion.correct_answer
    )
    await correctAnswerButton.trigger('click')
    expect(questionsStore.incrementScore).not.toHaveBeenCalled()
  })

  it('redirects to result page on final question click', async () => {
    wrapper = mount(QuestionsView, {
      plugins: [
        createTestingPinia({
          initialState: {
            questions: { questions: mockQuestions, currentQuestionIndex: 9 }
          },
          createSpy: vi.fn
        })
      ]
    })

    const answerButtons = wrapper.findAll('button')
    await answerButtons[0].trigger('click')
    expect(mockRouterPush).toHaveBeenCalledWith('/result')
  })
})
