<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuestionsStore } from '@/stores/questions'
import ButtonDefault from '@/components/ButtonDefault.vue';

const router = useRouter()
const questionsStore = useQuestionsStore()

const difficulty = ref('medium')

if (!questionsStore.sessionToken) {
  questionsStore.startSession()
}
async function startQuiz() {
  questionsStore.reset()
  await questionsStore.getQuestions(difficulty.value)
  router.push('/questions')
}
</script>

<template>
  <main>
    <h1 :class="$style.title">Quiz <span :class="$style.title_bottom">Master</span></h1>
    <div :class="$style.select_container">
      <label :class="$style.select_label" for="difficulty">Select difficulty:</label>
      <select :class="$style.select" id="difficulty" v-model="difficulty">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
    <ButtonDefault text="Start" @click="startQuiz" />
  </main>
</template>

<style lang="css" module>
.title {
  font-size: 5rem;
  margin-top: 2rem;
  line-height: 4rem;
  background: linear-gradient(to bottom right, var(--color-blue), var(--color-red));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.title_bottom {
  display: block;
  margin-left: 5rem;
}

.select_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.select_label {
  font-size: 1.2rem;
}

.select {
  font-size: 1.2rem;
  padding: 0.5rem 2rem;
  background-color: var(--color-light);
  border: 4px solid var(--color-light);
  border-radius: 8px;
}

@media (min-width: 1024px) {
  .title {
    margin-top: 4rem;
  }
}
</style>