<script setup>
import { useQuestionsStore } from '@/stores/questions'

const questionsStore = useQuestionsStore()
</script>

<template>
    <h1>Result</h1>
    <p>Your score: {{ questionsStore.score * 10 }} / 100</p>
</template>