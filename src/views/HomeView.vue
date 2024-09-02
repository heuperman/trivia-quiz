<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuestionsStore } from '@/stores/questions'
import { openTriviaApiUrl } from '@/lib/constants'

const router = useRouter()
const questionsStore = useQuestionsStore()

const difficulty = ref('medium')
const sessionToken = ref('')

async function setSessionToken() {
  const response = await fetch('https://opentdb.com/api_token.php?command=request')
  const data = await response.json()
  sessionToken.value = data.token
}

async function startQuiz() {
  const response = await fetch(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty.value}&token=${sessionToken.value}`)
  const data = await response.json()
  questionsStore.setQuestions(data.results)
  router.push('/questions')
}

setSessionToken()
</script>

<template>
  <main>
    <h1>Quiz Master</h1>
    <label for="difficulty">Select difficulty:</label>
    <select id="difficulty" v-model="difficulty">
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
    <button @click="startQuiz">Start</button>
  </main>
</template>
