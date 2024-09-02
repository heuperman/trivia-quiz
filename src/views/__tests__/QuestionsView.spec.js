import { beforeAll, describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { mockQuestions } from '@/lib/constants'
import QuestionsView from '@/views/QuestionsView.vue'

describe('QuestionsView', () => {
  let wrapper

  beforeAll(() => {
    setActivePinia(createPinia())
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

  it('renders the question number', () => {
    const header = wrapper.find('h1')
    expect(header.text()).toContain('Question 1 of 10')
  })

  it('renders the question', () => {
    const question = wrapper.find('p')
    expect(question.text()).toContain(mockQuestions[0].question)
  })

  it('renders the answers in a random order', () => {
    const answers = wrapper.findAll('button').map((button) => button.text())
    expect(answers).toEqual(
      expect.arrayContaining([
        mockQuestions[0].correct_answer,
        ...mockQuestions[0].incorrect_answers
      ])
    )
    expect(answers).not.toEqual([
      mockQuestions[0].correct_answer,
      ...mockQuestions[0].incorrect_answers
    ])
  })
})
