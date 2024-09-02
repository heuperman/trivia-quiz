<script setup>
import { useQuestionsStore } from '@/stores/questions'
import { htmlDecode, shuffleArray } from '@/lib/helpers'

const questionsStore = useQuestionsStore()

function getAnswers(question) {
    return question.type === 'boolean'
        ? ['True', 'False']
        : shuffleArray([question.correct_answer, ...question.incorrect_answers])
}

function handleAnswerClick(answer) {
    if (answer === questionsStore.getCurrentQuestion.correct_answer) {
        questionsStore.incrementScore()
    }
    questionsStore.incrementQuestionIndex()
}
</script>

<template>
    <h1>Question {{ questionsStore.currentQuestionIndex + 1 }} of 10</h1>
    <p>{{ htmlDecode(questionsStore.getCurrentQuestion.question) }}</p>
    <ul>
        <li v-for="answer in getAnswers(questionsStore.getCurrentQuestion)">
            <button @click="handleAnswerClick(answer)">{{ htmlDecode(answer) }}</button>
        </li>
    </ul>
</template>