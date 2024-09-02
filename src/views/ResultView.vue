<script setup>
import { useRouter } from 'vue-router'
import { useQuestionsStore } from '@/stores/questions'

const router = useRouter()
const questionsStore = useQuestionsStore()
</script>

<template>
    <h1>Result</h1>
    <p>Your score: {{ questionsStore.score * 10 }} / 100</p>
    <button @click="router.push('/')">Play again</button>
</template>