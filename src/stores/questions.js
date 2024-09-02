import { defineStore } from 'pinia'

export const useQuestionsStore = defineStore('questions', {
  state: () => ({
    questions: [],
    currentQuestionIndex: 0
  }),
  actions: {
    setQuestions(questions) {
      this.questions = questions
    }
  }
})
