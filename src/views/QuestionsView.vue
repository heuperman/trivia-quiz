<script setup>
import { useQuestionsStore } from '@/stores/questions'
import { htmlDecode, shuffleArray } from '@/lib/helpers'

const questionsStore = useQuestionsStore()
const currentQuestion = questionsStore.getCurrentQuestion
const answers = currentQuestion.type === 'boolean'
    ? ['True', 'False']
    : shuffleArray([currentQuestion.correct_answer, ...currentQuestion.incorrect_answers])
</script>

<template>
    <h1>Question {{ questionsStore.currentQuestionIndex + 1 }} of 10</h1>
    <p>{{ htmlDecode(currentQuestion.question) }}</p>
    <ul>
        <li v-for="answer in answers">
            <button>{{ htmlDecode(answer) }}</button>
        </li>
    </ul>
</template>