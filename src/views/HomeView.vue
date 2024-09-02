<script setup>
import { ref } from 'vue'

const difficulty = ref('medium')
const sessionToken = ref('')

async function setSessionToken() {
  const response = await fetch('https://opentdb.com/api_token.php?command=request')
  const data = await response.json()
  sessionToken.value = data.token
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
  </main>
</template>
