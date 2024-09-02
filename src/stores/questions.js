import { defineStore } from 'pinia'

export const useQuestionsStore = defineStore('questions', {
  state: () => ({
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    sessionToken: ''
  }),
  getters: {
    getCurrentQuestion() {
      return this.questions[this.currentQuestionIndex]
    }
  },
  actions: {
    setQuestions(questions) {
      this.questions = questions
    },
    incrementQuestionIndex() {
      this.currentQuestionIndex++
    },
    incrementScore() {
      this.score++
    },
    reset() {
      this.currentQuestionIndex = 0
      this.score = 0
    },
    setSessionToken(sessionToken) {
      this.sessionToken = sessionToken
    },
    clearSessionToken() {
      this.sessionToken = ''
    }
  }
})
