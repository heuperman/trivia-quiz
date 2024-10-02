import { defineStore } from 'pinia'
import { openTriviaApiUrl } from '@/lib/constants'

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
    async getQuestions(difficulty) {
      const response = await fetch(
        `${openTriviaApiUrl}/api.php?amount=10&difficulty=${difficulty}&token=${this.sessionToken}`
      )
      const data = await response.json()
      this.questions = data.results
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
    async startSession() {
      const response = await fetch(`${openTriviaApiUrl}/api_token.php?command=request`)
      const data = await response.json()
      this.sessionToken = data.token
    }
  }
})
